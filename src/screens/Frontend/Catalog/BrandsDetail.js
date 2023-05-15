import React, { useEffect, useState } from 'react';
import { useWindowDimensions, View } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { colors, sizes } from '../../../components/constants/theme';
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
    style={{ backgroundColor: colors.white, }}
    labelStyle={{ fontWeight: '700', fontSize: sizes.h3 - 2, textTransform: 'capitalize' }}
  />
);

export default TabViewExample = ({ route }) => {
  const brandData = route.params.brandDetails
  const navigation = useNavigation()
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
    navigation.setOptions({ title: brandData.name })
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
  const [routes] = useState([
    { key: 'first', title: 'men' },
    { key: 'second', title: 'children' },
    { key: 'third', title: 'women' },
  ])
  const renderScene = SceneMap({
    first: () => (<DetailRoute data={menProducts} />),
    second: () => (<DetailRoute data={childrenProducts} />),
    third: () => (<DetailRoute data={womenProducts} />),
  });

  return (
    <>{loading ? <View style={{ height: sizes.height - 100, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator animating={true} color={colors.gold} size={'large'} /></View>
      : <TabView
        renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    }</>);
}