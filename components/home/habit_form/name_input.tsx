import { Typography } from "@/components/ui/typography";
import { useHabitColor } from "@/hooks/useHabitColor";
import { useThemeStore } from "@/store/theme.store";
import { TextInput, View } from "react-native";
import { NewHabitInputProps } from "./new_habit_form";

export function NameInput(props: NewHabitInputProps) {
  const theme = useThemeStore((s) => s.theme);
  const color = useHabitColor(props.value.color ?? "emerald");

  return (
    <View className="gap-2">
      <Typography type="label">Nombre del hábito</Typography>
      <TextInput
        value={props.value.title}
        onChangeText={(t) => props.onChange({ ...props.value, title: t })}
        placeholder="Ej: Beber agua"
        placeholderTextColor={theme.colors.gray[800]}
        className={`border ${color.border} ${color.bg} rounded-xl px-4 py-3 text-base`}
      />
    </View>
  );
}
