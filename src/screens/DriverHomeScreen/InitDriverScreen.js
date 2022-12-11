import React, { useEffect } from "react";
import { View, Text } from "react-native";
import useBalance from "../../hooks/useBalance";
import useAuth from "../../hooks/useAuth";
import useAuthProfile from "../../hooks/useAuthProfile";
import useLocation from "../../hooks/useLocation";
import DriverForm from "../Forms/DriverForm";
import Loading from "../../components/Loading";
import useDriver from "../../hooks/useDriver";
import { useNavigation } from "@react-navigation/native";
import tw from "tailwind-react-native-classnames";

const InitDriverScreen = () => {
  const { user } = useAuth();
  //const { getDriverBalance } = useBalance();
  const { profile, driverFormCompleted, getDriverProfile, carData } =
    useAuthProfile();
  const { setDriverOnline, isOnline } = useLocation();

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
  const navigation = useNavigation();
  const { status, getStatusDriver } = useDriver();

  useEffect(() => {
    if (status?.Status !== "WAITING") {
      const timer = setInterval(() => getStatusDriver(), 2000);
      return () => clearInterval(timer);
    } else {
      console.log("Llegó un request");
    }
  }, [status]);

  useEffect(() => {
    if (!status) return;

    if (status?.Rol === "Driver" && status?.Status === "SEARCHING") {
      navigation.navigate("DriverHome");
    } else if (status?.Rol === "Driver" && status?.Status === "WAITING") {
      navigation.navigate("DriverRequest");
    }
  }, [status]);

  return (
    <View style={tw`h-full w-full bg-white`}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <Text style={{ fontSize: 30 }}>Cargando...</Text>
      </View>
    </View>
  );
};

export default InitDriverScreen;
