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

const DriverContext = createContext({});

export function DriverProvider({ children }) {
  const { user } = useUser();
  const [voyageId, setVoyageId] = useState(null);
  const [voyageStatus, setVoyageStatus] = useState(null);
  const [status, setStatus] = useState(null);
  const [position, setPosition] = useState(null);

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
