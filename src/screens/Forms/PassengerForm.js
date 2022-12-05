import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import tw from "tailwind-react-native-classnames";
import { AntDesign } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import CustomInput from "../../components/CustomInput";
import useAuth from "../../hooks/useAuth";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import PlaceRow from "../../components/FormPopUp/PlaceRow";

const PassengerForm = () => {
  const { control, handleSubmit } = useForm();
  const { user, completeForm } = useAuth();
  const [originPlace, setOriginPlace] = useState(null);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (originPlace) {
      setDisabled(false);
    }
  }, [originPlace]);

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

  return (
    <View style={styles.container}>
      <Title />
      <View style={styles.contentContainer}>
        <CustomInput
          name="name"
          placeholder="Ingresá tu nombre"
          control={control}
          rules={{
            required: "Campo obligatorio",
          }}
          textStyle={styles.inputText}
          containerStyle={{ marginBottom: 10 }}
        />

        <CustomInput
          name="lastname"
          placeholder="Ingresá tu apellido"
          control={control}
          rules={{
            required: "Campo requerido",
          }}
          textStyle={styles.inputText}
          containerStyle={{ marginBottom: 10 }}
        />

        <GooglePlacesAutocomplete
          placeholder="Ingresá una ubicación favorita"
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
            textInput: styles.inputText,
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
      </View>
      <View style={styles.bottomContainer}>
        {!disabled && (
          <TouchableOpacity onPress={handleSubmit(onSubmitPressed)}>
            <AntDesign name="checkcircle" size={60} color="#39cb5b" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default PassengerForm;

const Title = () => {
  return (
    <View style={tw`p-10`}>
      <Text style={styles.titleText}>Completá tu perfil</Text>
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
    height: "65%",
    padding: 5,
    marginLeft: 15,
  },
  bottomContainer: {
    width: "100%",
    height: "10%",
    justifyContent: "center",
    alignItems: "center",
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
