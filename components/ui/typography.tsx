import { cva, VariantProps } from "class-variance-authority";
import { PropsWithChildren } from "react";
import { Text } from "react-native";

interface Props {
  children: string | string[] | number;
  className?: string;
}

const typography = cva("", {
  variants: {
    type: {
      title: "py-2 text-3xl text-primary",
      subtitle: "text-xl text-black/70",
      info: "text-black/50 text-md",
      headerTitle: "text-3xl text-textPrimary font-semibold",
      sectionTitle: "text-lg text-textPrimary font-semibold",
      paragraph: "text-lg leading-tight",
      error: "text-sm text-red-500 font-semibold",
    },
    size: {
      default: "",
      base: "!text-base",
      xs: "!text-sm",
      sm: "!text-md",
      md: "!text-lg",
      lg: "!text-xl",
      xl: "!text-2xl",
    },
    wight: {
      default: "",
      light: "!font-light",
      normal: "!font-normal",
      medium: "!font-medium",
      semibold: "!font-semibold",
      bold: "!font-bold",
      extrabold: "!font-extrabold",
    },
    center: {
      true: "text-center",
    },
    color: {
      primary: "text-primaryText",
      accent: "text-white",
    },
  },
  defaultVariants: {
    size: "default",
    wight: "default",
    color: "primary",
  },
});

export function Typography(props: VariantProps<typeof typography> & Props) {
  const styles = typography({
    type: props.type,
    center: props.center,
    size: props.size,
    wight: props.wight,
    color: props.color,
    className: props.className,
  });

  return <Text className={styles}>{props.children}</Text>;
}

// Inputs components

export function Label({
  children,
  required,
}: PropsWithChildren<{ required?: boolean }>) {
  return (
    <Text className="text-md text-textPrimary font-semibold">
      {children} {required && <Text className="text-red-500">*</Text>}
    </Text>
  );
}
