import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import tw from "tailwind-react-native-classnames";

const OkButton = ({ isGreen, onPress, size, style }) => {
  return (
    <View style={style ? style : styles.okButtonContainer}>
      <TouchableOpacity onPress={onPress}>
        {isGreen ? (
          <AntDesign
            name="checkcircle"
            size={size ? size : 60}
            color="#39cb5b"
          />
        ) : (
          <AntDesign
            style={tw`p-2 bg-black rounded-full`}
            name="arrowright"
            size={size ? size : 46}
            color="white"
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default OkButton;

const styles = StyleSheet.create({
  okButtonContainer: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
    /*borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "gray",*/
  },
});
