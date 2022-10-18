import React, {
  useEffect,
  useState,
  useMemo,
  createContext,
  useContext,
} from "react";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import axios from "axios";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  getAuth,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import usePushNotification from "./usePushNotification";

const firebaseConfig = {
  apiKey: "AIzaSyBSenFicB4rNCqRO183gmoMILDImbTR84Y",
  authDomain: "fiuber-36b86.firebaseapp.com",
  projectId: "fiuber-36b86",
  storageBucket: "fiuber-36b86.appspot.com",
  messagingSenderId: "388259755156",
  appId: "1:388259755156:web:04d82df1a410135ee9f081",
};

initializeApp(firebaseConfig);

const AuthContext = createContext({});
WebBrowser.maybeCompleteAuthSession();

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

  const completeForm = async (accessToken, data) => {
    const url = "https://fiuber-gateway.herokuapp.com/users";

    axios.post(
      url,
      {
        name: data.name,
        last_name: data.lastname,
        roles: ["Passenger"],
        address: data.defaultAddress,
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
      signIn,
      register,
      logout,
      completeForm,
    }),
    [user, signIn, register, logout, completeForm]
  );

  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
