export type ProductCategory = 'tool' | 'snack';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: ProductCategory;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type DeliveryOption = 'pickup' | 'delivery';
export type OrderStatus = 'pending' | 'confirmed' | 'completed';

export interface Order {
  id: string;
  items: CartItem[];
  customerName: string;
  phoneNumber: string;
  deliveryOption: DeliveryOption;
  address?: string;
  status: OrderStatus;
  createdAt: Date;
}

export interface CheckoutFormData {
  customerName: string;
  phoneNumber: string;
  deliveryOption: string;
  address?: string;
}

export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
}