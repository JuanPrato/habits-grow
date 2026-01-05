import dayjs from "dayjs";

import {
  Habit,
  HabitColor,
  HabitDay,
  HabitFrequencyArr,
  HabitIcon,
  HabitType,
} from "@/constants/types";
import { supabase } from "@/lib/supabase";
import { NewHabitPayload } from "@/schemas/habit.schema";

export function getDate(date: Date) {
  return `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`;
}

function calculateWeekDays() {
  const today = new Date();
  today.getDay();
  today.setDate(today.getDate() - today.getDay());

  return Array.from({ length: 7 }).map(() => {
    const date = getDate(today);
    today.setDate(today.getDate() + 1);
    return date;
  });
}

function calculateMonthDays() {
  let today = dayjs().startOf("month");
  return Array.from({ length: today.daysInMonth() }).map(() => {
    const date = today.format("YYYY-MM-DD");
    today = today.add(1, "day");
    return date;
  });
}

export async function getHabits(): Promise<Habit[]> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const res = await supabase
    .from("habit")
    .select(`*, habit_history(count), completed:habit_history(count)`)
    .eq("user_id", user!.id)
    .eq("habit_history.user_id", user!.id)
    .eq("completed.user_id", user!.id)
    .eq("completed.day", getDate(new Date()))
    .eq("completed.completed", true);

  if (!res.data) return [];

  return res.data.map((item) => ({
    id: item.id,
    title: item.title,
    category: item.category as HabitType,
    icon: item.icon as HabitIcon,
    targetValue: item.frequency.reduce((acc, v) => acc + (v ? 1 : 0), 0),
    currentValue: item.habit_history[0].count,
    unit: "",
    completed: item.completed[0].count === 1,
    color: item.color as HabitColor,
    frequency: item.frequency as HabitFrequencyArr,
  }));
}

export async function updateHabit(habitId: string, completed?: boolean) {
  const res = await supabase.from("habit_history").upsert({
    habit_id: habitId,
    completed: completed === undefined ? true : completed,
    day: getDate(new Date()),
  });
}

export async function createHabit(payload: NewHabitPayload) {
  const freq = Array.from<boolean>({ length: 7 }).fill(false);

  payload.days.forEach((d) => {
    freq[d] = true;
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
    console.error(res.error);
  }
}

export async function getMonthDays() {
  const monthDays = calculateMonthDays();

  const res = await supabase
    .from("habit_history")
    .select()
    .in("day", monthDays);

  return res.data?.reduce((acc, d) => acc + (d.completed ? 1 : 0), 0);
}

export async function getWeekDays(habit: Habit): Promise<HabitDay[]> {
  const weeksDay = calculateWeekDays();

  const res = await supabase
    .from("habit_history")
    .select()
    .eq("habit_id", habit.id)
    .in("day", weeksDay);

  return weeksDay.map((day, index) => ({
    day: index,
    selected: habit.frequency[index],
    completed: res.data?.find((i) => i.day === day)?.completed ?? false,
  }));
}
