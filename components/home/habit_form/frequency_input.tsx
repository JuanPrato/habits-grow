import { Pressable, View } from "react-native";

import { Typography } from "@/components/ui/typography";
import { HabitFrequency } from "@/constants/types";
import { useHabitColor } from "@/hooks/useHabitColor";
import { useState } from "react";
import { NewHabitInputProps } from "./new_habit_form";


const WEEK_DAYS = [
  { label: "L", value: 1 },
  { label: "M", value: 2 },
  { label: "X", value: 3 },
  { label: "J", value: 4 },
  { label: "V", value: 5 },
  { label: "S", value: 6 },
  { label: "D", value: 0 },
];

export function FrequencyInput(props: NewHabitInputProps) {

  const color = useHabitColor(props.value.color || "emerald");
  const [frequency, setFrequency] = useState<HabitFrequency>("daily");
  const [days, setDays] = useState<number[]>([]);

  const toggleDay = (day: number) => {
    setDays((prev) =>
      prev.includes(day)
        ? prev.filter((d) => d !== day)
        : [...prev, day]
    );
  };

  return (
    <>
      <View className="gap-2">
        <Typography type="label">
          Frecuencia
        </Typography>

        <View className="flex-row gap-2">
          <Pressable
            onPress={() => {
              setFrequency("daily");
              setDays([]);
            }}
            className={`flex-1 py-3 rounded-xl border items-center ${frequency === "daily"
              ? `${color.bg} ${color.border}`
              : "border-gray-300"
              }`}
          >
            <Typography>Todos los días</Typography>
          </Pressable>

          <Pressable
            onPress={() => setFrequency("custom")}
            className={`flex-1 py-3 rounded-xl border items-center ${frequency === "custom"
              ? `${color.bg} ${color.border}`
              : "border-gray-300"
              }`}
          >
            <Typography>Días específicos</Typography>
          </Pressable>
        </View>
      </View>

      {/* Días de la semana */}
      {frequency === "custom" && (
        <View>
          <Typography className="text-sm text-gray-500 mb-2">
            Elegí los días
          </Typography>

          <View className="flex-row justify-between">
            {WEEK_DAYS.map((day) => {
              const active = days.includes(day.value);
              return (
                <Pressable
                  key={day.value}
                  onPress={() => toggleDay(day.value)}
                  className={`w-10 h-10 rounded-full items-center justify-center border-2 ${active
                    ? `${color.bg} ${color.border}`
                    : "bg-gray-100 border-gray-300"
                    }`}
                >
                  <Typography
                    className={`font-medium text-gray-800`}
                  >
                    {day.label}
                  </Typography>
                </Pressable>
              );
            })}
          </View>
        </View>
      )}
    </>
  )
}