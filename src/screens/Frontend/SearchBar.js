import React, { useState } from 'react'
import { View, StyleSheet, TextInput, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import firestore from '@react-native-firebase/firestore';
import { useToast } from 'native-base';
//components
import { colors, sizes, spacing } from '../../components/constants/theme'
import Icon from '../../components/shared/Icon'
import Tabs from '../../components/shared/Tabs'
import { ActivityIndicator } from 'react-native-paper';

const SearchBar = () => {
    const [text, setText] = useState('')
    const [searchText, setSearchText] = useState('')
    const inset = useSafeAreaInsets()
    const navigation = useNavigation()
    const toast = useToast()
    const [loading, setLoading] = useState()
    const [state, setState] = useState(false)
    const [maleProducts, setMaleProducts] = useState()

    const handleSearch = () => {
        setSearchText(text)
        const newText = capitlize(text)
        setMaleProducts([])
        getData(newText, setMaleProducts, setLoading)
    }

    const getData = (text, storeDataIn, loading) => {
        loading(true)
        firestore()
            .collection('maleProducts')
            .where('name', '>=', text)
            .where('name', '<=', text + '\uf8ff')
            .get()
            .then(querySnapShot => {
                if (!querySnapShot.empty) {
                    querySnapShot.forEach(snapShot => {
                        storeDataIn(s => [...s, snapShot.data()])
                    })
                }
            })
            .catch(() => {
                notify('Something went worng!', 'red')
            }).finally(() => {
                loading(false)
                setState(true)
            })
    }
    const capitlize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
    }
    const notify = (msg, color) => {
        toast.show({ title: msg, backgroundColor: `${color}.700`, placement: 'top', duration: 2000 })
    }
    return (
        <>
            <View style={[styles.mainContainer, { marginTop: inset.top }]}>
                <Icon size={28} icon="leftArrow" onPress={() => navigation.goBack()} />
                <View style={styles.searchContainer}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Search Universe"
                            placeholderTextColor={colors.lightGray}
                            cursorColor={colors.black}
                            inputMode='search'
                            keyboardType='web-search'
                            autoFocus={true}
                            selectionColor='skyblue'
                            value={text}
                            onChangeText={(s) => {
                                setText(s)
                            }}
                        />
                        {text && <Icon icon="close" size={15} onPress={() => { setText('') }} style={styles.image} />}
                    </View>
                </View>
                <Icon icon="search" size={25} onPress={() => handleSearch()} />
            </View>
            {
                state && <>
                    {
                        loading ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator animating={true} size='large' color={colors.gold} />
                        </View>
                            : maleProducts.length !== 0 ? <Tabs />
                                : <View style={{flex:1, justifyContent:'center', alignItems:'center',gap: spacing.s}}>
                                    <Icon icon="emptyBox" size={80} />
                                    <Text style={{ color: colors.gray }}>No product found for <Text style={{color:colors.black, fontWeight:'600'}}>{searchText}</Text>!</Text>
                                </View>
                    }
                </>
            }
        </>
    )
}

export default SearchBar

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.s,
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.s - 2,
        backgroundColor: colors.light,
    },
    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.m,
        width: '90%',
        backgroundColor: colors.white,
        borderRadius: sizes.radius + 12,
        borderWidth: 0.5
    },
    inputContainer: {
        position: 'relative',
        flexDirection: 'row',
    },
    image: {
        position: 'absolute',
        right: 10,
        top: 17,
    },
    textInput: {
        width: '100%',
        fontSize: 17,
        paddingRight: 28,
        color: colors.black,
    }
})