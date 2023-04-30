import React, { useEffect } from 'react'
import SplashScreen from 'react-native-splash-screen'
import MainNavigator from './src/navigation/MainNavigator'
import { Provider as PaperProvider } from 'react-native-paper'
import './src/components/Global'
import { NativeBaseProvider } from 'native-base'

export default function App() {
  useEffect(() => {
    SplashScreen.hide()
  }, [])
  return (
    <NativeBaseProvider>
      <PaperProvider>
        <MainNavigator />
      </PaperProvider>
    </NativeBaseProvider>
  )
}