import { getYesterdayDays, updateStreak } from "@/api/habits.api";
import { createProfile, getProfile, updateProfile } from "@/api/profile.api";
import { PETS } from "@/constants/const";
import { Profile } from "@/constants/types";
import dayjs from "dayjs";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useHabitStore } from "./habits.store";
import { zustandStorage } from "./mmkv.middleware";

const INVITE_PROFILE: Profile = {
  id: "",
  name: "Invitado",
  picture: null,
  streak: 0,
  pet: "TRAINING_WOMAN"
};

interface UserStoreState {
  profile: Profile | null;
  setProfile: () => Promise<void>;
  checkCurrentStreak: () => Promise<void>;
  changePet: (pet: typeof PETS[number]) => void;
  changeName: (name: string) => Promise<void>;
}

export const useUserStore = create<UserStoreState>()(
  persist((set, get) => ({
    profile: INVITE_PROFILE,

    async setProfile() {
      let profile = await getProfile();

      if (!profile) {
        await createProfile();
        profile = await getProfile();
      }

      set({ profile });
    },

    async checkCurrentStreak() {
      const profile = get().profile;

      if (!profile) return;

      const yesterday = dayjs().add(-1, "day").startOf("day");
      const yesterdayDay = yesterday.get("day");

      const yesterdayHabits = useHabitStore
        .getState()
        .habits.filter(
          (h) => h.frequency[yesterdayDay] && h.createdAt.isAfter(yesterday)
        );

      const yesterdayDays = await getYesterdayDays();

      if (yesterdayHabits.length > yesterdayDays.length) {
        await updateStreak(0);
      }

      if (yesterdayDays.every((d) => d.completed)) {
        await updateStreak(profile.streak + 1);
      } else {
        const notCompleted = yesterdayDays.filter((d) => !d.completed);

        if (
          notCompleted.every((d) =>
            yesterdayHabits.every((h) => h.id !== d.habitId)
          )
        ) {
          await updateStreak(profile.streak + 1);
        } else {
          await updateStreak(0);
        }
      }

      get().setProfile();
    },

    async changePet(pet) {
      const profile = get().profile;

      if (!profile) return;

      profile.pet = pet;

      set({
        profile: { ...profile }
      })
    },

    async changeName(name) {
      const profile = get().profile;

      if (!profile) return;

      profile.name = name;

      await updateProfile(profile);

      await get().setProfile();
    },
  }),
    {
      name: "profile",
      partialize: (state) => ({
        profile: state.profile
      }),
      storage: createJSONStorage(() => zustandStorage)
    }
  ));
