import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserProfile, updateUserProfile, selectCurrentUser, selectAuthLoading, selectAuthError } from '../store/slices/authSlice';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const UserProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(selectCurrentUser);
    const isLoading = useSelector(selectAuthLoading);
    const error = useSelector(selectAuthError);

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                password: '',
                confirmPassword: ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password && formData.password !== formData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        const updateData = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone
        };

        if (formData.password) {
            updateData.password = formData.password;
        }

        const result = await dispatch(updateUserProfile(updateData));
        if (updateUserProfile.fulfilled.match(result)) {
            alert('Profile updated successfully!');
            setIsEditing(false);
            setFormData({ ...formData, password: '', confirmPassword: '' });
        } else {
            alert(result.payload || 'Failed to update profile');
        }
    };

    return (
        <>
            <Navbar />
            <div style={{
                minHeight: '100vh',
                padding: '80px 20px 40px',
                backgroundColor: '#f5f5f5'
            }}>
                <div style={{
                    maxWidth: '800px',
                    margin: '0 auto',
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    padding: '40px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '30px'
                    }}>
                        <h1 style={{
                            fontSize: '2rem',
                            fontWeight: 'bold',
                            color: '#333'
                        }}>
                            My Profile
                        </h1>
                        {!isEditing && (
                            <button
                                onClick={() => setIsEditing(true)}
                                style={{
                                    padding: '10px 24px',
                                    backgroundColor: '#FF006E',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontWeight: '600'
                                }}
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>

                    {error && (
                        <div style={{
                            padding: '12px',
                            backgroundColor: '#fee',
                            color: '#c33',
                            borderRadius: '6px',
                            marginBottom: '20px'
                        }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '24px' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '8px',
                                fontWeight: '600',
                                color: '#555'
                            }}>
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                disabled={!isEditing}
                                required
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    border: '1px solid #ddd',
                                    borderRadius: '6px',
                                    fontSize: '1rem',
                                    backgroundColor: isEditing ? 'white' : '#f9f9f9'
                                }}
                            />
                        </div>

                        <div style={{ marginBottom: '24px' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '8px',
                                fontWeight: '600',
                                color: '#555'
                            }}>
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                disabled={!isEditing}
                                required
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    border: '1px solid #ddd',
                                    borderRadius: '6px',
                                    fontSize: '1rem',
                                    backgroundColor: isEditing ? 'white' : '#f9f9f9'
                                }}
                            />
                        </div>

                        <div style={{ marginBottom: '24px' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '8px',
                                fontWeight: '600',
                                color: '#555'
                            }}>
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                disabled={!isEditing}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    border: '1px solid #ddd',
                                    borderRadius: '6px',
                                    fontSize: '1rem',
                                    backgroundColor: isEditing ? 'white' : '#f9f9f9'
                                }}
                            />
                        </div>

                        {isEditing && (
                            <>
                                <div style={{ marginBottom: '24px' }}>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '8px',
                                        fontWeight: '600',
                                        color: '#555'
                                    }}>
                                        New Password (leave blank to keep current)
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter new password"
                                        style={{
                                            width: '100%',
                                            padding: '12px',
                                            border: '1px solid #ddd',
                                            borderRadius: '6px',
                                            fontSize: '1rem'
                                        }}
                                    />
                                </div>

                                <div style={{ marginBottom: '24px' }}>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '8px',
                                        fontWeight: '600',
                                        color: '#555'
                                    }}>
                                        Confirm New Password
                                    </label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Confirm new password"
                                        style={{
                                            width: '100%',
                                            padding: '12px',
                                            border: '1px solid #ddd',
                                            borderRadius: '6px',
                                            fontSize: '1rem'
                                        }}
                                    />
                                </div>
                            </>
                        )}

                        {isEditing && (
                            <div style={{
                                display: 'flex',
                                gap: '12px',
                                marginTop: '32px'
                            }}>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    style={{
                                        flex: 1,
                                        padding: '14px',
                                        backgroundColor: '#FF006E',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '6px',
                                        cursor: isLoading ? 'not-allowed' : 'pointer',
                                        fontWeight: '600',
                                        fontSize: '1rem'
                                    }}
                                >
                                    {isLoading ? 'Saving...' : 'Save Changes'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsEditing(false);
                                        setFormData({
                                            name: user.name || '',
                                            email: user.email || '',
                                            phone: user.phone || '',
                                            password: '',
                                            confirmPassword: ''
                                        });
                                    }}
                                    style={{
                                        flex: 1,
                                        padding: '14px',
                                        backgroundColor: '#6c757d',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                        fontWeight: '600',
                                        fontSize: '1rem'
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                    </form>

                    {user && (
                        <div style={{
                            marginTop: '40px',
                            paddingTop: '24px',
                            borderTop: '1px solid #e0e0e0'
                        }}>
                            <h3 style={{
                                fontSize: '1.2rem',
                                marginBottom: '12px',
                                color: '#555'
                            }}>
                                Account Information
                            </h3>
                            <p style={{ color: '#777', marginBottom: '8px' }}>
                                <strong>Account Type:</strong> {user.isAdmin ? 'Admin' : 'Customer'}
                            </p>
                            {user.createdAt && (
                                <p style={{ color: '#777' }}>
                                    <strong>Member Since:</strong> {new Date(user.createdAt).toLocaleDateString()}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default UserProfile;
