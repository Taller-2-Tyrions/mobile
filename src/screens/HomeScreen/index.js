import React from 'react';
import { View, Text, Button } from 'react-native';
import useAuth from '../../hooks/useAuth';

const HomeScreen = () => {
  const { accessToken, logout } = useAuth();

  return (
    <View>
      <Text>I am the home screen</Text>
      <Text>{accessToken}</Text>
      <Button title={'Logout'} onPress={logout} />
        
    </View>
  );
};

export default HomeScreen;