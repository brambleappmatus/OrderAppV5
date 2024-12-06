import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Product } from '@/types/product';
import Image from 'next/image';
import { PencilIcon, TrashIcon, DocumentDuplicateIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { STORAGE_CONFIG } from '@/lib/config';

interface ProductListProps {
  products: Product[];
  onReorder: (products: Product[]) => void;
  onEdit: (product: Product) => void;
  onDelete: (productId: string, imagePath: string | null) => void;
  onDuplicate: (product: Product) => void;
  onToggleVisibility: (product: Product) => void;
}

const { FALLBACK_IMAGE_URL } = STORAGE_CONFIG;

export default function ProductList({ 
  products, 
  onReorder,
  onEdit, 
  onDelete, 
  onDuplicate,
  onToggleVisibility
}: ProductListProps) {
  const [imageErrors, setImageErrors] = React.useState<Record<string, boolean>>({});

  const handleImageLoadError = (productId: string) => {
    setImageErrors(prev => ({ ...prev, [productId]: true }));
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(products);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    onReorder(items);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="products">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {products.map((product, index) => (
              <Draggable key={product.id} draggableId={product.id.toString()} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`bg-gray-50 dark:bg-zinc-800 rounded-lg shadow-md overflow-hidden cursor-move ${
                      product.hidden ? 'opacity-60' : ''
                    }`}
                  >
                    <div className="relative h-48 w-full">
                      {!product.imageUrl || imageErrors[product.id] ? (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-zinc-700">
                          <span className="text-gray-400 dark:text-zinc-500">Image not available</span>
                        </div>
                      ) : (
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          className="object-cover"
                          onError={() => handleImageLoadError(product.id)}
                          unoptimized
                        />
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 dark:text-zinc-100">{product.name}</h3>
                      <p className="text-gray-600 dark:text-zinc-300">€{product.price.toFixed(2)}</p>
                      <p className="text-gray-500 dark:text-zinc-400 text-sm mt-2">{product.description}</p>
                      <div className="mt-4 flex justify-end gap-2">
                        <button
                          onClick={() => onToggleVisibility(product)}
                          className="p-2 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-zinc-700 rounded-lg transition-colors"
                          title={product.hidden ? "Show product" : "Hide product"}
                        >
                          {product.hidden ? (
                            <EyeSlashIcon className="h-5 w-5" />
                          ) : (
                            <EyeIcon className="h-5 w-5" />
                          )}
                        </button>
                        <button
                          onClick={() => onDuplicate(product)}
                          className="p-2 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-zinc-700 rounded-lg transition-colors"
                        >
                          <DocumentDuplicateIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => onEdit(product)}
                          className="p-2 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-zinc-700 rounded-lg transition-colors"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => onDelete(product.id, product.imagePath)}
                          className="p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-zinc-700 rounded-lg transition-colors"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
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
  );
}