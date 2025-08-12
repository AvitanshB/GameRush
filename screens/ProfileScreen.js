import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { AuthContext } from "../AuthContext";

const ProfileScreen = () => {
  const { logout, userId } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://10.0.2.2:8000/user/${userId}`);
      console.log("Fetched user data:", response.data.user); // 🔍 Log this
      setUser(response.data.user);
    } catch (error) {
      console.log(
        "Error fetching user:",
        error?.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  const username =
    `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim() || "Guest";
  const userPhoto = user?.image || "https://via.placeholder.com/100";

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={{ uri: userPhoto }} style={styles.avatar} />
        <Text style={styles.username}>{username}</Text>
      </View>

      <Pressable style={styles.logoutContainer} onPress={logout}>
        <View style={styles.logoutIcon}>
          <MaterialIcons name="logout" size={24} color="green" />
        </View>
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  profileContainer: {
    alignItems: "center",
    marginVertical: 40,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#E0E0E0",
  },
  username: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 12,
  },
  logoutContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 12,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    marginTop: 20,
  },
  logoutIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "500",
  },
});
