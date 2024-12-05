import { supabase } from './supabase';
import { Product } from '@/types/product';

export async function fetchProducts(): Promise<Product[]> {
  try {
    // First, ensure all products have a display_order
    const { data: productsWithoutOrder } = await supabase
      .from('products')
      .select('id')
      .eq('display_order', 0);

    if (productsWithoutOrder && productsWithoutOrder.length > 0) {
      // Update products without display_order
      const updates = productsWithoutOrder.map((product, index) => ({
        id: product.id,
        display_order: index + 1
      }));

      await supabase
        .from('products')
        .upsert(updates, { onConflict: 'id' });
    }

    // Now fetch all products with proper ordering
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('display_order', { ascending: true });

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
      hidden: item.hidden || false
    }));
  } catch (error) {
    console.error('Error in fetchProducts:', error);
    return [];
  }
}

export async function createProduct(product: Omit<Product, 'id'>): Promise<Product> {
  try {
    const { data: maxOrderData } = await supabase
      .from('products')
      .select('display_order')
      .order('display_order', { ascending: false })
      .limit(1);

    const nextOrder = maxOrderData && maxOrderData.length > 0 
      ? (maxOrderData[0].display_order || 0) + 1 
      : 1;

    const { data: maxIdData } = await supabase
      .from('products')
      .select('id')
      .order('id', { ascending: false })
      .limit(1);

    const nextId = maxIdData && maxIdData.length > 0 
      ? (parseInt(maxIdData[0].id) + 1).toString()
      : '1';

    const { data, error } = await supabase
      .from('products')
      .insert([{
        id: nextId,
        product_name: product.name,
        price: product.price,
        description: product.description,
        image_url: product.imageUrl,
        calories: product.kcal,
        protein: product.protein,
        fats: product.fats,
        carbs: product.carbs,
        display_order: nextOrder,
        hidden: false
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
      hidden: data.hidden || false
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
        carbs: product.carbs,
        hidden: product.hidden
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
    // Get the display_order of the product to be deleted
    const { data: productData } = await supabase
      .from('products')
      .select('display_order')
      .eq('id', id)
      .single();

    const { error: deleteError } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (deleteError) throw deleteError;

    // Update display_order for remaining products
    if (productData) {
      const { error: updateError } = await supabase
        .from('products')
        .update({ display_order: `display_order - 1` })
        .gte('display_order', productData.display_order);

      if (updateError) throw updateError;
    }
  } catch (error) {
    console.error('Error in deleteProduct:', error);
    throw error;
  }
}

export async function reorderProducts(products: Product[]): Promise<void> {
  try {
    // First, fetch all existing product data
    const { data: existingProducts, error: fetchError } = await supabase
      .from('products')
      .select('*');

    if (fetchError) throw fetchError;

    // Create a map of existing product data
    const productMap = existingProducts?.reduce((acc, product) => {
      acc[product.id] = product;
      return acc;
    }, {} as Record<string, any>) || {};

    // Prepare updates with all required fields
    const updates = products.map((product, index) => {
      const existingProduct = productMap[product.id];
      if (!existingProduct) {
        throw new Error(`Product with id ${product.id} not found`);
      }

      return {
        id: product.id,
        product_name: existingProduct.product_name,
        price: existingProduct.price,
        description: existingProduct.description,
        image_url: existingProduct.image_url,
        calories: existingProduct.calories,
        protein: existingProduct.protein,
        fats: existingProduct.fats,
        carbs: existingProduct.carbs,
        display_order: index + 1,
        hidden: existingProduct.hidden
      };
    });

    const { error } = await supabase
      .from('products')
      .upsert(updates, { onConflict: 'id' });

    if (error) throw error;
  } catch (error) {
    console.error('Error in reorderProducts:', error);
    throw error;
  }
}