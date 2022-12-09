import { View, Text } from "react-native";
import React, { useEffect } from "react";
import Loading from "../../components/Loading";
import PickDriver from ".";
import useLocation from "../../hooks/useLocation";
import useAuth from "../../hooks/useAuth";

const InitPickDriver = () => {
  const { user } = useAuth();
  const { drivers, startSearchingDrivers } = useLocation();

  useEffect(() => {
    startSearchingDrivers(user.accessToken);
  }, []);

  if (drivers && drivers.length > 0) {
    return <PickDriver />;
  } else {
    return (
      <Loading
        typeLoading="chofer"
        textLoading="Buscando conductores cercanos"
      />
    );
  }
};

export default InitPickDriver;
