import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import tw from "tailwind-react-native-classnames";
import { AntDesign } from "@expo/vector-icons";
import { useForm } from "react-hook-form";
import CustomInput from "../../components/CustomInput";
import useAuth from "../../hooks/useAuth";
import useAuthProfile from "../../hooks/useAuthProfile";

const DriverForm = () => {
  const { control, handleSubmit } = useForm();
  const { user } = useAuth();
  const { completeDriverForm } = useAuthProfile();

  const onSubmitPressed = async (data) => {
    completeDriverForm(user.accessToken, data);
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
          <AntDesign name="checkcircle" size={60} color="#39cb5b" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DriverForm;

const Title = () => {
  return (
    <View style={[tw`p-2 mt-2`, { flexDirection: "row" }]}>
      <View style={{ width: "20%", marginTop: 6 }}>
        <TouchableOpacity>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: "80%",
        }}
      >
        <Text style={styles.titleStyle}>Completá los datos de tu vehículo</Text>
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
    marginTop: 15,
  },
  bottomContainer: {
    width: "100%",
    height: "15%",
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
