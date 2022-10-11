import React, {useEffect} from 'react';
import { View, Text, Button } from 'react-native';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

axios.defaults.withCredentials = true;

const HomeScreen = () => {
  const { infoHome, logout } = useAuth();
  const navigation = useNavigation();

  return (
    <View>
        <Text style={{fontSize: 24, alignSelf: 'center'}}>Cargando contenidos</Text>
        <Button title={'Logout'} onPress={logout} />
        
    </View>
  );
};

export default HomeScreen;