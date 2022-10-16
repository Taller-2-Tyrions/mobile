import React, { useEffect } from 'react';
import { View, Dimensions } from 'react-native'
import useAuth from '../../hooks/useAuth';
import useAuthProfile from '../../hooks/useAuthProfile';
import FormPopUp from '../../components/FormPopUp';
import HomeMap from '../../components/HomeMap';
import HomeSearch from '../../components/HomeSearch';

const HomeScreen = () => {
  const { user } = useAuth();
  const { profile, getProfile } = useAuthProfile();
  console.log(user);

  useEffect(() => {
    if (user.formComplete) {
      getProfile(user);
    }
  }, [user]);

  useEffect(() => {
    if (profile.id) {
      console.log('Perfil del usuario seteado: ', profile);
    }
  }, [profile]);

  return (
    <>
      <View>
          <View style={{height: Dimensions.get('window').height-400}}>
              <HomeMap />
          </View>
          <HomeSearch nameDefaultAddress={"Default address"} />
        </View>
      {
        !user.formComplete && <FormPopUp />
      }
    
    </>
  )
}

export default HomeScreen;