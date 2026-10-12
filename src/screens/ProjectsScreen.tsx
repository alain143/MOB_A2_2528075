import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Card from "../components/Card";
import Screen from "../components/Screen";
import { PROJECTS } from "../data/portfolio";
import { ProjectsStackParamList } from "../types";
import { colors, spacing } from "../theme";

type Props = NativeStackScreenProps<ProjectsStackParamList, "ProjectList">;

export default function ProjectsScreen({ navigation }: Props) {
  return (
    <Screen>
      {PROJECTS.map((p) => (
        <Pressable
          key={p.id}
          accessibilityRole="button"
          accessibilityLabel={`Open project ${p.title}`}
          onPress={() => navigation.navigate("ProjectDetails", { projectId: p.id })}
        >
          <Card>
            <Text style={styles.title}>{p.title}</Text>
            <Text style={styles.tech} numberOfLines={2}>
              {p.technology}
            </Text>
            <Text style={styles.link}>View details</Text>
          </Card>
        </Pressable>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 18, fontWeight: "700", color: colors.primary },
  tech: { color: colors.muted, marginTop: spacing.xs, fontSize: 15 },
  link: { color: colors.accent, fontWeight: "700", marginTop: spacing.sm },
});
