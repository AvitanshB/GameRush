import {
  Alert,
  BackHandler,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "react-native-vector-icons";
import moment from "moment";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { AuthContext } from "../AuthContext";

const generateDates = () => {
  const dates = [];
  for (let i = 0; i < 10; i++) {
    const date = moment().add(i, "days");
    let displayDate =
      ["Today", "Tomorrow", "Day after"][i] || date.format("D MMM");
    dates.push({
      id: i.toString(),
      displayDate,
      dayOfWeek: date.format("ddd"),
      actualDate: date.format("D MMM"),
    });
  }
  return dates;
};

const CreateActivity = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userId } = useContext(AuthContext);

  const [sport, setSport] = useState("");
  const [taggedVenue, setTaggedVenue] = useState(null);
  const [date, setDate] = useState("");
  const [timeInterval, setTimeInterval] = useState("");
  const [noOfPlayers, setnoOfPlayers] = useState(0);
  const [selected, setSelected] = useState("Public");
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const dates = generateDates();

  useEffect(() => {
    if (route.params) {
      setSport(route.params.sport || "");
      setTaggedVenue(route.params.taggedVenue || "");
      setDate(route.params.date || "");
      setTimeInterval(route.params.timeInterval || "");
      setnoOfPlayers(route.params.noOfPlayers || 0);
    }
  }, [route.params]);

  useEffect(() => {
    const backAction = () => {
      if (modalVisible) {
        setModalVisible(false);
        return true;
      }
      return false;
    };

    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => subscription.remove();
  }, [modalVisible]);

  const selectDate = (d) => {
    setDate(d);
    setModalVisible(false);
  };

  const validateFields = () => {
    if (!sport || !taggedVenue || !date || !timeInterval || !noOfPlayers) {
      Alert.alert("Missing Fields", "Please complete all fields.");
      return false;
    }
    return true;
  };

  const createGame = async () => {
    if (!validateFields()) return;

    setLoading(true);
    try {
      const response = await axios.post("http://10.0.2.2:8000/creategame", {
        sport,
        area: taggedVenue,
        date,
        time: timeInterval,
        admin: userId,
        totalPlayers: noOfPlayers,
        access: selected,
      });

      if (response.status === 200) {
        Alert.alert("Success!", "Game created successfully", [
          {
            text: "OK",
            onPress: () => {
              setSport("")
              setDate("");
              setTimeInterval("");
              setTaggedVenue("");
              setnoOfPlayers(0);
              navigation.navigate("Main"); // <-- Navigate to Home screen
            },
          },
        ]);
      }
    } catch (error) {
      console.error("Failed to create game:", error);
      Alert.alert("Error", "Something went wrong while creating the game.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView>
          <View style={styles.container}>
            <Ionicons
              onPress={() => navigation.goBack()}
              name="arrow-back"
              size={24}
              color="black"
            />

            <Text style={styles.heading}>Create Activity</Text>

            {/* Sport Selection */}
            <Pressable
              onPress={() => navigation.navigate("Sport")}
              style={styles.inputRow}
            >
              <MaterialCommunityIcons name="whistle" size={24} color="gray" />
              <View style={styles.flexGrow}>
                <Text style={styles.label}>Sport</Text>
                <TextInput
                  value={sport}
                  onChangeText={setSport}
                  placeholder="Eg: Badminton / Football"
                  placeholderTextColor="gray"
                  style={styles.input}
                />
              </View>
              <AntDesign name="arrowright" size={24} color="gray" />
            </Pressable>
            <View style={styles.separator} />

            {/* Venue Tagging */}
            <Pressable
              onPress={() =>
                navigation.navigate("TagVenue", {
                  sport,
                  date,
                  timeInterval,
                  taggedVenue,
                  noOfPlayers,
                })
              }
              style={styles.inputRow}
            >
              <Entypo name="location" size={24} color="gray" />
              <View style={styles.flexGrow}>
                <Text style={styles.label}>Area</Text>
                <TextInput
                  value={taggedVenue}
                  onChangeText={setTaggedVenue}
                  placeholder="Locality or venue"
                  placeholderTextColor="gray"
                  style={styles.input}
                />
              </View>
              <AntDesign name="arrowright" size={24} color="gray" />
            </Pressable>
            <View style={styles.separator} />

            {/* Date Picker */}
            <Pressable
              onPress={() => setModalVisible(true)}
              style={styles.inputRow}
            >
              <Feather name="calendar" size={24} color="gray" />
              <View style={styles.flexGrow}>
                <Text style={styles.label}>Date</Text>
                <TextInput
                  editable={false}
                  placeholder={date || "Pick a date"}
                  placeholderTextColor={date ? "black" : "gray"}
                  style={styles.input}
                />
              </View>
              <AntDesign name="arrowright" size={24} color="gray" />
            </Pressable>
            <View style={styles.separator} />

            {/* Time Picker */}
            <Pressable
              onPress={() =>
                navigation.navigate("Time", {
                  sport,
                  date,
                  taggedVenue,
                  timeInterval,
                  noOfPlayers,
                })
              }
              style={styles.inputRow}
            >
              <AntDesign name="clockcircleo" size={24} color="gray" />
              <View style={styles.flexGrow}>
                <Text style={styles.label}>Time</Text>
                <TextInput
                  editable={false}
                  placeholder={timeInterval || "Pick a time"}
                  placeholderTextColor={timeInterval ? "black" : "gray"}
                  style={styles.input}
                />
              </View>
              <AntDesign name="arrowright" size={24} color="gray" />
            </Pressable>
            <View style={styles.separator} />

            {/* Access */}
            <View style={styles.inputRow}>
              <Feather name="activity" size={24} color="black" />
              <View style={styles.flexGrow}>
                <Text
                  style={{ fontSize: 16, fontWeight: "600", marginBottom: 10 }}
                >
                  Activity Access
                </Text>
                <View style={{ flexDirection: "row", gap: 10 }}>
                  {["Public", "invite only"].map((type) => (
                    <Pressable
                      key={type}
                      onPress={() => setSelected(type)}
                      style={[
                        styles.accessButton,
                        selected === type && styles.accessSelected,
                      ]}
                    >
                      {type === "Public" ? (
                        <Ionicons
                          name="earth"
                          size={20}
                          color={selected === type ? "white" : "black"}
                        />
                      ) : (
                        <AntDesign
                          name="lock1"
                          size={20}
                          color={selected === type ? "white" : "black"}
                        />
                      )}
                      <Text
                        style={{
                          color: selected === type ? "white" : "black",
                          fontWeight: "600",
                        }}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            </View>

            <View style={styles.separator} />

            {/* Total Players */}
            <Text style={{ marginTop: 20, fontSize: 16 }}>Total Players</Text>
            <View style={styles.inputBox}>
              <TextInput
                value={String(noOfPlayers)}
                onChangeText={(val) => setnoOfPlayers(Number(val))}
                placeholder="Total Players (including you)"
                keyboardType="numeric"
                style={styles.textBox}
              />
            </View>

            <View style={styles.separator} />

            {/* Instructions */}
            <Text style={{ marginTop: 20, fontSize: 16 }}>
              Add Instructions
            </Text>
            <View style={styles.inputBox}>
              {/* Static Instructions */}
              {[
                {
                  icon: <Ionicons name="bag-check" size={20} color="red" />,
                  label: "Bring your own equipment",
                },
                {
                  icon: (
                    <MaterialCommunityIcons
                      name="directions-fork"
                      size={20}
                      color="#FEBE10"
                    />
                  ),
                  label: "Cost Shared",
                },
                {
                  icon: <FontAwesome5 name="syringe" size={20} color="green" />,
                  label: "Covid vaccinated preferred",
                },
              ].map((item, index) => (
                <View key={index} style={styles.instructionRow}>
                  {item.icon}
                  <Text style={styles.instructionLabel}>{item.label}</Text>
                  <FontAwesome name="check-square" size={20} color="green" />
                </View>
              ))}
              <TextInput
                placeholder="Add Additional Instructions"
                style={styles.textBox}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Create Button */}
      <Pressable
        style={styles.createButton}
        onPress={createGame}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.createText}>Create Activity</Text>
        )}
      </Pressable>

      {/* Modal for Date */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>
                <Text style={styles.modalHeading}>Choose date to host</Text>
                <View style={styles.dateGrid}>
                  {dates.map((item) => (
                    <Pressable
                      key={item.id}
                      style={styles.dateCard}
                      onPress={() => selectDate(item.actualDate)}
                    >
                      <Text>{item.displayDate}</Text>
                      <Text style={{ color: "gray", marginTop: 6 }}>
                        {item.dayOfWeek}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default CreateActivity;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? 35 : 0,
  },
  container: {
    padding: 12,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    gap: 15,
  },
  flexGrow: { flex: 1 },
  input: {
    marginTop: 6,
    fontSize: 15,
    color: "black",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
  },
  separator: {
    borderBottomWidth: 0.6,
    borderBottomColor: "#D0D0D0",
  },
  accessButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#F0F0F0",
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  accessSelected: {
    backgroundColor: "#07bc0c",
  },
  inputBox: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#F8F8F8",
    borderRadius: 6,
  },
  textBox: {
    padding: 10,
    backgroundColor: "white",
    borderColor: "#D0D0D0",
    borderWidth: 1,
    borderRadius: 6,
  },
  instructionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    gap: 10,
  },
  instructionLabel: {
    flex: 1,
    fontWeight: "500",
  },
  createButton: {
    backgroundColor: "#07bc0c",
    margin: 15,
    padding: 14,
    borderRadius: 6,
  },
  createText: {
    textAlign: "center",
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalContainer: {
    backgroundColor: "white",
    height: 400,
    position: "absolute",
    bottom: 0,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
  },
  modalHeading: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  dateGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
    gap: 10,
    justifyContent: "space-between",
  },
  dateCard: {
    width: "30%",
    padding: 10,
    borderRadius: 8,
    borderColor: "#D0D0D0",
    borderWidth: 1,
    alignItems: "center",
    backgroundColor: "#F0F0F0",
  },
});
