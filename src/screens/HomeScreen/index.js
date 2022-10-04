import React from 'react';
import { View, Text } from 'react-native';
import useAuth from '../../hooks/useAuth';

const HomeScreen = () => {
  const { user } = useAuth();

  return (
    <View>
      <Text>I am the home screen</Text>
      <Text>{user.email}</Text>
        
    </View>
  );
};

export default HomeScreen;