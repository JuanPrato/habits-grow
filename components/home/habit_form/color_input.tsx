import { Typography } from "@/components/ui/typography";
import { HABIT_COLORS } from "@/constants/const";
import { useState } from "react";
import { Pressable, View } from "react-native";
import { NewHabitInputProps } from "./new_habit_form";

export function ColorInput(props: NewHabitInputProps) {

  const [color, setColor] = useState<keyof typeof HABIT_COLORS | undefined>();

  function setColorAndNotify(c: keyof typeof HABIT_COLORS) {
    setColor(c);
    props.onChange({
      ...props.value,
      color: c,
    });
  }

  return (
    <View className="gap-2">
      <Typography type="label">
        Color de resalte
      </Typography>

      <View className="flex-row gap-3 justify-between">
        {Object.entries(HABIT_COLORS).map(([key, c]) => (
          <Pressable
            key={key}
            onPress={() => setColorAndNotify(key as keyof typeof HABIT_COLORS)}
            className={`size-14 rounded-full ${c.bg} ${color === key ? `border-2 ${c.border}` : ""
              }`}
          />
        ))}
      </View>
    </View>

  )
}