import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { colors, spacing } from "../theme";

type Props = {
  label: string;
  onPress: () => void;
  variant?: "primary" | "outline" | "danger";
  disabled?: boolean;
};

export default function AppButton({ label, onPress, variant = "primary", disabled }: Props) {
  const isPrimary = variant === "primary";
  const isDanger = variant === "danger";
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        isPrimary && styles.primary,
        variant === "outline" && styles.outline,
        isDanger && styles.danger,
        (pressed || disabled) && { opacity: 0.6 },
      ]}
    >
      <Text
        style={[
          styles.text,
          variant === "outline" && { color: colors.primary },
          isDanger && { color: colors.error },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 48,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.sm,
  },
  primary: { backgroundColor: colors.primary },
  outline: { borderWidth: 1.5, borderColor: colors.primary, backgroundColor: "transparent" },
  danger: { borderWidth: 1.5, borderColor: colors.error, backgroundColor: "transparent" },
  text: { color: "#FFFFFF", fontSize: 16, fontWeight: "600", textAlign: "center" },
});
