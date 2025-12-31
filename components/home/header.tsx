import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";

import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  type SharedValue,
} from "react-native-reanimated";

import {
  HEADER_COLLAPSE_DISTANCE,
  HEADER_MAX_HEIGHT,
  HEADER_MIN_HEIGHT,
} from "@/constants/const";
import { theme } from "@/constants/theme";
import { Badge } from "../ui/badge";
import { Typography } from "../ui/typography";
import { HeaderStats } from "./header_stats";
import { Mascot } from "./mascot";

export function Header({ scroll }: { scroll: SharedValue<number> }) {
  const animatedStyles = useAnimatedStyle(() => {
    const height = interpolate(
      scroll.value,
      [0, HEADER_COLLAPSE_DISTANCE],
      [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      Extrapolation.CLAMP
    );

    return { height };
  });

  const headerStyles = useAnimatedStyle(() => {
    const opacity = interpolate(
      scroll.value,
      [0, HEADER_COLLAPSE_DISTANCE],
      [1, 0],
      Extrapolation.CLAMP
    );

    return { opacity };
  });

  const partsStyles = useAnimatedStyle(() => {
    const padding = interpolate(
      scroll.value,
      [0, HEADER_COLLAPSE_DISTANCE],
      [50, 0]
    );

    return { paddingTop: padding };
  });

  return (
    <Animated.View
      className="rounded-b-3xl overflow-hidden bg-transparent"
      style={[animatedStyles]}
    >
      <LinearGradient
        colors={[
          theme.colors.white,
          theme.colors.primary[50],
          theme.colors.primary[400],
        ]}
        locations={[0, 0.1, 1]}
        style={{ flex: 1 }}
      >
        <Animated.View className={"flex-1 p-4"} style={partsStyles}>
          <Animated.View
            className="flex-row justify-between items-center h-[50px] absolute top-[16px] left-[16px] w-full z-20"
            style={[headerStyles]}
          >
            <View>
              <Typography type="headerTitle">Hola Juan!</Typography>
              <Typography type="info" wight="semibold">
                Listo para progresar?
              </Typography>
            </View>
            <Badge>
              <Typography type="info">OCT 28</Typography>
            </Badge>
          </Animated.View>
          <Mascot scroll={scroll} />
          <HeaderStats scroll={scroll} />
        </Animated.View>
      </LinearGradient>
    </Animated.View>
  );
}
