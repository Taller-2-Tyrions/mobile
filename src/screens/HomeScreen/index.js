import React, {useEffect} from 'react';
import { View, Text, Button } from 'react-native';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';

axios.defaults.withCredentials = true;

const HomeScreen = () => {
  const { infoHome, logout } = useAuth();

  return (
    <View>
      <Text>I am the home screen</Text>
      <Text>I am the home screen</Text>
      <Text>I am the home screen</Text>
      <Text>I am the home screen</Text>
      <Button title={'Logout'} onPress={logout} />
        
    </View>
  );
};

export default HomeScreen;