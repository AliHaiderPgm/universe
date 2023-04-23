import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Button, TextInput } from 'react-native-paper'
import { colors, sizes, spacing } from '../../components/constants/theme'

export default function ForgotPassword() {
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
          />

          <Button
            mode="contained"
            buttonColor={colors.black} textColor={colors.white}
            style={styles.btn}
            onPress={() => console.log('Pressed')}>
            Send reset link
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
    height: sizes.height,
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