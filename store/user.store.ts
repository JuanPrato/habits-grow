import { Profile } from "@/constants/types";
import { create } from "zustand";

interface UserStoreState {
  profile: Profile | null;
}

export const useUserStore = create<UserStoreState>((set, get) => ({
  profile: null,
}));
