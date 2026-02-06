import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAllProducts } from '../store/slices/productSlice';
import { selectAllCategories } from '../store/slices/categorySlice';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Shop = () => {
    const [searchParams] = useSearchParams();
    const initialCategory = searchParams.get('category');

    const allProducts = useSelector(selectAllProducts);
    const categories = useSelector(selectAllCategories);

    // Default to first category if none selected or 'all'
    const [activeCategory, setActiveCategory] = useState(initialCategory || 'all');

    useEffect(() => {
        if (initialCategory) {
            setActiveCategory(initialCategory);
        }
    }, [initialCategory]);

    // Filter Logic
    const filteredProducts = activeCategory === 'all'
        ? allProducts
        : allProducts.filter(p => p.category.toLowerCase() === activeCategory.replace('-', ' ').toLowerCase() || p.category.toLowerCase() === activeCategory.toLowerCase());

    const getCategoryName = (slug) => {
        const cat = categories.find(c => c.slug === slug);
        return cat ? cat.name : 'All Products';
    };

    return (
        <>
            <Navbar />

            {/* Header Banner */}
            <div className="bg-[#FFF9F2] pt-32 pb-16 px-8 text-center">
                <h1 className="font-playfair text-4xl md:text-5xl font-black text-deep-maroon mb-4">
                    {activeCategory === 'all' ? 'All Collections' : getCategoryName(activeCategory)}
                </h1>
                <p className="text-[#666] text-lg max-w-2xl mx-auto">
                    Browse our exclusive range of handpicked ethnic and contemporary fashion.
                </p>
            </div>

            <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-12">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Left Sidebar (Tabs) */}
                    <div className="lg:w-1/4">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-28">
                            <h3 className="font-playfair text-xl font-bold text-deep-maroon mb-6 pb-4 border-b border-gray-100">
                                Categories
                            </h3>
                            <ul className="space-y-3">
                                <li>
                                    <button
                                        onClick={() => setActiveCategory('all')}
                                        className={`w-full text-left px-4 py-3 rounded-lg transition-all text-sm font-semibold uppercase tracking-wider ${activeCategory === 'all'
                                                ? 'bg-deep-maroon text-white shadow-md'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-deep-maroon'
                                            }`}
                                    >
                                        All Products
                                    </button>
                                </li>
                                {categories.map((cat) => (
                                    <li key={cat.id}>
                                        <button
                                            onClick={() => setActiveCategory(cat.slug)}
                                            className={`w-full text-left px-4 py-3 rounded-lg transition-all text-sm font-semibold uppercase tracking-wider flex justify-between items-center ${activeCategory === cat.slug
                                                    ? 'bg-deep-maroon text-white shadow-md'
                                                    : 'text-gray-600 hover:bg-gray-50 hover:text-deep-maroon'
                                                }`}
                                        >
                                            <span>{cat.name}</span>
                                            {activeCategory === cat.slug && <span>›</span>}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Right Product Grid */}
                    <div className="lg:w-3/4">
                        <div className="flex justify-between items-center mb-8">
                            <span className="text-gray-500">Showing {filteredProducts.length} results</span>
                            <div className="flex gap-2">
                                {/* Placeholders for sort/filter if needed later */}
                                <select className="border border-gray-200 rounded-lg px-4 py-2 text-sm bg-white outline-none focus:border-deep-maroon">
                                    <option>Sort by: Featured</option>
                                    <option>Price: Low to High</option>
                                    <option>Price: High to Low</option>
                                </select>
                            </div>
                        </div>

                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredProducts.map((product) => (
                                    <Link
                                        to={`/product/${product.slug}`}
                                        key={product.id}
                                        className="group bg-white rounded-[20px] overflow-hidden shadow-sm hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-300 border border-gray-100 flex flex-col"
                                    >
                                        <div className="relative h-[300px] overflow-hidden">
                                            {product.badge && (
                                                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-deep-maroon z-10 shadow-sm">
                                                    {product.badge}
                                                </span>
                                            )}
                                            <img
                                                src={product.images[0]}
                                                alt={product.name}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            {/* Hover overlay with quick action */}
                                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                <button className="bg-white text-deep-maroon px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wider transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                                    View Details
                                                </button>
                                            </div>
                                        </div>

                                        <div className="p-6 flex flex-col flex-1">
                                            <div className="text-xs text-primary-orange font-bold uppercase tracking-wider mb-2">
                                                {product.category}
                                            </div>
                                            <h3 className="font-playfair text-xl font-bold text-deep-maroon mb-2 line-clamp-2" title={product.name}>
                                                {product.name}
                                            </h3>
                                            <div className="mt-auto flex items-center gap-3">
                                                <span className="text-lg font-bold text-deep-purple">₹{product.discountPrice.toLocaleString()}</span>
                                                <span className="text-sm text-gray-400 line-through">₹{product.price.toLocaleString()}</span>
                                                <span className="text-xs text-green-600 font-bold bg-green-50 px-2 py-1 rounded-md">
                                                    {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-gray-50 rounded-2xl">
                                <div className="text-4xl mb-4">🔍</div>
                                <h3 className="font-playfair text-2xl font-bold text-deep-maroon mb-2">No Products Found</h3>
                                <p className="text-gray-500">We couldn't find any products in this category.</p>
                                <button
                                    onClick={() => setActiveCategory('all')}
                                    className="mt-6 text-primary-pink font-bold hover:underline"
                                >
                                    View All Products
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Shop;
