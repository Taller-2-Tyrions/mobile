import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";

const DriverRow = ({ driver, selectedDriver, setSelectedDriver }) => {
  return (
    <TouchableOpacity
      style={
        selectedDriver && selectedDriver.id === driver.id
          ? styles.containerSelectedRow
          : styles.containerRow
      }
      onPress={() => setSelectedDriver(driver)}
    >
      <Image
        style={styles.imageRow}
        source={require("../../assets/images/UberX.jpeg")}
      />

      <View style={styles.middleContainerRow}>
        <Text style={styles.typeRow}>
          {driver.name} {driver.last_name}
        </Text>
        <Text>
          <Ionicons name="person" size={12} /> {driver.car.capacity}
          {"  "}
          <Ionicons name="time" size={12} />8 min
        </Text>
        <TouchableOpacity style={styles.infoButtonRow}>
          <Text style={styles.infoRow}>
            <Ionicons name="information-circle-outline" size={16} /> Más
            información
          </Text>
        </TouchableOpacity>
        <Text style={styles.priceRow}>
          Precio estimado: ${driver.prices.Standard.toFixed(2)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default DriverRow;
