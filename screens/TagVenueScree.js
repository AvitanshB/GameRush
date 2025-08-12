import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const TagVenueScreen = () => {
  const [venues, setVenues] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();

  // Extract existing values from route.params
  const {
    sport,
    area,
    date,
    timeInterval,
    noOfPlayers,
    taggedVenue: prevTaggedVenue,
  } = route.params || {};

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await axios.get("http://10.0.2.2:8000/venues");
        setVenues(response.data);
      } catch (error) {
        console.error("Failed to fetch venues:", error);
      }
    };

    fetchVenues();
  }, []);

  const handleSelectVenue = (venue) => {
    // Navigate back to CreateActivity with all previous data + new taggedVenue
    navigation.navigate("Create", {
      sport,
      area,
      date,
      timeInterval,
      noOfPlayers,
      taggedVenue: venue,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </Pressable>
        <Text style={styles.headerText}>Tag Venue</Text>
      </View>

      <FlatList
        data={venues}
        keyExtractor={(item) => item?._id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => handleSelectVenue(item?.name)}
            style={styles.venueCard}
          >
            <View style={styles.venueContent}>
              <Image style={styles.venueImage} source={{ uri: item?.image }} />
              <View style={{ flex: 1 }}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.venueName}
                >
                  {item?.name}
                </Text>
                <Text style={styles.venueLocation}>Near Manyata park</Text>
                <Text style={styles.venueRating}>4.4 (122 ratings)</Text>
              </View>
              <Ionicons name="shield-checkmark-sharp" size={24} color="green" />
            </View>

            <Text style={styles.bookableText}>BOOKABLE</Text>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
};

export default TagVenueScreen;

const styles = StyleSheet.create({
  header: {
    padding: 10,
    backgroundColor: "#294461",
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 15,
    fontWeight: "500",
    color: "white",
  },
  venueCard: {
    padding: 10,
    marginVertical: 10,
    borderColor: "#e0e0e0",
    borderWidth: 1,
    marginHorizontal: 10,
    borderRadius: 6,
    backgroundColor: "#fff",
  },
  venueContent: {
    flexDirection: "row",
    gap: 10,
  },
  venueImage: {
    width: 90,
    height: 90,
    resizeMode: "cover",
    borderRadius: 7,
  },
  venueName: {
    fontSize: 15,
    fontWeight: "500",
    width: "100%",
  },
  venueLocation: {
    marginTop: 5,
    color: "gray",
  },
  venueRating: {
    marginTop: 8,
    fontWeight: "500",
  },
  bookableText: {
    textAlign: "center",
    color: "gray",
    marginTop: 5,
  },
});
