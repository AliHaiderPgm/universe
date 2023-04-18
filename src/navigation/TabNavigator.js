import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from '../components/shared/Icon';
import Home from '../screens/Frontend/Home';
import Categories from '../screens/Frontend/Catalog';
import Profile from '../screens/Frontend/Profile';

export default function TabNavigator() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator initialRouteName='Home' 
    screenOptions={{
      headerShown: false,
      tabBarShowLabel: false
    }}>
      <Tab.Screen name="Home" component={Home} options={{
        tabBarIcon: ({focused}) => {
          return focused ? <Icon icon="homeFilled"/> : <Icon icon="home" />
        }
      }} />
      <Tab.Screen name="Categories" component={Categories} options={{
        tabBarIcon: ({focused}) => {
          return focused ? <Icon icon="categoriesFilled"/> :<Icon icon="categories" />
        }
      }} />
      <Tab.Screen name="Profile" component={Profile} options={{
        tabBarIcon: ({focused}) => {
          return focused ? <Icon icon="profileFilled"/>: <Icon icon="profile" />
        }
      }} />
    </Tab.Navigator>
  )
}