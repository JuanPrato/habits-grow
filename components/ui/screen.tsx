import { PropsWithChildren } from "react";
import { View } from "react-native";

export function Screen(props: PropsWithChildren) {
  return <View className="flex-1 bg-green-50">{props.children}</View>;
}
