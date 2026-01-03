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
    days: [
      { day: "L", selected: true, completed: true },
      { day: "M", selected: false, completed: false },
      { day: "X", selected: false, completed: false },
      { day: "J", selected: false, completed: false },
      { day: "V", selected: false, completed: false },
      { day: "S", selected: false, completed: false },
      { day: "D", selected: false, completed: false },
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
    color: "lavender",
    days: [
      { day: "L", selected: true, completed: true },
      { day: "M", selected: true, completed: true },
      { day: "X", selected: true, completed: true },
      { day: "J", selected: true, completed: true },
      { day: "V", selected: true, completed: true },
      { day: "S", selected: true, completed: true },
      { day: "D", selected: true, completed: true },
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
      { day: "L", selected: true, completed: true },
      { day: "M", selected: false, completed: false },
      { day: "X", selected: true, completed: true },
      { day: "J", selected: false, completed: false },
      { day: "V", selected: true, completed: true },
      { day: "S", selected: false, completed: false },
      { day: "D", selected: true, completed: true },
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
    color: "sage",
    days: [
      { day: "L", selected: true, completed: true },
      { day: "M", selected: true, completed: true },
      { day: "X", selected: true, completed: false },
      { day: "J", selected: true, completed: false },
      { day: "V", selected: true, completed: true },
      { day: "S", selected: false, completed: false },
      { day: "D", selected: false, completed: false },
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
    color: "lavender",
    days: [
      { day: "L", selected: false, completed: false },
      { day: "M", selected: false, completed: false },
      { day: "X", selected: false, completed: false },
      { day: "J", selected: false, completed: false },
      { day: "V", selected: false, completed: false },
      { day: "S", selected: false, completed: false },
      { day: "D", selected: false, completed: false },
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
    color: "sand",
    days: [
      { day: "L", selected: true, completed: true },
      { day: "M", selected: false, completed: false },
      { day: "X", selected: false, completed: false },
      { day: "J", selected: false, completed: false },
      { day: "V", selected: false, completed: false },
      { day: "S", selected: false, completed: false },
      { day: "D", selected: false, completed: false },
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
    color: "sage",
    days: [
      { day: "L", selected: true, completed: true },
      { day: "M", selected: true, completed: true },
      { day: "X", selected: false, completed: false },
      { day: "J", selected: true, completed: true },
      { day: "V", selected: false, completed: false },
      { day: "S", selected: true, completed: true },
      { day: "D", selected: false, completed: false },
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
    color: "peach",
    days: [
      { day: "L", selected: false, completed: false },
      { day: "M", selected: true, completed: true },
      { day: "X", selected: false, completed: false },
      { day: "J", selected: true, completed: true },
      { day: "V", selected: false, completed: false },
      { day: "S", selected: true, completed: true },
      { day: "D", selected: false, completed: false },
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
      { day: "L", selected: true, completed: true },
      { day: "M", selected: true, completed: true },
      { day: "X", selected: false, completed: false },
      { day: "J", selected: true, completed: true },
      { day: "V", selected: false, completed: false },
      { day: "S", selected: true, completed: true },
      { day: "D", selected: false, completed: false },
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
      { day: "L", selected: true, completed: false },
      { day: "M", selected: true, completed: true },
      { day: "X", selected: true, completed: false },
      { day: "J", selected: true, completed: true },
      { day: "V", selected: true, completed: true },
      { day: "S", selected: true, completed: true },
      { day: "D", selected: true, completed: true },
    ],
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
