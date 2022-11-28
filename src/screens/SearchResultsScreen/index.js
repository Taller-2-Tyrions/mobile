import React, { useEffect, useState } from "react";
import { View, Dimensions, ScrollView, Text } from "react-native";
import RouteMap from "../../components/RouteMap";
import { useRoute } from "@react-navigation/native";
import useAuth from "../../hooks/useAuth";
import useLocation from "../../hooks/useLocation";
import DriversInfo from "../../components/DriversInfo";
import styles from "./styles";
import SafeAreaView from "react-native-safe-area-view";

const SearchResultsScreen = () => {
  const route = useRoute();
  const { originPlace, destinationPlace } = route.params;
  const { user } = useAuth();
  const { passengerSearch } = useLocation();

  console.log("Origin place: ", originPlace);
  console.log("Destination place: ", destinationPlace);

  var origin;
  var posOrigin;
  if (originPlace.details !== null) {
    origin = originPlace?.details?.geometry?.location;
    posOrigin = {
      lat: originPlace.details.geometry.location.lat,
      long: originPlace.details.geometry.location.lng,
    };
  } else {
    origin = originPlace?.data?.geometry?.location;
    posOrigin = {
      lat: originPlace.data.geometry.location.lat,
      long: originPlace.data.geometry.location.lng,
    };
  }

  var destination;
  var posDestination;
  if (destinationPlace.details !== null) {
    destination = destinationPlace?.details?.geometry?.location;
    posDestination = {
      lat: destinationPlace.details.geometry.location.lat,
      long: destinationPlace.details.geometry.location.lng,
    };
  } else {
    destination = destinationPlace?.data?.geometry?.location;
    posDestination = {
      lat: destination.data.geometry.location.lat,
      long: destination.data.geometry.location.lng,
    };
  }

  const [loadingDriver, setLoadingDriver] = useState(null);

  useEffect(() => {
    const awaitSearching = async () => {
      await passengerSearch(origin, destination, user.accessToken);
    };

    const interval = setInterval(() => {
      awaitSearching();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <ScrollView>
        <View style={{ display: "flex", justifyContent: "space-between" }}>
          <View style={{ height: Dimensions.get("window").height - 100 }}>
            <RouteMap origin={posOrigin} destination={posDestination} />
          </View>

          <View style={{ height: 400, backgroundColor: "white" }}>
            <DriversInfo
              setLoadingDriver={setLoadingDriver}
              origin={origin}
              destination={destination}
            />
          </View>
        </View>
      </ScrollView>

      {loadingDriver && (
        <View style={styles.root}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              Esperando respuesta de: {loadingDriver.name}{" "}
              {loadingDriver.last_name}
            </Text>
          </View>
        </View>
      )}
    </>
  );
};

export default SearchResultsScreen;
