import { PETS } from "@/constants/const";
import { useUserStore } from "@/store/user.store";
import { FlatList, View } from "react-native";
import { PetCard } from "./pet_card";

export function PetSelector() {
  const pet = useUserStore((s) => s.profile)?.pet;
  const change = useUserStore((s) => s.changePet);

  return (
    <View className="py-4">
      <FlatList
        data={PETS}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <PetCard
            pet={item}
            selected={item === pet}
            onPress={() => change(item)}
          />
        )}
        style={{ overflow: "visible" }}
      />
    </View>
  );
}
