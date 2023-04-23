import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './Login'
import Register from './Register'
import ForgotPassword from './ForgotPassword'
import { colors } from '../../components/constants/theme'

export default function Index() {
  const AuthStack = createNativeStackNavigator()
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="login" component={Login} options={{statusBarColor: colors.black,headerTitle: '', headerTransparent: true,}}/>
      <AuthStack.Screen name="register" component={Register} options={{statusBarColor: colors.black, headerTitle:'',headerTransparent:true,}}/>
      <AuthStack.Screen name="forgotPassword" component={ForgotPassword} options={{statusBarColor: colors.black, headerTitle:'',headerTransparent:true,}}/>
    </AuthStack.Navigator>
  )
}