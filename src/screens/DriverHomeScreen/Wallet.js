import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { AntDesign } from "@expo/vector-icons";
import useBalance from "../../hooks/useBalance";

const Wallet = ({ walletVisible, setWalletVisible }) => {
  const { driverBalance } = useBalance();

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
              <Text style={styles.balanceText}>Balance: ${driverBalance}</Text>
              <InputText placeholder={"Id para extracción"} />
              <InputText placeholder={"Monto de extracción"} />
              <TouchableOpacity
                style={{
                  marginTop: 10,
                  left: Dimensions.get("window").width / 2 - 60,
                }}
              >
                <AntDesign
                  style={tw`p-2 bg-black rounded-full w-10 mt-4`}
                  name="arrowright"
                  size={24}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Wallet;

const InputText = ({ placeholder }) => {
  return (
    <View style={tw`mt-5`}>
      <TextInput placeholder={placeholder} style={styles.inputText} />
    </View>
  );
};

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
  balanceText: {
    fontFamily: "uber2",
    fontSize: 22,
    marginBottom: 10,
  },
  inputText: {
    borderBottomWidth: 2,
    borderBottomColor: "black",
    width: "90%",
    fontFamily: "uber2",
    fontSize: 20,
    marginTop: 5,
  },
});
