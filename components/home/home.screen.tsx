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
            <View className="p-2">
              <Typography type="sectionTitle" size="xl">
                {HABIT_CATEGORIES[
                  section.title as keyof typeof HABIT_CATEGORIES
                ] ?? ""}
                {/* TODO: Agregar cuantas tareas de la sección estan completas */}
              </Typography>
            </View>
          )}
          scrollEventThrottle={16}
          onScroll={handleScroll}
          style={[listStyle]}
          stickySectionHeadersEnabled={false}
        />
      </View>
      <FloatingActionButton
        onPress={() => console.log("PRESS")}
        scroll={scrollY}
      />
    </Screen>
  );
}
