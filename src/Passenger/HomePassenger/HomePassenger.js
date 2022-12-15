import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import tw from "tailwind-react-native-classnames";
import { SafeAreaView } from "react-native-safe-area-context";
import NavOptions from "./NavOptions";
import Logout from "./Logout";
import { Ionicons, Entypo } from "@expo/vector-icons";
import Wallet from "./Wallet";
import Profile from "./Profile";
import { useNavigation } from "@react-navigation/native";
import usePassenger from "../usePassenger";

// si llega acá es porque la última actividad fue de pasajero
// sí o sí.
const HomePassenger = () => {
  const navigation = useNavigation();
  const [walletVisible, setWalletVisible] = useState(false);
  const [profileVisible, setProfileVisible] = useState(false);
  const {
    getPassengerStatus,
    passengerStatus,
    setVoyageId,
    setPassengerProfile,
    setPassengerBalance,
    passengerProfile,
    getPassengerProfile,
  } = usePassenger();

  const onPressProfile = () => {
    setPassengerProfile(null);
    setProfileVisible(true);
  };

  const onPressWallet = () => {
    setPassengerBalance(null);
    setWalletVisible(true);
  };

  useEffect(() => {
    if (!passengerStatus || passengerStatus.Rol !== "Passenger") return;

    if (passengerStatus.Status !== "CHOOSING") {
      setVoyageId(passengerStatus.Voyage);
      navigation.navigate("SendRequest");
    }
  }, [passengerStatus]);

  useEffect(() => {
    if (!passengerStatus) {
      const timer = setInterval(() => getPassengerStatus(), 2000);
      return () => clearInterval(timer);
    }
  }, [passengerStatus]);

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <ScrollView
        style={styles.container}
        keyboardShouldPersistTaps="always"
        listViewDisplayed={false}
      >
        <Title onPressProfile={onPressProfile} onPressWallet={onPressWallet} />
        <NavOptions />
        <Logout />
        <Wallet
          walletVisible={walletVisible}
          setWalletVisible={setWalletVisible}
        />
        <Profile
          profileVisible={profileVisible}
          setProfileVisible={setProfileVisible}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const Title = ({ onPressWallet, onPressProfile }) => {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.titleText}>Bienvenido</Text>
      <View style={styles.icons}>
        <TouchableOpacity style={tw`mt-3`} onPress={onPressWallet}>
          <Entypo name="wallet" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={tw`mt-3 ml-2`} onPress={onPressProfile}>
          <Ionicons name="person-circle-outline" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomePassenger;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  titleContainer: {
    flexDirection: "row",
  },
  titleText: {
    fontFamily: "uber1",
    fontSize: 40,
  },
  icons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: 150,
  },
});
