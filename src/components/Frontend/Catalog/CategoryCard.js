import React from 'react'
import { View, Text, Pressable, Image, StyleSheet } from 'react-native'
import { colors, sizes, spacing } from '../../constants/theme'
import OptionCard from '../../shared/OptionCard'
import { useNavigation } from '@react-navigation/native'

export default function CategoryCard({ list }) {
    const navigation = useNavigation()
    return (
        <View style={styles.containerWrapper}>
            {list.map((Category, index) => {
                return (
                    <Pressable key={index}>
                        <View style={[{ height: Category.image ? sizes.cardHeight : sizes.cardHeight / 2 }, styles.container]}>
                            {
                                Category.image ?
                                    <View>
                                        <Image source={Category.image} style={styles.image}/>
                                        <View style={styles.wrapper}>
                                            <Text style={styles.categoryText}>{Category.title}</Text>
                                            <Pressable style={styles.btn} onPress={()=> navigation.navigate('catalogDetail',{name:Category.title, types: Category.categoryTypes})}>
                                                <Text style={styles.btnText}>
                                                    View all
                                                </Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                    :
                                    <OptionCard data={Category}/>
                            }
                        </View>
                    </Pressable>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    containerWrapper: {
        paddingHorizontal: spacing.m,
        gap: spacing.m,
    },
    container: {
        position: 'relative',
        borderRadius: sizes.radius,
        overflow: 'hidden',
        width: '100%',
        elevation: 7,
        backgroundColor: colors.white,
    },
    image: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover'
    },
    wrapper: {
        position: 'absolute',
        top: 0,
        alignItems: 'center',
        gap: spacing.m,
        top: '17%',
        left: '10%'
    },
    categoryText: {
        fontSize: sizes.title + 6,
        fontWeight: 'bold',
        color: colors.black,
    },
    btn: {
        backgroundColor: colors.gray,
        paddingHorizontal: spacing.m,
        paddingVertical: spacing.s,
        borderRadius: sizes.radius - 7,
    },
    btnText: {
        color: colors.white,
    },
    cardWrapper: {
        height: '100%',
        width: '100%',
        backgroundColor: colors.light,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.m,
    },
    textWrapper: {
        flexDirection: 'row-reverse',
        gap: spacing.m,
        height: '100%',
        alignItems:'center',
    },
    title: {
        fontSize: sizes.h2,
        fontWeight: '600'
    }
})