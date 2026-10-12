import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Card from "../components/Card";
import Screen from "../components/Screen";
import SectionTitle from "../components/SectionTitle";
import { EDUCATION, SKILLS } from "../data/portfolio";
import { colors, spacing } from "../theme";

export default function SkillsScreen() {
  return (
    <Screen>
      <SectionTitle>Skills</SectionTitle>
      <View style={styles.chips}>
        {SKILLS.map((skill) => (
          <View key={skill} style={styles.chip}>
            <Text style={styles.chipText}>{skill}</Text>
          </View>
        ))}
      </View>

      <View style={{ height: spacing.md }} />
      <SectionTitle>Education timeline</SectionTitle>
      {EDUCATION.map((item) => (
        <Card key={item.period}>
          <Text style={styles.period}>{item.period}</Text>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.place}>{item.place}</Text>
        </Card>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  chips: { flexDirection: "row", flexWrap: "wrap" },
  chip: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  chipText: { color: "#FFFFFF", fontSize: 15, fontWeight: "600" },
  period: { color: colors.accent, fontWeight: "700", fontSize: 14 },
  title: { color: colors.text, fontWeight: "700", fontSize: 17, marginTop: spacing.xs },
  place: { color: colors.muted, fontSize: 15, marginTop: spacing.xs },
});
