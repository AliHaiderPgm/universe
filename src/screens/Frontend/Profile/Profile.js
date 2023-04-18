import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Button, View } from 'react-native'
import { SETTING_OPTIONS, USERS } from '../../../data'
import ScreenHeader from '../../../components/shared/ScreenHeader'
import UserHeader from '../../../components/Frontend/Profile/UserHeader'
import Options from '../../../components/Frontend/Profile/Options'

export default function Profile() {
  const navigation = useNavigation()
  return (
    <View>
      <ScreenHeader title="Profile" icon="cart" navigateTo="cart"/>
      <Button title="Login" onPress={()=> navigation.navigate("auth", {screen: 'login'})}/>
      <UserHeader data={USERS[1]}/>
      <Options list={SETTING_OPTIONS}/>
    </View>
  )
}