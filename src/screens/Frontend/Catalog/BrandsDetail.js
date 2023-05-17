import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { colors, sizes, spacing } from '../../../components/constants/theme';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { useToast } from 'native-base';
import DetailRoute from '../../../components/Frontend/Catalog/DetailRoute';
import { ActivityIndicator } from 'react-native-paper';


const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: colors.primary }}
    activeColor={colors.primary}
    inactiveColor={colors.gray}
    style={{ backgroundColor: colors.white,elevation:5,borderTopWidth:0.2,borderTopColor:colors.gray }}
    labelStyle={{ fontWeight: '700', fontSize: sizes.h3 - 2, textTransform: 'capitalize' }}
    pressColor={colors.lightGray}
  />
);

export default TabViewExample = ({ route }) => {
  const brandData = route.params.brandDetails
  const toast = useToast()
  const [womenProducts, setWomenProducts] = useState([])
  const [menProducts, setMenProducts] = useState([])
  const [childrenProducts, setChildrenProducts] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setMenProducts([])
    setChildrenProducts([])
    setWomenProducts([])
    getData('maleProducts')
    getData('femaleProducts')
    getData('childrenProducts')
  }, [])
  const getData = async (type) => {
    setLoading(true)
    await firestore()
      .collection(type)
      .where('brand', '==', brandData.name)
      .get()
      .then((querySnapShot) => {
        querySnapShot.forEach(snapShot => {
          let data = snapShot.data()
          if (type === 'maleProducts') { setMenProducts(s => [...s, data]) }
          else if (type === 'femaleProducts') { setWomenProducts(s => [...s, data]) }
          else { setChildrenProducts(s => [...s, data]) }
        })
      }).catch(() => {
        notify('Something went wrong!', 'red')
      }).finally(() => {
        setLoading(false)
      })
  }
  const notify = (title, color) => { toast.show({ title: title, backgroundColor: `${color}.700`, placement: 'top', duration: 2000, shadow: '9' }) }
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState([]);
  
  useEffect(() => {
    const newRoutes = []
    if (menProducts.length > 0) {newRoutes.push({ key: 'first', title: 'men' })}
    if (childrenProducts.length > 0) {newRoutes.push({ key: 'second', title: 'children' })}
    if (womenProducts.length > 0) {newRoutes.push({ key: 'third', title: 'women' })}
    setRoutes(newRoutes)
  }, [menProducts, childrenProducts, womenProducts])
  
  const renderScene = SceneMap({
    first: () => (<DetailRoute data={menProducts} />),
    second: () => (<DetailRoute data={childrenProducts} />),
    third: () => (<DetailRoute data={womenProducts} />),
  });

  return (
    <>{loading ? <View style={{ height: sizes.height, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator animating={true} color={colors.gold} size={'large'} /></View>
      : <>
      <View style={styles.container}>
        <Image source={{uri: brandData.logoImage}} style={styles.image}/>
        <Text style={styles.text}>{brandData.name}</Text>
      </View>
        <TabView
          renderTabBar={renderTabBar}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
        />
      </>
    }</>);
}

const styles = StyleSheet.create({
  container:{
    paddingTop:spacing.s,
    height: 100,
    width: sizes.width,
    alignItems:'center',
    justifyContent:'center',
    overflow:'hidden',
    gap: spacing.s,
    backgroundColor:colors.light
  },
  image:{
    borderRadius:sizes.radius,
    height: 60,
    width:70,
    resizeMode:'contain',
    borderWidth:1
  },
  text:{
    color:colors.black,
    fontSize: sizes.h3 + 1,
    fontWeight: '600'
  },
})