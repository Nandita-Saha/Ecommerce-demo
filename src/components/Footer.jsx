import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-deep-maroon text-white pt-16 px-8 pb-8" id="footer">
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 text-left">

                {/* Brand Section */}
                <div className="footer-section">
                    <h3 className="font-playfair text-3xl mb-6 text-primary-gold font-black tracking-wider">RANGEEN</h3>
                    <p className="text-white/80 leading-relaxed mb-6 font-light">
                        Celebrating the essence of Indian heritage with a touch of modern elegance.
                        Handcrafted fashion for the contemporary woman.
                    </p>
                    <div className="flex gap-4">
                        {['instagram', 'facebook', 'x', 'pinterest'].map((social) => (
                            <a
                                key={social}
                                href={`#${social}`}
                                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary-pink transition-colors text-white"
                            >
                                <img
                                    src={`https://cdn.simpleicons.org/${social}/white`}
                                    alt={social}
                                    className="w-4 h-4"
                                />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Company Links */}
                <div className="footer-section">
                    <h3 className="font-playfair text-xl mb-6 font-bold text-primary-gold">Company</h3>
                    <ul className="space-y-4">
                        <li><Link to="/about-us" className="text-white/80 hover:text-primary-pink transition-colors">About Us</Link></li>
                        <li><Link to="/shop" className="text-white/80 hover:text-primary-pink transition-colors">Products</Link></li>
                        <li><Link to="/customer-service" className="text-white/80 hover:text-primary-pink transition-colors">Customer Service</Link></li>
                    </ul>
                </div>

                {/* Support Links */}
                <div className="footer-section">
                    <h3 className="font-playfair text-xl mb-6 font-bold text-primary-gold">Support</h3>
                    <ul className="space-y-4">
                        <li><Link to="/customer-service" className="text-white/80 hover:text-primary-pink transition-colors">Customer Service</Link></li>
                        <li><Link to="/customer-service" className="text-white/80 hover:text-primary-pink transition-colors">Shipping & Returns</Link></li>
                        <li><Link to="/customer-service" className="text-white/80 hover:text-primary-pink transition-colors">Order Tracking</Link></li>
                        <li><Link to="/customer-service" className="text-white/80 hover:text-primary-pink transition-colors">Contact Us</Link></li>
                    </ul>
                </div>

                {/* Newsletter & Legal */}
                <div className="footer-section">
                    <h3 className="font-playfair text-xl mb-6 font-bold text-primary-gold">Stay Updated</h3>
                    <p className="text-white/80 mb-4 text-sm">Subscribe to our newsletter for exclusive offers.</p>
                    <div className="flex gap-2 mb-8">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 w-full focus:outline-none focus:border-primary-pink"
                        />
                        <button className="bg-primary-pink px-4 py-2 rounded-lg font-bold hover:bg-white hover:text-deep-maroon transition-colors">
                            →
                        </button>
                    </div>
                    <div className="flex gap-4 text-xs text-white/50">
                        <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
                        <span>•</span>
                        <Link to="/terms" className="hover:text-white">Terms of Service</Link>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-white/60">
                <p>&copy; {new Date().getFullYear()} Rangeen. All rights reserved.</p>
                <p className="mt-2 md:mt-0">Made with ❤️ for Indian Fashion</p>
            </div>
        </footer>
    );
};

export default Footer;
