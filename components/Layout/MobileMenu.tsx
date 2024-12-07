'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { XMarkIcon, ShoppingCartIcon, Cog6ToothIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import CartSummary from '../Cart/CartSummary';
import { useStore } from '@/store/useStore';
import { useNavigation } from './Navigation';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isAdmin = pathname === '/admin';
  const { cart, translations } = useStore();
  const { goToShop, goToAdmin } = useNavigation();
  
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleNavigation = () => {
    if (isAdmin) {
      goToShop();
    } else {
      goToAdmin();
    }
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 p-2 rounded-lg bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors z-30"
        aria-label={translations.shop.cart.title}
      >
        <div className="relative">
          <ShoppingCartIcon className="h-6 w-6 text-gray-600 dark:text-zinc-300" />
          {itemCount > 0 && (
            <div className="absolute -top-2 -right-2 bg-zinc-800 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold rounded-full min-w-[1.25rem] h-5 flex items-center justify-center px-1">
              {itemCount}
            </div>
          )}
        </div>
      </button>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className={`fixed top-0 left-0 h-full w-40 bg-white dark:bg-zinc-800 shadow-lg transform transition-transform duration-300 ease-in-out z-50 border-r border-gray-200 dark:border-zinc-700 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-2 flex flex-col h-full">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2"
            aria-label={translations.shop.close}
          >
            <XMarkIcon className="h-5 w-5 text-gray-600 dark:text-zinc-300" />
          </button>

          <div className="mt-8 flex-grow">
            <div className="border-b border-gray-200 dark:border-zinc-700 pb-2 mb-2">
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                SnackShack
              </h1>
              <p className="text-[10px] text-gray-500 dark:text-gray-400">
                Treats with Purpose 🐾
              </p>
            </div>
            <CartSummary />
          </div>
          
          <div>
            <button 
              onClick={handleNavigation}
              className="w-full flex items-center gap-1 py-1 px-2 bg-gray-100 dark:bg-zinc-700/50 text-gray-700 dark:text-zinc-300 rounded text-xs hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
            >
              {isAdmin ? (
                <>
                  <ShoppingBagIcon className="h-3.5 w-3.5" />
                  <span>{translations.shop.backToShop}</span>
                </>
              ) : (
                <>
                  <Cog6ToothIcon className="h-3.5 w-3.5" />
                  <span>{translations.shop.adminPanel}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}