import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
//component
import { colors } from '../../../components/constants/theme'
import { useAuth } from '../../../Context/AuthContext'
//pages
import Settings from './Settings'

export default function Index() {
  const ProfileNavigator = createNativeStackNavigator()
  const { isAuthenticated } = useAuth()
  return (
    <ProfileNavigator.Navigator>
      <ProfileNavigator.Screen name="Home" component={Settings} options={{
        statusBarColor: isAuthenticated ? colors.white : colors.black,
        statusBarStyle: isAuthenticated ? 'dark' : 'light',
        headerShown: isAuthenticated ? true : false,
        title: 'Settings'
      }}
      />
    </ProfileNavigator.Navigator>
  )
}