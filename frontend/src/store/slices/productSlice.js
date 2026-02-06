import { createSlice } from '@reduxjs/toolkit';
import productsData from '../../data/products.json';

const initialState = {
    items: productsData,
    featuredProducts: productsData.filter(product => product.featured),
    loading: false,
    error: null,
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.items = action.payload;
        },
        setFeaturedProducts: (state) => {
            state.featuredProducts = state.items.filter(product => product.featured);
        },
    },
});

export const { setProducts, setFeaturedProducts } = productSlice.actions;

// Selectors
export const selectAllProducts = (state) => state.products.items;
export const selectFeaturedProducts = (state) => state.products.featuredProducts;
export const selectProductBySlug = (slug) => (state) =>
    state.products.items.find(product => product.slug === slug);

export default productSlice.reducer;
