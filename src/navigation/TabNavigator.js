import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from '../components/shared/Icon';
import Home from '../screens/Frontend/Home';
import Categories from '../screens/Frontend/Catalog';
import Settings from '../screens/Frontend/Settings';

export default function TabNavigator() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator initialRouteName='Home'
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}>
      <Tab.Screen name="Home" component={Home} options={{
        tabBarIcon: ({ focused }) => {
          return focused ? <Icon icon="homeFilled" /> : <Icon icon="home" />
        }
      }} />
      <Tab.Screen name="Categories" component={Categories} options={{
        tabBarIcon: ({ focused }) => {
          return focused ? <Icon icon="categoriesFilled" /> : <Icon icon="categories" />
        },
      }} />
      <Tab.Screen name="Setting" component={Settings} options={{
        tabBarIcon: ({ focused }) => {
          return focused ? <Icon icon="settingsBlackFilled" /> : <Icon icon="settingsBlack" />
        }
      }} />
    </Tab.Navigator>
  )
}