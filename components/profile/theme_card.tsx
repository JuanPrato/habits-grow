import { HABIT_COLORS } from "@/constants/const";
import { type ThemeName, useThemeStore } from "@/store/theme.store";
import { Pressable, View } from "react-native";
import { Card } from "../ui/card";
import { Typography } from "../ui/typography";

export function ThemeCard() {
  const { themeName, setTheme } = useThemeStore();

  return (
    <View className="p-2 gap-2">
      <Typography type="sectionTitle">
        Tema de la app
      </Typography>
      <Card>
        <View className="p-2 gap-2">

          <View className="flex-row gap-3 justify-between">
            {Object.entries(HABIT_COLORS).map(([key, c]) => (
              <Pressable
                key={key}
                onPress={() => setTheme(key as ThemeName)}
                className={`size-14 rounded-full ${c.bg} ${themeName === key ? `border-2 ${c.border}` : ""
                  }`}
              />
            ))}
          </View>
        </View>
      </Card>
    </View>
  )
}