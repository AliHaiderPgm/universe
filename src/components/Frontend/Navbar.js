import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
//Components
import { colors, spacing } from '../constants/theme'
import Icon from '../shared/Icon'

export default function Navbar() {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <Image source={require('../../assets/universe-black.png')} style={styles.logo} />
            <View style={styles.searchAndCart}>
                <Icon icon="search" size={25} onPress={() => navigation.navigate('search')} />
                <Icon icon="cart" size={25} onPress={() => navigation.navigate('cart')} />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.m,
        paddingVertical: spacing.s,
        backgroundColor: colors.white,
        elevation: 5,
    },
    logo: {
        height: 32,
        width: 100,
        resizeMode: 'contain',
    },
    searchAndCart: {
        flexDirection: 'row',
        gap: spacing.s - 5
    },
})