import React, {
  useState,
  useEffect,
  useMemo,
  createContext,
  useContext,
} from "react";
import axios from "axios";
import { URL } from "../configUrl";

const VoyageContext = createContext({});

export function VoyageProvider({ children }) {
  const [status, setStatus] = useState(null);
  const [trackingVoyage, setTrackingVoyage] = useState(null);
  const [locationVoyage, setLocationVoyage] = useState(null);

  useEffect(() => {
    if (trackingVoyage) {
      const timer = setInterval(() => getStatusVoyage(trackingVoyage), 2000);
      return () => clearInterval(timer);
    }
  }, [trackingVoyage]);

  const getStatusVoyage = async (accessToken) => {
    const url = URL + "/users/status";

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
        console.log("New status: ", res.data);
        setStatus(res.data);
      })
      .catch((err) => {
        console.log("Error in getStatus: ", err);
      });
  };

  const getLocationVoyage = async (accessToken, idVoyage) => {
    const url = URL + `/voyage/driver/location/${idVoyage}`;

    axios
      .get(url, {
        headers: {
          token: accessToken,
        },
      })
      .then((res) => {
        const { latitude, longitude } = res.data;
        setLocationVoyage({ lat: latitude, long: longitude });
      })
      .catch((err) => {
        console.log("Error in getLocationVoyage: ", err);
      });
  };

  const startTrackingVoyage = (accessToken) => {
    setTrackingVoyage(accessToken);
  };

  const cancelTrackingVoyage = () => {
    setTrackingVoyage(null);
  };

  const memoedValue = useMemo(
    () => ({
      startTrackingVoyage,
      cancelTrackingVoyage,
      status,
      getStatusVoyage,
      locationVoyage,
      getLocationVoyage,
    }),
    [
      startTrackingVoyage,
      cancelTrackingVoyage,
      status,
      getStatusVoyage,
      locationVoyage,
      getLocationVoyage,
    ]
  );

  return (
    <VoyageContext.Provider value={memoedValue}>
      {children}
    </VoyageContext.Provider>
  );
}

export default function useVoyage() {
  return useContext(VoyageContext);
}
