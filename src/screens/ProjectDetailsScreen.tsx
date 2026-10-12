import React from "react";
import { StyleSheet, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Card from "../components/Card";
import Screen from "../components/Screen";
import { PROJECTS } from "../data/portfolio";
import { ProjectsStackParamList } from "../types";
import { colors, spacing } from "../theme";

type Props = NativeStackScreenProps<ProjectsStackParamList, "ProjectDetails">;

export default function ProjectDetailsScreen({ route }: Props) {
  const project = PROJECTS.find((p) => p.id === route.params.projectId);

  if (!project) {
    return (
      <Screen>
        <Text style={styles.body}>Project not found.</Text>
      </Screen>
    );
  }

  return (
    <Screen>
      <Text style={styles.title} accessibilityRole="header">
        {project.title}
      </Text>
      <Card>
        <Text style={styles.label}>Problem</Text>
        <Text style={styles.body}>{project.problem}</Text>
      </Card>
      <Card>
        <Text style={styles.label}>My contribution</Text>
        <Text style={styles.body}>{project.contribution}</Text>
      </Card>
      <Card>
        <Text style={styles.label}>Technology used</Text>
        <Text style={styles.body}>{project.technology}</Text>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: "800", color: colors.primary, marginBottom: spacing.md },
  label: { fontSize: 14, fontWeight: "700", color: colors.muted, textTransform: "uppercase" },
  body: { fontSize: 16, color: colors.text, lineHeight: 24, marginTop: spacing.xs },
});
