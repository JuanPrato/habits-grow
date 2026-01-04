import * as WebBrowser from "expo-web-browser";

import { HABIT_COLORS } from "@/constants/const";
import { ThemeName, useThemeStore } from "@/store/theme.store";
import { useUserStore } from "@/store/user.store";
import { Pressable, View } from "react-native";
import { Screen } from "../ui/screen";
import { Typography } from "../ui/typography";
import { ProfileConfiguration } from "./profile_configuration";
import { ProfileHeader } from "./profile_header";

WebBrowser.maybeCompleteAuthSession();

export function ProfileScreen() {
  const profile = useUserStore((s) => s.profile);
  const { theme, setTheme } = useThemeStore();

  return (
    <Screen>
      <ProfileHeader profile={profile} />
      <ProfileConfiguration />
      <View className="gap-2">
        <Typography type="label">
          Color de resalte
        </Typography>

        <View className="flex-row gap-3 justify-between">
          {Object.entries(HABIT_COLORS).map(([key, c]) => (
            <Pressable
              key={key}
              onPress={() => setTheme(key as ThemeName)}
              className={`size-14 rounded-full ${c.bg} ${theme === key ? `border-2 ${c.border}` : ""
                }`}
            />
          ))}
        </View>
      </View>
    </Screen>
  );
}
