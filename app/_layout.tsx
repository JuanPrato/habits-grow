import "../global.css";

import { SafeAreaProvider } from "react-native-safe-area-context";

import { getHabits } from "@/api/habits.api";
import { ThemeProvider } from "@/provider/theme.provider";
import { useAuthStore } from "@/store/auth.store";
import { MOCK_HABITS, useHabitStore } from "@/store/habits.store";
import { Stack } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {

  const user = useAuthStore(s => s.user);
  const setHabits = useHabitStore(s => s.updateHabits)

  useEffect(() => {
    if (user)
      getHabits(user.id).then(habits => {
        setHabits(habits);
      });
    else
      setHabits(MOCK_HABITS);
  }, [user]);

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
