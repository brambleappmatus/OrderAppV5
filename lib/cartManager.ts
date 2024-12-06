import { supabase } from './supabase';
import { CartSession } from '@/types/cart';

export class CartManager {
  private static instance: CartManager;
  private cartId: string | null = null;

  private constructor() {
    if (typeof window !== 'undefined') {
      this.cartId = localStorage.getItem('cartId');
    }
  }

  static getInstance(): CartManager {
    if (!CartManager.instance) {
      CartManager.instance = new CartManager();
    }
    return CartManager.instance;
  }

  async initializeCart(): Promise<string> {
    if (!this.cartId) {
      const { data, error } = await supabase
        .from('carts')
        .insert([{ is_guest: true }])
        .select()
        .single();

      if (error) throw error;
      
      this.cartId = data.id;
      if (typeof window !== 'undefined') {
        localStorage.setItem('cartId', this.cartId);
      }
    }
    return this.cartId;
  }

  async getOrCreateCart(): Promise<CartSession> {
    const cartId = await this.initializeCart();
    const { data, error } = await supabase
      .from('carts')
      .select('*')
      .eq('id', cartId)
      .single();

    if (error) throw error;
    return data;
  }

  async cleanupOldCarts(): Promise<void> {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    await supabase
      .from('carts')
      .delete()
      .eq('is_guest', true)
      .lt('updated_at', thirtyDaysAgo.toISOString());
  }

  async updateCartTimestamp(): Promise<void> {
    if (this.cartId) {
      await supabase
        .from('carts')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', this.cartId);
    }
  }

  getCartId(): string | null {
    return this.cartId;
  }

  clearCartId(): void {
    this.cartId = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cartId');
    }
  }
}

export const cartManager = CartManager.getInstance();