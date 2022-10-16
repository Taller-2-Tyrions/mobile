import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
import useAuth from '../hooks/useAuth';

const Stack = createNativeStackNavigator();

const Navigator = () => {
    const { user } = useAuth();
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            {
                !user.accessToken ? (
                    <>
                        <Stack.Screen name="SignIn" component={SignInScreen} />
                        <Stack.Screen name="SignUp" component={SignUpScreen} />
                    </>
                ) : (
                    <Stack.Screen name="Home" component={HomeScreen} />

                )
            }
        </Stack.Navigator>
    );
}

export default Navigator;