import { HabitColor, HabitFrequency, HabitIcon, HabitType } from "@/constants/types";
import { useEffect, useState } from "react";
import {
  View
} from "react-native";
import { Button } from "../../ui/button";
import { Typography } from "../../ui/typography";
import { CategoriesInput } from "./categories_input";
import { ColorInput } from "./color_input";
import { FrequencyInput } from "./frequency_input";
import { IconInput } from "./icon_input";
import { NameInput } from "./name_input";
import { OptionsInput } from "./options_input";

export type NewHabitPayload = {
  title: string;
  category: HabitType;
  frequency: HabitFrequency;
  days?: number[]; // 0 = domingo, 6 = sábado
  color: HabitColor;
  icon: HabitIcon;
  notifications: boolean;
  calendarSync: boolean;
};

export type NewHabitInputProps = {
  value: NewHabitPayload;
  onChange: (value: NewHabitPayload) => void;
}

export function NewHabitForm({
  onSubmit,
  onColorChange
}: {
  onSubmit: (habit: NewHabitPayload) => void;
  onColorChange: (color: HabitColor) => void;
}) {

  const [value, setValue] = useState<NewHabitPayload>({
    color: "emerald"
  } as NewHabitPayload);

  useEffect(() => {
    onColorChange(value.color);
  }, [value.color]);

  /*
    const isValid =
      title.trim().length > 0 &&
      categoryId &&
      (frequency === "daily" || days.length > 0);
  */
  const isValid = false;

  return (
    <View className="gap-4 pb-6 overflow-hidden">
      {/* Nombre */}
      <NameInput value={value} onChange={(value) => setValue({ ...value })} />

      {/* Categorías */}
      <CategoriesInput value={value} onChange={(v) => setValue({ ...v })} />

      {/* Color */}
      <ColorInput value={value} onChange={(value) => setValue({ ...value })} />

      {/* Ícono */}
      <IconInput value={value} onChange={(v) => setValue({ ...v })} />

      {/* Frecuencia */}
      <FrequencyInput value={value} onChange={(v) => setValue({ ...v })} />

      {/* Opciones */}
      <OptionsInput />

      {/* Submit */}
      <Button
        disabled={!isValid}
        onPress={() => { }
          //onSubmit({
          //title,
          //categoryId,
          //frequency,
          //days: frequency === "custom" ? days : undefined,
          //color: color || "blue",
          //notifications,
          //calendarSync,
          //})
        }
      >
        <Typography className="font-semibold text-base" color={!isValid ? "muted" : undefined}>
          Crear hábito
        </Typography>
      </Button>
    </View>
  );
}