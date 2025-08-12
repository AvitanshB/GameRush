import { Image } from "expo-image";
import { useNavigation } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

const StartScreen = () => {
  const mapView = useRef(null);
  const navigation = useNavigation();

  const KURUKSHETRA_COORDS = {
    latitude: 29.9695,
    longitude: 76.8783,
  };

  const players = [
    {
      name: "Sujan",
      sportIcon: "https://img.icons8.com/color/48/football2.png",
    },
    {
      name: "Ruhas",
      sportIcon: "https://img.icons8.com/color/48/badminton.png",
    },
    { name: "Jhish", sportIcon: "https://img.icons8.com/color/48/cricket.png" },
    {
      name: "Abhi",
      sportIcon: "https://img.icons8.com/color/48/basketball.png",
    },
    {
      name: "Ckash",
      sportIcon: "https://img.icons8.com/color/48/table-tennis.png",
    },
    {
      name: "Preetham",
      sportIcon: "https://img.icons8.com/color/48/volleyball.png",
    },
  ];

  const generateCircularPoints = (center, radiusInKm, numPoints) => {
    const points = [];
    const angleStep = (2 * Math.PI) / numPoints;
    for (let i = 0; i < numPoints; i++) {
      const angle = i * angleStep;
      const latitude = center.latitude + (radiusInKm / 111) * Math.cos(angle);
      const longitude =
        center.longitude +
        (radiusInKm / (111 * Math.cos(center.latitude * (Math.PI / 180)))) *
          Math.sin(angle);
      points.push({ latitude, longitude });
    }
    return points;
  };

  const circularPoints = generateCircularPoints(
    KURUKSHETRA_COORDS,
    3,
    players.length
  );

  useEffect(() => {
    mapView.current?.fitToCoordinates([KURUKSHETRA_COORDS, ...circularPoints], {
      edgePadding: { top: 80, bottom: 80, left: 80, right: 80 },
      animated: true,
    });
  }, []);

  return (
    <>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "white", paddingBottom: 20 }}
      >
        <MapView
          ref={mapView}
          style={{ flex: 1 }}
          initialRegion={{
            ...KURUKSHETRA_COORDS,
            latitudeDelta: 0.07,
            longitudeDelta: 0.07,
          }}
        >
          {/* Central Marker */}
          <Marker coordinate={KURUKSHETRA_COORDS} title="Kurukshetra">
            <View style={styles.youHereWrapper}>
              <Text style={styles.youHereText}>You</Text>
            </View>
          </Marker>

          {/* Player Icons */}
          {circularPoints.map((point, index) => {
            const player = players[index];
            return (
              <Marker key={index} coordinate={point}>
                <View style={styles.sportIconWrapper}>
                  <Image
                    source={{ uri: player.sportIcon }}
                    style={styles.sportIcon}
                    contentFit="cover"
                  />
                </View>
                <View style={styles.nameTag}>
                  <Text style={styles.nameText}>{player.name}</Text>
                </View>
              </Marker>
            );
          })}
        </MapView>

        <View style={styles.textContainer}>
          <Text style={styles.headerText}>
            Find Player in Your Neighbourhood
          </Text>
          <Text style={styles.subText}>Just like you did as a Kid!</Text>
        </View>

        <Pressable
          style={styles.loginLink}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.loginText}>Already have an account? Login</Text>
        </Pressable>

        <View style={styles.logoContainer}>
          <Text style={styles.gamerush}>GAMERUSH</Text>
        </View>
      </SafeAreaView>

      <View style={styles.footer}>
        <Pressable
          onPress={() => navigation.navigate("Register")}
          style={styles.ctaButton}
        >
          <Text style={styles.ctaText}>READY, SET, GO</Text>
        </Pressable>
      </View>
    </>
  );
};

export default StartScreen;

const styles = StyleSheet.create({
  gamerush: {
    fontSize: 42,
    fontWeight: "900",
    color: "#1ec921",
    letterSpacing: 2,
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 4,
  },
  sportIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    overflow: "hidden",
  },
  sportIcon: {
    width: 36,
    height: 36,
    resizeMode: "contain",
  },
  nameTag: {
    backgroundColor: "white",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    elevation: 2,
    marginTop: 2,
  },
  nameText: {
    fontSize: 13,
    fontWeight: "600",
  },
  youHereWrapper: {
    backgroundColor: "white",
    padding: 6,
    borderRadius: 8,
    elevation: 2,
    maxWidth: 100,
  },
  youHereText: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  textContainer: {
    marginTop: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "500",
    width: "70%",
    textAlign: "center",
  },
  subText: {
    marginTop: 20,
    color: "gray",
    fontSize: 15,
  },
  loginLink: {
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    color: "gray",
    fontSize: 17,
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },
  footer: {
    padding: 10,
    backgroundColor: "white",
    marginTop: "auto",
  },
  ctaButton: {
    backgroundColor: "#1ec921",
    padding: 12,
    borderRadius: 7,
    marginBottom: 20,
  },
  ctaText: {
    textAlign: "center",
    fontSize: 20,
    color: "white",
  },
});
