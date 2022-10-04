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
    const [user, setUser] = useState(null);
    const [loadingInitial, setLoadingInitial] = useState(true);
    const [loading, setLoading] = useState(false);

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
                setUser(user);
            } else {
                setUser(null);
            }

            setLoadingInitial(false);
        });

        return unsub();
    }, []);

    useEffect(() => {
        setLoading(true);

        if (response?.type === "success") {
            const { id_token } = response.params;
            const auth = getAuth();
            const credential = GoogleAuthProvider.credential(id_token);
            signInWithCredential(auth, credential);            
        }

        setLoading(false);
        
    }, [response]);
        
    async function signInWithGoogle() {
        promptAsync({showInRecents: true});
    };

    const memoedValue = useMemo(() => ({
        user,
        loading,
        signInWithGoogle,
    }), [user, loading, signInWithGoogle]);

    return (
        <AuthContext.Provider value={memoedValue}>
            {!loadingInitial && children}
        </AuthContext.Provider>
    );
};

export default function useAuth() {
    return useContext(AuthContext);
};