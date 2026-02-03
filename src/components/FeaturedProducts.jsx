import React from 'react';
import { useSelector } from 'react-redux';
import { selectFeaturedProducts } from '../store/slices/productSlice';
import ProductCard from './ProductCard';

const FeaturedProducts = () => {
    const products = useSelector(selectFeaturedProducts);

    return (
        <section className="py-24 px-8 bg-white" id="products">
            <div className="max-w-[1400px] mx-auto">
                <div className="text-center mb-16">
                    <h2 className="font-playfair text-5xl md:text-6xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-br from-deep-maroon to-deep-purple">
                        Featured Products
                    </h2>
                    <p className="text-xl text-[#666]">Handpicked favorites for you</p>
                </div>

                <div className="grid grid-cols-1 min-[490px]:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-10">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedProducts;
