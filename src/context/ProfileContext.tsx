import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { DEFAULT_PROFILE } from "../data/portfolio";
import { clearProfileStorage, loadProfile, saveProfileToStorage } from "../storage";
import { Profile } from "../types";

type ProfileContextValue = {
  profile: Profile;
  loading: boolean;
  saveProfile: (next: Profile) => Promise<void>;
  resetProfile: () => Promise<void>;
};

const ProfileContext = createContext<ProfileContextValue | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile().then((saved) => {
      if (saved) setProfile({ ...DEFAULT_PROFILE, ...saved });
      setLoading(false);
    });
  }, []);

  const saveProfile = useCallback(async (next: Profile) => {
    setProfile(next);
    await saveProfileToStorage(next);
  }, []);

  const resetProfile = useCallback(async () => {
    setProfile(DEFAULT_PROFILE);
    await clearProfileStorage();
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, loading, saveProfile, resetProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile(): ProfileContextValue {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("useProfile must be used inside ProfileProvider");
  return ctx;
}
