import { theme } from "@/constants/theme";
import { cva, VariantProps } from "class-variance-authority";
import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import Svg, { Circle } from "react-native-svg";
import { Typography } from "./typography";

type ProgressBarProps = {
  initialProgress: number; // valor entre 0 y 1
};

const progress = cva("w-full bg-primary-900 rounded-2xl overflow-hidden", {
  variants: {
    size: {
      sm: "h-2",
      md: "h-3",
      lg: "h-6",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export function ProgressBar({ initialProgress, size }:
  VariantProps<typeof progress> & ProgressBarProps) {
  const progressValue = useSharedValue(0);

  const progressStyle = progress({ size });

  useEffect(() => {
    progressValue.value = withTiming(initialProgress, {
      duration: 500,
    });
  }, [initialProgress]);

  const animatedStyle = useAnimatedStyle(() => {

    const width = (progressValue.value ?? 0) * 100;

    return ({
      width: !!width ? `${width}%` : "0%",
    });
  });

  return (
    <View className={progressStyle}>
      <Animated.View
        className="h-full bg-primary-600 rounded-2xl"
        style={animatedStyle}
      />
    </View>
  );
}

type ProgressDonutProps = {
  value: number; // 0 → 1
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
  textSize?: "xs" | "sm" | "md" | "lg";
};

export function ProgressDonut({
  value,
  size = 48,
  strokeWidth = 6,
  color = theme.colors.primary[600],
  backgroundColor = theme.colors.gray[200],
  textSize = "xs"
}: ProgressDonutProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference * (1 - value);

  return (
    <View className="items-center justify-center">
      <Svg width={size} height={size}>
        {/* Fondo */}
        <Circle
          stroke={backgroundColor}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />

        {/* Progreso */}
        <Circle
          stroke={color}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={progress}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>

      {/* Texto */}
      <View className="absolute">
        <Typography className="font-semibold text-gray-700" size={textSize}>
          {Math.round(value * 100)}%
        </Typography>
      </View>
    </View>
  );
}
