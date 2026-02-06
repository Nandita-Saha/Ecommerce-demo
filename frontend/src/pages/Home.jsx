import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import Categories from '../components/Categories';
import FeaturedProducts from '../components/FeaturedProducts';
import Footer from '../components/Footer';

const Home = () => {
    useEffect(() => {
        // Scroll to top on mount
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Navbar />
            <Banner />
            <Categories />
            <FeaturedProducts />

            {/* Offers Banner */}
            <section className="relative py-16 px-8 text-center text-white overflow-hidden bg-gradient-to-br from-deep-purple to-primary-pink">
                {/* Decorative elements */}
                <div className="absolute -top-12 -left-12 text-[15rem] opacity-10 animate-rotate select-none pointer-events-none">✦</div>
                <div className="absolute -bottom-12 -right-12 text-[12rem] opacity-10 animate-rotate select-none pointer-events-none" style={{ animationDirection: 'reverse' }}>✦</div>

                {/* <div className="relative z-10 max-w-[800px] mx-auto">
                    <h2 className="font-playfair text-5xl md:text-6xl font-black mb-4">Daily Festive Offers!</h2>
                    <p className="text-xl md:text-2xl mb-8 opacity-95">Get up to 50% off on selected items. Limited time only!</p>
                    <div className="inline-block bg-white text-deep-purple py-4 px-10 rounded-2xl text-2xl font-bold tracking-[3px] mb-6 border-4 border-dashed border-primary-gold">
                        WOMEN10
                    </div>
                    <p className="text-sm opacity-80 mb-8">Use code for extra 10% OFF</p>
                    <button className="bg-gradient-to-br from-primary-pink to-coral text-white py-4 px-10 border-none rounded-full text-lg font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_35px_rgba(255,0,110,0.4)] uppercase tracking-wider">
                        Shop Offers
                    </button>
                </div> */}
                <div className="relative z-10 max-w-[800px] mx-auto text-center">
                    <h2 className="font-playfair text-5xl md:text-6xl font-black mb-4">
                        Daily Festive Offers!
                    </h2>

                    <p className="text-xl md:text-2xl mb-8 opacity-95">
                        Get up to 50% off on selected items. Limited time only!
                    </p>

                    {/* Coupon + Button Wrapper */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-6">

                        <div className="inline-block bg-white text-deep-purple py-4 px-10 rounded-2xl text-2xl font-bold tracking-[3px] border-4 border-dashed border-primary-gold">
                            WOMEN10
                        </div>

                        <button className="bg-gradient-to-br from-primary-pink to-coral text-white py-4 px-10 rounded-full text-lg font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_35px_rgba(255,0,110,0.4)] uppercase tracking-wider">
                            Shop Offers
                        </button>

                    </div>

                    <p className="text-sm opacity-80">
                        Use code for extra 10% OFF
                    </p>
                </div>

            </section>

            <Footer />
        </>
    );
};

export default Home;
