import { useEffect } from "react";
import { Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import Svg, { Circle } from "react-native-svg";

type ProgressBarProps = {
  progress: number; // valor entre 0 y 1
};

export function ProgressBar({ progress }: ProgressBarProps) {
  const progressValue = useSharedValue(0);

  useEffect(() => {
    progressValue.value = withTiming(progress, {
      duration: 500,
    });
  }, [progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${progressValue.value * 100}%`,
  }));

  return (
    <View className="h-3 w-full bg-primary-900 rounded-2xl overflow-hidden">
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
};

export function ProgressDonut({
  value,
  size = 48,
  strokeWidth = 6,
  color = "#22C55E",
  backgroundColor = "#E5E7EB",
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
        <Text className="text-xs font-semibold text-gray-700">
          {Math.round(value * 100)}%
        </Text>
      </View>
    </View>
  );
}
