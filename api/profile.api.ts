import { Profile } from "@/constants/types";
import { supabase } from "@/lib/supabase";

export async function getProfile(): Promise<Profile | undefined> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;
  const res = await supabase
    .from("profiles")
    .select()
    .eq("user_id", user.id)
    .single();

  if (!res.data) return;

  return {
    id: res.data.id,
    name: res.data.name,
    lastName: res.data.last_name,
    picture: res.data.picture,
    streak: res.data.streak,
  };
}

export async function createProfile() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  await supabase.from("profiles").insert({
    id: user.id,
    name: user.user_metadata?.name ?? "Invitado",
    picture: user.user_metadata?.picture,
  });
}
