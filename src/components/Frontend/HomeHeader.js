import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
//components
import { colors, sizes, spacing } from '../constants/theme'

export default function HomeHeader({ mainHeading, secondTitle }) {
  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>{mainHeading}</Text>
      <Text style={styles.secondTitle}>{secondTitle}</Text>
      <Image source={require('../../assets/icons/arc.png')} style={styles.shape} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.l,
    paddingVertical: spacing.s,
  },
  mainTitle: {
    fontSize: sizes.h2 + 5,
    fontWeight: 'bold',
    color: colors.black,
  },
  secondTitle: {
    color: colors.black,
    fontSize: sizes.h2 + 5,
  },
  shape: {
    position: 'absolute',
    bottom: -10,
    left: '35%',
    zIndex: -1,
    height: 35,
    width: 35,
    resizeMode: 'contain',
    transform: [{ rotate: '10deg' }]
  },
})