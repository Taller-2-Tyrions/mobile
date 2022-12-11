import React, { useState, useMemo, createContext, useContext } from "react";
import axios from "axios";
import { URL } from "../configUrl";
import useAuth from "./useAuth";

const DriverContext = createContext({});

export function DriverProvider({ children }) {
  const { user } = useAuth();
  const [voyage, setVoyage] = useState(null);
  const [status, setStatus] = useState(null);

  const replyVoyageRequest = async (voyage_id, response) => {
    const url = URL + `/voyage/driver/reply/${voyage_id}/${response}`;

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

  const memoedValue = useMemo(
    () => ({
      voyage,
      setVoyage,
      replyVoyageRequest,
      getStatusDriver,
      status,
    }),
    [voyage, setVoyage, replyVoyageRequest, getStatusDriver, status]
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
