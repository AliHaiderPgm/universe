import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import ReactNativeModal from 'react-native-modal';
import { colors } from '../constants/theme';

export default function CustomModal({state}) {
    console.log(state)
    const [modalVisible, setModalVisible] = useState(state)
    
      const handleCloseModal = () => {
        setModalVisible(false)
      };
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ReactNativeModal
                isVisible={modalVisible}
                onBackdropPress={handleCloseModal}
                onBackButtonPress={handleCloseModal}
                onSwipeComplete={handleCloseModal}
                swipeDirection={['down']}
                style={{ justifyContent: 'flex-end', margin: 0 }}
            >
                <View style={{ backgroundColor: 'white', padding: 20 }}>
                    <Text style={{ color: colors.black }}>Hello bro</Text>
                    <Text style={{ color: colors.black }}>Hello bro</Text>
                    <Text style={{ color: colors.black }}>Hello bro</Text>
                    <Text style={{ color: colors.black }}>Hello bro</Text>
                    <Text style={{ color: colors.black }}>Hello bro</Text>
                    <Text style={{ color: colors.black }}>Hello bro</Text>
                    <Text style={{ color: colors.black }}>Hello bro</Text>
                    <Text style={{ color: colors.black }}>Hello bro</Text>
                    <Text style={{ color: colors.black }}>Hello bro</Text>
                    <Text style={{ color: colors.black }}>Hello bro</Text>
                    <Text style={{ color: colors.black }}>Hello bro</Text>
                </View>
            </ReactNativeModal>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({})