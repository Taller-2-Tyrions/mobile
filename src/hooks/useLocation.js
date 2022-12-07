import React, {
  useState,
  useMemo,
  createContext,
  useContext,
  useEffect,
} from "react";
import axios from "axios";
import * as Location from "expo-location";
import { URL } from "../configUrl";

const LocationContext = createContext({});

export function LocationProvider({ children }) {
  const [drivers, setDrivers] = useState(null);
  const [userPosition, setUserPosition] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [searchDrivers, setSearchDrivers] = useState(null);
  const [lastDriverSelected, setLastDriverSelected] = useState(null);

  const getInitialPosition = async () => {
    if (userPosition) {
      return userPosition;
    } else {
      const location = await Location.getCurrentPositionAsync({});
      setUserPosition({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      return userPosition;
    }
  };

  useEffect(() => {
    getInitialPosition();
  }, []);

  useEffect(() => {
    console.log("Posición seteada: ", userPosition);
  }, [userPosition]);

  useEffect(() => {
    // searchDrivers tiene el accessToken del usuario
    if (searchDrivers) {
      const timer = setInterval(() => passengerSearch(searchDrivers), 10000);
      return () => clearInterval(timer);
    }
  }, [searchDrivers]);

  const startSearchingDrivers = (accessToken) => {
    console.log("Empezando a buscar conductores");
    setSearchDrivers(accessToken);
  };

  const cancelSearchingDrivers = () => {
    console.log("Finalizando búsqueda de conductores");
    setSearchDrivers(null);
  };

  const passengerSearch = async (accessToken) => {
    if (!origin || !destination) {
      console.log("algún null", origin, destination);
      return;
    }
    const url = URL + "/voyage/passenger/search";

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
        console.log(
          "Cantidad de conductores encontrados: ",
          Object.values(res.data).length
        );
        if (searchDrivers) {
          setDrivers(Object.values(res.data));
        } else {
          setDrivers(null);
        }
      })
      .catch((err) => {
        console.log("Error in passengerSearch: ", err);
      });
  };

  const setDriverOnline = async (accessToken) => {
    const url = URL + "/voyage/driver/searching";
    axios
      .post(
        url,
        {
          longitude: userPosition.longitude,
          latitude: userPosition.latitude,
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
    const url = URL + "/voyage/driver/offline";

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
    const url = URL + "/voyage/driver/location";
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
        setUserPosition({
          latitude: position.latitude,
          longitude: position.longitude,
        });
      })
      .catch((err) => {
        console.log("Error changeDriverLocation: ", err);
      });
  };

  const passengerPickDriver = async (accessToken, idDriver) => {
    const url = URL + `/voyage/passenger/search/${idDriver}`;

    // cambio idDriver por driver y uso driver.id en todos lados
    // setSelectedDriver(driver);
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
        console.log("Esperando respuesta del conductor: ", res.data);
      })
      .catch((err) => {
        console.log("Error in passengerPickDriver: ", err);
      });
  };

  const getDriverProfile = async (accessToken, idDriver) => {
    const url = URL + `/users/driver/${idDriver}`;

    axios
      .get(url, {
        headers: {
          token: accessToken,
        },
      })
      .then((res) => {
        const { id, name, last_name, car, calification, reviews } = res.data;
        setLastDriverSelected({
          id: id,
          name: name,
          last_name: last_name,
          car: car,
          calification: calification,
          reviews: reviews,
        });
      })
      .catch((err) => {
        console.log("error in getProfile", err);
      });
  };

  const cleanLocation = () => {
    setDrivers(null);
    setUserPosition(null);
    setOrigin(null);
    setDestination(null);
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
      setOrigin,
      destination,
      setDestination,
      userPosition,
      cleanLocation,
      startSearchingDrivers,
      cancelSearchingDrivers,
      getDriverProfile,
      lastDriverSelected,
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
      setOrigin,
      destination,
      setDestination,
      userPosition,
      cleanLocation,
      startSearchingDrivers,
      cancelSearchingDrivers,
      getDriverProfile,
      lastDriverSelected,
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
