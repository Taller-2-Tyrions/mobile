import React, { useEffect } from "react";
import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import usePassenger from "../usePassenger";

const Wallet = ({ walletVisible, setWalletVisible }) => {
  const { passengerBalance, getPassengerBalance } = usePassenger();

  useEffect(() => {
    if (!passengerBalance) {
      const timer = setInterval(() => getPassengerBalance(), 2000);
      return () => clearInterval(timer);
    }
  }, [passengerBalance]);

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={walletVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setWalletVisible(!walletVisible);
        }}
      >
        {passengerBalance ? (
          <View style={styles.container}>
            <View style={styles.modalView}>
              <View style={styles.modalContainerTop}>
                <View style={{ width: "50%" }}>
                  <Text style={styles.modalText}>Tu billetera</Text>
                </View>
                <View style={styles.closeButton}>
                  <TouchableOpacity
                    style={{ padding: 5 }}
                    onPress={() => setWalletVisible(!walletVisible)}
                  >
                    <AntDesign name="closecircleo" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.modalContainerButton}>
                <Text style={styles.walletText}>
                  {passengerBalance.address}
                </Text>
                <Text style={styles.walletText}>
                  Balance: ${passengerBalance.balance}
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <View
            style={[
              styles.container,
              { justifyContent: "center", alignItems: "center" },
            ]}
          >
            <View
              style={{
                height: "20%",
                width: "80%",
                backgroundColor: "#00000099",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 40,
                padding: 2,
              }}
            >
              <Text
                style={{ fontFamily: "uber1", fontSize: 30, color: "white" }}
              >
                Cargando billetera
              </Text>
            </View>
          </View>
        )}
      </Modal>
    </View>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#00000099",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: "absolute",
    top: 100,
  },
  modalContainerTop: {
    flexDirection: "row",
  },
  modalText: {
    fontFamily: "uber1",
    fontSize: 24,
    padding: 15,
  },
  closeButton: {
    width: "50%",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  modalContainerButton: {
    padding: 15,
  },
  walletText: {
    fontFamily: "uber2",
    fontSize: 20,
    marginBottom: 10,
  },
});
