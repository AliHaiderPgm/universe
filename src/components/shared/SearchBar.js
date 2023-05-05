import React, { useState } from 'react'
import { View, StyleSheet, Image, TextInput, TouchableOpacity, StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
//components
import { colors, sizes, spacing } from '../constants/theme'
import Icon from './Icon'

const SearchBar = () => {
    const [text, setText] = useState('')
    const inset = useSafeAreaInsets()
    const navigation = useNavigation()
    return (
        <>
            <StatusBar backgroundColor={colors.light} />
            <View style={[styles.mainContainer, { marginTop: inset.top }]}>
                <Icon size={28} icon="leftArrow" onPress={() => navigation.goBack()} />
                <View style={styles.searchContainer}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Search Universe"
                            cursorColor='black'
                            autoFocus={true}
                            selectionColor='skyblue'
                            value={text}
                            onChangeText={(s) => {
                                setText(s)
                            }}
                        />
                        {
                            text ?
                                <TouchableOpacity onPress={() => {
                                    setText('')
                                }}>
                                    <Image
                                        style={styles.image}
                                        source={require('../../assets/icons/close.png')}
                                    />
                                </TouchableOpacity>
                                : <View style={styles.image} />
                        }
                    </View>
                </View>
            </View>
        </>
    )
}

export default SearchBar

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.s - 4,
        paddingHorizontal: spacing.m,
        paddingVertical: spacing.s - 2,
    },
    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.m,
        width: '90%',
        backgroundColor: colors.white,
        borderRadius: sizes.radius + 12,
    },
    inputContainer:{
        position: 'relative',
        flexDirection: 'row',
    },
    image: {
        height: 16,
        width: 16,
        resizeMode: 'contain',
        position: 'absolute',
        right: 5,
        top: 15,
    },
    textInput: {
        width: '100%',
        fontSize: 17,
        paddingRight: 28,
        color: colors.black,
    }
})