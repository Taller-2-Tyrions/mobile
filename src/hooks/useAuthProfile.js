import React, { useState, useMemo, createContext, useContext } from "react";
import axios from "axios";

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
    const url = `https://fiuber-gateway.herokuapp.com/users/${id}`;

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

        console.log("Roles: ", roles);

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

  const completeDriverForm = async (accessToken, profile, data) => {
    const url = `https://fiuber-gateway.herokuapp.com/users/driver/${profile.id}`;

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
      completeDriverForm,
    }),
    [profile, getProfile, completeDriverForm]
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
