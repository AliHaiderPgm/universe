import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import SearchBar from '../screens/Frontend/SearchBar'
import TabNavigator from './TabNavigator'
import Cart from '../screens/Frontend/Cart/Cart'
import ProductDetails from '../screens/Frontend/ProductDetails'
import Auth from '../screens/Auth'
import { colors } from '../components/constants/theme'
import Icon from '../components/shared/Icon'

export default function MainNavigator() {
    const Stack = createNativeStackNavigator()

    return (
        <NavigationContainer>
            <Stack.Navigator >
                <Stack.Screen
                    name='Root'
                    component={TabNavigator}
                    options={{ 
                        headerShown: false,
                        statusBarStyle: 'dark'
                     }}
                />
                <Stack.Screen
                    name='search'
                    component={SearchBar}
                    options={{ 
                        headerShown: false,
                        statusBarColor: colors.light,
                        statusBarStyle: 'dark'
                     }}
                />
                <Stack.Screen
                    name='cart'
                    component={Cart}
                    options={{
                        headerTitle: 'Shopping Cart',
                        statusBarStyle: 'dark',
                        headerRight: () => (<Icon icon="heartOutline" size={25} />),
                    }}
                />
                <Stack.Screen
                    name='productDetail'
                    component={ProductDetails}
                    options={{
                        statusBarStyle: 'dark',
                        headerRight: () => (<Icon icon="heartOutline" size={25} />),
                    }}
                />
                <Stack.Screen
                    name='auth'
                    component={Auth}
                    options={{
                        statusBarStyle: 'light', 
                        headerShown: false 
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}