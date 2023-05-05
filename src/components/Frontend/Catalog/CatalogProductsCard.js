import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
//components
import { colors, sizes, spacing } from '../../constants/theme'


const CARD_HEIGHT = 180;
const CARD_WIDTH = 115;
export default function CatalogProductsCard({ list }) {
    const naviagtion = useNavigation()
    return (<>
        {
            list.map((item, index) => {
                return <TouchableOpacity activeOpacity={0.8} style={styles.wrapper} key={index} onPress={()=> naviagtion.navigate('productDetail', {product:item})}>
                    <View style={styles.container} >
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: item.imageUrl }} style={styles.image} />
                        </View>
                        <View style={styles.detailsContainer}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.price}>${item.price}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            })
        }
    </>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        gap: spacing.m,
        backgroundColor: colors.white
    },
    container: {
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        borderRadius: sizes.radius,
        elevation: 7,
        backgroundColor: colors.white,
        overflow: 'hidden',
    },
    image: {
        height: CARD_HEIGHT - 55,
        width: CARD_WIDTH,
        resizeMode: 'cover',
        backgroundColor: colors.white
    },
    detailsContainer: {
        padding: spacing.s,
        backgroundColor: colors.white
    },
    name: {
        color: colors.black,
        fontSize: sizes.caption + 1,
        fontWeight: '500',
    },
    price: {
        color: colors.gray,
        fontSize: sizes.caption + 1,
    },
})