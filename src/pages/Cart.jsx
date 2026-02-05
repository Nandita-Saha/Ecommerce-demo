import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    removeFromCart,
    updateQuantity,
    applyCoupon,
    removeCoupon,
    selectCartItems,
    selectCartTotalAmount,
    selectCartTotalQuantity,
    selectCartDiscount
} from '../store/slices/cartSlice';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const totalAmount = useSelector(selectCartTotalAmount);
    const totalQuantity = useSelector(selectCartTotalQuantity);
    const discount = useSelector(selectCartDiscount);

    const [couponCode, setCouponCode] = useState('');
    const [couponError, setCouponError] = useState('');

    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    const handleApplyCoupon = () => {
        if (!couponCode) return;

        if (couponCode.toUpperCase() === 'WOMEN10') {
            dispatch(applyCoupon(couponCode));
            setCouponError('');
        } else {
            setCouponError('Invalid coupon code');
        }
    };

    const handleRemoveCoupon = () => {
        dispatch(removeCoupon());
        setCouponCode('');
    };

    if (cartItems.length === 0) {
        return (
            <>
                <Navbar />
                <div className="min-h-[60vh] mt-20 flex flex-col items-center justify-center p-8 text-center">
                    <div className="text-6xl mb-6">🛒</div>
                    <h2 className="text-3xl font-playfair font-bold text-deep-maroon mb-4">Your cart is empty</h2>
                    <p className="text-xl text-[#666] mb-8">Looks like you haven't added anything yet.</p>
                    <Link
                        to="/"
                        className="bg-primary-pink text-white py-3 px-8 rounded-full font-semibold hover:shadow-lg transition-transform hover:-translate-y-1 block"
                    >
                        Start Shopping
                    </Link>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />

            <div className="max-w-[1400px] mx-auto px-8 py-12">
                <h1 className="font-playfair text-4xl font-black mb-8 text-deep-maroon">Shopping Cart ({totalQuantity} items)</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Cart Items */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-[20px] shadow-sm overflow-hidden">
                            <div className="hidden md:grid grid-cols-6 gap-4 p-6 bg-[#f9f9f9] text-deep-maroon font-bold uppercase text-sm tracking-wider">
                                <div className="col-span-3">Product</div>
                                <div className="text-center">Price</div>
                                <div className="text-center">Quantity</div>
                                <div className="text-right">Total</div>
                            </div>

                            {cartItems.map((item) => (
                                <div key={`${item.id}-${item.selectedColor}-${item.selectedSize}`} className="grid grid-cols-1 md:grid-cols-6 gap-6 p-6 border-b border-[#eee] items-center relative">
                                    <div className="md:col-span-3 flex gap-6">
                                        <Link to={`/product/${item.slug}`} className="w-[100px] h-[120px] rounded-[10px] overflow-hidden flex-shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </Link>
                                        <div>
                                            <div className="text-primary-orange text-xs font-bold uppercase mb-1">In Stock</div>
                                            <Link to={`/product/${item.slug}`} className="font-playfair text-xl font-bold text-deep-maroon hover:text-primary-pink transition-colors">
                                                {item.name}
                                            </Link>
                                            <div className="text-[#666] text-sm mt-2 flex flex-col gap-1">
                                                <div className="flex items-center gap-2">
                                                    Color:
                                                    <span
                                                        className="w-4 h-4 rounded-full border border-gray-200 inline-block"
                                                        style={{ backgroundColor: item.selectedColor }}
                                                    ></span>
                                                </div>
                                                <div>Size: {item.selectedSize}</div>
                                            </div>
                                            <button
                                                onClick={() => dispatch(removeFromCart(item))}
                                                className="text-red-500 text-sm font-semibold mt-3 hover:text-red-700 underline cursor-pointer bg-transparent border-none p-0"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>

                                    <div className="text-center font-bold text-lg md:text-base">
                                        <span className="md:hidden text-[#666] mr-2">Price:</span>
                                        ₹{item.price.toLocaleString()}
                                    </div>

                                    <div className="flex justify-center">
                                        <div className="flex items-center border border-[#e0e0e0] rounded-[8px] overflow-hidden">
                                            <button
                                                onClick={() => dispatch(updateQuantity({ ...item, quantity: Math.max(1, item.quantity - 1) }))}
                                                className="w-8 h-8 flex items-center justify-center bg-[#f5f5f5] hover:bg-gray-200 transition-colors"
                                            >-</button>
                                            <div className="w-10 text-center font-semibold text-sm">{item.quantity}</div>
                                            <button
                                                onClick={() => dispatch(updateQuantity({ ...item, quantity: Math.min(item.stock, item.quantity + 1) }))}
                                                className="w-8 h-8 flex items-center justify-center bg-[#f5f5f5] hover:bg-gray-200 transition-colors"
                                            >+</button>
                                        </div>
                                    </div>

                                    <div className="text-right font-bold text-xl text-deep-purple md:text-lg">
                                        <span className="md:hidden text-[#666] mr-2 text-base">Total:</span>
                                        ₹{(item.price * item.quantity).toLocaleString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Checkout Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-8 sticky top-32">
                            <h2 className="font-playfair text-2xl font-bold text-deep-maroon mb-6 pb-4 border-b border-[#eee]">Order Summary</h2>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-[#666]">
                                    <span>Subtotal</span>
                                    <span className="font-bold text-deep-maroon">₹{subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-[#666]">
                                    <span>Shipping</span>
                                    <span className="text-green-600 font-bold">Free</span>
                                </div>
                                {discount > 0 && (
                                    <div className="flex justify-between text-primary-pink">
                                        <span>Discount</span>
                                        <span className="font-bold">-₹{discount.toLocaleString()}</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-xl font-bold text-deep-maroon pt-4 border-t border-[#eee]">
                                    <span>Total</span>
                                    <span>₹{totalAmount.toLocaleString()}</span>
                                </div>
                            </div>

                            {/* Coupon */}
                            <div className="mb-8">
                                <div className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        placeholder="Coupon Code"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                        disabled={discount > 0}
                                        className="flex-1 border border-[#eee] rounded-[10px] px-4 py-3 outline-none focus:border-primary-pink uppercase"
                                    />
                                    {discount > 0 ? (
                                        <button
                                            onClick={handleRemoveCoupon}
                                            className="bg-red-50 text-red-500 px-4 py-2 rounded-[10px] font-semibold border border-red-100 hover:bg-red-100"
                                        >
                                            Remove
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleApplyCoupon}
                                            className="bg-deep-maroon text-white px-6 py-2 rounded-[10px] font-semibold hover:bg-deep-purple transition-colors"
                                        >
                                            Apply
                                        </button>
                                    )}
                                </div>
                                {couponError && <div className="text-red-500 text-sm ml-1">{couponError}</div>}
                                {discount > 0 && <div className="text-green-600 text-sm ml-1">Coupon applied successfully!</div>}
                                <div className="text-xs text-[#999] mt-2 ml-1">Hint: Try 'WOMEN10'</div>
                            </div>

                            <Link to="/checkout" className="block w-full text-center bg-gradient-to-r from-primary-pink to-coral text-white py-4 rounded-[15px] font-bold text-lg uppercase tracking-wider shadow-lg hover:translate-y-[-2px] hover:shadow-xl transition-all">
                                Proceed to Checkout
                            </Link>

                            <div className="mt-6 text-center text-sm text-[#999]">
                                <p>🔒 Secure Checkout</p>
                                <div className="flex justify-center gap-2 mt-2 opacity-50">
                                    <span>💳</span><span>💰</span><span>🏦</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Cart;
