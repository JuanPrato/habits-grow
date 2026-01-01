import { PropsWithChildren } from "react";
import { View } from "react-native";

interface ScreenProps {
  center?: boolean;
}

export function Screen(props: PropsWithChildren<ScreenProps>) {
  return (
    <View
      className={[
        "flex-1 bg-green-50",
        props.center ? "items-center justify-center" : "",
      ].join(" ")}
    >
      {props.children}
    </View>
  );
}
