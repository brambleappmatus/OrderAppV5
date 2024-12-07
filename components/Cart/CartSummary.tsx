import React from 'react';
import { useStore } from '@/store/useStore';
import Image from 'next/image';
import { HeartIcon, TrashIcon, CreditCardIcon } from '@heroicons/react/24/outline';

export default function CartSummary() {
  const { cart, removeFromCart, updateCartItemQuantity, translations } = useStore();

  const total = cart.reduce((sum, item) => sum + (item.price || 0), 0);
  const shelterDonation = cart.reduce((sum, item) => sum + (item.charity_amount || 0), 0);

  const totalMacros = cart.reduce((acc, item) => ({
    kcal: acc.kcal + ((item.kcal || 0) * (item.quantity || 0)),
    protein: acc.protein + ((item.protein || 0) * (item.quantity || 0)),
    fats: acc.fats + ((item.fats || 0) * (item.quantity || 0)),
    carbs: acc.carbs + ((item.carbs || 0) * (item.quantity || 0))
  }), { kcal: 0, protein: 0, fats: 0, carbs: 0 });

  const handlePaymentClick = () => {
    window.open('https://revolut.me/attymatty', '_blank');
  };

  const handleQuantityChange = async (cartItemId: string, newQuantity: number) => {
    if (newQuantity > 0) {
      await updateCartItemQuantity(cartItemId, newQuantity);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Cart Items Section */}
      <div className="relative flex-grow min-h-0 mb-1" style={{ height: 'calc(100vh - 28rem)' }}>
        <div className="absolute inset-0 overflow-y-auto">
          <div className="space-y-1">
            {cart.map((item) => (
              <div key={item.id} className="flex flex-col bg-gray-50 dark:bg-zinc-800/50 p-1 rounded-lg">
                <div className="flex justify-between items-start">
                  <p className="font-medium text-gray-800 dark:text-white text-[11px] truncate max-w-[100px] leading-tight">
                    {item.name}
                  </p>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity || 1}
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value, 10) || 1)}
                      className="w-6 p-0.5 text-[10px] border rounded dark:bg-zinc-700 dark:border-zinc-600 dark:text-white text-center"
                    />
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-0.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded transition-colors"
                      aria-label="Remove item"
                    >
                      <TrashIcon className="h-3 w-3" />
                    </button>
                  </div>
                </div>
                <p className="text-[10px] text-gray-500 dark:text-gray-400">€{(item.price || 0).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Fade overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white dark:from-zinc-800 to-transparent pointer-events-none"></div>
      </div>

      {/* Bottom Section */}
      <div className="flex-shrink-0 pb-20">
        {/* Macros */}
        {cart.length > 0 && (
          <div className="text-[10px] text-gray-500 dark:text-gray-400 grid grid-cols-4 gap-1 mb-2">
            <div className="text-center">
              <span className="block font-medium">{totalMacros.kcal}</span>
              <span className="text-[8px]">{translations.shop.cart.macros.kcal}</span>
            </div>
            <div className="text-center">
              <span className="block font-medium">{totalMacros.protein}g</span>
              <span className="text-[8px]">{translations.shop.cart.macros.protein}</span>
            </div>
            <div className="text-center">
              <span className="block font-medium">{totalMacros.fats}g</span>
              <span className="text-[8px]">{translations.shop.cart.macros.fats}</span>
            </div>
            <div className="text-center">
              <span className="block font-medium">{totalMacros.carbs}g</span>
              <span className="text-[8px]">{translations.shop.cart.macros.carbs}</span>
            </div>
          </div>
        )}

        {/* Total and Donation */}
        <div className="border-t dark:border-zinc-700 pt-1.5 mb-2">
          <p className="font-semibold text-gray-800 dark:text-white text-xs mb-1.5">
            {translations.shop.cart.total}: €{total.toFixed(2)}
          </p>
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-950/30 dark:to-purple-950/30 p-1.5 rounded-lg border border-pink-100 dark:border-pink-900/30">
            <div className="flex items-center gap-1">
              <HeartIcon className="h-3 w-3 text-pink-500 dark:text-pink-400 animate-pulse" />
              <span className="font-medium text-gray-800 dark:text-white text-[10px]">
                {translations.shop.cart.shelterDonation.title}
              </span>
            </div>
            <p className="font-medium text-pink-600 dark:text-pink-400 text-[10px]">
              €{shelterDonation.toFixed(2)} {translations.shop.cart.shelterDonation.amount}
            </p>
          </div>
        </div>
        
        {/* Payment Section */}
        {cart.length > 0 && (
          <div className="flex flex-col items-center space-y-1">
            <div className="xs:hidden w-full">
              <button
                onClick={handlePaymentClick}
                className="w-full py-2 px-3 bg-zinc-800 dark:bg-zinc-700 text-white rounded text-xs hover:bg-zinc-700 dark:hover:bg-zinc-600 flex items-center justify-center space-x-1.5"
              >
                <CreditCardIcon className="h-4 w-4" />
                <span>PayMe</span>
              </button>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 text-center mt-1">
                {translations.shop.cart.tapToPay}
              </p>
            </div>

            <div className="hidden xs:flex xs:flex-col xs:items-center xs:space-y-1">
              <p className="text-[10px] text-gray-600 dark:text-gray-300 text-center">
                {translations.shop.cart.scanToPay}
              </p>
              <div className="relative w-16 h-16 bg-white dark:bg-zinc-100 rounded p-1 shadow-md">
                <Image
                  src="/qr-code.png"
                  alt="Payment QR Code"
                  width={64}
                  height={64}
                  className="transition-all duration-200"
                  priority
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}