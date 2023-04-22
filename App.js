import React, { useEffect } from 'react'
import SplashScreen from 'react-native-splash-screen'
import MainNavigator from './src/navigation/MainNavigator'
import { Provider as PaperProvider } from 'react-native-paper'

export default function App() {
  useEffect(()=>{
    SplashScreen.hide()
  },[])
  return (
    <PaperProvider>
      <MainNavigator/>
    </PaperProvider>
  )
}