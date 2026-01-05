import { Habit, HabitDay } from "@/constants/types";
import { useAuth } from "@/hooks/useAuth";
import { useHabitColor } from "@/hooks/useHabitColor";
import { useHabitStore } from "@/store/habits.store";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Card } from "../ui/card";
import { FlameIcon, HABIT_ICONS } from "../ui/icon";
import { Typography } from "../ui/typography";

const DAYS = ["D", "L", "M", "M", "J", "V", "S"];

type DayStat = {
  day: number;
  selected: boolean;
  completed?: boolean;
};

type WeeklyHabitStatsProps = {
  habitName: string;
  selected: Habit | undefined;
};

export function WeeklyHabitStatsCard({
  habitName,
  selected,
}: WeeklyHabitStatsProps) {
  const [week, setWeek] = useState<HabitDay[]>([]);

  const days = useHabitStore((s) => s.days);
  const getDays = useHabitStore((s) => s.getHabitWeek);
  const { user } = useAuth();

  useEffect(() => {
    if (!selected) return;
    getDays(selected, user?.id);
  }, [selected]);

  useEffect(() => {
    if (!selected) return;
    setWeek([...(days?.[selected.id] ?? [])]);
  }, [days]);

  const completedDays = week.filter((d) => d.completed).length;
  const totalWeekDays = week.filter((d) => d.selected).length;

  const color = useHabitColor(selected?.color);
  const Icon = selected ? HABIT_ICONS[selected.icon] : undefined;

  return (
    <Card className={`p-4 ${color.cardBg} ${color.border}`}>
      {/* Title */}
      <View className="flex-row gap-1">
        {Icon && <Icon color={color.icon} />}
        <Typography size="lg" className="mb-3">
          {habitName} · Esta semana
        </Typography>
      </View>

      {/* Days row */}
      <View className="flex-row justify-between mb-4">
        {week.map((day, index) => (
          <View key={index} className="items-center flex-1">
            <View
              className={`w-8 h-8 rounded-full items-center justify-center ${
                day.selected
                  ? day.completed
                    ? "bg-green-500"
                    : "bg-yellow-200"
                  : "bg-gray-200"
              }`}
            >
              {day.completed && (
                <Typography className="text-white" size="sm">
                  ✓
                </Typography>
              )}
            </View>

            <Typography className="mt-1" type="info">
              {DAYS[day.day]}
            </Typography>
          </View>
        ))}
      </View>

      {/* Summary */}
      <View className="flex-row justify-between">
        <Typography className="text-gray-600" size="sm">
          {completedDays} de {totalWeekDays} días cumplidos
        </Typography>

        <Typography className="text-green-600" size="sm" wight="medium">
          {completedDays >= 5 ? "Muy bien 🌱" : "Seguimos creciendo"}
        </Typography>
      </View>
      {!!selected && (
        <View className="border-t border-gray-200 pt-2 mt-2 flex-row items-center gap-1">
          <FlameIcon color="red.400" />
          <Typography wight="semibold">Constancia</Typography>
          <Typography size="sm">{completedDays} semanas seguidas</Typography>
        </View>
      )}
    </Card>
  );
}
