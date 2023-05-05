import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
//components
import { colors, spacing } from '../../constants/theme'

export default function UserNotFound() {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={require('../../../assets/universe.png')} style={styles.image} />
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    mode="contained"
                    buttonColor={colors.white} textColor={colors.black}
                    style={styles.btn}
                    onPress={() => navigation.navigate('auth',{screen:'login'})}
                >
                    Login
                </Button>
                <View style={styles.line}/>
                <Button
                    mode="contained"
                    buttonColor={colors.white} textColor={colors.black}
                    style={styles.btn}
                    onPress={() => navigation.navigate('auth',{screen: 'register'},)}
                >
                    Resgister
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:colors.black,
        paddingHorizontal: spacing.m,
    },
    logoContainer:{
        height:'70%',
        width:'100%',
        alignItems:'center',
        justifyContent:'center'
    },
    image:{
        height: 35,
        resizeMode:'contain'
    },
    buttonContainer:{
        height:'20%',
        gap: 20,
        justifyContent:'center',
    },
    line:{
        height:1,
        backgroundColor:colors.white,
    }
})