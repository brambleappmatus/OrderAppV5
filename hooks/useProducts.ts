import { useEffect, useCallback } from 'react';
import { useStore } from '@/store/useStore';

export function useProducts() {
  const { products, refreshProducts } = useStore();

  useEffect(() => {
    refreshProducts();
  }, [refreshProducts]);

  const refresh = useCallback(async () => {
    await refreshProducts();
  }, [refreshProducts]);

  return { products, refreshProducts: refresh };
}