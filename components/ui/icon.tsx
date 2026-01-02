import {
  Bed,
  Bell,
  BookOpen,
  Brain,
  Calendar,
  CalendarCheck,
  Check,
  CheckSquare,
  ClipboardCheck,
  Coffee,
  Download,
  Droplet,
  Dumbbell,
  Eye,
  Flame,
  Flower,
  Folder,
  Footprints,
  GlassWater,
  GraduationCap,
  Heart,
  HeartHandshake,
  Home,
  Lightbulb,
  LogOut,
  MessageCircle,
  Moon,
  Palette,
  PenLine,
  Plus,
  Repeat,
  ShoppingCart,
  Smartphone,
  Smile,
  Sparkles,
  Target,
  Timer,
  User,
  Users,
  Utensils,
  Wind,
  type LucideIcon,
} from "lucide-react-native";

import { HabitIcon, IconProps } from "@/constants/types";
import { getIconProps } from "@/constants/utils";

const makeIcon = (Icon: LucideIcon) => (p: IconProps) => (
  <Icon {...getIconProps(p)} />
);

export const GlassIcon = makeIcon(GlassWater);
export const CheckIcon = makeIcon(Check);
export const HomeIcon = makeIcon(Home);
export const StatsIcon = makeIcon(ClipboardCheck);
export const ProfileIcon = makeIcon(User);
export const AddIcon = makeIcon(Plus);
export const FlameIcon = makeIcon(Flame);
export const NotificationsIcon = makeIcon(Bell);
export const CalendarIcon = makeIcon(Calendar);
export const DownloadIcon = makeIcon(Download);
export const LogOutIcon = makeIcon(LogOut);

export const HABIT_ICONS: Record<
  HabitIcon,
  (props: IconProps) => React.ReactElement
> = {
  // 🧘 Salud & Bienestar
  health_hydration: makeIcon(Droplet),
  health_exercise: makeIcon(Dumbbell),
  health_movement: makeIcon(Footprints),
  health_rest: makeIcon(Bed),
  health_sleep: makeIcon(Moon),
  health_breathing: makeIcon(Wind),
  health_wellbeing: makeIcon(Heart),

  // 🧠 Mente & Emociones
  mind_meditation: makeIcon(Flower),
  mind_focus: makeIcon(Target),
  mind_mood: makeIcon(Smile),
  mind_gratitude: makeIcon(Sparkles),
  mind_thinking: makeIcon(Brain),
  mind_awareness: makeIcon(Eye),

  // 📚 Crecimiento & Aprendizaje
  growth_reading: makeIcon(BookOpen),
  growth_study: makeIcon(GraduationCap),
  growth_writing: makeIcon(PenLine),
  growth_creativity: makeIcon(Palette),
  growth_ideas: makeIcon(Lightbulb),

  // ⏱ Productividad & Rutina
  productivity_timer: makeIcon(Timer),
  productivity_consistency: makeIcon(Repeat),
  productivity_planning: makeIcon(CalendarCheck),
  productivity_tasks: makeIcon(CheckSquare),
  productivity_digital_detox: makeIcon(Smartphone),

  // 🏠 Hogar & Vida diaria
  life_home: makeIcon(Home),
  life_cooking: makeIcon(Utensils),
  life_shopping: makeIcon(ShoppingCart),
  life_organization: makeIcon(Folder),

  // 🤝 Social & Relaciones
  social_people: makeIcon(Users),
  social_coffee: makeIcon(Coffee),
  social_chat: makeIcon(MessageCircle),
  social_relationships: makeIcon(HeartHandshake),
} as const;
