import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
//context
import { useAuth } from '../../../Context/AuthContext'
//components
import { colors, sizes, spacing } from '../../constants/theme'

export default function NoProductFound() {
  const naviagtion = useNavigation()
  const { isAuthenticated } = useAuth()
  return (
    <View style={styles.container}>
      {
        isAuthenticated ? <>
          <Image source={require('../../../assets/empty_cart.png')} style={styles.image} />
          <Text style={styles.heading}>Your cart is empty</Text>
          <Text style={styles.desc}>Looks like you haven't added anything to your cart yet</Text>
          <TouchableOpacity style={styles.btn} onPress={() => naviagtion.navigate("Categories", { name: 'Home' })} activeOpacity={0.5}>
            <Text style={styles.text}>SHOP NOW</Text>
          </TouchableOpacity>
        </>
          : <>
            <Text style={styles.heading}>Please login to view cart products.</Text>
            <TouchableOpacity style={styles.btn} onPress={() => naviagtion.navigate("auth", { name: 'login' })} activeOpacity={0.5}>
              <Text style={styles.text}>LOGIN</Text>
            </TouchableOpacity>
          </>
      }
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.m,
    alignItems: 'center',
    justifyContent: 'center',
    height: sizes.height,
    gap: spacing.s,
    flex: 1,
  },
  image: {
    height: 250,
    width: 250,
    resizeMode: 'contain'
  },
  heading: {
    fontSize: sizes.h2,
    color: colors.lightGray
  },
  desc: {
    fontSize: sizes.h3,
    color: colors.lightGray,
    textAlign: 'center',
    width: 200,
  },
  btn: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.m - 7,
    marginTop: spacing.l,
    borderRadius: sizes.radius,
    fontSize: sizes.h3,
    backgroundColor: colors.gold
  },
  text: {
    color: colors.black,
    fontWeight: '600'
  },
})