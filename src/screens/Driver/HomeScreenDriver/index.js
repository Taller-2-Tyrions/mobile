import React from 'react';
import { Button, Text, View } from 'react-native';
import useAuth from '../../../hooks/useAuth';

const HomeScreenDriver = () => {
  const {logout} = useAuth();
  return (
    <View>
      <Text style={{fontSize: 24, alignSelf: 'center'}}>HomeScreenDriver driver!</Text>
      <Button title={'Logout'} onPress={logout} />
    </View>
  );
};

export default HomeScreenDriver;