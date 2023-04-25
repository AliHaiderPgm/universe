import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { colors, sizes, spacing } from '../../components/constants/theme'
import { Button, HelperText, TextInput } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { validEmail, validPassword } from '../../components/Global'
import auth from '@react-native-firebase/auth';

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
  const [loading, setLoading] = useState(false)

  const handleChange = (name, value) => {
    setState(s => ({ ...s, [name]: value }))
  }

  const handleRegister = () => {
    const { email, password, confirmPassword } = state
    // Checking validation
    if (!validEmail.test(email)) {
      setEmailValidation(false)
      return
    }
    setEmailValidation(true)
    if (!validPassword.test(password)) {
      setPasswordValidation(false)
      return
    }
    setPasswordValidation(true)
    if (password != confirmPassword) {
      setValidConfirmPassword(false)
      return
    }
    setValidConfirmPassword(true)
    
    setLoading(true)
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
        setState(initialState)
        setLoading(false)
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
        setLoading(false)
      });
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
          />

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
            error={emailValidation ? false : true}
          />
          {
            !emailValidation && <HelperText type="error" visible={true} style={{ marginTop: -20 }}>
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
            error={passwordValidation ? false : true}
          />
          {
            !passwordValidation && <HelperText type="error" visible={true} style={{ marginTop: -20 }}>
              Password must contain 'letters and numbers' and length should be greater than 6.
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
            error={validConfirmPassword ? false : true}
          />
          {
            !validConfirmPassword && <HelperText type="error" visible={true} style={{ marginTop: -20 }}>
              Password does not match.
            </HelperText>
          }

          <Button
            mode="contained"
            buttonColor={colors.black} textColor={colors.white}
            style={styles.btn}
            onPress={() => handleRegister()}
            loading ={loading}
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
  helperText: {
    // marginBottom: spacing.s,
  },
  btn: {
    fontSize: sizes.h3,
    paddingVertical: spacing.s,
    borderRadius: 8,
    borderTopRightRadius: 3,
    marginBottom: spacing.s,
  },
})