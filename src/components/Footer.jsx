import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-deep-maroon text-white pt-16 px-8 pb-8" id="footer">
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 text-left">
                <div className="footer-section">
                    <h3 className="font-playfair text-2xl mb-6 text-primary-gold">About Rangeen</h3>
                    <p className="text-white/80 leading-loose">
                        Your destination for authentic South Asian fashion. We bring you the finest traditional and contemporary wear.
                    </p>
                    <div className="flex gap-4 mt-4">
                        {['📘', '📷', '🐦', '📌'].map((icon, index) => (
                            <a
                                key={index}
                                href="#"
                                className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white text-lg transition-all duration-300 hover:bg-primary-gold hover:-translate-y-1"
                            >
                                {icon}
                            </a>
                        ))}
                    </div>
                </div>

                <div className="footer-section">
                    <h3 className="font-playfair text-2xl mb-6 text-primary-gold">Quick Links</h3>
                    <ul className="list-none">
                        {['About Us', 'Contact Us', 'Customer Service', 'Privacy Policy', 'Terms of Use'].map((item) => (
                            <li key={item} className="mb-3">
                                <a href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-white/80 no-underline transition-colors duration-300 hover:text-primary-gold">
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="footer-section">
                    <h3 className="font-playfair text-2xl mb-6 text-primary-gold">Categories</h3>
                    <ul className="list-none">
                        {['Sarees', 'Salwar Kameez', 'Kurtas', 'Ethnic Dresses', 'Western Outfits', 'Jewelry'].map((item) => (
                            <li key={item} className="mb-3">
                                <a href="#" className="text-white/80 no-underline transition-colors duration-300 hover:text-primary-gold">
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="footer-section">
                    <h3 className="font-playfair text-2xl mb-6 text-primary-gold">Contact Info</h3>
                    <ul className="list-none">
                        <li className="mb-3 text-white/80">📞 +91 98765 43210</li>
                        <li className="mb-3 text-white/80">📧 hello@rangeen.com</li>
                        <li className="mb-3 text-white/80">📍 Kolkata, West Bengal, India</li>
                        <li className="mb-3 text-white/80">🕐 Mon-Sat: 10 AM - 8 PM</li>
                    </ul>
                </div>
            </div>

            <div className="text-center pt-8 border-t border-white/20 text-white/70">
                <p>&copy; 2026 Rangeen - South Asian Fashion Boutique. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
