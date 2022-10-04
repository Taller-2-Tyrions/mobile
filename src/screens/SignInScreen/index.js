import React from 'react';
import { Text, View, Button } from 'react-native';
import useAuth from '../../hooks/useAuth';

const SignInScreen = () => {
  const { signInWithGoogle, loading } = useAuth();
  
  return (
    <View>
      <Text>{loading ? "loading..." : "Login to the app"}</Text>
      <Button title='login' onPress={signInWithGoogle} />
    </View>
  )
}

export default SignInScreen;