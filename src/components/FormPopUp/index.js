import { Text, View, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./styles";
import { useForm } from "react-hook-form";
import CustomInput from "../CustomInput";
import CustomButton from "../CustomButton";
import useAuth from "../../hooks/useAuth";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import PlaceRow from "./PlaceRow";

const FormPopUp = () => {
  const { control, handleSubmit } = useForm();
  const { user, completeForm } = useAuth();
  const [originPlace, setOriginPlace] = useState(null);
  const [disabled, setDisabled] = useState(true);

  const onSubmitPressed = async (data) => {
    completeForm(user.accessToken, data, originPlace);
  };

  useEffect(() => {
    if (originPlace) {
      setDisabled(false);
    }
  }, [originPlace]);

  return (
    <View style={styles.root}>
      <Pressable style={styles.popupContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Complete this form with your data</Text>
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

          <GooglePlacesAutocomplete
            placeholder="Default address"
            onPress={(data, details = null) => {
              if (data.description) {
                console.log("desc:", data.description);
                setOriginPlace(data.description);
              } else {
                console.log("vic:", data.vicinity);
                setOriginPlace(data.vicinity);
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
              language: "en",
            }}
            renderRow={(data) => <PlaceRow data={data} />}
            renderDescription={(data) => data.description || data.vicinity}
          />

          <CustomButton
            text="Complete form"
            position="absolute"
            top={1050}
            onPress={handleSubmit(onSubmitPressed)}
            disabled={disabled}
          />
        </View>
      </Pressable>
    </View>
  );
};

export default FormPopUp;
