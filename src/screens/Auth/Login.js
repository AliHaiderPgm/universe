import React, { useState } from 'react'
import { Image, StyleSheet, Text, View, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { colors, sizes, spacing } from '../../components/constants/theme'
import { Button, TextInput } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { validEmail, validPassword } from '../../components/Global'
import auth from '@react-native-firebase/auth';

const initialState = {
  email: '',
  password: ''
}
export default function Login() {
  const [state, setState] = useState(initialState)
  const [emailValid, setEmailValid] = useState(true)
  const [passwordValid, setPasswordValid] = useState(true)
  const navigation = useNavigation()
  const handleChange = (name, value) => {
    setState(s => ({ ...s, [name]: value }))
  }

  const handleLogin = () => {
    let { email, password } = state
    if (!validEmail.test(email)) {
      setEmailValid(false)
      return
    }
    if (!validPassword.test(password)) {
      setPasswordValid(false)
      return
    }

    setEmailValid(true)
    setPasswordValid(true)

    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  }
  return (
    <KeyboardAvoidingView behavior={"height"} enabled={true} style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View style={styles.imageContainer}>
            <Image source={require('../../assets/appLogo.png')} style={styles.image} />
          </View>
          <View style={styles.formContainer}>
            <Text style={styles.label}>Log in</Text>
            <TextInput
              mode='outlined' activeOutlineColor={colors.black} outlineColor={colors.black} textColor='black'
              label="Email"
              value={state.email}
              onChangeText={text => handleChange('email', text)}
              style={styles.inputField}
              keyboardType='email-address'
              error={!emailValid ? true : false}
            />
            <TextInput
              mode='outlined' activeOutlineColor={colors.black} outlineColor={colors.black} textColor='black'
              label="Password"
              value={state.password}
              onChangeText={text => handleChange('password', text)}
              style={styles.inputField}
              secureTextEntry={true}
              error={!passwordValid ? true : false}
            />
            <Button
              mode="contained" buttonColor={colors.black} textColor={colors.white}
              style={styles.btn}
              onPress={() => handleLogin()}
            >
              Login
            </Button>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.s }}>
              <Button mode="text" textColor={colors.black} style={styles.btn} onPress={() => navigation.navigate('register')}>
                Don't have an account?
              </Button>
              <Button mode="text" textColor={colors.black} style={styles.btn} onPress={() => navigation.navigate('forgotPassword')}>
                ForgotPassword?
              </Button>
            </View>

          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  inner: {
    flex: 1,
    justifyContent: 'space-around',
  },
  imageContainer: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 15,
    borderTopRightRadius: 3,
    padding: 35,
    resizeMode: 'contain',
    backgroundColor: colors.white
  },
  label: {
    color: colors.black,
    fontSize: sizes.title,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.m,
  },
  formContainer: {
    borderTopLeftRadius: 85,
    paddingHorizontal: spacing.m,
    paddingTop: spacing.xl,
    // justifyContent: 'center', 
    backgroundColor: colors.light,
    height: 645,
  },
  inputField: {
    backgroundColor: colors.white,
    marginBottom: spacing.m,
    borderRadius: 8,
  },
  btn: {
    paddingVertical: spacing.s - 5,
    borderRadius: 8,
    borderTopRightRadius: 1,
  }
})