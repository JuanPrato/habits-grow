import { Habit, HabitColor, HabitIcon, HabitType } from "@/constants/types";
import { supabase } from "@/lib/supabase";

export async function getHabits(userId: string): Promise<Habit[]> {
  const res = await supabase.from("habit").select().eq("user_id", userId);

  if (!res.data) return [];

  return res.data.map((item) => ({
    id: item.id,
    title: item.title,
    category: item.category as HabitType,
    icon: item.icon as HabitIcon,
    targetValue: 5,
    currentValue: 3,
    unit: "",
    completed: false,
    color: item.color as HabitColor,
    days: item.frequency.map((d, i) => ({
      day: i,
      selected: d,
      completed: d,
    })),
  }));
}
