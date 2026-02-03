import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import cartReducer from './slices/cartSlice';
import categoryReducer from './slices/categorySlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
    reducer: {
        products: productReducer,
        cart: cartReducer,
        categories: categoryReducer,
        ui: uiReducer,
    },
});

export default store;
