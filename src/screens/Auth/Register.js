import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { colors, sizes, spacing } from '../../components/constants/theme'
import { Button, HelperText, TextInput } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { validEmail, validPassword } from '../../components/Global'
import auth, { firebase } from '@react-native-firebase/auth';
import { useToast } from 'native-base'
import { useAuth } from '../../Context/AuthContext'

const initialState = {
  firstName: '',
  secondName: '',
  email: '',
  password: '',
  confirmPassword: '',
}
export default function Register() {
  const [state, setState] = useState(initialState)
  const navigation = useNavigation()
  const [emailValidation, setEmailValidation] = useState(true)
  const [passwordValidation, setPasswordValidation] = useState(true)
  const [validConfirmPassword, setValidConfirmPassword] = useState(true)
  const [firstNameValidation, setFirstNameValidation] = useState(true)
  const [loading, setLoading] = useState(false)

  const toast = useToast()
  const { dispatch } = useAuth()

  const handleChange = (name, value) => {
    setState(s => ({ ...s, [name]: value }))
  }

  const handleRegister = () => {
    const { firstName, secondName, email, password, confirmPassword } = state
    // Checking validation
    if (firstName.trim().length <= 2) {
      setFirstNameValidation(false)
      return
    }
    setFirstNameValidation(true)
    if (!validEmail.test(email.trim())) {
      setEmailValidation(false)
      return
    }
    setEmailValidation(true)
    if (!validPassword.test(password.trim())) {
      setPasswordValidation(false)
      return
    }
    setPasswordValidation(true)
    if (password != confirmPassword) {
      setValidConfirmPassword(false)
      return
    }
    setValidConfirmPassword(true)

    createAccount(firstName, secondName, email, password)
  }

  const createAccount = async (firstName, secondName, email, password) => {
    setLoading(true)
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password)
      const user = userCredential.user
      const userData = {
        displayName: !secondName ? firstName : firstName + ' ' + secondName,
      };
      await user.updateProfile(userData);
      const updatedUser = auth().currentUser
      dispatch({type:'LOGIN',payload:{user:updatedUser}})
      setState(initialState)
      notify('Account created!', 'success')
      navigation.navigate('Profile')
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        notify('Email alredy in use!', 'error')
      }
      if (error.code === 'auth/network-request-failed') {
        notify('Check your network!', 'error')
      }else{
        notify('Something went wrong!', 'error')
      }
    } finally {
      setLoading(false)
    }
  }

  const notify = (message, color) => {
    toast.show({ title: message, placement: 'top', duration: 2000, backgroundColor: `${color}.700` })
  }
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>

        <View style={styles.header}>
          <Text style={styles.heading}>Sign Up</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.text}>Create a new account</Text>
          <TextInput
            label="First Name"
            mode='outlined'
            outlineColor={colors.black} activeOutlineColor={colors.black} textColor={colors.black} selectionColor={colors.gold}
            style={styles.inputField}
            placeholder='Joe'
            value={state.firstName}
            onChangeText={val => handleChange("firstName", val)}
            error={!firstNameValidation}
          />
          {
            !firstNameValidation && <HelperText type="error" visible={true} style={{ marginTop: -20, color: 'red' }}>
              Invalid Name!
            </HelperText>
          }

          <TextInput
            label="Second Name"
            mode='outlined'
            outlineColor={colors.black} activeOutlineColor={colors.black} textColor={colors.black} selectionColor={colors.gold}
            style={styles.inputField}
            placeholder='Josh'
            value={state.secondName}
            onChangeText={val => handleChange("secondName", val)}
          />

          <TextInput
            label="Email"
            mode='outlined'
            outlineColor={colors.black} activeOutlineColor={colors.black} textColor={colors.black} selectionColor={colors.gold}
            style={styles.inputField}
            placeholder='abc@example.com'
            keyboardType='email-address'
            value={state.email}
            onChangeText={val => handleChange("email", val)}
            error={!emailValidation}
          />
          {
            !emailValidation && <HelperText type="error" visible={true} style={{ marginTop: -20, color: 'red' }}>
              Email address is invalid!
            </HelperText>
          }

          <TextInput
            label="Passowrd"
            mode='outlined'
            outlineColor={colors.black} activeOutlineColor={colors.black} textColor={colors.black} selectionColor={colors.gold}
            style={styles.inputField}
            placeholder="Don't tell anyone. "
            secureTextEntry={true}
            value={state.password}
            onChangeText={val => handleChange("password", val)}
            error={!passwordValidation}
          />
          {
            !passwordValidation && <HelperText type="error" visible={true} style={{ marginTop: -20, color: 'red' }}>
              Password must contain 'alphabets and numbers' and length should be greater than 6.
            </HelperText>
          }

          <TextInput
            label="Confirm Passowrd"
            mode='outlined'
            outlineColor={colors.black} activeOutlineColor={colors.black} textColor={colors.black} selectionColor={colors.gold}
            style={styles.inputField}
            placeholder="Don't tell anyone. "
            secureTextEntry={true}
            value={state.confirmPassword}
            onChangeText={val => handleChange("confirmPassword", val)}
            error={!validConfirmPassword}
          />
          {
            !validConfirmPassword && <HelperText type="error" visible={true} style={{ marginTop: -20, color: 'red' }}>
              Password does not match.
            </HelperText>
          }

          <Button
            mode="contained"
            buttonColor={colors.black} textColor={colors.white}
            style={styles.btn}
            onPress={() => handleRegister()}
            loading={loading}
          >
            Sign up
          </Button>

          <Button
            mode="text"
            textColor={colors.black}
            style={styles.btn}
            onPress={() => navigation.navigate('login')}
          >
            Already have an account?
          </Button>
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  header: {
    height: 130,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: sizes.title,
    fontWeight: 'bold',
    color: colors.white,
  },
  text: {
    fontSize: sizes.h2,
    color: colors.black,
    fontWeight: 'bold',
    marginTop: spacing.xl,
    marginBottom: spacing.m,
    textAlign: 'center',
  },
  form: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 80,
    paddingTop: spacing.xl,
    paddingHorizontal: spacing.m,
    height: sizes.height - 120,
  },
  inputField: {
    backgroundColor: colors.white,
    marginBottom: spacing.m,
  },
  btn: {
    fontSize: sizes.h3,
    paddingVertical: spacing.s,
    borderRadius: 8,
    borderTopRightRadius: 3,
    marginBottom: spacing.s,
  },
})