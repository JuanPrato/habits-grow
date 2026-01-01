import "../global.css";

import { SafeAreaProvider } from "react-native-safe-area-context";

import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={true}>
          <Stack.Screen name="(tabs)" />
        </Stack.Protected>
      </Stack>
    </SafeAreaProvider>
  );
}
