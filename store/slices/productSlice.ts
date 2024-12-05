import { StateCreator } from 'zustand';
import { Product } from '@/types/product';
import { createProduct, updateProduct, deleteProduct, fetchProducts, reorderProducts as reorderProductsInDb } from '@/lib/products';
import { deleteImage } from '@/lib/storage';
import toast from 'react-hot-toast';

export interface ProductState {
  products: Product[];
  isLoading: boolean;
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  editProduct: (product: Product) => Promise<void>;
  deleteProduct: (productId: string, imagePath: string | null) => Promise<void>;
  duplicateProduct: (product: Product) => Promise<void>;
  reorderProducts: (products: Product[]) => Promise<void>;
  toggleProductVisibility: (product: Product) => Promise<void>;
  refreshProducts: () => Promise<void>;
  updateLocalProduct: (product: Product) => void;
}

export const productReducer: StateCreator<ProductState, [], [], ProductState> = (set, get) => ({
  products: [],
  isLoading: false,

  refreshProducts: async () => {
    try {
      set({ isLoading: true });
      const products = await fetchProducts();
      set({ products, isLoading: false });
    } catch (error) {
      console.error('Error refreshing products:', error);
      set({ isLoading: false });
      toast.error('Failed to refresh products');
    }
  },

  updateLocalProduct: (product: Product) => {
    set(state => ({
      products: state.products.map(p => 
        p.id === product.id ? product : p
      )
    }));
  },

  addProduct: async (product) => {
    try {
      set({ isLoading: true });
      const newProduct = await createProduct(product);
      set(state => ({
        products: [...state.products, newProduct],
        isLoading: false
      }));
      toast.success('Product added successfully');
    } catch (error) {
      console.error('Error adding product:', error);
      set({ isLoading: false });
      toast.error('Failed to add product');
      throw error;
    }
  },

  editProduct: async (product) => {
    try {
      set({ isLoading: true });
      await updateProduct(product);
      set(state => ({
        products: state.products.map(p => 
          p.id === product.id ? product : p
        ),
        isLoading: false
      }));
      toast.success('Product updated successfully');
    } catch (error) {
      console.error('Error editing product:', error);
      set({ isLoading: false });
      toast.error('Failed to update product');
      throw error;
    }
  },

  deleteProduct: async (productId, imagePath) => {
    try {
      set({ isLoading: true });
      if (imagePath) {
        await deleteImage(imagePath);
      }
      await deleteProduct(productId);
      set(state => ({
        products: state.products.filter(p => p.id !== productId),
        isLoading: false
      }));
      toast.success('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
      set({ isLoading: false });
      toast.error('Failed to delete product');
      throw error;
    }
  },

  duplicateProduct: async (product) => {
    try {
      set({ isLoading: true });
      const duplicatedProduct = {
        ...product,
        name: `${product.name} (Copy)`,
        imagePath: null,
        imageUrl: ''
      };
      const newProduct = await createProduct(duplicatedProduct);
      set(state => ({
        products: [...state.products, newProduct],
        isLoading: false
      }));
      toast.success('Product duplicated successfully');
    } catch (error) {
      console.error('Error duplicating product:', error);
      set({ isLoading: false });
      toast.error('Failed to duplicate product');
      throw error;
    }
  },

  reorderProducts: async (products) => {
    try {
      set({ isLoading: true });
      await reorderProductsInDb(products);
      set({ products, isLoading: false });
      toast.success('Products reordered successfully');
    } catch (error) {
      console.error('Error reordering products:', error);
      set({ isLoading: false });
      toast.error('Failed to reorder products');
      throw error;
    }
  },

  toggleProductVisibility: async (product) => {
    try {
      set({ isLoading: true });
      const updatedProduct = {
        ...product,
        hidden: !product.hidden
      };
      await updateProduct(updatedProduct);
      set(state => ({
        products: state.products.map(p =>
          p.id === product.id ? updatedProduct : p
        ),
        isLoading: false
      }));
      toast.success(updatedProduct.hidden ? 'Product hidden' : 'Product visible');
    } catch (error) {
      console.error('Error toggling product visibility:', error);
      set({ isLoading: false });
      toast.error('Failed to update product visibility');
      throw error;
    }
  },
});