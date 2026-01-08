import {
  Habit,
  HabitColor,
  HabitDay,
  HabitFrequencyArr,
  HabitIcon,
  HabitType,
} from "@/constants/types";
import { getDate } from "@/constants/utils";
import { supabase } from "@/lib/supabase";
import { NewHabitPayload } from "@/schemas/habit.schema";
import dayjs from "dayjs";

// Utilidades para fechas

function calculateDays(
  period: "week" | "month",
  referenceDate = dayjs()
): string[] {
  const start = referenceDate.startOf(period);
  const count = period === "week" ? 7 : start.daysInMonth();

  return Array.from({ length: count }, (_, i) =>
    start.add(i, "day").format("YYYY-MM-DD")
  );
}

// Funciones principales

export async function getHabits(): Promise<Habit[]> {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) return [];

  const res = await supabase
    .from("habit")
    .select(`*, habit_history(count), completed:habit_history(count)`)
    .eq("user_id", user.id)
    .eq("habit_history.user_id", user.id)
    .eq("completed.user_id", user.id)
    .eq("completed.day", getDate())
    .eq("completed.completed", true);

  if (!res.data) return [];

  return res.data.map((item) => ({
    id: item.id,
    title: item.title,
    category: item.category as HabitType,
    icon: item.icon as HabitIcon,
    targetValue: Array.isArray(item.frequency)
      ? item.frequency.reduce((acc: number, v: boolean) => acc + (v ? 1 : 0), 0)
      : 0,
    currentValue: item.habit_history?.[0]?.count ?? 0,
    unit: "",
    completed: (item.completed?.[0]?.count ?? 0) === 1,
    color: item.color as HabitColor,
    frequency: item.frequency as HabitFrequencyArr,
    createdAt: dayjs(item.created_at),
  }));
}

export async function updateHabit(habitId: string, completed: boolean = true) {
  await supabase.from("habit_history").upsert({
    habit_id: habitId,
    completed,
    day: getDate(),
  });
}

export async function createHabit(payload: NewHabitPayload) {
  const freq: boolean[] = Array(7).fill(payload.frequency === "daily");

  if (payload.frequency === "custom")
    payload.days.forEach((dayIndex) => {
      freq[dayIndex] = true;
    });

  const res = await supabase.from("habit").insert({
    title: payload.title,
    category: payload.category,
    icon: payload.icon,
    color: payload.color,
    frequency: freq,
    notification: payload.notifications,
    calendar: payload.calendarSync,
  });

  if (res.error) {
    console.error("[habit:create] error:", res.error);
  }
}

export async function getMonthDays(): Promise<number> {
  const monthDays = calculateDays("month");

  const res = await supabase
    .from("habit_history")
    .select()
    .in("day", monthDays);

  if (res.error || !res.data) return 0;

  return res.data.reduce((acc, d) => acc + (d.completed ? 1 : 0), 0);
}

export async function getYesterdayDays(): Promise<HabitDay[]> {
  const y = dayjs().add(-1, "day");
  const yesterday = getDate();

  const res = await supabase
    .from("habit_history")
    .select()
    .eq("day", yesterday);

  if (res.error) throw res.error;

  return (res.data ?? []).map((item: any) => ({
    habitId: item.habit_id,
    day: y.day(),
    selected: true,
    completed: item.completed,
  }));
}

export async function getWeekDays(habit: Habit): Promise<HabitDay[]> {
  const weekDays = calculateDays("week");

  const res = await supabase
    .from("habit_history")
    .select()
    .eq("habit_id", habit.id)
    .in("day", weekDays);

  const histories = res.data ?? [];

  return weekDays.map((date, index) => {
    const history = histories.find((i) => i.day === date);
    return {
      habitId: habit.id,
      day: index,
      selected: habit.frequency[index],
      completed: history?.completed ?? false,
    };
  });
}

export async function updateStreak(streak: number): Promise<void> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.id) return;

  await supabase.from("profiles").update({ streak }).eq("id", user.id);
}
