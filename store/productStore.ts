import { create } from "zustand";
import axios from "axios";

interface ProductStore {
  products: any[];

  fetchProducts: (skip?: number) => Promise<void>;

  searchProducts: (query: string) => Promise<void>;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],

  fetchProducts: async (skip = 0) => {
    try {
      const res = await axios.get(
        `https://dummyjson.com/products?limit=12&skip=${skip}`
      );

      set({
        products: res.data.products,
      });
    } catch (err) {
      console.log(err);
    }
  },

  searchProducts: async (query: string) => {
    try {
      const res = await axios.get(
        `https://dummyjson.com/products/search?q=${query}`
      );

      set({
        products: res.data.products,
      });
    } catch (err) {
      console.log(err);
    }
  },
}));