'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { useStore } from '@/store/useStore';
import { ShoppingCartIcon, Cog6ToothIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import CartSummary from '../Cart/CartSummary';
import { useNavigation } from './Navigation';

export default function SideMenu() {
  const pathname = usePathname();
  const isAdmin = pathname === '/admin';
  const { translations } = useStore();
  const { goToShop, goToAdmin } = useNavigation();

  return (
    <div className="fixed left-0 top-0 h-full w-40 bg-white dark:bg-zinc-800 shadow-lg transition-all duration-300 border-r border-gray-200 dark:border-zinc-700">
      <div className="p-2 flex flex-col h-full">
        <div className="flex-grow">
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
            onClick={isAdmin ? goToShop : goToAdmin}
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
  );
}