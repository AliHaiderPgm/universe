import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
//components
import { colors, sizes, spacing } from '../constants/theme'
import Icon from '../shared/Icon'

export default function SectionHeader({ title, onPress, showArrow = true }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      { showArrow &&
        <TouchableOpacity style={styles.btnContainer} onPress={()=> onPress}>
          <Icon icon="rightArrow" size={21} />
        </TouchableOpacity>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.l,
    paddingVertical: spacing.m
  },
  title: {
    fontSize: sizes.h3,
    fontWeight: 'bold',
    color: colors.black
  },
  btnContainer: {
    flexDirection: 'row'
  },
})