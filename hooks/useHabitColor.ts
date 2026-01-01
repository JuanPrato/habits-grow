import { HABIT_COLORS } from "@/constants/const";
import { HabitColor } from "@/constants/types";

export function useHabitColor(color: HabitColor) {
  const habitColor = HABIT_COLORS[color];

  return {
    bg: habitColor.bg,
    icon: habitColor.icon,
    border: habitColor.border,
    cardBg: habitColor.cardBg,
  };
}
