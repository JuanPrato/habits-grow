import { supabase } from "@/lib/supabase";
import { type User } from "@supabase/supabase-js";
import { create } from "zustand";
import { useUserStore } from "./user.store";

interface AuthStoreState {
  user: null | User;
  loading: boolean;
  setUser: (user: any) => Promise<void>;
}

export const useAuthStore = create<AuthStoreState>((set, get) => ({
  user: null,
  loading: true,
  async setUser(user) {
    if (!user) {
      set({
        user: null,
        loading: false,
      });

      return;
    }

    useUserStore.getState().setProfile();

    set({
      user,
      loading: false,
    });
  },
}));

supabase.auth.onAuthStateChange((event, session) => {
  useAuthStore.getState().setUser(session?.user || null);
});
