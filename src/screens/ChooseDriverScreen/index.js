import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import useAuth from "../../hooks/useAuth";
import useLocation from "../../hooks/useLocation";
import Loading from "../../components/Loading";
import DriversOptions from "./DriversOptions";

const ChooseDriverScreen = () => {
  const route = useRoute();
  const { originPlace, destinationPlace } = route.params;
  const { user } = useAuth();
  const { passengerSearch, drivers, setLocations, origin, destination } =
    useLocation();
  const [searchDrivers, setSearchDrivers] = useState(true);

  var posOrigin;
  var posDestination;

  useEffect(() => {
    if (originPlace.details !== null) {
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

    if (destinationPlace.details !== null) {
      posDestination = {
        lat: destinationPlace.details.geometry.location.lat,
        long: destinationPlace.details.geometry.location.lng,
      };
    } else {
      destination = destinationPlace?.data?.geometry?.location;
      posDestination = {
        lat: destinationPlace.data.geometry.location.lat,
        long: destinationPlace.data.geometry.location.lng,
      };
    }
    console.log("posOrigin: ", posOrigin);
    console.log("posDestination: ", posDestination);

    setLocations(posOrigin, posDestination);
  }, []);

  useEffect(() => {
    if (origin && destination) {
      console.log("origin y destination seteado: ", origin, destination);

      const awaitSearching = async () => {
        await passengerSearch(user.accessToken);
      };

      const interval = setInterval(() => {
        if (searchDrivers) {
          awaitSearching();
        }
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [origin, destination]);

  if (drivers && drivers.length > 0) {
    return <DriversOptions setSearchDrivers={setSearchDrivers} />;
  } else {
    return <Loading typeLoading="chofer" textLoading="Cargando choferes" />;
  }
};

export default ChooseDriverScreen;
