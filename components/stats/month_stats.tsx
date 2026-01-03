import { View } from "react-native";
import { Card } from "../ui/card";
import { ProgressDonut } from "../ui/progress";
import { Typography } from "../ui/typography";

export function MonthStats() {
  return (
    <View className="p-2 gap-2">
      <Typography type="sectionTitle" size="xl">Tu progreso mensual</Typography>
      <Card className="p-4" accent>
        <ProgressDonut value={.6} size={120} strokeWidth={20} textSize="lg" />
        <Typography type="subtitle" size="md" center>18 de 25 hábitos completados esta mes</Typography>
      </Card>
    </View>
  );
}