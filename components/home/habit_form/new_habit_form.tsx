import { HabitColor } from "@/constants/types";
import { useHabitColor } from "@/hooks/useHabitColor";
import { NewHabitPayload, newHabitSchema } from "@/schemas/habit.schema";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Button } from "../../ui/button";
import { Typography } from "../../ui/typography";
import { CategoriesInput } from "./categories_input";
import { ColorInput } from "./color_input";
import { FrequencyInput } from "./frequency_input";
import { IconInput } from "./icon_input";
import { NameInput } from "./name_input";
import { OptionsInput } from "./options_input";

export type NewHabitInputProps = {
  value: NewHabitPayload;
  onChange: (value: NewHabitPayload) => void;
};

export function NewHabitForm({
  onSubmit: propsOnSubmit,
  onColorChange,
}: {
  onSubmit: (habit: NewHabitPayload) => void;
  onColorChange: (color: HabitColor) => void;
}) {
  const [value, setValue] = useState<NewHabitPayload>({
    category: "health",
    color: "emerald",
    notifications: false,
    calendarSync: false,
  } as NewHabitPayload);
  const [isValid, setIsValid] = useState(false);

  const color = useHabitColor(value.color);

  useEffect(() => {
    onColorChange(value.color);
  }, [value.color]);

  useEffect(() => {
    const parse = newHabitSchema.safeParse(value);
    setIsValid(parse.success);
  }, [value]);

  function onSubmit() {
    const parse = newHabitSchema.safeParse(value);

    if (parse.success) propsOnSubmit(parse.data!);
  }

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
      <OptionsInput value={value} onChange={(v) => setValue({ ...v })} />

      {/* Submit */}
      <Button
        disabled={!isValid ? true : undefined}
        onPress={() => onSubmit()}
        className={color.bg}
      >
        <Typography
          className="font-semibold text-base"
          color={!isValid ? "muted" : undefined}
        >
          Crear hábito
        </Typography>
      </Button>
    </View>
  );
}
