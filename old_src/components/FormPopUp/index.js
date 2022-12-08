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
    const data_aux = {
      name: data.name,
      lastname: data.lastname,
      location: originPlace.description,
      lat: originPlace.lat,
      long: originPlace.long,
    };
    completeForm(user.accessToken, data_aux);
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
          <Text style={styles.title}>Complete your profile</Text>
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
              var description;
              if (data.description) {
                description = data.description;
              } else {
                description = data.vicinity;
              }
              console.log("details: ", details.geometry.location);
              setOriginPlace({
                description: description,
                lat: details.geometry.location.lat,
                long: details.geometry.location.lng,
              });
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

          <View style={styles.buttonContainer}>
            <CustomButton
              text="Finish"
              position="absolute"
              bottom={0}
              onPress={handleSubmit(onSubmitPressed)}
              disabled={disabled}
            />
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default FormPopUp;
