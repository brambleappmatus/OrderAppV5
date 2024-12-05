import { useEffect, useCallback } from 'react';
import { useStore } from '@/store/useStore';

export function useProducts() {
  const { products, initializeProducts } = useStore();

  const initProducts = useCallback(async () => {
    await initializeProducts();
  }, [initializeProducts]);

  useEffect(() => {
    initProducts();
  }, [initProducts]);

  return { products };
}