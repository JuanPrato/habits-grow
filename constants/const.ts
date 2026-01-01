import { HabitType } from "./types";

export const HEADER_MAX_HEIGHT = 275;
export const HEADER_MIN_HEIGHT = 125;

export const HEADER_COLLAPSE_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export const HABIT_COLORS = {
  sage: {
    bg: "bg-emerald-300",
    cardBg: "bg-emerald-100",
    icon: "emerald.700",
    border: "border-emerald-400",
  },
  sky: {
    bg: "bg-sky-300",
    cardBg: "bg-sky-100",
    icon: "sky.700",
    border: "border-sky-400",
  },
  lavender: {
    bg: "bg-violet-300",
    cardBg: "bg-violet-100",
    icon: "violet.700",
    border: "border-violet-400",
  },
  peach: {
    bg: "bg-rose-300",
    cardBg: "bg-rose-100",
    icon: "rose.700",
    border: "border-rose-400",
  },
  sand: {
    bg: "bg-amber-200",
    cardBg: "bg-amber-50",
    icon: "amber.700",
    border: "border-amber-300",
  },
} as const;

export const HABIT_CATEGORIES: Record<HabitType, string> = {
  health: "Salud",
  growth: "Crecimiento",
  life: "Vida",
  mind: "Mental",
  productivity: "Productividad",
  social: "Social",
} as const;

// ICONS

export const ICONS_SIZES = {
  sm: 16,
  md: 24,
  lg: 36,
} as const;
