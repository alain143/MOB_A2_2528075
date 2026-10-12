import React from "react";
import { StyleSheet, Text } from "react-native";
import { colors, spacing } from "../theme";

export default function SectionTitle({ children }: { children: string }) {
  return (
    <Text accessibilityRole="header" style={styles.title}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.primary,
    marginBottom: spacing.sm,
  },
});
