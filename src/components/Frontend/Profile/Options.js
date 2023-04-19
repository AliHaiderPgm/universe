import React from 'react'
import { View, StyleSheet } from 'react-native'
import { colors, sizes, spacing } from '../../constants/theme'
import OptionCard from '../../shared/OptionCard'

export default function Options({ list }) {
    return (
        <View style={styles.container}>
            {
                list.map((item, index) => {
                    return (
                        <OptionCard data={item} key={index}/>
                    )
                })
            }
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: spacing.m,
        gap: spacing.s,
        backgroundColor: colors.white,
        borderTopLeftRadius: sizes.radius,
        borderTopRightRadius: sizes.radius,
        elevation: 7,
        paddingTop: spacing.l,
        height: sizes.height,
    },
    cardWrapper: {
        height: 70,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.m,
    },
    textWrapper: {
        flexDirection: 'row-reverse',
        gap: spacing.m,
        height: '100%',
        alignItems: 'center',
    },
    icon: {
        borderWidth: 0.15,
        borderColor: colors.gold,
        padding: spacing.m - 5,
        borderRadius: sizes.radius,
        backgroundColor: colors.lightGold,
    },
    title: {
        fontSize: sizes.h2,
        fontWeight: '600'
    },
    next:{
        borderWidth: 0.3,
        borderColor: colors.black,
        padding: spacing.m - 10,
        borderRadius: sizes.radius,
    }
})