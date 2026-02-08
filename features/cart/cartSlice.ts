import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';

export interface CartItem {
	id: string;
	name: string;
	price: number;
	image: string;
	quantity: number;
	color?: string;
}

interface CartState {
	items: CartItem[];
}

const initialState: CartState = {
	items: [],
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
			const existingItem = state.items.find((item) => item.id === action.payload.id);
			if (existingItem) {
				existingItem.quantity += 1;
			} else {
				state.items.push({
					...action.payload,
					quantity: 1,
				});
			}
		},
		increaseQuantity: (state, action: PayloadAction<string>) => {
			const item = state.items.find((item) => item.id === action.payload);
			if (item) {
				item.quantity += 1;
			}
		},
		decreaseQuantity: (state, action: PayloadAction<string>) => {
			const item = state.items.find((item) => item.id === action.payload);
			if (item && item.quantity > 1) {
				item.quantity -= 1;
			}
		},
		removeFromCart: (state, action: PayloadAction<string>) => {
			state.items = state.items.filter((item) => item.id !== action.payload);
		},
		clearCart: (state) => {
			state.items = [];
		},
	},
});

export const { addToCart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

// Memoized selectors to prevent unnecessary rerenders
const selectCartState = (state: any) => state.cart;
const selectCartItems = (state: any) => state.cart.items;

export const selectCartCount = createSelector(
  [selectCartItems],
  (items: CartItem[]) => items.reduce((total, item) => total + item.quantity, 0)
);

export const selectCartTotal = createSelector(
  [selectCartItems],
  (items: CartItem[]) => {
    const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
    const tax = subtotal * 0.08;
    return {
      subtotal: Math.round(subtotal * 100) / 100,
      tax: Math.round(tax * 100) / 100,
      total: Math.round((subtotal + tax) * 100) / 100,
    };
  }
);
