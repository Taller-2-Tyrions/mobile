import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import SignInScreen from '../screens/SignInScreen';
import useAuth from '../hooks/useAuth';

const Stack = createNativeStackNavigator();

const Navigator = () => {
    //const { user } = useAuth();
    const user = null;
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
        {
          user ? (
            <>
              <Stack.Screen name="Home" component={HomeScreen} />
            </>
          )
          : (
            <Stack.Screen name="SignIn" component={SignInScreen} />
          )
        }
        </Stack.Navigator>
    );
}

export default Navigator;