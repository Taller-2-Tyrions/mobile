import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";

const data = [
  {
    id: "1",
    tipName: "Hasta Lanús",
  },
  {
    id: "2",
    tipName: "Hasta Lomás de Zamora",
  },
  {
    id: "3",
    tipName: "Hasta Lanús",
  },
  {
    id: "4",
    tipName: "Hasta Lomás de Zamora",
  },
  {
    id: "5",
    tipName: "Hasta Lanús",
  },
  {
    id: "6",
    tipName: "Hasta Lomás de Zamora",
  },
];

const LastTrips = () => {
  return (
    <View style={tw`mt-4 h-80`}>
      <Text style={styles.titleText}>Tus últimos viajes</Text>
      <View style={tw`pt-5 w-full`}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          horizontal
          renderItem={({ item }) => (
            <View style={[tw`p-2 pl-6 pb-8 pt-4 m-2 w-60`, styles.trip]}>
              <Text>{item.tipName}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default LastTrips;

const styles = StyleSheet.create({
  container: {},
  titleText: {
    fontFamily: "uber1",
    fontSize: 24,
  },
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
  },
});
