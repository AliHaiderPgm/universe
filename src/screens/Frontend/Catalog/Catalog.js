import React from 'react'
import { StyleSheet, View } from 'react-native'
import { CATEGORIES } from '../../../data'
import ScreenHeader from '../../../components/shared/ScreenHeader'
import CategoryCard from '../../../components/Frontend/Catalog/CategoryCard'

export default function Catalog() {
  return (
    <View style={styles.container}>
      <ScreenHeader title="Catalog" icon="search" navigateTo="search"/>
      <CategoryCard list={CATEGORIES}/>
    </View>
  )
}
const styles =StyleSheet.create({
  container: {},
})