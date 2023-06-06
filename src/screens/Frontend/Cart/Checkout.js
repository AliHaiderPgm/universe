import { ScrollView, Image, StyleSheet, Text, View, LogBox, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, sizes, spacing } from '../../../components/constants/theme'
import { ActivityIndicator, Button, Divider, TextInput } from 'react-native-paper'
import { useToast } from 'native-base'
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth'
import { useAuth } from '../../../Context/AuthContext'
import { useNavigation } from '@react-navigation/native'

const CustomTextInput = ({ label, onChange, keyboard, value, disable, placeholder }) => {
    return <TextInput
        label={label}
        mode='outlined' activeOutlineColor={colors.black} outlineColor={colors.black} textColor='black'
        style={styles.inputField}
        keyboardType={keyboard ? keyboard : 'default'}
        onChangeText={onChange}
        value={value}
        disabled={disable}
        placeholder={placeholder}
    />
}
const CustomButton = ({ label, onPress, loading }) => {
    return <Button
        mode="contained" buttonColor={colors.black} textColor={colors.white} uppercase={true} labelStyle={{ fontSize: sizes.h3 - 2, fontWeight: 700 }}
        style={styles.btn}
        onPress={onPress}
        loading={loading}
    >
        {label}
    </Button>
}

const initialState = {
    name: '',
    phoneNumber: '',
    address: '',
    OTP: ''
}
//Set TAX HERE %
const TAX = 2

