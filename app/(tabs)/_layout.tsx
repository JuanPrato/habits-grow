import { Tabs } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";

import { HomeIcon, ProfileIcon, StatsIcon } from "@/components/ui/icon";
import { useAuth } from "@/hooks/useAuth";
import { ModalProvider } from "@/provider/modal.provider";
import { useHabitStore } from "@/store/habits.store";
import { useThemeStore } from "@/store/theme.store";
import { useUserStore } from "@/store/user.store";

export default function TabsLayout() {
  const theme = useThemeStore((s) => s.theme);

  const { user, loading } = useAuth();
  const checkStreak = useUserStore((s) => s.checkCurrentStreak);
  const updateHabits = useHabitStore((s) => s.syncHabits);

  useEffect(() => {
    if (loading || !user) return;
    updateHabits().then(() => {
      checkStreak();
    });
  }, [user, loading]);

  return (
    <ModalProvider>
      <View style={{ flex: 1 }}>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarLabelStyle: {
              color: theme.colors.primary["900"],
            },
            tabBarStyle: {
              backgroundColor: theme.colors.primary[50],
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
                    color={props.focused ? "primary.900" : "primary.500"}
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
                    color={props.focused ? "primary.900" : "primary.500"}
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
                    color={props.focused ? "primary.900" : "primary.500"}
                  />
                );
              },
            }}
          />
        </Tabs>
      </View>
    </ModalProvider>
  );
}
