'use client';

import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';

export function useNavigation() {
  const router = useRouter();
  const { setAdminAuthenticated } = useStore();

  const goToShop = () => {
    setAdminAuthenticated(false);
    router.push('/');
  };

  const goToAdmin = () => {
    router.push('/admin');
  };

  return { goToShop, goToAdmin };
}