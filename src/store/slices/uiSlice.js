import { createSlice } from '@reduxjs/toolkit';
import { addToCart } from './cartSlice';

const initialState = {
    cartNotification: {
        show: false,
        message: '',
        productName: '',
        productImage: ''
    }
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        showCartNotification: (state, action) => {
            state.cartNotification = {
                show: true,
                message: action.payload.message || 'Item added to cart!',
                productName: action.payload.productName,
                productImage: action.payload.productImage
            };
        },
        hideCartNotification: (state) => {
            state.cartNotification.show = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addToCart, (state, action) => { // Listening to cart action
            const { product, quantity } = action.payload;
            state.cartNotification = {
                show: true,
                message: `${quantity} item${quantity > 1 ? 's' : ''} added to cart`,
                productName: product.name,
                productImage: product.images[0]
            };
        });
    }
});

export const { showCartNotification, hideCartNotification } = uiSlice.actions;

export const selectCartNotification = (state) => state.ui.cartNotification;

export default uiSlice.reducer;
