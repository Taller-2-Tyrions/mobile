import { Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import usePassenger from "../usePassenger";
import { VoyageCancelled } from "./PassengerVoyage";

const WaitResponse = () => {
  const navigation = useNavigation();
  const { voyageStatus, cancelRequest, clearVoyage } = usePassenger();
  const [loading, setLoading] = useState(false);

  const goHome = () => {
    if (voyageStatus) clearVoyage();
    navigation.navigate("SendRequest");
  };

  const sendCancel = () => {
    setLoading(true);
    cancelRequest();
  };

  if (voyageStatus?.status === "CANCELLED" || !voyageStatus) {
    return <VoyageCancelled goHome={goHome} />;
  } else {
    return (
      <View style={[tw`h-full w-full`, { backgroundColor: "#000000" }]}>
        <View
          style={[
            tw`h-full w-full bg-gray-400`,
            { justifyContent: "center", alignItems: "center" },
          ]}
        >
          <View
            style={{
              height: "30%",
              width: "80%",
              backgroundColor: "white",
              borderRadius: 15,
              justifyContent: "space-around",
              alignItems: "center",
              padding: 15,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 15,
            }}
          >
            {loading ? (
              <Text
                style={{ fontSize: 30, fontFamily: "uber1", color: "white" }}
              >
                Cancelando request...
              </Text>
            ) : (
              <>
                <Text style={{ fontSize: 30, fontFamily: "uber1" }}>
                  Esperando respuesta
                </Text>
                <View
                  style={{ width: "100%", alignItems: "center", marginTop: 20 }}
                >
                  <TouchableOpacity
                    onPress={sendCancel}
                    style={{
                      backgroundColor: "black",
                      padding: 10,
                      borderRadius: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 26,
                        fontFamily: "uber1",
                        color: "white",
                      }}
                    >
                      Cancelar
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </View>
    );
  }
};

export default WaitResponse;
