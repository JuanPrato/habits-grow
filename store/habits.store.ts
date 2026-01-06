import {
  createHabit,
  getHabits,
  getMonthDays,
  getWeekDays,
  updateHabit,
} from "@/api/habits.api";
import { HABIT_CATEGORIES } from "@/constants/const";
import { Habit, HabitDay, HabitType } from "@/constants/types";
import { NewHabitPayload } from "@/schemas/habit.schema";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type MonthStats = {
  total: number;
  complete: number;
  percentage: number;
};

interface HabitStoreState {
  habits: Habit[];
  days: Record<string, HabitDay[]>;
  syncHabits: () => Promise<void>;
  categories: HabitType[];
  percentageComplete: number;
  modifyStatus: (habitId: string, status: boolean) => Promise<void>;
  addNewHabit: (payload: NewHabitPayload) => Promise<void>;
  getHabitWeek: (habit: Habit) => Promise<HabitDay[]>;
  getMonthStats: (habits: Habit[]) => Promise<MonthStats>;
}

const getTodayIndex = () => new Date().getDay();

function calculatePercentage(habits: Habit[]): number {
  const todayIndex = getTodayIndex();
  const todayHabits = habits.filter((h) => h.frequency[todayIndex]);

  if (todayHabits.length === 0) return 0;

  const completedCount = todayHabits.filter((h) => h.completed).length;
  return (completedCount * 100) / todayHabits.length;
}

export const useHabitStore = create<HabitStoreState>()(
  persist(
    (set, get) => ({
      habits: [],
      days: {},
      categories: Object.keys(HABIT_CATEGORIES) as HabitType[],
      percentageComplete: 0,

      async syncHabits() {
        const fetchedHabits = await getHabits();
        set({
          habits: fetchedHabits,
          days: { ...get().days },
          percentageComplete: calculatePercentage(fetchedHabits),
        });
      },

      async modifyStatus(habitId, status) {
        await updateHabit(habitId, status);
        get().syncHabits();
      },

      async addNewHabit(payload) {
        await createHabit(payload);
        get().syncHabits();
      },

      async getHabitWeek(habit) {
        const cached = get().days[habit.id];
        if (cached) return cached;

        const days = await getWeekDays(habit);
        set({
          days: { ...get().days, [habit.id]: days },
        });
        return days;
      },

      async getMonthStats(habits) {
        const completed = await getMonthDays();
        const total =
          habits.reduce(
            (acc, h) =>
              acc +
              h.frequency.reduce(
                (freqAcc, freq) => freqAcc + (freq ? 1 : 0),
                0
              ),
            0
          ) * 4;

        return {
          complete: completed ?? 0,
          percentage: total === 0 ? 0 : (completed ?? 0) / (total || 1),
          total,
        };
      },
    }),
    {
      name: "habits-storage",
      partialize: (state) => ({
        habits: state.habits,
        percentageComplete: state.percentageComplete,
      }),
    }
  )
);

/**
 * Agrupa hábitos por categoría.
 * Si today es true, solo incluye los asignados al día actual.
 */
export function getHabitsByCategory(habits: Habit[], today?: boolean) {
  const todayIndex = getTodayIndex();
  return habits.reduce(
    (acc, habit) => {
      if (today && !habit.frequency[todayIndex]) return acc;
      if (!acc[habit.category]) acc[habit.category] = [];
      acc[habit.category].push(habit);
      return acc;
    },
    {} as Record<HabitType, Habit[]>
  );
}
