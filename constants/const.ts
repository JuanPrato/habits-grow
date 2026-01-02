import { HabitType } from "./types";

export const HEADER_MAX_HEIGHT = 275;
export const HEADER_MIN_HEIGHT = 125;

export const HEADER_COLLAPSE_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export const HABIT_COLORS = {
  sage: {
    bg: "bg-emerald-200",
    cardBg: "bg-emerald-50",
    icon: "emerald.600",
    border: "border-emerald-400",
  },
  sky: {
    bg: "bg-sky-200",
    cardBg: "bg-sky-50",
    icon: "sky.600",
    border: "border-sky-400",
  },
  lavender: {
    bg: "bg-violet-200",
    cardBg: "bg-violet-50",
    icon: "violet.600",
    border: "border-violet-400",
  },
  peach: {
    bg: "bg-rose-200",
    cardBg: "bg-rose-50",
    icon: "rose.600",
    border: "border-rose-400",
  },
  sand: {
    bg: "bg-amber-100",
    cardBg: "bg-amber-50",
    icon: "amber.600",
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

// AUTH
export const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL!;
export const GOOGLE_REDIRECT_URI = `${process.env.EXPO_PUBLIC_BASE_URL}/api/auth/callback`;

export const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL || "";
export const SUPABASE_PUBLIC_KEY =
  process.env.EXPO_PUBLIC_SUPABASE_PUBLIC_KEY || "";

export const APP_SCHEME = process.env.EXPO_PUBLIC_SCHEME;
