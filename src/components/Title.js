import React from "react";
import { StyleSheet, Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";

const Title = ({ title }) => {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.titleText}>{title}</Text>
    </View>
  );
};

export default Title;

const styles = StyleSheet.create({
  titleContainer: {
    padding: 10,
  },
  titleText: {
    fontFamily: "uber1",
    fontSize: 40,
  },
});
