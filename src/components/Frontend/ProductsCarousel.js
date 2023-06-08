import React from 'react'
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native'
//components
import { colors, shadow, sizes, spacing } from '../constants/theme'
import ProductCard from '../shared/ProductCard';
import { useNavigation } from '@react-navigation/native';


const CARD_HEIGHT = 180;
export default function ProductsCarousel({ list, inProductCard }) {
    const CARD_WIDTH = sizes.width - 100;
    const CARD_WIDTH_SPACING = CARD_WIDTH + spacing.l;
    const navigation = useNavigation()
    return (
        <FlatList
            data={list}
            keyExtractor={i => i.id}
            snapToInterval={inProductCard ? CARD_WIDTH_SPACING + 40 : CARD_WIDTH_SPACING}
            decelerationRate="fast"
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={
                !inProductCard ? ({ item, index }) => {
                    return (
                        <TouchableOpacity
                            style={{
                                marginLeft: spacing.l,
                                marginRight: index === list.length - 1 ? spacing.l : 0,
                                backgroundColor: colors.white,
                            }}
                            activeOpacity={0.8}
                            onPress={() => navigation.navigate('productDetail', { product: item })}
                        >
                            <View style={[{ width: CARD_WIDTH }, styles.card, shadow.dark]}>
                                <View style={[{ width: CARD_WIDTH }, styles.imageConatiner]}>
                                    <Image source={{ uri: item.imageUrl }} style={[{ width: CARD_WIDTH }, styles.image]} />
                                </View>
                                <View style={styles.textContainer}>
                                    <Text style={styles.title}>{item.name}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                }
                    :
                    ({ item, index }) => {
                        return <ProductCard cardData={item} key={index} carousel={true} />
                    }
            } />
    )
}

const styles = StyleSheet.create({
    card: {
        height: CARD_HEIGHT,
        marginVertical: 10,
        backgroundColor: colors.white,
        borderRadius: sizes.radius
    },
    imageConatiner: {
        height: CARD_HEIGHT,
        borderRadius: sizes.radius,
        overflow: 'hidden',
    },
    image: {
        height: CARD_HEIGHT,
        resizeMode: 'cover'
    },
    textContainer: {
        position: 'absolute',
        top: CARD_HEIGHT - 40,
        left: 16
    },
    title: {
        fontSize: sizes.h2,
        fontWeight: 'bold',
        color: colors.white,
    },
    price: {
        fontSize: sizes.h2,
        color: colors.white
    },
})