import { theme } from "@/constants/theme";
import { useAuth } from "@/hooks/useAuth";
import { useUserStore } from "@/store/user.store";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  CalendarIcon,
  CheckIcon,
  DownloadIcon,
  FlameIcon,
  LogOutIcon,
  NotificationsIcon,
  ProfileIcon,
} from "../ui/icon";
import { ProgressDonut } from "../ui/progress";
import { Screen } from "../ui/screen";
import { Typography } from "../ui/typography";
import { ConfigCard } from "./config_card";
import { StatsCard } from "./stat_card";

export function ProfileScreen() {
  const { user, signIn, signOut } = useAuth();

  const profile = useUserStore((s) => s.profile);
  console.log({ profile });
  return (
    <Screen>
      <View className="rounded-[75px] overflow-hidden mb-4">
        <LinearGradient
          colors={[
            theme.colors.white,
            theme.colors.primary[200],
            theme.colors.primary[200],
            theme.colors.primary[50],
          ]}
          locations={[0, 0.3, 0.7, 1]}
        >
          <View className="p-4 h-[200px] items-center justify-center gap-2">
            <View>
              <View className="size-32 rounded-full overflow-hidden">
                <Image
                  source={profile?.picture}
                  style={{ flex: 1 }}
                  contentFit="contain"
                />
              </View>
              <View className="size-24 absolute -right-7 -bottom-1 shadow">
                <Image
                  style={{ flex: 1 }}
                  source={require("../../assets/images/character/initial.png")}
                  contentFit="contain"
                />
              </View>
            </View>
            <View className="items-center">
              <Typography type="title" wight="semibold">
                {profile?.name ?? "Invitado"}
              </Typography>
              <Typography type="subtitle">12 días en racha</Typography>
            </View>
          </View>
        </LinearGradient>
      </View>
      <View className="p-2 relative">
        <Badge
          type="primary"
          className="absolute left-1/2 -translate-x-[43px] -top-4 z-10 w-[100px] h-[30px]"
        >
          <Typography
            wight="semibold"
            size="sm"
            className="text-primary-700"
            center
          >
            Nivel 3
          </Typography>
        </Badge>
        <StatsCard
          items={[
            {
              icon: (
                <View className="rounded-full size-10 justify-center items-center bg-green-500">
                  <CheckIcon />
                </View>
              ),
              value: "4",
              label: "Hábitos\nactivos",
            },
            {
              icon: <FlameIcon size="lg" color="red.600" />,
              value: "12",
              label: "Racha\nde días",
            },
            {
              icon: <ProgressDonut value={0.68} size={42} />,
              label: "Progreso\nde abril",
            },
          ]}
        />
      </View>
      <View className="p-2 gap-2">
        <Typography type="sectionTitle" size="lg">
          Configuración
        </Typography>
        <ConfigCard
          items={[
            {
              icon: <ProfileIcon color="primary.700" />,
              label: "Editar perfil",
              onPress: () => {},
            },
            {
              icon: <NotificationsIcon color="primary.700" />,
              label: "Recordatorios",
              onPress: () => {},
            },
            {
              icon: <CalendarIcon color="primary.700" />,
              label: "Integrar calendario",
              onPress: () => {},
            },
            {
              icon: <DownloadIcon color="primary.700" />,
              label: "Exportar mis datos",
              onPress: () => {},
            },
            {
              icon: <LogOutIcon color="red.400" />,
              label: "Cerrar sesión",
              onPress: () => signOut(),
              destructive: true,
            },
          ]}
        />
      </View>

      {!user && (
        <Button onPress={() => signIn()}>
          <Typography>Log In</Typography>
        </Button>
      )}
    </Screen>
  );
}
