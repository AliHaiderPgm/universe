import React, { useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, View, KeyboardAvoidingView, Keyboard,TouchableWithoutFeedback } from 'react-native'
import { colors, sizes, spacing } from '../../components/constants/theme'
import { Button, TextInput } from 'react-native-paper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const initialState = {
  email: '',
  password: ''
}
export default function Login() {
  const [state, setState] = useState(initialState)
  const handleChange = (name, value) => {
    setState(s => ({ ...s, [name]: value }))
  }
  return (
    <KeyboardAvoidingView behavior={"height"} enabled={true} style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View style={styles.imageContainer}>
            <Image source={require('../../assets/appLogo.png')} style={styles.image} />
          </View>
          <View style={styles.formContainer}>
            <Text style={styles.label}>Sign in</Text>
            <TextInput
              mode='outlined' activeOutlineColor={colors.black} outlineColor={colors.black} textColor='black'
              label="Email"
              value={state.email}
              onChangeText={text => handleChange('email', text)}
              style={styles.inputField}
              keyboardType='email-address'
            />
            <TextInput
              mode='outlined' activeOutlineColor={colors.black} outlineColor={colors.black} textColor='black'
              label="Password"
              value={state.password}
              onChangeText={text => handleChange('password', text)}
              style={styles.inputField}
              secureTextEntry={true}
            />
            <Button mode="contained" buttonColor={colors.black} textColor={colors.white} style={styles.btn}  onPress={() => console.log('Pressed')}>
              Login
            </Button>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between',marginTop: spacing.s }}>
              <Button mode="text"  textColor={colors.black} style={styles.btn} onPress={() => console.log('Pressed')}>
                Don't have an account?
              </Button>
              <Button mode="text" textColor={colors.black} style={styles.btn} onPress={() => console.log('Pressed')}>
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
    flex:1,
    backgroundColor: colors.black,
  },
  inner:{
    flex:1,
    justifyContent:'space-around',
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
    marginVertical: spacing.m,
  },
  formContainer: {
    borderTopLeftRadius: 85,
    paddingHorizontal: spacing.m,
    justifyContent: 'center', 
    backgroundColor: colors.light,
    height: 640,
  },
  inputField: {
    backgroundColor: colors.white,
    marginBottom: spacing.m,
    borderRadius: 8,
  },
  btn:{
    paddingVertical: spacing.s - 5,
    borderRadius: 8,
    borderTopRightRadius: 1,
  }
})