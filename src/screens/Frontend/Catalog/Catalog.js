import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { CATEGORIES } from '../../../data'
import CategoryCard from '../../../components/Frontend/Catalog/CategoryCard'
import { spacing } from '../../../components/constants/theme'

export default function Catalog() { 
  return (
    <View style={styles.container}>
      <CategoryCard list={CATEGORIES}/>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    marginTop:spacing.m
  },
})