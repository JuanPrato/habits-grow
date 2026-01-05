import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/store/auth.store";
import * as Linking from "expo-linking";
import { openAuthSessionAsync } from "expo-web-browser";

export function useAuth() {
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);
  const redirectTo = Linking.createURL("profile");

  async function signIn() {
    const resp = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo,
        scopes: "openid profile email",
      },
    });

    const res = await openAuthSessionAsync(resp.data.url!);

    if (res.type === "success") {
      const urlParams = new URLSearchParams(res.url.split("#")[1]);
      const access_token = urlParams.get("access_token") || "";
      const refresh_token = urlParams.get("refresh_token") || "";
      supabase.auth.setSession({
        access_token,
        refresh_token,
      });
    }
  }

  async function signInAnon() {
    const res = await supabase.auth.signInAnonymously();
  }

  async function signOut() {
    supabase.auth.signOut();
    setUser(undefined);
  }

  return {
    user,
    signIn,
    signInAnon,
    signOut,
  };
}
