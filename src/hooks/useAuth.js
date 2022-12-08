import React, { useState, useMemo, createContext, useContext } from "react";
import axios from "axios";
import usePushNotification from "./usePushNotification";
import { URL } from "../configUrl";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    accessToken: null,
    id: null,
    formComplete: null,
  });
  const [profile, setProfile] = useState({
    id: null,
    name: null,
    lastName: null,
    defaultAddress: null,
    isDriver: null,
    isBlocked: null,
  });
  const [status, setStatus] = useState({
    Rol: null,
    Status: null,
  });
  const { expoToken } = usePushNotification();

  const signIn = async (data) => {
    const url = URL + "/login";
    console.log("Token que llega a signIn: ", expoToken);

    axios
      .post(url, {
        email: data.email,
        password: data.password,
        device_token: expoToken,
      })
      .then((res) => {
        const { token, is_registered, id } = res.data;

        if (!token) {
          console.log("No token error");
        } else {
          const userAux = {
            accessToken: token,
            id: id,
            formComplete: is_registered,
          };

          setUser(userAux);
        }
      })
      .catch((err) => {
        console.log("signIn error: ", err);
      });
  };

  const register = async (data) => {
    const url = URL + "/signup";

    await axios
      .post(url, {
        email: data.email,
        password: data.password,
      })
      .catch((err) => {
        console.log("Error in register: ", err);
      });

    await signIn(data);
  };

  const getProfile = async () => {
    const url = URL + `/users/${user.id}`;

    axios
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

        setProfile({
          id: id,
          name: name,
          lastName: last_name,
          isDriver: roles.includes("Driver"),
          isBlocked: is_blocked,
          defaultAddress: defaultAddress,
        });
      })
      .catch((err) => {
        console.log("error in getProfile", err);
      });
  };

  const getStatus = async () => {
    const url = URL + "/users/status";

    axios
      .post(url, {
        headers: {
          token: user.accessToken,
        },
      })
      .then((res) => {
        const { Rol, Status } = res.data;
        setStatus({
          Rol: Rol,
          Status: Status,
        });
      })
      .catch((err) => {
        console.log("Error in getStatus: ", err);
      });
  };

  const logout = () => {
    setUser({
      accessToken: null,
      id: null,
      formComplete: null,
    });
  };

  const memoedValue = useMemo(
    () => ({
      user,
      signIn,
      register,
      logout,
      profile,
      getProfile,
      getStatus,
      status,
    }),
    [user, signIn, register, logout, profile, getProfile, getStatus, status]
  );

  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
