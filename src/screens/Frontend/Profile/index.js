import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
//component
import { colors } from '../../../components/constants/theme'
import { useAuth } from '../../../Context/AuthContext'
//pages
import Profile from './Profile'

export default function Index() {
  const ProfileNavigator = createNativeStackNavigator()
  const {isAuthenticated} = useAuth()
  return (
    <ProfileNavigator.Navigator>
      <ProfileNavigator.Screen name="Home" component={Profile} options={{ headerShown: false,statusBarColor: isAuthenticated ? colors.white : colors.black }} />
    </ProfileNavigator.Navigator>
  )
}