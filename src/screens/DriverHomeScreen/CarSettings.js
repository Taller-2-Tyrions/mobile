import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  TextInput,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import useAuthProfile from "../../hooks/useAuthProfile";
import useAuth from "../../hooks/useAuth";

const CarSettings = ({ carVisible, setCarVisible }) => {
  const { carData, editDriverProfile } = useAuthProfile();
  const { user } = useAuth();
  const [model, setModel] = useState(carData.model);
  const [year, setYear] = useState(carData.year);
  const [plaque, setPlaque] = useState(carData.plaque);
  const [capacity, setCapacity] = useState(carData.capacity);

  const isVip = false;

  const onClose = () => {
    setCarVisible(!carVisible);
    if (
      model === carData.model &&
      year === carData.year &&
      plaque === carData.plaque &&
      capacity === carData.capacity
    ) {
      return;
    }

    const data = {
      model: model,
      year: year,
      plaque: plaque,
      capacity: capacity,
    };

    editDriverProfile(data, user.accessToken);
  };

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={carVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setCarVisible(!carVisible);
        }}
      >
        <View style={styles.container}>
          <View style={styles.modalView}>
            <View style={styles.modalContainerTop}>
              <View style={{ width: "50%" }}>
                <Text style={styles.modalText}>Datos de tu vehículo</Text>
              </View>
              <View style={styles.closeButton}>
                <TouchableOpacity style={{ padding: 5 }} onPress={onClose}>
                  <AntDesign name="closecircleo" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.modalContainerButton}>
              <TextCarSettings
                title={"Modelo"}
                text={model}
                setText={setModel}
              />
              <TextCarSettings title={"Año"} text={year} setText={setYear} />
              <TextCarSettings
                title={"Placa"}
                text={plaque}
                setText={setPlaque}
              />
              <TextCarSettings
                title={"Capacidad"}
                text={capacity}
                setText={setCapacity}
              />
              {isVip ? (
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Text style={[styles.vipText, { color: "black" }]}>
                    Sos chófer vip
                  </Text>
                </View>
              ) : (
                <TouchableOpacity style={styles.vipContainer}>
                  <Text style={styles.vipText}>Suscribirse a vip</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const TextCarSettings = ({ title, text, setText }) => {
  const [edit, setEdit] = useState(false);

  return (
    <View style={{ flexDirection: "row" }}>
      <View style={{ width: "40%" }}>
        <Text style={styles.profileText}>{title}</Text>
      </View>
      <View style={{ width: "40%" }}>
        {edit ? (
          <TextInput
            style={styles.inputText}
            onChangeText={setText}
            value={text}
          />
        ) : (
          <Text style={styles.profileText}>{text}</Text>
        )}
      </View>
      <View style={styles.editButton}>
        <TouchableOpacity onPress={() => setEdit(!edit)}>
          {edit ? (
            <AntDesign name="checkcircle" size={24} color="black" />
          ) : (
            <FontAwesome name="pencil" size={24} color="black" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CarSettings;

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
    width: "90%",
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
  editButton: {
    width: "20%",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  modalContainerButton: {
    padding: 15,
  },
  profileText: {
    fontFamily: "uber2",
    fontSize: 20,
    marginBottom: 10,
  },
  vipContainer: {
    borderRadius: 25,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  vipText: {
    fontFamily: "uber2",
    color: "white",
    fontSize: 20,
    margin: 7,
  },
  inputText: {
    borderBottomWidth: 2,
    borderBottomColor: "black",
    width: "90%",
    fontFamily: "uber2",
    fontSize: 20,
    marginTop: 5,
  },
  separator: {
    backgroundColor: "#efefef",
    height: 1,
  },
});
