import React, { useState, useMemo, createContext, useContext } from 'react';
import axios from 'axios';

const LocationContext = createContext({});

export function LocationProvider({ children }) {
    const [drivers, setDrivers] = useState(null);
    const [driverPosition, setDriverPosition] = useState({
        latitude: -34.7425261,
        longitude: -58.3869874,
    });

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
    };

    const setDriverOnline = async (accessToken) => {
        const url = 'https://fiuber-gateway.herokuapp.com/voyage/driver/searching';

        console.log(driverPosition);
        console.log(accessToken);

        axios
        .post(url, {
            longitude: driverPosition.longitude,
            latitude: driverPosition.latitude,
        }, {
            headers: {
                token: accessToken
            }
        })
        .then((res) => {
            console.log('Driver searching: ', res.data);
        })
        .catch(err => {
            console.log('Error setDriverOnline: ', err);
        });
    };

    const setDriverOffline = async (accessToken) => {
        const url = 'https://fiuber-gateway.herokuapp.com/voyage/driver/offline';

        axios
        .post(url, {},{
            headers: {
                token: accessToken
            }
        })
        .then((res) => {
            console.log('éxito');
        })
        .catch(err => {
            console.log('Error setDriverOffline: ', err);
        });
    };

    const changeDriverLocation = async (accessToken, position) => {
        const url = 'https://fiuber-gateway.herokuapp.com/voyage/driver/location';
        axios
        .post(url, {
            longitude: position.longitude,
            latitude: position.latitude,
        }, {
            headers: {
                token: accessToken
            }
        })
        .then((res) => {
            setDriverPosition({
                latitude: position.latitude,
                longitude: position.longitude,
            });
        })
        .catch(err => {
            console.log('Error changeDriverLocation: ', err);
        });        
    }

    const memoedValue = useMemo(() => ({
        passengerSearch, drivers, setDriverOnline, setDriverOffline, changeDriverLocation
    }), [
        passengerSearch, drivers, setDriverOnline, setDriverOffline, changeDriverLocation
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