import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import axios from "axios";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  getAuth,
} from "firebase/auth";
import React, {
  useEffect,
  useState,
  useMemo,
  createContext,
  useContext,
} from "react";
import { initializeApp } from "firebase/app";
import useUser from "./useUser";
import { URL } from "./configUrl";

const firebaseConfig = {
  apiKey: "AIzaSyBSenFicB4rNCqRO183gmoMILDImbTR84Y",
  authDomain: "fiuber-36b86.firebaseapp.com",
  projectId: "fiuber-36b86",
  storageBucket: "fiuber-36b86.appspot.com",
  messagingSenderId: "388259755156",
  appId: "1:388259755156:web:04d82df1a410135ee9f081",
};

initializeApp(firebaseConfig);
const EXPO_PUSH_TOKEN = "ExponentPushToken[jf5OuPNhyGc4s3ov8-uIk8]";

const AuthGoogleContext = createContext({});
WebBrowser.maybeCompleteAuthSession();

export function AuthGoogleProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const { user, setUser } = useUser();

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    expoClientId:
      "388259755156-rouqicldlne824v27jfoh8lfen057gnu.apps.googleusercontent.com",
    androidClientId:
      "388259755156-emhnamp28b9qg3r14hk4cfjk7rdccoms.apps.googleusercontent.com",
    iosClientId:
      "388259755156-7n15d7hobmac2psbo5ug7s97bfbu7eu3.apps.googleusercontent.com",
    webClientId:
      "388259755156-b0mu9gopq7otoj8oo3q9suja63oeea93.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (accessToken) {
      setUser({
        ...user,
        accessToken: accessToken,
      });
    }
  }, [accessToken]);

  useEffect(() => {
    const auth = getAuth();
    const unsub = onAuthStateChanged(auth, (userAux) => {
      if (userAux && user) {
        setAccessToken(user.accessToken);
      }
    });

    return unsub();
  }, []);

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const auth = getAuth();
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);

      //console.log("AT: ", auth.currentUser);

      const url = URL + "/login/google";

      axios
        .post(
          url,
          {
            device_token: EXPO_PUSH_TOKEN,
          },
          {
            headers: {
              token: auth.currentUser.accessToken,
            },
          }
        )
        .then((res) => {
          const { token, is_registered, id } = res.data;
          console.log("Res data", res.data);

          if (!token) {
            console.log("No token error");
          } else {
            const userAux = {
              accessToken: token,
              id: id,
              formComplete: is_registered,
            };

            setUser(userAux);
            setAccessToken(token);
          }
        })
        .catch((err) => {
          console.log("signInWithGoogle error:", err);
        });
    }
  }, [response]);

  async function signInWithGoogle() {
    promptAsync({ showInRecents: true });
  }

  const memoedValue = useMemo(() => ({ signInWithGoogle }), [signInWithGoogle]);

  return (
    <AuthGoogleContext.Provider value={memoedValue}>
      {children}
    </AuthGoogleContext.Provider>
  );
}

export default function useAuthGoogle() {
  return useContext(AuthGoogleContext);
}
