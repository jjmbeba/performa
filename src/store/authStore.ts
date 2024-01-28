import { User } from "@supabase/supabase-js";
import { create } from "zustand";

export interface UserState {
  user: User| null;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<UserState>()((set) => ({
  user: null,
  setUser: (user) => set((state) => ({ 
    user
   })),
}));
