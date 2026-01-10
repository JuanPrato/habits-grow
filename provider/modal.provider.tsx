import { AddHabitSheet } from "@/components/home/add_habit_sheet";
import { LevelUpOverlay } from "@/components/home/level_up";
import { useModalStore } from "@/store/modal.store";
import { PropsWithChildren } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export function ModalProvider(props: PropsWithChildren) {
  const openModal = useModalStore((s) => s.createHabit);
  const levelUp = useModalStore((s) => s.levelUp);
  const toggleModal = useModalStore((s) => s.setState);

  return (
    <GestureHandlerRootView className="flex-1" style={{ flex: 1 }}>
      <SafeAreaView className="bg-primary-50 flex-1" edges={["top"]}>
        {props.children}
        {openModal && (
          <AddHabitSheet onClose={() => toggleModal("createHabit", false)} />
        )}
        {levelUp && <LevelUpOverlay />}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