export default function Checkout({ route }) {
    const orderDetails = route.params.data
    const [state, setState] = useState(initialState)
    const [cartTotal, setCartTotal] = useState()
    const [subTotal, setSubTotal] = useState()
    const [items, setItems] = useState([])
    const toast = useToast()
    const { user } = useAuth()
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation()
    const [calculating, setCalculating] = useState(false)
    const [optLoading, setOTPLoading] = useState(false)
    const [confirmationData, setConfirmationData] = useState()
    const [otpConfirmation, setOTPConfirmation] = useState(false)

    const notify = (msg, color) => toast.show({ title: msg, placement: 'top', duration: 2000, backgroundColor: `${color}.700`, shadow: '9' })
    const handleChange = (name, value) => setState(s => ({ ...s, [name]: value }))
    //Cart-Total
    const calCartTotal = () => {
        let sum = 0;
        orderDetails.map(item => {
            const qty = item._data.quantity;
            const price = item._data.price;
            let total = parseFloat((qty * price).toFixed(2));
            sum += total;
        });
        setCartTotal(sum.toFixed(2));
    }
    //Sub-Total  
    const calSubTotal = () => {
        let sum = 0;
        orderDetail.forEach(order => {
            const amount = parseFloat(order.amount);
            sum += amount;
        })
        setSubTotal(sum.toFixed(2));
    }
    const orderDetail = [
        {
            title: "Cart total",
            amount: cartTotal
        },
        {
            title: "Delivery Charges",
            amount: 10
        },
        {
            title: "GST",
            amount: Math.round((cartTotal * TAX) / 100)
        }
    ]
    useEffect(() => {
        setCalculating(true)
        try {
            //Igonre that non-serilaization warning
            LogBox.ignoreLogs([
                'Non-serializable values were found in the navigation state',
            ]);
            calCartTotal()
            setItems([])
            orderDetails?.map(order => setItems(items => [...items, order._data]))
        } catch {
            notify('Something went wrong!', 'error')
        } finally {
            setCalculating(false)
        }
    }, [])
    useEffect(() => {
        calSubTotal()
    }, [cartTotal])

    const handleSendOTP = async () => {
        if (state.phoneNumber.length < 13) {
            notify('Please enter vlaid phone number!', 'error')
            return
        }
        setOTPLoading(true)
        try {
            const confirmation = await firebase.auth().phoneAuthProvider().signInWithPhoneNumberAndProvider(state.phoneNumber, "phoneAuthProvider");
            setConfirmationData(confirmation)
            if (confirmation.user.isVerified) {
                notify('Phone number already verified!', 'info');
                return;
            }
            notify('OTP sent successfully!', 'success');
        } catch (error) {
            if (error.message === "[auth/too-many-requests] We have blocked all requests from this device due to unusual activity. Try again later.") {
                notify('Too many requests. Try again later!', 'error');
            } else {
                notify('Error sending OTP!', 'error');
            }
            console.log('Error======>>>>>>>>>', error.message)
        } finally {
            setOTPLoading(false)
        }
    }
    const handleConfirmOTP = () => {
        setOTPConfirmation(false)
        const otpCode = state.OTP
        confirmationData.confirm(otpCode)
            .then((userCredential) => {
                notify('OTP verification successful!', 'success')
                setOTPConfirmation(true)
            })
            .catch((error) => notify('OTP verification failed!', 'error'))
    }
    //Firebase
    const handlePlaceOrder = async () => {
        setLoading(true)
        try {
            const { name, phoneNumber, address } = state
            const recieverName = name.trim()
            const recieverPhoneNumber = phoneNumber.trim()
            const recieverAddress = address.trim()
            if (recieverName.length <= 2 || recieverPhoneNumber.trim().length < 11 || recieverAddress.trim().length <= 13 || !otpConfirmation) {
                notify('Please provide valid information!', 'error')
                return
            }
            const data = {
                recieverName,
                recieverPhoneNumber,
                recieverAddress,
                orderDetails: items, //All Items placed in order by reciever
                status: 'Pending'
            }
            const timeStampFeild = { userTimeStamp: new Date() }
            const userData = {
                userName: user.displayName,
                userEmail: user.email,
                userUID: user.uid,
            }
            const dataObj = { ...data, ...timeStampFeild, ...userData }
            //Adding to firebase
            await firestore().collection('ordersList').add(dataObj)
                .then(async docRef => {
                    //Delete the cart items
                    await firestore().collection('cartItems').where('userId', '==', user.uid).get().then(querySnapshot => {
                        querySnapshot.forEach(async documentSnapshot => await documentSnapshot.ref.delete())
                    })
                    // Update the document with server timestamp and docRefId
                    const docId = docRef.id;
                    const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp()
                    return docRef.update({
                        docRefId: docId,
                        serverTimestamp
                    })
                })
            setState(initialState)
            navigation.navigate('thanks')
        }
        catch {
            notify('Something went wrong!', 'error')
        }
        finally {
            setLoading(false)
        }
    }
    return (
        <ScrollView style={styles.mainContainer}>
            <View style={styles.imageContainer}>
                <Image source={require('../../../assets/cashOnDelivery.png')} style={styles.cod} />
            </View>

            {
                calculating ? <View style={styles.loader}>
                    <ActivityIndicator color='black' />
                </View>
                    :
                    <View style={styles.orderDetailContainer}>
                        <Text style={styles.text}>Order Details</Text>
                        <Divider style={{ marginHorizontal: spacing.m }} />
                        {
                            orderDetail.map((order, index) => {
                                return <View style={styles.orderDetails} key={index}>
                                    <Text style={styles.title}>{order.title}</Text>
                                    <Text style={styles.amount}>${order.amount}</Text>
                                </View>
                            })
                        }
                        <Divider style={{ marginHorizontal: spacing.m }} />
                        <View style={styles.orderDetails}>
                            <Text style={styles.text}>Sub-Total</Text>
                            <Text style={styles.text}>${subTotal}</Text>
                        </View>
                    </View>
            }

            <View style={styles.detailsContainer}>
                <Text style={styles.text}>Receiver Information</Text>
                <CustomTextInput label="Name" onChange={(val) => handleChange('name', val)} value={state.name} />
                <CustomTextInput label="Address" onChange={(val) => handleChange('address', val)} value={state.address} />

                <CustomTextInput label="Mobile No." onChange={(val) => handleChange('phoneNumber', val)} value={state.phoneNumber} keyboard="phone-pad" placeholder="+92 000 0000000" />
                <Button mode="contained" style={styles.otpBtn} textColor='white' buttonColor={colors.black} onPress={handleSendOTP} loading={optLoading}>Send OTP</Button>

                <CustomTextInput label="OTP Code" onChange={(val) => handleChange('OTP', val)} value={state.OTP} keyboard="phone-pad" disable={otpConfirmation} />
                <Button mode="contained" style={styles.otpBtn} textColor='white' buttonColor={colors.black} onPress={handleConfirmOTP}>{otpConfirmation ? 'Confirmed' : 'Confirm OTP'}</Button>

                <CustomButton label="Place Order" onPress={() => handlePlaceOrder()} loading={loading} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    inputField: {
        backgroundColor: colors.white
    },
    btn: {
        paddingVertical: spacing.s,
        borderRadius: 8,
        borderTopRightRadius: 1,
    },
    mainContainer: {
        flex: 1,
        height: sizes.height,
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    orderDetailContainer: {
        marginTop: spacing.s,
        padding: spacing.m,
        backgroundColor: colors.white,
        borderRadius: sizes.radius,
        marginHorizontal: spacing.m,
        gap: spacing.s,
        elevation: 3
    },
    text: {
        fontSize: sizes.h2 - 2,
        color: colors.black,
        fontWeight: 700,
        alignSelf: 'center'
    },
    otpBtn: {
        alignSelf: 'flex-start',
        borderRadius: 8,
        borderTopRightRadius: 1,
    },
    orderDetails: {
        paddingHorizontal: spacing.l,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: sizes.h3,
        color: colors.lightGray,
        fontWeight: 700
    },
    amount: {
        color: colors.black,
        fontSize: sizes.h3,
        fontWeight: 700,
    },
    cod: {
        height: 200,
        resizeMode: 'contain'
    },
    detailsContainer: {
        margin: spacing.m,
        gap: spacing.s,
    },
    loader: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: spacing.s,
        padding: spacing.xl + spacing.xl,
        backgroundColor: colors.white,
        borderRadius: sizes.radius,
        marginHorizontal: spacing.m,
        gap: spacing.s,
        elevation: 3
    }
})