import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Profile from './Profile'
import { colors } from '../../../components/constants/theme'

export default function Index() {
    const ProfileNavigator = createNativeStackNavigator()
  return (
    <ProfileNavigator.Navigator>
      <ProfileNavigator.Screen name="Home" component={Profile} options={{headerShown: false, statusBarColor: colors.light}}/>
    </ProfileNavigator.Navigator>
  )
}