import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

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
