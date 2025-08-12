import React from "react";
import { ModalPortal } from "react-native-modals";
import { AuthProvider } from "../AuthContext";
import StackNavigator from "../navigation/StackNavigator";

const app = () => {
  return (
    <>
      <AuthProvider>
        <StackNavigator />
      </AuthProvider>
      <ModalPortal />
    </>
  );
};
// mongodb+srv://bhattavitansh:deadpool@121@cluster0.ebloxmg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
export default app;
