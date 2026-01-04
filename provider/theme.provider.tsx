import { reloadAsync } from "expo-updates";
import { vars } from "nativewind";
import { PropsWithChildren, useEffect, useState } from "react";
import { View } from "react-native";

import { theme } from "@/constants/theme";
import { generateVarsObject } from "@/constants/utils";
import { ThemeName, useThemeStore } from "@/store/theme.store";

const THEMES: Record<ThemeName, Record<string, string>> = {
  emerald: generateVarsObject(theme.colors.emerald),
  sky: generateVarsObject(theme.colors.sky),
  violet: generateVarsObject(theme.colors.violet),
  rose: generateVarsObject(theme.colors.rose),
  amber: generateVarsObject(theme.colors.amber)
}

theme.colors.primary = theme.colors.emerald;

export function ThemeProvider(props: PropsWithChildren) {

  const themeName = useThemeStore(s => s.theme);
  const [cssVars, setCssVars] = useState(vars(THEMES[themeName]));
  const [prev, setPrev] = useState(themeName);

  useEffect(() => {
    if (themeName === prev) return;

    setCssVars(vars(THEMES[themeName]))
    theme.colors.primary = theme.colors[themeName as keyof typeof theme.colors] as any;
    setPrev(themeName);
    reloadAsync();

  }, [themeName]);

  return <View className="flex-1" style={cssVars}>{props.children}</View>

}