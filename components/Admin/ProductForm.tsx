import React, { useState } from 'react';
import { useStore } from '@/store/useStore';
import { Product } from '@/types/product';
import toast from 'react-hot-toast';

interface ProductFormProps {
  editingProduct: Product | null;
  onComplete: () => void;
}

const FALLBACK_IMAGE_URL = 'https://github.com/brambleappmatus/images/blob/main/placeholder.png?raw=true';

export default function ProductForm({ editingProduct, onComplete }: ProductFormProps) {
  const { addProduct, editProduct, translations } = useStore();
  const [formData, setFormData] = useState({
    name: editingProduct?.name || '',
    price: editingProduct?.price.toString() || '',
    description: editingProduct?.description || '',
    imageUrl: editingProduct?.imageUrl || '',
    kcal: editingProduct?.kcal.toString() || '20',
    protein: editingProduct?.protein.toString() || '20',
    fats: editingProduct?.fats.toString() || '20',
    carbs: editingProduct?.carbs.toString() || '20'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      id: editingProduct?.id || Date.now().toString(),
      name: formData.name,
      price: parseFloat(formData.price),
      description: formData.description,
      imageUrl: formData.imageUrl.trim() || FALLBACK_IMAGE_URL,
      kcal: parseInt(formData.kcal),
      protein: parseInt(formData.protein),
      fats: parseInt(formData.fats),
      carbs: parseInt(formData.carbs)
    };

    try {
      if (editingProduct) {
        await editProduct(productData);
      } else {
        await addProduct(productData);
        toast.success(translations.admin.form.successAdd);
      }
      onComplete();
    } catch (error) {
      // Error is already handled in the store
      console.error('Form submission error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-zinc-200">
          {translations.admin.form.name}
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full p-2 border border-gray-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-100"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-zinc-200">
          {translations.admin.form.price}
        </label>
        <input
          type="number"
          step="0.01"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          className="w-full p-2 border border-gray-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-100"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-zinc-200">
          {translations.admin.form.description}
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full p-2 border border-gray-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-100"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-zinc-200">
          {translations.admin.form.imageUrl}
        </label>
        <input
          type="url"
          value={formData.imageUrl}
          onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
          placeholder="Optional – uses default image if left blank"
          className="w-full p-2 border border-gray-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-100 placeholder:text-gray-400 dark:placeholder:text-zinc-500 placeholder:font-light"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-zinc-200">
            {translations.admin.form.calories}
          </label>
          <input
            type="number"
            value={formData.kcal}
            onChange={(e) => setFormData({ ...formData, kcal: e.target.value })}
            className="w-full p-2 border border-gray-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-zinc-200">
            {translations.admin.form.protein}
          </label>
          <input
            type="number"
            value={formData.protein}
            onChange={(e) => setFormData({ ...formData, protein: e.target.value })}
            className="w-full p-2 border border-gray-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-zinc-200">
            {translations.admin.form.fats}
          </label>
          <input
            type="number"
            value={formData.fats}
            onChange={(e) => setFormData({ ...formData, fats: e.target.value })}
            className="w-full p-2 border border-gray-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-zinc-200">
            {translations.admin.form.carbs}
          </label>
          <input
            type="number"
            value={formData.carbs}
            onChange={(e) => setFormData({ ...formData, carbs: e.target.value })}
            className="w-full p-2 border border-gray-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-100"
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full py-2 bg-zinc-800 dark:bg-zinc-700 text-white rounded-lg hover:bg-zinc-700 dark:hover:bg-zinc-600"
      >
        {editingProduct ? translations.admin.form.update : translations.admin.form.submit}
      </button>
    </form>
  );
}