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
        };
      };
    };
  };
}