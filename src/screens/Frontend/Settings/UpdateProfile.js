import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { colors, spacing } from '../../../components/constants/theme';
import { useAuth } from '../../../Context/AuthContext';
import Icon from '../../../components/shared/Icon';


const IMAGE_HEIGHT = 90;
const IMAGE_WIDTH = 90;

const Input = ({ label, value, onChangeText }) => {
  return (
    <TextInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      mode='outlined'
      activeOutlineColor={colors.black}
      outlineColor={colors.black}
      textColor='black'
      style={styles.textInput}
    />
  );
};

const MyButton = ({ title, onPress, }) => {
  return <Button
    mode="contained" buttonColor={colors.black} textColor={colors.white}
    style={styles.btn}
    onPress={onPress}
  >
    {title}
  </Button>
}


const UpdateProfile = () => {
  const { user } = useAuth()
  const initialState = {
    name: user.displayName,
    email: user.email,
  };
  const [state, setState] = useState(initialState);


  const handleChange = (val, name) => setState(prevState => ({ ...prevState, [name]: val, }));

  const handleUpdate = () => {
    // Perform update logic here using the state object
    console.log(state); // You can replace this with your logic to update the profile
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.detailsContainer}>
        <View style={styles.imageContainer}>
          <Image source={user.photoURL ? { uri: user.photoURL } : require('../../../assets/icons/user.png')} style={styles.image} />
          <TouchableOpacity style={styles.iconContainer} activeOpacity={0.7}>
            <Icon icon="camera" size={25} />
          </TouchableOpacity>
        </View>
        <Input
          label="Name"
          value={state.name}
          onChangeText={val => handleChange(val, 'name')}
        />
        <Input
          label="Email"
          value={state.email}
          onChangeText={val => handleChange(val, 'email')}
        />
        <MyButton title="Update Profile" onPress={handleUpdate} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: colors.white,
    marginBottom: spacing.s,
  },
  btn: {
    marginTop: spacing.s,
    padding: spacing.s,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.xl,
  },
  detailsContainer: {
    marginBottom: spacing.m,
  },
  imageContainer: {
    height: IMAGE_HEIGHT,
    width: IMAGE_WIDTH,
    alignSelf: 'center',
    marginBottom: spacing.m,
    borderRadius: 50,
    borderWidth:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: IMAGE_HEIGHT,
    width: IMAGE_WIDTH,
    resizeMode: 'contain'
  },
  iconContainer:{
    padding:spacing.s,
    backgroundColor: colors.gold,
    borderRadius:50,
    position:'absolute',
    bottom:-10,
    right:-10,
    elevation:9,
  },

});

export default UpdateProfile