import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { StyleSheet, View, Text, ScrollView } from 'react-native'
import { SETTING_OPTIONS, USERS } from '../../../data'
import ScreenHeader from '../../../components/shared/ScreenHeader'
import UserHeader from '../../../components/Frontend/Profile/UserHeader'
import Options from '../../../components/Frontend/Profile/Options'
import { colors, spacing } from '../../../components/constants/theme'
import auth from '@react-native-firebase/auth';
import { useToast } from 'native-base'
import { Button } from 'react-native-paper'
import UserNotFound from '../../../components/Frontend/Profile/UserNotFound'

export default function Profile() {
  const toast = useToast()
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [user]);
  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => notify('Logged out.', 'green'));
  }
  const notify = (message, color) => {
    toast.show({ title: message, placement: 'top', duration: 2000, backgroundColor: `${color}.800` })
  }
  if (initializing) return null;
  if (!user) {
    return (
      <UserNotFound />
    );
  }
  return (
    <ScrollView style={styles.container}>
      <ScreenHeader title="Profile" icon="cart" navigateTo="cart" />
      <UserHeader data={USERS[1]} userName={user.displayName} />
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