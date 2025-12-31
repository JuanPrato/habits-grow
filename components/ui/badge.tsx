import { cva, VariantProps } from "class-variance-authority";
import { PropsWithChildren } from "react";
import { View } from "react-native";

const badge = cva("py-2 px-3 rounded-2xl", {
  variants: {
    type: {
      info: "bg-gray-200",
    },
  },
  defaultVariants: {
    type: "info",
  },
});

export function Badge(props: PropsWithChildren<VariantProps<typeof badge>>) {
  const styles = badge({ type: props.type });

  return <View className={styles}>{props.children}</View>;
}
