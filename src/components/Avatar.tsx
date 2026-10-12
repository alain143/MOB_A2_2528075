import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

export default function Avatar({ uri, size = 120 }: { uri: string | null; size?: number }) {
  const radius = size / 2;
  if (uri) {
    return (
      <Image
        source={{ uri }}
        accessibilityLabel="Profile photo"
        style={{ width: size, height: size, borderRadius: radius }}
      />
    );
  }
  return (
    <View
      accessibilityLabel="Default avatar with initials AP"
      style={[styles.fallback, { width: size, height: size, borderRadius: radius }]}
    >
      <Text style={[styles.initials, { fontSize: size / 3 }]}>AP</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  fallback: { backgroundColor: colors.primary, alignItems: "center", justifyContent: "center" },
  initials: { color: "#FFFFFF", fontWeight: "700" },
});
