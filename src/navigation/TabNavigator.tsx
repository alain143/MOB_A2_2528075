import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import SkillsScreen from "../screens/SkillsScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import AboutScreen from "../screens/AboutScreen";
import ProjectsStack from "./ProjectsStack";
import { colors } from "../theme";

const Tab = createBottomTabNavigator();

const ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  Home: "home",
  Skills: "ribbon",
  Projects: "briefcase",
  Edit: "create",
  About: "information-circle",
};

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: "#FFFFFF",
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarLabelStyle: { fontSize: 11 },
        tabBarIcon: ({ color, size }) => <Ionicons name={ICONS[route.name]} size={size} color={color} />,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Skills" component={SkillsScreen} options={{ title: "Skills & Education" }} />
      <Tab.Screen name="Projects" component={ProjectsStack} options={{ headerShown: false }} />
      <Tab.Screen name="Edit" component={EditProfileScreen} options={{ title: "Edit Profile" }} />
      <Tab.Screen name="About" component={AboutScreen} />
    </Tab.Navigator>
  );
}
