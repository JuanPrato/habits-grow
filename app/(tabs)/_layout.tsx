import { Tabs } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { HomeIcon, ProfileIcon, StatsIcon } from "@/components/ui/icon";
import { theme } from "@/constants/theme";

export default function TabsLayout() {
  return (
    <SafeAreaView className="bg-white flex-1" edges={["top"]}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarLabelStyle: {
            color: theme.colors.primary["900"],
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Inicio",
            tabBarIcon(props) {
              return (
                <HomeIcon
                  color={props.focused ? "primary.900" : "primary.700"}
                />
              );
            },
          }}
        />
        <Tabs.Screen
          name="stats"
          options={{
            title: "Estadísticas",
            tabBarIcon(props) {
              return (
                <StatsIcon
                  color={props.focused ? "primary.900" : "primary.700"}
                />
              );
            },
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Perfil",
            tabBarIcon(props) {
              return (
                <ProfileIcon
                  color={props.focused ? "primary.900" : "primary.700"}
                />
              );
            },
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
