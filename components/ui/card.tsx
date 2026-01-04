import { cva, VariantProps } from "class-variance-authority";
import { PropsWithChildren } from "react";
import { View } from "react-native";

interface CardProps {
  className?: string;
}

const card = cva("bg-primary-50 p-1 rounded-3xl border border-primary-700 gap-2", {
  variants: {
    accent: {
      true: "border-primary-600",
      false: "",
    }
  },
  defaultVariants: {
    accent: false,
  }
})

export function Card(props: PropsWithChildren<CardProps> & VariantProps<typeof card>) {

  const cardStyles = card({
    accent: props.accent,
    className: props.className,
  });

  return (<View className={cardStyles}>
    {props.children}
  </View>)
}