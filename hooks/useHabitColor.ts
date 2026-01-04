import { HABIT_COLORS } from "@/constants/const";
import { HabitColor } from "@/constants/types";
import { getColor } from "@/constants/utils";

export function useHabitColor(color: HabitColor) {
  const habitColor = HABIT_COLORS[color];

  return {
    bg: habitColor.bg,
    hex: getColor(habitColor.bgGet),
    icon: habitColor.icon,
    border: habitColor.border,
    cardBg: habitColor.cardBg,
  };
}
