export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          product_name: string;
          price: number;
          description: string;
          image_url: string;
          calories: number;
          protein: number;
          fats: number;
          carbs: number;
          created_at: string;
          display_order: number;
          hidden: boolean;
        };
        Insert: {
          id?: string;
          product_name: string;
          price: number;
          description: string;
          image_url: string;
          calories: number;
          protein: number;
          fats: number;
          carbs: number;
          created_at?: string;
          display_order?: number;
          hidden?: boolean;
        };
        Update: {
          id?: string;
          product_name?: string;
          price?: number;
          description?: string;
          image_url?: string;
          calories?: number;
          protein?: number;
          fats?: number;
          carbs?: number;
          created_at?: string;
          display_order?: number;
          hidden?: boolean;
        };
      };
    };
  };
}