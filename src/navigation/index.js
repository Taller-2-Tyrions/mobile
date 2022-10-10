import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import FormScreen from '../screens/FormScreen';
import SignInScreen from '../screens/SignInScreen';
import useAuth from '../hooks/useAuth';

const Stack = createNativeStackNavigator();

const Navigator = () => {
    const { accessToken, isRegistered } = useAuth();
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
        {
          accessToken && isRegistered ? (
            <>
              <Stack.Screen name="Home" component={HomeScreen} />
            </>
          )
          : accessToken && !isRegistered ? (
            <Stack.Screen name='Form' component={FormScreen} />
          ) :
          (
            <Stack.Screen name="SignIn" component={SignInScreen} />
          )
        }
        </Stack.Navigator>
    );
}

export default Navigator;