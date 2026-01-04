import { Habit } from "@/constants/types";
import { useHabitStore } from "@/store/habits.store";
import { useState } from "react";
import { View } from "react-native";
import { Typography } from "../ui/typography";
import { HabitDropdown } from "./habit_dropdown";
import { WeeklyHabitStatsCard } from "./weekly_habit_stats_card";

export function WeeklyStats() {

  const habits = useHabitStore(s => s.habits);

  const [selectedHabit, setSelectedHabit] = useState<Habit | undefined>();

  return (
    <View className="mt-2 px-2 gap-2">
      <View className="flex-row justify-between">
        <Typography type="sectionTitle" size="xl" className="p-2">Progreso por hábito</Typography>
        <HabitDropdown onSelect={(v) => { setSelectedHabit(habits.find(h => h.id === v.id)) }} value={selectedHabit} />
      </View>
      <WeeklyHabitStatsCard
        selected={selectedHabit}
        habitName={selectedHabit?.title ?? "Selecciona un hábito"}
        week={selectedHabit ? selectedHabit.days : []}
      />
    </View>
  );
}