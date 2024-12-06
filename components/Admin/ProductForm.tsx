import React, { useState } from 'react';
import { useStore } from '@/store/useStore';
import { Product } from '@/types/product';
import { uploadImage, deleteImage } from '@/lib/storage';
import toast from 'react-hot-toast';
import ImageUpload from '@/components/UI/ImageUpload';

interface ProductFormProps {
  editingProduct: Product | null;
  onComplete: () => void;
}

export default function ProductForm({ editingProduct, onComplete }: ProductFormProps) {
  const { addProduct, editProduct, updateLocalProduct, translations } = useStore();
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: editingProduct?.name || '',
    price: editingProduct?.price.toString() || '',
    description: editingProduct?.description || '',
    imageUrl: editingProduct?.imageUrl || '',
    imagePath: editingProduct?.imagePath || null,
    kcal: editingProduct?.kcal.toString() || '20',
    protein: editingProduct?.protein.toString() || '20',
    fats: editingProduct?.fats.toString() || '20',
    carbs: editingProduct?.carbs.toString() || '20'
  });

  const handleImageUpload = async (file: File) => {
    try {
      setIsUploading(true);
      
      if (formData.imagePath) {
        await deleteImage(formData.imagePath);
      }

      const { url, path } = await uploadImage(file);
      
      const updatedFormData = {
        ...formData,
        imageUrl: url,
        imagePath: path
      };
      
      setFormData(updatedFormData);

      if (editingProduct) {
        const updatedProduct = {
          ...editingProduct,
          imageUrl: url,
          imagePath: path
        };
        updateLocalProduct(updatedProduct);
      }

      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageRemove = async () => {
    try {
      setIsUploading(true);
      if (formData.imagePath) {
        await deleteImage(formData.imagePath);
      }
      
      const updatedFormData = {
        ...formData,
        imageUrl: '',
        imagePath: null
      };
      
      setFormData(updatedFormData);

      if (editingProduct) {
        const updatedProduct = {
          ...editingProduct,
          imageUrl: '',
          imagePath: null
        };
        updateLocalProduct(updatedProduct);
      }

      toast.success('Image removed successfully');
    } catch (error) {
      console.error('Error removing image:', error);
      toast.error('Failed to remove image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isUploading) {
      toast.error('Please wait for the image to finish uploading');
      return;
    }

    const price = parseFloat(formData.price);
    const productData: Product = {
      id: editingProduct?.id || Date.now().toString(),
      name: formData.name,
      price,
      description: formData.description,
      imageUrl: formData.imageUrl,
      imagePath: formData.imagePath,
      kcal: parseInt(formData.kcal),
      protein: parseInt(formData.protein),
      fats: parseInt(formData.fats),
      carbs: parseInt(formData.carbs),
      hidden: editingProduct?.hidden || false,
      charityAmount: price * 0.1 // Calculate charity amount as 10% of price
    };

    try {
      if (editingProduct) {
        await editProduct(productData);
      } else {
        await addProduct(productData);
      }
      onComplete();
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-xs font-medium mb-1 text-gray-700 dark:text-zinc-200">
            {translations.admin.form.name}
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-1.5 border border-gray-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-100 text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-medium mb-1 text-gray-700 dark:text-zinc-200">
            {translations.admin.form.price}
          </label>
          <input
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="w-full p-1.5 border border-gray-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-100 text-sm"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium mb-1 text-gray-700 dark:text-zinc-200">
          {translations.admin.form.imageUrl}
        </label>
        <ImageUpload
          onImageUpload={handleImageUpload}
          onImageRemove={handleImageRemove}
          imageUrl={formData.imageUrl}
          isUploading={isUploading}
        />
      </div>

      <div>
        <label className="block text-xs font-medium mb-1 text-gray-700 dark:text-zinc-200">
          {translations.admin.form.description}
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full p-1.5 border border-gray-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-100 text-sm resize-none h-16"
          required
        />
      </div>

      <div>
        <label className="block text-xs font-medium mb-1 text-gray-700 dark:text-zinc-200">
          Nutritional Information
        </label>
        <div className="grid grid-cols-4 gap-1.5">
          <div>
            <input
              type="number"
              value={formData.kcal}
              onChange={(e) => setFormData({ ...formData, kcal: e.target.value })}
              className="w-full p-1 border border-gray-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-100 text-sm"
              placeholder="kcal"
            />
            <span className="text-[10px] text-gray-500 dark:text-zinc-400 mt-0.5 block text-center">kcal</span>
          </div>
          <div>
            <input
              type="number"
              value={formData.protein}
              onChange={(e) => setFormData({ ...formData, protein: e.target.value })}
              className="w-full p-1 border border-gray-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-100 text-sm"
              placeholder="protein"
            />
            <span className="text-[10px] text-gray-500 dark:text-zinc-400 mt-0.5 block text-center">protein</span>
          </div>
          <div>
            <input
              type="number"
              value={formData.fats}
              onChange={(e) => setFormData({ ...formData, fats: e.target.value })}
              className="w-full p-1 border border-gray-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-100 text-sm"
              placeholder="fats"
            />
            <span className="text-[10px] text-gray-500 dark:text-zinc-400 mt-0.5 block text-center">fats</span>
          </div>
          <div>
            <input
              type="number"
              value={formData.carbs}
              onChange={(e) => setFormData({ ...formData, carbs: e.target.value })}
              className="w-full p-1 border border-gray-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-100 text-sm"
              placeholder="carbs"
            />
            <span className="text-[10px] text-gray-500 dark:text-zinc-400 mt-0.5 block text-center">carbs</span>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isUploading}
        className="w-full py-2 bg-zinc-800 dark:bg-zinc-700 text-white rounded-lg hover:bg-zinc-700 dark:hover:bg-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
      >
        {editingProduct ? translations.admin.form.update : translations.admin.form.submit}
      </button>
    </form>
  );
}