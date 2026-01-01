import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useMemo, useRef } from "react";
import { Text } from "react-native";

type AddHabitSheetProps = {
  onClose?: () => void;
};

export function AddHabitSheet({ onClose }: AddHabitSheetProps) {
  const sheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["60%"], []);

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={snapPoints}
      index={0}
      enablePanDownToClose
      onClose={onClose}
    >
      <BottomSheetView className="px-6 py-4 flex-1 bg-red-200 h-[1000px]">
        <Text className="text-lg font-semibold mb-4 text-black">
          Nuevo hábito
        </Text>

        {/* Formulario */}
      </BottomSheetView>
    </BottomSheet>
  );
}
