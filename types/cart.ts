export interface CartItem {
  id: string;
  cart_id: string;
  product_id: string;
  product_name: string;
  user_id: string | null;
  quantity: number;
  price: number;
  charity_amount: number;
  added_at: string;
  name?: string;
  kcal: number;
  protein: number;
  fats: number;
  carbs: number;
  product?: {
    id: string;
    product_name: string;
    calories: number;
    protein: number;
    fats: number;
    carbs: number;
  };
}

export interface AddToCartData {
  cart_id: string;
  product_id: string;
  product_name: string;
  user_id?: string | null;
  quantity: number;
  price: number;
  charity_amount: number;
}

export interface CartSession {
  id: string;
  user_id: string | null;
  is_guest: boolean;
  created_at: string;
  updated_at: string;
}