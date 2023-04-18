import React from 'react'
import ScreenHeader from '../../../components/shared/ScreenHeader'
import NoProductFound from '../../../components/Frontend/cart/NoProductFound'
import { PRODUCTS } from '../../../data'
import CartDetails from '../../../components/Frontend/cart/CartDetails'

export default function Cart() {
  return <>
    <ScreenHeader title="Shopping Cart" />
    <CartDetails list={PRODUCTS} />
    {/* <NoProductFound /> */}
  </>
}