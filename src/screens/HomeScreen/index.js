import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import FormPopUp from '../../components/FormPopUp';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
  const { user } = useAuth();
  console.log(user);
  return (
    <>
      <View style={styles.container}>
        <Text>HOME</Text>
      </View>
      {
        !user.formComplete && <FormPopUp />
      }
    
    </>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',    
      }
})