import { HABIT_CATEGORIES } from "@/constants/const";
import { Habit, HabitType } from "@/constants/types";
import { create } from "zustand";

interface HabitStoreState {
  habits: Habit[];
  categories: HabitType[];
  habitsByCategory: Record<HabitType, Habit[]>;
  percentageComplete: number;
  modifyStatus: (habitId: string, status: boolean) => void;
  modalOpen: boolean;
  toggleModal: (value?: boolean) => void;
}

const MOCK_HABITS: Habit[] = [
  {
    id: "1",
    title: "Beber Agua",
    category: "health",
    icon: "health_hydration",
    targetValue: 8,
    currentValue: 3,
    unit: "vasos",
    completed: false,
    color: "sage",
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
    color: "lavender",
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
    color: "sage",
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
    color: "lavender",
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
    color: "sand",
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
    color: "sage",
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
    color: "peach",
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
  },
];

export const useHabitStore = create<HabitStoreState>((set, get) => ({
  habits: MOCK_HABITS,
  categories: Object.keys(HABIT_CATEGORIES) as HabitType[],
  habitsByCategory: getHabitsByCategory(MOCK_HABITS),
  percentageComplete: getPercentage(MOCK_HABITS),
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
    (MOCK_HABITS.reduce((acc, i) => (i.completed ? acc + 1 : acc), 0) * 100) /
    MOCK_HABITS.length
  );
}
