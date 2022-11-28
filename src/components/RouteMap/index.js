import React from "react";
import { Image, Animated, View, Text, TouchableOpacity } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import useLocation from "../../hooks/useLocation";
import styles, { CARD_WIDTH } from "./styles";
import { mapDarkStyle } from "../MapStyles";

const GOOGLE_MAPS_APIKEY = "AIzaSyCeWGHDDYw0J5rRmoQSwJGlmfO6tlmiutc";

const RouteMap = ({ origin, destination }) => {
  const { drivers } = useLocation();

  const originLocation = {
    latitude: origin.details.geometry.location.lat,
    longitude: origin.details.geometry.location.lng,
  };

  const destinationLocation = {
    latitude: destination.details.geometry.location.lat,
    longitude: destination.details.geometry.location.lng,
  };

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  const _map = React.useRef(null);
  const _scrollView = React.useRef(null);

  React.useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= drivers.length) {
        index = drivers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const { coordinate } = drivers[index];
          _map.current.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: 0.04864195044303443,
              longitudeDelta: 0.040142817690068,
            },
            350
          );
        }
      }, 10);
    });
  });

  const interpolations = drivers?.map((driver, index) => {
    console.log("index", index);
    let inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH,
    ];

    if (!inputRange[0]) {
      inputRange = [0, 0, 0];
    }

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: "clamp",
    });

    return { scale };
  });

  const onMarkerPress = (mapEventData) => {
    const markerID = mapEventData._targetInst.return.key;

    let x = markerID * CARD_WIDTH + markerID * 20;
    if (Platform.OS === "ios") {
      x = x - SPACING_FOR_CARD_INSET;
    }

    _scrollView.current.scrollTo({ x: x, y: 0, animated: true });
  };

  return (
    <View>
      <MapView
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        customMapStyle={mapDarkStyle}
        style={styles.map}
        initialRegion={{
          latitude: originLocation.latitude,
          longitude: originLocation.longitude,
          latitudeDelta: 0.0022,
          longitudeDelta: 0.0121,
        }}
      >
        <MapViewDirections
          origin={originLocation}
          destination={destinationLocation}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={5}
          strokeColor="white"
        />
        {drivers &&
          drivers?.map((driver, index) => {
            const scaleStyle = {
              transform: [
                {
                  scale: interpolations[index].scale,
                },
              ],
            };
            return (
              <Marker
                key={driver.id}
                coordinate={{
                  latitude: driver.location.latitude,
                  longitude: driver.location.longitude,
                }}
                onPress={(e) => onMarkerPress(e)}
              >
                <Animated.View style={[styles.markerWrap]}>
                  <Animated.Image
                    style={[styles.marker, scaleStyle]}
                    source={require("../../assets/images/top-UberX.png")}
                    resizeMode="contain"
                  />
                </Animated.View>
              </Marker>
            );
          })}
        <Marker title={"Origin"} coordinate={originLocation} />
        <Marker title={"Destination"} coordinate={destinationLocation} />
      </MapView>

      <Animated.ScrollView
        ref={_scrollView}
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        style={styles.scrollView}
        pagingEnabled
        snapToInterval={CARD_WIDTH + 20}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation,
                },
              },
            },
          ],
          { useNativeDriver: true }
        )}
      >
        {drivers?.map((driver, index) => (
          <View style={styles.card} key={index}>
            <View style={styles.textContent}>
              <Text numberOfLines={1} style={styles.cardTitle}>
                {driver.name} {driver.last_name}
              </Text>
              {/* <StarRating ratings={driver.rating} reviews={driver.reviews} /> */}
              <Text numberOfLines={1} style={styles.cardDescription}>
                {driver.prices.Standard}
              </Text>
              <View style={styles.button}>
                <TouchableOpacity
                  onPress={() => []}
                  style={[
                    styles.signIn,
                    {
                      borderColor: "#FF6347",
                      borderWidth: 1,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.textSign,
                      {
                        color: "#FF6347",
                      },
                    ]}
                  >
                    Select driver
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
};

export default RouteMap;
