import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
//components
import ImageCarousel from '../../components/shared/ImagesCarousel'
import Navbar from '../../components/Frontend/Navbar'
import ScreenHeader from '../../components/Frontend/HomeHeader'
import { colors, spacing } from '../../components/constants/theme'
import SectionHeader from '../../components/Frontend/SectionHeader'
import ProductList from '../../components/Frontend/ProductList'
import ProductsCarousel from '../../components/Frontend/ProductsCarousel'
import Features from '../../components/Frontend/Features'
import firestore from '@react-native-firebase/firestore'
import CardLoader from '../../components/shared/CardLoader'
import { featuredBrands } from '../../data'

export default Home = () => {
    const [popularProducts, setPopularProducts] = useState([])
    const [mostSoldProduct, setMostSoldProduct] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const getDataByRating = async (collection, limit) => {
        await firestore().collection(collection)
            .where('rating', '>=', 4)
            .limit(limit)
            .get()
            .then(docs => {
                docs.forEach(doc => {
                    const data = doc.data()
                    setPopularProducts(s => [...s, data])
                })
            })
    }
    const getDataBySold = async (collection) => {
        await firestore().collection(collection)
            .orderBy('sold', 'desc')
            .limit(1)
            .get()
            .then(docs => {
                docs.forEach(doc => {
                    const data = doc.data()
                    setMostSoldProduct(s => [...s, data])
                })
            })
    }
    const getAllData = async () => {
        setIsLoading(true)
        setMostSoldProduct([])
        setPopularProducts([])
        try {
            //NUMBER OF TIMES PRODUCT SOLD
            await getDataBySold('maleProducts')
            await getDataBySold('childrenProducts')
            await getDataBySold('femaleProducts')
            //RATING
            await getDataByRating('maleProducts', 2)
            await getDataByRating('childrenProducts', 1)
            await getDataByRating('femaleProducts', 1)
        } catch (err) {
            console.log('Something went wrong!', err)
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        getAllData()
    }, [])

    const renderCardLoader = (times, cardWidth) => {
        const components = [];
        for (let i = 0; i < times; i++) {
            components.push(<CardLoader key={i} width={cardWidth} />);
        }
        return components;
    }
    return (
        <View style={styles.container}>
            <Navbar />
            <ScrollView showsVerticalScrollIndicator={false}>
                <ImageCarousel />

                <ScreenHeader mainHeading="Find Your" secondTitle="Dream Style" />
                {
                    isLoading ? <View style={styles.mostSoldProducts}>{renderCardLoader(3, 90)}</View>
                        :
                        <ProductsCarousel list={mostSoldProduct} inProductCard={false} />
                }

                <SectionHeader title="Popular Products" showArrow={false} />
                {
                    isLoading ? <View style={styles.cardLoader}>{renderCardLoader(4, 48)}</View>
                        : <ProductList list={popularProducts} />
                }

                <SectionHeader title="Featured Brands" showArrow={false} />
                <Features icons={featuredBrands} size={60} />

                {/* <SectionHeader title="For Men" />  */}

                {/* <SectionHeader title= "For Child" />
                <ProductsCarousel list={CHILD_FEATURED_PRODUCTS} inProductCard={true}/>

                <SectionHeader title= "For Women"/>
                <ProductsCarousel list={WOMENS_FEATURED_PRODUCTS} inProductCard={true}/> */}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.light,
    },
    mostSoldProducts: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: spacing.s,
        marginRight: spacing.xl
    },
    cardLoader: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: spacing.s,
        paddingVertical: spacing.s,
        marginHorizontal: spacing.m
    },
})