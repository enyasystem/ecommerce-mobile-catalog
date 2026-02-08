import { createSlice } from '@reduxjs/toolkit';

interface FiltersState {
  category: string | null;
  sortBy: string;
  searchQuery: string;
}

const initialState: FiltersState = {
  category: null,
  sortBy: 'default',
  searchQuery: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { setCategory, setSortBy, setSearchQuery } = filtersSlice.actions;
export default filtersSlice.reducer;
