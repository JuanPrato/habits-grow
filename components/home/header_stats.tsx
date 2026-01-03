import { HEADER_COLLAPSE_DISTANCE } from "@/constants/const";
import { useHabitStore } from "@/store/habits.store";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { ProgressBar } from "../ui/progress";
import { Typography } from "../ui/typography";

interface Props {
  scroll: SharedValue<number>;
}

export function HeaderStats({ scroll }: Props) {
  const percentage = useHabitStore((s) => s.percentageComplete);

  const progressStyles = useAnimatedStyle(() => {
    const translateY = interpolate(
      scroll.value,
      [0, HEADER_COLLAPSE_DISTANCE],
      [-40, -125],
      Extrapolation.CLAMP
    );
    const translateX = interpolate(
      scroll.value,
      [0, HEADER_COLLAPSE_DISTANCE],
      [0, 40],
      Extrapolation.CLAMP
    );
    const scale = interpolate(
      scroll.value,
      [0, HEADER_COLLAPSE_DISTANCE],
      [1, 0.8],
      Extrapolation.CLAMP
    );

    return {
      transform: [
        {
          translateY,
        },
        {
          translateX,
        },
        {
          scale,
        },
      ],
    };
  });

  const quoteStyles = useAnimatedStyle(() => {
    const opacity = interpolate(
      scroll.value,
      [0, HEADER_COLLAPSE_DISTANCE - 50, HEADER_COLLAPSE_DISTANCE],
      [0, 0, 1],
      Extrapolation.CLAMP
    );

    return { opacity };
  });

  return (
    <Animated.View className="my-2 gap-1" style={progressStyles}>
      <Animated.View style={quoteStyles}>
        <Typography type="title">¡Vas muy bien!</Typography>
      </Animated.View>
      <ProgressBar initialProgress={percentage / 100} />
      <Typography type="info">
        Progreso de hoy {percentage.toFixed(0) ?? "0"}%
      </Typography>
    </Animated.View>
  );
}
