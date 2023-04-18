import React, { useEffect } from 'react'
import SplashScreen from 'react-native-splash-screen'
import MainNavigator from './src/navigation/MainNavigator'

export default function App() {
  useEffect(()=>{
    SplashScreen.hide()
  },[])
  return (<MainNavigator/>)
}