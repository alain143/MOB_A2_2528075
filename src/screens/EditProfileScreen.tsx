import React, { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AppButton from "../components/AppButton";
import Avatar from "../components/Avatar";
import Card from "../components/Card";
import Screen from "../components/Screen";
import SectionTitle from "../components/SectionTitle";
import { useProfile } from "../context/ProfileContext";
import { Availability } from "../types";
import { colors, spacing } from "../theme";

const OPTIONS: Availability[] = ["Available", "Busy", "Open to internship"];

type Errors = { headline?: string; bio?: string; primarySkill?: string; availability?: string };

function validate(headline: string, bio: string, primarySkill: string, availability: string): Errors {
  const e: Errors = {};
  const h = headline.trim();
  const b = bio.trim();
  const s = primarySkill.trim();
  if (h.length < 5 || h.length > 60) e.headline = "Headline must be 5 to 60 characters.";
  if (b.length < 30 || b.length > 300) e.bio = "Biography must be 30 to 300 characters.";
  if (s.length < 2 || s.length > 30) e.primarySkill = "Primary skill must be 2 to 30 characters.";
  else if (!/^[A-Za-z][A-Za-z .+#&/-]*$/.test(s))
    e.primarySkill = "Use letters only and start with a letter.";
  if (!OPTIONS.includes(availability as Availability)) e.availability = "Choose an availability status.";
  return e;
}

export default function EditProfileScreen() {
  const { profile, saveProfile, resetProfile } = useProfile();
  const [headline, setHeadline] = useState(profile.headline);
  const [bio, setBio] = useState(profile.bio);
  const [primarySkill, setPrimarySkill] = useState(profile.primarySkill);
  const [availability, setAvailability] = useState<Availability>(profile.availability);
  const [errors, setErrors] = useState<Errors>({});
  const [message, setMessage] = useState("");

  // Keep fields in sync after the saved profile finishes loading or is reset.
  useEffect(() => {
    setHeadline(profile.headline);
    setBio(profile.bio);
    setPrimarySkill(profile.primarySkill);
    setAvailability(profile.availability);
  }, [profile.headline, profile.bio, profile.primarySkill, profile.availability]);

  const onSave = async () => {
    const found = validate(headline, bio, primarySkill, availability);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setMessage("Please fix the errors above. Nothing was saved.");
      return;
    }
    await saveProfile({
      ...profile,
      headline: headline.trim(),
      bio: bio.trim(),
      primarySkill: primarySkill.trim(),
      availability,
    });
    setMessage("Profile saved successfully.");
  };

  const onReset = () => {
    Alert.alert("Reset profile", "Restore the default profile and remove the saved photo?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Reset",
        style: "destructive",
        onPress: async () => {
          await resetProfile();
          setErrors({});
          setMessage("Profile reset to defaults.");
        },
      },
    ]);
  };

  const storeImage = async (result: ImagePicker.ImagePickerResult) => {
    if (result.canceled) {
      setMessage("No photo selected. Your current photo was kept.");
      return;
    }
    const asset = result.assets[0];
    if (!asset.base64) {
      setMessage("The photo could not be read. Please try again.");
      return;
    }
    await saveProfile({ ...profile, imageUri: `data:image/jpeg;base64,${asset.base64}` });
    setMessage("Profile photo saved.");
  };

  const options: ImagePicker.ImagePickerOptions = {
    mediaTypes: ["images"],
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.4,
    base64: true,
  };

  const takePhoto = async () => {
    try {
      const perm = await ImagePicker.requestCameraPermissionsAsync();
      if (!perm.granted) {
        Alert.alert("Camera permission denied", "Allow camera access in phone settings, or choose a photo from the gallery instead.");
        return;
      }
      await storeImage(await ImagePicker.launchCameraAsync(options));
    } catch {
      setMessage("The camera is not available. Try the gallery instead.");
    }
  };

  const pickPhoto = async () => {
    try {
      const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!perm.granted) {
        Alert.alert("Gallery permission denied", "Allow photo access in phone settings, or take a photo with the camera instead.");
        return;
      }
      await storeImage(await ImagePicker.launchImageLibraryAsync(options));
    } catch {
      setMessage("The gallery could not be opened. Please try again.");
    }
  };

  const removePhoto = async () => {
    await saveProfile({ ...profile, imageUri: null });
    setMessage("Profile photo removed.");
  };

  const hasImage = !!profile.imageUri;

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <Screen>
        <SectionTitle>Profile photo</SectionTitle>
        <Card>
          <View style={styles.center}>
            <Avatar uri={profile.imageUri} size={130} />
          </View>
          <AppButton label="Take photo" onPress={takePhoto} />
          <AppButton
            label={hasImage ? "Replace from gallery" : "Choose from gallery"}
            variant="outline"
            onPress={pickPhoto}
          />
          {hasImage && <AppButton label="Remove photo" variant="danger" onPress={removePhoto} />}
        </Card>

        <SectionTitle>Edit profile</SectionTitle>
        <Card>
          <Text style={styles.label}>Headline</Text>
          <TextInput
            style={[styles.input, errors.headline && styles.inputError]}
            value={headline}
            onChangeText={setHeadline}
            placeholder="Your professional headline"
            accessibilityLabel="Headline"
            maxLength={80}
          />
          {errors.headline && <Text style={styles.error}>{errors.headline}</Text>}

          <Text style={styles.label}>Short biography</Text>
          <TextInput
            style={[styles.input, styles.multiline, errors.bio && styles.inputError]}
            value={bio}
            onChangeText={setBio}
            placeholder="Write a short biography"
            accessibilityLabel="Short biography"
            multiline
            maxLength={350}
          />
          <Text style={styles.counter}>{bio.trim().length}/300</Text>
          {errors.bio && <Text style={styles.error}>{errors.bio}</Text>}

          <Text style={styles.label}>Primary skill</Text>
          <TextInput
            style={[styles.input, errors.primarySkill && styles.inputError]}
            value={primarySkill}
            onChangeText={setPrimarySkill}
            placeholder="e.g. Web and app development"
            accessibilityLabel="Primary skill"
            maxLength={40}
          />
          {errors.primarySkill && <Text style={styles.error}>{errors.primarySkill}</Text>}

          <Text style={styles.label}>Availability</Text>
          <View style={styles.row}>
            {OPTIONS.map((o) => (
              <Pressable
                key={o}
                accessibilityRole="button"
                accessibilityLabel={`Availability ${o}`}
                accessibilityState={{ selected: availability === o }}
                onPress={() => setAvailability(o)}
                style={[styles.option, availability === o && styles.optionActive]}
              >
                <Text style={[styles.optionText, availability === o && { color: "#FFFFFF" }]}>{o}</Text>
              </Pressable>
            ))}
          </View>
          {errors.availability && <Text style={styles.error}>{errors.availability}</Text>}
        </Card>

        {message !== "" && (
          <Text
            style={[styles.message, { color: message.includes("fix") ? colors.error : colors.success }]}
            accessibilityLiveRegion="polite"
          >
            {message}
          </Text>
        )}

        <AppButton label="Save profile" onPress={onSave} />
        <AppButton label="Reset to defaults" variant="danger" onPress={onReset} />
      </Screen>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: "center", marginBottom: spacing.md },
  label: { fontSize: 15, fontWeight: "700", color: colors.text, marginTop: spacing.sm, marginBottom: spacing.xs },
  input: {
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: 16,
    color: colors.text,
    backgroundColor: "#FFFFFF",
    minHeight: 48,
  },
  multiline: { minHeight: 110, textAlignVertical: "top" },
  inputError: { borderColor: colors.error },
  error: { color: colors.error, marginTop: spacing.xs, fontSize: 14 },
  counter: { color: colors.muted, fontSize: 13, textAlign: "right", marginTop: spacing.xs },
  row: { flexDirection: "row", flexWrap: "wrap" },
  option: {
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderRadius: 20,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  optionActive: { backgroundColor: colors.primary },
  optionText: { color: colors.primary, fontWeight: "600" },
  message: { fontSize: 15, fontWeight: "600", marginBottom: spacing.md },
});
