import { cva, VariantProps } from "class-variance-authority";
import { PropsWithChildren } from "react";
import { Pressable } from "react-native";

const button = cva("bg-primary-200 p-2 rounded-3xl items-center justify-center", {
  variants: {
    size: {
      sm: "p-2 ",
      md: "p-3",
      lg: "p-4",
    },
    full: {
      true: "w-full",
      false: "w-auto",
    }
  },
  defaultVariants: {
    size: "md",
    full: false,
  },
})

interface ButtonProps {
  onPress?: () => void;
  className?: string;
}

export function Button(props: PropsWithChildren<ButtonProps> & VariantProps<typeof button>) {
  const { onPress } = props;

  const buttonStyles = button({ size: props.size, full: props.full, className: props.className });

  return (
    <Pressable
      onPress={onPress}
      className={buttonStyles}
    >
      {props.children}
    </Pressable>
  );
}
