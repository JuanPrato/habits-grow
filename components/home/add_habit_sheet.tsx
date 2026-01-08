import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useMemo, useRef, useState } from "react";

import { HabitColor } from "@/constants/types";
import { useHabitColor } from "@/hooks/useHabitColor";
import { NewHabitPayload } from "@/schemas/habit.schema";
import { useHabitStore } from "@/store/habits.store";
import { NewHabitForm } from "./habit_form/new_habit_form";

type AddHabitSheetProps = {
  onClose?: () => void;
};

export function AddHabitSheet({ onClose }: AddHabitSheetProps) {
  const sheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["70%"], []);
  const [selectedColor, setSelectedColor] = useState<HabitColor>("emerald");
  const [enabledPan, setEnabledPan] = useState(false);

  const color = useHabitColor(selectedColor);

  const addHabit = useHabitStore((s) => s.addNewHabit);

  function onSubmit(payload: NewHabitPayload) {
    addHabit(payload);
    sheetRef.current?.close();
  }

  return (
    <BottomSheet
      ref={sheetRef}
      index={0}
      snapPoints={snapPoints}
      onClose={onClose}
      keyboardBehavior="interactive"
      containerStyle={{ backgroundColor: "rgba(0,0,0,0.4)" }}
      backgroundStyle={{ backgroundColor: color.hex }}
      enableDynamicSizing={false}
      enablePanDownToClose={true}
      enableContentPanningGesture={false}
      enableHandlePanningGesture
    >
      <BottomSheetScrollView className="px-6 py-4 flex-1">
        {/* Formulario */}
        <NewHabitForm
          onSubmit={onSubmit}
          onColorChange={(c: HabitColor) => setSelectedColor(c)}
        />
      </BottomSheetScrollView>
    </BottomSheet>
  );
}
