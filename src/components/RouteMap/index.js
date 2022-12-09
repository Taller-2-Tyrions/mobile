import React from "react";
import { Image } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import useLocation from "../../hooks/useLocation";
import styles from "./styles";
import { mapDarkStyle } from "../MapStyles";

const GOOGLE_MAPS_APIKEY = "AIzaSyCeWGHDDYw0J5rRmoQSwJGlmfO6tlmiutc";

const RouteMap = ({ origin, destination }) => {
  const { drivers } = useLocation();

  const originLocation = {
    latitude: origin.lat,
    longitude: origin.long,
  };

  const destinationLocation = {
    latitude: destination.lat,
    longitude: destination.long,
  };

  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      showsUserLocation={true}
      customMapStyle={mapDarkStyle}
      style={styles.map}
      initialRegion={{
        latitude: originLocation.latitude,
        longitude: originLocation.longitude,
        latitudeDelta: 0.0022,
        longitudeDelta: 0.0121,
      }}
    >
      <MapViewDirections
        origin={originLocation}
        destination={destinationLocation}
        apikey={GOOGLE_MAPS_APIKEY}
        strokeWidth={5}
        strokeColor="white"
      />
      {drivers &&
        drivers.map((driver) => (
          <Marker
            key={driver.id}
            coordinate={{
              latitude: driver.location.latitude,
              longitude: driver.location.longitude,
            }}
          >
            <Image
              style={{
                height: 70,
                width: 70,
              }}
              source={require("../../assets/images/top-UberX.png")}
              resizeMode="contain"
            />
          </Marker>
        ))}
      <Marker title={"Origin"} coordinate={originLocation} />
      <Marker title={"Destination"} coordinate={destinationLocation} />
    </MapView>
  );
};

export default RouteMap;
