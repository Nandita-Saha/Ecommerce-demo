import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectProductBySlug } from '../store/slices/productSlice';
import { addToCart } from '../store/slices/cartSlice';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ProductDetails = () => {
    const { slug } = useParams();
    const product = useSelector(selectProductBySlug(slug));
    const dispatch = useDispatch();

    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [isAdded, setIsAdded] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (product) {
            setSelectedColor(product.colors[0]);
            setSelectedSize(product.sizes[0]);
        }
    }, [product]);

    if (!product) {
        return (
            <>
                <Navbar />
                <div className="min-h-[60vh] flex flex-col items-center justify-center">
                    <h2 className="text-3xl font-playfair mb-4">Product Not Found</h2>
                    <Link to="/" className="text-primary-pink hover:underline">Return to Home</Link>
                </div>
                <Footer />
            </>
        );
    }

    const handleAddToCart = () => {
        dispatch(addToCart({
            product,
            selectedColor,
            selectedSize,
            quantity
        }));

        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    const discountPercentage = Math.round(
        ((product.price - product.discountPrice) / product.price) * 100
    );

    return (
        <>
            <Navbar />

            {/* Breadcrumb */}
            <div className="max-w-[1400px] mx-auto mt-8 px-8 flex gap-2 items-center text-[#666]">
                <Link to="/" className="text-deep-maroon hover:text-primary-pink transition-colors">Home</Link>
                <span>›</span>
                <span className="text-deep-maroon">{product.category}</span>
                <span>›</span>
                <span>{product.name}</span>
            </div>

            <div className="max-w-[1400px] mx-auto mt-8 mb-16 px-8 grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Image Gallery */}
                <div className="flex flex-col-reverse md:flex-row gap-6">
                    <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible py-2">
                        {product.images.map((img, index) => (
                            <div
                                key={index}
                                onClick={() => setSelectedImage(index)}
                                className={`w-[80px] h-[100px] flex-shrink-0 rounded-[10px] cursor-pointer border-[3px] overflow-hidden transition-all duration-300 ${selectedImage === index ? 'border-primary-pink scale-105' : 'border-transparent hover:border-primary-pink/50'
                                    }`}
                            >
                                <img src={img} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>

                    <div className="flex-1 h-[500px] md:h-[600px] rounded-[20px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15)] relative">
                        {product.featured && <div className="absolute top-5 left-5 bg-primary-pink text-white px-5 py-2 rounded-full font-bold text-sm uppercase tracking-wider z-10">{product.badge || 'Sale'}</div>}
                        <img src={product.images[selectedImage]} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                </div>

                {/* Product Info */}
                <div className="flex flex-col">
                    <div className="text-primary-orange text-sm font-semibold uppercase tracking-[2px] mb-2">
                        {product.category} Collection
                    </div>
                    <h1 className="font-playfair text-4xl md:text-5xl font-black mb-4 leading-tight text-deep-maroon">
                        {product.name}
                    </h1>

                    <div className="flex items-center gap-4 mb-6">
                        <div className="text-primary-gold text-xl tracking-[3px]">★★★★★</div>
                        <span className="text-[#666]">4.8 (234 reviews)</span>
                    </div>

                    <div className="bg-gradient-to-br from-[#FF006E]/5 to-[#FB5607]/5 p-8 rounded-[15px] mb-8 border-2 border-[#FF006E]/10">
                        <div className="flex items-center gap-6 mb-4">
                            <span className="font-playfair text-5xl font-bold text-deep-purple">₹{product.discountPrice.toLocaleString()}</span>
                            <span className="text-2xl text-[#999] line-through">₹{product.price.toLocaleString()}</span>
                            <span className="bg-primary-gold text-deep-maroon px-4 py-2 rounded-[20px] font-bold uppercase">
                                {discountPercentage}% OFF
                            </span>
                        </div>
                        <div className="text-[#666] text-sm">Inclusive of all taxes • Free shipping on orders above ₹2,000</div>
                    </div>

                    <div className="mb-8">
                        <h3 className="font-playfair text-2xl mb-4 text-deep-maroon">Product Description</h3>
                        <p className="leading-[1.8] text-[#555] text-lg">
                            {product.description}
                        </p>
                    </div>

                    <div className="mb-8">
                        <div className="mb-6">
                            <label className="font-semibold text-lg mb-3 text-deep-maroon block">Select Color</label>
                            <div className="flex gap-4 flex-wrap">
                                {product.colors.map((color, index) => (
                                    <div
                                        key={index}
                                        onClick={() => setSelectedColor(color)}
                                        className={`w-[50px] h-[50px] rounded-full cursor-pointer border-[3px] transition-all duration-300 relative ${selectedColor === color ? 'border-deep-maroon scale-110' : 'border-transparent hover:scale-110'
                                            }`}
                                        style={{ backgroundColor: color }}
                                    >
                                        {selectedColor === color && (
                                            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-black text-lg drop-shadow-md">✓</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="font-semibold text-lg mb-3 text-deep-maroon block">Select Size</label>
                            <div className="flex gap-4 flex-wrap">
                                {product.sizes.map((size) => (
                                    <div
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-6 py-3 border-2 rounded-[10px] cursor-pointer transition-all duration-300 font-semibold ${selectedSize === size
                                                ? 'border-primary-pink bg-primary-pink text-white'
                                                : 'border-[#e0e0e0] bg-white hover:border-primary-pink hover:bg-primary-pink/5'
                                            }`}
                                    >
                                        {size}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="font-semibold text-lg mb-3 text-deep-maroon block">Quantity</label>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center border-2 border-[#e0e0e0] rounded-[10px] overflow-hidden">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="bg-white border-none py-3 px-5 text-xl cursor-pointer text-deep-maroon hover:bg-primary-pink hover:text-white transition-colors"
                                    >-</button>
                                    <div className="py-3 px-6 font-semibold text-lg min-w-[60px] text-center border-l-2 border-r-2 border-[#e0e0e0]">
                                        {quantity}
                                    </div>
                                    <button
                                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                        className="bg-white border-none py-3 px-5 text-xl cursor-pointer text-deep-maroon hover:bg-primary-pink hover:text-white transition-colors"
                                    >+</button>
                                </div>
                                <span className="text-[#666]">Only {product.stock} items left!</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 mb-8 flex-col sm:flex-row">
                        <button
                            onClick={handleAddToCart}
                            className={`flex-[2] bg-gradient-to-br ${isAdded ? 'from-teal to-turquoise' : 'from-primary-pink to-coral'} text-white border-none py-4 px-6 rounded-[15px] text-xl font-bold cursor-pointer transition-all duration-300 uppercase tracking-widest flex items-center justify-center gap-3 hover:-translate-y-1 shadow-lg`}
                        >
                            <span>{isAdded ? '✓ Added' : '🛒 Add to Cart'}</span>
                        </button>
                        <button className="flex-1 bg-white text-deep-maroon py-4 px-6 border-2 border-deep-maroon rounded-[15px] text-2xl cursor-pointer transition-all duration-300 hover:bg-deep-maroon hover:text-white hover:-translate-y-1">
                            ♡
                        </button>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            { icon: '🚚', title: 'Free Delivery', desc: 'On orders above ₹2,000' },
                            { icon: '↩️', title: 'Easy Returns', desc: '7 days return policy' },
                            { icon: '✓', title: 'Authentic', desc: '100% genuine guarantee' },
                            { icon: '💳', title: 'Secure Payment', desc: 'Safe & encrypted checkout' }
                        ].map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-4 p-4 bg-white rounded-[10px] shadow-sm">
                                <div className="text-3xl">{feature.icon}</div>
                                <div>
                                    <div className="font-semibold text-deep-maroon">{feature.title}</div>
                                    <div className="text-sm text-[#666]">{feature.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default ProductDetails;
