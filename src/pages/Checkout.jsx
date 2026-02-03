import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartTotalAmount, clearCart } from '../store/slices/cartSlice';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Moved component outside to prevent re-rendering/focus loss
const InputField = ({ label, name, placeholder, formik, type = "text", disabled = false }) => (
    <div className="mb-4">
        <label className="block text-deep-maroon font-semibold mb-2 text-sm">{label}</label>
        <input
            type={type}
            name={name}
            disabled={disabled}
            placeholder={placeholder}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values[name]}
            className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary-pink transition-all ${formik.touched[name] && formik.errors[name] ? 'border-red-500 bg-red-50' : 'border-gray-200'
                } ${disabled ? 'bg-gray-100' : ''}`}
        />
        {formik.touched[name] && formik.errors[name] && (
            <div className="text-red-500 text-xs mt-1">{formik.errors[name]}</div>
        )}
    </div>
);

const Checkout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const totalAmount = useSelector(selectCartTotalAmount);
    const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);

    const validationSchema = Yup.object({
        // Shipping
        fullName: Yup.string().required('Full name is required'),
        addressLine: Yup.string().required('Address is required'),
        state: Yup.string().required('State is required'),
        pinCode: Yup.string().matches(/^[0-9]{6}$/, 'Must be exactly 6 digits').required('Pin code is required'),
        phoneNumber: Yup.string().matches(/^[0-9]{10}$/, 'Must be 10 digits').required('Phone number is required'),

        // Billing (conditional validation handled by logic below)
        billingFullName: Yup.string().when([], {
            is: () => !billingSameAsShipping,
            then: (schema) => schema.required('Billing full name is required'),
            otherwise: (schema) => schema.notRequired(),
        }),
        billingAddressLine: Yup.string().when([], {
            is: () => !billingSameAsShipping,
            then: (schema) => schema.required('Billing address is required'),
            otherwise: (schema) => schema.notRequired(),
        }),

        // Payment
        cardNumber: Yup.string().matches(/^[0-9]{16}$/, 'Must be 16 digits').required('Card number is required'),
        cardExpiry: Yup.string().matches(/^(0[1-9]|1[0-2])\/[0-9]{2}$/, 'MM/YY format').required('Expiry is required'),
        cardCVC: Yup.string().matches(/^[0-9]{3}$/, 'Must be 3 digits').required('CVC is required'),
    });

    const formik = useFormik({
        initialValues: {
            fullName: '',
            addressLine: '',
            state: '',
            pinCode: '',
            country: 'India',
            phoneNumber: '',

            billingFullName: '',
            billingAddressLine: '',
            billingState: '',
            billingPinCode: '',
            billingCountry: 'India',

            cardNumber: '',
            cardExpiry: '',
            cardCVC: '',
        },
        validationSchema,
        onSubmit: (values) => {
            // Create Order Object
            const orderDetails = {
                orderId: `ORD-${Date.now()}`,
                customer: {
                    name: values.fullName,
                    email: 'customer@example.com',
                    phone: values.phoneNumber,
                    address: {
                        line: values.addressLine,
                        state: values.state,
                        pin: values.pinCode,
                        country: values.country
                    }
                },
                billing: billingSameAsShipping ? {
                    name: values.fullName,
                    address: {
                        line: values.addressLine,
                        state: values.state,
                        pin: values.pinCode,
                        country: values.country
                    }
                } : {
                    name: values.billingFullName,
                    address: {
                        line: values.billingAddressLine,
                        state: values.billingState,
                        pin: values.billingPinCode,
                        country: values.billingCountry
                    }
                },
                total: totalAmount,
                date: new Date().toISOString()
            };

            // Save to LocalStorage
            const orders = JSON.parse(localStorage.getItem('orders') || '[]');
            orders.push(orderDetails);
            localStorage.setItem('orders', JSON.stringify(orders));

            // Clear Cart
            dispatch(clearCart());

            // Redirect to Thank You
            navigate('/thank-you', { state: { order: orderDetails } });
        },
    });

    return (
        <>
            <Navbar />
            <div className="min-h-screen pt-24 pb-12 px-4 bg-[#fcfcfc]">
                <div className="max-w-[1000px] mx-auto">
                    <h1 className="font-playfair text-4xl font-bold text-center mb-8 text-deep-maroon">Checkout</h1>

                    <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Left Column: Shipping & Billing */}
                        <div className="lg:col-span-2 space-y-8">

                            {/* Shipping Details */}
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                                <h2 className="text-2xl font-playfair font-bold text-deep-maroon mb-6 flex items-center gap-3">
                                    <span className="bg-deep-maroon text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                                    Shipping Details
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <InputField label="Full Name" name="fullName" placeholder="John Doe" formik={formik} />
                                    <InputField label="Phone Number" name="phoneNumber" placeholder="9876543210" formik={formik} />
                                    <div className="md:col-span-2">
                                        <InputField label="Address Line" name="addressLine" placeholder="123, Street Name, Sector 4" formik={formik} />
                                    </div>
                                    <InputField label="State" name="state" placeholder="Maharashtra" formik={formik} />
                                    <InputField label="Pin Code" name="pinCode" placeholder="400001" formik={formik} />
                                    <InputField label="Country" name="country" disabled={true} formik={formik} />
                                </div>
                            </div>

                            {/* Billing Details */}
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-playfair font-bold text-deep-maroon flex items-center gap-3">
                                        <span className="bg-deep-maroon text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                                        Billing Details
                                    </h2>
                                    <label className="flex items-center gap-2 cursor-pointer text-sm">
                                        <input
                                            type="checkbox"
                                            checked={billingSameAsShipping}
                                            onChange={() => setBillingSameAsShipping(!billingSameAsShipping)}
                                            className="accent-deep-maroon w-4 h-4 cursor-pointer"
                                        />
                                        Same as Shipping
                                    </label>
                                </div>

                                {!billingSameAsShipping && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn">
                                        <InputField label="Full Name" name="billingFullName" placeholder="John Doe" formik={formik} />
                                        <div className="md:col-span-2">
                                            <InputField label="Address Line" name="billingAddressLine" placeholder="123, Billing Street" formik={formik} />
                                        </div>
                                        <InputField label="State" name="billingState" placeholder="State" formik={formik} />
                                        <InputField label="Pin Code" name="billingPinCode" placeholder="Pin Code" formik={formik} />
                                        <InputField label="Country" name="billingCountry" disabled={true} formik={formik} />
                                    </div>
                                )}
                                {billingSameAsShipping && (
                                    <p className="text-gray-500 italic text-sm ml-11">Billing address is same as shipping address.</p>
                                )}
                            </div>

                        </div>

                        {/* Right Column: Payment & Summary */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="bg-white p-6 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-gray-100 sticky top-28">
                                <h2 className="text-xl font-playfair font-bold text-deep-maroon mb-6 flex items-center gap-3">
                                    <span className="bg-deep-maroon text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
                                    Payment
                                </h2>

                                <div className="space-y-4">
                                    <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-4 rounded-xl mb-6 shadow-lg">
                                        <div className="flex justify-between items-start mb-8">
                                            <span className="text-xs opacity-70">Credit Card</span>
                                            <span className="text-xl">💳</span>
                                        </div>
                                        <div className="text-lg tracking-widest mb-4 font-mono">
                                            {formik.values.cardNumber ? formik.values.cardNumber.replace(/(\d{4})/g, '$1 ').trim() : '0000 0000 0000 0000'}
                                        </div>
                                        <div className="flex justify-between text-xs opacity-70">
                                            <span>{formik.values.fullName || 'CARD HOLDER'}</span>
                                            <span>{formik.values.cardExpiry || 'MM/YY'}</span>
                                        </div>
                                    </div>

                                    <InputField label="Card Number" name="cardNumber" placeholder="0000 0000 0000 0000" formik={formik} />
                                    <div className="grid grid-cols-2 gap-4">
                                        <InputField label="Expiry Date" name="cardExpiry" placeholder="MM/YY" formik={formik} />
                                        <InputField label="CVC" name="cardCVC" placeholder="123" formik={formik} />
                                    </div>
                                </div>

                                <div className="border-t border-gray-100 mt-6 pt-6">
                                    <div className="flex justify-between text-lg font-bold text-deep-maroon mb-6">
                                        <span>Total Amount</span>
                                        <span>₹{totalAmount.toLocaleString()}</span>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={!formik.isValid && formik.dirty}
                                        className={`w-full text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg transform ${!formik.isValid && formik.dirty ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary-pink hover:bg-deep-purple hover:shadow-xl hover:-translate-y-1'
                                            }`}
                                    >
                                        Pay & Place Order
                                    </button>

                                    {!formik.isValid && formik.submitCount > 0 && (
                                        <div className="text-red-500 text-xs text-center mt-2">
                                            Please correct the errors above in the form.
                                        </div>
                                    )}

                                    <div className="flex justify-center gap-2 mt-4 opacity-50 text-xs">
                                        <span>🔒 Secure SSL Encryption</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Checkout;
