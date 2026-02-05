import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/User.js';
import { isValidEmail, isValidPhone, validatePassword, sanitizeInput } from '../utils/validation.js';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        res.status(400);
        throw new Error('Please provide email and password');
    }

    // Sanitize email
    const sanitizedEmail = sanitizeInput(email).toLowerCase();

    // Validate email format
    if (!isValidEmail(sanitizedEmail)) {
        res.status(400);
        throw new Error('Please provide a valid email address');
    }

    const user = await User.findOne({ email: sanitizedEmail });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, phone } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please provide name, email, and password');
    }

    // Sanitize inputs
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email).toLowerCase();
    const sanitizedPhone = phone ? sanitizeInput(phone) : '';

    // Validate email format
    if (!isValidEmail(sanitizedEmail)) {
        res.status(400);
        throw new Error('Please provide a valid email address');
    }

    // Validate phone if provided
    if (sanitizedPhone && !isValidPhone(sanitizedPhone)) {
        res.status(400);
        throw new Error('Please provide a valid phone number');
    }

    // Validate password strength
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
        res.status(400);
        throw new Error(passwordValidation.errors.join(', '));
    }

    // Check if user already exists
    const userExists = await User.findOne({ email: sanitizedEmail });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists with this email');
    }

    // Create user
    const user = await User.create({
        name: sanitizedName,
        email: sanitizedEmail,
        password,
        phone: sanitizedPhone
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            isAdmin: user.isAdmin,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`,
            createdAt: user.createdAt
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        // Update fields if provided
        user.name = req.body.name ? sanitizeInput(req.body.name) : user.name;

        // Validate and update email
        if (req.body.email) {
            const sanitizedEmail = sanitizeInput(req.body.email).toLowerCase();
            if (!isValidEmail(sanitizedEmail)) {
                res.status(400);
                throw new Error('Please provide a valid email address');
            }

            // Check if email is already taken by another user
            const emailExists = await User.findOne({ email: sanitizedEmail, _id: { $ne: user._id } });
            if (emailExists) {
                res.status(400);
                throw new Error('Email already in use');
            }

            user.email = sanitizedEmail;
        }

        // Validate and update phone
        if (req.body.phone) {
            const sanitizedPhone = sanitizeInput(req.body.phone);
            if (!isValidPhone(sanitizedPhone)) {
                res.status(400);
                throw new Error('Please provide a valid phone number');
            }
            user.phone = sanitizedPhone;
        }

        // Update password if provided
        if (req.body.password) {
            const passwordValidation = validatePassword(req.body.password);
            if (!passwordValidation.isValid) {
                res.status(400);
                throw new Error(passwordValidation.errors.join(', '));
            }
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            phone: updatedUser.phone,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id),
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(updatedUser.name)}`
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

export { authUser, registerUser, getUserProfile, updateUserProfile };
