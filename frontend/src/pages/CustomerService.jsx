import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CustomerService = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        // Simulate form submission
        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <>
            <Navbar />

            <div className="bg-[#FFF9F2] pt-32 pb-16 px-8 text-center">
                <h1 className="font-playfair text-4xl md:text-5xl font-black text-deep-maroon mb-4">
                    Customer Service
                </h1>
                <p className="text-[#666] text-lg max-w-2xl mx-auto">
                    We're here to help! Reach out to us for any queries or assistance.
                </p>
            </div>

            <div className="max-w-[1200px] mx-auto px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

                    {/* Contact Info */}
                    <div>
                        <h2 className="font-playfair text-3xl font-bold text-deep-maroon mb-8">Get In Touch</h2>
                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="bg-primary-pink/10 p-4 rounded-full text-2xl text-primary-pink">📧</div>
                                <div>
                                    <h4 className="font-bold text-lg mb-1">Email Us</h4>
                                    <p className="text-gray-600 mb-1">For general queries:</p>
                                    <a href="mailto:hello@rangeen.com" className="text-primary-pink font-bold hover:underline">hello@rangeen.com</a>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="bg-deep-purple/10 p-4 rounded-full text-2xl text-deep-purple">📞</div>
                                <div>
                                    <h4 className="font-bold text-lg mb-1">Call Us</h4>
                                    <p className="text-gray-600 mb-1">Mon - Sat (10 AM - 7 PM)</p>
                                    <a href="tel:+919876543210" className="text-deep-purple font-bold hover:underline">+91 98765 43210</a>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="bg-primary-orange/10 p-4 rounded-full text-2xl text-primary-orange">📍</div>
                                <div>
                                    <h4 className="font-bold text-lg mb-1">Visit Us</h4>
                                    <p className="text-gray-600">
                                        123, Fashion Avenue, <br />
                                        Koramangala, Bangalore - 560034
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 p-8 bg-gray-50 rounded-[20px]">
                            <h3 className="font-playfair text-xl font-bold mb-4">FAQ</h3>
                            <details className="mb-4 cursor-pointer">
                                <summary className="font-semibold text-deep-maroon">What is your return policy?</summary>
                                <p className="text-gray-600 mt-2 text-sm">We accept returns within 7 days of delivery for unworn items with tags attached.</p>
                            </details>
                            <details className="mb-4 cursor-pointer">
                                <summary className="font-semibold text-deep-maroon">Do you ship internationally?</summary>
                                <p className="text-gray-600 mt-2 text-sm">Yes! We ship worldwide. Shipping charges vary by location.</p>
                            </details>
                            <details className="cursor-pointer">
                                <summary className="font-semibold text-deep-maroon">How can I track my order?</summary>
                                <p className="text-gray-600 mt-2 text-sm">You receive a tracking link via email once your order is shipped.</p>
                            </details>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-8 md:p-10 rounded-[30px] shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-gray-100">
                        <h2 className="font-playfair text-3xl font-bold text-deep-maroon mb-6">Send a Message</h2>
                        {submitted ? (
                            <div className="h-full flex flex-col items-center justify-center text-center py-20">
                                <div className="text-5xl mb-4">✅</div>
                                <h3 className="text-2xl font-bold text-green-600 mb-2">Message Sent!</h3>
                                <p className="text-gray-500">We'll get back to you shortly.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Your Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-pink"
                                        placeholder="Jane Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-pink"
                                        placeholder="jane@example.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                                    <textarea
                                        required
                                        rows="4"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-pink"
                                        placeholder="How can we help you?"
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-deep-maroon text-white py-4 rounded-xl font-bold shadow-lg hover:bg-deep-purple transition-all hover:-translate-y-1"
                                >
                                    Send Message
                                </button>
                            </form>
                        )}
                    </div>

                </div>
            </div>

            <Footer />
        </>
    );
};

export default CustomerService;
