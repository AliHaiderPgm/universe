import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import { ActivityIndicator } from 'react-native-paper'
import { View } from 'react-native'
import { useToast } from 'native-base'
//context
import { useAuth } from '../../../Context/AuthContext'
//components
import NoProductFound from '../../../components/Frontend/cart/NoProductFound'
import CartDetails from '../../../components/Frontend/cart/CartDetails'
import { colors } from '../../../components/constants/theme'

export default function Cart() {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()
  const toast = useToast()

  const getItems = () => {
    setCartItems([])
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
        .catch(() => { notify('Something went wrong!', 'red') })
        .finally(() => { setLoading(false) })
    }
  }


  useEffect(() => getItems(), [])
  const resetItems = () => setCartItems([])
  const notify = (msg, color) => toast.show({ title: msg, color: `${color}.700`, placement: 'top', duration: 2000 })

  return <>
    {
      loading ? <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator animating={true} color={colors.gold} size={'large'} />
      </View>
        :
        <>
          {
            cartItems.length === 0 ? <NoProductFound /> : <CartDetails list={cartItems} resetItems={resetItems} />
          }
        </>
    }
  </>
}