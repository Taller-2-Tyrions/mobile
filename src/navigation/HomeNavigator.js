import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import HomeScreen from "../screens/HomeScreen";
import useAuth from "../hooks/useAuth";
import SearchScreen from "../screens/SearchScreen";
import SearchResultsScreen from "../screens/SearchResultsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import ChooseDriverScreen from "../screens/ChooseDriverScreen";
import WaitingDriverScreen from "../screens/WaitingDriverScreen";

const Stack = createNativeStackNavigator();

const HomeNavigator = () => {
  const { user } = useAuth();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user.accessToken ? (
        <>
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen
            name="EditProfileScreen"
            component={EditProfileScreen}
          />
          <Stack.Screen name="SearchScreen" component={SearchScreen} />
          <Stack.Screen
            name="SearchResultsScreen"
            component={SearchResultsScreen}
          />
          <Stack.Screen
            name="ChooseDriverScreen"
            component={ChooseDriverScreen}
          />
          <Stack.Screen
            name="WaitingDriverScreen"
            component={WaitingDriverScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default HomeNavigator;
