import { HEADER_COLLAPSE_DISTANCE } from "@/constants/const";
import { formatDate } from "@/constants/utils";
import { useUserStore } from "@/store/user.store";
import { View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Badge } from "../ui/badge";
import { Typography } from "../ui/typography";

const AnimateTypography = Animated.createAnimatedComponent(Typography);

export function Greetings({ scroll }: { scroll: SharedValue<number> }) {
  const profile = useUserStore((s) => s.profile);

  const subtitleStyles = useAnimatedStyle(() => {
    const opacity = interpolate(
      scroll.value,
      [0, HEADER_COLLAPSE_DISTANCE],
      [1, 0],
      Extrapolation.CLAMP
    );

    return { opacity };
  });

  const headerStyles = useAnimatedStyle(() => {
    const scale = interpolate(
      scroll.value,
      [0, HEADER_COLLAPSE_DISTANCE],
      [1, 0.8],
      Extrapolation.CLAMP
    );

    const translateX = interpolate(
      scroll.value,
      [0, HEADER_COLLAPSE_DISTANCE],
      [0, 48],
      Extrapolation.CLAMP
    );

    const translateY = interpolate(
      scroll.value,
      [0, HEADER_COLLAPSE_DISTANCE],
      [0, 10],
      Extrapolation.CLAMP
    );

    return { transform: [{ scale }, { translateX }, { translateY }] };
  });

  const today = new Date();

  return (
    <Animated.View
      className="flex-row justify-between items-center h-[50px] absolute top-[16px] left-[16px] w-full z-20"
      style={[headerStyles]}
    >
      <View>
        <Typography type="headerTitle" size="xl">
          ¡Bienvenido{` ${profile?.name}`}!
        </Typography>
        <AnimateTypography type="info" wight="semibold" style={subtitleStyles}>
          ¿Listo para progresar?
        </AnimateTypography>
      </View>
      <Badge className="bg-primary-600">
        <Typography type="info" className="text-primary-50" wight="medium">
          {formatDate(today)}
        </Typography>
      </Badge>
    </Animated.View>
  );
}
