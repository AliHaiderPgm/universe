import React from 'react'
import { View, StyleSheet } from 'react-native'
//components
import { colors, sizes, spacing } from '../../constants/theme'
import OptionCard from '../../shared/OptionCard'

export default function Options({ list }) {
    return (
        <View style={styles.container}>
            {list.map((item, index) => {return <OptionCard data={item} key={index}/>})}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        gap: spacing.s,
        backgroundColor: colors.white,
        borderTopLeftRadius: sizes.radius,
        borderTopRightRadius: sizes.radius,
        elevation: 9,
        paddingTop: spacing.l,
        paddingBottom: spacing.s,
    },
})