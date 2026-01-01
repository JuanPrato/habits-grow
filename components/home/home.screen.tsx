import { SectionList, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import { useHabitStore } from "@/store/habits.store";

import {
  HABIT_CATEGORIES,
  HEADER_COLLAPSE_DISTANCE,
  HEADER_MIN_HEIGHT,
} from "@/constants/const";
import { Habit as HabitT, HabitType } from "@/constants/types";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { Screen } from "../ui/screen";
import { Typography } from "../ui/typography";
import { AddHabitSheet } from "./add_habit_sheet";
import { Habit } from "./habit";
import { Header } from "./header";
import { FloatingActionButton } from "./new_button";

const AnimatedSectionList = Animated.createAnimatedComponent(
  SectionList<HabitT>
);

export function HomeScreen() {
  const habits = useHabitStore((s) => s.habitsByCategory);
  const [open, setOpen] = useState(false);

  const scrollY = useSharedValue(0);

  const handleScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const listStyle = useAnimatedStyle(() => {
    return {
      paddingTop: interpolate(
        scrollY.value,
        [0, HEADER_COLLAPSE_DISTANCE],
        [0, HEADER_MIN_HEIGHT],
        Extrapolation.CLAMP
      ),
    };
  }, [scrollY]);

  return (
    <Screen>
      <Header scroll={scrollY} />
      <View className="flex-1 px-2">
        <AnimatedSectionList
          sections={Object.entries(habits).map(([key, value]) => ({
            title: key as HabitType,
            data: value,
          }))}
          renderItem={({ item }) => <Habit habit={item} />}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <Typography type="title">Tareas de hoy</Typography>
          }
          renderSectionHeader={({ section }) => (
            <View className="py-2 border-gray-300 items-start">
              <Badge outline>
                <Typography
                  type="sectionTitle"
                  size="xl"
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
          style={[listStyle]}
          stickySectionHeadersEnabled={false}
        />
      </View>
      <FloatingActionButton onPress={() => setOpen(true)} scroll={scrollY} />
      {open && <AddHabitSheet onClose={() => setOpen(false)} />}
    </Screen>
  );
}
