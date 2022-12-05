import { Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../../hooks/useAuth";
import HomeScreen from "../HomeScreen";
import PassengerForm from "../Forms/PassengerForm";

const InitScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();

  if (!user?.formComplete) {
    // pasajero llena su perfil
    //navigation.navigate("PassengerForm");
    return <PassengerForm />;
  } else {
    // si completó el perfil y puedo obtenerlo
    // entonces voy al home, si no lo puedo obtener,
    // entonces puedo probar logueando yo, y cualquier error tiro
    // mensaje de logout.
    //navigation.navigate("HomeScreen");
    return <HomeScreen />;
  }
};

export default InitScreen;
