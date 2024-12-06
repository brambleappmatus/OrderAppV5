import { useStore } from '@/store/useStore';
import toast from 'react-hot-toast';
import { getRandomMessage, addToCartMessages, removeFromCartMessages } from '@/utils/toastMessages';

export const useToastMessages = () => {
  const showAddToCartMessage = (donation: number) => {
    toast.success(
      `${getRandomMessage(addToCartMessages)} (+€${donation.toFixed(2)} to shelter 💝)`,
      {
        duration: 3000,
        style: {
          background: 'var(--toast-bg)',
          color: 'var(--toast-color)',
          border: '1px solid #dcfce7',
        },
      }
    );
  };

  const showRemoveFromCartMessage = (donation: number) => {
    toast.error(
      `${getRandomMessage(removeFromCartMessages)} (-€${donation.toFixed(2)} lost from shelter 💔)`,
      {
        duration: 3000,
        style: {
          background: 'var(--toast-bg)',
          color: 'var(--toast-color)',
          border: '1px solid #fee2e2',
        },
      }
    );
  };

  return {
    showAddToCartMessage,
    showRemoveFromCartMessage,
  };
};