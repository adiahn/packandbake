export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: 'tool' | 'snack';
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  customerName: string;
  phoneNumber: string;
  deliveryOption: 'pickup' | 'delivery';
  address?: string;
  status: 'pending' | 'confirmed' | 'completed';
  createdAt: Date;
}

export type DeliveryOption = 'pickup' | 'delivery';
export type OrderStatus = 'pending' | 'confirmed' | 'completed';

export interface CheckoutFormData {
  customerName: string;
  phoneNumber: string;
  deliveryOption: DeliveryOption;
  address?: string;
}