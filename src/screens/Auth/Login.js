import React, { useState } from 'react'
import { Image, StyleSheet, Text, View, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { Button, HelperText, TextInput, shadow } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import auth from '@react-native-firebase/auth';
import { useToast } from 'native-base'
//components
import { validEmail } from '../../components/Global'
import { colors, sizes, spacing } from '../../components/constants/theme'

const initialState = {
  email: '',
  password: ''
}
export default function Login() {
  const [state, setState] = useState(initialState)
  const [emailValid, setEmailValid] = useState(true)
  const [passwordValid, setPasswordValid] = useState(true)
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const navigation = useNavigation()
  const handleChange = (name, value) => {
    setState(s => ({ ...s, [name]: value }))
  }

  const handleLogin = () => {
    let { email, password } = state
    if (!validEmail.test(email.trim())) {
      setEmailValid(false)
      return
    }
    setEmailValid(true)
    if (password.length <= 6) {
      setPasswordValid(false)
      return
    }
    setPasswordValid(true)

    setLoading(true)
    auth()
      .signInWithEmailAndPassword(email.trim(), password)
      .then(() => {
        navigation.goBack()
      })
      .catch(error => {
        if (error.code === 'auth/user-not-found') {
          notify('Email or password is incorrect!', 'error')
        } else if (error.code === 'auth/wrong-password') {
          notify('Email or password is incorrect!', 'error')
        } else if (error.code === 'auth/network-request-failed') {
          notify('Check your network!', 'error')
        } else {
          notify('Something went wrong!', 'error')
        }
      }).finally(() => {
        setLoading(false)
      })
  }
  const notify = (message, color) => {
    toast.show({ description: message, placement: 'top', duration: 2000, backgroundColor: `${color}.700`, shadow: '9' })
  }
  return (
    <KeyboardAvoidingView behavior={"height"} enabled={true} style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View style={styles.imageContainer}>
            <Image source={require('../../assets/universe.gif')} style={styles.image} />
          </View>
          <View style={styles.formContainer}>

            <Text style={styles.label}>Log in</Text>

            <TextInput
              label="Email"
              mode='outlined' activeOutlineColor={colors.black} outlineColor={colors.black} textColor='black'
              value={state.email}
              onChangeText={text => handleChange('email', text)}
              style={styles.inputField}
              keyboardType='email-address'
              error={!emailValid}
            />
            {
              !emailValid && <HelperText type="error" visible={true} style={{ marginTop: -20, color: 'red' }}>
                Invalid email address!
              </HelperText>
            }

            <TextInput
              label="Password"
              mode='outlined' activeOutlineColor={colors.black} outlineColor={colors.black} textColor='black'
              value={state.password}
              onChangeText={text => handleChange('password', text)}
              style={styles.inputField}
              secureTextEntry={true}
              error={!passwordValid}
            />
            {
              !passwordValid && <HelperText type="error" visible={true} style={{ marginTop: -20, color: 'red' }}>
                Invalid password!
              </HelperText>
            }

            <Button
              mode="contained" buttonColor={colors.black} textColor={colors.white}
              style={styles.btn}
              onPress={loading ? null : () => handleLogin()}
              loading={loading}
            >
              Login
            </Button>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.s }}>
              <Button
                mode="text"
                textColor={colors.black}
                style={styles.btn}
                onPress={() => navigation.navigate('register')}>
                Don't have an account?
              </Button>

              <Button
                mode="text"
                textColor={colors.black}
                style={styles.btn}
                onPress={() => navigation.navigate('forgotPassword')}>
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
    backgroundColor: '#000',
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
    height: 200,
    resizeMode: 'contain',
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
    backgroundColor: colors.light,
    height: 645,
  },
  inputField: {
    backgroundColor: colors.white,
    marginBottom: spacing.m,
    borderRadius: 8,
  },
  btn: {
    paddingVertical: spacing.s,
    borderRadius: 8,
    borderTopRightRadius: 1,
  }
})