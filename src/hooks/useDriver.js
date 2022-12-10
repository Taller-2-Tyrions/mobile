import React, {
  useState,
  useEffect,
  useMemo,
  createContext,
  useContext,
} from "react";
import axios from "axios";
import { URL } from "../configUrl";
import useAuth from "./useAuth";

const DriverContext = createContext({});

export function DriverProvider({ children }) {
  const [voyage, setVoyage] = useState(null);
  const [voyageAccepted, setVoyageAccepted] = useState(false);
  const { user } = useAuth();
  const [driverPosition, setDriverPosition] = useState(null);
  const [trackPosition, setTrackPosition] = useState(false);

  useEffect(() => {
    if (trackPosition) {
      const timer = setInterval(() => getLocationVoyage(), 2000);
      return () => clearInterval(timer);
    }
  }, [trackPosition]);

  const getVoyageInfo = () => {
    if (!voyage) return;
    const url = URL + `/voyage/driver/info/${voyage.voyage_id}`;

    axios
      .get(url, {
        headers: {
          token: user.accessToken,
        },
      })
      .then((res) => {
        const { passenger_id, init, end, price, start_time } = res.data;
        setVoyage({
          ...voyage,
          passenger_id: passenger_id,
          init: init,
          end: end,
          price: price,
          start_time: start_time,
        });
      })
      .catch((err) => {
        console.log("Error in getVoyageInfo: ", err);
      });
  };

  const replyVoyageRequest = (response, setProcessing) => {
    const url = URL + `/voyage/driver/reply/${voyage.voyage_id}/${response}`;

    axios
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
        setProcessing(false);
        setVoyageAccepted(response);
        console.log("[DRIVER] Respuesta informada.");
      })
      .catch((err) => {
        console.log("Error in replyVoyageRequest: ", err);
      });
  };

  const getLocationVoyage = () => {
    if (!voyage) return;
    const url = URL + `/voyage/driver/location/${voyage.voyage_id}`;

    axios
      .get(url, {
        headers: {
          token: user.accessToken,
        },
      })
      .then((res) => {
        const { latitude, longitude } = res.data;
        setDriverPosition({
          latitude: latitude,
          longitude: longitude,
        });
      })
      .catch((err) => {
        console.log("Error in getLocationVoyage driver: ", err);
      });
  };

  const startTrackingDriverPosition = () => {
    setTrackPosition(true);
  };

  const cancelTrackingDriverPosition = () => {
    setTrackPosition(false);
  };

  const memoedValue = useMemo(
    () => ({
      voyage,
      setVoyage,
      getVoyageInfo,
      replyVoyageRequest,
      voyageAccepted,
      getLocationVoyage,
      driverPosition,
      startTrackingDriverPosition,
      cancelTrackingDriverPosition,
    }),
    [
      voyage,
      setVoyage,
      getVoyageInfo,
      replyVoyageRequest,
      voyageAccepted,
      getLocationVoyage,
      driverPosition,
      startTrackingDriverPosition,
      cancelTrackingDriverPosition,
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
