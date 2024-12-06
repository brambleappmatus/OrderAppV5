import { supabase } from './supabase';

export async function cleanupOldCarts(): Promise<void> {
  try {
    const thirtyMinutesAgo = new Date();
    thirtyMinutesAgo.setMinutes(thirtyMinutesAgo.getMinutes() - 30);

    // First, get all expired cart IDs
    const { data: expiredCarts, error: fetchError } = await supabase
      .from('carts')
      .select('id')
      .eq('is_guest', true)
      .lt('updated_at', thirtyMinutesAgo.toISOString());

    if (fetchError) throw fetchError;
    if (!expiredCarts?.length) return;

    const expiredCartIds = expiredCarts.map(cart => cart.id);

    // Delete cart items for expired carts
    const { error: deleteItemsError } = await supabase
      .from('cart')
      .delete()
      .in('cart_id', expiredCartIds);

    if (deleteItemsError) throw deleteItemsError;

    // Delete the expired carts
    const { error: deleteCartsError } = await supabase
      .from('carts')
      .delete()
      .in('id', expiredCartIds);

    if (deleteCartsError) throw deleteCartsError;

  } catch (error) {
    console.error('Error cleaning up old carts:', error);
  }
}

let cleanupInterval: NodeJS.Timeout | null = null;

export function scheduleCartCleanup(intervalMinutes: number = 15): NodeJS.Timeout {
  if (cleanupInterval) {
    clearInterval(cleanupInterval);
  }
  
  cleanupInterval = setInterval(() => {
    cleanupOldCarts().catch(console.error);
  }, intervalMinutes * 60 * 1000);
  
  return cleanupInterval;
}

export function stopCartCleanup(): void {
  if (cleanupInterval) {
    clearInterval(cleanupInterval);
    cleanupInterval = null;
  }
}