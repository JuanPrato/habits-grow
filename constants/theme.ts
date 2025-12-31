import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../tailwind.config";

const fullConfig = resolveConfig(tailwindConfig);

export const theme = fullConfig.theme;

type Full = typeof fullConfig;

export type Theme = Full["theme"];
export type ColorsObj = Theme["colors"];
export type Color = Expand<ColorPaths<ColorsObj>>;

export type ColorPaths<T, Prefix extends string = ""> = {
  [K in keyof T]: T[K] extends string
    ? `${Prefix}${Extract<K, string | number>}`
    : ColorPaths<T[K], `${Prefix}${Extract<K, string>}.`>;
}[keyof T];

type Expand<T> = {
  [K in keyof T]: T[K];
};
