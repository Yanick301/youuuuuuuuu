
export type Review = {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: any; // Can be a Timestamp from Firebase or a JS Date object
};

export type Product = {
  id: string;
  name: string;
  name_fr: string;
  name_en: string;
  slug: string;
  price: number;
  oldPrice?: number;
  description: string;
  description_fr: string;
  description_en: string;
  category: string;
  images: string[];
  sizes?: string[];
  colors?: string[];
};

export type Category = {
  id:string;
  name: string;
  name_fr: string;
  name_en: string;
  slug: string;
  imageId: string;
};

export type CartItem = {
  id: string; // A unique ID for the cart item, e.g., product.id-size-color
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
};

// Represents an item as it is stored within a saved order
export type OrderItem = {
  id: string; // CartItem id
  productId: string;
  name: string;
  name_fr: string;
  name_en: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
  image: string;
};

    
