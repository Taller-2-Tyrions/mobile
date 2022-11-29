import React from "react";
import { Text, View } from "react-native";
import styles from "./styles";
import Loading from "../../components/Loading";

const WaitingDriverScreen = () => {
  return (
    <Loading
      typeLoading="chofer"
      textLoading="Esperando respuesta del chofer"
    />
  );
};

export default WaitingDriverScreen;
