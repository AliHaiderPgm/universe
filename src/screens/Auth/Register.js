import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { colors, sizes, spacing } from '../../components/constants/theme'
import { Button, TextInput } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

export default function Register() {
  const navigation  = useNavigation()
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>

        <View style={styles.header}>
          <Text style={styles.heading}>Sign Up</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.text}>Create a new account</Text>
          <TextInput
            mode='outlined'
            outlineColor={colors.black} activeOutlineColor={colors.black} textColor={colors.black} selectionColor={colors.gold}
            style={styles.inputField}
            label="First Name"
            placeholder='Joe'
          />

          <TextInput
            mode='outlined'
            outlineColor={colors.black} activeOutlineColor={colors.black} textColor={colors.black} selectionColor={colors.gold}
            style={styles.inputField}
            label="Second Name"
            placeholder='Josh'
          />

          <TextInput
            mode='outlined'
            outlineColor={colors.black} activeOutlineColor={colors.black} textColor={colors.black} selectionColor={colors.gold}
            style={styles.inputField}
            label="Email"
            placeholder='abc@example.com'
          />

          <TextInput
            mode='outlined'
            outlineColor={colors.black} activeOutlineColor={colors.black} textColor={colors.black} selectionColor={colors.gold}
            style={styles.inputField}
            label="Passowrd"
            placeholder="Don't tell anyone. "
          />

          <TextInput
            mode='outlined'
            outlineColor={colors.black} activeOutlineColor={colors.black} textColor={colors.black} selectionColor={colors.gold}
            style={styles.inputField}
            label="Confirm Passowrd"
            placeholder="Don't tell anyone. "
          />

          <Button
            mode="contained"
            buttonColor={colors.black} textColor={colors.white}
            style={styles.btn}
            onPress={() => console.log('Pressed')}>
            Sign up
          </Button>

          <Button
            mode="text"
            textColor={colors.black}
            style={styles.btn}
            onPress={() => navigation.navigate('login')}>
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
  btn:{
    fontSize: sizes.h3,
    paddingVertical: spacing.s,
    borderRadius: 8,
    borderTopRightRadius: 3,
    marginBottom: spacing.s,
  },
})