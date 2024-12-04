import React from 'react';
import Image from 'next/image';
import { Product } from '@/types/product';
import { useStore } from '@/store/useStore';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const { addToCart, translations } = useStore();
  const [imageError, setImageError] = React.useState(false);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-zinc-800 rounded-xl max-w-lg w-full shadow-xl relative overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-1.5 bg-black/10 hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20 rounded-full transition-colors"
          aria-label={translations.shop.close}
        >
          <XMarkIcon className="h-5 w-5 text-white" />
        </button>

        <div className="relative h-64 bg-gray-100 dark:bg-zinc-700">
          {imageError ? (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-gray-400 dark:text-zinc-500">{translations.shop.imageNotAvailable}</span>
            </div>
          ) : (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-contain"
              onError={() => setImageError(true)}
              sizes="(max-width: 768px) 100vw, 32rem"
            />
          )}
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-zinc-100">{product.name}</h2>
              <p className="text-lg font-medium text-gray-600 dark:text-zinc-300 mt-1">€{product.price.toFixed(2)}</p>
            </div>
          </div>

          <p className="text-gray-600 dark:text-zinc-300 mb-6">{product.description}</p>
          
          <div className="grid grid-cols-4 gap-3 mb-6">
            <div className="bg-gray-50 dark:bg-zinc-700/50 p-2.5 rounded-lg text-center">
              <span className="block text-sm font-medium text-gray-800 dark:text-zinc-100">{product.kcal}</span>
              <span className="text-xs text-gray-500 dark:text-zinc-400">Calories</span>
            </div>
            <div className="bg-gray-50 dark:bg-zinc-700/50 p-2.5 rounded-lg text-center">
              <span className="block text-sm font-medium text-gray-800 dark:text-zinc-100">{product.protein}g</span>
              <span className="text-xs text-gray-500 dark:text-zinc-400">Protein</span>
            </div>
            <div className="bg-gray-50 dark:bg-zinc-700/50 p-2.5 rounded-lg text-center">
              <span className="block text-sm font-medium text-gray-800 dark:text-zinc-100">{product.fats}g</span>
              <span className="text-xs text-gray-500 dark:text-zinc-400">Fats</span>
            </div>
            <div className="bg-gray-50 dark:bg-zinc-700/50 p-2.5 rounded-lg text-center">
              <span className="block text-sm font-medium text-gray-800 dark:text-zinc-100">{product.carbs}g</span>
              <span className="text-xs text-gray-500 dark:text-zinc-400">Carbs</span>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => {
                addToCart(product);
                onClose();
              }}
              className="w-full py-3 bg-zinc-800 dark:bg-zinc-700 text-white rounded-lg hover:bg-zinc-700 dark:hover:bg-zinc-600 transition-colors"
            >
              {translations.shop.addToCart}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}