import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors, sizes, spacing } from '../../../components/constants/theme'
import { ActivityIndicator, Divider } from 'react-native-paper'
import firestore from '@react-native-firebase/firestore';
import ProductList from '../../../components/Frontend/ProductList';

export default function CatalogDetail({ route }) {
    const [loading, setLoading] = useState(false)
    const [collection, setCollection] = useState([])
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
            setLoading(false)
        })
    }
    useEffect(() => {
        getData()
    }, [])

    const types = route.params.types;
    return (
        <View style={styles.container}>
            <View style={styles.typesContainer}>
                {
                    types.map((e, i) => <View key={i}>
                        <TouchableOpacity style={styles.typeBtn}>
                            <Text style={styles.typeText}>{e}</Text>
                        </TouchableOpacity>
                        <Divider />
                    </View>)
                }
            </View>
            {/* Cards */}
            <ScrollView style={styles.cardsContainer}>
                {
                    loading ?
                        <View style={{ height: sizes.height - 100, alignItems: 'center', justifyContent: 'center' }}>
                            <ActivityIndicator animating={true} color={colors.gold} size={'large'} />
                        </View>
                        :
                        <>
                            <ProductList list={collection} />
                        </>
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
    cardsContainer: {
        backgroundColor: colors.white,
        width: sizes.width - 220,
    },
    typeBtn: {
        height: 50,
        justifyContent: 'center',
    },
    typeText: {
        paddingLeft: spacing.m,
        color: colors.black,
        fontSize: sizes.h3,
        fontWeight: '400',
    },
})