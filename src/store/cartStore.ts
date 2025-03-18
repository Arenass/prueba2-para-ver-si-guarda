import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product } from '../types/product';

interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (sku: string) => void;
  updateQuantity: (sku: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product: Product) => {
        const { items } = get();
        const existingItem = items.find(item => item.product.sku === product.sku);
        
        if (existingItem) {
          set({
            items: items.map(item => 
              item.product.sku === product.sku 
                ? { ...item, quantity: item.quantity + 1 } 
                : item
            )
          });
        } else {
          set({ items: [...items, { product, quantity: 1 }] });
        }
      },
      
      removeItem: (sku: string) => {
        const { items } = get();
        set({ items: items.filter(item => item.product.sku !== sku) });
      },
      
      updateQuantity: (sku: string, quantity: number) => {
        const { items } = get();
        if (quantity <= 0) {
          set({ items: items.filter(item => item.product.sku !== sku) });
        } else {
          set({
            items: items.map(item => 
              item.product.sku === sku ? { ...item, quantity } : item
            )
          });
        }
      },
      
      clearCart: () => set({ items: [] }),
      
      getTotalItems: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.quantity, 0);
      },
      
      getTotalPrice: () => {
        const { items } = get();
        return items.reduce((total, item) => {
          const price = item.product.precio_venta || item.product.precio_tarifa || 0;
          return total + (price * item.quantity);
        }, 0);
      }
    }),
    {
      name: 'cart-storage'
    }
  )
);
