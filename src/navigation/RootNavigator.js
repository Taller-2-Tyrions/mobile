import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeNavigator from './HomeNavigator';
import CustomDrawer from './CustomDrawer';
import { AuthProvider } from '../hooks/useAuth';
import { AuthProfileProvider } from '../hooks/useAuthProfile';

const Drawer = createDrawerNavigator();

const DummyScreen = (props) => (
  <View style={{flex:1, justifyContent:'center', alignItems: 'center'}}>
    <Text>{props.name}</Text>
  </View>
)

const RootNavigator = () => {
  return (
    <NavigationContainer>
        <AuthProvider>
                <AuthProfileProvider>
                    <Drawer.Navigator 
                    screenOptions={{headerShown: false}}
                    drawerContent={
                        (props) => (
                        <CustomDrawer  {...props} />
                        )}
                    >
                    <Drawer.Screen name="Home" component={HomeNavigator} />
                    
                    <Drawer.Screen name="Your Trips">
                        { () => <DummyScreen name={"Your Trips"} />}
                    </Drawer.Screen>

                    <Drawer.Screen name="Wallet">
                        { () => <DummyScreen name={"Wallet"} />}
                    </Drawer.Screen>

                    <Drawer.Screen name="Settings">
                        { () => <DummyScreen name={"Settings"} />}
                    </Drawer.Screen>

                    <Drawer.Screen name="DriverApp">
                        { () => <DummyScreen name={"Driver App"} />}
                    </Drawer.Screen>
                    </Drawer.Navigator>
                </AuthProfileProvider>
        </AuthProvider>
    </NavigationContainer>
  )
}

export default RootNavigator;