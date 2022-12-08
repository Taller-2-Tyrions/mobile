import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import useLocation from "../../hooks/useLocation";
import useAuth from "../../hooks/useAuth";
import DriversInfoRow from "./DriversInfoRow";
import styles from "./styles";

const DriversInfo = ({ setLoadingDriver, origin, destination }) => {
  const [selectedDriver, setSelectedDriver] = useState(null);
  const { drivers, passengerPickDriver } = useLocation();
  const { user } = useAuth();

  const confirmDriver = async () => {
    console.log("Passenger picks: ", selectedDriver.driver.id);

    /*await passengerPickDriver(
      user.accessToken,
      selectedDriver.id,
      origin,
      destination
    );

    setLoadingDriver(selectedDriver.driver);*/
  };

  const clearDriver = () => {
    console.log("Clear driver");
    setSelectedDriver(null);
  };

  if (drivers) {
    return (
      <View>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>
            {drivers.length > 0
              ? "Choferes disponibles"
              : "No hay choferes cercanos, reintentando..."}
          </Text>
        </View>
        {drivers.map((driver) => (
          <DriversInfoRow
            key={driver.id}
            driver={driver}
            setSelectedDriver={setSelectedDriver}
          />
        ))}

        {selectedDriver !== null && (
          <View>
            <TouchableOpacity
              onPress={confirmDriver}
              style={{
                backgroundColor: "black",
                padding: 10,
                margin: 10,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontWeigth: "bold" }}>
                Confirm Uber
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={clearDriver}
              style={{
                backgroundColor: "white",
                padding: 10,
                margin: 10,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "black", fontWeigth: "bold" }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  } else {
    return (
      <View>
        <Text>Cargando choferes...</Text>
      </View>
    );
  }
};

export default DriversInfo;
