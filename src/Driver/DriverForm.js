import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import { AntDesign } from "@expo/vector-icons";
import { useForm } from "react-hook-form";
import { CustomInput } from "../Home/Login";
import useDriver from "./useDriver";

const DriverForm = () => {
  const { control, handleSubmit } = useForm();
  const { completeDriverForm } = useDriver();

  const onSubmitPressed = async (data) => {
    completeDriverForm(data);
  };

  return (
    <View style={styles.container}>
      <Title />
      <View style={styles.contentContainer}>
        <CustomInput
          name="model"
          placeholder="Modelo"
          control={control}
          rules={{
            required: "(*) Campo requerido",
          }}
          textStyle={styles.inputText}
          containerStyle={{ marginBottom: 10 }}
        />

        <CustomInput
          name="year"
          placeholder="Año"
          control={control}
          rules={{
            required: "(*) Campo requerido",
          }}
          textStyle={styles.inputText}
          containerStyle={{ marginBottom: 10 }}
        />

        <CustomInput
          name="plaque"
          placeholder="Patente"
          control={control}
          rules={{
            required: "(*) Campo requerido",
          }}
          textStyle={styles.inputText}
          containerStyle={{ marginBottom: 10 }}
        />

        <CustomInput
          name="capacity"
          placeholder="Capacidad"
          control={control}
          rules={{
            required: "(*) Campo requerido",
          }}
          textStyle={styles.inputText}
          containerStyle={{ marginBottom: 10 }}
        />
      </View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity onPress={handleSubmit(onSubmitPressed)}>
          <AntDesign
            style={tw`p-2 bg-black rounded-full`}
            name="arrowright"
            size={60}
            color="white"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DriverForm;

const Title = () => {
  return (
    <View style={tw`p-10`}>
      <Text style={styles.titleText}>Completá datos de tu vehículo</Text>
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
    height: "50%",
    padding: 5,
    marginLeft: 15,
    marginTop: 15,
  },
  bottomContainer: {
    width: "100%",
    height: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
  titleStyle: {
    fontFamily: "uber1",
    fontSize: 28,
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
