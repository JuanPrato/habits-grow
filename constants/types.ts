import { ThemeName } from "@/store/theme.store";
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

type HabitDay = {
  day: number;
  selected: boolean;
  completed?: boolean;
};

export type HabitFrequency = "daily" | "custom";

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
  days: HabitDay[];
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
}
