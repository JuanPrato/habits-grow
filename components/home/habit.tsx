import type { Habit as HabitType } from "@/constants/types";
import { useHabitColor } from "@/hooks/useHabitColor";
import { useAuthStore } from "@/store/auth.store";
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
  const user = useAuthStore((s) => s.user);
  const color = useHabitColor(habit.color);
  const [completed, setCompleted] = useState(habit.completed);
  const modifyStatus = useHabitStore((s) => s.modifyStatus);

  const Icon = HABIT_ICONS[habit.icon];

  function handlePress() {
    modifyStatus(habit.id, !completed, !!user);
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
        "w-full py-2 px-3 my-2 border rounded-3xl flex-row gap-4 justify-between overflow-visible",
        color.cardBg,
        color.border,
      ].join(" ")}
      onPress={handlePress}
      style={animatedStyle}
    >
      <View className="flex-row gap-4 flex-1 items-center" pointerEvents="none">
        <View
          className={[
            "rounded-2xl border-2 aspect-square justify-center items-center size-14",
            color.bg,
            color.border,
          ].join(" ")}
        >
          <Icon color={color.icon} size="md" />
        </View>
        <View className="justify-center flex-1">
          <Typography
            type="headerTitle"
            size="lg"
            wight="semibold"
            numberOfLines={1}
          >
            {habit.title}
          </Typography>
          <Typography type="subtitle" wight="light" size="md">
            {`${habit.currentValue} / ${habit.targetValue}`}
          </Typography>
        </View>
      </View>
      <View className="justify-center w-[30px]" pointerEvents="none">
        <View
          className={[
            "border-2 rounded-full size-8 items-center justify-center",
            color.border,
          ].join(" ")}
        >
          {completed && (
            <Animated.View
              className={
                "size-6 rounded-full items-center justify-center " + color.bg
              }
              entering={ZoomIn}
            >
              <CheckIcon color={color.icon} size="sm" />
            </Animated.View>
          )}
        </View>
      </View>
    </AnimatedPressable>
  );
}
