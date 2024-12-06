export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  imagePath: string | null;
  kcal: number;
  protein: number;
  fats: number;
  carbs: number;
  hidden?: boolean;
  charityAmount: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ProductImage {
  url: string;
  path: string;
}