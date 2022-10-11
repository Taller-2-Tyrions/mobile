import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import HomeScreenUser from '../screens/User/HomeScreenUser';
import HomeScreenDriver from '../screens/Driver/HomeScreenDriver';
import FormScreen from '../screens/FormScreen';
import SignInScreen from '../screens/SignInScreen';
import useAuth from '../hooks/useAuth';
import SignUpScreen from '../screens/SignUpScreen';

const Stack = createNativeStackNavigator();

const Navigator = () => {
    const { accessToken, isRegistered, infoHome, isUser } = useAuth();
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
        {
          accessToken && isRegistered && infoHome ? (
            isUser ? (
              <>
                <Stack.Screen name="HomeUser" component={HomeScreenUser} />
              </>
            ) : (
              <>
                <Stack.Screen name="HomeDriver" component={HomeScreenDriver} />
              </>
            )
            
          )
          : accessToken && !isRegistered ? (
            <Stack.Screen name='Form' component={FormScreen} />
          ) :
          (
            <>
              <Stack.Screen name="SignIn" component={SignInScreen} />
              <Stack.Screen name="SignUp" component={SignUpScreen} />
            </>
          )
        }
        </Stack.Navigator>
    );
}

export default Navigator;