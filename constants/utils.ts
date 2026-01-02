// ICONS

import { ICONS_SIZES } from "./const";
import { theme, type Color, type ColorsObj } from "./theme";
import type { IconProps } from "./types";

function getColor(color?: Color, obj?: ColorsObj[keyof ColorsObj]): string {
  if (!color) return "white";
  if (obj && typeof obj === "string") return obj;

  const [key, ...path] = color.split(".");

  const colorOrObj =
    obj?.[key as keyof typeof obj] ?? theme.colors[key as keyof ColorsObj];

  if (typeof colorOrObj === "string") return colorOrObj;

  return getColor(path.join(".") as Color, colorOrObj);
}

function getSize(size?: keyof typeof ICONS_SIZES) {
  return ICONS_SIZES[size ?? "md"];
}

export function getIconProps(props: IconProps) {
  return { color: getColor(props.color), size: getSize(props.size) };
}

// PARSING

const dateFormatter = new Intl.DateTimeFormat("es-AR", {
  dateStyle: "medium",
});

export function formatDate(date: Date) {
  const a = dateFormatter.formatToParts(date);

  return `${a[0].value} ${a[2].value.toUpperCase()}`;
}
