import { View } from "react-native";
import { Typography } from "../ui/typography";

type StatItem = {
  icon: React.ReactNode;
  value?: React.ReactNode;
  label: string;
};

type StatsCardProps = {
  items: [StatItem, StatItem, StatItem];
};

export function StatsCard({ items }: StatsCardProps) {
  return (
    <View className="bg-primary-50 rounded-2xl border border-primary-700 flex-row">
      {items.map((item, index) => (
        <View
          key={index}
          className={`flex-1 items-center justify-center px-3 py-4 ${
            index < items.length - 1 ? "border-r border-primary-700/20" : ""
          }`}
        >
          {/* Icon */}
          <View className="mb-2">{item.icon}</View>

          {/* Value */}
          {item.value && (
            <View className="mb-1">
              {typeof item.value === "string" ||
              typeof item.value === "number" ? (
                <Typography>{item.value}</Typography>
              ) : (
                item.value
              )}
            </View>
          )}

          {/* Label */}
          <Typography>{item.label}</Typography>
        </View>
      ))}
    </View>
  );
}
