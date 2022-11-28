import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import PlaceRow from "./PlaceRow";
import useAuthProfile from "../../hooks/useAuthProfile";

const SearchScreen = () => {
  const [originPlace, setOriginPlace] = useState(null);
  const [destinationPlace, setDestinationPlace] = useState(null);
  const navigation = useNavigation();
  const { profile } = useAuthProfile();

  const checkNavigation = () => {
    if (originPlace && destinationPlace) {
      console.log("Origen: ", originPlace.details);

      console.log("Destino: ", destinationPlace.details);

      /*console.log(
        "Destino: ",
        destinationPlace?.details?.geometry?.location ||
          destinationPlace?.data?.geometry?.location
      );*/
      navigation.navigate("ChooseDriverScreen", {
        originPlace,
        destinationPlace,
      });
    }
  };

  console.log("Default address: ", profile.defaultAddress);

  useEffect(() => {
    checkNavigation();
  }, [originPlace, destinationPlace]);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <GooglePlacesAutocomplete
          placeholder="Where from?"
          onPress={(data, details = null) => {
            setOriginPlace({ data, details });
          }}
          suppressDefaultStyles
          currentLocation={true}
          currentLocationLabel="Ubicación actual"
          enablePoweredByContainer={false}
          styles={{
            textInput: styles.textInput,
            container: styles.autocompleteContainer,
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
          predefinedPlaces={[
            {
              type: "favorite",
              description: profile.defaultAddress.location,
              geometry: {
                location: {
                  lat: profile.defaultAddress.lat,
                  lng: profile.defaultAddress.long,
                },
              },
            },
          ]}
        />

        <GooglePlacesAutocomplete
          placeholder="Where to?"
          onPress={(data, details = null) => {
            setDestinationPlace({ data, details });
          }}
          enablePoweredByContainer={false}
          suppressDefaultStyles
          styles={{
            textInput: styles.textInput,
            container: {
              ...styles.autocompleteContainer,
              top: 55,
            },
            separator: styles.separator,
          }}
          fetchDetails
          query={{
            key: "AIzaSyCeWGHDDYw0J5rRmoQSwJGlmfO6tlmiutc",
            language: "es",
            components: "country:ar",
          }}
          renderRow={(data) => <PlaceRow data={data} />}
          predefinedPlaces={[
            {
              type: "favorite",
              description: profile.defaultAddress.location,
              geometry: {
                location: {
                  lat: profile.defaultAddress.location.lat,
                  lng: profile.defaultAddress.location.long,
                },
              },
            },
          ]}
        />

        {/* Círculo al lado del "Where to?" */}
        <View style={styles.circle} />

        {/* Línea de puntos */}
        <View style={styles.line} />

        {/* Cuadrado al lado del "Where from?" */}
        <View style={styles.square} />
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;
