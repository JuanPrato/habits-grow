import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";

import { theme } from "@/constants/theme";
import { Typography } from "../ui/typography";
import { PetStats } from "./pet_stats";

export function StatsHeader() {
  return (
    <LinearGradient
      colors={[
        theme.colors.white,
        theme.colors.primary[50],
        theme.colors.primary[200],
        theme.colors.primary[50],
      ]}
      locations={[0, 0.05, 0.9, 1]}
    >
      <View className="pb-4 items-center flex-row">
        <View className="justify-center items-center gap-2">
          <View className="size-32 shadow -translate-x-2">
            <Image
              style={{ flex: 1 }}
              source={require("../../assets/images/character/initial.png")}
              contentFit="contain"
            />
          </View>
          <Typography
            wight="semibold"
            size="lg"
            className="text-primary-700"
          >
            Nivel 3
          </Typography>
        </View>
        <PetStats />
      </View>
    </LinearGradient>
  )
}