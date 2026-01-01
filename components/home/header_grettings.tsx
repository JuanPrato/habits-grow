import { HEADER_COLLAPSE_DISTANCE } from "@/constants/const";
import { useAuth } from "@/hooks/useAuth";
import { View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Badge } from "../ui/badge";
import { Typography } from "../ui/typography";

export function Greetings({ scroll }: { scroll: SharedValue<number> }) {
  const { user } = useAuth();

  const headerStyles = useAnimatedStyle(() => {
    const opacity = interpolate(
      scroll.value,
      [0, HEADER_COLLAPSE_DISTANCE],
      [1, 0],
      Extrapolation.CLAMP
    );

    return { opacity };
  });

  console.log(user?.user_metadata);

  return (
    <Animated.View
      className="flex-row justify-between items-center h-[50px] absolute top-[16px] left-[16px] w-full z-20"
      style={[headerStyles]}
    >
      <View>
        <Typography type="headerTitle">
          ¡Bienvenido{` ${user?.user_metadata?.name}`}!
        </Typography>
        <Typography type="info" wight="semibold">
          Listo para progresar?
        </Typography>
      </View>
      <Badge>
        <Typography type="info">OCT 28</Typography>
      </Badge>
    </Animated.View>
  );
}
