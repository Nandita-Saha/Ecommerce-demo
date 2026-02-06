import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Add default variant (first color, first size)
        dispatch(addToCart({
            product,
            selectedColor: product.colors[0],
            selectedSize: product.sizes[0],
            quantity: 1
        }));
    };

    const discountPercentage = Math.round(
        ((product.price - product.discountPrice) / product.price) * 100
    );

    return (
        <div className="group bg-white rounded-[20px] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-400 cursor-pointer hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] h-full flex flex-col">
            <Link to={`/product/${product.slug}`} className="block relative h-[350px] overflow-hidden">
                {product.badge && (
                    <div className="absolute top-4 left-4 bg-primary-pink text-white px-4 py-2 rounded-full font-semibold text-sm uppercase tracking-wider z-10">
                        {product.badge}
                    </div>
                )}
                <div className="w-full h-full">
                    <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                </div>
            </Link>

            <div className="p-6 flex flex-col flex-grow">
                <div className="text-primary-orange text-sm font-semibold uppercase tracking-wider mb-2">
                    {product.category}
                </div>
                <Link to={`/product/${product.slug}`} className="font-playfair text-2xl font-bold mb-3 text-deep-maroon no-underline hover:text-primary-pink transition-colors">
                    {product.name}
                </Link>

                <div className="flex items-center gap-4 mb-4 mt-auto">
                    <span className="text-2xl font-bold text-deep-purple">₹{product.discountPrice.toLocaleString()}</span>
                    <span className="text-lg text-[#999] line-through">₹{product.price.toLocaleString()}</span>
                    <span className="bg-primary-gold text-deep-maroon px-3 py-1 rounded-[15px] text-sm font-bold">
                        {discountPercentage}% OFF
                    </span>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={handleAddToCart}
                        className="flex-1 bg-gradient-to-br from-primary-pink to-coral text-white border-0 py-3 rounded-xl font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(255,0,110,0.3)] uppercase tracking-wide text-sm"
                    >
                        Add to Cart
                    </button>
                    <button className="bg-white border-2 border-deep-maroon text-deep-maroon p-3 rounded-xl cursor-pointer transition-all duration-300 hover:bg-deep-maroon hover:text-white text-lg flex items-center justify-center aspect-square">
                        ♡
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
