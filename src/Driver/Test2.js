import { useNavigation } from "@react-navigation/native";
import useDriver from "./useDriver";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { mapDarkStyle } from "./MapStyles";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { DriverMarker } from "./markers";

const GOOGLE_MAPS_APIKEY = "AIzaSyCeWGHDDYw0J5rRmoQSwJGlmfO6tlmiutc";

const Map = () => {
  const navigation = useNavigation();
  const {
    voyageStatus,
    getVoyageStatus,
    position,
    replyVoyageRequest,
    getPosition,
    startVoyage,
    endVoyage,
    cancelVoyage,
    clearDriver,
  } = useDriver();

  useEffect(() => {
    if (!position) {
      getPosition();
      return;
    }

    if (
      voyageStatus?.status !== "FINISHED" &&
      voyageStatus?.status !== "CANCELLED"
    ) {
      const timer = setInterval(() => {
        getVoyageStatus();
        getPosition();
      }, 2000);
      return () => clearInterval(timer);
    }
  }, [voyageStatus, position]);

  const onAccept = () => {
    replyVoyageRequest(true);
  };
  const onDecline = () => {
    replyVoyageRequest(false);
  };
  const onCancel = () => {
    cancelVoyage();
  };
  const onFinish = () => {
    endVoyage();
  };
  const goHome = () => {
    clearDriver();
    navigation.navigate("Home");
  };

  if (voyageStatus?.status === "WAITING") {
    // renderizo pop-up para aceptar o rechazar
    return <PassengerRequest onAccept={onAccept} onDecline={onDecline} />;
  } else if (voyageStatus?.status === "STARTING") {
    // pantalla de chofer yendo a cliente
    return (
      <DriverToInit
        driverLocation={position}
        clientLocation={voyageStatus.init}
        destination={voyageStatus.end}
        onCancel={onCancel}
      />
    );
  } else if (voyageStatus?.status === "ARRIVING") {
    // permitir botón de empezar viaje
    return <DriverArriving startVoyage={startVoyage} />;
  } else if (voyageStatus?.status === "TRAVELLING") {
    // chofer yendo a destino
    return (
      <DriverToEnd
        driverLocation={position}
        destination={voyageStatus.end}
        onCancel={onCancel}
        onFinish={onFinish}
      />
    );
  } else if (voyageStatus?.status === "FINISHED") {
    // pop-up de que terminó el viaje
    return <VoyageFinished goHome={goHome} />;
  } else if (voyageStatus?.status === "CANCELLED") {
    // pop-up de que se canceló el viaje
    return <VoyageCancelled goHome={goHome} />;
  } else {
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
          <Text style={{ fontSize: 30 }}>Cargando viaje...</Text>
        </View>
      </View>
    );
  }
};

