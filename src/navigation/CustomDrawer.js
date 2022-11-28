import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  TouchableOpacity,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import useAuthProfile from "../hooks/useAuthProfile";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";

const CustomDrawer = (props) => {
  const { profile } = useAuthProfile();
  const { logout } = useAuth();
  const navigation = useNavigation();

  const goToProfileScreen = () => {
    navigation.navigate("ProfileScreen");
  };

  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          backgroundColor: "#212121",
          padding: 15,
        }}
      >
        {/* User Row */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {/* Acá debería ir la img */}
          <View
            style={{
              backgroundColor: "#cacaca",
              width: 50,
              height: 50,
              borderRadius: 25,
              marginRight: 10,
            }}
          />

          <View>
            <Text style={{ color: "white", fontSize: 24 }}>
              {profile.name} {profile.lastName}
            </Text>
            <Text style={{ color: "lightgrey" }}>5.00 *</Text>
          </View>
        </View>

        <View
          style={{
            borderBottomWidth: 1,
            borderTopWidth: 1,
            borderBottomColor: "#919191",
            borderTopColor: "#919191",
            paddingVertical: 5,
            marginVertical: 10,
          }}
        >
          <Pressable onPress={goToProfileScreen}>
            <Text style={{ color: "#dddddd", paddingVertical: 5 }}>
              Profile settings
            </Text>
          </Pressable>
        </View>
      </View>

      <DrawerItemList {...props} />

      {/* Botón de logout */}
      <View
        style={{
          borderBottomWidth: 1,
          borderTopWidth: 1,
          borderBottomColor: "#919191",
          borderTopColor: "#919191",
          paddingVertical: 5,
          marginVertical: 10,
          backgroundColor: "#F98080",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            logout();
          }}
        >
          <Text style={{ paddingVertical: 5 }}>Logout</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({});
