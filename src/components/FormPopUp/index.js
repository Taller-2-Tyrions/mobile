import { Text, View, Pressable } from "react-native";
import React from "react";
import styles from "./styles";
import { useForm } from "react-hook-form";
import CustomInput from "../CustomInput";
import CustomButton from "../CustomButton";
import useAuth from "../../hooks/useAuth";

const FormPopUp = () => {
  const { control, handleSubmit } = useForm();
  const { user, completeForm } = useAuth();

  const onSubmitPressed = async (data) => {
    completeForm(user.accessToken, data);
  };

  return (
    <View style={styles.root}>
      <Pressable style={styles.popupContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Completá los siguientes datos</Text>
        </View>

        <View style={styles.formContainer}>
          <CustomInput
            name="name"
            placeholder="First name"
            control={control}
            rules={{
              required: "First name is required",
            }}
          />

          <CustomInput
            name="lastname"
            placeholder="Last name"
            control={control}
            rules={{
              required: "Last name is required",
            }}
          />

          <CustomInput
            name="defaultAddress"
            placeholder="Default address"
            control={control}
            rules={{
              required: "Default address is required",
            }}
          />

          <CustomButton
            text="Finalizar"
            onPress={handleSubmit(onSubmitPressed)}
          />
        </View>
      </Pressable>
    </View>
  );
};

export default FormPopUp;