const PassengerRequest = ({ onAccept, onDecline }) => {
  return (
    <View>
      <View style={requestStyles.requestContainer}>
        <View style={[requestStyles.modalView, tw`rounded-full`]}>
          <CountdownCircleTimer
            isPlaying
            duration={40}
            colors={"black"}
            size={320}
            strokeLinecap="butt"
            colorsTime={[7, 5, 2, 0]}
            onComplete={onDecline}
          >
            {({ remainingTime }) => (
              <View style={[requestStyles.countdown, tw`rounded-full`]}>
                <Text style={requestStyles.text}>Solicitud de viaje</Text>
                <View style={tw`flex-row p-2`}>
                  <TouchableOpacity style={tw`mr-2`} onPress={onAccept}>
                    <AntDesign name="checkcircle" size={70} color="#39cb5b" />
                  </TouchableOpacity>
                  <TouchableOpacity style={tw`ml-2`} onPress={onDecline}>
                    <AntDesign name="closecircle" size={70} color="#ff7573" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </CountdownCircleTimer>
        </View>
      </View>
    </View>
  );
};

const DriverToInit = ({
  driverLocation,
  clientLocation,
  destination,
  onCancel,
}) => {
  const [order, setOrder] = useState(null);

  const onDirectionFound = (event) => {
    setOrder({
      ...order,
      distance: event.distance,
      duration: event.duration,
    });
  };

  return (
    <View style={driverToInitStyles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        style={driverToInitStyles.map}
        initialRegion={{
          latitude: driverLocation.latitude,
          longitude: driverLocation.longitude,
          latitudeDelta: 0.0122,
          longitudeDelta: 0.0121,
        }}
        customMapStyle={mapDarkStyle}
      >
        <MapViewDirections
          origin={driverLocation}
          onReady={onDirectionFound}
          destination={clientLocation}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={5}
          strokeColor="white"
        />
        <MapViewDirections
          origin={clientLocation}
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={5}
          strokeColor="gray"
          lineDashPattern={[10]}
        />
        <DriverMarker position={driverLocation} />
        <Marker title={"Tu ubicación"} coordinate={clientLocation}>
          <Ionicons name="person-circle" size={45} color="#5DECFA" />
        </Marker>
        <Marker title={"Destino"} coordinate={destination} />
      </MapView>
      <View>
        <View style={driverToInitStyles.distanceContainer}>
          <Text style={driverToInitStyles.distanceText}>
            {order?.distance} km
          </Text>
        </View>
        <TouchableOpacity
          style={{ ...driverToInitStyles.button, backgroundColor: "#ff7573" }}
          onPress={onCancel}
        >
          <Text style={driverToInitStyles.textButton}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const DriverArriving = ({ startVoyage }) => {
  return (
    <View
      style={[
        tw`h-full w-full bg-gray-400`,
        { justifyContent: "center", alignItems: "center" },
      ]}
    >
      <View style={driverArrivingStyles.arrivingContainer}>
        <Text style={driverArrivingStyles.textStyle}>
          Llegando a la ubicación de Pedro.
        </Text>
        <TouchableOpacity onPress={startVoyage}>
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

const DriverToEnd = ({ driverLocation, destination, onCancel, onFinish }) => {
  const [order, setOrder] = useState(null);

  const onDirectionFound = (event) => {
    setOrder({
      ...order,
      distance: event.distance,
      duration: event.duration,
    });
  };

  return (
    <View style={driverToInitStyles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        style={driverToInitStyles.map}
        initialRegion={{
          latitude: driverLocation.latitude,
          longitude: driverLocation.longitude,
          latitudeDelta: 0.0122,
          longitudeDelta: 0.0121,
        }}
        customMapStyle={mapDarkStyle}
      >
        <MapViewDirections
          origin={driverLocation}
          onReady={onDirectionFound}
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={5}
          strokeColor="white"
        />
        <DriverMarker position={driverLocation} />
        <Marker title={"Destino"} coordinate={destination} />
      </MapView>
      <View>
        <View style={driverToInitStyles.distanceContainer}>
          <Text style={driverToInitStyles.distanceText}>
            {order?.distance} km
          </Text>
        </View>
        {order?.distance > 0.1 ? (
          <TouchableOpacity
            style={{ ...driverToInitStyles.button, backgroundColor: "#ff7573" }}
            onPress={onCancel}
          >
            <Text style={driverToInitStyles.textButton}>Cancelar</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{ ...driverToInitStyles.button, backgroundColor: "#1495ff" }}
            onPress={onFinish}
          >
            <Text style={driverToInitStyles.textButton}>Finalizar viaje</Text>
          </TouchableOpacity>
        )}
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
      <View style={driverArrivingStyles.arrivingContainer}>
        <Text style={driverArrivingStyles.textStyle}>
          El viaje ha finalizado.
        </Text>
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

const VoyageCancelled = ({ goHome }) => {
  return (
    <View
      style={[
        tw`h-full w-full bg-gray-400`,
        { justifyContent: "center", alignItems: "center" },
      ]}
    >
      <View style={driverArrivingStyles.arrivingContainer}>
        <Text style={driverArrivingStyles.textStyle}>
          El viaje ha sido cancelado.
        </Text>
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

export default Map;

const requestStyles = StyleSheet.create({
  requestContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: "#00000099",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "black",
  },
  modalContainerTop: {
    flexDirection: "row",
  },
  text: {
    fontFamily: "uber1",
    fontSize: 24,
    padding: 15,
    color: "white",
  },
  closeButton: {
    width: "20%",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  countdown: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

const driverToInitStyles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  cancelContainer: {
    height: Dimensions.get("window").height * 0.075,
    backgroundColor: "#ff7573",
    justifyContent: "center",
    alignItems: "center",
  },
  cancelText: {
    fontSize: 24,
    color: "white",
    fontFamily: "uber1",
  },
  map: {
    flex: 1,
    width: Dimensions.get("window").width,
  },
  button: {
    position: "absolute",
    width: 300,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    bottom: 40,
    left: Dimensions.get("window").width / 8,
  },
  textButton: {
    fontSize: 24,
    color: "white",
    fontFamily: "uber1",
  },
  distanceContainer: {
    position: "absolute",
    width: 300,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    bottom: 700,
    left: Dimensions.get("window").width / 8,
    flexDirection: "row",
  },
  distanceText: {
    fontSize: 26,
    fontFamily: "uber1",
    color: "white",
  },
});

const driverArrivingStyles = StyleSheet.create({
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
