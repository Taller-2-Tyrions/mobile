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
  const [voyageID, setVoyageID] = useState(null);
  const [status, setStatus] = useState(null);
  const [trackingVoyage, setTrackingVoyage] = useState(null);

  useEffect(() => {
    if (trackingVoyage) {
      const timer = setInterval(() => getStatusVoyage(trackingVoyage), 5000);
      return () => clearInterval(timer);
    }
  }, [trackingVoyage]);

  const getStatusVoyage = async (accessToken) => {
    const url = URL + "/users/status";

    axios
      .post(url, {
        headers: {
          token: accessToken,
        },
      })
      .then((res) => {
        const { Status, Rol } = res.data;
        if (Status === "WAITING_CONFIRMATION") {
          const { Voyage } = res.data;
          setVoyageID(Voyage);
        }
      })
      .catch((err) => {
        console.log("Error in passengerSearch: ", err);
      });
  };

  const startTrackingVoyage = (accessToken) => {
    setTrackingVoyage(accessToken);
  };

  const cancelTrackingVoyage = () => {
    setTrackingVoyage(null);
  };

  const memoedValue = useMemo(
    () => ({ startTrackingVoyage, cancelTrackingVoyage, voyageID, status }),
    [startTrackingVoyage, cancelTrackingVoyage, voyageID, status]
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
