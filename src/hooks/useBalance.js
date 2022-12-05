import React, {
  useState,
  useEffect,
  useMemo,
  createContext,
  useContext,
} from "react";
import axios from "axios";
import { URL } from "../configUrl";

const BalanceContext = createContext({});

export function BalanceProvider({ children }) {
  const [passengerBalance, setPassengerBalance] = useState({
    address: null,
    balance: null,
  });
  const [driverBalance, setDriverBalance] = useState(null);

  const getPassengerBalance = async (accessToken) => {
    const url = URL + `/users/passenger/balance`;

    axios
      .get(url, {
        headers: {
          token: accessToken,
        },
      })
      .then((res) => {
        const { balance, address } = res.data;
        setPassengerBalance({ address: address, balance: balance });
      })
      .catch((err) => {
        console.log("error in getBalance", err);
      });
  };

  const memoedValue = useMemo(
    () => ({
      passengerBalance,
      driverBalance,
      getPassengerBalance,
    }),
    [passengerBalance, driverBalance, getPassengerBalance]
  );

  return (
    <BalanceContext.Provider value={memoedValue}>
      {children}
    </BalanceContext.Provider>
  );
}

export default function useBalance() {
  return useContext(BalanceContext);
}
