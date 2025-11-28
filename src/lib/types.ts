
export type Review = {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: any; // Can be a Timestamp from Firebase
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

