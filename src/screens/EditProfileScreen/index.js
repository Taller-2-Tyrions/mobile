import React from "react";
import { View, Text, Pressable } from "react-native";
import styles from "./styles";
import { useForm } from "react-hook-form";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import useAuth from "../../hooks/useAuth";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const { control, handleSubmit } = useForm();
  //const { user, editProfile } = useAuth();

  const onSubmitPressed = async (data) => {
    console.log("New data: ", data);
    navigation.navigate("ProfileScreen");
    //editProfile(user.accessToken, data);
  };

  return (
    <SafeAreaView style={styles.root}>
      <Pressable style={styles.popupContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Editar perfil</Text>
        </View>

        <View style={styles.formContainer}>
          <CustomInput
            name="name"
            placeholder="Nuevo nombre"
            control={control}
            rules={{
              required: "First name is required",
            }}
          />

          <CustomInput
            name="lastname"
            placeholder="Nuevo apellido"
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
    </SafeAreaView>
  );
};

export default EditProfileScreen;
