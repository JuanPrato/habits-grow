import { Tabs } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { AddHabitSheet } from "@/components/home/add_habit_sheet";
import { LevelUpOverlay } from "@/components/home/level_up";
import { HomeIcon, ProfileIcon, StatsIcon } from "@/components/ui/icon";
import { theme } from "@/constants/theme";
import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/auth.store";
import { useHabitStore } from "@/store/habits.store";
import { useModalStore } from "@/store/modal.store";
import { useUserStore } from "@/store/user.store";
import { useEffect } from "react";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function TabsLayout() {
  const openModal = useModalStore((s) => s.createHabit);
  const levelUp = useModalStore((s) => s.levelUp);
  const toggleModal = useModalStore((s) => s.setState);

  const { user } = useAuth();
  const loading = useAuthStore((s) => s.loading);
  const checkStreak = useUserStore((s) => s.checkCurrentStreak);
  const updateHabits = useHabitStore((s) => s.syncHabits);

  useEffect(() => {
    if (loading || !user) return;
    updateHabits().then(() => {
      checkStreak();
    });
  }, [user, loading]);

  return (
    <GestureHandlerRootView className="flex-1" style={{ flex: 1 }}>
      <SafeAreaView className="bg-primary-50 flex-1" edges={["top"]}>
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
        {openModal && (
          <AddHabitSheet onClose={() => toggleModal("createHabit", false)} />
        )}
        {levelUp && <LevelUpOverlay />}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
