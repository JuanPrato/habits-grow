import { useAuth } from "@/hooks/useAuth";
import { View } from "react-native";
import {
  CalendarIcon,
  DownloadIcon,
  LogOutIcon,
  NotificationsIcon,
  ProfileIcon,
} from "../ui/icon";
import { Typography } from "../ui/typography";
import { ConfigCard } from "./config_card";

export function ProfileConfiguration() {
  const { user, signIn, signOut } = useAuth();

  const ITEMS_WITH_SESSION = [
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
  ];

  const ITEM_WITHOUT_SESSION = [
    {
      icon: <ProfileIcon color="primary.700" />,
      label: "Iniciar sesión con google",
      onPress: () => signIn(),
    },
  ];

  return (
    <View className="p-2 gap-2">
      <Typography type="sectionTitle" size="lg">
        Configuración
      </Typography>
      <ConfigCard items={!!user ? ITEMS_WITH_SESSION : ITEM_WITHOUT_SESSION} />
      {!user && (
        <Typography type="info" className="ml-2">
          Para no perder tu progreso inicia sesión
        </Typography>
      )}
    </View>
  );
}
