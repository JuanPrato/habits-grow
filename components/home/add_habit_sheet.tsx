import { HabitColor } from "@/constants/types";
import { useHabitColor } from "@/hooks/useHabitColor";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useMemo, useRef, useState } from "react";
import { NewHabitForm } from "./habit_form/new_habit_form";

type AddHabitSheetProps = {
  onClose?: () => void;
};

export function AddHabitSheet({ onClose }: AddHabitSheetProps) {
  const sheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["70%"], []);
  const [selectedColor, setSelectedColor] = useState<HabitColor>("sage");

  const color = useHabitColor(selectedColor);

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={snapPoints}
      index={1}
      onClose={onClose}
      keyboardBehavior="interactive"
      enablePanDownToClose={true}
      enableContentPanningGesture={false}
      containerStyle={{ backgroundColor: "rgba(0,0,0,0.4)" }}
      backgroundStyle={{ backgroundColor: color.hex }}
    >
      <BottomSheetScrollView className="px-6 py-4 flex-1" >
        {/* Formulario */}
        <NewHabitForm onSubmit={() => { }} onColorChange={(c: HabitColor) => setSelectedColor(c)} />
      </BottomSheetScrollView>
    </BottomSheet>
  );
}
