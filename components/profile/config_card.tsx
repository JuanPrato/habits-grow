import { Pressable, View } from "react-native";
import { Typography } from "../ui/typography";

type ConfigItem = {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
  destructive?: boolean;
};

type ConfigCardProps = {
  items: ConfigItem[];
};

export function ConfigCard({ items }: ConfigCardProps) {
  return (
    <View className="bg-primary-50 rounded-2xl shadow-sm border border-gray-200/30">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <Pressable
            key={index}
            onPress={item.onPress}
            className={`flex-row items-center px-4 py-4 ${
              !isLast ? "border-b border-gray-200/40" : ""
            }`}
          >
            {/* Icon */}
            <View className="mr-4">{item.icon}</View>

            {/* Label */}
            <Typography
              className={`flex-1 text-base ${
                item.destructive ? "text-red-500 font-medium" : "text-gray-800"
              }`}
            >
              {item.label}
            </Typography>

            {/* Chevron */}
            {!item.destructive && (
              <Typography className="text-gray-400 text-lg">›</Typography>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}
