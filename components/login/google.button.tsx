import { Image } from "expo-image";
import { View } from "react-native";
import { Button } from "../ui/button";
import { Typography } from "../ui/typography";

export function GoogleButton({ onPress }: { onPress: () => void }) {
  return (
    <Button
      className="flex-row gap-2 bg-google rounded-full px-4 pr-6"
      onPress={onPress}
    >
      <View className="size-12">
        <Image
          source={require("../../assets/images/icons/ios_neutral_rd_na.svg")}
          style={{ flex: 1 }}
        />
      </View>
      <Typography wight="semibold" size="md">
        Continue with Google
      </Typography>
    </Button>
  );
}
