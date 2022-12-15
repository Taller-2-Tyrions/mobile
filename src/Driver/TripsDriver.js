import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  Dimensions,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import tw from "tailwind-react-native-classnames";
import { AntDesign } from "@expo/vector-icons";
import { Rating } from "react-native-ratings";
import { useNavigation } from "@react-navigation/native";
import useDriver from "./useDriver";

const TripsDriver = () => {
  const navigation = useNavigation();
  const { getLastsVoyages, lastsVoyages, setLastsVoyages } = useDriver();
  const [calificationVisible, setCalificationVisible] = useState(false);
  const [complaintVisible, setComplaintVisible] = useState(false);

  useEffect(() => {
    if (!lastsVoyages) {
      getLastsVoyages();
    }
  }, [lastsVoyages]);

  if (!lastsVoyages) {
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
          <Text style={{ fontSize: 30, fontFamily: "uber1" }}>
            Cargando últimos viajes...
          </Text>
        </View>
      </View>
    );
  } else if (lastsVoyages.length === 0) {
    return (
      <View style={[tw`h-full w-full bg-white`, { padding: 10 }]}>
        <Title
          goBack={() => {
            setLastsVoyages(null);
            navigation.navigate("HomeDriver");
          }}
        />
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <Text style={{ fontSize: 30, fontFamily: "uber1" }}>Sin viajes</Text>
        </View>
      </View>
    );
  } else {
    return (
      <View style={[tw`h-full w-full bg-white`, { padding: 10 }]}>
        <Title
          goBack={() => {
            setLastsVoyages(null);
            navigation.navigate("HomeDriver");
          }}
        />
        <View style={[tw`pt-5 w-full`, { height: "90%" }]}>
          <FlatList
            data={lastsVoyages}
            keyExtractor={(item) => item.voyage_id}
            renderItem={({ item }) =>
              item.price > 0 && (
                <View style={{ alignItems: "center" }}>
                  <View style={[styles.trip]}>
                    <Text style={styles.text}>Conductor: {item.driver_id}</Text>
                    <Text style={styles.text}>Precio: ${item.price}</Text>
                    <Text style={styles.text}>
                      Fecha: {item.start_time.split("T")[0]}
                    </Text>
                    <Text style={styles.text}>
                      Hora: {item.start_time.split("T")[1].split(".")[0]}
                    </Text>

                    <View style={tw`mt-5 flex-row justify-center`}>
                      <TouchableOpacity
                        style={[
                          tw`mr-3`,
                          {
                            borderRadius: 25,
                            backgroundColor: "#1495ff",
                            padding: 15,
                          },
                        ]}
                        onPress={() => setCalificationVisible(true)}
                      >
                        <Text style={styles.text}>Calificar</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          tw`ml-3`,
                          {
                            borderRadius: 25,
                            padding: 15,
                            borderWidth: 1,
                            borderColor: "gray",
                          },
                        ]}
                        onPress={() => setComplaintVisible(true)}
                      >
                        <Text style={[styles.text, { color: "red" }]}>
                          Denunciar
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )
            }
          />
        </View>
        <Calification
          calificationVisible={calificationVisible}
          setCalificationVisible={setCalificationVisible}
        />
        <Complaint
          complaintVisible={complaintVisible}
          setComplaintVisible={setComplaintVisible}
        />
      </View>
    );
  }
};

const Title = ({ goBack }) => {
  return (
    <View style={tw`flex-row`}>
      <View style={{ width: "20%", justifyContent: "center" }}>
        <TouchableOpacity onPress={goBack}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: "80%",
          justifyContent: "center",
        }}
      >
        <Text style={styles.titleText}>Tus últimos viajes</Text>
      </View>
    </View>
  );
};

const Calification = ({ calificationVisible, setCalificationVisible }) => {
  const ratingCompleted = (rating) => {
    console.log("Rating: ", rating);
  };

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={calificationVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setProfileVisible(!calificationVisible);
        }}
      >
        <View style={modalStyles.container}>
          <View style={modalStyles.modalView}>
            <View style={modalStyles.modalContainerTop}>
              <View style={{ width: "50%" }}>
                <Text style={modalStyles.modalText}>
                  Calificación conductor
                </Text>
              </View>
              <View style={modalStyles.closeButton}>
                <TouchableOpacity
                  style={{ padding: 5 }}
                  onPress={() => setCalificationVisible(false)}
                >
                  <AntDesign name="closecircleo" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={modalStyles.modalContainerButton}>
              <Rating onFinishRating={ratingCompleted} />
              <InputText placeholder={"Comentario"} />
              <TouchableOpacity
                style={{
                  marginTop: 10,
                  left: Dimensions.get("window").width / 2 - 60,
                }}
              >
                <AntDesign
                  style={tw`p-2 bg-black rounded-full w-10 mt-4`}
                  name="arrowright"
                  size={24}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const Complaint = ({ complaintVisible, setComplaintVisible }) => {
  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={complaintVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setProfileVisible(!complaintVisible);
        }}
      >
        <View style={modalStyles.container}>
          <View style={modalStyles.modalView}>
            <View style={modalStyles.modalContainerTop}>
              <View style={{ width: "50%" }}>
                <Text style={modalStyles.modalText}>Denunciar conductor</Text>
              </View>
              <View style={modalStyles.closeButton}>
                <TouchableOpacity
                  style={{ padding: 5 }}
                  onPress={() => setComplaintVisible(false)}
                >
                  <AntDesign name="closecircleo" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={modalStyles.modalContainerButton}>
              <InputText placeholder={"Tipo de denuncia"} />
              <InputText placeholder={"Descripción"} />
              <TouchableOpacity
                style={{
                  marginTop: 10,
                  left: Dimensions.get("window").width / 2 - 60,
                }}
              >
                <AntDesign
                  style={tw`p-2 bg-black rounded-full w-10 mt-4`}
                  name="arrowright"
                  size={24}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const InputText = ({ placeholder }) => {
  return (
    <View style={tw`mt-5`}>
      <TextInput placeholder={placeholder} style={modalStyles.inputText} />
    </View>
  );
};

export default TripsDriver;

const styles = StyleSheet.create({
  titleText: {
    fontFamily: "uber1",
    fontSize: 40,
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
    width: "99%",
    padding: 15,
    marginVertical: 20,
  },
  text: {
    fontFamily: "uber2",
    fontSize: 20,
  },
  map: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
});

const modalStyles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#00000099",
  },
  modalView: {
    margin: 20,
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
    position: "absolute",
    top: 100,
    width: "90%",
  },
  modalContainerTop: {
    flexDirection: "row",
  },
  modalText: {
    fontFamily: "uber1",
    fontSize: 24,
    padding: 15,
  },
  closeButton: {
    width: "50%",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  editButton: {
    width: "20%",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  modalContainerButton: {
    padding: 15,
  },
  profileText: {
    fontFamily: "uber2",
    fontSize: 20,
    marginBottom: 10,
  },
  vipContainer: {
    borderRadius: 25,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  vipText: {
    fontFamily: "uber2",
    color: "white",
    fontSize: 20,
    margin: 7,
  },
  inputText: {
    borderBottomWidth: 2,
    borderBottomColor: "black",
    width: "90%",
    fontFamily: "uber2",
    fontSize: 20,
    marginTop: 5,
  },
  separator: {
    backgroundColor: "#efefef",
    height: 1,
  },
});
