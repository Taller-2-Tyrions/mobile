import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import tw from "tailwind-react-native-classnames";
import useDriver from "./useDriver";
import { Title } from "./TripsDriver";
import uuid from "react-native-uuid";
import { AntDesign } from "@expo/vector-icons";

const CalificationsDriver = () => {
  const { driverProfile, getDriverProfile, setReviews, reviews } = useDriver();
  const navigation = useNavigation();

  useEffect(() => {
    if (!driverProfile) {
      setReviews(1);
      const timer = setInterval(() => getDriverProfile(), 2000);
      return () => clearInterval(timer);
    } else {
      const aux = driverProfile.reviews.map((r) => ({ ...r, id: uuid.v4() }));
      setReviews(aux);
    }
  }, [driverProfile]);

  if (!reviews || reviews === 1) {
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
            Cargando calificaciones...
          </Text>
        </View>
      </View>
    );
  } else {
    return (
      <View style={[tw`h-full w-full bg-white`, { padding: 10 }]}>
        <Title
          goBack={() => {
            setReviews(null);
            navigation.navigate("HomeDriver");
          }}
          text={"Tus calificaciones"}
        />
        <View
          style={{
            height: "100%",
            width: "100%",
            marginTop: 20,
            padding: 5,
          }}
        >
          <View
            style={[
              tw`flex-row`,
              { justifyContent: "center", alignItems: "center" },
            ]}
          >
            <Text style={{ fontSize: 30, fontFamily: "uber1" }}>
              {driverProfile.calification !== "No Calification"
                ? driverProfile.calification
                : "0 (sin calificaciones)"}
            </Text>
            <View style={{ justifyContent: "center", marginLeft: 2 }}>
              <AntDesign name="star" size={30} color="#f09f35" />
            </View>
          </View>

          <FlatList
            data={reviews}
            keyExtractor={(item) => {
              return item.reviews.comment + item.reviews.score;
            }}
            renderItem={({ item }) => (
              <View style={{ alignItems: "center" }}>
                <View style={[styles.trip]}>
                  <Text style={{ fontFamily: "uber2", fontSize: 24 }}>
                    "{item.reviews.comment}"
                  </Text>
                  <View style={tw`flex-row mt-2`}>
                    <Text style={{ fontFamily: "uber2" }}>
                      Puntuación: {item.reviews.score}
                    </Text>
                    <View style={{ justifyContent: "center", marginLeft: 2 }}>
                      <AntDesign name="star" size={16} color="#f09f35" />
                    </View>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    );
  }
};

export default CalificationsDriver;

const styles = StyleSheet.create({
  trip: {
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
    width: "99%",
    padding: 15,
    marginVertical: 20,
  },
});
