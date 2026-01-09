import { ColorInfo, HabitColor, HabitType, Pet } from "./types";

export const HEADER_MAX_HEIGHT = 275;
export const HEADER_MIN_HEIGHT = 125;

export const HEADER_COLLAPSE_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export const HABIT_COLORS: Record<HabitColor, ColorInfo> = {
  emerald: {
    bg: "bg-emerald-200",
    bgGet: "emerald.50",
    cardBg: "!bg-emerald-50",
    icon: "emerald.600",
    border: "!border-emerald-400",
  },
  sky: {
    bg: "bg-sky-200",
    bgGet: "sky.50",
    cardBg: "!bg-sky-50",
    icon: "sky.600",
    border: "!border-sky-400",
  },
  violet: {
    bg: "bg-violet-200",
    bgGet: "violet.50",
    cardBg: "!bg-violet-100",
    icon: "violet.600",
    border: "!border-violet-400",
  },
  rose: {
    bg: "bg-rose-200",
    bgGet: "rose.50",
    cardBg: "!bg-rose-50",
    icon: "rose.600",
    border: "!border-rose-400",
  },
  amber: {
    bg: "bg-amber-100",
    bgGet: "amber.50",
    cardBg: "!bg-amber-50",
    icon: "amber.600",
    border: "!border-amber-300",
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

export const HABIT_TYPES: HabitType[] = [
  "growth",
  "health",
  "life",
  "mind",
  "productivity",
  "social",
] as const;

// ICONS

export const ICONS_SIZES = {
  sm: 16,
  md: 24,
  lg: 36,
} as const;

// AUTH
export const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL || "";
export const SUPABASE_PUBLIC_KEY =
  process.env.EXPO_PUBLIC_SUPABASE_PUBLIC_KEY || "";

// PETS

export const PETS = ["TRAINING_WOMAN", "MIND_MAN"] as const;

export const PETS_DATA: Record<typeof PETS[number], Pet> = {
  TRAINING_WOMAN: {
    initial: {
      source: require("../assets/images/character/training_woman/initial.png"),
      frames: 1,
      fps: 1,
    },
    idle: {
      source: require("../assets/images/character/training_woman/sprite.png"),
      frames: 3,
      fps: 3,
    },
    celebrating: {
      source: require("../assets/images/character/training_woman/celebrating.png"),
      frames: 1,
      fps: 1,
    },
    sizes: {
      scale: 0.41,
      width: 200,
      hight: 390
    }
  },
  MIND_MAN: {
    initial: {
      source: require("../assets/images/character/mind_man/initial.png"),
      frames: 1,
      fps: 1,
    },
    idle: {
      source: require("../assets/images/character/mind_man/sprite.png"),
      frames: 3,
      fps: 3,
    },
    celebrating: {
      source: require("../assets/images/character/mind_man/sprite.png"),
      frames: 3,
      fps: 3,
    },
    sizes: {
      hight: 300,
      width: 200,
      scale: 0.53
    }
  },
} as const;
