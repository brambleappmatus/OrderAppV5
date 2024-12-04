import { StateCreator } from 'zustand';
import { Product } from '@/types/product';
import { createProduct, updateProduct, deleteProduct, fetchProducts } from '@/lib/products';
import { handleDatabaseError } from '@/utils/error-handling';
import toast from 'react-hot-toast';

export interface ProductState {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  editProduct: (product: Product) => Promise<void>;
  deleteProduct: (productId: string) => Promise<void>;
  duplicateProduct: (product: Product) => Promise<void>;
  reorderProducts: (products: Product[]) => void;
  toggleProductVisibility: (product: Product) => Promise<void>;
}

export const productReducer: StateCreator<ProductState, [], [], ProductState> = (set, get) => ({
  products: [],

  addProduct: async (product) => {
    try {
      const newProduct = await createProduct(product);
      set((state) => ({
        products: [...state.products, newProduct]
      }));
    } catch (error) {
      const errorMessage = handleDatabaseError(error);
      toast.error(errorMessage);
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
      const errorMessage = handleDatabaseError(error);
      toast.error(errorMessage);
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
      const errorMessage = handleDatabaseError(error);
      toast.error(errorMessage);
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
      const errorMessage = handleDatabaseError(error);
      toast.error(errorMessage);
      throw error;
    }
  },

  reorderProducts: (products) => {
    set({ products });
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
      const errorMessage = handleDatabaseError(error);
      toast.error(errorMessage);
      throw error;
    }
  },
});