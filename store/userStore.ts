import { create } from "zustand";
import axios from "axios";

interface UserStore {
  users: any[];

  fetchUsers: (skip?: number) => Promise<void>;

  searchUsers: (query: string) => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
  users: [],

  fetchUsers: async (skip = 0) => {
    try {
      const res = await axios.get(
        `https://dummyjson.com/users?limit=10&skip=${skip}`
      );

      set({
        users: res.data.users,
      });
    } catch (err) {
      console.log(err);
    }
  },

  searchUsers: async (query: string) => {
    try {
      const res = await axios.get(
        `https://dummyjson.com/users/search?q=${query}`
      );

      set({
        users: res.data.users,
      });
    } catch (err) {
      console.log(err);
    }
  },
}));