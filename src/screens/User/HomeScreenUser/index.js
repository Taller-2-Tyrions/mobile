import React from 'react';
import { Button, Text, View } from 'react-native';
import useAuth from '../../../hooks/useAuth';

const HomeScreenUser = () => {
  const {logout} = useAuth();
  return (
    <View>
      <Text style={{fontSize: 24, alignSelf: 'center'}}>HomeScreenUser user!</Text>
      <Button title={'Logout'} onPress={logout} />
    </View>
  );
};

export default HomeScreenUser;