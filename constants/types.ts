import { ThemeName } from "@/store/theme.store";
import { Dayjs } from "dayjs";
import { PETS } from "./const";
import { Color } from "./theme";

export type HabitColor = ThemeName;

export type HabitType =
  | "health"
  | "mind"
  | "growth"
  | "productivity"
  | "life"
  | "social";

// Explicitly declare HabitIcon type to avoid circular reference
export type HabitIcon = `${HabitType}_${string}`;

export type HabitDay = {
  habitId: string;
  day: number;
  selected: boolean;
  completed?: boolean;
};

export type HabitFrequency = "daily" | "custom";

export type HabitFrequencyArr = [
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
];

export type Habit = {
  id: string;
  title: string;
  category: HabitType;
  icon: HabitIcon;
  targetValue: number;
  currentValue: number;
  unit: string;
  completed: boolean;
  color: HabitColor;
  frequency: HabitFrequencyArr;
  createdAt: Dayjs;
};

export type ColorInfo = {
  bg: string;
  bgGet: Color;
  cardBg: string;
  icon: Color;
  border: string;
};

export interface IconProps {
  color?: Color;
  size?: "sm" | "md" | "lg";
}

export interface Profile {
  id: string;
  name: string;
  lastName?: string | null;
  picture?: string | null;
  streak: number;
  pet: typeof PETS[number];
}

export type PetStates = "initial" | "idle" | "celebrating";

export type Pet = {
  [key in PetStates]: PetState;
} & {
  sizes: PetSizes;
};

interface PetState {
  source: any,
  frames: number,
  fps: number,
}

interface PetSizes {
  scale: number;
  width: number;
  hight: number;
}