import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import LottieView from "lottie-react-native";

const Loading = ({
  typeLoading = "loading",
  textLoading = "Cargando contenido...",
}) => {
  const getImage = () => {
    switch (typeLoading) {
      case "chofer":
        return require("../assets/images/radar1.json");
      default:
        return require("../assets/images/car-loading.json");
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

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 150,
  },
  textStyle: {
    fontFamily: "uber2",
    fontSize: 18,
  },
});
