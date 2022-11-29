import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import useLocation from "../../hooks/useLocation";
import useAuth from "../../hooks/useAuth";
import styles from "./styles";
import DriverRow from "./DriverRow";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";

const DriversOptions = ({ setSearchDrivers, origin, destination }) => {
  const [selectedDriver, setSelectedDriver] = useState(null);
  const { drivers, passengerPickDriver } = useLocation();
  const { user } = useAuth();
  const navigation = useNavigation();

  const confirmDriver = async () => {
    console.log("Passenger picks: ", selectedDriver);

    setSearchDrivers(false);

    await passengerPickDriver(
      user.accessToken,
      selectedDriver.id,
      origin,
      destination
    );

    navigation.navigate("WaitingDriverScreen");
  };

  const clearDriver = () => {
    console.log("Clear driver");
    setSelectedDriver(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Choferes disponibles</Text>
      </View>

      <ScrollView style={styles.containerList}>
        {drivers.map((driver) => (
          <DriverRow
            key={driver.id}
            driver={driver}
            selectedDriver={selectedDriver}
            setSelectedDriver={setSelectedDriver}
          />
        ))}
      </ScrollView>

      <View style={styles.containerButton}>
        <CustomButton
          text="Confirmar viaje"
          position="absolute"
          bottom={10}
          onPress={confirmDriver}
          disabled={selectedDriver === null}
        />
      </View>
    </View>
  );
};

export default DriversOptions;
