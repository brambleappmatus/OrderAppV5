'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CartState, cartReducer } from '@/store/slices/cartSlice';
import { UIState, uiReducer } from '@/store/slices/uiSlice';
import { ProductState, productReducer } from '@/store/slices/productSlice';

interface StoreState extends CartState, UIState, ProductState {}

export const useStore = create<StoreState>()(
  persist(
    (set, get, api) => ({
      ...cartReducer(set, get, api),
      ...uiReducer(set, get, api),
      ...productReducer(set, get, api),
    }),
    {
      name: 'snack-shop-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        isAdminAuthenticated: state.isAdminAuthenticated,
        isDarkMode: state.isDarkMode,
        cart: state.cart,
        language: state.language,
      }),
    }
  )
);