import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user: string | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (username, password) => {
        if (username === "admin" && password === "1234") {
          set({ user: username });
          return true;
        }
        return false;
      },
      logout: () => set({ user: null }),
    }),
    {
      name: "autofleet-auth",
    }
  )
);
