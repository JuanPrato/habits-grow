import { PETS, PETS_DATA } from "@/constants/const";
import { Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { SpriteAnimation } from "../ui/sprite_animation";
import { Typography } from "../ui/typography";

export function PetCard({
  pet: petName,
  selected,
  onPress,
}: {
  pet: (typeof PETS)[number];
  selected: boolean;
  onPress: () => void;
}) {
  const pet = PETS_DATA[petName];

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(selected ? 1.05 : 0.95) }],
    opacity: true ? 1 : 0.4,
  }));

  return (
    <Pressable onPress={onPress} disabled={false}>
      <Animated.View
        style={animatedStyle}
        className={`mx-2 h-[180px] rounded-2xl p-3 items-center
          ${selected ? "border-2 border-primary-400 bg-primary-200" : "border border-transparent bg-primary-100"}`}
      >
        <SpriteAnimation
          source={pet.idle.source}
          frameHeight={pet.sizes.hight}
          frameWidth={pet.sizes.width}
          frames={3}
          fps={2}
          scale={pet.sizes.scale}
        />

        {false && (
          <Typography className="mt-1 text-xs text-gray-400">
            Bloqueado
          </Typography>
        )}
      </Animated.View>
    </Pressable>
  );
}
