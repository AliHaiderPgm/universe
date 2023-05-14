import React from 'react'
import { StyleSheet, View, ScrollView, TouchableOpacity, Image, Text } from 'react-native'
import { BRANDS } from '../../../data'
import { useNavigation } from '@react-navigation/native'
import { colors, sizes, spacing } from '../../../components/constants/theme'

const CARD_HEIGHT = 180
const CARD_WIDTH = 150
export const BrandCards = ({data, onPress}) => {
    return(
        <TouchableOpacity style={styles.cardContainer} activeOpacity={0.8} onPress={onPress}>
            <Image source={{uri: data.logoImage}} style={styles.logo}/> 
            <View style={styles.nameConatiner}>
                <Text style={styles.name}>{data.name}</Text>
            </View>
        </TouchableOpacity>
    )
}
export default function Brands() {
    const navigation = useNavigation()
    return (
        <ScrollView>
            <View style={styles.cardsContainer}>
                {BRANDS.map((brand, index) => {
                    return <BrandCards data={brand} key={index} onPress={()=> navigation.navigate('brandDetail',{name:brand.name})}/>
                })}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    cardsContainer:{
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:"center",
        margin: spacing.s,
        gap: spacing.m
    },
    cardContainer:{
        height: CARD_HEIGHT,
        width:CARD_WIDTH,
        borderRadius: sizes.radius,
        overflow:'hidden',
        elevation: 7,
        backgroundColor: colors.white
    },
    logo:{
        height: CARD_HEIGHT - 30,
        width: CARD_WIDTH,
        resizeMode:'contain',
        backgroundColor: colors.primary
    },
    nameConatiner:{
        paddingHorizontal: spacing.s,
    },
    name:{
        color: colors.black,
        fontSize: sizes.h3,
        fontWeight:'600'
    }
})