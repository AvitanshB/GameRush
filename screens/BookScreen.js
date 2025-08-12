import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { Image } from "expo-image";
import { useNavigation } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../AuthContext";
import VenueCard from "../components/VenueCard";

const BookScreen = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { userId } = useContext(AuthContext);
  const [user, setUser] = useState(null);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://10.0.2.2:8000/user/${userId}`);
      setUser(response.data.user);
    } catch (error) {
      console.log("Error fetching user:", error?.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchVenues = async () => {
    try {
      const response = await axios.get("http://10.0.2.2:8000/venues");
      setVenues(response.data);
    } catch (error) {
      console.error("Failed to fetch venues:", error);
      Alert.alert("Error", "Unable to fetch venues. Please try again later.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserData();
      fetchVenues();
    }
  }, [userId]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchVenues();
  };

  const filteredVenues = venues.filter((venue) =>
    venue.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.userName}>
            {user?.firstName || "Loading..."}
          </Text>
          <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
        </View>
        <View style={styles.headerRight}>
          <Ionicons name="chatbox-outline" size={24} color="black" />
          <Ionicons name="notifications-outline" size={24} color="black" />
          {user?.image && (
            <Image
              style={styles.avatar}
              source={{ uri: user.image }}
            />
          )}
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchBox}>
        <TextInput
          placeholder="Search For Venues"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />
        <Ionicons name="search" size={24} color="gray" />
      </View>

      {/* Venue List */}
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={{ marginTop: 40 }}
        />
      ) : (
        <FlatList
          data={filteredVenues}
          keyExtractor={(item, index) =>
            (item?.id || item?._id || index).toString()
          }
          renderItem={({ item }) => <VenueCard item={item} />}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      )}
    </SafeAreaView>
  );
};

export default BookScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  userName: {
    fontSize: 16,
    fontWeight: "500",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  searchBox: {
    marginHorizontal: 12,
    backgroundColor: "#E8E8E8",
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 25,
  },
  searchInput: {
    flex: 1,
  },
});
