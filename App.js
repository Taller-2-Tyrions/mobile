import React, { useEffect, useState } from 'react';
import RootNavigator from './src/navigation/RootNavigator';
import { StatusBar } from 'expo-status-bar';
import * as Notifications from 'expo-notifications';

export default function App() {
    const [expoToken, setExpoToken] = useState(null);

    const registerForPushNotificationsAsync = async () => {
        try {
          const { status: existingStatus } = await Notifications.getPermissionsAsync()
          let finalStatus = existingStatus
          if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync()
            finalStatus = status
          }
          if (finalStatus !== 'granted') {
            throw new Error('Permission not granted!')
          }
          const token = (await Notifications.getExpoPushTokenAsync()).data;
          //const token = (await Notifications.getDevicePushTokenAsync()).data;
          setExpoToken(token);

          if (Platform.OS === 'android') {
                Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
                });
            }
        } catch (error) {
          console.error(error);
        }
    }

    useEffect(() => {
        if (!expoToken) {
            registerForPushNotificationsAsync();
        }

        console.log('Expo token: ', expoToken);
    }, [expoToken]);

	return (
        <>
            <StatusBar style="dark-content" />
            <RootNavigator />
        </>                   
    );
};
