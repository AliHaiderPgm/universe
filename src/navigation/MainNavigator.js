import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import SearchBar from '../components/shared/SearchBar'
import TabNavigator from './TabNavigator'
import Cart from '../screens/Frontend/Cart/Cart'
import ProductDetails from '../screens/Frontend/ProductDetails'
import Auth from '../screens/Auth'
import { colors } from '../components/constants/theme'

export default function MainNavigator() {
    const Stack = createNativeStackNavigator()

    return (
        <NavigationContainer>
           <Stack.Navigator >
                <Stack.Screen
                    name='Root'
                    component={TabNavigator}
                    options={{ headerShown: false,}} 
                />
                <Stack.Screen
                    name='search'
                    component={SearchBar}
                    options={{ headerShown: false }} 
                />
                <Stack.Screen
                    name='cart'
                    component={Cart}
                    options={{ headerShown: false }} 
                />
                <Stack.Screen
                    name='productDetail'
                    component={ProductDetails}
                    options={{ headerShown: false, statusBarColor: colors.white,}} 
                />
                <Stack.Screen
                    name='auth'
                    component={Auth}
                    options={{ headerShown: false }} 
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}