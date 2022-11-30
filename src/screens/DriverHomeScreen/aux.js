import React, { useState, useEffect } from "react";
import { Text, View, Pressable, Image } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
import useAuthProfile from "../../hooks/useAuthProfile";
import FormDriverPopUp from "../../components/FormDriverPopUp";
import useLocation from "../../hooks/useLocation";
import useAuth from "../../hooks/useAuth";
import usePushNotification from "../../hooks/usePushNotification";
import NewOrderPopup from "../../components/NewOrderPopUp";
import { MapViewDirections } from "react-native-maps-directions";
import { mapDarkStyle } from "../../components/MapStyles";
import { FontAwesome } from "@expo/vector-icons";

const GOOGLE_MAPS_APIKEY = "AIzaSyCeWGHDDYw0J5rRmoQSwJGlmfO6tlmiutc";

const DriverHomeScreen = () => {
  const { profile } = useAuthProfile();
  const { user } = useAuth();
  const { setDriverOnline, setDriverOffline, changeDriverLocation } =
    useLocation();
  const [isOnline, setIsOnline] = useState(false);
  const { notification, setNotification } = usePushNotification();
  const [order, setOrder] = useState(null);
  const initialPosition = {
    latitude: -34.7425261,
    longitude: -58.3869874,
  };
  const [driverPosition, setDriverPosition] = useState(initialPosition);

  const onGoPress = async () => {
    if (isOnline) {
      await setDriverOffline(user.accessToken);
    } else {
      await setDriverOnline(user.accessToken);
    }

    setIsOnline(!isOnline);
  };

  const onDecline = () => {
    //setNewOrder(null);
  };

  const onAccept = (newOrder) => {
    setOrder(newOrder);
    //setNewOrder(null);
  };

  const onUserLocationChange = async (event) => {
    if (event && event.nativeEvent && event.nativeEvent.coordinate) {
      event.persist();
      const location = event.nativeEvent.coordinate;
      await changeDriverLocation(user.accessToken, location);

      setDriverPosition(location);
    }
  };

  useEffect(() => {
    if (notification) {
      console.log("Notificación recibida: ", notification.request.content.data);
    }
  }, [notification]);

  const onDirectionFound = (event) => {
    if (order) {
      setOrder({
        ...order,
        distance: event.distance,
        duration: event.duration,
        pickedUp: order.pickedUp || event.distance < 0.2,
        isFinished: order.pickedUp && event.distance < 0.2,
      });
    }
  };

  const renderBottomTitle = () => {
    if (order && order.isFinished) {
      return (
        <View style={{ alignItems: "center" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#cb1a1a",
              width: 300,
              height: 55,
              padding: 10,
              borderRadius: 15,
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              COMPLETE DRIVE
            </Text>
          </View>
        </View>
      );
    }

    if (order && order.pickedUp) {
      return (
        <View style={{ alignItems: "center" }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text>{order.duration ? order.duration.toFixed(1) : "?"} min</Text>
            <View
              style={{
                backgroundColor: "#d41212",
                marginHorizontal: 10,
                width: 30,
                height: 30,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 20,
              }}
            >
              <FontAwesome name="user" size={20} color={"white"} />
            </View>
            <Text>{order.distance ? order.distance.toFixed(1) : "?"} km</Text>
          </View>
          <Text style={styles.bottomText}>
            Dropping off {order.passenger_id}
          </Text>
        </View>
      );
    }

    if (order) {
      return (
        <View style={{ alignItems: "center" }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text>{order.duration ? order.duration.toFixed(1) : "?"} min</Text>
            <View
              style={{
                backgroundColor: "#1e9203",
                marginHorizontal: 10,
                width: 30,
                height: 30,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 20,
              }}
            >
              <FontAwesome name="user" size={20} color={"white"} />
            </View>
            <Text>{order.distance ? order.distance.toFixed(1) : "?"} km</Text>
          </View>
          <Text style={styles.bottomText}>Picking up {order.passenger_id}</Text>
        </View>
      );
    }

    if (isOnline) {
      return <Text style={styles.bottomText}>You're online</Text>;
    } else {
      return <Text style={styles.bottomText}>You're offline</Text>;
    }
  };

  const getDestination = () => {
    if (order && order.pickedUp) {
      return {
        latitude: order.end.latitude,
        longitude: order.end.longitude,
      };
    }

    return {
      latitude: order.init.latitude,
      longitude: order.end.longitude,
    };
  };

  return (
    <>
      <SafeAreaView>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          showsUserLocation={true}
          customMapStyle={mapDarkStyle}
          onUserLocationChange={onUserLocationChange}
          initialRegion={{
            latitude: initialPosition.latitude,
            longitude: initialPosition.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: driverPosition.latitude,
              longitude: driverPosition.longitude,
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
          {order && (
            <MapViewDirections
              origin={driverPosition}
              onReady={onDirectionFound}
              destination={getDestination()}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={5}
              strokeColor="black"
            />
          )}
        </MapView>

        {!order && (
          <Pressable onPress={onGoPress} style={styles.goButton}>
            <Text style={styles.goText}>{isOnline ? "END" : "GO"}</Text>
          </Pressable>
        )}

        <View style={styles.bottomContainer}>
          <Ionicons name="options" size={30} color="#4a4a4a" />
          {renderBottomTitle()}
          <AntDesign name="bars" size={30} color="#4a4a4a" />
        </View>
      </SafeAreaView>
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
};

export default DriverHomeScreen;
