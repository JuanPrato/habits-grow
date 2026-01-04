import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useMemo, useState } from "react";
import { Pressable, View } from "react-native";

import { Badge } from "@/components/ui/badge";
import { Typography } from "@/components/ui/typography";
import { HABIT_CATEGORIES } from "@/constants/const";
import { HabitType } from "@/constants/types";
import { useHabitColor } from "@/hooks/useHabitColor";
import { NewHabitInputProps } from "./new_habit_form";

export function CategoriesInput(props: NewHabitInputProps) {

  const color = useHabitColor(props.value.color ?? "sage")

  const categories = useMemo(() => Object.entries(HABIT_CATEGORIES).map(([key, name]) => ({
    id: key as HabitType,
    name,
  })), []);

  const [categoryId, setCategoryId] = useState(categories[0]?.id);

  function setCategoryAndNotify(cat: HabitType) {
    setCategoryId(cat);
    props.onChange({ ...props.value, category: cat });
  }

  return (
    <View className="gap-2">
      <Typography type="label">
        Categoría
      </Typography>

      <BottomSheetScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled

      >
        <View className="flex-row gap-2 py-2">
          {categories.map((cat) => (
            <Pressable
              key={cat.id}
              onPress={() => setCategoryAndNotify(cat.id)}
            >
              <Badge type="phantom" className={`border ${(categoryId === cat.id) ? `${color.border} ${color.bg}` : "border-gray-300 bg-transparent"}`}>
                <Typography>{cat.name}</Typography>
              </Badge>
            </Pressable>
          ))}
        </View>
      </BottomSheetScrollView>
    </View>
  )
}