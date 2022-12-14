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
import LastTrips from "./LastTrips";
import { Ionicons, Entypo } from "@expo/vector-icons";
import Wallet from "./Wallet";
import Profile from "./Profile";
import { useNavigation } from "@react-navigation/native";
import usePassenger from "../usePassenger";
import useUser from "../../useUser";

// si llega acá es porque la última actividad fue de pasajero
// sí o sí.
const HomePassenger = () => {
  const navigation = useNavigation();
  const [walletVisible, setWalletVisible] = useState(false);
  const [profileVisible, setProfileVisible] = useState(false);
  const { voyageStatus, voyageId, setPassengerProfile, setPassengerBalance } =
    usePassenger();

  const onPressProfile = () => {
    setPassengerProfile(null);
    setProfileVisible(true);
  };

  const onPressWallet = () => {
    setPassengerBalance(null);
    setWalletVisible(true);
  };

  // el que me dice a qué pantalla tengo que ir
  useEffect(() => {
    // la idea sería que una pantalla antes de esta
    // tire el status, y si el status del pasajero es !== "CHOOSING"
    // entonces vengo acá, con el voyageId seteado en lo que me tire
    // el getPassengerStatus.
    if (!voyageId) return;

    if (voyageStatus?.status === "WAITING") {
      navigation.navigate("Test1");
    } else {
      navigation.navigate("Test2");
    }
  }, [voyageStatus, voyageId]);

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <ScrollView
        style={styles.container}
        keyboardShouldPersistTaps="always"
        listViewDisplayed={false}
      >
        <Title onPressProfile={onPressProfile} onPressWallet={onPressWallet} />
        <NavOptions />
        <LastTrips />
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
