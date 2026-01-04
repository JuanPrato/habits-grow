import { HABIT_COLORS } from "@/constants/const";
import { HabitColor } from "@/constants/types";
import { getColor } from "@/constants/utils";
import { useThemeStore } from "@/store/theme.store";

export function useHabitColor(color?: HabitColor) {
  const themeName = useThemeStore((s) => s.themeName);

  const habitColor = HABIT_COLORS[color ?? themeName];

  return {
    bg: habitColor.bg,
    hex: getColor(habitColor.bgGet),
    icon: habitColor.icon,
    border: habitColor.border,
    cardBg: habitColor.cardBg,
  };
}
