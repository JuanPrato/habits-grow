import { HabitIcon } from "@/constants/types";
import { useState } from "react";
import { FlatList, Modal, Pressable, Text, View } from "react-native";
import { Button } from "../ui/button";
import { HABIT_ICONS } from "../ui/icon";
import { Typography } from "../ui/typography";

export type HabitOption = {
  id: string;
  title: string;
  icon: HabitIcon;
};

type HabitDropdownProps = {
  value?: HabitOption;
  options: HabitOption[];
  onSelect: (habit: HabitOption) => void;
};

export function HabitDropdown({
  value,
  options,
  onSelect,
}: HabitDropdownProps) {
  const [open, setOpen] = useState(false);

  const Icon = value ? HABIT_ICONS[value.icon] : null;

  return (
    <>
      {/* Trigger */}
      <Button full={false} size="sm" onPress={() => setOpen(true)} className="px-4">
        <View pointerEvents="none" className="flex-row gap-2 justify-center items-center">
          <Typography size="sm">{value ? value.title : "Seleccionar"}</Typography>
        </View>
      </Button>

      {/* Bottom Sheet */}
      <Modal
        visible={open}
        transparent
        animationType="slide"
        onRequestClose={() => setOpen(false)
        }
      >
        <Pressable
          className="flex-1 bg-black/30"
          onPress={() => setOpen(false)}
        />

        <View className="bg-white rounded-t-3xl px-4 pt-4 pb-8">
          <View className="w-10 h-1 bg-gray-300 rounded-full self-center mb-4" />

          <Text className="text-lg font-semibold mb-4">
            Elegir hábito
          </Text>

          <FlatList
            data={options}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              const Icon = HABIT_ICONS[item.icon];
              return (
                <Pressable
                  onPress={() => {
                    onSelect(item);
                    setOpen(false);
                  }}
                  className="flex-row items-center gap-3 py-4 border-b border-gray-100"
                >
                  {!!Icon && <Icon color="black" />}
                  <Text className="text-base text-gray-800">
                    {item.title}
                  </Text>
                </Pressable>
              )
            }}
          />
        </View>
      </Modal>
    </>
  );
}
