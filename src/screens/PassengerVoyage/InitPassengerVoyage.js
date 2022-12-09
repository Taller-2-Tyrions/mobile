import { View, Text } from "react-native";
import React, { useEffect } from "react";
import useVoyage from "../../hooks/useVoyage";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/Loading";
import PassengerVoyage from ".";

const InitPassengerVoyage = () => {
  const { user } = useAuth();
  const { status, getStatusVoyage } = useVoyage();

  useEffect(() => {
    //startTrackingVoyage(user.accessToken);
    getStatusVoyage(user.accessToken);
  }, []);

  if (!status) {
    return <Loading textLoading="Cargando información" />;
  }

  const { Rol, Status } = status;

  // debería ver que el rol es Passenger, sino error.
  if (Status === "WAITING_CONFIRMATION") {
    const { Voyage } = status;
    return <WaitingDriver voyageId={Voyage} />;
  } else if (Status === "WAITING_DRIVER") {
    const { Voyage } = status;
    return <PassengerVoyage voyageId={Voyage} />;
  }
};

const WaitingDriver = ({ voyageId }) => {
  console.log("Esperando voyageId: ", voyageId);
  return <Loading textLoading="Esperando respuesta de conductor" />;
};

export default InitPassengerVoyage;
