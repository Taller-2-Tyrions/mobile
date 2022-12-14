import { Dimensions, View, Text, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { mapDarkStyle } from "../../components/MapStyles";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import styles from "./styles";
import { DriverMarker } from "./markers";
import VoyageStartedScreen from "./VoyageStartedScreen";
import useDriver from "../../hooks/useDriver";

const GOOGLE_MAPS_APIKEY = "AIzaSyCeWGHDDYw0J5rRmoQSwJGlmfO6tlmiutc";

const DriverVoyage = () => {
  const { voyage, setVoyage, driverPosition } = useDriver();
  const clientLocation = voyage.init;
  const destination = voyage.end;
  const [initVoyage, setInitVoyage] = useState(false);

  useEffect(() => {
    console.log("ORDEN: ", voyage);
  }, []);

  const startVoyage = () => {
    // me tiene que redirigir a la
    // pantalla VoyageStartedScreen
    // y comenzar el viaje desde el gateway.
    setInitVoyage(true);
  };

  const onDirectionFound = (event) => {
    setVoyage({
      ...voyage,
      distance: event.distance,
      duration: event.duration,
      pickedUp: voyage.pickedUp || event.distance < 0.2,
      isFinished: voyage.pickedUp && event.distance < 0.2,
    });
  };

  useEffect(() => {
    if (voyage && voyage?.pickedUp) {
      console.warn("llegando");
      // acá debería avisarle al gateway para
      // que avise a cliente que estoy
      // en la puerta
    }
  }, [voyage]);

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
        {voyage?.pickedUp ? (
          <TouchableOpacity
            style={{ ...styles.button, backgroundColor: "#1495ff" }}
            onPress={startVoyage}
          >
            <Text style={styles.textButton}>Empezar viaje</Text>
          </TouchableOpacity>
        ) : (
          <View>
            <View style={styles.distanceContainer}>
              <Text style={styles.distanceText}>{voyage?.distance} km</Text>
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

export default DriverVoyage;
