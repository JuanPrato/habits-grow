import { Tabs } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { AddHabitSheet } from "@/components/home/add_habit_sheet";
import { HomeIcon, ProfileIcon, StatsIcon } from "@/components/ui/icon";
import { theme } from "@/constants/theme";
import { useHabitStore } from "@/store/habits.store";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function TabsLayout() {
  const openModal = useHabitStore((s) => s.modalOpen);
  const toggleModal = useHabitStore((s) => s.toggleModal);

  return (
    <GestureHandlerRootView className="flex-1 bg-blue-200" style={{ flex: 1 }}>
      <SafeAreaView className="bg-white flex-1" edges={["top"]}>
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
        </View>
        {openModal && <AddHabitSheet onClose={() => toggleModal(false)} />}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
