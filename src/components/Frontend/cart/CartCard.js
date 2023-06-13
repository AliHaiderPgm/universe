import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
//components
import { colors, shadow, sizes, spacing } from '../../constants/theme'
import Icon from '../../shared/Icon'

export default function CartCard({ item, increment, decrement, remove }) {
    let size;
    if (item._data.size === 'S') {
        size = 'Small'
    } else if (item._data.size === 'M') {
        size = 'Medium'
    } else if (item._data.size === 'L') {
        size = 'Large'
    } else {
        size = 'Extra Large'
    }
    return (
        <View style={[shadow.dark, styles.cardWrapper]} key={item._data.id}>

            <View style={styles.quantityContainer}>
                <TouchableOpacity style={styles.btn} onPress={() => increment(item._data.id)}>
                    <Text style={styles.text}>+</Text>
                </TouchableOpacity>

                <Text style={styles.text}>{item._data.quantity}</Text>

                <TouchableOpacity style={styles.btn} onPress={() => decrement(item._data.id)}>
                    <Text style={styles.text}>-</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.imageContainer}>
                <Image source={{ uri: item._data.imageUrl }} style={styles.image} />
            </View>

            <View style={styles.detailsContainer}>
                <Text style={styles.title}>{item._data.name}</Text>
                <Text style={styles.size}>{size}</Text>
                <View style={[styles.color, { backgroundColor: item._data.color }]} />
                <Text style={styles.price}>Rs.{item._data.price.toFixed(0)}</Text>
            </View>

            <TouchableOpacity style={styles.deleteButtonContainer} onPress={() => remove(item._data.docRefId)}>
                <Icon icon="close" size={13} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    cardWrapper: {
        paddingHorizontal: spacing.m,
        height: sizes.cardHeight,
        backgroundColor: colors.white,
        borderRadius: sizes.radius,
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: spacing.s,
        flexDirection: 'row',
    },
    quantityContainer: {
        overflow: 'hidden',
        borderWidth: 0.5,
        borderRadius: sizes.radius,
        width: spacing.xl,
        height: sizes.cardHeight / 2 + 35,
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.s,
    },
    btn: {
        width: '100%',
        height: '33%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: sizes.h2,
        color: colors.black,
    },
    imageContainer: {
        width: 115,
        height: sizes.cardHeight / 2 + 35,
        borderRadius: sizes.radius,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    detailsContainer: {
        width: 80,
    },
    title: {
        fontSize: sizes.h2,
        fontWeight: 'bold',
        color: colors.black,
    },
    size: {
        fontWeight: 'bold',
        fontSize: sizes.h3,
        color: colors.black,
    },
    price: {
        fontWeight: 'bold',
        fontSize: sizes.h3,
        color: colors.gold,
    },
    color: {
        height: 22,
        width: 22,
        borderRadius: sizes.radius,
    },
    deleteButtonContainer: {
        position: 'relative',
        top: 15,
        padding: 4.5,
        alignSelf: 'flex-start',
    },
})