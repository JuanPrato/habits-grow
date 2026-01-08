import { Image } from "expo-image";
import { Dimensions, View } from "react-native";

const { width, height } = Dimensions.get("window");

export function LevelUpOverlay() {
  return (
    <View
      className="flex-1 absolute justify-center items-center bg-black/70"
      style={{ width, height }}
    >
      {/* Animación */}
      <Image
        source={require("@/assets/images/character/training_woman/level_up.png")}
        style={{ width, height: 300, flex: 1 }}
        contentFit="contain"
      />
    </View>
  );
}
