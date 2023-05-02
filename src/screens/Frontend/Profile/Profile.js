import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { SETTING_OPTIONS, USERS } from '../../../data'
import ScreenHeader from '../../../components/shared/ScreenHeader'
import UserHeader from '../../../components/Frontend/Profile/UserHeader'
import Options from '../../../components/Frontend/Profile/Options'
import { colors, spacing } from '../../../components/constants/theme'
import auth from '@react-native-firebase/auth';
import { useToast } from 'native-base'
import { Button } from 'react-native-paper'
import UserNotFound from '../../../components/Frontend/Profile/UserNotFound'
import { useAuth } from '../../../Context/AuthContext'

export default function Profile() {
  const toast = useToast()
  const {isAuthenticated, dispatch, user} = useAuth()
  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => {
        notify('Logged out.', 'green')
        dispatch({type:'LOGOUT'})
      });
  }
  const notify = (message, color) => {
    toast.show({ title: message, placement: 'top', duration: 2000, backgroundColor: `${color}.800` })
  }
  if (!isAuthenticated) {
    return (
      <UserNotFound />
    );
  }
  return (
    <ScrollView style={styles.container}>
      <ScreenHeader title="Profile" icon="cart" navigateTo="cart" />
      <UserHeader data={USERS[1]} userName={user?.displayName} />
      <Options list={SETTING_OPTIONS} />
      <View style={styles.btnContainer}>
        <Button mode="contained" buttonColor={colors.black} textColor={colors.white}
          style={styles.btn}
          onPress={() => handleLogout()}
        >
          Logout
        </Button>
      </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
  },
  btnContainer:{
    paddingHorizontal:spacing.m,
    backgroundColor:colors.white,
    height:70,
    justifyContent:'center',
  },
  btn: {
    paddingVertical: spacing.s - 5,
    borderRadius: 8,
    borderTopRightRadius: 1,
  }
})