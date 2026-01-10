import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";

import { PETS_DATA } from "@/constants/const";
import { useThemeStore } from "@/store/theme.store";
import { useUserStore } from "@/store/user.store";
import { Typography } from "../ui/typography";
import { PetStats } from "./pet_stats";

export function StatsHeader() {
  const theme = useThemeStore((s) => s.theme);
  const pet = useUserStore((s) => s.profile)?.pet ?? "TRAINING_WOMAN";

  return (
    <LinearGradient
      colors={[
        theme.colors.primary[50],
        theme.colors.primary[50],
        theme.colors.primary[200],
        theme.colors.primary[50],
      ]}
      locations={[0, 0.05, 0.9, 1]}
    >
      <View className="pb-4 items-center flex-row">
        <View className="justify-center items-center gap-2">
          <View className="size-32 shadow">
            <Image
              style={{ flex: 1 }}
              source={PETS_DATA[pet]["initial"].source}
              contentFit="contain"
            />
          </View>
          <Typography wight="semibold" size="lg" className="text-primary-700">
            Nivel 1
          </Typography>
        </View>
        <PetStats />
      </View>
    </LinearGradient>
  );
}
