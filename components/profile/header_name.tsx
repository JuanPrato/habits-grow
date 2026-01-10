import { useUserStore } from "@/store/user.store";
import { useState } from "react";
import { TextInput, View } from "react-native";
import { Button } from "../ui/button";
import { CheckIcon, EditIcon } from "../ui/icon";
import { Typography } from "../ui/typography";

export function HeaderName({ name }: { name: string }) {
  const changeName = useUserStore((s) => s.changeName);
  const [newName, setNewName] = useState(name);

  const [onEdit, setOnEdit] = useState(false);
  const [disabled, setDisabled] = useState(false);

  async function handleChange() {
    if (name === newName) {
      setOnEdit(false);
      setNewName(name);
      return;
    }

    setDisabled(true);

    await changeName(newName);

    setOnEdit(false);
    setDisabled(false);
  }

  return (
    <View className="flex-row">
      {onEdit ? (
        <TextInput
          autoFocus
          value={newName}
          onChangeText={(n) => !disabled && setNewName(n)}
          className="text-3xl font-semibold ml-3 py-2 border-b-2 border-black/30"
        />
      ) : (
        <Typography type="title" wight="semibold">
          {name ?? "Invitado"}
        </Typography>
      )}
      {onEdit ? (
        <Button
          onPress={handleChange}
          disabled={disabled}
          className="bg-transparent"
        >
          <CheckIcon color="emerald.600" size="md" />
        </Button>
      ) : (
        <Button
          className="aspect-square"
          size="sm"
          onPress={() => setOnEdit((e) => !e)}
        >
          <EditIcon color="black" size="md" />
        </Button>
      )}
    </View>
  );
}
