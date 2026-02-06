import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import cartReducer from './slices/cartSlice';
import categoryReducer from './slices/categorySlice';
import uiReducer from './slices/uiSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
    reducer: {
        products: productReducer,
        cart: cartReducer,
        categories: categoryReducer,
        ui: uiReducer,
        auth: authReducer,
    },
});

export default store;
