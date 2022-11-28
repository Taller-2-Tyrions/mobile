import React, { useState } from "react";
import { View, Text, Pressable, TouchableOpacity } from "react-native";
import styles from "./styles";
import { useForm } from "react-hook-form";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import useAuth from "../../hooks/useAuth";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import useAuthProfile from "../../hooks/useAuthProfile";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import PlaceRow from "./PlaceRow";
import { MaterialIcons } from "@expo/vector-icons";

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const { control, handleSubmit } = useForm();
  const { editProfile } = useAuth();
  const { profile } = useAuthProfile();
  const [newAddress, setNewAddress] = useState(profile.defaultAddress);

  const onSubmitPressed = async (data) => {
    await editProfile(data, newAddress);
    navigation.navigate("ProfileScreen");
  };

  const onCancelPressed = () => {
    navigation.navigate("ProfileScreen");
  };

  return (
    <SafeAreaView style={styles.root}>
      <Pressable style={styles.popupContainer}>
        <TouchableOpacity onPress={onCancelPressed}>
          <View
            style={{
              position: "absolute",
              left: 725,
            }}
          >
            <MaterialIcons name="cancel" size={30} color="black" />
          </View>
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Editar perfil</Text>
        </View>

        <View style={styles.formContainer}>
          <CustomInput
            name="name"
            placeholder="Nuevo nombre"
            control={control}
            defaultValue={profile.name}
            rules={{
              required: "First name is required",
            }}
          />

          <CustomInput
            name="lastname"
            placeholder="Nuevo apellido"
            control={control}
            defaultValue={profile.lastName}
            rules={{
              required: "Last name is required",
            }}
          />

          <GooglePlacesAutocomplete
            placeholder="Default address"
            onPress={(data, details = null) => {
              if (data.description) {
                setNewAddress(data.description);
              } else {
                setNewAddress(data.vicinity);
              }
            }}
            suppressDefaultStyles
            currentLocation={true}
            currentLocationLabel="Ubicación actual"
            enablePoweredByContainer={false}
            styles={{
              textInput: styles.textInput,
              listView: styles.listView,
              separator: styles.separator,
            }}
            fetchDetails
            query={{
              key: "AIzaSyCeWGHDDYw0J5rRmoQSwJGlmfO6tlmiutc",
              language: "es",
              components: "country:ar",
            }}
            renderRow={(data) => <PlaceRow data={data} />}
            renderDescription={(data) => data.description || data.vicinity}
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
