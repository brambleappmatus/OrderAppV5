export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          product_name: string;
          price: number;
          description: string;
          image_path: string | null;
          calories: number;
          protein: number;
          fats: number;
          carbs: number;
          created_at: string;
          display_order: number;
          hidden: boolean;
          charity_amount: number;
        };
        Insert: {
          id?: string;
          product_name: string;
          price: number;
          description: string;
          image_path?: string | null;
          calories: number;
          protein: number;
          fats: number;
          carbs: number;
          created_at?: string;
          display_order?: number;
          hidden?: boolean;
          charity_amount?: number;
        };
        Update: {
          id?: string;
          product_name?: string;
          price?: number;
          description?: string;
          image_path?: string | null;
          calories?: number;
          protein?: number;
          fats?: number;
          carbs?: number;
          created_at?: string;
          display_order?: number;
          hidden?: boolean;
          charity_amount?: number;
        };
      };
      cart: {
        Row: {
          id: string;
          cart_id: string;
          product_id: string;
          product_name: string;
          user_id: string | null;
          quantity: number;
          price: number;
          charity_amount: number;
          added_at: string;
        };
        Insert: {
          id?: string;
          cart_id: string;
          product_id: string;
          product_name: string;
          user_id?: string | null;
          quantity?: number;
          price: number;
          charity_amount: number;
          added_at?: string;
        };
        Update: {
          id?: string;
          cart_id?: string;
          product_id?: string;
          product_name?: string;
          user_id?: string | null;
          quantity?: number;
          price?: number;
          charity_amount?: number;
          added_at?: string;
        };
      };
      carts: {
        Row: {
          id: string;
          user_id: string | null;
          is_guest: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          is_guest?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          is_guest?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}