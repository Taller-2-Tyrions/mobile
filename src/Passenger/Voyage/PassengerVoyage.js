import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import usePassenger from "../usePassenger";
import {
  FontAwesome5,
  Ionicons,
  FontAwesome,
  AntDesign,
} from "@expo/vector-icons";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { mapDarkStyle } from "../../Components/MapStyles";
import { DriverMarker } from "../../Components/markers";
import { formatDate } from "../../Components/formatDate";

const GOOGLE_MAPS_APIKEY = "AIzaSyCeWGHDDYw0J5rRmoQSwJGlmfO6tlmiutc";

const PassengerVoyage = () => {
  const navigation = useNavigation();
  const {
    voyageStatus,
    getVoyageStatus,
    driverLocation,
    getDriverLocation,
    clearVoyage,
    driverProfile,
    getDriverProfile,
    cancelVoyage,
  } = usePassenger();

  const goHome = () => {
    if (voyageStatus) clearVoyage();
    navigation.navigate("HomePassenger");
  };

  const onCancel = () => {
    cancelVoyage();
  };

  useEffect(() => {
    if (!voyageStatus) {
      goHome();
      return;
    }

    if (
      voyageStatus?.status !== "FINISHED" &&
      voyageStatus?.status !== "CANCELLED"
    ) {
      const timer = setInterval(() => getVoyageStatus(), 2000);
      return () => clearInterval(timer);
    }
  }, [voyageStatus]);

  useEffect(() => {
    const timer = setInterval(() => getDriverLocation(), 5000);
    return () => clearInterval(timer);
  }, [driverLocation]);

  useEffect(() => {
    if (!driverProfile) {
      const timer = setInterval(
        () => getDriverProfile(voyageStatus?.driver_id),
        2000
      );
      return () => clearInterval(timer);
    }
  }, [driverProfile]);

  if (!driverLocation || !driverProfile) {
    return (
      <View style={tw`h-full w-full bg-white`}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <Text style={{ fontSize: 30, fontFamily: "uber1" }}>
            Cargando viaje...
          </Text>
        </View>
      </View>
    );
  }
  if (voyageStatus?.status === "STARTING") {
    // renderizo recorrido del conductor hasta la casa
    // del pasajero.
    return (
      <DriverToInit
        driverLocation={driverLocation}
        init={voyageStatus?.init}
        end={voyageStatus?.end}
        driverProfile={driverProfile}
        price={voyageStatus?.price}
        onCancel={onCancel}
      />
    );
  } else if (voyageStatus?.status === "ARRIVING") {
    // renderizo un pop up de que llegó el conductor.
    return <DriverArriving />;
  } else if (voyageStatus?.status === "TRAVELLING") {
    // renderizo viaje hasta destino.
    return (
      <DriverToEnd
        driverLocation={driverLocation}
        end={voyageStatus?.end}
        price={voyageStatus?.price}
        onCancel={onCancel}
      />
    );
  } else if (voyageStatus?.status === "FINISHED") {
    // pop-up para calificar y botón para ir a home.
    return <VoyageFinished goHome={goHome} />;
  } else {
    // está en CANCELLED.
    // pop-up diciendo que se canceló el viaje y botón para ir a
    // home.
    return <VoyageCancelled goHome={goHome} />;
  }
};

const DriverToInit = ({
  driverLocation,
  init,
  end,
  driverProfile,
  price,
  onCancel,
}) => {
  const [voyage, setVoyage] = useState(null);

  const onDirectionFound = (event) => {
    const now = new Date();
    const arrival = new Date(now.getTime() + event.duration * 60000);
    const arrivalTime = formatDate(arrival, "hh:mm");
    setVoyage(arrivalTime);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.container2}>
          <FontAwesome5 name="car-side" size={20} color="black" />
          <View style={styles.line} />
          <Ionicons name="person" size={20} color="black" />
          <View style={styles.line} />
          <FontAwesome name="map-marker" size={20} color="black" />
        </View>
        <View style={styles.container3}>
          <Text style={styles.textStyle3}>
            {driverProfile.name} te recoge en un {driverProfile.car.model}{" "}
            aprox.
          </Text>
        </View>
        <View style={styles.container1}>
          <Text style={styles.textStyle}>{voyage}</Text>
        </View>
      </View>
      <MapView
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        style={styles.map}
        initialRegion={{
          latitude: driverLocation?.latitude,
          longitude: driverLocation?.longitude,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0321,
        }}
        customMapStyle={mapDarkStyle}
      >
        <MapViewDirections
          origin={driverLocation}
          destination={init}
          apikey={GOOGLE_MAPS_APIKEY}
          onReady={onDirectionFound}
          strokeWidth={5}
          strokeColor="white"
        />
        <MapViewDirections
          origin={init}
          destination={end}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={5}
          strokeColor="gray"
          lineDashPattern={[10]}
        />
        <DriverMarker position={driverLocation} />
        <Marker title={"Tu ubicación"} coordinate={init} />
        <Marker title={"Destino"} coordinate={end} />
      </MapView>
      <TouchableOpacity
        style={{ ...styles.button, backgroundColor: "#ff7573" }}
        onPress={onCancel}
      >
        <Text style={styles.textButton}>Cancelar</Text>
      </TouchableOpacity>
      <View style={styles.bottomContainer}>
        <Text style={styles.textStyle4}>Total</Text>
        <Text style={styles.textStyle4}>${price}</Text>
      </View>
    </View>
  );
};

