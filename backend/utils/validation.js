// Validation helper functions

// Validate email format
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Validate phone number (supports various formats)
export const isValidPhone = (phone) => {
    // Remove all non-digit characters
    const digitsOnly = phone.replace(/\D/g, '');
    // Check if it has 10-15 digits (international format)
    return digitsOnly.length >= 10 && digitsOnly.length <= 15;
};

// Validate password strength
export const validatePassword = (password) => {
    const errors = [];

    if (password.length < 6) {
        errors.push('Password must be at least 6 characters long');
    }

    if (!/[A-Z]/.test(password)) {
        errors.push('Password must contain at least one uppercase letter');
    }

    if (!/[a-z]/.test(password)) {
        errors.push('Password must contain at least one lowercase letter');
    }

    if (!/[0-9]/.test(password)) {
        errors.push('Password must contain at least one number');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

// Sanitize user input
export const sanitizeInput = (input) => {
    if (typeof input !== 'string') return input;
    return input.trim();
};
