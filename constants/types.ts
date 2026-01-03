import { Color } from "./theme";

export type HabitColor = "sage" | "sky" | "lavender" | "peach" | "sand";

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
  day: string;
  selected: boolean;
  completed?: boolean;
};

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
