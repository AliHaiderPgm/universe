import React from 'react'
import { StyleSheet, View, ScrollView, TouchableOpacity, Image, Text } from 'react-native'
// import { BRANDS } from '../../../data'
import { useNavigation } from '@react-navigation/native'
import { colors, sizes, spacing } from '../../../components/constants/theme'

const CARD_HEIGHT = 180
const CARD_WIDTH = 150
export const BrandCards = ({ data, onPress }) => {
    return (
        <TouchableOpacity style={styles.cardContainer} activeOpacity={0.8} onPress={onPress}>
            <Image source={{ uri: data.logoImage }} style={styles.logo} />
            <View style={styles.nameConatiner}>
                <Text style={styles.name}>{data.name}</Text>
            </View>
        </TouchableOpacity>
    )
}
export default function Brands() {
    const navigation = useNavigation()
    const BRANDS = [
        {
            name: "Gap Kids",
            logoImage: "https://brandslogos.com/wp-content/uploads/images/large/gap-kids-logo-black-and-white.png",
        },
        {
            name: "Nike",
            logoImage: "https://static.vecteezy.com/system/resources/previews/010/994/232/original/nike-logo-black-clothes-design-icon-abstract-football-illustration-with-white-background-free-vector.jpg"
        },
        {
            name: "ASOS",
            logoImage: "https://content.asos-media.com/-/media/homepages/unisex/brands-logos/256x256/asos-design-logo_256_v4.png"
        },
        {
            name: "Zara",
            logoImage: "https://assets.stickpng.com/images/585990814f6ae202fedf28d6.png"
        },
        {
            name: "Misguided",
            logoImage: "https://upload.wikimedia.org/wikipedia/commons/0/05/Missguided.jpg"
        },
        {
            name: "Valentino",
            logoImage: "https://i.pinimg.com/originals/47/71/cc/4771cc779936d37fdc94e62236cc4580.jpg"
        },
        {
            name: "Gucci",
            logoImage: "https://static.vecteezy.com/system/resources/previews/020/336/406/original/gucci-logo-gucci-icon-free-free-vector.jpg"
        },
        {
            name: "Balenciaga",
            logoImage: "https://balenciaga.dam.kering.com/m/30fdf48e5a0e7773/Medium-648433T15671070_L.jpg?v=0"
        }
    ]
    return (
        <ScrollView>
            <View style={styles.cardsContainer}>
                {BRANDS.map((brand, index) => {
                    return <BrandCards data={brand} key={index} onPress={() => navigation.navigate('brandDetail', { brandDetails: brand })} />
                })}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    cardsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: "center",
        margin: spacing.s,
        gap: spacing.m
    },
    cardContainer: {
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        borderRadius: sizes.radius,
        overflow: 'hidden',
        elevation: 7,
        backgroundColor: colors.white
    },
    logo: {
        height: CARD_HEIGHT - 30,
        width: CARD_WIDTH,
        resizeMode: 'contain',
    },
    nameConatiner: {
        paddingHorizontal: spacing.s,
    },
    name: {
        color: colors.black,
        fontSize: sizes.h3,
        fontWeight: '600'
    }
})