import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useToast } from 'native-base'
import firestore from '@react-native-firebase/firestore'

//components
import { colors, sizes, spacing } from '../../../components/constants/theme'
import CatalogProductsCard from '../../../components/Frontend/Catalog/CatalogProductsCard';
import Icon from '../../../components/shared/Icon'
import Dropdown from '../../../components/shared/Dropdown'

export default function CatalogDetail({ route }) {
    const [loading, setLoading] = useState(false)
    const [collection, setCollection] = useState([])
    const [filteredCollection, setFilteredCollection] = useState([])
    const navigation = useNavigation()
    const [selectedOption, setSelectedOption] = useState(1)
    const toast = useToast()
    const SORT = ["Recommended", "Price Low to High", "Price High to Low", "New Arrival", "Top Rated"]
    const [sortType, setSortType] = useState('')
    const [sortedCollections, setSortedCollections] = useState()

    const notify = (title, color) => {
        toast.show({ title: title, backgroundColor: `${color}.700`, placement: 'top', duration: 2000 })
    }
    let type;
    if (route.params.name === 'Men') {
        type = 'maleProducts'
    } else if (route.params.name === 'Women') {
        type = 'femaleProducts'
    } else {
        type = 'childrenProducts'
    }

    const getData = async () => {
        setLoading(true)
        await firestore().collection(type).get().then((querySnapShot) => {
            querySnapShot.forEach(snapShot => {
                let data = snapShot.data()
                setCollection(s => [...s, data])
            })
        }).catch(() => {
            notify('Something went wrong!', 'red')
        }).finally(() => {
            setLoading(false)
        })
    }
    useEffect(() => {
        getData()
        navigation.setOptions({ title: route.params.name + ' Products' })
    }, [])

    const types = route.params.types;

    const handlePress = (e) => {
        setSelectedOption(e.id)
        filter(e.name)
    }
    const filter = (name) => {
        if (name === 'All') {
            setFilteredCollection(collection)
        } else {
            setFilteredCollection(collection.filter(obj => obj.categoryType === name))
        }
        handleSelect(sortType)
    }
    useEffect(() => {
        setFilteredCollection(collection)
    }, [collection])

    const handleSelect = (e) => {
        if (e === 'Price Low to High') {
            filteredCollection.sort((a, b) => a.price - b.price)
        }
        if (e === 'Price High to Low') {
            filteredCollection.sort((a, b) => b.price - a.price)
        }
        if (e === 'Recommended') {
            filteredCollection.sort((a, b) => b.brand.localeCompare(a.brand))
        }
        setSortType(e)
    }
    useEffect(() => {
        handleSelect(sortType)
    }, [sortType])
    return (
        <View style={styles.container}>
            <View style={styles.typesContainer}>
                {types.map((e, i) =>
                    <TouchableOpacity style={[styles.typeBtn, e.id === selectedOption && styles.selectedOption]} key={i} onPress={() => handlePress(e)} activeOpacity={0.8}>
                        <Text style={[styles.typeText, e.id === selectedOption && styles.selectedText]}>
                            {e.name}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
            {/* Cards */}
            <View style={styles.cardsContainer}>
                {
                    filteredCollection.length !== 0 && <View style={styles.filterContainer}>
                        <Dropdown defaultText="Sort" list={SORT} onSelect={handleSelect} />
                    </View>
                }
                <ScrollView>
                    {loading ?
                        <View style={{ height: sizes.height - 100, alignItems: 'center', justifyContent: 'center' }}>
                            <ActivityIndicator animating={true} color={colors.gold} size={'large'} />
                        </View>
                        :
                        filteredCollection.length === 0 ?
                            <View style={styles.noProductContainer}>
                                <Icon icon="emptyBox" size={80} />
                                <Text style={{ color: colors.gray }}>No product found!</Text>
                            </View>
                            :
                            <View style={styles.cards}>
                                <CatalogProductsCard list={filteredCollection} />
                            </View>
                    }
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        gap: spacing.s,
    },
    typesContainer: {
        flex: 1,
    },
    typeBtn: {
        width: 122,
        paddingRight: spacing.m,
        height: 50,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    typeText: {
        paddingLeft: spacing.m,
        color: colors.black,
        fontSize: sizes.h3,
        fontWeight: '400',
    },
    selectedOption: {
        backgroundColor: colors.black,
    },
    selectedText: {
        color: colors.white,
    },
    cardsContainer: {
        width: sizes.width - 115,
        alignItems: 'center',
        backgroundColor: colors.white,
    },
    filterContainer: {
        paddingVertical: spacing.s,
        flexDirection: 'row'
    },
    cards: {
        flexDirection: 'row',
        gap: spacing.m,
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: spacing.m,
    },
    noProductContainer: {
        height: sizes.height,
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.s,
    }
})