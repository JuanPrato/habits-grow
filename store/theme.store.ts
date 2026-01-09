import { theme as themeT } from "@/constants/theme";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { zustandStorage } from "./mmkv.middleware";

export type ThemeName = "emerald" | "sky" | "violet" | "rose" | "amber";

type ThemeStoreState = {
  themeName: ThemeName;
  theme: typeof themeT;
  setTheme: (t: ThemeName) => void;
};

export const useThemeStore = create<ThemeStoreState>()(persist((set, get) => ({
  themeName: "emerald",
  theme: (() => {
    themeT.colors.primary = themeT.colors[get()?.themeName ?? "emerald"];
    return themeT;
  })(),
  setTheme(t) {
    themeT.colors.primary = themeT.colors[
      (t as keyof typeof themeT.colors) ?? "emerald"
    ] as any;
    set({
      themeName: t,
      theme: themeT,
    });
  },
}), {
  name: "theme",
  partialize: (state) => ({
    themeName: state.themeName
  }),
  storage: createJSONStorage(() => zustandStorage),
}));

useThemeStore.getState().setTheme(useThemeStore.getState().themeName);