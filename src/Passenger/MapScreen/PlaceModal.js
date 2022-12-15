import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  TextInput,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { AntDesign } from "@expo/vector-icons";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import PlaceRow from "./PlaceRow";
import styles from "./styles";
import usePassenger from "../usePassenger";

const PlaceModal = ({ modalVisible, setModalVisible, text, isOrigin }) => {
  const { passengerProfile, setOrigin, setDestination } = usePassenger();

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={stylesSelf.container}>
          <View style={stylesSelf.modalView}>
            <View style={stylesSelf.modalContainerTop}>
              <View style={{ width: "80%" }}>
                <Text style={stylesSelf.modalText}>{text}</Text>
              </View>
              <View style={stylesSelf.closeButton}>
                <TouchableOpacity
                  style={{ padding: 5 }}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <AntDesign name="closecircleo" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={stylesSelf.modalContainerButton}>
              <TextModal
                setPlace={isOrigin ? setOrigin : setDestination}
                profile={passengerProfile}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const TextModal = ({ setPlace, profile }) => {
  if (!profile) return;

  return (
    <View style={{ flexDirection: "row" }}>
      <View style={{ width: "90%" }}>
        <GooglePlacesAutocomplete
          placeholder="Buscá una ubicación"
          onPress={(data, details = null) => {
            var description;
            if (data.description) {
              description = data.description;
            } else {
              description = data.vicinity;
            }
            setPlace({
              description: description,
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
            });
          }}
          suppressDefaultStyles
          //currentLocation={true}
          //currentLocationLabel="Ubicación actual"
          enablePoweredByContainer={false}
          styles={{
            textInput: styles.textInput,
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
      </View>
    </View>
  );
};

export default PlaceModal;

const stylesSelf = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#00000099",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: "absolute",
    top: 100,
  },
  modalContainerTop: {
    flexDirection: "row",
  },
  modalText: {
    fontFamily: "uber1",
    fontSize: 24,
    padding: 15,
  },
  closeButton: {
    width: "20%",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  modalContainerButton: {
    padding: 15,
  },
  profileText: {
    fontFamily: "uber2",
    fontSize: 20,
    marginBottom: 10,
  },
  okButton: {
    paddingTop: 5,
    marginLeft: 5,
  },
});
