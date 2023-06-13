import { useEffect, useState } from 'react';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';


const getProductById = async (productId) => {
    try {
        const maleProduct = await getProduct('maleProducts', productId);
        const femaleProduct = await getProduct('femaleProducts', productId);
        const childrenProduct = await getProduct('childrenProducts', productId);
        const product = [...maleProduct, ...femaleProduct, ...childrenProduct];
        return product[0];
    } catch (error) {
        console.log('Error getting product by id', error.message);
    }
};

const getProduct = async (collectionName, productId) => {
    const products = [];
    await firestore()
        .collection(collectionName)
        .where('id', '==', productId)
        .get()
        .then((querySnapshot) => {
            if (!querySnapshot.empty) {
                querySnapshot.forEach((snapshot) => {
                    products.push(snapshot.data());
                });
            }
        });
    return products;
};

const HandleDeepLinking = () => {
    const navigation = useNavigation()

    useEffect(() => {
        const unsubscribe = dynamicLinks().onLink(handleLink)
        return unsubscribe
    }, [handleLink])
    // useEffect(() => {
    //     const unsub = dynamicLinks()
    //         .getInitialLink()
    //         .then(link => {
    //             if (link.url === 'https://universeproduct.page.link/jdF1?productId') {
    //                 console.log('true')
    //             } else {
    //                 console.log('false')
    //             }
    //         })
    //     return unsub
    // }, [])

    const handleLink = async (link) => {
        try {
            const productId = link.url.split('=').pop()
            const product = await getProductById(productId)
            navigation.navigate('productDetail', { product })
        } catch (error) {
            console.error(error)
        }
    }

};

export default HandleDeepLinking