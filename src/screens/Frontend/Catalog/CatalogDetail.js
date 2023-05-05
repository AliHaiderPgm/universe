import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useToast } from 'native-base'
import firestore from '@react-native-firebase/firestore'

//components
import { colors, sizes, spacing } from '../../../components/constants/theme'
import CatalogProductsCard from '../../../components/Frontend/Catalog/CatalogProductsCard';

export default function CatalogDetail({ route }) {
    const [loading, setLoading] = useState(false)
    const [collection, setCollection] = useState([])
    const navigation = useNavigation()
    const [selectedOption, setSelectedOption] = useState(1)
    const toast = useToast()

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
    const handlePress = (id) => {
        setSelectedOption(id)
    }
    return (
        <View style={styles.container}>
            <View style={styles.typesContainer}>
                {types.map((e, i) =>
                    <TouchableOpacity style={[styles.typeBtn, e.id === selectedOption && styles.selectedOption]} key={i} onPress={() => handlePress(e.id)} activeOpacity={0.8}>
                        <Text style={[styles.typeText, e.id === selectedOption && styles.selectedText]}>
                            {e.name}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
            {/* Cards */}
            <ScrollView style={styles.cardsContainer}>
                {loading ?
                    <View style={{ height: sizes.height - 100, alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator animating={true} color={colors.gold} size={'large'} />
                    </View>
                    :
                    <View style={styles.cards}>
                        <CatalogProductsCard list={collection} />
                    </View>
                }
            </ScrollView>
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
        backgroundColor: colors.white,
        width: sizes.width - 235,
    },
    cards: {
        flexDirection: 'row',
        gap: spacing.m,
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginVertical: spacing.m,
    },
})