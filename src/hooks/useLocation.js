import React, {
  useState,
  useMemo,
  createContext,
  useContext,
  useEffect,
} from "react";
import axios from "axios";
import * as Location from "expo-location";

const LocationContext = createContext({});

export function LocationProvider({ children }) {
  const [drivers, setDrivers] = useState(null);
  const [driverPosition, setDriverPosition] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);

  const getInitialPosition = async () => {
    if (driverPosition) {
      return driverPosition;
    } else {
      const location = await Location.getCurrentPositionAsync({});
      setDriverPosition({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      return driverPosition;
    }
  };

  useEffect(() => {
    getInitialPosition();
  }, []);

  useEffect(() => {
    console.log("Posición seteada: ", driverPosition);
  }, [driverPosition]);

  const setLocations = (originAux, destinationAux) => {
    setOrigin(originAux);
    setDestination(destinationAux);
  };

  const passengerSearch = async (accessToken) => {
    if (!origin || !destination) {
      console.log("algún null", origin, destination);
      return;
    }
    const url = "https://fiuber-gateway.herokuapp.com/voyage/passenger/search";
    console.log("Origin en passengerSearch: ", origin);
    console.log("Destination en passengerSearch: ", destination);

    axios
      .post(
        url,
        {
          init: {
            longitude: origin.long,
            latitude: origin.lat,
          },
          end: {
            longitude: destination.long,
            latitude: destination.lat,
          },
          is_vip: false,
        },
        {
          headers: {
            token: accessToken,
          },
        }
      )
      .then((res) => {
        console.log("Drivers: ", res.data);
        setDrivers(Object.values(res.data));
      })
      .catch((err) => {
        console.log("Error in passengerSearch: ", err);
      });
  };

  const setDriverOnline = async (accessToken) => {
    const url = "https://fiuber-gateway.herokuapp.com/voyage/driver/searching";
    axios
      .post(
        url,
        {
          longitude: driverPosition.longitude,
          latitude: driverPosition.latitude,
        },
        {
          headers: {
            token: accessToken,
          },
        }
      )
      .then((res) => {
        console.log("Driver searching: ", res.data);
      })
      .catch((err) => {
        console.log("Error setDriverOnline: ", err);
      });
  };

  const setDriverOffline = async (accessToken) => {
    const url = "https://fiuber-gateway.herokuapp.com/voyage/driver/offline";

    axios
      .post(
        url,
        {},
        {
          headers: {
            token: accessToken,
          },
        }
      )
      .then((res) => {
        console.log("éxito");
      })
      .catch((err) => {
        console.log("Error setDriverOffline: ", err);
      });
  };

  const changeDriverLocation = async (accessToken, position) => {
    const url = "https://fiuber-gateway.herokuapp.com/voyage/driver/location";
    axios
      .post(
        url,
        {
          longitude: position.longitude,
          latitude: position.latitude,
        },
        {
          headers: {
            token: accessToken,
          },
        }
      )
      .then((res) => {
        setDriverPosition({
          latitude: position.latitude,
          longitude: position.longitude,
        });
      })
      .catch((err) => {
        console.log("Error changeDriverLocation: ", err);
      });
  };

  const passengerPickDriver = async (
    accessToken,
    idDriver,
    origin,
    destination
  ) => {
    const url = `https://fiuber-gateway.herokuapp.com/voyage/passenger/search/${idDriver}`;

    console.log("idDriver picks driver: ", idDriver);
    axios
      .post(
        url,
        {
          init: {
            longitude: origin.long,
            latitude: origin.lat,
          },
          end: {
            longitude: destination.long,
            latitude: destination.lat,
          },
          is_vip: false,
        },
        {
          headers: {
            token: accessToken,
          },
        }
      )
      .then((res) => {
        console.log("Driver response: ", res.data);
      })
      .catch((err) => {
        console.log("Error in passengerPickDriver: ", err);
      });
  };

  const memoedValue = useMemo(
    () => ({
      passengerSearch,
      drivers,
      setDriverOnline,
      setDriverOffline,
      changeDriverLocation,
      passengerPickDriver,
      getInitialPosition,
      origin,
      destination,
      setLocations,
    }),
    [
      passengerSearch,
      drivers,
      setDriverOnline,
      setDriverOffline,
      changeDriverLocation,
      passengerPickDriver,
      getInitialPosition,
      origin,
      destination,
      setLocations,
    ]
  );

  return (
    <LocationContext.Provider value={memoedValue}>
      {children}
    </LocationContext.Provider>
  );
}

export default function useLocation() {
  return useContext(LocationContext);
}
