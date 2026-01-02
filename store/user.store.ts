import { Profile } from "@/constants/types";
import { create } from "zustand";

const INVITE_PROFILE: Profile = {
  id: "",
  name: "Invitado",
  picture: null,
};

interface UserStoreState {
  profile: Profile | null;
  inviteProfile: () => void;
}

export const useUserStore = create<UserStoreState>((set, get) => ({
  profile: INVITE_PROFILE,
  inviteProfile() {
    set({
      profile: INVITE_PROFILE,
    });
  },
}));
