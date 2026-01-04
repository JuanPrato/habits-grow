import "../global.css";

import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from "react";
import { LogBox } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { ThemeProvider } from "@/provider/theme.provider";
import { useAuthStore } from "@/store/auth.store";
import { useHabitStore } from "@/store/habits.store";

LogBox.ignoreLogs(["var(--"])

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const user = useAuthStore(s => s.user);
  const loading = useAuthStore(s => s.loading);
  const updateHabits = useHabitStore(s => s.updateHabits);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loading) return;
    updateHabits(user?.id).finally(() => setLoaded(true));

  }, [user, loading]);

  useEffect(() => {
    if (loaded)
      SplashScreen.hide();
  }, [loaded]);

  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Protected guard={true}>
            <Stack.Screen name="(tabs)" />
          </Stack.Protected>
        </Stack>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
