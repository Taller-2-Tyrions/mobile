import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import useLocation from "../../hooks/useLocation";
import useAuthProfile from "../../hooks/useAuthProfile";
import usePushNotification from "../../hooks/usePushNotification";
import styles from "./styles";
import NewOrderPopup from "../../components/NewOrderPopUp";

const DriverHomeScreen = () => {
  const { setDriverOnline } = useLocation();
  const { notification, setNotification } = usePushNotification();
  const { profile } = useAuthProfile();
  const [order, setOrder] = useState(null);
  // booleano aux, debería ser una redirección
  const [navigateAux, setNavigateAux] = useState(false);

  const onDecline = (newOrder) => {
    // debería pegarle al gateway para decir que no
    setNotification(null);
  };

  const onAccept = (newOrder) => {
    // debería pegarle al gateway para aceptar el viaje
    setOrder(newOrder);
    setNotification(null); // limpio la notif por si llega otra.
    setNavigateAux(true);
  };

  useEffect(() => {
    if (notification) {
      console.log("Notificación recibida: ", notification.request.content.data);
    }
  }, [notification]);

  if (navigateAux) {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Ventana de nuevo viaje</Text>
        </View>
      </View>
    );
  } else {
    return (
      <>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Últimos viajes</Text>
          </View>
        </View>

        {/* {!profile.isDriver && <FormDriverPopUp />} */}
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
