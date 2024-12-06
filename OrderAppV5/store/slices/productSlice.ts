import { StateCreator } from 'zustand';
import { Product } from '@/types/product';
import { createProduct, updateProduct, deleteProduct, fetchProducts, reorderProducts as reorderProductsInDb } from '@/lib/products';
import toast from 'react-hot-toast';

export interface ProductState {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  editProduct: (product: Product) => Promise<void>;
  deleteProduct: (productId: string) => Promise<void>;
  duplicateProduct: (product: Product) => Promise<void>;
  reorderProducts: (products: Product[]) => Promise<void>;
  toggleProductVisibility: (product: Product) => Promise<void>;
}

export const productReducer: StateCreator<ProductState, [], [], ProductState> = (set, get, api) => ({
  products: [],

  addProduct: async (product) => {
    try {
      const newProduct = await createProduct(product);
      set((state) => ({
        products: [...state.products, newProduct]
      }));
      toast.success('Product added successfully');
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Failed to add product');
      throw error;
    }
  },

  editProduct: async (product) => {
    try {
      await updateProduct(product);
      set((state) => ({
        products: state.products.map((p) =>
          p.id === product.id ? product : p
        )
      }));
      toast.success('Product updated successfully');
    } catch (error) {
      console.error('Error editing product:', error);
      toast.error('Failed to update product');
      throw error;
    }
  },

  deleteProduct: async (productId) => {
    try {
      await deleteProduct(productId);
      set((state) => ({
        products: state.products.filter((p) => p.id !== productId)
      }));
      toast.success('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
      throw error;
    }
  },

  duplicateProduct: async (product) => {
    const duplicatedProduct = {
      ...product,
      name: `${product.name} (Copy)`,
    };
    try {
      const newProduct = await createProduct(duplicatedProduct);
      set((state) => ({
        products: [...state.products, newProduct]
      }));
      toast.success('Product duplicated successfully');
    } catch (error) {
      console.error('Error duplicating product:', error);
      toast.error('Failed to duplicate product');
      throw error;
    }
  },

  reorderProducts: async (products) => {
    try {
      await reorderProductsInDb(products);
      set({ products });
      toast.success('Products reordered successfully');
    } catch (error) {
      console.error('Error reordering products:', error);
      toast.error('Failed to reorder products');
      throw error;
    }
  },

  toggleProductVisibility: async (product) => {
    const updatedProduct = {
      ...product,
      hidden: !product.hidden
    };
    try {
      await updateProduct(updatedProduct);
      set((state) => ({
        products: state.products.map((p) =>
          p.id === product.id ? updatedProduct : p
        )
      }));
      toast.success(updatedProduct.hidden ? 'Product hidden' : 'Product visible');
    } catch (error) {
      console.error('Error toggling product visibility:', error);
      toast.error('Failed to update product visibility');
      throw error;
    }
  },
});