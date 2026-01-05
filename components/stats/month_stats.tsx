import { useHabitStore } from "@/store/habits.store";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Card } from "../ui/card";
import { ProgressDonut } from "../ui/progress";
import { Typography } from "../ui/typography";

export function MonthStats() {
  const habits = useHabitStore((s) => s.habits);

  const getPer = useHabitStore((s) => s.getMonthStats);
  const [stats, setStats] = useState<{
    complete: number;
    total: number;
    percentage: number;
  }>();

  useEffect(() => {
    getPer(habits).then((p) => {
      setStats(p);
    });
  }, [habits]);

  return (
    <View className="p-2 gap-2">
      <Typography type="sectionTitle" size="xl">
        Tu progreso mensual
      </Typography>
      <Card className="p-4" accent>
        <ProgressDonut
          value={stats?.percentage ?? 0}
          size={120}
          strokeWidth={20}
          textSize="lg"
        />
        <Typography type="subtitle" size="md" center>
          {stats?.complete ?? 0} de {stats?.total ?? 0} hábitos completados esta
          mes
        </Typography>
      </Card>
    </View>
  );
}
