import React, { useEffect, useState, useMemo, createContext, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [profile, setProfile] = useState({
        id: null,
        name: null,
        lastName: null,
        defaultAddress: null,
        isDriver: null
    });

    const getProfile = async (data) => {

    }


    const memoedValue = useMemo(() => ({
        getProfile,
    }), [
        getProfile,
    ]);

    return (
        <AuthContext.Provider value={memoedValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default function useAuthProfile() {
    return useContext(AuthContext);
};