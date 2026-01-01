import { PropsWithChildren } from "react";
import { Pressable } from "react-native";

interface ButtonProps {
  onPress?: () => void;
}

export function Button(props: PropsWithChildren<ButtonProps>) {
  const { onPress } = props;

  return (
    <Pressable
      onPress={onPress}
      className="bg-primary-500 p-2 rounded-md items-center justify-center w-full"
    >
      {props.children}
    </Pressable>
  );
}
