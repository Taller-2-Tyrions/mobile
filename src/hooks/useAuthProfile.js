import React, { useState, useMemo, createContext, useContext } from "react";
import axios from "axios";
import { URL } from "../configUrl";

const AuthProfileContext = createContext({});

export function AuthProfileProvider({ children }) {
  const [profile, setProfile] = useState({
    id: null,
    name: null,
    lastName: null,
    defaultAddress: null,
    isDriver: null,
    isBlocked: null,
  });

  const getProfile = async (id, accessToken) => {
    if (!id || !accessToken) {
      console.log("fallo un parametro");
    }
    const url = URL + `/users/${id}`;

    axios
      .get(url, {
        headers: {
          token: accessToken,
        },
      })
      .then((res) => {
        const { id, name, last_name, roles, is_blocked, address } = res.data;
        const split_address = address.split(";");
        const defaultAddress = {
          location: split_address[0],
          lat: parseFloat(split_address[1]),
          long: parseFloat(split_address[2]),
        };

        setProfile({
          id: id,
          name: name,
          lastName: last_name,
          isDriver: roles.includes("Driver"),
          isBlocked: is_blocked,
          defaultAddress: defaultAddress,
        });
      })
      .catch((err) => {
        console.log("error in getProfile", err);
      });
  };

  const getPassengerBalance = async (accessToken) => {
    const url = URL + `/users/passenger/balance`;

    axios
      .get(url, {
        headers: {
          token: accessToken,
        },
      })
      .then((res) => {
        // seteo el balance
      })
      .catch((err) => {
        console.log("error in getBalance", err);
      });
  };

  const editProfile = async (data, accessToken) => {
    const url = URL + `/users/passenger/${profile.id}`;
    const location =
      String(data.location) + ";" + String(data.lat) + ";" + String(data.long);

    await axios
      .put(
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
      )
      .catch((err) => {
        console.log("Error in edit profile: ", err);
      });

    getProfile(profile?.id, accessToken);
  };

  const completeDriverForm = async (accessToken, profile, data) => {
    const url = URL + `/users/driver/${profile.id}`;

    axios.post(
      url,
      {
        name: profile.name,
        last_name: profile.lastName,
        roles: ["Driver"],
        car: {
          model: data.model,
          year: data.year,
          plaque: data.plaque,
          capacity: data.capacity,
        },
      },
      {
        headers: {
          token: accessToken,
        },
      }
    );

    await getProfile(profile.id, accessToken);
  };

  const memoedValue = useMemo(
    () => ({
      profile,
      getProfile,
      editProfile,
      completeDriverForm,
    }),
    [profile, getProfile, editProfile, completeDriverForm]
  );

  return (
    <AuthProfileContext.Provider value={memoedValue}>
      {children}
    </AuthProfileContext.Provider>
  );
}

export default function useAuthProfile() {
  return useContext(AuthProfileContext);
}
