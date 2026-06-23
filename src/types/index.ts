export interface Banner {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  ctaText: string;
}

export interface Category {
  id: number;
  name: string;
  icon: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  categoryId: number;
  rating: number;
  description?: string;
  brand?: string;
  stock?: number;
}

export interface CartItem {
  product: Product;
  qty: number;
}

export interface User {
  id: number;
  email: string;
  name: string;
}
