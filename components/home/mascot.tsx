import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { HEADER_COLLAPSE_DISTANCE, PETS_DATA } from "@/constants/const";
import { PetStates } from "@/constants/types";
import { useHabitStore } from "@/store/habits.store";
import { useUserStore } from "@/store/user.store";
import { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { SpriteAnimation } from "../ui/sprite_animation";

const { width } = Dimensions.get("window");

interface MascotProps {
  scroll: SharedValue<number>;
}

export function Mascot({ scroll }: MascotProps) {
  const percentage = useHabitStore((s) => s.percentageComplete);
  const progress = useSharedValue(percentage);
  const petAnimation = useSharedValue(0);
  const [state, setState] = useState<PetStates>("idle");

  const pet = useUserStore((s) => s.profile)?.pet ?? "MIND_MAN";

  useEffect(() => {
    let t: number;
    if (progress.value < percentage) {
      setState("celebrating");
      t = setTimeout(() => {
        setState("idle");
      }, 1000);
    } else {
      setState("idle");
    }
    progress.value = percentage;

    return () => {
      if (t) clearTimeout(t);
    };
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
    <Animated.View
      className="h-[160px] overflow-hidden z-0 shadow items-center"
      style={[mascotStyle]}
    >
      <SpriteAnimation
        fps={PETS_DATA[pet][state].fps}
        source={PETS_DATA[pet][state].source}
        frames={PETS_DATA[pet][state].frames}
        frameWidth={PETS_DATA[pet].sizes.width}
        frameHeight={PETS_DATA[pet].sizes.hight}
        scale={PETS_DATA[pet].sizes.scale}
      />
    </Animated.View>
  );
}
