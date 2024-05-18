import create from "zustand";

const useCustomHook = create((set) => ({
  tabLoading: false,
  setTabLoading: (isLoading) => set({ tabLoading: isLoading }),

  cart: [],
  setCart: (newItem) => set((state) => ({ cart: [...state.cart, newItem] })),
  removeCart: (itemId) =>
    set((state) => ({
      cart: state.cart.filter((item, index) => {
        // Hapus hanya satu instansi dari item yang memiliki ID yang cocok
        if (item === itemId && state.cart.indexOf(itemId) === index) {
          return false;
        }
        return true;
      }),
    })),
  deleteCart: (itemId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item !== itemId),
    })),

  sProduct: [],
  setSProduct: (search) => set({ sProduct: search }),
}));

export default useCustomHook;
