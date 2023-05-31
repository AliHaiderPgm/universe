import { ScrollView, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, sizes, spacing } from '../../../components/constants/theme'
import { Button, Divider, TextInput } from 'react-native-paper'
import { useToast } from 'native-base'

const CustomTextInput = ({ label, onChange, keyboard }) => {
    return <TextInput
        label={label}
        mode='outlined' activeOutlineColor={colors.black} outlineColor={colors.black} textColor='black'
        style={styles.inputField}
        keyboardType={keyboard ? keyboard : 'default'}
        onChangeText={onChange}
    />
}
const CustomButton = ({ label, onPress }) => {
    return <Button
        mode="contained" buttonColor={colors.black} textColor={colors.white} uppercase={true} labelStyle={{ fontSize: sizes.h3 - 2, fontWeight: 700 }}
        style={styles.btn}
        onPress={onPress}
    >
        {label}
    </Button>
}

const initialState = {
    name: '',
    phoneNumber: '',
    address: '',
}
//Set TAX HERE
const TAX = 2

export default function Checkout({ route }) {
    const [orderDetails] = route.params.orderDetail
    const cartTotal = route.params.cartTotal
    const [state, setState] = useState(initialState)
    const [subTotal, setSubTotal] = useState()
    const toast = useToast()

    const notify = (msg, color) => toast.show({ title: msg, placement: 'top', duration: 2000, backgroundColor: `${color}.700`, shadow: '9' })
    const handleChange = (name, value) => setState(s => ({ ...s, [name]: value }))

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
    const calSubTotal = () => {
        let number = 0
        orderDetail.map((order) => {
            number = number + order.amount
            setSubTotal(number)
        })
    }
    useEffect(() => {
        calSubTotal()
    }, [])

    const handlePlaceOrder = () => {
        const { name, phoneNumber, address } = state
        const recieverName = name.trim()
        const recieverPhoneNumber = phoneNumber.trim()
        const recieverAddress = address.trim()
        if (recieverName.length <= 2 || recieverPhoneNumber.trim().length < 11 || recieverAddress.trim().length <= 10) {
            notify('Please provide valid information!', 'error')
            return
        }
    }
    return (
        <ScrollView style={styles.mainContainer}>
            <View style={styles.imageContainer}>
                <Image source={require('../../../assets/cashOnDelivery.png')} style={styles.cod} />
            </View>
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
            <View style={styles.detailsContainer}>
                <Text style={styles.text}>Receiver Information</Text>
                <CustomTextInput label="Name" onChange={(val) => handleChange('name', val)} value={state.name} />
                <CustomTextInput label="Address" onChange={(val) => handleChange('address', val)} value={state.address} />
                <CustomTextInput label="Mobile No." onChange={(val) => handleChange('phoneNumber', val)} value={state.phoneNumber} keyboard="phone-pad" />
                <CustomButton label="Place Order" onPress={() => handlePlaceOrder()} />
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
        gap: spacing.s
    },
    text: {
        fontSize: sizes.h2 - 2,
        color: colors.black,
        fontWeight: 700,
        alignSelf: 'center'
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
        marginTop: spacing.m,
        marginHorizontal: spacing.m,
        gap: spacing.s
    }
})