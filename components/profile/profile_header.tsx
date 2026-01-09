import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";

import { PETS_DATA } from "@/constants/const";
import { Profile } from "@/constants/types";
import { useThemeStore } from "@/store/theme.store";
import { useUserStore } from "@/store/user.store";
import { FlameIcon, ProfileIcon } from "../ui/icon";
import { Typography } from "../ui/typography";

interface Props {
  profile: Profile | null;
}

export function ProfileHeader({ profile }: Props) {
  const theme = useThemeStore((s) => s.theme);
  const pet = useUserStore((s) => s.profile)?.pet ?? "TRAINING_WOMAN";

  return (
    <View className="overflow-hidden mb-4">
      <LinearGradient
        colors={[
          theme.colors.primary[50],
          theme.colors.primary[200],
          theme.colors.primary[50],
        ]}
        locations={[0, 0.9, 1]}
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
                source={PETS_DATA[pet]["initial"].source}
                style={{
                  flex: 1,
                }}
                contentFit="contain"
              />
            </View>
          </View>
          <View className="items-center">
            <Typography type="title" wight="semibold">
              {profile?.name ?? "Invitado"}
            </Typography>
            <View className="flex-row gap-1">
              <FlameIcon color="orange.500" />
              <Typography type="subtitle">12 días en racha</Typography>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}
