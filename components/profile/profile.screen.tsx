import { useAuth } from "@/hooks/useAuth";
import { useUserStore } from "@/store/user.store";
import { Screen } from "../ui/screen";
import { ProfileConfiguration } from "./profile_configuration";
import { ProfileHeader } from "./profile_header";
import { ProfileStats } from "./profile_stats";

export function ProfileScreen() {
  const { user, signIn, signOut } = useAuth();

  const profile = useUserStore((s) => s.profile);

  return (
    <Screen>
      <ProfileHeader profile={profile} />
      <ProfileStats />
      <ProfileConfiguration />
    </Screen>
  );
}
