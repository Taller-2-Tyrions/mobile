import React, { useEffect, useState } from "react";
import { View, Dimensions, ScrollView, Text } from "react-native";
import RouteMap from "../../components/RouteMap";
import { useRoute } from "@react-navigation/native";
import useAuth from "../../hooks/useAuth";
import useLocation from "../../hooks/useLocation";
import DriversInfo from "../../components/DriversInfo";
import styles from "./styles";
import SafeAreaView from "react-native-safe-area-view";
import Loading from "../../components/Loading";
import DriversOptions from "./DriversOptions";

const ChooseDriverScreen = () => {
  const route = useRoute();
  const { originPlace, destinationPlace } = route.params;
  const { user } = useAuth();
  const { passengerSearch, drivers } = useLocation();

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

  useEffect(() => {
    const awaitSearching = async () => {
      await passengerSearch(origin, destination, user.accessToken);
    };

    const interval = setInterval(() => {
      awaitSearching();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  if (drivers && drivers.length > 0) {
    return <DriversOptions />;
  } else {
    return <Loading typeLoading="chofer" textLoading="Cargando choferes" />;
  }
};

export default ChooseDriverScreen;
