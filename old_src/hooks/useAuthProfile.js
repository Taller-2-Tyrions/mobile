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
  const [driverFormCompleted, setDriverFormCompleted] = useState(false);
  const [carData, setCarData] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [calification, setCalification] = useState(null);

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

  // obtener la info de mi auto
  const getDriverProfile = async (accessToken) => {
    const url = URL + `/users/driver/${profile.id}`;

    axios
      .get(url, {
        headers: {
          token: accessToken,
        },
      })
      .then((res) => {
        const { car, reviews, calification } = res.data;
        setCarData(car);
        setReviews(reviews);
        setCalification(calification);
      })
      .catch((err) => {
        console.log("error in getDriverProfile", err);
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

  const editDriverProfile = async (data, accessToken) => {
    console.log("Datos acá", data);
    const url = URL + `/users/driver/${profile.id}`;

    await axios
      .put(
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
      )
      .catch((err) => {
        console.log("Error in edit driver profile: ", err);
      });

    getDriverProfile(accessToken);
  };

  const completeDriverForm = async (accessToken, data) => {
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

    setDriverFormCompleted(true);
    await getProfile(profile.id, accessToken);
  };

  const cleanAuthProfile = () => {
    setProfile({
      id: null,
      name: null,
      lastName: null,
      defaultAddress: null,
      isDriver: null,
      isBlocked: null,
    });
  };

  const memoedValue = useMemo(
    () => ({
      profile,
      getProfile,
      editProfile,
      completeDriverForm,
      cleanAuthProfile,
      driverFormCompleted,
      carData,
      reviews,
      calification,
      getDriverProfile,
      editDriverProfile,
    }),
    [
      profile,
      getProfile,
      editProfile,
      completeDriverForm,
      cleanAuthProfile,
      driverFormCompleted,
      carData,
      reviews,
      calification,
      getDriverProfile,
      editDriverProfile,
    ]
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
