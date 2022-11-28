import React, {
  useEffect,
  useState,
  useMemo,
  createContext,
  useContext,
} from "react";
import axios from "axios";
import usePushNotification from "./usePushNotification";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    accessToken: null,
    id: null,
    formComplete: null,
  });
  const { expoToken } = usePushNotification();

  const signIn = async (data) => {
    const url = "https://fiuber-gateway.herokuapp.com/login";
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

  const editProfile = async (data, newAddress) => {
    const url = `https://fiuber-gateway.herokuapp.com/users/passenger/${user.id}`;

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
    const url = "https://fiuber-gateway.herokuapp.com/signup";

    await axios
      .post(url, {
        email: data.email,
        password: data.password,
      })
      .catch((err) => {
        console.warn(err.detail.message);
      });

    await signIn(data);
  };

  const completeForm = async (accessToken, data, defaultAddress) => {
    const url = "https://fiuber-gateway.herokuapp.com/users";

    console.log("Default addres: ", defaultAddress);

    axios.post(
      url,
      {
        name: data.name,
        last_name: data.lastname,
        roles: ["Passenger"],
        address: defaultAddress,
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
    }),
    [user, setUser, signIn, register, logout, completeForm, editProfile]
  );

  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
