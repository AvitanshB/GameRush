import { AntDesign, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Image, ImageBackground } from "expo-image";
import { useNavigation } from "expo-router";
import { jwtDecode } from "jwt-decode";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../AuthContext";

const HomeScreen = () => {
  const { userId, setUserId } = useContext(AuthContext);
  const [upcomingGames, setUpcomingGames] = useState([]);
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  const spotlightData = [
    {
      id: "10",
      image: "https://playov2.gumlet.io/v3_homescreen/marketing_journey/Tennis%20Spotlight.png",
      text: "Learn Tennis",
      description: "Know more",
    },
    {
      id: "11",
      image: "https://playov2.gumlet.io/v3_homescreen/marketing_journey/playo_spotlight_08.png",
      text: "Up Your Game",
      description: "Find a coach",
    },
    {
      id: "12",
      image: "https://playov2.gumlet.io/v3_homescreen/marketing_journey/playo_spotlight_03.png",
      text: "Hacks to win",
      description: "Yes, Please!",
    },
    {
      id: "13",
      image: "https://playov2.gumlet.io/v3_homescreen/marketing_journey/playo_spotlight_02.png",
      text: "Spotify Playolist",
      description: "Show more",
    },
  ];

  useEffect(() => {
    const fetchAndSetUser = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) return;
        const decoded = jwtDecode(token);
        const userId = decoded.userId;
        setUserId(userId);

        const userRes = await axios.get(`http://10.0.2.2:8000/user/${userId}`);
        setUser(userRes.data.user);

        const gamesRes = await axios.get(`http://10.0.2.2:8000/upcoming?userId=${userId}`);
        setUpcomingGames(gamesRes.data);
      } catch (err) {
        console.error("Error loading user/game data:", err);
      }
    };

    fetchAndSetUser();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Text style={{ marginLeft: 15 }}>
            {user && user.firstName ? `Hi, ${user.firstName}` : "User"}
          </Text>
        </View>
      ),
      headerRight: () => (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginRight: 15 }}>
          <Ionicons name="chatbox-outline" size={24} color="black" />
          <Ionicons name="notifications-outline" size={24} color="black" />
          <Pressable>
            <Image
              style={{ width: 30, height: 30, borderRadius: 15 }}
              source={{
                uri: user?.image || "https://via.placeholder.com/100",
              }}
            />
          </Pressable>
        </View>
      ),
    });
  }, [navigation, user]);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#F8F8F8" }}>
      {/* Banner */}
      <View style={styles.bannerContainer}>
        <Image
          style={styles.bannerIcon}
          source={{
            uri: "https://cdn-icons-png.flaticon.com/128/785/785116.png",
          }}
        />
        <View>
          <View style={styles.bannerHeader}>
            <Text style={styles.bannerTitle}>Build Your Squad Through Sport</Text>
            <Image
              style={styles.bannerSmiley}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/128/426/426833.png",
              }}
            />
          </View>
          <Text style={styles.bannerSubtitle}>Make Friends. Play Sports. Repeat.</Text>
        </View>
      </View>

      {/* Upcoming Games */}
      <View style={styles.cardContainer}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardLabel}>GEAR UP FOR YOUR GAME</Text>
        </View>

        <View style={styles.cardTitleRow}>
          <Text style={{ fontSize: 16 }}>Badminton Activity</Text>
          <Pressable style={styles.cardViewBtn}>
            <Text style={{ textAlign: "center" }}>VIEW</Text>
          </Pressable>
        </View>

        <Text style={{ marginTop: 4, color: "gray" }}>
          {upcomingGames.length > 0
            ? `You have ${upcomingGames.length} games today`
            : "You have no Games Today"}
        </Text>

        <Pressable
          onPress={() => navigation.navigate("PLAY", { initialOption: "Calendar" })}
          style={styles.calendarLink}
        >
          <Text style={styles.calendarLinkText}>View My Calendar</Text>
        </Pressable>
      </View>

      {/* Play & Book Sections */}
      <View style={styles.playBookContainer}>
        {/* Play */}
        <View style={{ flex: 1 }}>
          <Pressable onPress={() => navigation.navigate("PLAY")}>
            <Image
              style={styles.playBookImage}
              source={{
                uri: "https://images.pexels.com/photos/262524/pexels-photo-262524.jpeg?auto=compress&cs=tinysrgb&w=800",
              }}
            />
          </Pressable>
          <Pressable style={styles.playBookCard}>
            <Text style={styles.playBookTitle}>Play</Text>
            <Text style={styles.playBookDesc}>Find Players and join their activities</Text>
          </Pressable>
        </View>

        {/* Book */}
        <View style={{ flex: 1 }}>
          <Pressable onPress={() => navigation.navigate("BOOK")}>
            <Image
              style={styles.playBookImage}
              source={{
                uri: "https://images.pexels.com/photos/3660204/pexels-photo-3660204.jpeg?auto=compress&cs=tinysrgb&w=800",
              }}
            />
          </Pressable>
          <Pressable style={styles.playBookCard}>
            <Text style={styles.playBookTitle}>Book</Text>
            <Text style={styles.playBookDesc}>Book your slots in venues nearby</Text>
          </Pressable>
        </View>
      </View>

      {/* Create Venue Section */}
      <View style={{ padding: 13 }}>
        <View style={styles.createVenueBox}>
          <View style={styles.createVenueIcon}>
            <AntDesign name="addusergroup" size={24} color="green" />
          </View>
          <View>
            <Pressable onPress={() => navigation.navigate("Create")}>
              <Text style={{ fontWeight: "bold" }}>Venue</Text>
              <Text style={{ marginTop: 10, color: "gray" }}>Create Your Venue</Text>
            </Pressable>
          </View>
        </View>
      </View>

      {/* Spotlight Scroll */}
      <View style={{ padding: 13 }}>
        <View style={styles.spotlightBox}>
          <Text style={{ fontSize: 15, fontWeight: "500" }}>Spotlight</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {spotlightData.map((item) => (
              <ImageBackground
                key={item.id}
                imageStyle={{ borderRadius: 10 }}
                style={styles.spotlightImage}
                source={{ uri: item.image }}
              />
            ))}
          </ScrollView>
        </View>
      </View>

      {/* Branding */}
      <View>
        <View style={{ marginLeft: "auto", marginRight: "auto" }}>
          <Text style={{ marginTop: 4, fontSize: 30, fontWeight: "bold" }}>GameRush</Text>
        </View>
        <Text style={{ color: "gray", textAlign: "center" }}>
          Your Sports community app
        </Text>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  bannerContainer: {
    padding: 13,
    backgroundColor: "white",
    margin: 15,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  bannerIcon: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },
  bannerHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  bannerSmiley: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  bannerSubtitle: {
    marginTop: 8,
    color: "gray",
  },
  cardContainer: {
    padding: 13,
    backgroundColor: "white",
    marginVertical: 6,
    marginHorizontal: 13,
    borderRadius: 12,
  },
  cardHeader: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    width: 200,
    marginVertical: 5,
  },
  cardLabel: {
    color: "#484848",
    fontSize: 13,
  },
  cardTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardViewBtn: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 7,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: 80,
  },
  calendarLink: {
    marginVertical: 15,
    marginLeft: "auto",
    marginRight: "auto",
  },
  calendarLinkText: {
    fontSize: 15,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  playBookContainer: {
    padding: 13,
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
  },
  playBookImage: {
    width: 180,
    height: 140,
    borderRadius: 10,
  },
  playBookCard: {
    backgroundColor: "white",
    padding: 12,
    width: 180,
    borderRadius: 10,
  },
  playBookTitle: {
    fontSize: 15,
    fontWeight: "500",
  },
  playBookDesc: {
    fontSize: 15,
    color: "gray",
    marginTop: 7,
  },
  createVenueBox: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    flexDirection: "row",
    gap: 10,
  },
  createVenueIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#29AB87",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  spotlightBox: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
  },
  spotlightImage: {
    width: 220,
    height: 280,
    resizeMode: "contain",
    marginRight: 10,
    marginVertical: 15,
  },
});
