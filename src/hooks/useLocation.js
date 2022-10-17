import React, { useState, useMemo, createContext, useContext } from 'react';
import axios from 'axios';

const LocationContext = createContext({});

export function LocationProvider({ children }) {
    const [drivers, setDrivers] = useState(null);

    const passengerSearch = async (origin, destination, accessToken) => {
        const url = 'https://fiuber-gateway.herokuapp.com/voyage/passenger/search';

        axios
        .post(url, {
            init: {
                longitude: origin.lng,
                latitude: origin.lat
            },
            end: {
                longitude: destination.lng,
                latitude: destination.lat
            },
            is_vip: false
        }, {
            headers: {
                token: accessToken
            }
        })
        .then((res) => {
            console.log("Drivers: ", res.data);
            setDrivers(res.data);
        })
        .catch(err => {
            console.log("Error in passengerSearch: ", err);
        });
    }


    const memoedValue = useMemo(() => ({
        passengerSearch, drivers,
    }), [
        passengerSearch, drivers,
    ]);

    return (
        <LocationContext.Provider value={memoedValue}>
            {children}
        </LocationContext.Provider>
    );
};

export default function useLocation() {
    return useContext(LocationContext);
};