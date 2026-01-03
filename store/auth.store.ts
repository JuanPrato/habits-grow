import { supabase } from "@/lib/supabase";
import { type User } from "@supabase/supabase-js";
import { create } from "zustand";
import { useUserStore } from "./user.store";

interface AuthStoreState {
  user: null | User;
  setUser: (user: any) => Promise<void>;
}

export const useAuthStore = create<AuthStoreState>((set, get) => ({
  user: null,
  profile: null,
  async setUser(user) {
    if (!user) {
      set({
        user: null,
      });

      useUserStore.getState().inviteProfile();
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

    if (!data || data.length === 0) {
      set({
        user,
      });

      useUserStore.setState({
        profile: {
          id: user.id,
          name: user.user_metadata?.name,
          picture: user.user_metadata.picture,
        },
      });
      return;
    }

    const profile = data[0];

    set({
      user,
    });

    useUserStore.setState({
      profile: {
        id: profile.id,
        name: profile.name,
        lastName: profile.last_name,
        picture: profile.picture,
      },
    });
  },
}));

supabase.auth.onAuthStateChange((event, session) => {
  useAuthStore.getState().setUser(session?.user || null);
});
