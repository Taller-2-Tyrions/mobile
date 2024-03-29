import React, { useState, useEffect } from "react";
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
import useDriver from "../useDriver";

const CarSettings = ({ carVisible, setCarVisible }) => {
  const {
    driverProfile,
    editDriverProfile,
    getDriverProfile,
    suscribeVip,
    unsuscribeVip,
  } = useDriver();
  const [model, setModel] = useState(null);
  const [year, setYear] = useState(null);
  const [plaque, setPlaque] = useState(null);
  const [capacity, setCapacity] = useState(null);

  const onClose = () => {
    setCarVisible(!carVisible);
    if (
      model === driverProfile.car.model &&
      year === driverProfile.car.year &&
      plaque === driverProfile.car.plaque &&
      capacity === driverProfile.car.capacity
    ) {
      return;
    }

    const data = {
      model: model,
      year: year,
      plaque: plaque,
      capacity: capacity,
    };

    editDriverProfile(data);
  };

  useEffect(() => {
    if (!driverProfile) {
      const timer = setInterval(() => getDriverProfile(), 2000);
      return () => clearInterval(timer);
    } else {
      setModel(driverProfile.car.model);
      setYear(driverProfile.car.year);
      setPlaque(driverProfile.car.plaque);
      setCapacity(driverProfile.car.capacity);
    }
  }, [driverProfile]);

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
        {driverProfile ? (
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
                {driverProfile?.is_vip ? (
                  <TouchableOpacity
                    onPress={() => unsuscribeVip()}
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Text style={[styles.vipText, { color: "black" }]}>
                      Desuscribirse a vip
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.vipContainer}
                    onPress={() => suscribeVip()}
                  >
                    <Text style={styles.vipText}>Suscribirse a vip</Text>
                  </TouchableOpacity>
                )}
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
                Cargando perfil
              </Text>
            </View>
          </View>
        )}
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
