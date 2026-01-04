import "../global.css";

import { SafeAreaProvider } from "react-native-safe-area-context";

import { ThemeProvider } from "@/provider/theme.provider";
import { Stack } from "expo-router";

export default function RootLayout() {
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
