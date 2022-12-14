import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { AntDesign, Ionicons, FontAwesome5 } from "@expo/vector-icons";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import usePassenger from "../usePassenger";

const PickDriver = () => {
  const navigation = useNavigation();
  const { driverProfile, getDriverProfile, drivers, getDrivers, setDrivers } =
    usePassenger();
  const [selectedDriver, setSelectedDriver] = useState(null);

  useEffect(() => {
    if (selectedDriver) {
      getDriverProfile(selectedDriver.id);
    }
  }, [selectedDriver]);

  useEffect(() => {
    if (!drivers) {
      const timer = setInterval(() => getDrivers(), 2000);
      return () => clearInterval(timer);
    }
  }, [drivers]);

  const changePage = () => {
    setDrivers(null);
    // navigation.navigate(...);
  };

  const onPress = () => {
    setDrivers(null);
    navigation.navigate("MapScreen");
  };

  if (!drivers) {
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
          <Text style={{ fontSize: 30 }}>Cargando conductores...</Text>
        </View>
      </View>
    );
  } else {
    return (
      <View style={tw`bg-white h-full`}>
        <Title onPress={onPress} />
        <DriversOptions
          drivers={drivers}
          setSelectedDriver={setSelectedDriver}
        />
        {selectedDriver && (
          <DriverInfo driver={driverProfile} selectedDriver={selectedDriver} />
        )}
        <OkButton driver={selectedDriver} onPress={changePage} />
      </View>
    );
  }
};

const Title = ({ onPress }) => {
  return (
    <View style={[tw`p-2 mt-2`, tw`flex-row`]}>
      <View style={{ width: "20%", marginTop: 6 }}>
        <TouchableOpacity onPress={onPress}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: "80%",
        }}
      >
        <Text style={styles.titleStyle}>Seleccioná un conductor</Text>
      </View>
    </View>
  );
};

const DriversOptions = ({ drivers, setSelectedDriver }) => {
  return (
    <View style={styles.containerList}>
      <FlatList
        data={drivers}
        keyExtractor={(item) => item.id}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[tw`p-2 pl-6 pb-8 pt-4 m-2 w-60`, styles.driverCard]}
            onPress={() => setSelectedDriver(item)}
          >
            <Text style={[tw`mt-2 text-lg`, { fontFamily: "uber2" }]}>
              {item.name} {item.last_name}
            </Text>
            <View style={styles.carInfo}>
              <View style={tw`flex-row`}>
                <AntDesign name="clockcircle" size={16} color="black" />
                <Text style={styles.textInfo}> {item.duration} min</Text>
              </View>
              <View style={{ marginLeft: 15, flexDirection: "row" }}>
                <Ionicons name="person" size={16} color="black" />
                <Text style={styles.textInfo}> {item.car.capacity}</Text>
              </View>
            </View>
            <View style={styles.price}>
              <Text style={styles.priceText}>
                Precio estimado: ${item.prices.Standard.toFixed(2)}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const DriverInfo = ({ driver, selectedDriver }) => {
  return (
    <View style={styles.driverInfoContainer}>
      {driver && driver.id === selectedDriver?.id ? (
        <>
          <View style={tw`flex-row`}>
            <View>
              <Text style={styles.driverInfoText}>
                {driver.name} {driver.last_name}
              </Text>
            </View>
            <View style={tw`ml-5 mt-2 flex-row`}>
              <Text>
                {driver.calification !== "No Calification"
                  ? driver.calification
                  : 0}
              </Text>
              <View style={{ marginTop: 3 }}>
                <AntDesign name="star" size={16} color="#f09f35" />
              </View>
            </View>
          </View>
          <View style={tw`mt-2 mb-3`}>
            <View style={{ flexDirection: "row" }}>
              <View style={tw`flex-row`}>
                <View style={{ marginTop: 3 }}>
                  <FontAwesome5 name="car-side" size={16} color="black" />
                </View>
                <View>
                  <Text style={[styles.textInfoPlus, { marginLeft: 5 }]}>
                    {driver.car.model} {driver.car.year}
                  </Text>
                </View>
              </View>
              <View style={{ marginLeft: 15, flexDirection: "row" }}>
                <View style={{ marginTop: 3 }}>
                  <Ionicons name="person" size={16} color="black" />
                </View>
                <Text style={styles.textInfoPlus}> {driver.car.capacity}</Text>
              </View>
            </View>
          </View>
          <View style={{ borderTopWidth: 1, borderTopColor: "#8c98ab" }}>
            <Reviews reviews={driver.reviews} />
          </View>
        </>
      ) : (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={styles.textInfoPlus}>Cargando perfil del conductor</Text>
        </View>
      )}
    </View>
  );
};

const Reviews = ({ reviews }) => {
  if (reviews && reviews.length > 0) {
    return (
      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id}
        horizontal
        renderItem={({ item }) => <Text>{item}</Text>}
      />
    );
  } else {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 15,
        }}
      >
        <Text style={styles.textInfoPlus}>No tiene reviews</Text>
      </View>
    );
  }
};

const OkButton = ({ driver, onPress }) => {
  return (
    <View style={styles.okButtonContainer}>
      {driver && (
        <TouchableOpacity onPress={onPress}>
          <AntDesign
            style={tw`p-2 bg-black rounded-full`}
            name="arrowright"
            size={46}
            color="white"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PickDriver;

const styles = StyleSheet.create({
  containerList: {
    padding: 2,
    marginTop: 10,
    height: "26%",
  },
  titleStyle: {
    fontFamily: "uber1",
    fontSize: 28,
  },
  driverCard: {
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
  },
  carInfo: {
    flexDirection: "row",
    marginTop: 7,
  },
  textInfo: {
    fontFamily: "uber2",
  },
  textInfoPlus: {
    fontFamily: "uber2",
    fontSize: 17,
  },
  price: {
    marginTop: 10,
  },
  priceText: {
    fontFamily: "uber2",
    fontSize: 16,
  },
  driverInfoContainer: {
    marginTop: 15,
    height: "48%",
    padding: 15,
    /*borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderColor: "gray",
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,*/
  },
  okButtonContainer: {
    paddingBottom: 10,
    height: "10%",
    justifyContent: "center",
    alignItems: "center",
    /*borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "gray",*/
  },
  driverInfoText: {
    fontFamily: "uber2",
    fontSize: 24,
  },
});
