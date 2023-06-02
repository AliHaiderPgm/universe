import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { colors, sizes, spacing } from '../../../components/constants/theme'
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Icon from '../../../components/shared/Icon';

const IMAGE_HEIGHT = 170;
const IMAGE_WIDTH = 170;
export default function ThankYou() {
    const navigation = useNavigation()
    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Icon icon="leftArrow" size={25} />
                </TouchableOpacity>
            ),
        })
    }, [])
    return (
        <View style={styles.mainContainer}>
            <View style={styles.imageContainer}>
                <Image source={require('../../../assets/purchased.gif')} style={styles.image} />
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.mainHeading}>Thank you!</Text>
                <Text style={[styles.paragraph, { marginTop: spacing.m }]}>Your order is placed.</Text>
                <Text style={styles.paragraph}>Please check the delivery status at <Text style={styles.span}>My Orders</Text> page.</Text>
            </View>
            <View style={styles.callToAction}>
                <Button
                    mode="contained" buttonColor={colors.black} textColor={colors.white} uppercase={true} labelStyle={{ fontSize: sizes.h3 - 2, fontWeight: 700 }}
                    style={styles.btn}
                    onPress={() => { navigation.navigate('Categories') }}
                >
                    Continue shopping
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        height: sizes.height,
        backgroundColor: colors.white,
        alignItems: 'center',
        gap: spacing.m,
        paddingHorizontal: spacing.m,
        paddingTop: spacing.xl + spacing.xl
    },
    imageContainer: {
        height: IMAGE_HEIGHT + 45,
        width: IMAGE_WIDTH + 45,
        borderWidth: 4,
        borderRadius: 150,
        borderColor: colors.lightGray,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: spacing.xl,
    },
    image: {
        height: IMAGE_HEIGHT,
        width: IMAGE_WIDTH,
        resizeMode: 'contain',
    },
    contentContainer: {
        paddingHorizontal: spacing.xl,
        marginTop: spacing.m,
        marginBottom: spacing.xl,
    },
    mainHeading: {
        color: colors.black,
        fontSize: sizes.title + 10,
        fontWeight: 700,
        alignSelf: 'center'
    },
    paragraph: {
        color: colors.lightGray,
        fontSize: sizes.h2 - 2,
        fontWeight: 400,
        marginHorizontal: spacing.m,
        textAlign: 'center',
    },
    span: {
        color: colors.black,
        fontSize: sizes.h3,
        fontWeight: 600,
    },
    btn: {
        paddingVertical: spacing.s,
        paddingHorizontal: spacing.l,
        borderRadius: 8,
        borderTopRightRadius: 1,
        marginTop: spacing.xl
    }
})