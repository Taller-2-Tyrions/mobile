import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import { AntDesign } from "@expo/vector-icons";

const DriverForm = () => {
  return (
    <View style={styles.container}>
      <Title />
      <View style={styles.contentContainer}>
        <InputText
          title={"Modelo de tu vehículo"}
          placeholder={"Ejemplo: Ford Fiesta"}
        />
        <Patente />
        <Year />
        <Capacity />
      </View>
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 20,
          left: Dimensions.get("window").width / 2 - 20,
        }}
      >
        <AntDesign name="checkcircle" size={60} color="#39cb5b" />
      </TouchableOpacity>
    </View>
  );
};

export default DriverForm;

const Title = () => {
  return (
    <View style={tw`p-10`}>
      <Text style={styles.titleText}>Completá tu perfil de chofer</Text>
    </View>
  );
};

const InputText = ({ title, placeholder }) => {
  return (
    <View style={tw`mb-10`}>
      <Text style={styles.inputTitle}>{title}</Text>
      <TextInput placeholder={placeholder} style={styles.inputText} />
    </View>
  );
};

const Patente = () => {
  return (
    <View style={styles.inputRow}>
      <View style={{ width: "30%" }}>
        <Text style={styles.inputTitle}>Patente</Text>
      </View>
      <View style={{ width: "77%" }}>
        <TextInput placeholder={"Ejemplo: ABC123"} style={styles.inputText} />
      </View>
    </View>
  );
};

const Year = () => {
  return (
    <View style={styles.inputRow}>
      <View style={{ width: "30%" }}>
        <Text style={styles.inputTitle}>Año</Text>
      </View>
      <View style={{ width: "77%" }}>
        <TextInput placeholder={"Ejemplo: 2010"} style={styles.inputText} />
      </View>
    </View>
  );
};

const Capacity = () => {
  return (
    <View style={styles.inputRow}>
      <View style={{ width: "40%" }}>
        <Text style={styles.inputTitle}>Capacidad</Text>
      </View>
      <View style={{ width: "66%" }}>
        <TextInput placeholder={"Ejemplo: 5"} style={styles.inputText} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  titleText: {
    fontFamily: "uber1",
    fontSize: 40,
  },
  contentContainer: {
    width: "100%",
    height: "70%",
    padding: 5,
    marginLeft: 15,
  },
  inputTitle: {
    fontFamily: "uber2",
    fontSize: 24,
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
  inputRow: {
    flexDirection: "row",
    width: "90%",
    marginBottom: 15,
  },
});
