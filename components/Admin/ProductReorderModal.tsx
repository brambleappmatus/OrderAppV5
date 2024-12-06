'use client';

import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { Product } from '@/types/product';
import { useStore } from '@/store/useStore';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

interface ProductReorderModalProps {
  onClose: () => void;
}

export default function ProductReorderModal({ onClose }: ProductReorderModalProps) {
  const { products, reorderProducts, translations } = useStore();
  const [orderedProducts, setOrderedProducts] = React.useState([...products]);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(orderedProducts);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setOrderedProducts(items);
  };

  const handleSave = () => {
    reorderProducts(orderedProducts);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-zinc-800 rounded-lg w-full max-w-2xl max-h-[80vh] flex flex-col shadow-xl">
        <div className="p-4 border-b border-gray-200 dark:border-zinc-700 flex justify-between items-center flex-shrink-0">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-zinc-100">
            {translations.admin.reorderProducts}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-lg transition-colors"
          >
            <XMarkIcon className="h-5 w-5 text-gray-500 dark:text-zinc-400" />
          </button>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="products" type="product">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="flex-grow overflow-y-auto"
              >
                {orderedProducts.map((product, index) => (
                  <Draggable key={product.id} draggableId={product.id.toString()} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`flex items-center gap-4 p-4 border-b border-gray-200 dark:border-zinc-700 ${
                          snapshot.isDragging
                            ? 'bg-gray-50 dark:bg-zinc-700/50'
                            : 'hover:bg-gray-50 dark:hover:bg-zinc-700/50'
                        } transition-colors`}
                      >
                        <div className="relative w-12 h-12 flex-shrink-0">
                          <Image
                            src={product.imageUrl}
                            alt={product.name}
                            fill
                            className="object-cover rounded"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'https://github.com/brambleappmatus/images/blob/main/placeholder.png?raw=true';
                            }}
                            unoptimized
                          />
                        </div>
                        
                        <div className="flex-grow min-w-0">
                          <h3 className="font-medium text-gray-800 dark:text-zinc-100 truncate">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-zinc-400">
                            €{product.price.toFixed(2)}
                          </p>
                        </div>

                        <div className="flex items-center text-gray-400 dark:text-zinc-500">
                          <span className="text-sm">{translations.admin.dragInfo}</span>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <div className="p-4 border-t border-gray-200 dark:border-zinc-700 flex justify-end gap-3 flex-shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-lg transition-colors"
          >
            {translations.shop.close}
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-zinc-800 dark:bg-zinc-700 text-white rounded-lg hover:bg-zinc-700 dark:hover:bg-zinc-600 transition-colors"
          >
            {translations.admin.saveOrder}
          </button>
        </div>
      </div>
    </div>
  );
}