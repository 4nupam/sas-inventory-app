import { create } from "zustand";
import { product_service } from "../api/service";
import { handleApiError } from "../api/apiErrorHandler";

export const useProductStore = create((set) => ({
  products: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true, error: null });

    try {
      const { data } = await product_service.getProducts();

      set({
        products: data,
        loading: false,
      });
    } catch (err) {
      set({
        error: handleApiError(err),
        loading: false,
      });
    }
  },

  clearError: () => set({ error: null }),
}));
