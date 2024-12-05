import React from 'react';
import Image from 'next/image';
import { Product } from '@/types/product';
import { useStore } from '@/store/useStore';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { STORAGE_CONFIG } from '@/lib/config';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

const { FALLBACK_IMAGE_URL } = STORAGE_CONFIG;

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const { addToCart, translations } = useStore();
  const [imageError, setImageError] = React.useState(false);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-zinc-800 rounded-xl w-full max-w-md shadow-xl">
        <div className="flex flex-col h-full max-h-[calc(100vh-2rem)]">
          {/* Image Section */}
          <div className="relative h-48 flex-shrink-0">
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-10 p-1.5 bg-black/10 hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20 rounded-full transition-colors"
              aria-label={translations.shop.close}
            >
              <XMarkIcon className="h-5 w-5 text-white" />
            </button>

            {!product.imageUrl || imageError ? (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-zinc-700 rounded-t-xl">
                <span className="text-gray-400 dark:text-zinc-500">
                  {translations.shop.imageNotAvailable}
                </span>
              </div>
            ) : (
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover rounded-t-xl"
                onError={() => setImageError(true)}
                sizes="(max-width: 768px) 100vw, 32rem"
                unoptimized
              />
            )}
          </div>

          {/* Content Section */}
          <div className="p-4 overflow-y-auto">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-gray-800 dark:text-zinc-100">{product.name}</h2>
              <p className="text-lg font-medium text-gray-600 dark:text-zinc-300 mt-1">€{product.price.toFixed(2)}</p>
            </div>

            <p className="text-gray-600 dark:text-zinc-300 text-sm mb-4">{product.description}</p>
            
            <div className="grid grid-cols-4 gap-2 mb-4">
              <div className="bg-gray-50 dark:bg-zinc-700/50 p-2 rounded-lg text-center">
                <span className="block text-sm font-medium text-gray-800 dark:text-zinc-100">{product.kcal}</span>
                <span className="text-xs text-gray-500 dark:text-zinc-400">kcal</span>
              </div>
              <div className="bg-gray-50 dark:bg-zinc-700/50 p-2 rounded-lg text-center">
                <span className="block text-sm font-medium text-gray-800 dark:text-zinc-100">{product.protein}g</span>
                <span className="text-xs text-gray-500 dark:text-zinc-400">protein</span>
              </div>
              <div className="bg-gray-50 dark:bg-zinc-700/50 p-2 rounded-lg text-center">
                <span className="block text-sm font-medium text-gray-800 dark:text-zinc-100">{product.fats}g</span>
                <span className="text-xs text-gray-500 dark:text-zinc-400">fats</span>
              </div>
              <div className="bg-gray-50 dark:bg-zinc-700/50 p-2 rounded-lg text-center">
                <span className="block text-sm font-medium text-gray-800 dark:text-zinc-100">{product.carbs}g</span>
                <span className="text-xs text-gray-500 dark:text-zinc-400">carbs</span>
              </div>
            </div>
          </div>

          {/* Action Section */}
          <div className="p-4 border-t dark:border-zinc-700 flex-shrink-0">
            <button
              onClick={() => {
                addToCart(product);
                onClose();
              }}
              className="w-full py-2.5 bg-zinc-800 dark:bg-zinc-700 text-white rounded-lg hover:bg-zinc-700 dark:hover:bg-zinc-600 transition-colors text-sm font-medium"
            >
              {translations.shop.addToCart}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}