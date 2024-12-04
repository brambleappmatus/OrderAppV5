import { supabase } from './supabase';
import { Product } from '@/types/product';

export async function fetchProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching products:', error);
      return [];
    }

    if (!data) return [];

    return data.map(item => ({
      id: item.id.toString(),
      name: item.product_name,
      price: item.price,
      description: item.description,
      imageUrl: item.image_url,
      kcal: item.calories,
      protein: item.protein,
      fats: item.fats,
      carbs: item.carbs,
      hidden: false
    }));
  } catch (error) {
    console.error('Error in fetchProducts:', error);
    return [];
  }
}

export async function createProduct(product: Omit<Product, 'id'>): Promise<Product> {
  try {
    const { data: maxIdData } = await supabase
      .from('products')
      .select('id')
      .order('id', { ascending: false })
      .limit(1);

    const nextId = maxIdData && maxIdData.length > 0 ? parseInt(maxIdData[0].id) + 1 : 1;

    const { data, error } = await supabase
      .from('products')
      .insert([{
        id: nextId.toString(),
        product_name: product.name,
        price: product.price,
        description: product.description,
        image_url: product.imageUrl,
        calories: product.kcal,
        protein: product.protein,
        fats: product.fats,
        carbs: product.carbs
      }])
      .select()
      .single();

    if (error) throw error;
    if (!data) throw new Error('No data returned from create operation');

    return {
      id: data.id.toString(),
      name: data.product_name,
      price: data.price,
      description: data.description,
      imageUrl: data.image_url,
      kcal: data.calories,
      protein: data.protein,
      fats: data.fats,
      carbs: data.carbs,
      hidden: false
    };
  } catch (error) {
    console.error('Error in createProduct:', error);
    throw error;
  }
}

export async function updateProduct(product: Product): Promise<void> {
  try {
    const { error } = await supabase
      .from('products')
      .update({
        product_name: product.name,
        price: product.price,
        description: product.description,
        image_url: product.imageUrl,
        calories: product.kcal,
        protein: product.protein,
        fats: product.fats,
        carbs: product.carbs
      })
      .eq('id', product.id);

    if (error) throw error;
  } catch (error) {
    console.error('Error in updateProduct:', error);
    throw error;
  }
}

export async function deleteProduct(id: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error('Error in deleteProduct:', error);
    throw error;
  }
}

export async function reorderProducts(products: Product[]): Promise<void> {
  // Implementation for reordering would go here
  console.log('Reordering products:', products);
}