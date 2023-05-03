import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { colors, sizes, spacing } from '../../constants/theme'
import CartCard from './CartCard'
import firestore from '@react-native-firebase/firestore';


export default function CartDetails({ list, resetItems }) {
    const initialState = list
    const [cartItems, setCartItems] = useState(initialState)
    const [cartTotal, setCartTotal] = useState(0)

    const cart_total = () => {
        let sum = 0
        cartItems.map(item => {
            const qty = item._data.quantity
            const price = item._data.price
            let total = parseFloat((qty * price).toFixed(2))
            sum += total
            setCartTotal(sum)
        })
    }

    const totalAmountData = [
        {
            type: 'Cart total',
            amount: parseFloat((cartTotal).toFixed(2)),
        },
        {
            type: 'Tax',
            amount: parseFloat((cartTotal * 5 / 100).toFixed(2)),
        },
        {
            type: 'Delivery charges',
            amount: 5,
        },
    ]

    let subtotal = 0
    totalAmountData.map(e => {
        const amount = Math.round(e.amount)
        subtotal += amount
    })

    useEffect(() => {
        cart_total()
    }, [cartItems])



    const handleIncrement = itemId => {
        const itemIndex = cartItems.findIndex(item => item._data.id === itemId)
        const updatedItem = [...cartItems]
        updatedItem[itemIndex]._data.quantity++
        setCartItems(updatedItem)
    }

    const handleDecrement = itemId => {
        const itemIndex = cartItems.findIndex(item => item._data.id === itemId)
        const updatedItem = [...cartItems]
        updatedItem[itemIndex]._data.quantity = updatedItem[itemIndex]._data.quantity > 1 ? updatedItem[itemIndex]._data.quantity - 1 : 1
        setCartItems(updatedItem)
    }

    const handleDelete = (docRefId) => {
        const newItems = cartItems.filter(item => item._data.docRefId !== docRefId)
        setCartItems(newItems)
        firestore()
            .collection('cartItems')
            .doc(docRefId)
            .delete()
            .then(() => {
                console.log('item deleted!');
                if(newItems.length === 0){
                    resetItems()
                }
            })
    }

    return <>
        <ScrollView>

            <View style={styles.container}>
                {cartItems.map((item, index) => {
                    return <CartCard
                        item={item}
                        increment={handleIncrement}
                        decrement={handleDecrement}
                        remove={handleDelete}
                        key={index}
                    />
                })}

                {/* Calculation */}
                <View style={{ marginTop: spacing.m, gap: spacing.s }}>

                    {totalAmountData.map((item, index) => {
                        return <View style={styles.totalContainer} key={index}>
                            <Text style={styles.type}>{item.type}</Text>
                            <Text style={styles.amount}>${item.amount}</Text>
                        </View>
                    })
                    }

                    <View style={{ height: 1, width: '100%', backgroundColor: colors.lightGray }} />

                    <View style={styles.totalContainer}>
                        <Text style={styles.type}>Subtotal</Text>
                        <Text style={{ fontSize: sizes.title, fontWeight: 700, color: colors.black, }}>${subtotal}</Text>
                    </View>

                </View>
            </View>
        </ScrollView>

        <TouchableOpacity style={styles.button} activeOpacity={0.6}>
            <Text style={styles.buttonText}>Procced to checkout</Text>
        </TouchableOpacity>
    </>
}


const styles = StyleSheet.create({
    container: {
        paddingHorizontal: spacing.m,
        gap: spacing.s,
        marginVertical: spacing.m,
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.m,
    },
    type: {
        fontSize: sizes.h2 - 1,
        color: colors.lightGray,
        fontWeight: 400,
    },
    amount: {
        fontSize: sizes.h2 - 1,
        fontWeight: 500,
        color: colors.black,
    },
    button: {
        height: 50,
        backgroundColor: colors.gold,
        borderRadius: sizes.radius,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: spacing.m,
        marginVertical: spacing.s,
    },
    buttonText: {
        fontSize: sizes.h2 - 4,
        color: colors.black,
    }
})