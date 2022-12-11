import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import { AntDesign } from "@expo/vector-icons";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { useNavigation } from "@react-navigation/native";
import useDriver from "../../hooks/useDriver";

const PassengerRequest = () => {
  const navigation = useNavigation();
  const { status, replyVoyageRequest } = useDriver();
  const [modalVisible, setModalVisible] = useState(true);

  const onDecline = () => {
    if (status) {
      console.log("Rechazando viaje...");
      setModalVisible(false);
      replyVoyageRequest(status.Voyage, false);
    }
  };

  const onAccept = () => {
    if (status) {
      console.warn("Todavía no está implementado...");
    }
  };

  useEffect(() => {
    if (!status) {
      navigation.navigate("DriverScreen");
    }
  }, [status]);

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          //setCarVisible(!carVisible);
        }}
      >
        <View style={styles.container}>
          <View style={[styles.modalView, tw`rounded-full`]}>
            <CountdownCircleTimer
              isPlaying
              duration={40}
              colors={"black"}
              size={320}
              strokeLinecap="butt"
              colorsTime={[7, 5, 2, 0]}
              onComplete={onDecline}
            >
              {({ remainingTime }) => (
                <View style={[styles.countdown, tw`rounded-full`]}>
                  <Text style={styles.text}>Solicitud de viaje</Text>
                  <View style={tw`flex-row p-2`}>
                    <TouchableOpacity style={tw`mr-2`} onPress={onAccept}>
                      <AntDesign name="checkcircle" size={70} color="#39cb5b" />
                    </TouchableOpacity>
                    <TouchableOpacity style={tw`ml-2`} onPress={onDecline}>
                      <AntDesign name="closecircle" size={70} color="#ff7573" />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </CountdownCircleTimer>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PassengerRequest;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#00000099",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "black",
  },
  modalContainerTop: {
    flexDirection: "row",
  },
  text: {
    fontFamily: "uber1",
    fontSize: 24,
    padding: 15,
    color: "white",
  },
  closeButton: {
    width: "20%",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  countdown: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
