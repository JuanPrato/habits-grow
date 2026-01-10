import { useAuth } from "@/hooks/useAuth";
import { View } from "react-native";
import {
  CalendarIcon,
  DownloadIcon,
  LogOutIcon,
  NotificationsIcon,
} from "../ui/icon";
import { Typography } from "../ui/typography";
import { ConfigCard } from "./config_card";

export function ProfileConfiguration() {
  const { user, signOut } = useAuth();

  const ITEMS_WITH_SESSION = [
    {
      icon: <NotificationsIcon color="primary.700" />,
      label: "Recordatorios",
      onPress: () => {},
      type: "check",
    },
    {
      icon: <CalendarIcon color="primary.700" />,
      label: "Integrar calendario",
      onPress: () => {},
      type: "check",
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

  return (
    <View className="p-2 gap-2">
      <Typography type="sectionTitle" size="lg">
        Configuración
      </Typography>
      <ConfigCard items={ITEMS_WITH_SESSION} />
      {!user && (
        <Typography type="info" className="ml-2">
          Para no perder tu progreso inicia sesión
        </Typography>
      )}
    </View>
  );
}
