import { Image } from "expo-image";
import { maybeCompleteAuthSession } from "expo-web-browser";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuth } from "@/hooks/useAuth";
import { Button } from "../ui/button";
import { Screen } from "../ui/screen";
import { GoogleButton } from "./google.button";

maybeCompleteAuthSession();

export function LoginScreen() {
  const { signIn, signInAnon } = useAuth();

  return (
    <SafeAreaView className="flex-1 bg-primary-50">
      <Screen center>
        {/* Logo / Hero */}
        <View className="items-center mb-8">
          <View className="size-24 rounded-3xl bg-primary-soft items-center justify-center mb-6">
            <Image
              style={{
                flex: 1,
                width: "100%",
                height: "100%",
              }}
              source={require("../../assets/images/splash-icon.png")}
              contentFit="contain"
              cachePolicy="none"
            />
          </View>

          <Text className="text-3xl font-bold text-text mb-2">
            Mejor tarde que nunca
          </Text>

          <Text className="text-base text-gray-500 text-center">
            Construí hábitos simples. Mejorá todos los días.
          </Text>
        </View>

        <View className="gap-4">
          {/* CTA */}
          <GoogleButton onPress={() => signIn()} />

          {/* Opcional: login anónimo / guest */}
          <Button
            onPress={() => {
              signInAnon();
            }}
          >
            <Text className="text-gray-500">Ingresa como anónimo</Text>
          </Button>
        </View>
        {/* Footer */}
        <View className="justify-end pb-6">
          <Text className="text-xs text-gray-400 text-center">
            Al continuar aceptás nuestros términos y privacidad
          </Text>
        </View>
      </Screen>
    </SafeAreaView>
  );
}
