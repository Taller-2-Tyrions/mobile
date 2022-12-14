import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import tw from "tailwind-react-native-classnames";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { useForm } from "react-hook-form";
import { CustomInput } from "./Login";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import useUser from "../useUser";
import { useNavigation } from "@react-navigation/native";

const PassengerForm = () => {
  const navigation = useNavigation();
  const { control, handleSubmit } = useForm();
  const { completePassengerForm } = useUser();
  const [originPlace, setOriginPlace] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (originPlace) {
      setDisabled(false);
    }
  }, [originPlace]);

  useEffect(() => {
    if (error) {
      navigation.navigate("Root");
    }
  }, [error]);

  const onSubmitPressed = async (data) => {
    const data_aux = {
      name: data.name,
      lastname: data.lastname,
      location: originPlace.description,
      lat: originPlace.lat,
      long: originPlace.long,
    };
    completePassengerForm(data_aux, setError);
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
            required: "(*) Campo obligatorio",
          }}
          textStyle={styles.inputText}
          containerStyle={{ marginBottom: 20 }}
        />

        <CustomInput
          name="lastname"
          placeholder="Ingresá tu apellido"
          control={control}
          rules={{
            required: "(*) Campo obligatorio",
          }}
          textStyle={styles.inputText}
          containerStyle={{ marginBottom: 20 }}
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
            <AntDesign
              style={tw`p-2 bg-black rounded-full`}
              name="arrowright"
              size={60}
              color="white"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const PlaceRow = ({ data }) => {
  return (
    <View style={placeRowStyles.row}>
      <View style={placeRowStyles.iconContainer}>
        <Entypo name="location-pin" size={20} color={"white"} />
      </View>
      <Text styles={placeRowStyles.locationText}>
        {data.description || data.vicinity}
      </Text>
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
    height: "63%",
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

const placeRowStyles = StyleSheet.create({
  root: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 20,
    height: "100%",
    justifyContent: "space-between",
    backgroundColor: "#00000099",
  },
  popupContainer: {
    height: Dimensions.get("window").height - 70,
    backgroundColor: "white",
    top: 50,
    borderRadius: 10,
  },
  title: {
    alignItems: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#051C60",
    margin: 20,
  },
  formContainer: {
    height: Dimensions.get("window").height - 200,
    marginHorizontal: 15,
  },
  titleContainer: {
    alignItems: "center",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  textInput: {
    padding: 10,
    backgroundColor: "#eee",
    marginVertical: 5,
  },
  autocompleteContainer: {
    position: "absolute",
    top: 0,
    left: 10,
    right: 10,
  },
  listView: {
    position: "absolute",
    top: 55,
  },
  separator: {
    backgroundColor: "#efefef",
    height: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  iconContainer: {
    backgroundColor: "#a2a2a2",
    padding: 5,
    borderRadius: 50,
    marginRight: 15,
  },
  locationText: {},
});
