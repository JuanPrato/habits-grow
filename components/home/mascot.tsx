import { Image } from "expo-image";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { HEADER_COLLAPSE_DISTANCE } from "@/constants/const";
import { useHabitStore } from "@/store/habits.store";
import { useEffect } from "react";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

interface MascotProps {
  scroll: SharedValue<number>;
}

export function Mascot({ scroll }: MascotProps) {
  const percentage = useHabitStore((s) => s.percentageComplete);
  const progress = useSharedValue(percentage);
  const petAnimation = useSharedValue(0);

  useEffect(() => {
    progress.value = percentage;
  }, [percentage]);

  const mascotStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scroll.value,
      [0, HEADER_COLLAPSE_DISTANCE],
      [1, 0.6],
      Extrapolation.CLAMP
    );

    const translateX = interpolate(
      scroll.value,
      [0, HEADER_COLLAPSE_DISTANCE],
      [0, -width + 140],
      Extrapolation.CLAMP
    );

    const translateY = interpolate(
      scroll.value,
      [0, HEADER_COLLAPSE_DISTANCE],
      [0, -30],
      Extrapolation.CLAMP
    );

    const rotate = interpolate(
      petAnimation.value,
      [0, 0.25, 0.5, 0.75, 1],
      [0, -20, 0, 20, 0]
    );

    return {
      transform: [
        { scale },
        { translateX },
        { translateY },
        { rotate: `${rotate}deg` },
      ],
    };
  });

  useAnimatedReaction(
    () => progress.value,
    (current, previous) => {
      if (previous === null) return;

      if (current > previous) {
        petAnimation.value = 1;
      }
    }
  );

  useAnimatedReaction(
    () => petAnimation.value,
    (value) => {
      if (value === 1) {
        petAnimation.value = withTiming(0, { duration: 300 });
      }
    }
  );

  return (
    <Animated.View className="h-[160px] z-10 shadow" style={[mascotStyle]}>
      <Image
        style={{ flex: 1 }}
        source={require("../../assets/images/character/training_woman/initial.png")}
        contentFit="contain"
      />
    </Animated.View>
  );
}
