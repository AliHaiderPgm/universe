import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import { ActivityIndicator, Button } from 'react-native-paper';
import { useToast } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { colors, sizes, spacing } from '../../../components/constants/theme';
import { useAuth } from '../../../Context/AuthContext';
import Icon from '../../../components/shared/Icon';

const CARD_HEIGHT = 150;
const CARD_WIDTH = sizes.width - spacing.xl;

const Card = ({ data, deleteItem }) => {
    const navigation = useNavigation()
    const [deleting, setDeleting] = useState(false)
    const handleDelete = async () => {
        setDeleting(true)
        await deleteItem()
        setDeleting(false)
    }
    return <>
        {deleting ?
            <View style={styles.loader}>
                <ActivityIndicator color={colors.gold} />
            </View>
            :
            <View style={styles.cardContainer}>
                <Image source={{ uri: data.imageUrl }} style={styles.image} />
                <View style={styles.textContainer}>
                    <Text style={styles.h2}>{data.name}</Text>
                    <Text style={styles.price}>${data.price}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={handleDelete}>
                        <Icon icon="close" size={15} />
                    </TouchableOpacity>
                    <Button
                        style={styles.btn}
                        mode='contained'
                        buttonColor='black'
                        textColor='white'
                        rippleColor='white'
                        onPress={() => navigation.navigate('productDetail', { product: data })}
                    >
                        View details
                    </Button>
                </View>
            </View>
        }
    </>
}
export default function WishList() {
    const { user } = useAuth()
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const toast = useToast();
    const notify = (title, color) => { toast.show({ title: title, backgroundColor: `${color}.700`, placement: 'top', duration: 2000, shadow: '9' }) };
    const getData = async () => {
        setLoading(true)
        setItems([])
        await firestore()
            .collection('wishList')
            .where('userId', '==', user.uid)
            .get()
            .then(docRef => {
                docRef.forEach(doc => {
                    const docData = doc.data()
                    setItems(s => [...s, docData])
                })
            }).catch(() => {
                notify('Something went wrong!', 'error')
            }).finally(() => {
                setLoading(false)
            })
    }
    useEffect(() => {
        getData()
    }, [])
    const handleDelete = (e) => {
        setDeleting(true)
        firestore()
            .collection('wishList')
            .where('userId', '==', user.uid)
            .where('id', '==', e.id)
            .get()
            .then(docRef => {
                docRef.forEach(doc => { doc.ref.delete() })
                notify('Item removed!', 'success')
                setItems(items.filter(item => item.id !== e.id))
            })
            .catch(() => { notify('Something went wrong!', 'error') })
            .finally(() => { setDeleting(false) })
    }
    return <>
        {
            loading ? <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator color={colors.gold} size={'large'} /></View>
                :
                items.length === 0 ?
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.s }}>
                        <Icon icon='emptyBox' size={80} />
                        <Text style={{ color: colors.gray }}>Empty wish list</Text>
                    </View>
                    :
                    <View style={styles.container}>
                        {items.map((item, index) => { return <Card data={item} key={index} deleteItem={() => handleDelete(item)} delState={deleting} /> })}
                    </View>
        }
    </>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexWrap: 'wrap',
        paddingHorizontal: spacing.m,
        paddingVertical: spacing.s,
        gap: spacing.s
    },
    // card styling
    loader: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white,
        borderRadius: sizes.radius,
        elevation: 7,
    },
    cardContainer: {
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        backgroundColor: colors.white,
        borderRadius: sizes.radius,
        padding: spacing.s,
        elevation: 7,
        flexDirection: 'row',
        padding: spacing.m,
        justifyContent: 'space-between',
    },
    image: {
        height: 120,
        width: 100,
        borderRadius: sizes.radius - spacing.s,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    textContainer: {
        justifyContent: 'space-between',
    },
    h2: {
        fontSize: sizes.h3 + 2,
        color: colors.black,
        fontWeight: '600',
    },
    price: {
        color: colors.gray,
        fontSize: sizes.h3
    },
    buttonContainer: {
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    }
})