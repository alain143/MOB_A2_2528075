import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import AppButton from "../components/AppButton";
import Avatar from "../components/Avatar";
import Card from "../components/Card";
import Screen from "../components/Screen";
import { NAME_SENTENCE, STUDENT } from "../data/portfolio";
import { useProfile } from "../context/ProfileContext";
import { colors, spacing } from "../theme";

export default function HomeScreen({ navigation }: { navigation: any }) {
  const { profile, loading } = useProfile();

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.muted}>Loading your portfolio...</Text>
      </View>
    );
  }

  return (
    <Screen>
      <Card>
        <Text style={styles.name} accessibilityRole="header">
          {NAME_SENTENCE}
        </Text>
        <View style={styles.avatarWrap}>
          <Avatar uri={profile.imageUri} />
        </View>
        <Text style={styles.headline}>{profile.headline}</Text>
        <Text style={styles.badge}>{profile.availability}</Text>
      </Card>

      <Card>
        <Text style={styles.label}>About me</Text>
        <Text style={styles.body}>{profile.bio}</Text>
        <Text style={[styles.label, { marginTop: spacing.md }]}>Primary skill</Text>
        <Text style={styles.body}>{profile.primarySkill}</Text>
      </Card>

      <Card>
        <Text style={styles.label}>Verification code</Text>
        <Text style={styles.code}>{STUDENT.verificationCode}</Text>
      </Card>

      <AppButton label="View my projects" onPress={() => navigation.navigate("Projects")} />
      <AppButton label="Edit profile" variant="outline" onPress={() => navigation.navigate("Edit")} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.background },
  muted: { color: colors.muted, marginTop: spacing.sm },
  name: { fontSize: 24, fontWeight: "800", color: colors.primary, textAlign: "center" },
  avatarWrap: { alignItems: "center", marginVertical: spacing.md },
  headline: { fontSize: 17, fontWeight: "600", color: colors.text, textAlign: "center" },
  badge: {
    alignSelf: "center",
    marginTop: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    backgroundColor: colors.accent,
    color: "#FFFFFF",
    borderRadius: 20,
    fontWeight: "700",
    overflow: "hidden",
  },
  label: { fontSize: 14, fontWeight: "700", color: colors.muted, textTransform: "uppercase" },
  body: { fontSize: 16, color: colors.text, lineHeight: 24, marginTop: spacing.xs },
  code: { fontSize: 22, fontWeight: "800", color: colors.accent, marginTop: spacing.xs },
});
