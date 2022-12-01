import { View, Text, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { mapDarkStyle } from "../../components/MapStyles";
import { DriverMarker } from "./markers";
import styles from "./styles";

const GOOGLE_MAPS_APIKEY = "AIzaSyCeWGHDDYw0J5rRmoQSwJGlmfO6tlmiutc";

const VoyageStartedScreen = ({ clientLocation, destination }) => {
  const [driverPosition, setDriverPosition] = useState({
    latitude: clientLocation.latitude,
    longitude: clientLocation.longitude,
  });
  const [order, setOrder] = useState();

  const onDirectionFound = (event) => {
    setOrder({
      ...order,
      distance: event.distance,
      duration: event.duration,
      pickedUp: order?.pickedUp || event.distance < 0.2,
      isFinished: order?.pickedUp && event.distance < 0.2,
    });
  };

  useEffect(() => {
    if (order && order?.pickedUp) {
      console.warn("llegando");
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
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={5}
          strokeColor="white"
        />
        <DriverMarker position={driverPosition} />
        <Marker title={"Destino"} coordinate={destination} />
      </MapView>
      {order?.pickedUp ? (
        <TouchableOpacity
          style={{ ...styles.button, backgroundColor: "#1495ff" }}
        >
          <Text style={styles.textButton}>Finalizar viaje</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.distanceContainer}>
          <Text style={styles.distanceText}>{order?.distance} km</Text>
        </View>
      )}
    </View>
  );
};

export default VoyageStartedScreen;
