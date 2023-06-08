import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import { ActivityIndicator, Divider } from 'react-native-paper'
import { colors, sizes, spacing } from '../../../components/constants/theme'
import { List } from 'react-native-paper'
import { useAuth } from '../../../Context/AuthContext'

const renderListHeading = () => {
    return <View style={[styles.row, styles.listHeading]}>
        <Text style={[styles.heading, { paddingRight: spacing.xl + spacing.s }]}>Name</Text>
        <Text style={[styles.heading, { paddingHorizontal: spacing.l }]}>Quantity</Text>
        <Text style={[styles.heading, { paddingLeft: spacing.xl + spacing.xl - 15 }]}>Total Price</Text>
        <Divider />
    </View>
}
const renderList = (order) => {
    let productName = order.name
    if (productName.length >= 15) {
        productName = productName.slice(0, 15) + '...'
    }
    return <View style={styles.row}>
        <View style={{ width: 80 }}>
            <Text style={styles.subHeading}>{productName}</Text>
        </View>
        <Text style={[styles.subHeading, { paddingHorizontal: spacing.xl }]}>{order.quantity}</Text>
        <Text style={[styles.subHeading, { paddingLeft: spacing.xl + spacing.xl + 10 }]}>Rs.{order.totalPrice}</Text>
        <Divider />
    </View>
}

const renderAccordionList = (order, index, color) => {
    return <List.Accordion
        title={order.recieverName}
        titleStyle={[styles.subHeading, { alignSelf: 'center' }]}
        style={styles.accordion}
        left={() => <Text style={styles.subHeading}>#{order.orderID}</Text>}
        right={() => <Text style={[styles.subHeading, { color: color }]}>{order.status}</Text>}
        key={index}
    >
        <List.Item left={() => renderListHeading()} style={styles.subHeading} />
        <Divider />
        {/* ///////////////ORDER DETAILS CARDS */}
        {order.orderDetails.map((suborder, index) => {
            return <View key={index} style={{ marginLeft: -62 }}>
                <List.Item
                    style={styles.subHeading}
                    left={() => renderList(suborder)}
                />
                <Divider />
            </View>
        })}
    </List.Accordion>
}

export default function OrderHistory() {
    const [state, setState] = useState([])
    const [loading, setLoading] = useState(false)
    const { user } = useAuth()
    const handleGetOrders = async () => {
        setLoading(true)
        setState([])
        await firestore().collection('ordersList').where('userUID', '==', user.uid).get()
            .then(querySnapshot => {
                querySnapshot.forEach(querySnap => {
                    setState(s => [...s, querySnap.data()])
                })
            }).catch(err => {
                console.log('Something went wrong!', err)
            }).finally(() => {
                setLoading(false)
            })
    }
    useEffect(() => {
        handleGetOrders()
    }, [])
    return (
        <View style={[styles.mainContainer, { paddingHorizontal: state.length === 0 ? 0 : spacing.m }]}>
            {
                ////////LOADING
                loading ? <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator color={colors.black} size="large" />
                </View>
                    :  ////////NO HISTORY
                    state.length === 0 ? <View style={styles.emptyHistoryContainer}>
                        <Image source={require('../../../assets/emptyHistory.gif')} style={styles.image} />
                    </View>
                        :
                        /////////HISTORY FOUND
                        <>
                            <View style={styles.row}>
                                <Text style={styles.heading}>Order ID</Text>
                                <Text style={[styles.heading, { paddingLeft: spacing.m }]}>Customer Name</Text>
                                <Text style={[styles.heading, { paddingLeft: spacing.xl }]}>Status</Text>
                                <Divider />
                            </View>
                            <List.Section style={{ gap: spacing.s }}>
                                {/* /////////////////PENDING ORDERS */}
                                {state.map((order, index) => {
                                    if (order.status === 'Pending') return renderAccordionList(order, index, 'orange')
                                    return
                                })}
                                {/* /////////////////COMPLETED ORDERS */}
                                {state.map((order, index) => {
                                    if (order.status === 'Completed') return renderAccordionList(order, index, 'green')
                                    return
                                })}
                                {/* /////////////////CANCELLED ORDERS */}
                                {state.map((order, index) => {
                                    if (order.status === 'Cancelled') return renderAccordionList(order, index, 'red')
                                    return
                                })}
                            </List.Section>
                        </>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        height: sizes.height,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: spacing.s,
    },
    heading: {
        fontSize: sizes.h3,
        fontWeight: '700',
        color: colors.black
    },
    subHeading: {
        fontSize: sizes.h3,
        color: colors.black
    },
    accordion: {
        backgroundColor: colors.white,
        color: colors.black,
        paddingVertical: spacing.m,
        borderBottomColor: colors.black,
        borderBottomWidth: 1,
        elevation: 4
    },
    emptyHistoryContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white
    },
    image: {
        resizeMode: 'contain',
        height: 200,
    },
    listHeading: {
        borderRightWidth: 1,
        borderLeftWidth: 1,
    }
})