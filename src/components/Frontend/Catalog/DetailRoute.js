import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import ProductList from '../ProductList'
import { spacing } from '../../constants/theme'

export default function DetailRoute({ data }) {
  return (
    <ScrollView style={styles.container}>
      <ProductList list={data} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginVertical:spacing.s
  }
})