import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
//Pages
import Categories from './Catalog'
import CatalogDetail from './CatalogDetail'
//Components
import Icon from '../../../components/shared/Icon'
import Brands from './Brands'
import BrandsDetail from './BrandsDetail'

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
          statusBarStyle: 'dark'
        }}
        />

      <CategoryNavigator.Screen
        name="catalogDetail"
        component={CatalogDetail}
        options={{
          headerRight: () => (<Icon icon="cart" size={25} onPress={() => navigation.navigate('cart')} />),
          statusBarStyle: 'dark'
        }}
        />

      <CategoryNavigator.Screen
        name="brands"
        component={Brands}
        options={{
          statusBarStyle: 'dark',
          headerTitle:"Brands"
        }}
        />
      <CategoryNavigator.Screen
        name="brandDetail"
        component={BrandsDetail}
        options={{
          headerRight: () => (<Icon icon="cart" size={25} onPress={() => navigation.navigate('cart')} />),
          statusBarStyle: 'dark',
        }}
        />
    </CategoryNavigator.Navigator>
  )
}