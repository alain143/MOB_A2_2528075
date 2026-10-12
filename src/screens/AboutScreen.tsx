import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Card from "../components/Card";
import Screen from "../components/Screen";
import SectionTitle from "../components/SectionTitle";
import { NAME_SENTENCE, STUDENT } from "../data/portfolio";
import { colors, spacing } from "../theme";

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

export default function AboutScreen() {
  return (
    <Screen>
      <SectionTitle>About this app</SectionTitle>
      <Card>
        <Text style={styles.sentence}>{NAME_SENTENCE}</Text>
        <Row label="App name" value={STUDENT.appName} />
        <Row label="Student name" value={STUDENT.fullName} />
        <Row label="Registration number" value={STUDENT.regNumber} />
        <Row label="Verification code" value={STUDENT.verificationCode} />
        <Row label="Version" value={STUDENT.version} />
      </Card>
      <Card>
        <Text style={styles.label}>Data use</Text>
        <Text style={styles.value}>
          This app works fully offline. Your profile text and photo are stored only on this device
          using AsyncStorage. No passwords, tokens or sensitive data are collected, and nothing is
          sent over the internet.
        </Text>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  sentence: { fontSize: 17, fontWeight: "700", color: colors.primary, marginBottom: spacing.md },
  row: { marginBottom: spacing.sm },
  label: { fontSize: 14, fontWeight: "700", color: colors.muted, textTransform: "uppercase" },
  value: { fontSize: 16, color: colors.text, marginTop: spacing.xs, lineHeight: 24 },
});
