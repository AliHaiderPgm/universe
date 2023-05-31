import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
//components
import { colors, sizes, spacing } from '../../constants/theme'
import { useAuth } from '../../../Context/AuthContext'

const IMAGE_HEIGHT = 80;
const IMAGE_WIDTH = 80;
export default function UserHeader() {
    const { user } = useAuth()
    return (
        <View style={styles.mainContainer}>
            <View style={styles.imageContainer}>
                <Image
                    source={user.photoURL ? { uri: user.photoURL } : require('../../../assets/icons/user.png')}
                    style={styles.avatar}
                />
            </View>
            <Text style={styles.userName}>{user?.displayName}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    mainContainer: {
        height: 180,
        width: sizes.width,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        height: IMAGE_HEIGHT,
        width: IMAGE_WIDTH,
        borderRadius: 50,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 7,
        backgroundColor: colors.white
    },
    avatar: {
        height: IMAGE_HEIGHT,
        width: IMAGE_WIDTH,
        resizeMode: 'cover'
    },
    userName: {
        fontSize: sizes.title,
        fontWeight: 'bold',
        color: colors.black,
        marginTop: spacing.s
    }
})