import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import Logo from '../../../assets/images/logo.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import GoogleButton from '../../components/GoogleButton';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';

const SignInScreen = () => {
  const { user, signIn, logout } = useAuth();
  const { height } = useWindowDimensions();
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
  } = useForm();

  // reset del usuario para que no hayan bugs
  useEffect(() => {
    console.log('logout user');
    logout();
    navigation.navigate('SignIn');
  }, []);

  const goToSignUp = () => {
    navigation.navigate('SignUp');
  }

  const onSignInPressed = async (data) => {
    await signIn(data);

    /*if (user.accessToken && user.id) {
      navigation.navigate('Home');
    }*/
  }

  const signInGoogle = () => {
    //signInWithGoogle();
  }

  return (
    <ScrollView showVerticalScrollIndicator={false}>
      <View style={styles.root}>
          <Image 
              source={Logo}
              style={[styles.logo, {height: height*0.3}]} 
              resizeMode="contain"
          />

          <CustomInput 
              name="email"
              placeholder="Email"
              control={control}
              rules={{required: 'Email is required'}}
          />
          <CustomInput 
              name="password"
              placeholder="Password"
              control={control}
              rules={{
                  required: 'Password is required', 
                  minLength: {value: 4, message: 'Password should be minimum 4 characters long'}
              }}
              secureTextEntry
          />

          <CustomButton 
              text="Sign in"
              onPress={handleSubmit(onSignInPressed)}
          />

          <GoogleButton onPress={signInGoogle} />

          <CustomButton 
              text="Don't have an account? Create one"
              type="TERTIARY"
              onPress={goToSignUp}
          />          
      </View>
    </ScrollView>
);
};

const styles = StyleSheet.create({
  root: {
      alignItems: 'center',
      padding: 20,
  },
  logo: {
      width: '70%',
      maxWidth: 300,
      maxHeight: 200,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});


export default SignInScreen;