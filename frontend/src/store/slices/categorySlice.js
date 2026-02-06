import { createSlice } from '@reduxjs/toolkit';
import categoriesData from '../../data/categories.json';

const initialState = {
    items: categoriesData,
    loading: false,
    error: null,
};

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategories: (state, action) => {
            state.items = action.payload;
        },
    },
});

export const { setCategories } = categorySlice.actions;

// Selectors
export const selectAllCategories = (state) => state.categories.items;

export default categorySlice.reducer;
