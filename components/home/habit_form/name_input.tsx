import { Typography } from "@/components/ui/typography";
import { theme } from "@/constants/theme";
import { useHabitColor } from "@/hooks/useHabitColor";
import { useState } from "react";
import { TextInput, View } from "react-native";
import { NewHabitInputProps } from "./new_habit_form";

export function NameInput(props: NewHabitInputProps) {

  const [title, setTitle] = useState("");
  const color = useHabitColor(props.value.color ?? "sage");

  return (
    <View className="gap-2">
      <Typography type="label">
        Nombre del hábito
      </Typography>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Ej: Beber agua"
        placeholderTextColor={theme.colors.gray[800]}
        className={`border ${color.border} ${color.bg} rounded-xl px-4 py-3 text-base`}
      />
    </View>
  )
}