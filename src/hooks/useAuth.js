import React, { useEffect, useState, useMemo, createContext, useContext } from 'react';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import axios from 'axios';
import {
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithCredential,
    getAuth
} from 'firebase/auth';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBSenFicB4rNCqRO183gmoMILDImbTR84Y",
    authDomain: "fiuber-36b86.firebaseapp.com",
    projectId: "fiuber-36b86",
    storageBucket: "fiuber-36b86.appspot.com",
    messagingSenderId: "388259755156",
    appId: "1:388259755156:web:04d82df1a410135ee9f081"
};

initializeApp(firebaseConfig);

const AuthContext = createContext({});
WebBrowser.maybeCompleteAuthSession();

export function AuthProvider({ children }) {
    const [accessToken, setAccessToken] = useState(null);
    const [loadingInitial, setLoadingInitial] = useState(true);
    const [isRegistered, setIsRegistered] = useState(false);

    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        expoClientId: '388259755156-rouqicldlne824v27jfoh8lfen057gnu.apps.googleusercontent.com',
        androidClientId: '388259755156-emhnamp28b9qg3r14hk4cfjk7rdccoms.apps.googleusercontent.com',
        iosClientId: '388259755156-7n15d7hobmac2psbo5ug7s97bfbu7eu3.apps.googleusercontent.com',
        webClientId: '388259755156-b0mu9gopq7otoj8oo3q9suja63oeea93.apps.googleusercontent.com'
    });

    useEffect(() => {
        const auth = getAuth();
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAccessToken(user.accessToken);
                //console.log('AT del user: ', user.accessToken);
            } else {
                setUser(null);
            }

            setLoadingInitial(false);
        });

        return unsub();
    }, []);

    useEffect(() => {
        if (response?.type === "success") {
            const { id_token } = response.params;
            const auth = getAuth();
            const credential = GoogleAuthProvider.credential(id_token);
            signInWithCredential(auth, credential);
                        
            // pasar a backend auth.currentUser.accessToken

            //setAccessToken(auth.currentUser.accessToken);
            console.log('AT: ', auth.currentUser);

            const url = 'https://fiuber-gateway.herokuapp.com/login/google';
        
            axios
                .post(url, {
                    "token": auth.currentUser.accessToken,
                })
                .then((res) => {
                    const {token, is_registered} = res.data;
        
                    if (!token) {
                        console.warn('Error');
                    } else {
                        console.log('AT: ', token);
                        console.log('is registered: ', is_registered);
                        
                        setAccessToken(token);
                        setIsRegistered(is_registered);
                    }
                })
                .catch(err => {
                    console.warn('Error en axios:', err);
                })
        }
        
    }, [response]);
        
    async function signInWithGoogle() {
        promptAsync({showInRecents: true});
    };

    const completeForm = async (data) => {
        const url = 'https://fiuber-gateway.herokuapp.com/users';
        
        console.log('Data: ', data);

        // validate user -> backend
        axios
            .post(url, {
                "user": {
                    "name": data.name,
                    "last_name": data.lastname,
                    "roles": [data.role],
                    "address": data.address
                },
                "token": {
                    "token": accessToken
                }
            })
            .then((res) => {
                setIsRegistered(true);
            })
            .catch(err => {
                console.warn(err);
            })
    }

    const onSignInPressed = (data) => {
        const url = 'https://fiuber-gateway.herokuapp.com/login';
        
        // validate user -> backend
        axios
            .post(url, {
                "email": data.username,
                "password": data.password
            })
            .then((res) => {
                const {token, is_registered} = res.data;
    
                if (!token) {
                    console.warn('Error');
                } else {
                    console.log('AT: ', token);
                    console.log('is registered: ', is_registered);
                    
                    setAccessToken(token);
                    setIsRegistered(is_registered);
                }
            })
            .catch(err => {
                console.warn(err);
            })
        };

    const logout = () => {
        setAccessToken(null);
    }

    const memoedValue = useMemo(() => ({
        accessToken,
        signInWithGoogle,
        onSignInPressed,
        logout,
        isRegistered,
        completeForm
    }), [accessToken, logout, signInWithGoogle, onSignInPressed, isRegistered, completeForm]);

    return (
        <AuthContext.Provider value={memoedValue}>
            {!loadingInitial && children}
        </AuthContext.Provider>
    );
};

export default function useAuth() {
    return useContext(AuthContext);
};