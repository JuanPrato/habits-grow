import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";

import { theme } from "@/constants/theme";
import { Profile } from "@/constants/types";
import { ProfileIcon } from "../ui/icon";
import { Typography } from "../ui/typography";

interface Props {
  profile: Profile | null;
}

export function ProfileHeader({ profile }: Props) {
  return (
    <View className="overflow-hidden mb-4">
      <LinearGradient
        colors={[
          theme.colors.white,
          theme.colors.primary[50],
          theme.colors.primary[200],
          theme.colors.primary[50],
        ]}
        locations={[0, 0.05, 0.9, 1]}
      >
        <View className="p-4 h-[200px] items-center justify-center gap-2">
          <View>
            <View className="size-32 rounded-full overflow-hidden">
              {profile?.picture ? (
                <Image
                  source={profile?.picture}
                  style={{ flex: 1 }}
                  contentFit="contain"
                  alt="Profile picture"
                />
              ) : (
                <View className="flex-1 bg-blue-200 justify-center items-center">
                  <ProfileIcon size="lg" color="gray.500" />
                </View>
              )}
            </View>
            <View className="size-24 absolute -right-7 -bottom-1 shadow">
              <Image
                style={{ flex: 1 }}
                source={require("../../assets/images/character/initial.png")}
                contentFit="contain"
              />
            </View>
          </View>
          <View className="items-center">
            <Typography type="title" wight="semibold">
              {profile?.name ?? "Invitado"}
            </Typography>
            <Typography type="subtitle">12 días en racha</Typography>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}
