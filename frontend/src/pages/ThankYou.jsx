import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ThankYou = () => {
    const location = useLocation();
    const { order } = location.state || {}; // Retrieve passed order details

    if (!order) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Redirecting...</p>
                <Link to="/" className="hidden" />
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <div className="min-h-[80vh] flex items-center justify-center bg-[#fcfcfc] px-4 pt-20">
                <div className="bg-white p-8 md:p-12 rounded-[30px] shadow-[0_20px_60px_rgba(0,0,0,0.05)] text-center max-w-[600px] w-full border border-gray-100 relative overflow-hidden">

                    {/* Confetti Decoration */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary-pink via-primary-orange to-deep-purple"></div>

                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-5xl">
                        🎉
                    </div>

                    <h1 className="font-playfair text-4xl md:text-5xl font-bold text-deep-maroon mb-4">
                        Thank You, {order.customer.name.split(' ')[0]}!
                    </h1>

                    <p className="text-xl text-gray-600 mb-8">
                        Your order has been placed successfully.
                    </p>

                    <div className="bg-[#f9f9f9] p-6 rounded-2xl mb-8 text-left border border-gray-100">
                        <div className="flex justify-between mb-3 pb-3 border-b border-gray-200">
                            <span className="text-gray-500 font-medium">Order ID</span>
                            <span className="font-bold text-deep-purple font-mono">{order.orderId}</span>
                        </div>
                        <div className="flex justify-between mb-3 text-sm">
                            <span className="text-gray-500">Date</span>
                            <span>{new Date(order.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold text-deep-maroon pt-2">
                            <span>Total Paid</span>
                            <span>₹{order.total.toLocaleString()}</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Link
                            to="/"
                            className="block w-full bg-deep-maroon text-white py-4 rounded-xl font-bold hover:bg-deep-purple transition-all shadow-lg"
                        >
                            Continue Shopping
                        </Link>
                        <p className="text-sm text-gray-400">
                            A confirmation email has been sent to {order.customer.email}
                        </p>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    );
};

export default ThankYou;
