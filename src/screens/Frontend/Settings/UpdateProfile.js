import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useToast } from 'native-base';
import storage from '@react-native-firebase/storage';
import { TextInput, Button } from 'react-native-paper';
import { ReactNativeModal } from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '@react-native-firebase/firestore';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { colors, sizes, spacing } from '../../../components/constants/theme';
//components
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

const MyButton = ({ title, onPress, loading }) => {
  return <Button
    mode="contained" buttonColor={colors.black} textColor={colors.white}
    style={styles.btn}
    onPress={onPress}
    loading={loading}
  >
    {title}
  </Button>
}

const UpdateProfile = () => {
  const { user, dispatch } = useAuth()
  const initialState = {
    name: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
  };
  const [state, setState] = useState(initialState);
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState('');
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const navigation = useNavigation()

  const handleChange = (val, name) => setState(prevState => ({ ...prevState, [name]: val, }));
  const notify = (msg, color) => toast.show({ title: msg, background: `${color}.700`, shadow: 9, placement: 'top', duration: 1500 })

  const handleOpenModal = () => setModalVisible(true)
  const handleCloseModal = () => setModalVisible(false)

  const handleOpenCamera = () => {
    ImagePicker.openCamera({
      width: 400,
      height: 400,
      cropping: true,
      cropperToolbarColor: 'black',
      cropperToolbarWidgetColor: 'white',
      cropperStatusBarColor: 'black',
      disableCropperColorSetters: false,
      hideBottomControls: true,
    }).then(image => {
      setImage(image)
    }).catch(err => {
      console.log(err)
    }).finally(() => {
      handleCloseModal()
    })
  }
  const handleOpenGallery = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
      cropperToolbarColor: 'black',
      cropperToolbarWidgetColor: 'white',
      cropperStatusBarColor: 'black',
      disableCropperColorSetters: false,
      hideBottomControls: true,
    }).then(image => {
      setImage(image)
    }).catch(err => {
      console.log(err)
    }).finally(() => {
      handleCloseModal()
    })
  }

  const handleUpdate = async () => image.path ? uploadImage() : updateProfile()

  const uploadImage = async () => {
    setLoading(true)
    const reference = storage().ref('images/').child(image.path.split('/').pop());
    try {
      await reference.putFile(image.path);
      await storage().ref(`images/${image.path.split('/').pop()}`).getDownloadURL()
        .then((url) => {
          setState(prevState => ({ ...prevState, photoURL: url }))
        })
    } catch (error) {
      notify('Failed to update photo!', 'error')
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    if (mounted && state.photoURL) {
      updateProfile()
    } else {
      setMounted(true)
    }
  }, [state.photoURL])

  const updateProfile = async () => {
    setLoading(true)
    const { name, email, photoURL } = state
    try {
      await user.updateProfile({
        displayName: name,
        photoURL: photoURL
      })
      user.email !== email && await user.updateEmail(email)
      const currentUser = firebase.auth().currentUser;
      await currentUser.reload()
      dispatch({ type: 'LOGIN', payload: { user: currentUser } })
      navigation.navigate('Setting')
    } catch (error) {
      notify('Failed to update profile!', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <View style={styles.mainContainer}>
        <View style={styles.detailsContainer}>
          <View style={styles.imageContainer}>
            {image ? <Image source={{ uri: image.path }} style={styles.image} />
              : <Image source={user.photoURL ? { uri: user.photoURL } : require('../../../assets/icons/user.png')} style={styles.image} />}
          </View>
          <TouchableOpacity style={styles.iconContainer} activeOpacity={0.7} onPress={handleOpenModal}>
            <Icon icon="camera" size={25} />
          </TouchableOpacity>

          <Input label="Name" value={state.name} onChangeText={val => handleChange(val, 'name')} />
          <Input label="Email" value={state.email} onChangeText={val => handleChange(val, 'email')} />
          <MyButton title="Update Profile" onPress={handleUpdate} loading={loading} />

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
                <TouchableOpacity style={styles.modalIcons} activeOpacity={0.5} onPress={handleOpenCamera}>
                  <Icon icon="camera" />
                </TouchableOpacity>
                <Text style={styles.label}>Camera</Text>
              </View>
              <View>
                <TouchableOpacity style={styles.modalIcons} activeOpacity={0.5} onPress={handleOpenGallery}>
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
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    backgroundColor: colors.white
  },
  image: {
    height: IMAGE_HEIGHT,
    width: IMAGE_WIDTH,
    resizeMode: 'cover'
  },
  iconContainer: {
    padding: spacing.s,
    backgroundColor: colors.gold,
    borderRadius: 50,
    position: 'absolute',
    left: '54%',
    top: '18%',
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
    gap: spacing.m
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
    alignSelf: 'center',
    marginTop: spacing.s
  }

});

export default UpdateProfile;