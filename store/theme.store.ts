import { theme } from "@/constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

export type ThemeName = "emerald" | "sky" | "violet" | "rose" | "amber";

type ThemeStoreState = {
  theme: ThemeName;
  setTheme: (t: ThemeName) => void;
};

export const useThemeStore = create<ThemeStoreState>((set, get) => ({
  theme: "emerald",
  async setTheme(t) {
    await AsyncStorage.setItem("theme", t);

    set({
      theme: t,
    });
  },
}));

AsyncStorage.getItem("theme", (error, data) => {
  useThemeStore.setState({ theme: (data as any) ?? "emerald" });
  theme.colors.primary = theme.colors[data as keyof typeof theme.colors] as any;
});
