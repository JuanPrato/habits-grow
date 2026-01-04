import { cva, VariantProps } from "class-variance-authority";
import { PropsWithChildren } from "react";
import { View } from "react-native";

const badge = cva("py-2 px-3 rounded-3xl", {
  variants: {
    type: {
      primary: "bg-primary-200",
      info: "bg-gray-200",
      phantom: "",
    },
    outline: {
      true: "border-2 border-gray-400",
    },
  },
  defaultVariants: {
    type: "info",
    outline: false,
  },
});

export function Badge(
  props: PropsWithChildren<VariantProps<typeof badge>> & { className?: string }
) {
  const styles = badge({
    type: props.type,
    outline: props.outline,
    className: props.className,
  });

  return <View className={styles}>{props.children}</View>;
}
