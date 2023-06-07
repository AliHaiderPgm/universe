import messaging from '@react-native-firebase/messaging';

export async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();

    if (authStatus === messaging.AuthorizationStatus.AUTHORIZED) {
        console.log('Notification permission granted');
    } else if (authStatus === messaging.AuthorizationStatus.PROVISIONAL) {
        console.log('Notification permission granted provisionally');
    } else {
        console.log('Notification permission denied');
    }
}

export default messaging;
