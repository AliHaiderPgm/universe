import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import { ActivityIndicator } from 'react-native-paper'
import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
//context
import { useAuth } from '../../../Context/AuthContext'
//components
import NoProductFound from '../../../components/Frontend/cart/NoProductFound'
import CartDetails from '../../../components/Frontend/cart/CartDetails'
import { colors } from '../../../components/constants/theme'

export default function Cart() {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(false)
  const { user,isAuthenticated } = useAuth()
  const navigation = useNavigation()

  const getItems = () => {
    if (user.uid) {
      setLoading(true)
      firestore()
        .collection('cartItems')
        .where('userId', '==', user.uid)
        .get()
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
            setCartItems(s => ([...s, doc]))
          })
        })
        .catch(err => {
          console.error('Something went wrong!', err)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }
  useEffect(() => {
    !isAuthenticated ? navigation.navigate('auth',{name: 'login'}) :  getItems()
  }, [])

  const resetItems = ()=>{
    setCartItems([])
  }
  return <>
    {
      loading ? <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator animating={true} color={colors.gold} size={'large'} />
      </View>
        :
        <>
          {
           cartItems.length === 0 ? <NoProductFound /> : <CartDetails list={cartItems} resetItems={resetItems}/>
          }
        </>
    }
  </>
}