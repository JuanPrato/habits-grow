import { View } from "react-native";
import { Badge } from "../ui/badge";
import { CheckIcon, FlameIcon } from "../ui/icon";
import { ProgressDonut } from "../ui/progress";
import { Typography } from "../ui/typography";
import { StatsCard } from "./stat_card";

export function ProfileStats() {
  return (
    <View className="p-2 relative">
      <Badge
        type="primary"
        outline
        className="absolute left-1/2 -translate-x-[43px] -top-2 z-10 w-[100px] h-[30px] !border border-primary-800"
      >
        <Typography
          wight="semibold"
          size="sm"
          className="text-primary-700"
          center
        >
          Nivel 3
        </Typography>
      </Badge>
      <StatsCard
        items={[
          {
            icon: (
              <View className="rounded-full size-10 justify-center items-center bg-green-500">
                <CheckIcon />
              </View>
            ),
            value: "4",
            label: "Hábitos\nactivos",
          },
          {
            icon: <FlameIcon size="lg" color="red.600" />,
            value: "12",
            label: "Racha\nde días",
          },
          {
            icon: <ProgressDonut value={0.68} size={42} />,
            label: "Progreso\nde abril",
          },
        ]}
      />
    </View>
  );
}
