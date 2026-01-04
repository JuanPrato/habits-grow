import "../global.css";

import { SafeAreaProvider } from "react-native-safe-area-context";

import { ThemeProvider } from "@/provider/theme.provider";
import { useThemeStore } from "@/store/theme.store";
import { Stack } from "expo-router";

export default function RootLayout() {

  const theme = useThemeStore(s => s.theme);

  return (
    <ThemeProvider>
      <SafeAreaProvider key={theme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Protected guard={true}>
            <Stack.Screen name="(tabs)" />
          </Stack.Protected>
        </Stack>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
