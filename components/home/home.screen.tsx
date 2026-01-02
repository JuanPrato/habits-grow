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
import { Badge } from "../ui/badge";
import { Screen } from "../ui/screen";
import { Typography } from "../ui/typography";
import { Habit } from "./habit";
import { Header } from "./header";
import { FloatingActionButton } from "./new_button";

const AnimatedSectionList = Animated.createAnimatedComponent(
  SectionList<HabitT>
);

export function HomeScreen() {
  const habits = useHabitStore((s) => s.habitsByCategory);

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
      overflow: "visible",
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
            <Typography type="title">Hábitos de hoy</Typography>
          }
          renderSectionHeader={({ section }) => (
            <View className="pt-3 pb-1 border-gray-300 items-start">
              <Badge outline className="!border py-1">
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
          style={[listStyle]}
          stickySectionHeadersEnabled={false}
        />
      </View>
      <FloatingActionButton scroll={scrollY} />
    </Screen>
  );
}
