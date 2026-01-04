import { theme } from "@/constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

export type ThemeName = "emerald" | "sky" | "violet" | "rose" | "amber";

type ThemeStoreState = {
  themeName: ThemeName;
  setTheme: (t: ThemeName) => void;
};

export const useThemeStore = create<ThemeStoreState>((set, get) => ({
  themeName: "emerald",
  theme: theme,
  async setTheme(t) {
    await AsyncStorage.setItem("theme", t);
    theme.colors.primary = theme.colors[
      (t as keyof typeof theme.colors) ?? "emerald"
    ] as any;
    set({
      themeName: t,
    });
  },
}));

AsyncStorage.getItem("theme", (error, data) => {
  useThemeStore.getState().setTheme((data as any) ?? "emerald");
});
