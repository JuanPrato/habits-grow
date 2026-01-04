import { HABIT_ICONS } from "@/components/ui/icon";
import { Typography } from "@/components/ui/typography";
import { HabitIcon } from "@/constants/types";
import { useHabitColor } from "@/hooks/useHabitColor";
import { useState } from "react";
import { Pressable, View } from "react-native";
import { NewHabitInputProps } from "./new_habit_form";

export function IconInput({
  value,
  onChange
}: NewHabitInputProps) {

  const color = useHabitColor(value.color);

  const [icon, setIcon] = useState<HabitIcon | undefined>(value.icon);

  return (
    <View className="gap-2">
      <Typography type="label">
        Ícono
      </Typography>

      <View className="flex-row flex-wrap gap-4 justify-between">
        {(Object.keys(HABIT_ICONS) as HabitIcon[]).map((key) => {
          if (!key.startsWith(value.category)) return null;
          const Icon = HABIT_ICONS[key];
          const selected = key === icon;

          return (
            <Pressable
              key={key}
              onPress={() => setIcon(key)}
              className={`size-12 border-2 rounded-xl items-center justify-center ${selected
                ? `${color.bg} ${color.border}`
                : "bg-gray-100 border-gray-300"
                }`}
            >
              <Icon
                color={selected ? color.icon : "gray.500"}
              />
            </Pressable>
          );
        }).filter(Boolean)}
      </View>
    </View>
  );
}
