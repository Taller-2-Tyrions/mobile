import React from "react";
import { View } from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import { Entypo, Feather, FontAwesome5 } from "@expo/vector-icons";
import useAuthProfile from "../../hooks/useAuthProfile";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const { profile } = useAuthProfile();
  const navigation = useNavigation();

  const goToEditProfileScreen = () => {
    navigation.navigate("EditProfileScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <Avatar.Image
            source={{
              uri: "https://api.adorable.io/avatars/80/abott@adorable.png",
            }}
            size={80}
          />
          <View style={{ marginLeft: 20 }}>
            <Title
              style={[
                styles.title,
                {
                  marginTop: 15,
                  marginBottom: 5,
                },
              ]}
            >
              {profile.name} {profile.lastName}
            </Title>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Entypo name="location" size={24} color="black" />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            {profile.defaultAddress}
          </Text>
        </View>
        <View style={styles.row}>
          <Text>{profile.isDriver ? "Sos chófer" : "No sos chófer"}</Text>
        </View>
      </View>

      <View style={styles.infoBoxWrapper}>
        <View
          style={[
            styles.infoBox,
            {
              borderRightColor: "#dddddd",
              borderRightWidth: 1,
            },
          ]}
        >
          <Title>$140.50</Title>
          <Caption>Billetera</Caption>
        </View>
        <View style={styles.infoBox}>
          <Title>12</Title>
          <Caption>Viajes</Caption>
        </View>
      </View>

      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Entypo name="star" size={24} color="black" />
            <Text style={styles.menuItemText}>Tus destinos favoritos</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <FontAwesome5 name="history" size={24} color="black" />
            <Text style={styles.menuItemText}>Historial de viajes</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={goToEditProfileScreen}>
          <View style={styles.menuItem}>
            <Feather name="settings" size={25} color="black" />
            <Text style={styles.menuItemText}>Editar perfil</Text>
          </View>
        </TouchableRipple>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
