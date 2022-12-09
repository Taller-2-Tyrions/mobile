import React, {
  useEffect,
  useState,
  useMemo,
  createContext,
  useContext,
} from "react";
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
  const { expoToken } = usePushNotification();
  const [status, setStatus] = useState({
    Rol: null,
    Status: null,
  });

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

          console.log("User: ", userAux);

          setUser(userAux);
        }
      })
      .catch((err) => {
        console.log("signIn error: ", err);
      });
  };

  const editProfile = async (data, newAddress) => {
    const url = URL + `/users/passenger/${user.id}`;

    await axios
      .put(url, {
        name: data.name,
        last_name: data.lastname,
        address: newAddress,
      })
      .catch((err) => {
        console.log("Error in edit profile: ", err);
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
        console.warn(err);
      });

    await signIn(data);
  };

  const completeForm = async (accessToken, data) => {
    const url = URL + "/users";

    console.log("Data completeForm: ", data);
    const location =
      String(data.location) + ";" + String(data.lat) + ";" + String(data.long);

    axios.post(
      url,
      {
        name: data.name,
        last_name: data.lastname,
        roles: ["Passenger"],
        address: location,
      },
      {
        headers: {
          token: accessToken,
        },
      }
    );
    /*.then((res) => {
                console.log('El usuario terminó el form');
            })
            .catch(err => {
                console.log(err);
            })*/
    setUser({
      ...user,
      formComplete: true,
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

  const cleanAuth = () => {
    setUser({
      accessToken: null,
      id: null,
      formComplete: null,
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
      setUser,
      signIn,
      register,
      logout,
      completeForm,
      editProfile,
      cleanAuth,
      status,
      getStatus,
    }),
    [
      user,
      setUser,
      signIn,
      register,
      logout,
      completeForm,
      editProfile,
      cleanAuth,
      status,
      getStatus,
    ]
  );

  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
