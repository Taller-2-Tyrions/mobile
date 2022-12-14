import React, { useState, useMemo, createContext, useContext } from "react";
import axios from "axios";
import { URL } from "../configUrl";
import useUser from "../useUser";
import * as Location from "expo-location";

const PassengerContext = createContext({});

export function PassengerProvider({ children }) {
  const { user } = useUser();
  const [voyageId, setVoyageId] = useState(null);
  const [voyageStatus, setVoyageStatus] = useState(null);
  const [driverLocation, setDriverLocation] = useState(null);
  const [driverProfile, setDriverProfile] = useState(null);
  const [passengerStatus, setPassengerStatus] = useState(null);
  const [passengerProfile, setPassengerProfile] = useState(null);
  const [passengerBalance, setPassengerBalance] = useState(null);
  const [passengerLocation, setPassengerLocation] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);

  const requestDriver = async (init, end, id_driver) => {
    const url = URL + `/voyage/passenger/search/${id_driver}`;

    await axios
      .post(
        url,
        {
          init: init,
          end: end,
          is_vip: false,
        },
        {
          headers: {
            token: user.accessToken,
          },
        }
      )
      .then((res) => {
        console.log("[PASAJERO] request enviado, id: ", res.data.voyage_id);
        const { voyage_id } = res.data;
        setVoyageId(voyage_id);
      })
      .catch((err) => {
        console.log("Error in requestDriver: ", err);
      });
  };

  const cancelRequest = async () => {
    const url = URL + "/voyage/passenger/search";

    await axios
      .delete(url, {
        headers: {
          token: user.accessToken,
        },
      })
      .then((res) => {
        console.log("[PASAJERO] request cancelado.");
      })
      .catch((err) => {
        console.log("Error in cancelRequest: ", err);
      });
  };

  const getVoyageStatus = async () => {
    if (!voyageId) {
      console.log("No hay voyageId");
      return;
    }
    const url = URL + `/voyage/passenger/info/${voyageId}`;

    await axios
      .get(url, {
        headers: {
          token: user.accessToken,
        },
      })
      .then((res) => {
        console.log("Estado del viaje: ", res.data.status);
        setVoyageStatus(res.data);
      })
      .catch((err) => {
        console.log("Error in getVoyageStatus: ", err.response.status);
        // si es 400 el conductor canceló el viaje.
        if (err.response.status === 400) clearVoyage();
      });
  };

  const getDriverLocation = async () => {
    if (!voyageId) {
      console.log("No hay voyageId");
      return;
    }
    const url = URL + `/voyage/driver/location/${voyageId}`;

    await axios
      .get(url, {
        headers: {
          token: user.accessToken,
        },
      })
      .then((res) => {
        setDriverLocation(res.data);
      })
      .catch((err) => {
        console.log("Error in getDriverLocation: ", err);
      });
  };

  const getDriverProfile = async (id_driver) => {
    const url = URL + `/users/driver/${id_driver}`;

    await axios
      .get(url, {
        headers: {
          token: user.accessToken,
        },
      })
      .then((res) => {
        setDriverProfile(res.data);
      })
      .catch((err) => {
        console.log("Error in getDriverProfile: ", err);
      });
  };

  const cancelVoyage = async () => {
    if (!voyageId) {
      console.log("No hay voyageId");
      return;
    }
    const url = URL + `/voyage/passenger/${voyageId}`;

    await axios
      .delete(url, {
        headers: {
          token: user.accessToken,
        },
      })
      .then((res) => {
        console.log("[PASAJERO] viaje cancelado.");
      })
      .catch((err) => {
        console.log("Error in cancelVoyage: ", err);
      });
  };

  const getPassengerProfile = async () => {
    if (!user) return;
    const url = URL + `/users/passenger/${user.id}`;

    await axios
      .get(url, {
        headers: {
          token: user.accessToken,
        },
      })
      .then((res) => {
        const { id, name, last_name, roles, is_blocked, address } = res.data;
        const split_address = address.split(";");
        const defaultAddress = {
          location: split_address[0],
          lat: parseFloat(split_address[1]),
          long: parseFloat(split_address[2]),
        };

        setPassengerProfile({
          id: id,
          name: name,
          lastName: last_name,
          isDriver: roles.includes("Driver"),
          isBlocked: is_blocked,
          defaultAddress: defaultAddress,
        });
      })
      .catch((err) => {
        console.log("Error in getPassengerProfile: ", err);
      });
  };

  const editPassengerProfile = async (data) => {
    const url = URL + `/users/passenger/${user.id}`;
    const location =
      String(data.location) + ";" + String(data.lat) + ";" + String(data.long);

    await axios
      .put(
        url,
        {
          name: data.name,
          last_name: data.lastname,
          roles: ["Passenger"],
          address: location,
        },
        {
          headers: {
            token: user.accessToken,
          },
        }
      )
      .catch((err) => {
        console.log("Error in edit profile: ", err);
      });
  };

  const getPassengerStatus = async () => {
    const url = URL + "/users/status";

    await axios
      .post(
        url,
        {},
        {
          headers: {
            token: user.accessToken,
          },
        }
      )
      .then((res) => {
        setPassengerStatus(res.data);
      })
      .catch((err) => {
        console.log("Error in setPassengerStatus: ", err.response.status);
      });
  };

  const getPassengerBalance = async () => {
    const url = URL + "/users/passenger/balance";

    axios
      .get(url, {
        headers: {
          token: user.accessToken,
        },
      })
      .then((res) => {
        const { balance, address } = res.data;
        setPassengerBalance({ address: address, balance: balance });
      })
      .catch((err) => {
        console.log("error in getPassengerBalance", err.response.status);
      });
  };

  const getPassengerLocation = async () => {
    const location = await Location.getCurrentPositionAsync({});
    setPassengerLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  };

  const clearVoyage = () => {
    setVoyageStatus(null);
    setVoyageId(null);
  };

  const memoedValue = useMemo(
    () => ({
      requestDriver,
      cancelRequest,
      getVoyageStatus,
      voyageId,
      voyageStatus,
      getDriverLocation,
      driverLocation,
      clearVoyage,
      getDriverProfile,
      driverProfile,
      cancelVoyage,
      getPassengerStatus,
      passengerStatus,
      setVoyageId,
      editPassengerProfile,
      passengerProfile,
      getPassengerProfile,
      setPassengerProfile,
      passengerBalance,
      setPassengerBalance,
      getPassengerBalance,
      origin,
      setOrigin,
      destination,
      setDestination,
      passengerLocation,
      getPassengerLocation,
    }),
    [
      requestDriver,
      cancelRequest,
      getVoyageStatus,
      voyageId,
      voyageStatus,
      getDriverLocation,
      driverLocation,
      clearVoyage,
      getDriverProfile,
      driverProfile,
      cancelVoyage,
      getPassengerStatus,
      passengerStatus,
      setVoyageId,
      editPassengerProfile,
      passengerProfile,
      getPassengerProfile,
      setPassengerProfile,
      passengerBalance,
      setPassengerBalance,
      getPassengerBalance,
      origin,
      setOrigin,
      destination,
      setDestination,
      passengerLocation,
      getPassengerLocation,
    ]
  );

  return (
    <PassengerContext.Provider value={memoedValue}>
      {children}
    </PassengerContext.Provider>
  );
}

export default function usePassenger() {
  return useContext(PassengerContext);
}
