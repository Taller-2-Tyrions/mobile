import React, {
  useState,
  useEffect,
  useMemo,
  createContext,
  useContext,
} from "react";
import axios from "axios";
import { URL } from "../configUrl";
import useUser from "../useUser";
import * as Location from "expo-location";

const DriverContext = createContext({});

export function DriverProvider({ children }) {
  const { user, profile, getProfile } = useUser();
  const [voyageId, setVoyageId] = useState(null);
  const [voyageStatus, setVoyageStatus] = useState(null);
  const [status, setStatus] = useState(null);
  const [position, setPosition] = useState(null);
  const [driverProfile, setDriverProfile] = useState(null);
  const [driverBalance, setDriverBalance] = useState(null);

  const replyVoyageRequest = async (response) => {
    if (!voyageId) return;
    const url = URL + `/voyage/driver/reply/${voyageId}/${response}`;

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
        console.log("[DRIVER] Respuesta informada: Viaje ", response);

        if (!response) {
          setStatus(null);
        }
      })
      .catch((err) => {
        console.log("Error in replyVoyageRequest: ", err);
      });
  };

  const getStatusDriver = async () => {
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
        console.log("New status: ", res.data);
        setStatus(res.data);
      })
      .catch((err) => {
        console.log("Error in getStatus: ", err);
      });
  };

  const getVoyageStatus = async () => {
    if (!voyageId) return;
    const url = URL + `/voyage/driver/info/${voyageId}`;

    await axios
      .get(url, {
        headers: {
          token: user.accessToken,
        },
      })
      .then((res) => {
        console.log("Voyage status: ", res.data.status);
        setVoyageStatus(res.data);
      })
      .catch((err) => {
        console.log("Error in getVoyageStatus: ", err);
      });
  };

  const getPosition = async () => {
    if (!voyageId) return;
    const url = URL + `/voyage/driver/location/${voyageId}`;

    await axios
      .get(url, {
        headers: {
          token: user.accessToken,
        },
      })
      .then((res) => {
        const { latitude, longitude } = res.data;
        setPosition({ latitude: latitude, longitude: longitude });
      })
      .catch((err) => {
        console.log("Error in getPosition: ", err);
      });
  };

  const startVoyage = async () => {
    if (!voyageId) return;
    const url = URL + `/voyage/driver/start/${voyageId}`;

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
        console.log(
          "[DRIVER] Empezando viaje (pasajero ya se subió al vehículo)"
        );
      })
      .catch((err) => {
        console.log("Error in startVoyage: ", err);
      });
  };

  const endVoyage = async () => {
    if (!voyageId) return;
    const url = URL + `/voyage/driver/end/${voyageId}`;

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
        console.log("[DRIVER] llegué al destino del cliente.");
      })
      .catch((err) => {
        console.log("Error in endVoyage: ", err);
      });
  };

  const cancelVoyage = async () => {
    if (!voyageId) return;
    const url = URL + `/voyage/driver/voyage/${voyageId}`;

    await axios
      .delete(url, {
        headers: {
          token: user.accessToken,
        },
      })
      .then((res) => {
        console.log("[DRIVER] viaje cancelado.");
      })
      .catch((err) => {
        console.log("Error in cancelVoyage: ", err.response.status);
      });
  };

  const getActualPosition = async () => {
    const location = await Location.getCurrentPositionAsync({});
    setPosition({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  };

  const getDriverProfile = async () => {
    const url = URL + `/users/driver/${user.id}`;

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

  const driverOnline = async () => {
    if (!position) return;
    const url = URL + "/voyage/driver/searching";

    await axios
      .post(
        url,
        {
          longitude: position.longitude,
          latitude: position.latitude,
        },
        {
          headers: {
            token: user.accessToken,
          },
        }
      )
      .then((res) => {
        console.log("Conductor en línea");
      })
      .catch((err) => {
        console.log("Error driverOnline: ", err);
      });
  };

  const driverOffline = async () => {
    const url = URL + "/voyage/driver/offline";

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
        console.log("Conductor fuera de línea.");
      })
      .catch((err) => {
        console.log("Error driverOffline: ", err);
      });
  };

  const completeDriverForm = async (data) => {
    const url = URL + `/users/driver/${user.id}`;

    await axios
      .post(
        url,
        {
          name: profile.name,
          last_name: profile.lastName,
          roles: ["Driver"],
          car: {
            model: data.model,
            year: data.year,
            plaque: data.plaque,
            capacity: data.capacity,
          },
        },
        {
          headers: {
            token: user.accessToken,
          },
        }
      )
      .then((res) => {
        getProfile();
      })
      .catch((err) => {
        console.log("Error in completeDriverForm: ", err);
      });
  };

  const getDriverBalance = async () => {
    const url = URL + "/users/driver/balance";

    await axios
      .get(url, {
        headers: {
          token: user.accessToken,
        },
      })
      .then((res) => {
        setDriverBalance(res.data);
      })
      .catch((err) => {
        console.log("Error in getDriverBalance: ", err);
      });
  };

  const editDriverProfile = async (data) => {
    const url = URL + `/users/driver/${user.id}`;

    await axios
      .put(
        url,
        {
          name: driverProfile.name,
          last_name: driverProfile.last_name,
          roles: ["Driver", "Passenger"],
          car: {
            model: data.model,
            year: data.year,
            plaque: data.plaque,
            capacity: data.capacity,
          },
        },
        {
          headers: {
            token: user.accessToken,
          },
        }
      )
      .catch((err) => {
        console.log("Error in editDriverProfile: ", err);
      });
  };

  const clearDriver = () => {
    setVoyageId(null);
    setVoyageStatus(null);
    setStatus(null);
  };

  const memoedValue = useMemo(
    () => ({
      voyageId,
      voyageStatus,
      replyVoyageRequest,
      getStatusDriver,
      status,
      getVoyageStatus,
      position,
      getPosition,
      startVoyage,
      endVoyage,
      setVoyageId,
      setStatus,
      cancelVoyage,
      clearDriver,
      driverOnline,
      driverOffline,
      getActualPosition,
      driverProfile,
      setDriverProfile,
      completeDriverForm,
      getDriverProfile,
      setDriverProfile,
      driverBalance,
      setDriverBalance,
      getDriverBalance,
      editDriverProfile,
    }),
    [
      voyageId,
      voyageStatus,
      replyVoyageRequest,
      getStatusDriver,
      status,
      getVoyageStatus,
      position,
      getPosition,
      startVoyage,
      endVoyage,
      setVoyageId,
      setStatus,
      cancelVoyage,
      clearDriver,
      driverOnline,
      driverOffline,
      getActualPosition,
      driverProfile,
      setDriverProfile,
      completeDriverForm,
      getDriverProfile,
      setDriverProfile,
      driverBalance,
      setDriverBalance,
      getDriverBalance,
      editDriverProfile,
    ]
  );

  return (
    <DriverContext.Provider value={memoedValue}>
      {children}
    </DriverContext.Provider>
  );
}

export default function useDriver() {
  return useContext(DriverContext);
}
