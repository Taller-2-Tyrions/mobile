import { Image } from "react-native";
import { Marker } from "react-native-maps";

const DriverMarker = ({ position }) => {
  return (
    <Marker
      coordinate={{
        latitude: position.latitude,
        longitude: position.longitude,
      }}
    >
      <Image
        style={{
          height: 70,
          width: 70,
        }}
        source={require("./top-UberX.png")}
        resizeMode="contain"
      />
    </Marker>
  );
};

export { DriverMarker };
