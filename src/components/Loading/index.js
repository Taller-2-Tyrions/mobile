import { View, Text } from "react-native";
import React, { useEffect } from "react";
import LottieView from "lottie-react-native";
import styles from "./styles";

const Loading = ({
  typeLoading = "loading",
  textLoading = "Cargando contenido...",
}) => {
  const getImage = () => {
    switch (typeLoading) {
      case "chofer":
        return require("../../assets/images/chofer.json");
      default:
        return require("../../assets/images/loading.json");
    }
  };

  return (
    <View style={styles.loadingContainer}>
      <LottieView source={getImage()} autoPlay loop />
      <View style={styles.textContainer}>
        <Text style={styles.textStyle}>{textLoading}</Text>
      </View>
    </View>
  );
};

export default Loading;
