import { create } from "zustand";
import axios from "axios";

interface AuthState {
  user: any;
  token: string | null;
  loading: boolean;

  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  loading: false,

  login: async (username, password) => {
    try {
      set({ loading: true });

      const res = await axios.post("https://dummyjson.com/auth/login", {
        username,
        password,
        expiresInMins: 60,
      });

      set({
        user: res.data,
        token: res.data.token,
        loading: false,
      });

      localStorage.setItem("token", res.data.token);
    } catch (err) {
      set({ loading: false });
      console.error(err);
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },
}));