import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, register, selectAuthLoading } from '../store/slices/authSlice';
import './Auth.css';

const Auth = () => {
    const [activeForm, setActiveForm] = useState('login');
    const [signupData, setSignupData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });

    // Login state
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const isLoading = useSelector(selectAuthLoading);

    // Determines where to redirect after login (default to home, or to the page they tried to visit)
    const from = location.state?.from?.pathname || '/';

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const switchForm = (formType) => {
        setActiveForm(formType);
    };

    const handleSignupChange = (e) => {
        setSignupData({
            ...signupData,
            [e.target.id]: e.target.value
        });
    };

    const handleLoginChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.id]: e.target.value
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const result = await dispatch(login(loginData));
        if (login.fulfilled.match(result)) {
            navigate(from, { replace: true });
        } else {
            alert(result.payload || "Login failed");
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        if (signupData.password !== signupData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const result = await dispatch(register(signupData));
        if (register.fulfilled.match(result)) {
            navigate(from, { replace: true });
        } else {
            alert(result.payload || "Registration failed");
        }
    };

    const getPasswordBorderColor = (length) => {
        if (length < 6) return '#FF006E';
        if (length < 10) return '#FFB627';
        return '#06FFA5';
    };

    const getConfirmPasswordBorderColor = () => {
        if (!signupData.confirmPassword) return '#e0e0e0';
        return signupData.confirmPassword !== signupData.password ? '#FF006E' : '#06FFA5';
    };

    return (
        <div className="auth-body">
            <div className="auth-container">
                {/* Left Side - Branding */}
                <div className="auth-brand">
                    <div className="brand-content">
                        <div className="brand-logo" onClick={() => navigate('/')}>RANGEEN</div>
                        <p className="brand-tagline">
                            Discover Your Heritage<br />in Every Thread
                        </p>
                        <div className="brand-features">
                            <div className="feature-item">
                                <span className="feature-icon">✨</span>
                                <span className="feature-text">Authentic South Asian Fashion</span>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon">🎁</span>
                                <span className="feature-text">Exclusive Member Offers</span>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon">🚚</span>
                                <span className="feature-text">Free Shipping & Easy Returns</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Forms */}
                <div className="auth-forms">
                    {/* Login Form */}
                    <div className={`form-container ${activeForm === 'login' ? 'active' : ''}`} id="loginForm">
                        <h2 className="form-title">Welcome Back!</h2>
                        <p className="form-subtitle">Login to continue your shopping journey</p>

                        <form onSubmit={handleLogin}>
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="form-input"
                                    placeholder="your.email@example.com"
                                    required
                                    value={loginData.email}
                                    onChange={handleLoginChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    className="form-input"
                                    placeholder="Enter your password"
                                    required
                                    value={loginData.password}
                                    onChange={handleLoginChange}
                                />
                            </div>

                            <div className="forgot-password">
                                <a href="#">Forgot Password?</a>
                            </div>

                            <div className="form-checkbox">
                                <input type="checkbox" id="remember" />
                                <label htmlFor="remember">Remember me for 30 days</label>
                            </div>

                            <button type="submit" className="btn-submit" disabled={isLoading}>
                                {isLoading ? 'Logging in...' : 'Login'}
                            </button>
                        </form>

                        <div className="form-divider">
                            <div className="divider-line"></div>
                            <span className="divider-text">or continue with</span>
                            <div className="divider-line"></div>
                        </div>

                        <div className="social-login">
                            <button className="btn-social">
                                <span style={{ fontSize: '1.5rem' }}>🌐</span>
                                Google
                            </button>
                            <button className="btn-social">
                                <span style={{ fontSize: '1.5rem' }}>📘</span>
                                Facebook
                            </button>
                        </div>

                        <div className="form-switch">
                            Don't have an account? <a onClick={() => switchForm('signup')}>Sign Up</a>
                        </div>
                    </div>

                    {/* Signup Form */}
                    <div className={`form-container ${activeForm === 'signup' ? 'active' : ''}`} id="signupForm">
                        <h2 className="form-title">Join Rangeen!</h2>
                        <p className="form-subtitle">Create an account to start shopping</p>

                        <form onSubmit={handleSignup}>
                            <div className="form-group">
                                <label htmlFor="name">Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="form-input"
                                    placeholder="Enter your full name"
                                    required
                                    value={signupData.name}
                                    onChange={handleSignupChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="form-input"
                                    placeholder="your.email@example.com"
                                    required
                                    value={signupData.email}
                                    onChange={handleSignupChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone">Phone Number</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    className="form-input"
                                    placeholder="+91 98765 43210"
                                    required
                                    value={signupData.phone}
                                    onChange={handleSignupChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    className="form-input"
                                    placeholder="Create a strong password"
                                    required
                                    value={signupData.password}
                                    onChange={handleSignupChange}
                                    style={{ borderColor: signupData.password ? getPasswordBorderColor(signupData.password.length) : undefined }}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    className="form-input"
                                    placeholder="Re-enter your password"
                                    required
                                    value={signupData.confirmPassword}
                                    onChange={handleSignupChange}
                                    style={{ borderColor: getConfirmPasswordBorderColor() }}
                                />
                            </div>

                            <div className="form-checkbox">
                                <input type="checkbox" id="terms" required />
                                <label htmlFor="terms">I agree to the Terms of Service and Privacy Policy</label>
                            </div>

                            <button type="submit" className="btn-submit" disabled={isLoading}>
                                {isLoading ? 'Creating Account...' : 'Create Account'}
                            </button>
                        </form>

                        <div className="form-divider">
                            <div className="divider-line"></div>
                            <span className="divider-text">or sign up with</span>
                            <div className="divider-line"></div>
                        </div>

                        <div className="social-login">
                            <button className="btn-social">
                                <span style={{ fontSize: '1.5rem' }}>🌐</span>
                                Google
                            </button>
                            <button className="btn-social">
                                <span style={{ fontSize: '1.5rem' }}>📘</span>
                                Facebook
                            </button>
                        </div>

                        <div className="form-switch">
                            Already have an account? <a onClick={() => switchForm('login')}>Login</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
