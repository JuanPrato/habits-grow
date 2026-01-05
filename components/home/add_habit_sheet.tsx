import { HabitColor } from "@/constants/types";
import { useAuth } from "@/hooks/useAuth";
import { useHabitColor } from "@/hooks/useHabitColor";
import { NewHabitPayload } from "@/schemas/habit.schema";
import { useHabitStore } from "@/store/habits.store";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useMemo, useRef, useState } from "react";
import { NewHabitForm } from "./habit_form/new_habit_form";

type AddHabitSheetProps = {
  onClose?: () => void;
};

export function AddHabitSheet({ onClose }: AddHabitSheetProps) {
  const { user } = useAuth();
  const sheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["70%"], []);
  const [selectedColor, setSelectedColor] = useState<HabitColor>("emerald");

  const color = useHabitColor(selectedColor);

  const addHabit = useHabitStore((s) => s.addNewHabit);

  function onSubmit(payload: NewHabitPayload) {
    addHabit(payload, user?.id);
    sheetRef.current?.close();
  }

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={snapPoints}
      index={1}
      onClose={onClose}
      keyboardBehavior="interactive"
      enablePanDownToClose={true}
      containerStyle={{ backgroundColor: "rgba(0,0,0,0.4)" }}
      backgroundStyle={{ backgroundColor: color.hex }}
      onChange={(i) => i === 0 && sheetRef.current?.close()}
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
