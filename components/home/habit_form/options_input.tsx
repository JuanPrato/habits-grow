import { Typography } from "@/components/ui/typography";
import { useState } from "react";
import { Switch, View } from "react-native";

export function OptionsInput() {

  const [notifications, setNotifications] = useState(true);
  const [calendarSync, setCalendarSync] = useState(false);

  return (
    <View className="gap-4">
      <View className="flex-row justify-between items-center">
        <Typography type="label">Recordatorios</Typography>
        <Switch value={notifications} onValueChange={setNotifications} />
      </View>

      <View className="flex-row justify-between items-center">
        <Typography type="label">Sincronizar con calendario</Typography>
        <Switch value={calendarSync} onValueChange={setCalendarSync} />
      </View>
    </View>
  );
}