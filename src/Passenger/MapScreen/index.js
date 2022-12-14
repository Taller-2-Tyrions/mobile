import { TouchableOpacity, View, Text, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import styles from "./styles";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import tw from "tailwind-react-native-classnames";
import PlaceModal from "./PlaceModal";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { mapDarkStyle } from "../../Components/MapStyles";
import { useNavigation } from "@react-navigation/native";
import usePassenger from "../usePassenger";

const GOOGLE_MAPS_APIKEY = "AIzaSyCeWGHDDYw0J5rRmoQSwJGlmfO6tlmiutc";

const MapScreen = () => {
  const { origin, destination, passengerLocation, getPassengerLocation } =
    usePassenger();
  const [modalOrigin, setModalOrigin] = useState(false);
  const [modalDestination, setModalDestination] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    if (!passengerLocation) {
      const timer = setInterval(() => getPassengerLocation(), 2000);
      return () => clearInterval(timer);
    }
  }, [passengerLocation]);

  const pickDrivers = () => {
    navigation.navigate("PickDriver");
  };

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={{ flex: 1, flexDirection: "column" }}>
        <Title navigation={navigation} />
        <View style={styles.container}>
          <InputPlace
            place={origin}
            defaultText={"Lugar de origen"}
            modalVisible={modalOrigin}
            setModalVisible={setModalOrigin}
          />

          <InputPlace
            place={destination}
            defaultText={"Lugar de destino"}
            modalVisible={modalDestination}
            setModalVisible={setModalDestination}
          />
        </View>
        <View style={{ height: "100%" }}>
          <MapRoute
            origin={origin}
            destination={destination}
            userPosition={passengerLocation}
          />
        </View>
        {origin && destination && (
          <TouchableOpacity
            style={{
              position: "absolute",
              bottom: 20,
              left: Dimensions.get("window").width / 2 - 20,
            }}
            onPress={pickDrivers}
          >
            <AntDesign name="checkcircle" size={60} color="#39cb5b" />
          </TouchableOpacity>
        )}
      </View>
      <PlaceModal
        isOrigin={true}
        modalVisible={modalOrigin}
        setModalVisible={setModalOrigin}
        text={"Lugar de origen"}
      />

      <PlaceModal
        isOrigin={false}
        modalVisible={modalDestination}
        setModalVisible={setModalDestination}
        text={"Lugar de destino"}
      />
    </SafeAreaView>
  );
};

const Title = ({ navigation }) => {
  return (
    <View style={[tw`p-2 mt-2`, { flexDirection: "row" }]}>
      <View style={{ width: "20%", marginTop: 6 }}>
        <TouchableOpacity onPress={() => navigation.navigate("HomePassenger")}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: "80%",
        }}
      >
        <Text style={styles.titleStyle}>Mapa de viajes</Text>
      </View>
    </View>
  );
};

const InputPlace = ({ place, defaultText, setModalVisible }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        marginTop: 10,
        marginLeft: 15,
        width: "90%",
        borderRadius: 25,
        backgroundColor: "black",
      }}
    >
      <View style={{ width: "80%", padding: 5, marginLeft: 10 }}>
        <Text style={{ color: "white", fontFamily: "uber2" }}>
          {place ? place.description : defaultText}
        </Text>
      </View>
      <View
        style={{
          width: "16%",
          flexDirection: "row",
          justifyContent: "flex-end",
          padding: 5,
          borderLeftColor: "white",
          borderLeftWidth: 1,
        }}
      >
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          {place ? (
            <FontAwesome name="pencil" size={24} color="white" />
          ) : (
            <AntDesign name="pluscircleo" size={24} color="white" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const MapRoute = ({ origin, destination, userPosition }) => {
  if (!userPosition) {
    return (
      <View
        style={[tw`h-full w-full justify-center`, { alignItems: "center" }]}
      >
        <Text style={{ fontFamily: "uber2", fontSize: 22 }}>Cargando mapa</Text>
      </View>
    );
  }

  if (origin && destination) {
    return (
      <MapView
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        customMapStyle={mapDarkStyle}
        style={styles.map}
        initialRegion={{
          latitude: origin.lat,
          longitude: origin.long,
          latitudeDelta: 0.0522,
          longitudeDelta: 0.0521,
        }}
      >
        <MapViewDirections
          origin={{
            latitude: origin.lat,
            longitude: origin.long,
          }}
          destination={{
            latitude: destination.lat,
            longitude: destination.long,
          }}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={5}
          strokeColor="white"
        />
        <Marker
          title={"Origin"}
          coordinate={{
            latitude: origin.lat,
            longitude: origin.long,
          }}
        />
        <Marker
          title={"Destination"}
          coordinate={{
            latitude: destination.lat,
            longitude: destination.long,
          }}
        />
      </MapView>
    );
  } else {
    return (
      <MapView
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        customMapStyle={mapDarkStyle}
        style={styles.map}
        initialRegion={{
          latitude: userPosition.latitude,
          longitude: userPosition.longitude,
          latitudeDelta: 0.0522,
          longitudeDelta: 0.0521,
        }}
      ></MapView>
    );
  }
};

export default MapScreen;
