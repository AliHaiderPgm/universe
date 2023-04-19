import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Categories from './Catalog'
import { colors } from '../../../components/constants/theme'

export default function Index() {
    const CategoryNavigator = createNativeStackNavigator()
  return (
    <CategoryNavigator.Navigator>
      <CategoryNavigator.Screen name="Home" component={Categories} options={{headerShown: false, statusBarColor: colors.light}}/>
    </CategoryNavigator.Navigator>
  )
}