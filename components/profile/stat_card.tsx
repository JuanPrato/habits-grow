import { cva, VariantProps } from "class-variance-authority";
import { View } from "react-native";
import { Card } from "../ui/card";
import { Typography } from "../ui/typography";

type StatItem = {
  icon: React.ReactNode;
  value?: React.ReactNode;
  label: string;
};

type StatsCardProps = {
  items: StatItem[];
};

const item = cva("flex-1 items-center justify-center px-3", {
  variants: {
    compressed: {
      true: "py-2 flex-row gap-2",
      false: "py-4",
    },
  },
  defaultVariants: {
    compressed: false,
  },
});

export function StatsCard({
  items,
  compressed,
}: StatsCardProps & VariantProps<typeof item>) {
  const itemStyle = item({ compressed });

  return (
    <Card className="flex-row">
      {items.map((item, index) => {
        console.log(item.value, typeof item.value);
        return (
          <View
            key={index}
            className={`${itemStyle} ${index < items.length - 1 ? "border-r border-primary-700/20" : ""} `}
          >
            {/* Icon */}
            <View className="mb-2">{item.icon}</View>
            <View className="items-center">
              {/* Value */}
              {item.value !== undefined && (
                <View className="mb-1">
                  {typeof item.value === "string" ||
                  typeof item.value === "number" ? (
                    <Typography wight="semibold" size="lg">
                      {item.value}
                    </Typography>
                  ) : (
                    item.value
                  )}
                </View>
              )}
              {/* Label */}
              <Typography>{item.label}</Typography>
            </View>
          </View>
        );
      })}
    </Card>
  );
}
