import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import React, { useContext } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { AuthContext } from "../AuthContext";

const PaymentScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { userId } = useContext(AuthContext);

  const {
    selectedCourt,
    selectedDate,
    selectedTime,
    place,
    price,
    selectedSport,
    gameId,
  } = route.params;

  const courtNumber = selectedCourt;
  const date = selectedDate;
  const time = selectedTime;
  const name = place;
  const game = gameId;
  console.log("Time param received:", route.params.selectedTime);

  const formattedDate =
    typeof date === "string" ? date : new Date(date).toLocaleDateString();

  const formattedTime =
    typeof time === "string"
      ? time
      : new Date(time).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

  const total = price + 8.8;

  const bookSlot = async () => {
    try {
      const response = await axios.post("http://10.0.2.2:8000/book", {
        courtNumber,
        date,
        time,
        userId,
        name,
        game,
      });

    

      if (response.status === 200) {
        console.log("Booking successful:", response.data);
        navigation.replace("Main");
      } else {
        console.error("Booking failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error booking slot:", error);
    }
  };

  console.log("Payload to be sent", {
    courtNumber,
    date,
    time,
    userId,
    name,
    game,
  });

  return (
    <>
      <ScrollView style={{ marginTop: 50 }}>
        <View style={{ padding: 15 }}>
          <Text style={{ fontSize: 23, fontWeight: "500", color: "green" }}>
            {selectedSport}
          </Text>

          <View
            style={{
              borderColor: "#E0E0E0",
              borderWidth: 1,
              padding: 10,
              marginTop: 10,
              borderRadius: 6,
              shadowColor: "#171717",
              shadowOffset: { width: -1, height: 1 },
              shadowOpacity: 0.2,
              shadowRadius: 3,
            }}
          >
            <View>
              <View
                style={{
                  marginVertical: 3,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 7,
                }}
              >
                <MaterialCommunityIcons
                  name="fireplace-off"
                  size={20}
                  color="black"
                />
                <Text style={{ fontSize: 15, fontWeight: "600" }}>
                  {selectedCourt}
                </Text>
              </View>
              <View
                style={{
                  marginVertical: 3,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 7,
                }}
              >
                <Feather name="calendar" size={20} color="black" />
                <Text style={{ fontSize: 15, fontWeight: "600" }}>
                  {formattedDate}
                </Text>
              </View>
              <View
                style={{
                  marginVertical: 3,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 7,
                }}
              >
                <Feather name="clock" size={20} color="black" />
                <Text style={{ fontSize: 15, fontWeight: "600" }}>
                  {formattedTime}
                </Text>
              </View>
              <View
                style={{
                  marginVertical: 3,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 7,
                }}
              >
                <MaterialCommunityIcons
                  name="currency-rupee"
                  size={20}
                  color="black"
                />
                <Text style={{ fontSize: 15, fontWeight: "600" }}>
                  INR {price}
                </Text>
              </View>
            </View>

            <Pressable></Pressable>
          </View>
        </View>

        <View style={{ marginTop: 15, marginHorizontal: 15 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 7,
              justifyContent: "space-between",
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 7 }}
            >
              <Text>Court Price</Text>
              <EvilIcons name="question" size={24} color="black" />
            </View>
            <Text style={{ fontSize: 16, fontWeight: "500" }}>INR {price}</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 7,
              marginTop: 15,
              justifyContent: "space-between",
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 7 }}
            >
              <Text>Convenience Fee</Text>
              <EvilIcons name="question" size={24} color="black" />
            </View>
            <Text style={{ fontSize: 16, fontWeight: "500" }}>INR 8.8</Text>
          </View>
        </View>

        <Text
          style={{
            height: 1,
            borderColor: "#E0E0E0",
            borderWidth: 3,
            marginTop: 20,
          }}
        />

        <View
          style={{
            marginHorizontal: 15,
            marginTop: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 16 }}>Total Amount</Text>
          <Text style={{ fontSize: 15, fontWeight: "500", color: "green" }}>
            {total}
          </Text>
        </View>

        <View
          style={{
            marginHorizontal: 15,
            marginTop: 10,
            borderColor: "#C0C0C0",
            borderWidth: 2,
            padding: 8,
            borderRadius: 6,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 16 }}>Total Amount</Text>
            <Text style={{ fontSize: 15, fontWeight: "500" }}>
              To be paid at Venue
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 5,
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 16 }}>INR {total}</Text>
            <Text style={{ fontSize: 15, fontWeight: "500" }}>{total}</Text>
          </View>
        </View>

        <Text
          style={{
            height: 1,
            borderColor: "#E0E0E0",
            borderWidth: 3,
            marginTop: 20,
          }}
        />

        <View
          style={{ marginLeft: "auto", marginRight: "auto", marginTop: 20 }}
        >
          <Image
            style={{ width: 100, height: 80, resizeMode: "contain" }}
            source={{
              uri: "https://playo.co/_next/image?url=https%3A%2F%2Fplayo-website.gumlet.io%2Fplayo-website-v2%2FLogo%2Bwith%2BTrademark_Filled.png%3Fq%3D20%26format%3Dauto&w=3840&q=75",
            }}
          />
        </View>
      </ScrollView>

      <Pressable
        onPress={bookSlot}
        style={{
          backgroundColor: "#32CD32",
          padding: 15,
          marginBottom: 30,
          borderRadius: 6,
          marginHorizontal: 15,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 17, fontWeight: "500", color: "white" }}>
          INR {total}
        </Text>
        <Text style={{ fontSize: 17, fontWeight: "500", color: "white" }}>
          Proceed to Pay
        </Text>
      </Pressable>
    </>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({});
