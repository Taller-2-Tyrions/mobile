import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native'
import useAuth from '../../hooks/useAuth';
import useAuthProfile from '../../hooks/useAuthProfile';
import FormPopUp from '../../components/FormPopUp';

const HomeScreen = () => {
  const { user } = useAuth();
  const { profile, getProfile } = useAuthProfile();
  console.log(user);

  useEffect(() => {
    if (user.formComplete) {
      getProfile(user);

      console.log('Perfil del usuario seteado: ', profile);
    }
  }, [user]);

  useEffect(() => {
    if (profile.id) {
      console.log('Perfil del usuario seteado: ', profile);
    }
  }, [profile]);

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

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',    
      }
})