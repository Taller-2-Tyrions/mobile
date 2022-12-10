import React, {
  useState,
  useEffect,
  useMemo,
  createContext,
  useContext,
} from "react";
import axios from "axios";
import { URL } from "../configUrl";
import useAuth from "./useAuth";

const PassengerContext = createContext({});

export function PassengerProvider({ children }) {
  const { user } = useAuth();

  const memoedValue = useMemo(() => ({}), []);

  return (
    <PassengerContext.Provider value={memoedValue}>
      {children}
    </PassengerContext.Provider>
  );
}

export default function usePassenger() {
  return useContext(PassengerContext);
}
