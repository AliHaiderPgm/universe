import React from 'react';
import { View, StyleSheet, Dimensions, Text, ScrollView } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { GestureHandlerRootView, PinchGestureHandler } from 'react-native-gesture-handler';
import { colors, sizes, spacing } from '../../../components/constants/theme';
import { Divider } from 'react-native-paper';
const SizeGuide = () => {
    const shirtsSizeUri = 'https://firebasestorage.googleapis.com/v0/b/universe-190ba.appspot.com/o/shirtsSizeGuide.png?alt=media&token=2810a79b-c543-4c60-a7a1-e0e03063e642&_gl=1*1kajbub*_ga*Njg1ODIyMjMxLjE2ODUzMzgyNzk.*_ga_CW55HF8NVT*MTY4NTc3MjkzNy4xNS4xLjE2ODU3NzI5ODMuMC4wLjA.'; // Replace with your image URL
    const pantsSizeUri = "https://firebasestorage.googleapis.com/v0/b/universe-190ba.appspot.com/o/pantsSizeGuide.png?alt=media&token=cfb56f5c-5d5a-444f-8f92-a6c07e76e2b5&_gl=1*19aajlx*_ga*Njg1ODIyMjMxLjE2ODUzMzgyNzk.*_ga_CW55HF8NVT*MTY4NTc3MjkzNy4xNS4xLjE2ODU3NzMyODAuMC4wLjA."
    const onPinchGestureEvent = ({ nativeEvent }) => {
        // Handle pinch gestures here
    }


    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <PinchGestureHandler
                onGestureEvent={onPinchGestureEvent}
                onHandlerStateChange={onPinchGestureEvent}
            >
                <ScrollView>
                    <View style={styles.container}>
                        <Text style={styles.text}>Tops,Shirts,Jackets etc.</Text>
                        <Divider />
                        <ImageViewer
                            imageUrls={[{ url: shirtsSizeUri }]}
                            style={styles.image}
                            backgroundColor={colors.light}
                            renderIndicator={() => null}
                        />
                        <Divider />
                        <Text style={styles.text}>Pants</Text>
                        <Divider />
                        <ImageViewer
                            imageUrls={[{ url: pantsSizeUri }]}
                            style={styles.image}
                            backgroundColor='white'
                            renderIndicator={() => null}
                        />
                    </View>
                </ScrollView>
            </PinchGestureHandler>
        </GestureHandlerRootView>
    );
};

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        height,
        backgroundColor: colors.white,
    },
    image: {
        resizeMode: 'contain',
    },
    text: {
        color: colors.black,
        fontWeight: 500,
        fontSize: sizes.h2,
        paddingVertical: spacing.s + 2,
        paddingLeft: spacing.s,
    }
});

export default SizeGuide;
