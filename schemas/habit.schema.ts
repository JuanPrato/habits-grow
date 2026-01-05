import { HABIT_ICONS } from "@/components/ui/icon";
import { HABIT_COLORS, HABIT_TYPES } from "@/constants/const";
import { HabitIcon } from "@/constants/types";
import { ThemeName } from "@/store/theme.store";
import z from "zod";

export const newHabitSchema = z.object({
  title: z.string().min(2).max(20),
  category: z.literal(HABIT_TYPES),
  frequency: z.literal(["custom", "daily"]),
  days: z.array(z.number().max(6)).max(7),
  color: z.literal<ThemeName[]>(Object.keys(HABIT_COLORS) as ThemeName[]),
  icon: z.literal<HabitIcon[]>(Object.keys(HABIT_ICONS) as HabitIcon[]),
  notifications: z.boolean().default(false),
  calendarSync: z.boolean().default(false),
});

export type NewHabitPayload = z.infer<typeof newHabitSchema>;
