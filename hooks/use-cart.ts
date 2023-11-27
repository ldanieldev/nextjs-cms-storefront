import { Product } from '@/types';
import { toast } from 'sonner';
import { create, StateCreator } from 'zustand';
import { createJSONStorage, persist, PersistOptions } from 'zustand/middleware';

type CartStore = {
  items: Product[];
  addItem: (data: Product) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
};

type cartPersist = (
  config: StateCreator<CartStore>,
  options: PersistOptions<CartStore>
) => StateCreator<CartStore>;

const useCart = create<CartStore, []>(
  (persist as cartPersist)(
    (set, get): CartStore => ({
      items: [],

      addItem: (data: Product) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === data.id);

        if (existingItem) {
          return toast.info('This item is already in your cart.');
        }

        set({ items: [...get().items, data] });
        toast.success('This item has been added to your cart.');
      },

      removeItem: (id: string) => {
        set({ items: [...get().items.filter((item) => item.id !== id)] });
        toast.success('This item has been removed from your cart.');
      },

      removeAll: () => set({ items: [] })
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
);

export default useCart;
