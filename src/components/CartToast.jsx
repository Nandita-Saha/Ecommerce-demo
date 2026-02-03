import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCartNotification, hideCartNotification } from '../store/slices/uiSlice';

const CartToast = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { show, message, productName, productImage } = useSelector(selectCartNotification);

    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                dispatch(hideCartNotification());
            }, 5000); // 5 seconds visibility
            return () => clearTimeout(timer);
        }
    }, [show, dispatch]);

    if (!show) return null;

    return (
        <div className={`fixed z-[2000] transition-all duration-300 ease-in-out transform
            lg:top-24 lg:right-8 lg:left-auto lg:w-[400px] lg:translate-x-0
            top-20 left-4 right-4 translate-y-0
            bg-white shadow-[0_10px_40px_rgba(0,0,0,0.15)] rounded-2xl border border-primary-pink/20 overflow-hidden
            animate-slide-in-top
        `}>
            <div className="p-4 flex gap-4 items-center relative">
                {/* Close Button */}
                <button
                    onClick={() => dispatch(hideCartNotification())}
                    className="absolute top-2 right-2 text-gray-400 hover:text-deep-maroon transition-colors"
                >
                    ×
                </button>

                {/* Product Image */}
                {productImage && (
                    <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border border-gray-100">
                        <img src={productImage} alt={productName} className="w-full h-full object-cover" />
                    </div>
                )}

                {/* Content */}
                <div className="flex-1">
                    <h4 className="font-playfair font-bold text-deep-maroon text-sm mb-1">
                        {productName}
                    </h4>
                    <p className="text-green-600 text-xs font-semibold mb-3">
                        ✓ {message}
                    </p>

                    <button
                        onClick={() => {
                            dispatch(hideCartNotification());
                            navigate('/checkout');
                        }}
                        className="w-full bg-deep-maroon text-white text-xs font-bold py-2 rounded-lg uppercase tracking-wider hover:bg-primary-pink transition-colors shadow-sm"
                    >
                        Go to Checkout
                    </button>
                </div>
            </div>

            {/* Progress Bar (Optional Visual or just bottom border) */}
            <div className="h-1 bg-gradient-to-r from-primary-pink to-deep-purple animate-shrink-width w-full"></div>
        </div>
    );
};

export default CartToast;
