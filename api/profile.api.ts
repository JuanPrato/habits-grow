import { Profile } from "@/constants/types";
import { getDate } from "@/constants/utils";
import { supabase } from "@/lib/supabase";

export async function getProfile(): Promise<Profile | undefined> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;
  const res = await supabase.from("profiles").select();

  if (res.error) console.error("profile:select", res.error);
  if (res.count === 0) return;
  if (!res.data) return;

  const data = res.data[0];

  return {
    id: data.id,
    name: data.name,
    lastName: data.last_name,
    picture: data.picture,
    streak: data.streak,
    pet: "MIND_MAN"
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
    last_streak_check: getDate(),
  });
}

export async function updateProfile(profile: Profile) {

  const res = await supabase.from("profiles").update({
    name: profile.name,
    picture: profile.picture,
    streak: profile.streak,
  }).eq("id", profile.id);

  console.log(res);

  return;
}