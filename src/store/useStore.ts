import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { CartItem, Order, Product } from '../types';
import { persist } from 'zustand/middleware';

// Sample data for tools and snacks
const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Professional Baking Mixer',
    price: 48500, // Price in Naira
    description: 'High-quality stand mixer perfect for all your baking needs. Includes multiple attachments.',
    image: 'https://images.unsplash.com/photo-1594046243098-0fceea9d451e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category: 'tool',
  },
  {
    id: '2',
    name: 'Silicone Baking Mat Set',
    price: 7200, // Price in Naira
    description: 'Non-stick silicone mats for perfect cookies and pastries every time.',
    image: 'https://images.unsplash.com/photo-1591261730799-ee4e6c5262b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category: 'tool',
  },
  {
    id: '3',
    name: 'Chocolate Chip Cookies',
    price: 2500, // Price in Naira
    description: 'Fresh-baked cookies with premium chocolate chips. Pack of 12.',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category: 'snack',
  },
  {
    id: '4',
    name: 'Baking Measurement Set',
    price: 3800, // Price in Naira
    description: 'Precise measuring cups and spoons for accurate baking.',
    image: 'https://images.unsplash.com/photo-1616445207542-a07f98429f62?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category: 'tool',
  },
  {
    id: '5',
    name: 'Artisan Bread',
    price: 3000, // Price in Naira
    description: 'Freshly baked artisan sourdough bread. Made with organic flour.',
    image: 'https://images.unsplash.com/photo-1586444248879-12445281372d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
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
            { ...product, id: uuidv4() },
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
              id: uuidv4(),
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