const DriverArriving = () => {
  return (
    <View
      style={[
        tw`h-full w-full bg-gray-400`,
        { justifyContent: "center", alignItems: "center" },
      ]}
    >
      <View style={styles.arrivingContainer}>
        <Text style={styles.textStyle}>
          Miguel está llegando a tu ubicación.
        </Text>
        <Text style={[styles.textStyle2]}>
          El viaje comenzará una vez que te subas al vehículo.
        </Text>
      </View>
    </View>
  );
};

const DriverToEnd = ({ driverLocation, end, price, onCancel }) => {
  const [voyage, setVoyage] = useState(null);

  const onDirectionFound = (event) => {
    const now = new Date();
    const arrival = new Date(now.getTime() + event.duration * 60000);
    const arrivalTime = formatDate(arrival, "hh:mm");
    setVoyage(arrivalTime);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.container2}>
          <FontAwesome5 name="car-side" size={20} color="black" />
          <View style={[styles.line, styles.lineComplete]} />
          <Ionicons name="person" size={20} color="black" />
          <View style={styles.line} />
          <FontAwesome name="map-marker" size={20} color="black" />
        </View>
        <View style={styles.container3}>
          <Text style={styles.textStyle3}>Llegás a destino aprox.</Text>
        </View>
        <View style={styles.container1}>
          <Text style={styles.textStyle}>{voyage}</Text>
        </View>
      </View>
      <MapView
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        style={styles.map}
        initialRegion={{
          latitude: driverLocation?.latitude,
          longitude: driverLocation?.longitude,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0321,
        }}
        customMapStyle={mapDarkStyle}
      >
        <MapViewDirections
          origin={driverLocation}
          destination={end}
          apikey={GOOGLE_MAPS_APIKEY}
          onReady={onDirectionFound}
          strokeWidth={5}
          strokeColor="white"
        />

        <DriverMarker position={driverLocation} />
        <Marker title={"Destino"} coordinate={end} />
      </MapView>
      <TouchableOpacity
        style={{ ...styles.button, backgroundColor: "#ff7573" }}
        onPress={onCancel}
      >
        <Text style={styles.textButton}>Cancelar</Text>
      </TouchableOpacity>
      <View style={styles.bottomContainer}>
        <Text style={styles.textStyle4}>Total</Text>
        <Text style={styles.textStyle4}>${price}</Text>
      </View>
    </View>
  );
};

const VoyageFinished = ({ goHome }) => {
  return (
    <View
      style={[
        tw`h-full w-full bg-gray-400`,
        { justifyContent: "center", alignItems: "center" },
      ]}
    >
      <View style={styles.arrivingContainer}>
        <Text style={styles.textStyle}>El viaje ha finalizado.</Text>
        <TouchableOpacity onPress={goHome}>
          <AntDesign
            style={tw`p-2 bg-black rounded-full`}
            name="arrowright"
            size={50}
            color="white"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const VoyageCancelled = ({ goHome }) => {
  return (
    <View
      style={[
        tw`h-full w-full bg-gray-400`,
        { justifyContent: "center", alignItems: "center" },
      ]}
    >
      <View style={styles.arrivingContainer}>
        <Text style={styles.textStyle}>El viaje ha sido cancelado.</Text>
        <TouchableOpacity onPress={goHome}>
          <AntDesign
            style={tw`p-2 bg-black rounded-full`}
            name="arrowright"
            size={50}
            color="white"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PassengerVoyage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  topContainer: {
    width: "100%",
    height: "20%",
    padding: 15,
  },
  container1: {
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
  container2: {
    marginTop: 15,
    flexDirection: "row",
    marginHorizontal: 10,
    alignItems: "center",
  },
  container3: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 18,
    flexDirection: "row",
    marginHorizontal: 10,
  },
  map: {
    width: "100%",
    height: "72%",
  },
  bottomContainer: {
    width: "100%",
    height: "8%",
    padding: 15,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  textStyle: {
    fontFamily: "uber1",
    fontSize: 24,
  },
  textStyle2: {
    fontFamily: "uber2",
    fontSize: 18,
  },
  textStyle3: {
    fontFamily: "uber2",
    fontSize: 16,
  },
  textStyle4: {
    fontFamily: "uber1",
    fontSize: 20,
  },
  line: {
    width: "30%",
    height: "70%",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 10,
    marginHorizontal: 20,
  },
  lineComplete: {
    backgroundColor: "#39cb5b",
  },
  button: {
    position: "absolute",
    width: 300,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    bottom:
      Dimensions.get("window").height - Dimensions.get("window").height * 0.9,
    left: Dimensions.get("window").width / 8,
  },
  textButton: {
    fontSize: 24,
    color: "white",
    fontFamily: "uber1",
  },
  arrivingContainer: {
    height: "30%",
    width: "80%",
    backgroundColor: "white",
    borderRadius: 15,
    justifyContent: "space-around",
    alignItems: "center",
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 15,
  },
});
