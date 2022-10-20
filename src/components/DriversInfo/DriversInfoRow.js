import React from "react";
import { View, Image, Text, Pressable } from "react-native";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";

const DriversInfoRow = ({ driver, selectedDriver, setSelectedDriver }) => {
  const selectRow = () => {
    setSelectedDriver({
      driver: driver,
      isSelected: !selectedDriver.isSelected,
    });
  };

  return (
    <Pressable
      style={[
        styles.container,
        selectedDriver.isSelected
          ? styles.containerSelected
          : styles.containerUnselected,
      ]}
      onPress={selectRow}
    >
      <Image
        style={styles.image}
        source={require("../../assets/images/UberX.jpeg")}
      />

      {/* Middle component view */}
      <View style={styles.middleContainer}>
        <Text style={styles.type}>
          {driver.name} {driver.last_name} <Ionicons name="person" size={16} />
          {driver.car.capacity}
        </Text>
        <Text style={styles.time}>8:03PM drop off</Text>
      </View>

      {/* Right component view */}
      <View style={styles.rightContainer}>
        <Ionicons name="pricetag" size={18} color="#42d742" />
        <Text style={styles.price}>
          est. ${driver.prices.Standard.toFixed(2)}
        </Text>
      </View>
    </Pressable>
  );
};

export default DriversInfoRow;
