// ICONS

import { DefaultColors } from "tailwindcss/types/generated/colors";
import { ICONS_SIZES } from "./const";
import { theme, type Color, type ColorsObj } from "./theme";
import type { IconProps } from "./types";

export function getColor(
  color?: Color,
  obj?: ColorsObj[keyof ColorsObj]
): string {
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

export function generateVarsObject(color: DefaultColors[keyof DefaultColors]) {
  return {
    "--color-primary-50": color["50"],
    "--color-primary-100": color["100"],
    "--color-primary-200": color["200"],
    "--color-primary-300": color["300"],
    "--color-primary-400": color["400"],
    "--color-primary-500": color["500"],
    "--color-primary-600": color["600"],
    "--color-primary-700": color["700"],
    "--color-primary-800": color["800"],
    "--color-primary-900": color["900"],
    "--color-primary-950": color["950"],
  };
}

// PARSING

const dateFormatter = new Intl.DateTimeFormat("es-AR", {
  dateStyle: "medium",
});

export function formatDate(date: Date) {
  const a = dateFormatter.formatToParts(date);

  return `${a[0].value} ${a[2].value.toUpperCase()}`;
}
