import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useMemo, useRef } from "react";
import { Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

type AddHabitSheetProps = {
  onClose?: () => void;
};

export function AddHabitSheet({ onClose }: AddHabitSheetProps) {
  const sheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["100%"], []);

  return (
    <GestureHandlerRootView>
      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        index={1}
        enablePanDownToClose
        onClose={onClose}
        style={{ flex: 1, backgroundColor: "white" }}
        backgroundStyle={{ flex: 1, backgroundColor: "black" }}
        containerStyle={{ flex: 1, height: "150%", backgroundColor: "red" }}
        handleStyle={{ backgroundColor: "blue" }}
      >
        <BottomSheetView className="px-6 py-4 flex-1 bg-red-200 h-[1000px]">
          <Text className="text-lg font-semibold mb-4 text-black">
            Nuevo hábito
          </Text>

          {/* Formulario */}
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}
