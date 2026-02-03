import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import cartReducer from './slices/cartSlice';
import categoryReducer from './slices/categorySlice';

export const store = configureStore({
    reducer: {
        products: productReducer,
        cart: cartReducer,
        categories: categoryReducer,
    },
});

export default store;
