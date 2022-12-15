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
import CarSettings from "./CarSettings";
import { useNavigation } from "@react-navigation/native";
import useDriver from "../useDriver";

const HomeDriver = () => {
  const navigation = useNavigation();
  const { status, setDriverProfile, setDriverBalance } = useDriver();
  const [walletVisible, setWalletVisible] = useState(false);
  const [carVisible, setCarVisible] = useState(false);

  useEffect(() => {
    if (!status) {
      navigation.navigate("Home");
    }
  }, [status]);

  const onPressProfile = () => {
    setDriverProfile(null);
    setCarVisible(true);
  };

  const onPressWallet = () => {
    setDriverBalance(null);
    setWalletVisible(true);
  };

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <ScrollView style={styles.container}>
        <Title onPressProfile={onPressProfile} onPressWallet={onPressWallet} />
        <NavOptions />
        <LastTrips />
        <Wallet
          walletVisible={walletVisible}
          setWalletVisible={setWalletVisible}
        />
        <CarSettings carVisible={carVisible} setCarVisible={setCarVisible} />
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
          <Ionicons name="car-sport-sharp" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeDriver;

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
