import { View, Text } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import styles from "./styles";

const Loading = () => {
  return (
    <View style={styles.loadingContainer}>
      <LottieView
        source={require("../../assets/images/loading.json")}
        autoPlay
        loop
      />
      <Text style={styles.textStyle}>loading...</Text>
    </View>
  );
};

export default Loading;
