import * as WebBrowser from "expo-web-browser";

import { useUserStore } from "@/store/user.store";
import { Screen } from "../ui/screen";
import { ProfileConfiguration } from "./profile_configuration";
import { ProfileHeader } from "./profile_header";
import { ThemeCard } from "./theme_card";

WebBrowser.maybeCompleteAuthSession();

export function ProfileScreen() {
  const profile = useUserStore((s) => s.profile);

  return (
    <Screen>
      <ProfileHeader profile={profile} />
      <ThemeCard />
      <ProfileConfiguration />
    </Screen>
  );
}
