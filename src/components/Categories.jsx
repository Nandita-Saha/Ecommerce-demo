import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectAllCategories } from '../store/slices/categorySlice';

const Categories = () => {
    const categories = useSelector(selectAllCategories);

    return (
        <section className="py-24 px-8 max-w-[1400px] mx-auto" id="categories">
            <div className="text-center mb-16">
                <h2 className="font-playfair text-5xl md:text-6xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-br from-deep-maroon to-deep-purple">
                    Shop by Category
                </h2>
                <p className="text-xl text-[#666]">Explore our curated collection of traditional and contemporary wear</p>
            </div>

            <div className="grid grid-cols-1 min-[440px]:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-12">
                {categories.map((category) => (
                    <Link
                        to={`/shop?category=${category.slug}`}
                        key={category.id}
                        className="relative rounded-[20px] overflow-hidden h-[400px] cursor-pointer transition-all duration-400 shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.2)] group block"
                    >

                        {/* Image Logic */}
                        <div className="absolute w-full h-full overflow-hidden">
                            <img
                                src={category.image}
                                alt={category.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        </div>

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4 md:p-8">
                            <h3 className="font-playfair text-lg md:text-3xl font-bold text-white mb-1 md:mb-2 translate-y-2 transition-transform duration-300 group-hover:translate-y-0 text-shadow-md">
                                {category.name}
                            </h3>
                            <p className="text-white/90 text-sm md:text-lg translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 font-medium">
                                {category.count}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default Categories;
