import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { colors, sizes, spacing } from '../constants/theme'
import Icon from '../shared/Icon'

export default function ScreenHeader({ title, icon, navigateTo, style }) {
    const navigation = useNavigation()
    return (
        <View style={[styles.container, style]}>
            <Icon icon="leftArrow" onPress={() => navigation.goBack()} />
            <Text style={styles.heading}>{title}</Text>
            {
                navigateTo ?
                    <Icon
                        icon={icon}
                        size={24}
                        onPress={() => navigation.navigate(navigateTo)}
                    />
                    :
                    <Icon size={24}/>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.m,
        paddingBottom: spacing.m,
    },
    heading: {
        fontSize: sizes.h2,
        color: colors.black,
    }
})