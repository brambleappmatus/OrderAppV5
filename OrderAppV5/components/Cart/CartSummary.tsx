'use client';

import React from 'react';
import { useStore } from '@/store/useStore';
import Image from 'next/image';
import { CreditCardIcon, HeartIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function CartSummary() {
  const { cart, removeFromCart, updateCartItemQuantity, translations } = useStore();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shelterDonation = total * 0.1; // 10% of total

  // Calculate total macros
  const totalMacros = cart.reduce((acc, item) => ({
    kcal: acc.kcal + (item.kcal * item.quantity),
    protein: acc.protein + (item.protein * item.quantity),
    fats: acc.fats + (item.fats * item.quantity),
    carbs: acc.carbs + (item.carbs * item.quantity)
  }), { kcal: 0, protein: 0, fats: 0, carbs: 0 });

  const handlePaymentClick = () => {
    window.open('https://revolut.me/attymatty', '_blank');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-shrink-0 h-[calc(100vh-36rem)] overflow-y-auto mb-4 pr-2">
        <div className="space-y-3">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center justify-between bg-gray-50 dark:bg-zinc-800/50 p-2 rounded-lg">
              <div className="flex-grow min-w-0 mr-2">
                <p className="font-medium text-gray-800 dark:text-white text-sm truncate">{item.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">€{item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateCartItemQuantity(item.id, parseInt(e.target.value))}
                  className="w-12 p-1 text-sm border rounded dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
                />
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-md transition-colors"
                  aria-label="Remove item"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {cart.length > 0 && (
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-3 grid grid-cols-4 gap-2">
          <div className="text-center">
            <span className="block font-medium">{totalMacros.kcal}</span>
            <span className="text-[10px]">{translations.shop.cart.macros.kcal}</span>
          </div>
          <div className="text-center">
            <span className="block font-medium">{totalMacros.protein}g</span>
            <span className="text-[10px]">{translations.shop.cart.macros.protein}</span>
          </div>
          <div className="text-center">
            <span className="block font-medium">{totalMacros.fats}g</span>
            <span className="text-[10px]">{translations.shop.cart.macros.fats}</span>
          </div>
          <div className="text-center">
            <span className="block font-medium">{totalMacros.carbs}g</span>
            <span className="text-[10px]">{translations.shop.cart.macros.carbs}</span>
          </div>
        </div>
      )}

      <div className="flex-shrink-0 border-t dark:border-zinc-700 pt-4 mb-3">
        <p className="font-semibold text-gray-800 dark:text-white mb-3">
          {translations.shop.cart.total}: €{total.toFixed(2)}
        </p>
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-950/30 dark:to-purple-950/30 p-2.5 rounded-lg border border-pink-100 dark:border-pink-900/30">
          <div className="flex items-center mb-1">
            <HeartIcon className="h-5 w-5 text-pink-500 dark:text-pink-400 animate-pulse mr-2" />
            <span className="font-medium text-gray-800 dark:text-white">
              {translations.shop.cart.shelterDonation.title}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {translations.shop.cart.shelterDonation.description}
          </p>
          <p className="mt-1 font-medium text-pink-600 dark:text-pink-400">
            €{shelterDonation.toFixed(2)} {translations.shop.cart.shelterDonation.amount}
          </p>
        </div>
      </div>
      
      {cart.length > 0 && (
        <div className="flex-shrink-0 flex flex-col items-center space-y-3 mb-4">
          <div className="md:hidden w-full">
            <button
              onClick={handlePaymentClick}
              className="w-full py-3 px-4 bg-zinc-800 dark:bg-zinc-700 text-white rounded-lg hover:bg-zinc-700 dark:hover:bg-zinc-600 flex items-center justify-center space-x-2"
            >
              <CreditCardIcon className="h-5 w-5" />
              <span>PayMe</span>
            </button>
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
              {translations.shop.cart.tapToPay}
            </p>
          </div>

          <div className="hidden md:flex md:flex-col md:items-center md:space-y-2">
            <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
              {translations.shop.cart.scanToPay}
            </p>
            <div className="relative w-28 h-28 bg-white dark:bg-zinc-100 rounded-lg p-2 shadow-md">
              <Image
                src="/qr-code.png"
                alt="Payment QR Code"
                width={112}
                height={112}
                className="transition-all duration-200"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}