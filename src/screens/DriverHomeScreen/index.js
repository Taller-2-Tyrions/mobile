import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import useLocation from "../../hooks/useLocation";
import useAuthProfile from "../../hooks/useAuthProfile";
import usePushNotification from "../../hooks/usePushNotification";
import useAuth from "../../hooks/useAuth";
import styles from "./styles";
import NewOrderPopup from "../../components/NewOrderPopUp";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import FormDriverPopUp from "../../components/FormDriverPopUp";
import DriverPickingScreen from "../DriverPickingScreen";

const DriverHomeScreen = () => {
  // debería poner el usuario online siempre que entra acá!!!
  const { setDriverOnline } = useLocation();
  const { notification, setNotification } = usePushNotification();
  const { profile } = useAuthProfile();
  const [order, setOrder] = useState(null);
  const { user } = useAuth();
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let location = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  useEffect(() => {
    if (profile.isDriver) setDriverOnline(user.accessToken);
  }, []);

  const onDecline = (newOrder) => {
    // debería pegarle al gateway para decir que no
    setNotification(null);
  };

  const onAccept = (newOrder) => {
    // debería pegarle al gateway para aceptar el viaje
    setOrder(newOrder);
  };

  useEffect(() => {
    if (notification) {
      console.log("Notificación recibida: ", notification.request.content.data);
    }
  }, [notification]);

  if (order) {
    return (
      <DriverPickingScreen order={order} location={location} user={user} />
    );
  } else {
    return (
      <>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Últimos viajes</Text>
          </View>
        </View>

        {!profile.isDriver && <FormDriverPopUp />}
        {profile.isDriver && notification && (
          <NewOrderPopup
            newOrder={notification.request.content.data}
            onDecline={onDecline}
            onAccept={onAccept}
            duration={2}
            distance={0.5}
          />
        )}
      </>
    );
  }
};

export default DriverHomeScreen;
