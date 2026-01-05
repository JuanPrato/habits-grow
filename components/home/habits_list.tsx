import { SectionList, View } from "react-native";
import Animated, { ScrollHandlerProcessed } from "react-native-reanimated";

import { HABIT_CATEGORIES, HEADER_MAX_HEIGHT } from "@/constants/const";
import { Habit as HabitT, HabitType } from "@/constants/types";
import { getHabitsByCategory, useHabitStore } from "@/store/habits.store";
import { Badge } from "../ui/badge";
import { Typography } from "../ui/typography";
import { Habit } from "./habit";

const AnimatedSectionList = Animated.createAnimatedComponent(
  SectionList<HabitT>
);

export function HabitsList({
  handleScroll,
}: {
  handleScroll: ScrollHandlerProcessed<Record<string, unknown>>;
}) {
  const habits = useHabitStore((s) => s.habits);

  return (
    <View className="flex-1 px-2 !overflow-visible bg-primary-50">
      <AnimatedSectionList
        sections={Object.entries(getHabitsByCategory(habits, true)).map(
          ([key, value]) => ({
            title: key as HabitType,
            data: value,
          })
        )}
        renderItem={({ item }) => <Habit habit={item} />}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <>
            <View
              style={{ height: HEADER_MAX_HEIGHT }}
              className="-z-10 bg-primary-50"
            />
            <Typography type="title">Hábitos de hoy</Typography>
          </>
        }
        renderSectionHeader={({ section }) => (
          <View className="pt-2 pb-1 border-gray-300 items-start">
            <Badge outline className="!border py-0">
              <Typography
                type="sectionTitle"
                size="lg"
                className="text-gray-800 p-1"
              >
                {HABIT_CATEGORIES[
                  section.title as keyof typeof HABIT_CATEGORIES
                ] ?? ""}
                {/* TODO: Agregar cuantas tareas de la sección estan completas */}
              </Typography>
            </Badge>
          </View>
        )}
        scrollEventThrottle={16}
        onScroll={handleScroll}
        ListEmptyComponent={
          <Typography center type="subtitle">
            Todavía no tenes hábitos. Genera alguno con el botón de abajo
          </Typography>
        }
      />
    </View>
  );
}
