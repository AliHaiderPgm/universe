import React from 'react'
import { View, StyleSheet } from 'react-native'
import ProductCard from '../shared/ProductCard';


export default function ProductList({ list }) {
    console.log(list)
    return (
        <View style={styles.container}>
            {list.map((item,index) => {
                return (
                    <ProductCard cardData={item} key={index} carousel={false}/>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
})