import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import tw from "tailwind-react-native-classnames";
import { SafeAreaView } from "react-native-safe-area-context";
import NavOptions from "./NavOptions";
import LastTrips from "./LastTrips";
import { Ionicons, Entypo } from "@expo/vector-icons";
import Wallet from "./Wallet";
import Profile from "./Profile";

const HomeScreen = () => {
  const [walletVisible, setWalletVisible] = useState(false);
  const [profileVisible, setProfileVisible] = useState(false);

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <ScrollView
        style={styles.container}
        keyboardShouldPersistTaps="always"
        listViewDisplayed={false}
      >
        <Title
          setProfileVisible={setProfileVisible}
          setWalletVisible={setWalletVisible}
        />
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

const Title = ({ setWalletVisible, setProfileVisible }) => {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.titleText}>Bienvenido</Text>
      <View style={styles.icons}>
        <TouchableOpacity
          style={tw`mt-3`}
          onPress={() => setWalletVisible(true)}
        >
          <Entypo name="wallet" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`mt-3 ml-2`}
          onPress={() => setProfileVisible(true)}
        >
          <Ionicons name="person-circle-outline" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

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
