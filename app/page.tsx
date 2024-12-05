'use client';

import React, { useState } from 'react';
import { useStore } from '@/store/useStore';
import ProductGrid from '@/components/Products/ProductGrid';
import ProductModal from '@/components/Products/ProductModal';
import ThemeToggle from '@/components/Layout/ThemeToggle';
import SearchBar from '@/components/Products/SearchBar';
import { Product } from '@/types/product';
import { useProducts } from '@/hooks/useProducts';

export default function Home() {
  const { translations } = useStore();
  const { products } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter out hidden products and apply search
  const visibleProducts = products
    .filter(product => !product.hidden)
    .filter(product => 
      searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <main className="p-2 sm:p-4 bg-white dark:bg-zinc-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <ThemeToggle />
        <h1 className="text-lg sm:text-xl font-bold mb-4 text-gray-800 dark:text-zinc-100 mt-8">
          {translations.shop.title}
        </h1>
        
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        
        <ProductGrid 
          products={visibleProducts}
          onProductClick={setSelectedProduct}
        />

        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </div>
    </main>
  );
}