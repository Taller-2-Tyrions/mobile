import { Dimensions, View, Text, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { mapDarkStyle } from "../../components/MapStyles";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import styles from "./styles";
import { DriverMarker } from "./markers";
import VoyageStartedScreen from "./VoyageStartedScreen";

const GOOGLE_MAPS_APIKEY = "AIzaSyCeWGHDDYw0J5rRmoQSwJGlmfO6tlmiutc";

const DriverPickingScreen = ({ order, setOrder, location, user }) => {
  // recibe los datos de la push notification y la
  // posición inicial del chófer
  const [driverPosition, setDriverPosition] = useState({
    latitude: location.latitude,
    longitude: location.longitude,
  });
  const clientLocation = order.init;
  const destination = order.end;
  const [initVoyage, setInitVoyage] = useState(false);

  useEffect(() => {
    setOrder({
      ...order,
      distance: null,
      duration: null,
      pickedUp: null,
      isFinished: null,
    });
  }, []);
  console.log("ORDEN: ", order);

  const startVoyage = () => {
    // me tiene que redirigir a la
    // pantalla VoyageStartedScreen
    // y comenzar el viaje desde el gateway.
    setInitVoyage(true);
  };

  const onDirectionFound = (event) => {
    setOrder({
      ...order,
      distance: event.distance,
      duration: event.duration,
      pickedUp: order.pickedUp || event.distance < 0.2,
      isFinished: order.pickedUp && event.distance < 0.2,
    });
  };

  useEffect(() => {
    if (order && order?.pickedUp) {
      console.warn("llegando");
      // acá debería avisarle al gateway para
      // que avise a cliente que estoy
      // en la puerta
    }
  }, [order]);

  /*const onUserLocationChange = async (event) => {
    if (event && event.nativeEvent && event.nativeEvent.coordinate) {
      event.persist();
      const location = event.nativeEvent.coordinate;
      // le pego al gateway cambiando la posición.
      //await changeDriverLocation(user.accessToken, location);

      setDriverPosition(location);
    }
  };*/

  if (initVoyage) {
    <VoyageStartedScreen
      clientLocation={clientLocation}
      destination={destination}
    />;
  } else {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          style={styles.map}
          initialRegion={{
            latitude: driverPosition.latitude,
            longitude: driverPosition.longitude,
            latitudeDelta: 0.0122,
            longitudeDelta: 0.0121,
          }}
          customMapStyle={mapDarkStyle}
        >
          <MapViewDirections
            origin={driverPosition}
            onReady={onDirectionFound}
            destination={clientLocation}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={5}
            strokeColor="white"
          />
          <MapViewDirections
            origin={clientLocation}
            destination={destination}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={5}
            strokeColor="#618C8C"
          />
          <DriverMarker position={driverPosition} />
          <Marker title={"Client location"} coordinate={clientLocation} />
          <Marker title={"Destino"} coordinate={destination} />
        </MapView>
        {order?.pickedUp ? (
          <TouchableOpacity
            style={{ ...styles.button, backgroundColor: "#1495ff" }}
            onPress={startVoyage}
          >
            <Text style={styles.textButton}>Empezar viaje</Text>
          </TouchableOpacity>
        ) : (
          <View>
            <View style={styles.distanceContainer}>
              <Text style={styles.distanceText}>{order?.distance} km</Text>
            </View>
            <TouchableOpacity
              style={{ ...styles.button, backgroundColor: "red" }}
            >
              <Text style={styles.textButton}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
};

export default DriverPickingScreen;
