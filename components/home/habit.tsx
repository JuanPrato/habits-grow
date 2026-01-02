import type { Habit as HabitType } from "@/constants/types";
import { useHabitColor } from "@/hooks/useHabitColor";
import { useHabitStore } from "@/store/habits.store";
import { useState } from "react";
import { Pressable, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  ZoomIn,
} from "react-native-reanimated";
import { CheckIcon, HABIT_ICONS } from "../ui/icon";
import { Typography } from "../ui/typography";

interface Props {
  habit: HabitType;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function Habit({ habit }: Props) {
  const color = useHabitColor(habit.color);
  const [completed, setCompleted] = useState(habit.completed);
  const modifyStatus = useHabitStore((s) => s.modifyStatus);

  const Icon = HABIT_ICONS[habit.icon];

  function handlePress() {
    modifyStatus(habit.id, !completed);
    setCompleted((c) => !c);

    scale.value = withSequence(
      withSpring(1.03, {
        duration: 150,
      }),
      withSpring(1, {
        duration: 150,
      })
    );
  }

  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      className={[
        "w-full p-4 my-2 border rounded-3xl flex-row gap-4 justify-between",
        color.cardBg,
        color.border,
      ].join(" ")}
      onPress={handlePress}
      style={animatedStyle}
    >
      <View className="flex-row gap-4" pointerEvents="none">
        <View
          className={[
            "rounded-3xl border-2 aspect-square justify-center items-center",
            color.bg,
            color.border,
          ].join(" ")}
        >
          <Icon color={color.icon} size="md" />
        </View>
        <View className="justify-center gap-1">
          <Typography type="headerTitle" size="xl" wight="medium">
            {habit.title}
          </Typography>
          <Typography type="subtitle" wight="light" size="md">
            {`${habit.currentValue} / ${habit.targetValue}`}
          </Typography>
        </View>
      </View>
      <View className="justify-center" pointerEvents="none">
        <View
          className={[
            "border-2 rounded-full size-10 items-center justify-center",
            color.border,
          ].join(" ")}
        >
          {completed && (
            <Animated.View
              className={
                "size-8 rounded-full items-center justify-center " + color.bg
              }
              entering={ZoomIn}
            >
              <CheckIcon color={color.icon} />
            </Animated.View>
          )}
        </View>
      </View>
    </AnimatedPressable>
  );
}
