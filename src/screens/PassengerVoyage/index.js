import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import tw from "tailwind-react-native-classnames";
import useVoyage from "../../hooks/useVoyage";
import useAuth from "../../hooks/useAuth";

// lo que quiero acá es renderizar dónde está el conductor hasta
// que llega a mi casa.
// luego lo tengo que trackear hasta que llega al destino.
const PassengerVoyage = () => {
  const { user } = useAuth();
  const { status, locationVoyage, getLocationVoyage } = useVoyage();

  useEffect(() => {
    const timer = setInterval(
      () => getLocationVoyage(user.accessToken, status.Voyage),
      2000
    );
    return () => clearInterval(timer);
  }, [locationVoyage]);

  return (
    <View style={tw`h-full w-full bg-blue-200 justify-center`}>
      <Text>
        {locationVoyage.lat} {locationVoyage.long}
      </Text>
    </View>
  );
};

export default PassengerVoyage;

const styles = StyleSheet.create({});
