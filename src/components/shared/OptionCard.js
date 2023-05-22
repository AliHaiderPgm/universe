import React from 'react'
import { TouchableHighlight, TouchableOpacity } from 'react-native'
import { View, Text, StyleSheet } from 'react-native'
//components
import { colors, sizes, spacing } from '../constants/theme'
import Icon from './Icon'
import { useNavigation } from '@react-navigation/native'
import { Linking, Platform } from 'react-native';
import NotificationSetting from 'react-native-open-notification';

export default function OptionCard({ data }) {
    const navigation = useNavigation()
    const openSettings = () => {
        if (Platform.OS === 'android') {
            Linking.openSettings();
        } else if (Platform.OS === 'ios') {
            Linking.openURL('app-settings:');
        }
    }
    const openNotification = () => {
        NotificationSetting.open();
    }

    return (
        <TouchableOpacity
            activeOpacity={0.5}
            onPress={data.path === 'openSetting' ? openSettings
                : data.path === 'openNotification' ? openNotification
                    : () => navigation.navigate(data.path)}
        >
            <View style={styles.cardWrapper}>
                <View style={styles.textWrapper}>
                    <Text style={styles.title}>{data.title}</Text>
                    <View style={styles.icon}>
                        <Icon icon={data?.icon} size={25} />
                    </View>
                </View>
                <View style={styles.next}>
                    <Icon icon="next" size={25} />
                </View>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    cardWrapper: {
        height: 70,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.m,
    },
    textWrapper: {
        flexDirection: 'row-reverse',
        gap: spacing.m,
        height: '100%',
        alignItems: 'center',
    },
    icon: {
        borderWidth: 0.15,
        borderColor: colors.gold,
        padding: spacing.m - 5,
        borderRadius: sizes.radius,
        backgroundColor: colors.lightGold,
    },
    title: {
        fontSize: sizes.h2,
        fontWeight: '600',
        color: colors.black,
    },
    next: {
        borderWidth: 0.3,
        borderColor: colors.black,
        padding: spacing.m - 10,
        borderRadius: sizes.radius,
    }
})