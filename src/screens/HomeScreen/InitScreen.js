import { Text, View } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../../hooks/useAuth";
import useAuthProfile from "../../hooks/useAuthProfile";
import useBalance from "../../hooks/useBalance";
import HomeScreen from "../HomeScreen";
import PassengerForm from "../Forms/PassengerForm";
import Loading from "../../components/Loading";

const InitScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const { profile, getProfile } = useAuthProfile();
  const { getPassengerBalance } = useBalance();

  if (!user?.formComplete) {
    // pasajero llena su perfil
    //navigation.navigate("PassengerForm");
    return <PassengerForm />;
  } else {
    // si completó el perfil y puedo obtenerlo
    // entonces voy al home, si no lo puedo obtener,
    // entonces puedo probar logueando yo, y cualquier error tiro
    // mensaje de logout.
    if (profile?.id && profile?.name) {
      getPassengerBalance(user.accessToken);
      return <HomeScreen />;
    } else {
      getProfile(user.id, user.accessToken);
      if (profile?.id && profile?.name) {
        getPassengerBalance(user.accessToken);
        return <HomeScreen />;
      }
      return <Loading />;
    }
  }
};

export default InitScreen;
