import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";

const ManageRequests = () => {
  const [option, setOption] = useState("Requests");
  const [requests, setRequests] = useState([]);
  const [players, setPlayers] = useState([]);

  const route = useRoute();
  const navigation = useNavigation();

  const gameId = route?.params?.gameId;

  const BASE_URL = "http://10.0.2.2:8000";

  const fetchData = async () => {
    await Promise.all([fetchRequests(), fetchPlayers()]);
  };

  const fetchRequests = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/games/${gameId}/requests`);
      setRequests(response.data);
    } catch (error) {
      console.error("Failed to fetch requests:", error);
    }
  };

  const fetchPlayers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/game/${gameId}/players`);
      setPlayers(response.data);
    } catch (error) {
      console.error("Failed to fetch players:", error);
    }
  };

  const acceptRequest = async (userId) => {
    try {
      const response = await axios.post(`${BASE_URL}/accept`, {
        gameId,
        userId,
      });

      if (response.status === 200) {
        Alert.alert("Success", "Request accepted");
        fetchData();
      }
    } catch (error) {
      console.error("Failed to accept request:", error);
      Alert.alert("Error", "Could not accept request");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <AntDesign name="plussquareo" size={24} color="white" />
        </View>

        <View style={styles.headerTitleRow}>
          <Text style={styles.headerTitle}>Manage</Text>
          <Text style={styles.subText}>Match Full</Text>
        </View>

        <View style={styles.tabRow}>
          {["Requests", "Invited", "Playing", "Retired"].map((tab, i) => (
            <Pressable key={i} onPress={() => setOption(tab)}>
              <Text
                style={[styles.tabText, option === tab && { color: "#1dd132" }]}
              >
                {tab}{" "}
                {tab === "Requests"
                  ? `(${requests.length})`
                  : tab === "Playing"
                  ? `(${players.length})`
                  : "(0)"}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.contentContainer}>
        {option === "Requests" &&
          requests.map((item, index) => (
            <Pressable key={index} style={styles.requestCard}>
              <View style={styles.requestTopRow}>
                <Image
                  style={styles.avatar}
                  source={{
                    uri: item?.image || "https://via.placeholder.com/50",
                  }}
                />

                <View style={{ flex: 1 }}>
                  <Text style={styles.userName}>
                    {item?.firstName} {item?.lastName}
                  </Text>
                  <View style={styles.levelTag}>
                    <Text style={styles.levelText}>INTERMEDIATE</Text>
                  </View>
                </View>

                <Image
                  style={styles.logo}
                  source={{
                    uri: "https://playo-website.gumlet.io/playo-website-v2/logos-icons/new-logo-playo.png?q=50",
                  }}
                />
              </View>

              <Text style={{ marginTop: 8 }}>{item?.comment}</Text>

              <View style={styles.divider} />

              <View style={styles.actionsRow}>
                <View>
                  <View style={styles.noShowTag}>
                    <Text style={{ fontSize: 14, color: "gray" }}>
                      0 NO SHOWS
                    </Text>
                  </View>
                  <Text style={styles.reputationText}>See Reputation</Text>
                </View>

                <View style={styles.actionButtons}>
                  <Pressable style={styles.retireButton}>
                    <Text style={styles.retireText}>RETIRE</Text>
                  </Pressable>

                  <Pressable
                    onPress={() => acceptRequest(item.userId)}
                    style={styles.acceptButton}
                  >
                    <Text style={styles.acceptText}>ACCEPT</Text>
                  </Pressable>
                </View>
              </View>
            </Pressable>
          ))}

        {option === "Playing" &&
          players.map((item, index) => (
            <Pressable key={index} style={styles.playerRow}>
              <Image
                style={styles.avatarLarge}
                source={{
                  uri: item?.image || "https://via.placeholder.com/60",
                }}
              />
              <View>
                <Text>
                  {item?.firstName} {item?.lastName}
                </Text>
                <View style={styles.levelTag}>
                  <Text style={styles.levelText}>INTERMEDIATE</Text>
                </View>
              </View>
            </Pressable>
          ))}
      </View>
    </SafeAreaView>
  );
};

export default ManageRequests;

const styles = StyleSheet.create({
  header: {
    padding: 12,
    backgroundColor: "#223536",
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitleRow: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
  },
  subText: {
    color: "white",
    fontSize: 17,
  },
  tabRow: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 15,
  },
  tabText: {
    fontWeight: "500",
    color: "white",
  },
  contentContainer: {
    marginTop: 10,
    marginHorizontal: 15,
  },
  requestCard: {
    padding: 10,
    backgroundColor: "white",
    marginVertical: 10,
    borderRadius: 6,
  },
  requestTopRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userName: {
    fontWeight: "600",
  },
  levelTag: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginTop: 10,
    borderRadius: 20,
    borderColor: "orange",
    borderWidth: 1,
    alignSelf: "flex-start",
  },
  levelText: {
    fontSize: 13,
  },
  logo: {
    width: 110,
    height: 60,
    resizeMode: "contain",
  },
  divider: {
    height: 1,
    borderColor: "#E0E0E0",
    borderWidth: 0.7,
    marginVertical: 15,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  noShowTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: "#E0E0E0",
    borderRadius: 5,
  },
  reputationText: {
    marginTop: 10,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
  },
  retireButton: {
    padding: 10,
    borderRadius: 6,
    borderColor: "#E0E0E0",
    borderWidth: 1,
    width: 100,
  },
  retireText: {
    textAlign: "center",
  },
  acceptButton: {
    padding: 10,
    borderRadius: 6,
    backgroundColor: "#26bd37",
    width: 100,
  },
  acceptText: {
    color: "white",
    textAlign: "center",
  },
  playerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 10,
  },
  avatarLarge: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});
