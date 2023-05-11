import React from 'react'
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native'
//components
import ImageCarousel from '../../components/shared/ImagesCarousel'
import Navbar from '../../components/Frontend/Navbar'
import ScreenHeader from '../../components/Frontend/HomeHeader'
import { CHILD_FEATURED_PRODUCTS, MENS_FEATURED_PRODUCTS, PRODUCTS, TOP_PRODUCTS, WOMENS_FEATURED_PRODUCTS, brands, data } from '../../data'
import { colors } from '../../components/constants/theme'
import SectionHeader from '../../components/Frontend/SectionHeader'
import ProductList from '../../components/Frontend/ProductList'
import ProductsCarousel from '../../components/Frontend/ProductsCarousel'
import Features from '../../components/Frontend/Features'
export default Home = () => {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={colors.light} />
            <Navbar />
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* <ImageCarousel data={data} /> */}
                <ScreenHeader mainHeading="Find Your" secondTitle="Dream Style" />
                <ProductsCarousel list={TOP_PRODUCTS} inProductCard={false} />

                <SectionHeader title="Popular Products" showArrow={false} />
                <ProductList list={PRODUCTS} />

                <SectionHeader title="Featured Brands" showArrow={false}/>
                <Features icons={brands} size={60} />

                {/* <SectionHeader title="For Men" />
                <ProductsCarousel list={MENS_FEATURED_PRODUCTS} inProductCard={true} />

                <SectionHeader title= "For Child" />
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
})