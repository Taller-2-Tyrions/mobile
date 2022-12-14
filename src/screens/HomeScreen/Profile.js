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
import useAuthProfile from "../../hooks/useAuthProfile";
import useAuth from "../../hooks/useAuth";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import PlaceRow from "../../components/FormPopUp/PlaceRow";

const Profile = ({ profileVisible, setProfileVisible }) => {
  const { profile, editProfile } = useAuthProfile();
  const { user } = useAuth();
  const [name, setName] = useState(profile.name);
  const [lastName, setLastName] = useState(profile.lastName);
  const [defaultAddress, setDefaultAddress] = useState(profile.defaultAddress);

  const onClose = () => {
    setProfileVisible(!profileVisible);
    if (
      name === profile.name &&
      lastName === profile.lastName &&
      defaultAddress === profile.defaultAddress
    ) {
      return;
    }

    const data = {
      name: name,
      lastname: lastName,
      location: defaultAddress.location,
      lat: defaultAddress.lat,
      long: defaultAddress.long,
    };

    editProfile(data, user.accessToken);
  };

  const isVip = false;
  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={profileVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setProfileVisible(!profileVisible);
        }}
      >
        <View style={styles.container}>
          <View style={styles.modalView}>
            <View style={styles.modalContainerTop}>
              <View style={{ width: "50%" }}>
                <Text style={styles.modalText}>Tu perfil</Text>
              </View>
              <View style={styles.closeButton}>
                <TouchableOpacity style={{ padding: 5 }} onPress={onClose}>
                  <AntDesign name="closecircleo" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.modalContainerButton}>
              <TextProfile text={name} setText={setName} />
              <TextProfile text={lastName} setText={setLastName} />
              <DirectionProfile
                address={defaultAddress}
                setAddress={setDefaultAddress}
              />
              {isVip ? (
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Text style={[styles.vipText, { color: "black" }]}>
                    Sos pasajero vip
                  </Text>
                </View>
              ) : (
                <TouchableOpacity style={styles.vipContainer}>
                  <Text style={styles.vipText}>Suscribirse a vip</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const TextProfile = ({ text, setText }) => {
  const [edit, setEdit] = useState(false);

  return (
    <View style={{ flexDirection: "row" }}>
      <View style={{ width: "80%" }}>
        {edit ? (
          <TextInput
            style={styles.inputText}
            onChangeText={setText}
            value={text}
          />
        ) : (
          <Text style={styles.profileText}>{text}</Text>
        )}
      </View>
      <View style={styles.editButton}>
        <TouchableOpacity onPress={() => setEdit(!edit)}>
          {edit ? (
            <AntDesign name="checkcircle" size={24} color="black" />
          ) : (
            <FontAwesome name="pencil" size={24} color="black" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const DirectionProfile = ({ address, setAddress }) => {
  const [edit, setEdit] = useState(false);

  return (
    <View style={{ flexDirection: "row" }}>
      <View style={{ width: "80%" }}>
        {edit ? (
          <GooglePlacesAutocomplete
            placeholder="Ingresá una ubicación favorita"
            onPress={(data, details = null) => {
              var description;
              if (data.description) {
                description = data.description;
              } else {
                description = data.vicinity;
              }
              setAddress({
                location: description,
                lat: details.geometry.location.lat,
                long: details.geometry.location.lng,
              });
            }}
            suppressDefaultStyles
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
        ) : (
          <Text style={styles.profileText}>{address.location}</Text>
        )}
      </View>
      <View style={[styles.editButton]}>
        <TouchableOpacity onPress={() => setEdit(!edit)}>
          {edit ? (
            <AntDesign name="checkcircle" size={24} color="black" />
          ) : (
            <FontAwesome name="pencil" size={24} color="black" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
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
    width: "90%",
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
    width: "50%",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  editButton: {
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
  vipContainer: {
    borderRadius: 25,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  vipText: {
    fontFamily: "uber2",
    color: "white",
    fontSize: 20,
    margin: 7,
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
