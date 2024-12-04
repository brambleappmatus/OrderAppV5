import { Product, CartItem } from '@/types/product';
import { StateCreator } from 'zustand';
import toast from 'react-hot-toast';
import { getRandomMessage, addToCartMessages, removeFromCartMessages } from '@/utils/toastMessages';

export interface CartState {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateCartItemQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

export const cartReducer: StateCreator<CartState, [], [], CartState> = (set, get, api) => ({
  cart: [],
  
  addToCart: (product) => 
    set((state) => {
      const existingItem = state.cart.find((item) => item.id === product.id);
      const donation = (product.price * 0.1).toFixed(2);
      
      toast.success(
        `${getRandomMessage(addToCartMessages)} (+€${donation} to shelter 💝)`,
        {
          duration: 3000,
          style: {
            background: 'var(--toast-bg)',
            color: 'var(--toast-color)',
            border: '1px solid #dcfce7',
          },
        }
      );
      
      if (existingItem) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { cart: [...state.cart, { ...product, quantity: 1 }] };
    }),

  removeFromCart: (productId) =>
    set((state) => {
      const item = state.cart.find((i) => i.id === productId);
      if (item) {
        const lostDonation = (item.price * item.quantity * 0.1).toFixed(2);
        toast.error(
          `${getRandomMessage(removeFromCartMessages)} (-€${lostDonation} lost from shelter 💔)`,
          {
            duration: 3000,
            style: {
              background: 'var(--toast-bg)',
              color: 'var(--toast-color)',
              border: '1px solid #fee2e2',
            },
          }
        );
      }
      return {
        cart: state.cart.filter((item) => item.id !== productId),
      };
    }),

  updateCartItemQuantity: (productId, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      ),
    })),

  clearCart: () => set({ cart: [] }),
});