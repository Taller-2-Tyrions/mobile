import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import usePassenger from "./usePassenger";
import { VoyageCancelled } from "./Test2";

const Test = () => {
  const navigation = useNavigation();
  const { voyageStatus, cancelRequest, clearVoyage } = usePassenger();
  const [loading, setLoading] = useState(false);

  const goHome = () => {
    if (voyageStatus) clearVoyage();
    navigation.navigate("Home");
  };

  const sendCancel = () => {
    setLoading(true);
    cancelRequest();
  };

  if (voyageStatus?.status === "CANCELLED" || !voyageStatus) {
    return <VoyageCancelled goHome={goHome} />;
  } else {
    return (
      <View style={tw`h-full w-full bg-red-100`}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
          }}
        >
          {loading ? (
            <Text style={{ fontSize: 30 }}>Cancelando request...</Text>
          ) : (
            <TouchableOpacity onPress={sendCancel} style={tw`bg-red-300`}>
              <Text style={{ fontSize: 30 }}>Cancelar</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
};

export default Test;
