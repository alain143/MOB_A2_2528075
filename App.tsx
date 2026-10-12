import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ProfileProvider } from "./src/context/ProfileContext";
import TabNavigator from "./src/navigation/TabNavigator";

export default function App() {
  return (
    <SafeAreaProvider>
      <ProfileProvider>
        <NavigationContainer>
          <StatusBar style="dark" />
          <TabNavigator />
        </NavigationContainer>
      </ProfileProvider>
    </SafeAreaProvider>
  );
}
