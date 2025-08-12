import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useLayoutEffect, useState } from "react";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";

const SelectTimeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // Extract previous data from route.params
  const { sport, area, date, taggedVenue, noOfPlayers } = route.params || {};

  const [time, setTime] = useState("");
  const [isStartTimePickerVisible, setStartTimePickerVisibility] =
    useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const times = [
    {
      id: "0",
      type: "morning",
      timings: "12 am - 9 am",
      icon: <Ionicons name="md-partly-sunny-outline" size={24} color="black" />,
    },
    {
      id: "1",
      type: "day",
      timings: "9 am - 4 pm",
      icon: <Feather name="sun" size={24} color="black" />,
    },
    {
      id: "2",
      type: "evening",
      timings: "4 pm - 9 pm",
      icon: <Feather name="sunset" size={24} color="black" />,
    },
    {
      id: "3",
      type: "night",
      timings: "9 pm - 11 pm",
      icon: <Ionicons name="cloudy-night-outline" size={24} color="black" />,
    },
  ];

  const selectTime = (type, timings) => {
    setTime(type);

    // Navigate back with all form data
    navigation.navigate("Create", {
      sport,
      area,
      date,
      taggedVenue,
      noOfPlayers,
      timeInterval: timings,
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Select Suitable Time",
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: "bold",
      },
    });
  }, []);

  const showStartTimePicker = () => setStartTimePickerVisibility(true);
  const hideStartTimePicker = () => setStartTimePickerVisibility(false);
  const showEndTimePicker = () => setEndTimePickerVisibility(true);
  const hideEndTimePicker = () => setEndTimePickerVisibility(false);

  const handleConfirmStartTime = (time) => {
    setStartTime(time);
    hideStartTimePicker();
  };

  const handleConfirmEndTime = (time) => {
    setEndTime(time);
    hideEndTimePicker();

    if (startTime) {
      const formattedStartTime = formatTime(startTime);
      const formattedEndTime = formatTime(time);
      const timeInterval = `${formattedStartTime} - ${formattedEndTime}`;

      navigation.navigate("Create", {
        sport,
        area,
        date,
        taggedVenue,
        noOfPlayers,
        timeInterval,
      });
    }
  };

  const formatTime = (time) => {
    if (!time) return "Select Time";
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  return (
    <View>
      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {times.map((item, index) => (
          <Pressable
            onPress={() => selectTime(item.type, item.timings)}
            key={index}
            style={{
              backgroundColor: time === item.type ? "#d3f8e2" : "white",
              margin: 20,
              width: 160,
              height: 120,
              borderRadius: 5,
              alignItems: "center",
              justifyContent: "center",
              gap: 15,
              shadowColor: "#171717",
              shadowOffset: { width: -2, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 3,
            }}
          >
            {item.icon}
            <Text>{item.type}</Text>
            <Text>{item.timings}</Text>
          </Pressable>
        ))}
      </Pressable>

      <View style={styles.container}>
        <View style={styles.timeContainer}>
          <Text style={styles.label}>Start Time:</Text>
          <Button title={formatTime(startTime)} onPress={showStartTimePicker} />
          <DateTimePickerModal
            isVisible={isStartTimePickerVisible}
            mode="time"
            onConfirm={handleConfirmStartTime}
            onCancel={hideStartTimePicker}
            is24Hour={false}
          />
        </View>

        <View style={styles.timeContainer}>
          <Text style={styles.label}>End Time:</Text>
          <Button title={formatTime(endTime)} onPress={showEndTimePicker} />
          <DateTimePickerModal
            isVisible={isEndTimePickerVisible}
            mode="time"
            onConfirm={handleConfirmEndTime}
            onCancel={hideEndTimePicker}
            is24Hour={false}
          />
        </View>

        {startTime && endTime && (
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryText}>
              Selected Interval: {formatTime(startTime)} - {formatTime(endTime)}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default SelectTimeScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  timeContainer: {
    marginBottom: 16,
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  summaryContainer: {
    marginTop: 32,
    alignItems: "center",
  },
  summaryText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
