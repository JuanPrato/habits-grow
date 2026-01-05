import { Pressable, View } from "react-native";

import { Typography } from "@/components/ui/typography";
import { useHabitColor } from "@/hooks/useHabitColor";
import { NewHabitInputProps } from "./new_habit_form";

const WEEK_DAYS = [
  { label: "D", value: 0 },
  { label: "L", value: 1 },
  { label: "M", value: 2 },
  { label: "X", value: 3 },
  { label: "J", value: 4 },
  { label: "V", value: 5 },
  { label: "S", value: 6 },
];

export function FrequencyInput(props: NewHabitInputProps) {
  const color = useHabitColor(props.value.color || "emerald");

  const toggleDay = (day: number) => {
    props.onChange({
      ...props.value,
      days: props.value.days?.includes(day)
        ? props.value.days.filter((d) => d !== day)
        : [...(props.value.days ?? []), day],
    });
  };

  return (
    <>
      <View className="gap-2">
        <Typography type="label">Frecuencia</Typography>

        <View className="flex-row gap-2">
          <Pressable
            onPress={() => {
              props.onChange({ ...props.value, frequency: "daily", days: [] });
            }}
            className={`flex-1 py-3 rounded-xl border items-center ${
              props.value.frequency === "daily"
                ? `${color.bg} ${color.border}`
                : "border-gray-300"
            }`}
          >
            <Typography>Todos los días</Typography>
          </Pressable>

          <Pressable
            onPress={() =>
              props.onChange({ ...props.value, frequency: "custom" })
            }
            className={`flex-1 py-3 rounded-xl border items-center ${
              props.value.frequency === "custom"
                ? `${color.bg} ${color.border}`
                : "border-gray-300"
            }`}
          >
            <Typography>Días específicos</Typography>
          </Pressable>
        </View>
      </View>

      {/* Días de la semana */}
      {props.value.frequency === "custom" && (
        <View>
          <Typography className="text-sm text-gray-500 mb-2">
            Elegí los días
          </Typography>

          <View className="flex-row justify-between">
            {WEEK_DAYS.map((day) => {
              const active = props.value.days?.includes(day.value);
              return (
                <Pressable
                  key={day.value}
                  onPress={() => toggleDay(day.value)}
                  className={`w-10 h-10 rounded-full items-center justify-center border-2 ${
                    active
                      ? `${color.bg} ${color.border}`
                      : "bg-gray-100 border-gray-300"
                  }`}
                >
                  <Typography className={`font-medium text-gray-800`}>
                    {day.label}
                  </Typography>
                </Pressable>
              );
            })}
          </View>
        </View>
      )}
    </>
  );
}
