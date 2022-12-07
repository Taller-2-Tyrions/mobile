import React from "react";
import useAuthProfile from "../../hooks/useAuthProfile";
import useBalance from "../../hooks/useBalance";
import useAuth from "../../hooks/useAuth";
import DriverHomeScreen from ".";
import DriverForm from "../Forms/DriverForm";
import Loading from "../../components/Loading";

const InitDriverScreen = () => {
  const { user } = useAuth();
  const { getDriverBalance } = useBalance();
  const { profile, driverFormCompleted, getDriverProfile, carData } =
    useAuthProfile();

  if (profile?.isDriver && profile?.name) {
    if (!carData) {
      getDriverProfile(user.accessToken);
      if (carData) {
        getDriverBalance(user.accessToken);
        return <DriverHomeScreen />;
      }
    } else {
      getDriverBalance(user.accessToken);
      return <DriverHomeScreen />;
    }
  } else if (!driverFormCompleted) {
    return <DriverForm />;
  }
  return <Loading textLoading="Cargando perfil de conductor" />;
};

export default InitDriverScreen;
