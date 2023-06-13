import React, { useEffect, useState } from 'react'
import { StyleSheet, View, ScrollView, TouchableOpacity, Image, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { colors, sizes, spacing } from '../../../components/constants/theme'
import firestore from '@react-native-firebase/firestore'
import { useToast } from 'native-base'
import { ActivityIndicator } from 'react-native-paper'

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
    const [brands, setBrands] = useState([])
    const [loading, setLoading] = useState(false)
    const toast = useToast()
    const [unsubscribe, setUnsubscribe] = useState(null)

    const notify = (title, color) => { toast.show({ title: title, backgroundColor: `${color}.700`, placement: 'top', duration: 2000, shadow: '9' }) }

    const getBrands = async () => {
        setBrands([])
        setLoading(true)
        try {
            await firestore().collection('brands').get()
                .then(documentSnapShot => {
                    documentSnapShot.forEach(doc => {
                        setBrands(s => [...s, doc.data()])
                    })
                })
            setUnsubscribe(unsubscribe) // Store the unsubscribe function
        } catch (error) {
            notify('Something went wrong!', 'error')
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getBrands()
        return () => {
            if (unsubscribe) {
                unsubscribe(); // Unsubscribe from the Firestore listener when the component unmounts
            }
        }
    }, [])
    return (
        <ScrollView>
            {
                loading ? <View style={{ height: sizes.height, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator color={colors.black} size="large" />
                </View>
                    :
                    <View style={styles.cardsContainer}>
                        {brands.map((brand, index) => {
                            return <BrandCards data={brand} key={index} onPress={() => navigation.navigate('brandDetail', { brandDetails: brand })} />
                        })}
                    </View>
            }
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