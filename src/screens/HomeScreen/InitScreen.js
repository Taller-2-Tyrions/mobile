import React from "react";
import useAuth from "../../hooks/useAuth";
import useAuthProfile from "../../hooks/useAuthProfile";
import useBalance from "../../hooks/useBalance";
import HomeScreen from "../HomeScreen";
import PassengerForm from "../Forms/PassengerForm";
import Loading from "../../components/Loading";

const InitScreen = () => {
  const { user } = useAuth();
  const { profile, getProfile } = useAuthProfile();
  const { getPassengerBalance } = useBalance();

  if (!user?.formComplete) {
    // pasajero llena su perfil
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
