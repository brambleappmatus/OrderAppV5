import { supabase } from './supabase';
import { CartItem, AddToCartData } from '@/types/cart';
import { cartManager } from './cartManager';

export async function addToCart(data: AddToCartData): Promise<CartItem> {
  try {
    const cartId = await cartManager.initializeCart();
    
    const { data: cartItem, error } = await supabase
      .from('cart')
      .insert([{
        cart_id: cartId,
        product_id: data.product_id,
        product_name: data.product_name,
        user_id: data.user_id || null,
        quantity: data.quantity,
        price: data.price,
        charity_amount: data.charity_amount
      }])
      .select()
      .single();

    if (error) throw error;
    if (!cartItem) throw new Error('Failed to add item to cart');

    await cartManager.updateCartTimestamp();
    return cartItem;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
}

export async function fetchCartItems(): Promise<CartItem[]> {
  try {
    const cartId = cartManager.getCartId();
    if (!cartId) return [];

    const { data, error } = await supabase
      .from('cart')
      .select(`
        *,
        product:products (
          id,
          product_name,
          calories,
          protein,
          fats,
          carbs,
          price
        )
      `)
      .eq('cart_id', cartId)
      .order('added_at', { ascending: true });

    if (error) throw error;

    await cartManager.updateCartTimestamp();

    return (data || []).map(item => ({
      ...item,
      name: item.product_name || item.product?.product_name,
      kcal: item.product?.calories || 0,
      protein: item.product?.protein || 0,
      fats: item.product?.fats || 0,
      carbs: item.product?.carbs || 0,
      price: (item.product?.price || 0) * (item.quantity || 1),
      charity_amount: (item.product?.price || 0) * 0.1 * (item.quantity || 1)
    }));
  } catch (error) {
    console.error('Error fetching cart items:', error);
    throw error;
  }
}

export async function updateCartItemQuantity(id: string, quantity: number): Promise<void> {
  try {
    const { data: cartItem, error: fetchError } = await supabase
      .from('cart')
      .select(`
        *,
        product:products (
          price,
          product_name
        )
      `)
      .eq('id', id)
      .single();

    if (fetchError) throw fetchError;
    if (!cartItem) throw new Error('Cart item not found');

    const basePrice = cartItem.product?.price || 0;
    const newPrice = basePrice * quantity;
    const newCharityAmount = basePrice * 0.1 * quantity;

    const { error: updateError } = await supabase
      .from('cart')
      .update({ 
        quantity,
        price: newPrice,
        charity_amount: newCharityAmount,
        product_name: cartItem.product?.product_name || cartItem.product_name
      })
      .eq('id', id);

    if (updateError) throw updateError;
    await cartManager.updateCartTimestamp();
  } catch (error) {
    console.error('Error updating cart item quantity:', error);
    throw error;
  }
}

export async function removeFromCart(id: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('cart')
      .delete()
      .eq('id', id);

    if (error) throw error;
    await cartManager.updateCartTimestamp();
  } catch (error) {
    console.error('Error removing item from cart:', error);
    throw error;
  }
}

export async function clearCart(): Promise<void> {
  try {
    const cartId = cartManager.getCartId();
    if (!cartId) return;

    const { error } = await supabase
      .from('cart')
      .delete()
      .eq('cart_id', cartId);

    if (error) throw error;
    cartManager.clearCartId();
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw error;
  }
}