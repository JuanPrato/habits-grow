import {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

import { Screen } from "../ui/screen";
import { HabitsList } from "./habits_list";
import { Header } from "./header";
import { FloatingActionButton } from "./new_button";

export function HomeScreen() {
  const scrollY = useSharedValue(0);

  const handleScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  return (
    <Screen>
      <Header scroll={scrollY} />
      <HabitsList handleScroll={handleScroll} />
      <FloatingActionButton scroll={scrollY} />
    </Screen>
  );
}
