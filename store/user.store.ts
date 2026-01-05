import { createProfile, getProfile } from "@/api/profile.api";
import { Profile } from "@/constants/types";
import { create } from "zustand";

const INVITE_PROFILE: Profile = {
  id: "",
  name: "Invitado",
  picture: null,
  streak: 0,
};

interface UserStoreState {
  profile: Profile | null;
  setProfile: (user: any) => void;
}

export const useUserStore = create<UserStoreState>((set, get) => ({
  profile: INVITE_PROFILE,
  async setProfile(user) {
    let profile = await getProfile();

    if (!profile) await createProfile();

    profile = await getProfile();

    set({ profile });
  },
}));
