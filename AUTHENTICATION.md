# Authentication System Documentation

## Overview
This e-commerce application features a robust JWT-based authentication system with MongoDB as the database. Users must sign up or log in before proceeding to checkout.

## Features

### ✅ Implemented Features
1. **User Registration**
   - Email validation
   - Password strength validation (minimum 6 characters, must contain uppercase, lowercase, and number)
   - Phone number validation
   - Duplicate email prevention
   - Automatic password hashing with bcrypt

2. **User Login**
   - Email and password authentication
   - JWT token generation (30-day expiration)
   - Secure password comparison

3. **Protected Routes**
   - Checkout page requires authentication
   - User profile page requires authentication
   - Automatic redirect to login page with return URL

4. **User Profile Management**
   - View profile information
   - Update name, email, phone
   - Change password
   - Email uniqueness validation on update

5. **Security Features**
   - JWT token-based authentication
   - Password hashing with bcrypt (salt rounds: 10)
   - Input sanitization
   - Email normalization (lowercase)
   - Protected API endpoints with middleware

## API Endpoints

### Public Endpoints

#### Register User
```
POST /api/users
Content-Type: application/json

Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 9876543210",
  "password": "SecurePass123"
}

Response:
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 9876543210",
  "isAdmin": false,
  "token": "jwt_token_here",
  "avatar": "https://ui-avatars.com/api/?name=John+Doe"
}
```

#### Login User
```
POST /api/users/login
Content-Type: application/json

Body:
{
  "email": "john@example.com",
  "password": "SecurePass123"
}

Response:
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 9876543210",
  "isAdmin": false,
  "token": "jwt_token_here",
  "avatar": "https://ui-avatars.com/api/?name=John+Doe"
}
```

### Protected Endpoints (Require JWT Token)

#### Get User Profile
```
GET /api/users/profile
Authorization: Bearer <jwt_token>

Response:
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 9876543210",
  "isAdmin": false,
  "avatar": "https://ui-avatars.com/api/?name=John+Doe",
  "createdAt": "2026-02-05T09:30:00.000Z"
}
```

#### Update User Profile
```
PUT /api/users/profile
Authorization: Bearer <jwt_token>
Content-Type: application/json

Body:
{
  "name": "John Updated",
  "email": "john.updated@example.com",
  "phone": "+91 9876543211",
  "password": "NewSecurePass123"  // optional
}

Response:
{
  "_id": "user_id",
  "name": "John Updated",
  "email": "john.updated@example.com",
  "phone": "+91 9876543211",
  "isAdmin": false,
  "token": "new_jwt_token_here",
  "avatar": "https://ui-avatars.com/api/?name=John+Updated"
}
```

## Frontend Routes

- `/login` - Login and signup page
- `/profile` - User profile page (protected)
- `/checkout` - Checkout page (protected)

## Environment Variables

Make sure your `.env` file contains:

```env
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/ecommerce
JWT_SECRET=your_super_secret_jwt_key_here
PORT=5000
```

## Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique, lowercase, trimmed),
  password: String (required, hashed),
  phone: String (optional, trimmed),
  isAdmin: Boolean (default: false),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

## Password Requirements

- Minimum 6 characters
- At least one uppercase letter (A-Z)
- At least one lowercase letter (a-z)
- At least one number (0-9)

## How to Use

### Starting the Backend Server

```bash
npm run server
```

The backend will run on `http://localhost:5000`

### Starting the Frontend

```bash
npm run dev
```

The frontend will run on `http://localhost:5173` (or another port if 5173 is busy)

### Testing the Authentication Flow

1. **Sign Up**
   - Navigate to `/login`
   - Click on "Sign Up" tab
   - Fill in the registration form
   - Submit to create an account
   - You'll be automatically logged in and redirected

2. **Login**
   - Navigate to `/login`
   - Enter your email and password
   - Submit to log in
   - You'll be redirected to the page you came from or home

3. **Access Protected Routes**
   - Try to access `/checkout` without logging in
   - You'll be redirected to `/login`
   - After logging in, you'll be sent back to `/checkout`

4. **View/Update Profile**
   - After logging in, navigate to `/profile`
   - View your profile information
   - Click "Edit Profile" to update your details
   - Save changes to update your profile

5. **Logout**
   - Click the logout button in the navigation
   - Your session will be cleared
   - You'll be logged out

## MongoDB Compass Connection

To view your database in MongoDB Compass:

1. Open MongoDB Compass
2. Connect to: `mongodb://127.0.0.1:27017`
3. Select the `ecommerce` database
4. View the `users` collection

## Security Best Practices Implemented

1. ✅ Passwords are hashed using bcrypt before storage
2. ✅ JWT tokens expire after 30 days
3. ✅ Email addresses are normalized to lowercase
4. ✅ Input sanitization to prevent injection attacks
5. ✅ Protected routes require valid JWT tokens
6. ✅ Password strength validation
7. ✅ Email and phone format validation
8. ✅ Duplicate email prevention

## Error Handling

The system provides clear error messages for:
- Invalid credentials
- Duplicate email registration
- Invalid email format
- Weak passwords
- Invalid phone numbers
- Missing required fields
- Unauthorized access attempts
- Token expiration

## Future Enhancements (Optional)

- Email verification
- Password reset functionality
- OAuth integration (Google, Facebook)
- Two-factor authentication
- Session management
- Remember me functionality
- Account deletion
- Admin dashboard

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally
- Check if the connection string in `.env` is correct
- Verify MongoDB is running on port 27017

### JWT Token Issues
- Ensure JWT_SECRET is set in `.env`
- Check if the token is being sent in the Authorization header
- Verify token hasn't expired

### CORS Issues
- Backend has CORS enabled for all origins in development
- For production, configure specific allowed origins

## Support

For issues or questions, please check:
1. MongoDB is running
2. Environment variables are set correctly
3. All dependencies are installed (`npm install`)
4. Backend server is running on port 5000
5. Frontend is running and can connect to backend
