import React from 'react'
import { StyleSheet } from 'react-native'
import { Center, Skeleton, VStack } from 'native-base';

export default function CardLoader({ width }) {
    return <Center w={`${width}%`} mt="2">
        <VStack w="90%" maxW="400" borderWidth="1" space={3} overflow="hidden" rounded="2xl" _dark={{
            borderColor: "coolGray.500"
        }} _light={{
            borderColor: "coolGray.200"
        }}>
            <Skeleton h="100" />
            <Skeleton.Text px="4" pb="5" />
        </VStack>
    </Center>;
}

const styles = StyleSheet.create({})