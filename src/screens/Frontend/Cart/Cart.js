import React, { useEffect, useState } from 'react'
import NoProductFound from '../../../components/Frontend/cart/NoProductFound'
import CartDetails from '../../../components/Frontend/cart/CartDetails'
import { useAuth } from '../../../Context/AuthContext'
import firestore from '@react-native-firebase/firestore';
import { ActivityIndicator } from 'react-native-paper'
import { View } from 'react-native'
import { colors } from '../../../components/constants/theme'

export default function Cart() {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

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
    getItems()
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