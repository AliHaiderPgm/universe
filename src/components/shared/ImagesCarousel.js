import React, { useEffect, useRef, useState } from 'react'
import { View, Image, ScrollView, StyleSheet, Dimensions } from 'react-native'


const { width } = Dimensions.get('window')
const height = width * 0.30
export default function ImageCarousel() {
    const initialState = [
        "https://source.unsplash.com/random/1024x768/?fashion-products",
        "https://source.unsplash.com/random/1024x768/?model",
        "https://source.unsplash.com/random/1024x768/?hoodie",
        "https://source.unsplash.com/random/1024x768/?watches",
        "https://source.unsplash.com/random/1024x768/?kids",
    ]
    const [data, setData] = useState(initialState)
    const [isActive, setIsActive] = useState(0)
    const scrollRef = useRef(null)

    useEffect(() => {
        const interval = setInterval(() => {
            const nextIndex = (isActive + 1) % data.length;
            scrollRef.current.scrollTo({
                x: nextIndex * width,
                animated: false,
            });
            setIsActive(nextIndex);
        }, 5000)

        return () => {
            clearInterval(interval);
        };
    }, [isActive, data.length]);

    //to get new images
    // const fetchData = () => {
    //     return new Promise((resolve) => {
    //         setTimeout(() => {
    //             const newData = [
    //                 `https://source.unsplash.com/random/1280x720/?fashion&t=${Date.now()}`,
    //                 `https://source.unsplash.com/random/1280x720/?model&t=${Date.now()}`,
    //                 `https://source.unsplash.com/random/1280x720/?hoodie&t=${Date.now()}`,
    //                 `https://source.unsplash.com/random/1280x720/?watches&t=${Date.now()}`,
    //                 `https://source.unsplash.com/random/1280x720/?kids&t=${Date.now()}`,
    //             ];
    //             resolve(newData);
    //         }, 1000);
    //     });
    // }
    // useEffect(() => {
    //     fetchData().then((newData) => {
    //         setData(newData);
    //     })
    // }, [])

    const change = ({ nativeEvent }) => {
        const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
        if (slide !== isActive) {
            setIsActive(slide)
        }
    }
    return (
        <View style={styles.mainContainer}>
            <ScrollView
                ref={scrollRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={e => change(e)}
                style={styles.scroll}
                scrollEventThrottle={16}
                scrollToOverflowEnabled
            >

                {data.map((doc, i) => { return (<Image key={i} style={styles.image} source={{ uri: doc }} />) })}

            </ScrollView>
            <View style={styles.pagination}>
                {data.map((d, i) => { return (<View key={i} style={i == isActive ? styles.pagingActive : styles.paging} />) })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        width,
        height,
        marginTop: -10,
    },
    scroll: {
        width: width + 0.19,
        height,
    },
    image: {
        resizeMode: 'cover',
        height,
        width: width,
    },
    pagination: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center'
    },
    paging: {
        height: 3,
        width: 9,
        borderRadius: 11 / 2,
        backgroundColor: '#999',
        margin: 2,
        marginBottom: 10,
    },
    pagingActive: {
        height: 3,
        width: 12,
        borderRadius: 11 / 2,
        backgroundColor: '#f6f7f8',
        margin: 2,
        marginBottom: 10
    },
})