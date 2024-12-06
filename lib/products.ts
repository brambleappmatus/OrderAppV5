import { supabase } from './supabase';
import { Product } from '@/types/product';
import { getImageUrl } from './storage';

export async function fetchProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) throw error;
    if (!data) return [];

    return data.map(item => ({
      id: item.id,
      name: item.product_name,
      price: item.price,
      description: item.description,
      imageUrl: getImageUrl(item.image_path),
      imagePath: item.image_path,
      kcal: item.calories,
      protein: item.protein,
      fats: item.fats,
      carbs: item.carbs,
      hidden: item.hidden || false,
      charityAmount: item.charity_amount || 0
    }));
  } catch (error) {
    console.error('Error in fetchProducts:', error);
    throw error;
  }
}

export async function createProduct(product: Omit<Product, 'id' | 'imageUrl'>): Promise<Product> {
  try {
    // Get the maximum display_order
    const { data: maxOrderData } = await supabase
      .from('products')
      .select('display_order')
      .order('display_order', { ascending: false })
      .limit(1);

    const nextOrder = maxOrderData && maxOrderData.length > 0 
      ? (maxOrderData[0].display_order || 0) + 1 
      : 1;

    const charityAmount = product.price * 0.1;

    // Insert the new product
    const { data, error } = await supabase
      .from('products')
      .insert([{
        product_name: product.name,
        price: product.price,
        description: product.description,
        image_path: product.imagePath,
        calories: product.kcal,
        protein: product.protein,
        fats: product.fats,
        carbs: product.carbs,
        display_order: nextOrder,
        hidden: false,
        charity_amount: charityAmount
      }])
      .select()
      .single();

    if (error) throw error;
    if (!data) throw new Error('No data returned from create operation');

    return {
      id: data.id,
      name: data.product_name,
      price: data.price,
      description: data.description,
      imageUrl: getImageUrl(data.image_path),
      imagePath: data.image_path,
      kcal: data.calories,
      protein: data.protein,
      fats: data.fats,
      carbs: data.carbs,
      hidden: data.hidden || false,
      charityAmount: data.charity_amount || 0
    };
  } catch (error) {
    console.error('Error in createProduct:', error);
    throw error;
  }
}

export async function updateProduct(product: Product): Promise<void> {
  try {
    const charityAmount = product.price * 0.1;

    const { error } = await supabase
      .from('products')
      .update({
        product_name: product.name,
        price: product.price,
        description: product.description,
        image_path: product.imagePath,
        calories: product.kcal,
        protein: product.protein,
        fats: product.fats,
        carbs: product.carbs,
        hidden: product.hidden,
        charity_amount: charityAmount
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
  try {
    const updates = products.map((product, index) => ({
      id: product.id,
      product_name: product.name,
      price: product.price,
      description: product.description,
      image_path: product.imagePath,
      calories: product.kcal,
      protein: product.protein,
      fats: product.fats,
      carbs: product.carbs,
      display_order: index + 1,
      hidden: product.hidden || false,
      charity_amount: product.charityAmount
    }));

    const { error } = await supabase
      .from('products')
      .upsert(updates, { onConflict: 'id' });

    if (error) throw error;
  } catch (error) {
    console.error('Error in reorderProducts:', error);
    throw error;
  }
}