import { View, Text } from "react-native";
import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import { AntDesign, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import PlayScreen from "../screens/PlayScreen";
import BookScreen from "../screens/BookScreen";
import ProfileScreen from "../screens/ProfileScreen";
import VenueInfoScreen from "../screens/VenueInfoScreen";
import StartScreen from "../screens/StartScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import PasswordScreen from "../screens/PasswordScreen";
import NameScreen from "../screens/NameScreen";
import SelectImage from "../screens/SelectImage";
import PreFinalScreen from "../screens/PreFinalScreen";
import OtpScreen from "../screens/OtpScreen";
import { AuthContext } from "../AuthContext";
import CreateActivity from "../screens/CreateActivity";
import TagVenueScreen from "../screens/TagVenueScree";
import SelectTimeScreen from "../screens/SelectTimeScreen";
import GameSetUpScreen from "../screens/GameSetUpScreen";
import ManageRequestScreen from "../screens/ManageRequestScreen";
import SlotScreen from "../screens/SlotScreen";
import PaymentScreen from "../screens/PaymentScreen";
import PlayersScreen from "../screens/PlayersScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HOME"
        component={HomeScreen}
        options={{
          tabBarActiveTintColor: "green",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="home-outline"
              size={24}
              color={focused ? "green" : "#989898"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="PLAY"
        component={PlayScreen}
        options={{
          headerShown: false,
          tabBarActiveTintColor: "green",
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="addusergroup"
              size={24}
              color={focused ? "green" : "#989898"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="BOOK"
        component={BookScreen}
        options={{
          headerShown: false,
          tabBarActiveTintColor: "green",
          tabBarIcon: ({ focused }) => (
            <SimpleLineIcons
              name="book-open"
              size={24}
              color={focused ? "green" : "#989898"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="PROFILE"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarActiveTintColor: "green",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="person-outline"
              size={24}
              color={focused ? "green" : "#989898"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Start"
        component={StartScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Password"
        component={PasswordScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Otp"
        component={OtpScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Name"
        component={NameScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Image"
        component={SelectImage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PreFinal"
        component={PreFinalScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={BottomTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Time"
        component={SelectTimeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Venue"
        component={VenueInfoScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Create"
        component={CreateActivity}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TagVenue"
        component={TagVenueScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Game"
        component={GameSetUpScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Players"
        component={PlayersScreen}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="Payment"
        component={PaymentScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Slot"
        component={SlotScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Manage"
        component={ManageRequestScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const StackNavigator = () => {
  const { token } = useContext(AuthContext);

  return token === null || token === "" ? <AuthStack /> : <MainStack />;
};

export default StackNavigator;
