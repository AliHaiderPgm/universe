import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TextInput, Text, ScrollView, Keyboard } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import firestore from '@react-native-firebase/firestore';
import { useToast } from 'native-base';
import { ActivityIndicator } from 'react-native-paper';
//components
import { colors, sizes, spacing } from '../../components/constants/theme'
import Icon from '../../components/shared/Icon'
import ProductList from '../../components/Frontend/ProductList';
import Dropdown from '../../components/shared/Dropdown';
import { SORT } from '../../data';
import { sortData } from '../../components/Global';

const SearchBar = () => {
    const [text, setText] = useState('')
    const [isKeyboard, setIsKeyBoard] = useState(true)
    const [searchedText, setSearchedText] = useState('')
    const inset = useSafeAreaInsets()
    const navigation = useNavigation()
    const toast = useToast()
    const [loading, setLoading] = useState(false)
    const [state, setState] = useState(false)
    const [searchedProduct, setSearchedProduct] = useState()
    const [selectedOption, setSelectedOption] = useState()
    
    const notify = (msg, color) => { toast.show({ title: msg, backgroundColor: `${color}.700`, placement: 'top', duration: 2000 }) }
    const capitlize = (str) => { return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() }

    const handleSearch = async () => {
        if (text.length === 0) {
            notify('Enter product name!','error')
            return
        }
        setIsKeyBoard(false)
        setSearchedText(text)
        setSearchedProduct([])
        setState(true)
        setLoading(true)
        try {
            const maleProducts = await getData('maleProducts')
            const femaleProducts = await getData('femaleProducts')
            const childrenProducts = await getData('childrenProducts')
            setSearchedProduct([...maleProducts, ...femaleProducts, ...childrenProducts])
        } catch (err) {
            notify('Something went wrong!', 'error')
        } finally {
            setLoading(false)
            setIsKeyBoard(true)
        }
    }
    const getData = async (collectionName) => {
        const newText = capitlize(text).trim()
        const products = []
        await firestore()
            .collection(collectionName)
            .where('name', '>=', newText)
            .where('name', '<=', newText + '\uf8ff')
            .get()
            .then(querySnapShot => {
                if (!querySnapShot.empty) {
                    querySnapShot.forEach(snapShot => {
                        products.push(snapShot.data())
                    })
                }
            })
        return products
    }

    const handleSelect = (e)=>{
        setSelectedOption(e)
        sortData(searchedProduct, e)
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
                            onChangeText={(s) => { setText(s) }}
                            onSubmitEditing={() => handleSearch()}
                            onBlur={Keyboard.dismiss}
                            editable={isKeyboard}
                        />
                        {text && <Icon icon="close" size={15} onPress={() => { setText('') }} style={styles.image} />}
                    </View>
                </View>
                <Icon icon="search" size={25} onPress={() => handleSearch()} />
            </View>

            {state && <>
                {loading ?
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.light }}>
                        <ActivityIndicator size='large' color={colors.gold} />
                    </View>
                    : searchedProduct.length === 0 ?
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: spacing.s, backgroundColor: colors.light }}>
                            <Icon icon="emptyBox" size={80} />
                            <Text style={{ color: colors.gray }}>No product found for <Text style={{ color: colors.black, fontWeight: '600' }}>{searchedText}</Text>!</Text>
                        </View>
                        :
                        <View style={styles.products}>
                            <Dropdown defaultText="Sort" list={SORT} onSelect={handleSelect} style={{ marginVertical: spacing.s }} />
                            <ScrollView style={{ paddingBottom: spacing.m }}>
                                <ProductList list={searchedProduct} />
                            </ScrollView>
                        </View>}
            </>}
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
    },
    products: {
        flex: 1,
        backgroundColor: colors.light,
        alignItems: 'center',
        justifyContent: 'center'
    }
})