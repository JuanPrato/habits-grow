import { useHabitStore } from "@/store/habits.store";
import { Pressable } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AddIcon } from "../ui/icon";

type Props = {
  scroll: SharedValue<number>;
};

export function FloatingActionButton({ scroll }: Props) {
  const insets = useSafeAreaInsets();
  const visible = useSharedValue(1);
  const toggleModal = useHabitStore((s) => s.toggleModal);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(visible.value, { duration: 200 }),
      transform: [
        {
          translateY: withTiming(visible.value ? 0 : 80, { duration: 200 }),
        },
        {
          scale: withTiming(visible.value ? 1 : 0.9),
        },
      ],
    };
  });

  useAnimatedReaction(
    () => scroll.value,
    (current, previous) => {
      if (previous === null) return;

      const diff = current - previous;

      if (current < 20) {
        visible.value = 1;
        return;
      }

      if (diff > 5) {
        visible.value = 0;
      } else if (diff < -5) {
        visible.value = 1;
      }
    }
  );

  return (
    <>
      <Animated.View
        style={[
          {
            position: "absolute",
            right: 16,
            bottom: 16 + insets.bottom,
          },
          animatedStyle,
        ]}
      >
        <Pressable
          onPress={() => toggleModal(true)}
          className="size-20 rounded-full bg-emerald-300 items-center justify-center shadow-lg"
        >
          <AddIcon color="primary.800" />
        </Pressable>
      </Animated.View>
    </>
  );
}
