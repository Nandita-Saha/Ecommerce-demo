import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartTotalQuantity } from '../store/slices/cartSlice';
import { selectIsAuthenticated, selectCurrentUser, logout } from '../store/slices/authSlice';

const Navbar = () => {
    const cartQuantity = useSelector(selectCartTotalQuantity);
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const currentUser = useSelector(selectCurrentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Helper to determine link destination
    const getLinkPath = (item) => {
        switch (item) {
            case 'Home': return '/';
            case 'Products': return '/shop';
            case 'About Us': return '/about-us';
            case 'Customer Service': return '/customer-service';
            case 'Contact': return '/customer-service'; // Linking Contact to Customer Service page
            default: return '/';
        }
    };

    const handleLogout = () => {
        dispatch(logout());
        setShowUserMenu(false);
        navigate('/');
    };

    return (
        <>
            <nav className={`fixed top-0 left-0 w-full z-[1000] px-6 md:px-8 py-4 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-4' : 'bg-white/95 backdrop-blur-md py-6'
                } lg:border-b-2 lg:border-primary-gold`}>
                <div className="max-w-[1400px] mx-auto flex justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                        {/* Hamburger (Mobile/Tab only) */}
                        <button
                            className="lg:hidden text-2xl text-deep-maroon cursor-pointer hover:text-primary-pink transition-colors"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            ☰
                        </button>
                        <Link to="/" onClick={() => window.scrollTo(0, 0)} className="font-playfair text-2xl md:text-3xl font-black tracking-[2px] uppercase text-transparent bg-clip-text bg-gradient-to-r from-primary-pink to-primary-orange">
                            RANGEEN
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <ul className="hidden lg:flex gap-8 items-center list-none">
                        {['Home', 'Products', 'About Us', 'Customer Service', 'Contact'].map((item) => (
                            <li key={item}>
                                <Link
                                    to={getLinkPath(item)}
                                    className="text-deep-maroon font-bold text-[0.95rem] tracking-[0.5px] uppercase relative group py-2"
                                >
                                    {item}
                                    <span className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#FF3366] to-[#FF5E3A] transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="flex gap-4 md:gap-5 items-center text-deep-maroon">
                        <button className="hover:text-primary-pink transition-colors text-xl hidden sm:block">🔍</button>
                        <button className="hover:text-primary-pink transition-colors text-xl hidden sm:block">❤️</button>
                        <Link to="/cart" className="relative hover:text-primary-pink transition-colors text-xl">
                            🛒
                            {cartQuantity > 0 && (
                                <span className="absolute -top-2 -right-2 bg-primary-pink text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">
                                    {cartQuantity}
                                </span>
                            )}
                        </Link>

                        {/* User Menu */}
                        {isAuthenticated ? (
                            <div className="relative">
                                <button
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                    className="hover:text-primary-pink transition-colors text-xl flex items-center gap-2"
                                >
                                    👤
                                    {currentUser && (
                                        <span className="hidden md:inline text-sm font-semibold">
                                            {currentUser.name?.split(' ')[0]}
                                        </span>
                                    )}
                                </button>

                                {/* Dropdown Menu */}
                                {showUserMenu && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border border-gray-200">
                                        <Link
                                            to="/profile"
                                            onClick={() => setShowUserMenu(false)}
                                            className="block px-4 py-2 text-sm text-deep-maroon hover:bg-gray-100 no-underline"
                                        >
                                            👤 My Profile
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-2 text-sm text-deep-maroon hover:bg-gray-100 border-t border-gray-100"
                                        >
                                            🚪 Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link to="/login" className="hover:text-primary-pink transition-colors text-xl">👤</Link>
                        )}
                    </div>
                </div>
            </nav>

            {/* Mobile Drawer */}
            <div className={`fixed inset-0 z-[1001] bg-black/50 transition-opacity duration-300 lg:hidden ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMenuOpen(false)}>
                <div className={`fixed top-0 left-0 w-[75%] max-w-[300px] h-full bg-white shadow-2xl p-8 transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`} onClick={(e) => e.stopPropagation()}>
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="font-playfair text-2xl font-bold text-deep-maroon">Menu</h2>
                        <button className="text-3xl text-gray-500 hover:text-deep-maroon cursor-pointer" onClick={() => setIsMenuOpen(false)}>×</button>
                    </div>
                    <ul className="flex flex-col gap-6 list-none p-0 m-0">
                        {['Home', 'Products', 'About Us', 'Customer Service', 'Contact'].map((item) => (
                            <li key={item}>
                                <Link
                                    to={getLinkPath(item)}
                                    className="text-deep-maroon text-lg font-semibold block border-b border-gray-100 pb-2 no-underline hover:text-primary-pink transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item}
                                </Link>
                            </li>
                        ))}

                        {/* Mobile User Menu */}
                        {isAuthenticated && (
                            <>
                                <li>
                                    <Link
                                        to="/profile"
                                        className="text-deep-maroon text-lg font-semibold block border-b border-gray-100 pb-2 no-underline hover:text-primary-pink transition-colors"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        👤 My Profile
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setIsMenuOpen(false);
                                        }}
                                        className="text-deep-maroon text-lg font-semibold block border-b border-gray-100 pb-2 hover:text-primary-pink transition-colors w-full text-left"
                                    >
                                        🚪 Logout
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Navbar;

