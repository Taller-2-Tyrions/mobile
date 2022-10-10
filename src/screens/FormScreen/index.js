import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import Logo from '../../../assets/images/logo.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';

const FormScreen = () => {
  const { completeForm, logout } = useAuth();
  const {height} = useWindowDimensions();
  const {
    control,
    handleSubmit,
  } = useForm();

  return (
    <ScrollView showVerticalScrollIndicator={false}>
    <View style={styles.root}>
        <Image 
            source={Logo}
            style={[styles.logo, {height: height*0.3}]} 
            resizeMode="contain"
        />

        <CustomInput 
            name="name"
            placeholder="Name"
            control={control}
            rules={{required: 'Name is required'}}
        />
        <CustomInput 
            name="lastname"
            placeholder="Lastname"
            control={control}
            rules={{required: 'Lastname is required'}}
        />
        <CustomInput 
            name="role"
            placeholder="User or Driver?"
            control={control}
            rules={{required: 'Role is required'}}
        />
        <CustomInput 
            name="address"
            placeholder="Address"
            control={control}
            rules={{required: 'Address is required'}}
        />

        <CustomButton 
            text="Complete sign in"
            onPress={handleSubmit(completeForm)}
        />
        <CustomButton 
            text="Logout"
            onPress={logout}
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
});


export default FormScreen;