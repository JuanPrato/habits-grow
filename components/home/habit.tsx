import type { Habit as HabitType } from "@/constants/types";
import { useHabitColor } from "@/hooks/useHabitColor";
import { useHabitStore } from "@/store/habits.store";
import { useState } from "react";
import { Pressable, View } from "react-native";
import { CheckIcon, HABIT_ICONS } from "../ui/icon";
import { Typography } from "../ui/typography";

interface Props {
  habit: HabitType;
}

export function Habit({ habit }: Props) {
  const color = useHabitColor(habit.color);
  const [completed, setCompleted] = useState(habit.completed);
  const modifyStatus = useHabitStore((s) => s.modifyStatus);

  const Icon = HABIT_ICONS[habit.icon];

  function handlePress() {
    modifyStatus(habit.id, !completed);
    setCompleted((c) => !c);
  }

  return (
    <Pressable
      className="w-full p-3 border border-gray-300 my-1 rounded-xl flex-row gap-4 justify-between"
      onPress={handlePress}
    >
      <View className="flex-row gap-2">
        <View
          className={["p-3 rounded-xl border-2", color.bg, color.border].join(
            " "
          )}
        >
          <Icon color={color.icon} size="lg" />
        </View>
        <View className="justify-center gap-1">
          <Typography type="headerTitle" size="xl" wight="medium">
            {habit.title}
          </Typography>
          <Typography type="subtitle">
            {`${habit.currentValue} / ${habit.targetValue}`}
          </Typography>
        </View>
      </View>
      <View className="justify-center">
        <View
          className={[
            "border-2 rounded-full size-10 items-center justify-center",
            color.border,
            completed ? color.bg : "",
          ].join(" ")}
        >
          {completed && <CheckIcon color={color.icon} />}
        </View>
      </View>
    </Pressable>
  );
}
