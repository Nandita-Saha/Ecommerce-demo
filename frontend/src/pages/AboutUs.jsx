import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutUs = () => {
    return (
        <>
            <Navbar />

            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=1600"
                        alt="Indian Heritage"
                        className="w-full h-full object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
                </div>
                <div className="relative z-10 text-center max-w-[800px] px-8 pt-20">
                    <h1 className="font-playfair text-5xl md:text-7xl font-black text-deep-maroon mb-6">Our Story</h1>
                    <p className="text-xl md:text-2xl text-gray-700 font-light">
                        Weaving the threads of tradition into the fabric of modern life.
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-20 px-8 max-w-[1200px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
                    <div className="order-2 md:order-1 relative">
                        <div className="absolute -top-4 -left-4 w-full h-full border-2 border-primary-gold rounded-[30px] z-0"></div>
                        <img
                            src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800"
                            alt="Craftsmanship"
                            className="relative z-10 w-full rounded-[30px] shadow-xl"
                        />
                    </div>
                    <div className="order-1 md:order-2">
                        <h2 className="font-playfair text-4xl font-bold text-deep-maroon mb-6">Born from Culture</h2>
                        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                            Rangeen started with a simple vision: to make India's rich textile heritage accessible to the modern woman.
                            We believe that traditional wear isn't just for special occasions—it's a statement of identity, grace, and confidence.
                        </p>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Every piece in our collection is handpicked for its quality, craftsmanship, and style. From the looms of Banaras
                            to the artisans of Jaipur, we bring you the finest ethnic wear that tells a story.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
                    <div className="bg-deep-maroon p-10 rounded-[30px] hover:-translate-y-2 transition-transform duration-300">
                        <div className="text-5xl mb-4">✨</div>
                        <h3 className="font-playfair text-2xl font-bold mb-4">Quality</h3>
                        <p className="opacity-90">Premium fabrics and authentic craftsmanship in every stitch.</p>
                    </div>
                    <div className="bg-deep-purple p-10 rounded-[30px] hover:-translate-y-2 transition-transform duration-300">
                        <div className="text-5xl mb-4">🌿</div>
                        <h3 className="font-playfair text-2xl font-bold mb-4">Sustainability</h3>
                        <p className="opacity-90">Supporting local artisans and promoting sustainable fashion practices.</p>
                    </div>
                    <div className="bg-primary-pink p-10 rounded-[30px] hover:-translate-y-2 transition-transform duration-300">
                        <div className="text-5xl mb-4">❤️</div>
                        <h3 className="font-playfair text-2xl font-bold mb-4">Passion</h3>
                        <p className="opacity-90">A deep love for Indian heritage driving everything we do.</p>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default AboutUs;
