import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { colors, sizes, spacing } from '../../../components/constants/theme';
import { useAuth } from '../../../Context/AuthContext';
import Icon from '../../../components/shared/Icon';
import { ReactNativeModal } from 'react-native-modal';
import { GestureHandlerRootView } from 'react-native-gesture-handler';



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
  const [modalVisible, setModalVisible] = useState(false);


  const handleChange = (val, name) => setState(prevState => ({ ...prevState, [name]: val, }));

  const handleUpdate = () => {
    console.log('Updating...')
  }

  const handleOpenModal = () => {
    setModalVisible(true);
  }
  const handleCloseModal = () => {
    setModalVisible(false)
  }
  return (
    <>
      <View style={styles.mainContainer}>
        <View style={styles.detailsContainer}>
          <View style={styles.imageContainer}>
            <Image source={user.photoURL ? { uri: user.photoURL } : require('../../../assets/icons/user.png')} style={styles.image} />
            <TouchableOpacity style={styles.iconContainer} activeOpacity={0.7} onPress={handleOpenModal}>
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
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ReactNativeModal
          isVisible={modalVisible}
          onBackdropPress={handleCloseModal}
          onBackButtonPress={handleCloseModal}
          onSwipeComplete={handleCloseModal}
          swipeDirection={['down']}
          animationOutTiming={600}
          backdropTransitionOutTiming={0}
          style={styles.modal}
        >
          <View style={styles.modalContent}>
            <Text style={styles.heading}>Profile photo</Text>
            <View style={styles.callToAction}>
              <View>
                <TouchableOpacity style={styles.modalIcons} activeOpacity={0.5}>
                  <Icon icon="camera" />
                </TouchableOpacity>
                <Text style={styles.label}>Camera</Text>
              </View>
              <View>
                <TouchableOpacity style={styles.modalIcons} activeOpacity={0.5}>
                  <Icon icon="image" />
                </TouchableOpacity>
                <Text style={styles.label}>Gallery</Text>
              </View>
            </View>
          </View>
        </ReactNativeModal>
      </GestureHandlerRootView>
    </>
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
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    backgroundColor: colors.white
  },
  image: {
    height: IMAGE_HEIGHT,
    width: IMAGE_WIDTH,
    resizeMode: 'contain'
  },
  iconContainer: {
    padding: spacing.s,
    backgroundColor: colors.gold,
    borderRadius: 50,
    position: 'absolute',
    bottom: -10,
    right: -10,
    elevation: 9,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
    backgroundColor: 'rgba(0,0,0,0)'
  },
  modalContent: {
    borderTopLeftRadius: sizes.radius,
    borderTopRightRadius: sizes.radius,
    backgroundColor: 'white',
    padding: spacing.m,
    gap:spacing.m
  },
  callToAction: {
    flexDirection: 'row',
    gap: spacing.m
  },
  modalIcons: {
    borderWidth: 0.5,
    borderRadius: 50,
    padding: spacing.s + 2,
  },
  heading: {
    fontSize: sizes.h2,
    fontWeight: '600',
    color: colors.black
  },
  label: {
    fontSize: sizes.caption,
    color: colors.black,
    alignSelf:'center',
    marginTop:spacing.s
  }

});

export default UpdateProfile;