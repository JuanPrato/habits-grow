import { Screen } from "../ui/screen";
import { MonthStats } from "./month_stats";
import { StatsHeader } from "./stats_header";
import { WeeklyStats } from "./weekly_stats";

export function StatsScreen() {
  return (
    <Screen>
      <StatsHeader />
      <MonthStats />
      <WeeklyStats />
    </Screen>
  );
}
