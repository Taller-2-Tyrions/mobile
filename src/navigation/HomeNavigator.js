import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
import useAuth from '../hooks/useAuth';
import SearchScreen from '../screens/SearchScreen';
import SearchResultsScreen from '../screens/SearchResultsScreen';

const Stack = createNativeStackNavigator();

const HomeNavigator = () => {
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
                    <>
                        <Stack.Screen name="HomeScreen" component={HomeScreen} />
                        <Stack.Screen name="SearchScreen" component={SearchScreen} />
                        <Stack.Screen name="SearchResultsScreen" component={SearchResultsScreen} />
                    </>
                )
            }
        </Stack.Navigator>
    );
}

export default HomeNavigator;