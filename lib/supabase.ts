import { SUPABASE_PUBLIC_KEY, SUPABASE_URL } from "@/constants/const";
import { Database } from "@/database.types";
import { createClient } from "@supabase/supabase-js";
import "expo-sqlite/localStorage/install";

export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_PUBLIC_KEY,
  {
    auth: {
      storage: localStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);
