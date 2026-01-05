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

interface HabitStoreState {
  habits: Habit[];
  days: Record<string, HabitDay[]>;
  syncHabits: () => Promise<void>;
  categories: HabitType[];
  percentageComplete: number;
  modifyStatus: (
    habitId: string,
    status: boolean,
    auth?: boolean
  ) => Promise<void>;
  modalOpen: boolean;
  toggleModal: (value?: boolean) => void;
  addNewHabit: (payload: NewHabitPayload, userId: string) => Promise<void>;
  getHabitWeek: (habit: Habit, userId: string) => Promise<HabitDay[]>;
  getMonthStats: (
    habits: Habit[]
  ) => Promise<{ total: number; complete: number; percentage: number }>;
}

export const useHabitStore = create<HabitStoreState>()(
  persist(
    (set, get) => ({
      habits: [],
      days: {},
      async syncHabits() {
        const h = await getHabits();

        set({
          habits: h,
          days: { ...get().days },
          percentageComplete: getPercentage(h),
        });
      },
      categories: Object.keys(HABIT_CATEGORIES) as HabitType[],
      percentageComplete: getPercentage([]),
      async modifyStatus(habitId, status) {
        await updateHabit(habitId, status);
        get().syncHabits();
      },
      modalOpen: false,
      toggleModal(value?: boolean) {
        set({
          modalOpen: value ?? !get().modalOpen,
        });
      },
      async addNewHabit(payload: NewHabitPayload, userId: string) {
        await createHabit(payload);

        get().syncHabits();
      },
      async getHabitWeek(habit: Habit, userId: string) {
        const cache = get().days[habit.id];

        if (cache) return cache;

        const days = await getWeekDays(habit);

        set({
          days: { ...get().days, [habit.id]: days },
        });

        return days;
      },
      async getMonthStats(habits: Habit[]) {
        const completed = await getMonthDays();
        const total =
          habits.reduce(
            (acc, h) =>
              acc + h.frequency.reduce((ac, f) => ac + (f ? 1 : 0), 0),
            0
          ) * 4;

        return {
          complete: completed ?? 0,
          percentage: total === 0 ? 0 : (completed ?? 0) / (total ?? 1),
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

export function getHabitsByCategory(habits: Habit[], today?: boolean) {
  return habits.reduce(
    (acc, item) => {
      if (today && !item.frequency[new Date().getDay()]) return acc;
      if (acc[item.category]) {
        acc[item.category].push(item);
        return acc;
      }
      acc[item.category] = [item];
      return acc;
    },
    {} as Record<HabitType, Habit[]>
  );
}

function getPercentage(habits: Habit[]) {
  const todayHabits = habits.filter((h) => h.frequency[new Date().getDay()]);

  if (todayHabits.length === 0) return 0;

  return (
    (todayHabits.reduce((acc, i) => (i.completed ? acc + 1 : acc), 0) * 100) /
    todayHabits.length
  );
}

function emptyDays(habit: Habit) {
  return habit.frequency.map((s, i) => ({
    day: i,
    selected: s,
  }));
}
