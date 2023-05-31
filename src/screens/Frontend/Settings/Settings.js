import React, { useEffect } from 'react'
import auth from '@react-native-firebase/auth';
import { StyleSheet, View, ScrollView } from 'react-native'
import { useToast } from 'native-base'
import { Button } from 'react-native-paper'
//context
import { useAuth } from '../../../Context/AuthContext'
//data
import { SETTING_OPTIONS, USERS } from '../../../data'
//components
import ScreenHeader from '../../../components/shared/ScreenHeader'
import UserHeader from '../../../components/Frontend/Settings/UserHeader'
import Options from '../../../components/Frontend/Settings/Options'
import UserNotFound from '../../../components/Frontend/Settings/UserNotFound'
import { colors, spacing } from '../../../components/constants/theme'
import { useNavigation } from '@react-navigation/native';
import Icon from '../../../components/shared/Icon';

export default function Settings() {
  const toast = useToast()
  const { isAuthenticated, dispatch } = useAuth()
  const navigation = useNavigation()
  useEffect(() => {
    navigation.setOptions({ headerRight: () => (<Icon icon="cart" size={25} onPress={() => navigation.navigate('cart')} />), })
  }, [])
  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => {
        notify('Logged out!', 'success')
        dispatch({ type: 'LOGOUT' })
      });
  }
  const notify = (message, color) => {
    toast.show({ title: message, placement: 'top', duration: 2000, backgroundColor: `${color}.700`, shadow: '9' })
  }
  if (!isAuthenticated) { return <UserNotFound /> }

  return (
    <ScrollView style={styles.container}>
      <UserHeader />
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
  btnContainer: {
    paddingHorizontal: spacing.m,
    backgroundColor: colors.white,
    height: 70,
    justifyContent: 'center',
  },
  btn: {
    paddingVertical: spacing.s - 5,
    borderRadius: 8,
    borderTopRightRadius: 1,
  }
})