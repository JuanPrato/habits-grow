import { LinearGradient } from "expo-linear-gradient";

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
import { Greetings } from "./header_grettings";
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
        locations={[0, 0.05, 1]}
        style={{ flex: 1 }}
      >
        <Animated.View className={"flex-1 p-4"} style={partsStyles}>
          <Greetings scroll={scroll} />
          <Mascot scroll={scroll} />
          <HeaderStats scroll={scroll} />
        </Animated.View>
      </LinearGradient>
    </Animated.View>
  );
}
