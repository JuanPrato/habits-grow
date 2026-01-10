import { Pressable, Switch, View } from "react-native";
import { Card } from "../ui/card";
import { Typography } from "../ui/typography";

type ConfigItem = {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
  destructive?: boolean;
  type?: string;
};

type ConfigCardProps = {
  items: ConfigItem[];
};

export function ConfigCard({ items }: ConfigCardProps) {
  return (
    <Card>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const type = item.type ?? "button";

        return (
          <Pressable
            key={index}
            onPress={item.onPress}
            className={`flex-row items-center px-4 py-4 ${
              !isLast ? "border-b border-primary-700/20" : ""
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

            {type === "check" ? (
              <Switch onChange={item.onPress} />
            ) : (
              !item.destructive && (
                <Typography className="text-primary-700 text-lg">›</Typography>
              )
            )}
          </Pressable>
        );
      })}
    </Card>
  );
}
