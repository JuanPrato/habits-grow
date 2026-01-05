import { Typography } from "@/components/ui/typography";
import { Switch, View } from "react-native";
import { NewHabitInputProps } from "./new_habit_form";

export function OptionsInput(props: NewHabitInputProps) {
  return (
    <View className="gap-4">
      <View className="flex-row justify-between items-center">
        <Typography type="label">Recordatorios</Typography>
        <Switch
          value={props.value.notifications}
          onValueChange={() =>
            props.onChange({
              ...props.value,
              notifications: !props.value.notifications,
            })
          }
        />
      </View>

      <View className="flex-row justify-between items-center">
        <Typography type="label">Sincronizar con calendario</Typography>
        <Switch
          value={props.value.calendarSync}
          onValueChange={() =>
            props.onChange({
              ...props.value,
              calendarSync: !props.value.calendarSync,
            })
          }
        />
      </View>
    </View>
  );
}
