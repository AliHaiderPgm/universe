import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Categories from './Catalog'
import CatalogDetail from './CatalogDetail'
import Icon from '../../../components/shared/Icon'
import { useNavigation } from '@react-navigation/native'

export default function Index() {
  const navigation = useNavigation()
  const CategoryNavigator = createNativeStackNavigator()
  return (
    <CategoryNavigator.Navigator initialRouteName='Home'>
      <CategoryNavigator.Screen
        name="Home"
        component={Categories}
        options={{
          headerTitle: 'Catalog',
          headerRight: () => (<Icon icon="search" size={23} onPress={() => navigation.navigate('search')} />),
        }}
      />

      <CategoryNavigator.Screen
        name="catalogDetail"
        component={CatalogDetail}
        options={{
          headerRight: () => (<Icon icon="cart" size={25} onPress={() => navigation.navigate('cart')} />),
        }}
      />
    </CategoryNavigator.Navigator>
  )
}