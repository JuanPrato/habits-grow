import { HABIT_CATEGORIES } from "@/constants/const";
import { Habit, HabitType } from "@/constants/types";
import { create } from "zustand";

interface HabitStoreState {
  habits: Habit[];
  updateHabits: (habits: Habit[]) => void;
  categories: HabitType[];
  habitsByCategory: Record<HabitType, Habit[]>;
  percentageComplete: number;
  modifyStatus: (habitId: string, status: boolean) => void;
  modalOpen: boolean;
  toggleModal: (value?: boolean) => void;
}

export const MOCK_HABITS: Habit[] = [
  {
    id: "1",
    title: "Beber Agua",
    category: "health",
    icon: "health_hydration",
    targetValue: 8,
    currentValue: 3,
    unit: "vasos",
    completed: false,
    color: "emerald",
    days: [
      { day: 0, selected: true, completed: true },
      { day: 1, selected: false, completed: false },
      { day: 2, selected: false, completed: false },
      { day: 3, selected: false, completed: false },
      { day: 4, selected: false, completed: false },
      { day: 5, selected: false, completed: false },
      { day: 6, selected: false, completed: false },
    ],
  },
  {
    id: "2",
    title: "Meditación Matutina",
    category: "mind",
    icon: "mind_meditation",
    targetValue: 1,
    currentValue: 1,
    unit: "sesión",
    completed: true,
    color: "violet",
    days: [
      { day: 1, selected: true, completed: true },
      { day: 2, selected: true, completed: true },
      { day: 3, selected: true, completed: true },
      { day: 4, selected: true, completed: true },
      { day: 5, selected: true, completed: true },
      { day: 6, selected: true, completed: true },
      { day: 7, selected: true, completed: true },
    ],
  },
  {
    id: "3",
    title: "Lectura",
    category: "growth",
    icon: "growth_reading",
    targetValue: 20,
    currentValue: 10,
    unit: "páginas",
    completed: false,
    color: "sky",
    days: [
      { day: 1, selected: true, completed: true },
      { day: 2, selected: false, completed: false },
      { day: 3, selected: true, completed: true },
      { day: 4, selected: false, completed: false },
      { day: 5, selected: true, completed: true },
      { day: 6, selected: false, completed: false },
      { day: 7, selected: true, completed: true },
    ],
  },
  {
    id: "4",
    title: "Ejercicio Diario",
    category: "health",
    icon: "health_exercise",
    targetValue: 30,
    currentValue: 0,
    unit: "minutos",
    completed: false,
    color: "emerald",
    days: [
      { day: 1, selected: true, completed: true },
      { day: 2, selected: true, completed: true },
      { day: 3, selected: true, completed: false },
      { day: 4, selected: true, completed: false },
      { day: 5, selected: true, completed: true },
      { day: 6, selected: false, completed: false },
      { day: 7, selected: false, completed: false },
    ],
  },
  {
    id: "5",
    title: "Escribir Diario",
    category: "growth",
    icon: "growth_writing",
    targetValue: 1,
    currentValue: 0,
    unit: "entrada",
    completed: false,
    color: "violet",
    days: [
      { day: 1, selected: false, completed: false },
      { day: 2, selected: false, completed: false },
      { day: 3, selected: false, completed: false },
      { day: 4, selected: false, completed: false },
      { day: 5, selected: false, completed: false },
      { day: 6, selected: false, completed: false },
      { day: 7, selected: false, completed: false },
    ],
  },
  {
    id: "6",
    title: "Limpiar Escritorio",
    category: "life",
    icon: "life_organization",
    targetValue: 1,
    currentValue: 1,
    unit: "vez",
    completed: true,
    color: "amber",
    days: [
      { day: 1, selected: true, completed: true },
      { day: 2, selected: false, completed: false },
      { day: 3, selected: false, completed: false },
      { day: 4, selected: false, completed: false },
      { day: 5, selected: false, completed: false },
      { day: 6, selected: false, completed: false },
      { day: 7, selected: false, completed: false },
    ],
  },
  {
    id: "7",
    title: "Caminar 10k Pasos",
    category: "health",
    icon: "health_movement",
    targetValue: 10000,
    currentValue: 4500,
    unit: "pasos",
    completed: false,
    color: "emerald",
    days: [
      { day: 1, selected: true, completed: true },
      { day: 2, selected: true, completed: true },
      { day: 3, selected: false, completed: false },
      { day: 4, selected: true, completed: true },
      { day: 5, selected: false, completed: false },
      { day: 6, selected: true, completed: true },
      { day: 7, selected: false, completed: false },
    ],
  },
  {
    id: "8",
    title: "Sin Redes Sociales",
    category: "productivity",
    icon: "productivity_digital_detox",
    targetValue: 60,
    currentValue: 40,
    unit: "minutos",
    completed: false,
    color: "rose",
    days: [
      { day: 1, selected: false, completed: false },
      { day: 2, selected: true, completed: true },
      { day: 3, selected: false, completed: false },
      { day: 4, selected: true, completed: true },
      { day: 5, selected: false, completed: false },
      { day: 6, selected: true, completed: true },
      { day: 7, selected: false, completed: false },
    ],
  },
  {
    id: "9",
    title: "Estudiar Código",
    category: "growth",
    icon: "growth_study",
    targetValue: 2,
    currentValue: 1,
    unit: "horas",
    completed: false,
    color: "sky",
    days: [
      { day: 1, selected: true, completed: true },
      { day: 2, selected: true, completed: true },
      { day: 3, selected: false, completed: false },
      { day: 4, selected: true, completed: true },
      { day: 5, selected: false, completed: false },
      { day: 6, selected: true, completed: true },
      { day: 7, selected: false, completed: false },
    ],
  },
  {
    id: "10",
    title: "Dormir 8 Horas",
    category: "health",
    icon: "health_sleep",
    targetValue: 8,
    currentValue: 0,
    unit: "horas",
    completed: false,
    color: "sky",
    days: [
      { day: 1, selected: true, completed: false },
      { day: 2, selected: true, completed: true },
      { day: 3, selected: true, completed: false },
      { day: 4, selected: true, completed: true },
      { day: 5, selected: true, completed: true },
      { day: 6, selected: true, completed: true },
      { day: 7, selected: true, completed: true },
    ],
  },
];

export const useHabitStore = create<HabitStoreState>((set, get) => ({
  habits: [],
  updateHabits(habits) {
    set({
      habits: habits,
      habitsByCategory: getHabitsByCategory(habits),
      percentageComplete: getPercentage(habits),
    });
  },
  categories: Object.keys(HABIT_CATEGORIES) as HabitType[],
  habitsByCategory: getHabitsByCategory([]),
  percentageComplete: getPercentage([]),
  modifyStatus(habitId, status) {
    const habit = get().habits.find((h) => h.id === habitId);

    if (!habit) return;
    habit.completed = status;

    set({
      habits: [...get().habits],
      habitsByCategory: getHabitsByCategory(get().habits),
      percentageComplete: getPercentage(get().habits),
    });
  },
  modalOpen: false,
  toggleModal(value?: boolean) {
    set({
      modalOpen: value ?? !get().modalOpen,
    });
  },
}));

function getHabitsByCategory(habits: Habit[]) {
  return habits.reduce(
    (acc, item) => {
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
  return (
    (habits.reduce((acc, i) => (i.completed ? acc + 1 : acc), 0) * 100) /
    habits.length
  );
}
