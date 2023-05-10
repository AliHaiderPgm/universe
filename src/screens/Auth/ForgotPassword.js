import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Button, HelperText, TextInput } from 'react-native-paper'
import { colors, sizes, spacing } from '../../components/constants/theme'
import { validEmail } from '../../components/Global'
import auth from '@react-native-firebase/auth';
import { useToast } from 'native-base'

export default function ForgotPassword() {
  const [emailVal, setEmailVal] = useState()
  const [emailValidation, setEmailValidation] = useState(true)
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const handleOnChange = (e) => {
    setEmailVal(e)
  }
  const handleSubmit = () => {
    validEmail.test(emailVal.trim()) ? setEmailValidation(true) : setEmailValidation(false)
    if(!validEmail.test(emailVal.trim())){
      setEmailValidation(false)
      return
    }
    setEmailValidation(true)
    setLoading(true)
    auth()
      .sendPasswordResetEmail(emailVal.trim())
      .then(() => {
        notify('Reset link sent!', 'success')
      })
      .catch(error => {
        if (error.code === 'auth/user-not-found') {
          notify('User not found!', 'error')
        }
        else if (error.code === 'auth/network-request-failed') {
          notify('Check your network!', 'error')
        } else{
          notify('Something went wrong!', 'error')
        }
      }).finally(()=>{
        setLoading(false)
      })
  }
  const notify = (msg, color) => {
    toast.show({title:msg, placement: 'top', backgroundColor: `${color}.700`, duration:2000, shadow:'9'})
  }
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>

        <View style={styles.header}>
          <Text style={styles.title}>Reset Password</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.text}>Find your account</Text>
          <TextInput
            mode='outlined'
            outlineColor={colors.black} activeOutlineColor={colors.black} textColor={colors.black} selectionColor={colors.gold}
            keyboardType='email-address'
            style={styles.inputFeild}
            label="Email"
            placeholder="abc@example.com"
            onChangeText={e => handleOnChange(e)}
            value={emailVal}
            error={!emailValidation}
            loading={loading}
          />
          {
            !emailValidation && <HelperText type="error" visible={true} style={{ marginTop: -20 }}>
              Email address is invalid!
            </HelperText>
          }

          <Button
            mode="contained"
            buttonColor={colors.black} textColor={colors.white}
            style={styles.btn}
            onPress={() => handleSubmit()}
            loading={loading}
            >
            {loading ? 'Sending...' : 'Send reset link'}
          </Button>
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black
  },
  header: {
    height: 130,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: sizes.title,
    color: colors.white,
    fontWeight: 'bold'
  },
  formContainer: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 80,
    paddingTop: spacing.xl,
    paddingHorizontal: spacing.m,
  },
  text: {
    fontSize: sizes.h2,
    color: colors.black,
    fontWeight: 'bold',
    marginTop: spacing.xl,
    marginBottom: spacing.m,
    textAlign: 'center',
  },
  inputFeild: {
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