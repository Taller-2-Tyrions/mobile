import React, {
  useState,
  useEffect,
  useMemo,
  createContext,
  useContext,
} from "react";
import axios from "axios";
import { URL } from "./configUrl";

const UserContext = createContext({});
const EXPO_PUSH_TOKEN = "ExponentPushToken[jf5OuPNhyGc4s3ov8-uIk8]";

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [status, setStatus] = useState(null);

  const login = async (data, setError) => {
    const url = URL + "/login";

    await axios
      .post(url, {
        email: data.email,
        password: data.password,
        device_token: EXPO_PUSH_TOKEN,
      })
      .then((res) => {
        const { token, is_registered, id } = res.data;
        setUser({
          accessToken: token,
          formComplete: is_registered,
          id: id,
        });

        console.log("Access token: ", token);
        console.log("Id: ", id);
      })
      .catch((err) => {
        console.log("Error en login: ", err);
        setError(err);
      });
  };

  const register = async (data, setError) => {
    const url = URL + "/signup";

    await axios
      .post(url, {
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        login(data, setError);
      })
      .catch((err) => {
        console.log("Error in register: ", err);
        setError(err);
      });
  };

  const getProfile = async () => {
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
        console.log("Error in getProfile: ", err);
      });
  };

  const getStatus = async () => {
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
        console.log("Status obtenido: ", res.data?.Rol);
        setStatus(res.data);
      })
      .catch((err) => {
        console.log("Error in getStatus: ", err.response.status);
      });
  };

  const completePassengerForm = async (data, setError) => {
    if (!user) return;
    const url = URL + "/users";

    const location =
      String(data.location) + ";" + String(data.lat) + ";" + String(data.long);

    await axios
      .post(
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
      .then((res) => {
        console.log("Formulario de pasajero completado.");
        setUser({ ...user, formComplete: true });
      })
      .catch((err) => {
        console.log("Error in completePassengerForm: ", err);
        setError(err);
      });
  };

  const memoedValue = useMemo(
    () => ({
      user,
      profile,
      getProfile,
      status,
      getStatus,
      login,
      register,
      completePassengerForm,
      setUser,
      setProfile,
    }),
    [
      user,
      profile,
      getProfile,
      status,
      getStatus,
      login,
      register,
      completePassengerForm,
      setUser,
      setProfile,
    ]
  );

  return (
    <UserContext.Provider value={memoedValue}>{children}</UserContext.Provider>
  );
}

export default function useUser() {
  return useContext(UserContext);
}
