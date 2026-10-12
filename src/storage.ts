import AsyncStorage from "@react-native-async-storage/async-storage";
import { Profile } from "./types";

const KEY = "alainportfolio_profile_v1";

export async function loadProfile(): Promise<Profile | null> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Profile) : null;
  } catch {
    return null;
  }
}

export async function saveProfileToStorage(profile: Profile): Promise<void> {
  await AsyncStorage.setItem(KEY, JSON.stringify(profile));
}

export async function clearProfileStorage(): Promise<void> {
  await AsyncStorage.removeItem(KEY);
}
