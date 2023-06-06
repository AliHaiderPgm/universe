import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Image, ScrollView, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useColorMode, useToast } from 'native-base'
import firestore from '@react-native-firebase/firestore';
import { ActivityIndicator, Button, TextInput } from 'react-native-paper';
//context
import { useAuth } from '../../Context/AuthContext'
//components
import { colors, sizes, spacing } from '../../components/constants/theme'
import Icon from '../../components/shared/Icon'
import Counter from '../../components/shared/Counter'

export default function ProductDetails({ navgation, route }) {
  const { product } = route.params
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [price, setPrice] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [loading, setLoading] = useState(false)
  const [wishLoading, setWishLoading] = useState(false)
  const [addReviewLoading, setAddReviewLoading] = useState(false)
  const navigation = useNavigation()
  const { isAuthenticated, user } = useAuth()
  const toast = useToast()
  const [wished, setWished] = useState(false)
  const [state, setState] = useState({ review: '' })


  useEffect(() => {
    navigation.setOptions({ title: product.name, })
    isAuthenticated && isWished()
  }, [])
  const handleSizeSelection = (size) => setSelectedSize(size);
  const handleColorSelection = (color) => setSelectedColor(color);
  const fromChild = (data) => {
    setPrice(data.number)
    setQuantity(data.count)
  }

  const notify = (msg, color) => {
    return toast.show({ title: msg, placement: 'top', backgroundColor: `${color}.800`, duration: 2000, marginTop: -10, shadow: '9', })
  }

  const isWished = () => {
    setWishLoading(true)
    firestore()
      .collection('wishList')
      .where('userId', '==', user.uid)
      .where('id', '==', product.id)
      .get()
      .then((docRef) => {
        if (!docRef.empty) {
          setWished(true)
        }
      }).catch(() => {
        notify('Something went wrong while checking wish list!', 'error')
      }).finally(() => {
        setWishLoading(false)
      })
  }
  const handleAdd = (func) => {
    if (!isAuthenticated) {
      navigation.navigate('auth', { name: 'login' })
      return
    }
    const cartProduct = {
      ...product,
      quantity,
      totalPrice: price,
      color: selectedColor,
      size: selectedSize,
      userId: user.uid
    }
    if (func === CheckInWishList) {
      func(cartProduct)
      return
    }
    if (selectedSize === null) { notify('Select a size!', 'red') }
    else if (selectedColor === null) { notify('Select a color!', 'red') }
    else { func(cartProduct) }
  }

  const CheckInCart = async (cartProduct) => {
    setLoading(true)
    const docRef = firestore()
      .collection('cartItems')
      .where('userId', '==', cartProduct.userId)
      .where('id', '==', cartProduct.id)
      .where('size', '==', cartProduct.size)
      .where('color', '==', cartProduct.color)
    const querySnapShot = await docRef.get()
    if (!querySnapShot.empty) {
      notify('Already added to cart!', 'error')
      setLoading(false)
    } else {
      Add(cartProduct, 'cartItems', 'cart')
    }
  }

  const CheckInWishList = async (cartProduct) => {
    setWishLoading(true)
    const docRef = firestore()
      .collection('wishList')
      .where('userId', '==', cartProduct.userId)
      .where('id', '==', cartProduct.id)
    const querySnapShot = await docRef.get()
    if (!querySnapShot.empty) {
      removeItem(cartProduct)
    } else {
      Add(cartProduct, 'wishList', 'wish list')
    }
  }

  const removeItem = (cartProduct) => {
    setWishLoading(true)
    firestore()
      .collection('wishList')
      .where('userId', '==', user.uid)
      .where('id', '==', cartProduct.id)
      .get()
      .then(docRef => {
        docRef.forEach(doc => {
          doc.ref.delete()
        });
        setWished(false)
        notify('Removed from wish list!', 'success')
      }).catch(() => {
        notify('Something went wrong!', 'error')
      }).finally(() => {
        setWishLoading(false)
      })
  }

  const Add = (cartProduct, collectionName, name) => {
    firestore()
      .collection(collectionName)
      .add(cartProduct)
      .then((docRef) => {
        docRef.update({ docRefId: docRef.id })
        notify(`Added to ${name}`, 'success')
        collectionName === 'cartItem' && setSelectedColor(null)
        collectionName === 'cartItem' && setSelectedSize(null)
        collectionName === 'wishList' && setWished(true)
      })
      .catch(() => {
        notify('Something went wrong!', 'red')
      })
      .finally(() => {
        setLoading(false)
        setWishLoading(false)
      })
  }

  ////////////////////////////////////////REVIEW
  const handleChange = (name, value) => {
    setState(s => ({ ...s, [name]: value }))
  }

  const handleAddReview = async () => {
    let { review } = state
    review = review.trim()
    if (review.length <= 4) {
      notify('Review length is to short', 'error')
      return
    }
    const collectionName = await findProduct()
    const querySnapshot = await firestore().collection(collectionName).where('id', '==', product.id).get()
    querySnapshot.forEach((docSnapshot) => {
      const docRef = firestore().collection(collectionName).doc(docSnapshot.id)
      docRef.update({ reviews: review })
        .then(() => {
          console.log('Review updated successfully!')
        })
        .catch((error) => {
          console.error('Error updating review:', error)
        })
    })
  }
  const findProduct = async () => {
    let collectionName
    const maleCollectionRef = await firestore().collection('maleProducts').where('id', '==', product.id).get()
    const femaleCollectionRef = await firestore().collection('femaleProducts').where('id', '==', product.id).get()
    const childrenCollectionRef = await firestore().collection('childrenProducts').where('id', '==', product.id).get()

    if (!maleCollectionRef.empty) { collectionName = 'maleProducts' }
    else if (!femaleCollectionRef.empty) { collectionName = 'femaleProducts' }
    else if (!childrenCollectionRef.empty) { collectionName = 'childrenProducts' }
    else { console.log('Product not found in any collection') }
    return collectionName;
  }

  const sizes = ['S', 'M', 'L', 'XL',]
  const avalibleColors = ['#ef233c', '#2ec4b6', '#a2d2ff', '#6c757d', '#001233']

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.container}>
        {/* //////////PRODUCT IMAGE */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.imageUrl }} style={styles.image} />
        </View>

        <View style={styles.detailsWrapper}>
          {/* ///////////////PRODUCT DETAIL */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{product.name}</Text>
            <Text style={styles.desc}>{product.description}</Text>
          </View>
          {/* //////////////MATERIAL */}
          <View>
            <Text style={styles.label}>Material:</Text>
            <Text style={styles.desc}>{product?.material}</Text>
          </View>
          {/* ////////////////SIZE */}
          <View>
            <Text style={styles.label}>Size:</Text>
            <View style={styles.selectionContainer}>
              {sizes.map((size, index) => {
                return <TouchableOpacity
                  key={index}
                  style={[styles.sizeButton, selectedSize === size && styles.selectedSizeButton]}
                  onPress={() => handleSizeSelection(size)}
                  activeOpacity={0.5}
                >
                  <Text style={styles.buttonText}>{size}</Text>
                </TouchableOpacity>
              })}
            </View>
          </View>
          {/* ///////////////COLOR */}
          <View>
            <Text style={styles.label}>Color:</Text>
            <View style={styles.selectionContainer}>
              {avalibleColors.map((color, index) => {
                return <TouchableOpacity
                  key={index}
                  style={[styles.colorButton, selectedColor === color && styles.selectedColorButton]}
                  onPress={() => handleColorSelection(color)}
                  activeOpacity={0.5}
                >
                  <View style={[styles.color, { backgroundColor: color }]} />
                </TouchableOpacity>
              })}
            </View>
          </View>
          {/* //////////////QUANTITY */}
          <View>
            <Text style={styles.label}>Quantity:</Text>
            <Counter sendToParent={fromChild} productPrice={product.price} />
          </View>
          {/* ////////////PREVIOUS REVIEWS */}
          <View>
            <Text style={styles.label}>Reviews:</Text>
            <View style={styles.reviewsContainer}>
              <View style={styles.userInfoContainer}>
                <Image source={require('../../assets/appLogo.png')} resizeMode="contain" style={styles.profile} />
                <Text style={styles.userName}>Ali Haider</Text>
              </View>
              <Text style={styles.desc}>This is a very good product.</Text>
            </View>
          </View>
          {/* /////////////ADD NEW REVIEW */}
          <View>
            <Text style={styles.label}>Add Review:</Text>
            <TextInput
              label="Review"
              placeholder="How you feel about this product"
              mode='outlined' activeOutlineColor={colors.black} outlineColor={colors.black} textColor='black' multiline={true}
              onChangeText={text => handleChange('review', text)}
              value={state.review}
              style={styles.inputField}
            />
            <Button mode="elevated" buttonColor={colors.black} textColor={colors.white} uppercase style={styles.btn} onPress={handleAddReview}>
              Add Review
            </Button>

          </View>
        </View>
      </ScrollView>
      {/* //////////////ADD TO CART & ADD TO WISHLIST */}
      <View style={styles.buttonWrapper}>
        {
          wishLoading ? <ActivityIndicator color='gold' style={{ marginLeft: spacing.m - 1 }} />
            :
            <Icon icon={wished ? 'heartFilled' : 'heartOutline'} onPress={() => handleAdd(CheckInWishList)} />
        }
        {
          loading ? <View style={styles.button}>
            <Text style={[styles.price, { marginVertical: spacing.s + 7 }]}>Adding...</Text>
            <ActivityIndicator color='gold' />
          </View>
            : <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={() => handleAdd(CheckInCart)}>
              <Text style={styles.price}>${price}</Text>
              <View style={styles.addToCartWrapper}>
                <Icon icon="cart" size={23} />
                <Text style={styles.addToCartText}>Add to cart</Text>
              </View>
            </TouchableOpacity>
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    alignContent: 'center',
    backgroundColor: colors.white,
  },
  container: {
    position: 'relative',
    marginBottom: 35,
  },
  imageContainer: {
    overflow: 'hidden',
  },
  image: {
    width: sizes.width,
    height: sizes.height - 350,
    resizeMode: 'cover',
  },
  detailsWrapper: {
    position: 'relative',
    top: -30,
    backgroundColor: colors.white,
    borderTopLeftRadius: sizes.radius + 20,
    borderTopRightRadius: sizes.radius + 20,
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.l,
    gap: spacing.m - 5
  },
  title: {
    fontSize: sizes.h2 + 5,
    fontWeight: 'bold',
    color: colors.black,
  },
  desc: {
    fontSize: sizes.h3,
    color: colors.gray,
  },
  label: {
    fontSize: sizes.h3 + 4,
    fontWeight: 'bold',
    marginBottom: spacing.s,
    color: colors.black,
  },
  selectionContainer: {
    flexDirection: 'row',
  },
  sizeButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: sizes.radius,
    borderWidth: 1,
    borderColor: colors.lightGray,
    marginRight: spacing.s,
    paddingVertical: spacing.s,
  },
  buttonText: {
    fontSize: sizes.h3,
    color: colors.black,
  },
  selectedSizeButton: {
    borderColor: colors.black,
    borderWidth: 1.4,
  },
  colorButton: {
    borderRadius: sizes.radius,
    height: 34,
    width: 34,
    marginRight: spacing.m - 5,
    paddingVertical: spacing.s,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedColorButton: {
    borderWidth: 1,
  },
  color: {
    height: 26,
    width: 26,
    borderRadius: sizes.radius,
  },
  buttonWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.m,
    paddingHorizontal: spacing.xl,
    height: 70,
    width: sizes.width,
    backgroundColor: colors.light
  },
  button: {
    width: '100%',
    backgroundColor: colors.black,
    borderRadius: sizes.radius,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: spacing.m,
  },
  price: {
    fontSize: sizes.h2,
    fontWeight: 'bold',
    color: colors.white,
    justifyContent: 'center'
  },
  addToCartWrapper: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    marginVertical: spacing.s,
    padding: spacing.s,
    borderRadius: sizes.radius,
    gap: 14,
  },
  addToCartText: {
    fontSize: sizes.h3,
    fontWeight: '600',
    color: colors.black,
  },
  inputField: {
    backgroundColor: colors.white,
    marginBottom: spacing.m,
    borderRadius: 8,
  },
  btn: {
    paddingVertical: spacing.s,
    borderRadius: 8,
    borderTopRightRadius: 3,
  },
  reviewsContainer: {
    gap: spacing.s,
    marginHorizontal: spacing.s,
  },
  userInfoContainer: {
    flexDirection: 'row',
    gap: spacing.m,
  },
  profile: {
    height: 25,
    width: 25,
    borderRadius: 50
  },
  userName: {
    fontWeight: 700,
    color: colors.black,
    fontSize: sizes.h3,
  },
  review: {
    fontWeight: 600,
    color: colors.gray,
    fontSize: sizes.h3,
  }
})