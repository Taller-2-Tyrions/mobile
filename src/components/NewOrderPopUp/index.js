import React from "react";
import { Text, View, Pressable } from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import styles from "./styles";

const NewOrderPopup = ({
  newOrder,
  onDecline,
  onAccept,
  duration,
  distance,
}) => {
  return (
    <View style={styles.root}>
      <Pressable onPress={onDecline} style={styles.declineButton}>
        <Text style={styles.declineText}>Decline</Text>
      </Pressable>

      <Pressable
        onPress={() => onAccept(newOrder)}
        style={styles.popupContainer}
      >
        <View style={styles.row}>
          <Text style={styles.uberType}>Solicitud de viaje</Text>
          <View style={styles.userBackground}>
            <FontAwesome name="user" size={35} color={"white"} />
          </View>
          <Text style={styles.uberType}>{newOrder.passenger_id}</Text>
        </View>

        <Text style={styles.minutes}>{duration} min</Text>
        <Text style={styles.distance}>{distance} km</Text>
      </Pressable>
    </View>
  );
};

export default NewOrderPopup;
