import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavItem {
	id: string;
	name: string;
	price: number;
	image: string;
	category: string;
}

interface FavoritesState {
	items: FavItem[];
}

const initialState: FavoritesState = {
	items: [],
};

export const favoritesSlice = createSlice({
	name: 'favorites',
	initialState,
	reducers: {
		toggleFavorite: (state, action: PayloadAction<FavItem>) => {
			const existingIndex = state.items.findIndex(
				(item) => item.id === action.payload.id
			);

			if (existingIndex > -1) {
				// Remove if exists
				state.items.splice(existingIndex, 1);
			} else {
				// Add if not exists
				state.items.push(action.payload);
			}
		},
		removeFavorite: (state, action: PayloadAction<string>) => {
			state.items = state.items.filter((item) => item.id !== action.payload);
		},
		clearFavorites: (state) => {
			state.items = [];
		},
	},
});

export const { toggleFavorite, removeFavorite, clearFavorites } =
	favoritesSlice.actions;

export default favoritesSlice.reducer;

// Selector to check if a product is favorited
export const selectIsFavorited = (state: any, productId: string) => {
	return state.favorites.items.some((item: FavItem) => item.id === productId);
};

export const selectFavoritedCount = (state: any) => {
	return state.favorites.items.length;
};
