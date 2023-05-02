import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors, sizes, spacing } from '../../../components/constants/theme'
import { ActivityIndicator, Divider } from 'react-native-paper'
import firestore from '@react-native-firebase/firestore';
import CatalogProductsCard from '../../../components/Frontend/Catalog/CatalogProductsCard';
import { useNavigation } from '@react-navigation/native';

export default function CatalogDetail({ route }) {
    const [loading, setLoading] = useState(false)
    const [collection, setCollection] = useState([])
    const navigation = useNavigation()

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
        navigation.setOptions({title: route.params.name + ' Products'})
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
    cards:{
        flexDirection:'row',
        gap: spacing.m,
        flexWrap:'wrap',
        justifyContent:'center',
        marginVertical: spacing.m,
    },
})