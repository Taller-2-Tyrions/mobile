import React, { useState, useMemo, createContext, useContext } from 'react';
import axios from 'axios';

const AuthProfileContext = createContext({});

export function AuthProfileProvider({ children }) {
    const [profile, setProfile] = useState({
        id: null,
        name: null,
        lastName: null,
        defaultAddress: null,
        isDriver: null,
        isBlocked: null
    });

    const getProfile = async (user) => {
        const url = `https://fiuber-gateway.herokuapp.com/users/${user.id}`;
    
        axios
        .get(url, {
            headers: {
                token: user.accessToken
            }
        })
        .then((res) => {
            const {
                id,
                name,
                last_name,
                roles,
                is_blocked,
                address
            } = res.data;

            setProfile({
                id: id,
                name: name,
                lastName: last_name,
                isDriver: roles.includes("Driver"),
                isBlocked: is_blocked,
                defaultAddress: address
            });
        })
        .catch(err => {
            console.log('error in getProfile', err);
        });
    }


    const memoedValue = useMemo(() => ({
        profile, getProfile,
    }), [
        profile, getProfile,
    ]);

    return (
        <AuthProfileContext.Provider value={memoedValue}>
            {children}
        </AuthProfileContext.Provider>
    );
};

export default function useAuthProfile() {
    return useContext(AuthProfileContext);
};