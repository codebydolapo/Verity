// src/store/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the type for a cart item
export interface CartItem {
  asin: string;
  product_title: string;
  product_photo: string;
  product_price: string; // Keep as string for now, convert to number when needed
  quantity: number;
}

// Define the type for the cart state
interface CartState {
  items: CartItem[];
}

// Define the initial state for the cart
const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.asin === newItem.asin);

      if (existingItem) {
        // If item already exists, update its quantity
        existingItem.quantity += newItem.quantity;
      } else {
        // Otherwise, add the new item to the cart
        state.items.push(newItem);
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      // Filter out the item with the matching ASIN
      state.items = state.items.filter(item => item.asin !== action.payload);
    },
    updateQuantity: (state, action: PayloadAction<{ asin: string; quantity: number }>) => {
      const { asin, quantity } = action.payload;
      const existingItem = state.items.find(item => item.asin === asin);

      if (existingItem) {
        existingItem.quantity = Math.max(1, quantity); // Ensure quantity doesn't go below 1
        if (existingItem.quantity === 0) {
            // Optionally remove if quantity becomes 0
            state.items = state.items.filter(item => item.asin !== asin);
        }
      }
    },
    clearCart: (state) => {
      state.items = []; // Clears all items from the cart
    },
  },
});

// Export the actions
export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

// Export the reducer
export default cartSlice.reducer;