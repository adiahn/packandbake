import { create } from 'zustand';
import { CartItem, Order, Product } from '../types';
import { persist } from 'zustand/middleware';

// Sample data for tools and snacks
const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Professional Mixing Bowl Set',
    price: 39.99,
    description: 'Set of 3 stainless steel mixing bowls in different sizes',
    image: 'https://images.unsplash.com/photo-1584269360102-641c2ec5d442?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'tool',
  },
  {
    id: '2',
    name: 'Silicone Spatula Set',
    price: 12.99,
    description: 'Heat-resistant silicone spatulas for baking and cooking',
    image: 'https://images.unsplash.com/photo-1610701066741-5991888a72ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'tool',
  },
  {
    id: '3',
    name: 'Digital Kitchen Scale',
    price: 24.99,
    description: 'Precise digital scale for measuring ingredients',
    image: 'https://images.unsplash.com/photo-1591985666643-1ecc67616216?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'tool',
  },
  {
    id: '4',
    name: 'Chocolate Chip Cookies',
    price: 8.99,
    description: 'A dozen freshly baked chocolate chip cookies',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'snack',
  },
  {
    id: '5',
    name: 'Cinnamon Rolls',
    price: 14.99,
    description: 'Pack of 6 homemade cinnamon rolls with cream cheese frosting',
    image: 'https://images.unsplash.com/photo-1583491470871-3bc299407461?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'snack',
  },
];

interface StoreState {
  // Products State
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Omit<Product, 'id'>>) => void;
  deleteProduct: (id: string) => void;
  
  // Snacks Availability
  snacksAvailable: boolean;
  toggleSnacksAvailability: () => void;
  
  // Cart State
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  
  // Orders State
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'createdAt' | 'status'>) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      // Products
      products: initialProducts,
      addProduct: (product) =>
        set((state) => ({
          products: [
            ...state.products,
            { ...product, id: Math.random().toString(36).substring(2, 9) },
          ],
        })),
      updateProduct: (id, updates) =>
        set((state) => ({
          products: state.products.map((product) =>
            product.id === id ? { ...product, ...updates } : product
          ),
        })),
      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((product) => product.id !== id),
        })),

      // Snacks Availability
      snacksAvailable: true,
      toggleSnacksAvailability: () =>
        set((state) => ({ snacksAvailable: !state.snacksAvailable })),

      // Cart
      cart: [],
      addToCart: (product) =>
        set((state) => {
          const existingItem = state.cart.find(
            (item) => item.product.id === product.id
          );
          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          return { cart: [...state.cart, { product, quantity: 1 }] };
        }),
      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.product.id !== productId),
        })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        })),
      clearCart: () => set({ cart: [] }),

      // Orders
      orders: [],
      addOrder: (order) =>
        set((state) => ({
          orders: [
            ...state.orders,
            {
              ...order,
              id: Math.random().toString(36).substring(2, 9),
              status: 'pending',
              createdAt: new Date(),
            },
          ],
        })),
      updateOrderStatus: (orderId, status) =>
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === orderId ? { ...order, status } : order
          ),
        })),
    }),
    {
      name: 'sweet-tools-storage',
    }
  )
);