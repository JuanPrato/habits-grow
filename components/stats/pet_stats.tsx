import { useHabitStore } from "@/store/habits.store";
import { useUserStore } from "@/store/user.store";
import { View } from "react-native";
import { StatsCard } from "../profile/stat_card";
import { CheckIcon, FlameIcon } from "../ui/icon";
import { Typography } from "../ui/typography";

export function PetStats() {
  const habits = useHabitStore((s) => s.habits);
  const profile = useUserStore((s) => s.profile);

  return (
    <View className="p-2 relative flex-1 gap-2">
      <View>
        <Typography type="headerTitle" size="xl">
          Tu compañero
        </Typography>
        <Typography type="subtitle">Creciendo</Typography>
      </View>
      <StatsCard
        compressed
        items={[
          {
            icon: (
              <View className="rounded-full size-10 justify-center items-center bg-green-500">
                <CheckIcon />
              </View>
            ),
            value: habits.length,
            label: "Hábitos\nactivos",
          },
          {
            icon: <FlameIcon size="lg" color="red.600" />,
            value: profile?.streak ?? "0",
            label: "Racha\nde días",
          },
        ]}
      />
    </View>
  );
}
