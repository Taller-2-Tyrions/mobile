import React, { useEffect } from "react";
import useBalance from "../../hooks/useBalance";
import useAuth from "../../hooks/useAuth";
import useAuthProfile from "../../hooks/useAuthProfile";
import useLocation from "../../hooks/useLocation";
import DriverHomeScreen from ".";
import DriverForm from "../Forms/DriverForm";
import Loading from "../../components/Loading";
import useVoyage from "../../hooks/useVoyage";
import useDriver from "../../hooks/useDriver";

const InitDriverScreen = () => {
  const { user } = useAuth();
  //const { getDriverBalance } = useBalance();
  const { profile, driverFormCompleted, getDriverProfile, carData } =
    useAuthProfile();
  const { setDriverOnline, isOnline } = useLocation();
  const { startTrackingVoyage } = useVoyage();
  const { startTrackingDriverPosition } = useDriver();

  useEffect(() => {
    startTrackingVoyage(user.accessToken);
    startTrackingDriverPosition();
  }, []);

  useEffect(() => {
    if (carData && !isOnline) {
      setDriverOnline(user.accessToken);
    }
  }, [carData]);

  // el profile del pasajero ya está cargado a este punto
  if (profile.isDriver) {
    getDriverProfile(user.accessToken);
    if (carData && isOnline) {
      return <Redirect />;
    }
  } else if (!driverFormCompleted) {
    return <DriverForm />;
  }
  return <Loading textLoading="Cargando perfil de conductor" />;
};

const Redirect = () => {
  const { status } = useVoyage();
  const { voyage, setVoyage } = useDriver();

  useEffect(() => {
    if (status.Status === "WAITING") {
      setVoyage({ ...voyage, voyage_id: status.Voyage });
    }
  }, [status]);

  // esto no debería pasar porque ya puse al conductor en línea.
  if (status?.Rol !== "Driver") {
    // en realidad debería volver a la pantalla de pasajero.
    return <Loading textLoading="Cargando perfil de conductor" />;
  }
  return <DriverHomeScreen />;
};

export default InitDriverScreen;
