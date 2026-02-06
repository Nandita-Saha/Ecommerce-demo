import { createSlice } from '@reduxjs/toolkit';

// Load cart from localStorage
const loadCartFromStorage = () => {
    try {
        const serializedCart = localStorage.getItem('cart');
        if (serializedCart === null) {
            return { items: [], totalQuantity: 0, totalAmount: 0, discount: 0 };
        }
        return JSON.parse(serializedCart);
    } catch (err) {
        return { items: [], totalQuantity: 0, totalAmount: 0, discount: 0 };
    }
};

// Save cart to localStorage
const saveCartToStorage = (cart) => {
    try {
        const serializedCart = JSON.stringify(cart);
        localStorage.setItem('cart', serializedCart);
    } catch (err) {
        console.error('Could not save cart to localStorage', err);
    }
};

const initialState = loadCartFromStorage();

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { product, selectedColor, selectedSize, quantity } = action.payload;

            // Check if item already exists with same color and size
            const existingItemIndex = state.items.findIndex(
                item =>
                    item.id === product.id &&
                    item.selectedColor === selectedColor &&
                    item.selectedSize === selectedSize
            );

            if (existingItemIndex >= 0) {
                // Update quantity if item exists
                state.items[existingItemIndex].quantity += quantity;
            } else {
                // Add new item
                state.items.push({
                    id: product.id,
                    name: product.name,
                    slug: product.slug,
                    price: product.discountPrice,
                    originalPrice: product.price,
                    image: product.images[0],
                    selectedColor,
                    selectedSize,
                    quantity,
                    stock: product.stock,
                });
            }

            // Recalculate totals
            cartSlice.caseReducers.calculateTotals(state);
            saveCartToStorage(state);
        },

        removeFromCart: (state, action) => {
            const { id, selectedColor, selectedSize } = action.payload;
            state.items = state.items.filter(
                item => !(item.id === id && item.selectedColor === selectedColor && item.selectedSize === selectedSize)
            );
            cartSlice.caseReducers.calculateTotals(state);
            saveCartToStorage(state);
        },

        updateQuantity: (state, action) => {
            const { id, selectedColor, selectedSize, quantity } = action.payload;
            const item = state.items.find(
                item => item.id === id && item.selectedColor === selectedColor && item.selectedSize === selectedSize
            );

            if (item && quantity > 0 && quantity <= item.stock) {
                item.quantity = quantity;
                cartSlice.caseReducers.calculateTotals(state);
                saveCartToStorage(state);
            }
        },

        clearCart: (state) => {
            state.items = [];
            state.totalQuantity = 0;
            state.totalAmount = 0;
            state.discount = 0;
            saveCartToStorage(state);
        },

        applyCoupon: (state, action) => {
            const couponCode = action.payload.toUpperCase();

            // Coupon logic: WOMEN10 gives 10% discount
            if (couponCode === 'WOMEN10') {
                const subtotal = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
                state.discount = subtotal * 0.1;
                state.totalAmount = subtotal - state.discount;
            } else {
                state.discount = 0;
                cartSlice.caseReducers.calculateTotals(state);
            }
            saveCartToStorage(state);
        },

        removeCoupon: (state) => {
            state.discount = 0;
            cartSlice.caseReducers.calculateTotals(state);
            saveCartToStorage(state);
        },

        calculateTotals: (state) => {
            let totalQuantity = 0;
            let totalAmount = 0;

            state.items.forEach(item => {
                totalQuantity += item.quantity;
                totalAmount += item.price * item.quantity;
            });

            state.totalQuantity = totalQuantity;
            state.totalAmount = totalAmount - state.discount;
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    applyCoupon,
    removeCoupon,
    calculateTotals
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotalQuantity = (state) => state.cart.totalQuantity;
export const selectCartTotalAmount = (state) => state.cart.totalAmount;
export const selectCartDiscount = (state) => state.cart.discount;

export default cartSlice.reducer;
