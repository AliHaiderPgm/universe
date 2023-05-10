import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Image, ScrollView, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useToast } from 'native-base'
import firestore from '@react-native-firebase/firestore';
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
  const navigation = useNavigation()
  const { isAuthenticated, user } = useAuth()
  const toast = useToast()


  useEffect(() => {
    navigation.setOptions({ title: product.name })
  }, [])

  // Function to handle size selection
  const handleSizeSelection = (size) => {
    setSelectedSize(size);
  };
  // Function to handle color selection
  const handleColorSelection = (color) => {
    setSelectedColor(color);
  };
  const fromChild = (data) => {
    setPrice(data.number)
    setQuantity(data.count)
  }

  const notify = (msg, color) => {
    return toast.show(
      {
        title: msg,
        placement: 'top',
        backgroundColor: `${color}.800`,
        duration: 2000,
        marginTop: -10
      }
    )
  }
  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigation.navigate('auth', { name: 'login' })
      return
    }
    const cartProduct = {
      ...product,
      quantity,
      totalPrice: price,
      selectedColor,
      userId: user.uid
    }
    if (selectedSize === null) { notify('Select a size!', 'red') }
    else if (selectedColor === null) { notify('Select a color!', 'red') }
    else (Add(cartProduct))
  }

  const Add = async (cartProduct) => {
    setLoading(true)
    const docRef = firestore()
    .collection('cartItems')
    .where('userId', '==', cartProduct.userId)
    .where('id', '==', cartProduct.id)
    const querySnapShot = await docRef.get()
      if(!querySnapShot.empty){
        updateDoc(cartProduct)
      } else{
        AddToCart(cartProduct)
      }

  }

  const updateDoc = (cartProduct) => {
    notify('Already added to cart!', 'red')
    setLoading(false)
  }

  const AddToCart = (cartProduct) => {
    firestore()
      .collection('cartItems')
      .add(cartProduct)
      .then((docRef) => {
        docRef.update({
          docRefId: docRef.id,
        })
        notify('Added to cart', 'green')
        setSelectedColor(null)
        setSelectedSize(null)
      })
      .catch(() => {
        notify('Something went wrong!', 'red')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const sizes = ['S', 'M', 'L', 'XL',]
  const colors = ['#ef233c', '#2ec4b6', '#a2d2ff', '#6c757d', '#001233']

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.container}>

        <View style={styles.imageContainer}>
          <Image source={{ uri: product.imageUrl }} style={styles.image} />
        </View>

        <View style={styles.detailsWrapper}>

          <View style={styles.titleContainer}>
            <Text style={styles.title}>{product.name}</Text>
            <Text style={styles.desc}>{product.description}</Text>
          </View>

          <Text style={styles.label}>Material:</Text>
          <Text style={[styles.desc, { marginBottom: spacing.s }]}>{product?.material}</Text>

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

          <Text style={styles.label}>Color:</Text>
          <View style={styles.selectionContainer}>
            {colors.map((color, index) => {
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

          <Text style={styles.label}>Quantity:</Text>
          <Counter sendToParent={fromChild} productPrice={product.price} />

        </View>
      </ScrollView>
      <View style={styles.buttonWrapper}>
        {
          loading ? <View style={styles.button}><Text style={[styles.price, { marginVertical: spacing.s + 7 }]}>Adding...</Text></View>
            : <TouchableOpacity activeOpacity={0.5} style={styles.button} onPress={() => handleAddToCart()}>
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
    marginBottom: 55,
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
    top: -20,
    backgroundColor: colors.white,
    borderTopLeftRadius: sizes.radius + 20,
    borderTopRightRadius: sizes.radius + 20,
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.l,
  },
  titleContainer: {
    marginBottom: spacing.s,
  },
  title: {
    fontSize: sizes.h2,
    fontWeight: 'bold',
    color: colors.black,
  },
  desc: {
    fontSize: sizes.h3,
    color: colors.gray,
  },
  label: {
    fontSize: sizes.h3,
    fontWeight: 'bold',
    marginBottom: spacing.s,
    color: colors.black,
  },
  selectionContainer: {
    flexDirection: 'row',
    marginBottom: spacing.m,
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
    bottom: 15,
    left: 25,
    width: sizes.width - 50,
  },
  button: {
    backgroundColor: colors.gold,
    borderRadius: sizes.radius,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: spacing.m,
  },
  price: {
    fontSize: sizes.h2,
    fontWeight: 'bold',
    color: colors.black,
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
})