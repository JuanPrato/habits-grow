import { Profile } from "@/constants/types";
import { supabase } from "@/lib/supabase";
import { type User } from "@supabase/supabase-js";
import { create } from "zustand";

interface AuthStoreState {
  user: null | User;
  profile: null | Profile;
  setUser: (user: any) => Promise<void>;
}

export const useAuthStore = create<AuthStoreState>((set, get) => ({
  user: null,
  profile: null,
  async setUser(user) {
    if (!user) {
      set({
        user: null,
        profile: null,
      });
      return;
    }

    const { data, error } = await supabase
      .from("profiles")
      .select()
      .eq("id", user.id)
      .limit(1);

    if (error) {
      console.error(error);
      return;
    }

    if (!data) {
      set({
        user,
      });
      return;
    }

    const profile = data[0];

    set({
      user,
      profile: {
        id: profile.id,
        name: profile.name,
        lastName: profile.last_name,
        picture: profile.picture,
      },
    });
  },
}));

supabase.auth
  .getUser()
  .then((user) => useAuthStore.setState({ user: user.data.user }));
