import React from 'react';

const Banner = () => {
    return (
        <section className="relative pt-32 pb-20 px-8 overflow-hidden bg-[#FFF9F2] box-border w-full" id="banner">
            <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Text Content */}
                <div className="animate-fadeInUp text-center lg:text-left z-10 relative">
                    <div className="text-sm tracking-[3px] font-bold text-[#FF9F5A] mb-4 uppercase">
                        New Collection 2026
                    </div>
                    <h1 className="font-playfair text-5xl md:text-6xl lg:text-[5rem] font-black leading-[1.1] mb-6 text-deep-purple">
                        Celebrate Your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-deep-purple to-[#9F5AFF]">Heritage in Style</span>
                    </h1>
                    <p className="text-lg md:text-xl leading-[1.8] text-[#666] mb-10 max-w-lg mx-auto lg:mx-0 font-crimson">
                        Discover exquisite sarees, salwar kameez, and ethnic wear that blend traditional elegance with contemporary design. Handpicked for the modern South Asian woman.
                    </p>
                    <div className="flex gap-4 flex-wrap justify-center lg:justify-start">
                        <button className="bg-gradient-to-r from-[#FF3366] to-[#FF5E3A] text-white py-3 px-8 rounded-full text-sm font-bold shadow-[0_10px_30px_rgba(255,51,102,0.3)] hover:translate-y-[-2px] hover:shadow-[0_15px_35px_rgba(255,51,102,0.4)] transition-all uppercase tracking-wider cursor-pointer">
                            Shop Now
                        </button>
                        <button className="bg-white text-deep-maroon py-3 px-8 border border-deep-maroon rounded-full text-sm font-bold hover:bg-deep-maroon hover:text-white transition-all uppercase tracking-wider cursor-pointer">
                            View Collection
                        </button>
                    </div>
                </div>

                {/* Floating Image Cards */}
                <div className="relative h-[600px] w-full hidden md:block" style={{ perspective: '1000px' }}>
                    {/* Card 1: Main Fashion Image (Left) */}
                    <div className="absolute top-[5%] left-0 w-[300px] h-[450px] rounded-[30px] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.15)] animate-float z-20 transform -rotate-3 border-4 border-white">
                        <img
                            src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80"
                            alt="Traditional Saree"
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                        />
                    </div>

                    {/* Card 2: Accessory/Jewelry (Top Right) */}
                    <div className="absolute top-[15%] right-[5%] w-[220px] h-[280px] rounded-[30px] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.15)] animate-float z-10 border-4 border-white" style={{ animationDelay: '1.5s' }}>
                        <img
                            src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80"
                            alt="Gold Jewelry"
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                        />
                    </div>

                    {/* Card 3: Modern Ethnic (Bottom Right) */}
                    <div className="absolute bottom-[5%] right-[20%] w-[260px] h-[340px] rounded-[30px] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.15)] animate-float z-30 transform rotate-3 border-4 border-white" style={{ animationDelay: '3s' }}>
                        <img
                            src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&q=80"
                            alt="Modern Kurti"
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;
