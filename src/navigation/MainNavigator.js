import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer, useNavigation,} from '@react-navigation/native'
import SearchBar from '../screens/Frontend/SearchBar'
import TabNavigator from './TabNavigator'
import Cart from '../screens/Frontend/Cart/Cart'
import ProductDetails from '../screens/Frontend/ProductDetails'
import Auth from '../screens/Auth'
import { colors } from '../components/constants/theme'
import { useAuth } from '../Context/AuthContext'
import Login from '../screens/Auth/Login'
import WishList from '../screens/Frontend/Settings/WishList'
import UpdateProfile from '../screens/Frontend/Settings/UpdateProfile'

export default function MainNavigator() {
    const Stack = createNativeStackNavigator()
    const {isAuthenticated} = useAuth()
    return (
        <NavigationContainer>
            <Stack.Navigator >
                <Stack.Screen
                    name='Root'
                    component={TabNavigator}
                    options={{ 
                        headerShown: false,
                        statusBarStyle: 'light',
                        statusBarColor: colors.white,
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
                    component={isAuthenticated ? Cart : Login}
                    options={{
                        headerShown: isAuthenticated,
                        headerTitle: 'Shopping Cart',
                        statusBarColor: isAuthenticated ? colors.light : colors.black ,
                        statusBarStyle: 'dark',
                    }}
                />
                <Stack.Screen
                    name='productDetail'
                    component={ProductDetails}
                    options={{
                        statusBarStyle: 'dark',
                        statusBarColor:colors.light,
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
                <Stack.Screen
                    name='wishList'
                    component={WishList}
                    options={{
                        statusBarColor:colors.light,
                        statusBarStyle:'dark',
                        headerTitle:'Wish List'
                    }}
                />
                <Stack.Screen
                    name='updateProfile'
                    component={UpdateProfile}
                    options={{
                        statusBarColor:colors.light,
                        statusBarStyle:'dark',
                        headerTitle:'Profile'
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}