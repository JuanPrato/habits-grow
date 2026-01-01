import { useAuth } from "@/hooks/useAuth";
import { Button } from "../ui/button";
import { Screen } from "../ui/screen";
import { Typography } from "../ui/typography";

export function ProfileScreen() {
  const { user, signIn, signOut } = useAuth();

  return (
    <Screen>
      <Typography>PROFILE</Typography>
      {!!user ? (
        <>
          <Typography>User: {user.user_metadata.full_name}</Typography>
          <Button onPress={() => signOut()}>
            <Typography>Log out</Typography>
          </Button>
        </>
      ) : (
        <Button onPress={() => signIn()}>
          <Typography>Log In</Typography>
        </Button>
      )}
    </Screen>
  );
}
