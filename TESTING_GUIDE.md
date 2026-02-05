# Testing Your Authentication System

## Prerequisites
Before testing, ensure:
1. ✅ MongoDB is installed and running on your system
2. ✅ MongoDB Compass is installed (optional, for viewing database)
3. ✅ All dependencies are installed: `npm install`

## Starting the Application

### Step 1: Start MongoDB
Make sure MongoDB is running on your system. You can check by:
- Opening MongoDB Compass and connecting to `mongodb://127.0.0.1:27017`
- Or running `mongod` in a terminal (if installed globally)

### Step 2: Start the Backend Server
Open a terminal in your project directory and run:
```bash
npm run server
```

You should see:
```
Server running on port 5000
MongoDB Connected: 127.0.0.1
```

### Step 3: Start the Frontend
Open another terminal in your project directory and run:
```bash
npm run dev
```

The frontend will start on `http://localhost:5173` (or another port)

## Testing the Authentication Flow

### Test 1: User Registration
1. Navigate to `http://localhost:5173/login`
2. Click on the "Sign Up" tab
3. Fill in the registration form:
   - **Name**: John Doe
   - **Email**: john@example.com
   - **Phone**: +91 9876543210
   - **Password**: SecurePass123 (must have uppercase, lowercase, and number)
   - **Confirm Password**: SecurePass123
4. Click "Create Account"
5. ✅ You should be automatically logged in and redirected to home page
6. ✅ Check the navbar - you should see your name and a user dropdown

### Test 2: User Login
1. Log out by clicking your name in the navbar and selecting "Logout"
2. Navigate to `/login`
3. Enter your credentials:
   - **Email**: john@example.com
   - **Password**: SecurePass123
4. Click "Login"
5. ✅ You should be logged in and redirected

### Test 3: Protected Routes
1. Log out if you're logged in
2. Try to navigate to `/checkout`
3. ✅ You should be redirected to `/login`
4. After logging in, you should be redirected back to `/checkout`

### Test 4: User Profile
1. Make sure you're logged in
2. Click your name in the navbar
3. Select "My Profile"
4. ✅ You should see your profile information
5. Click "Edit Profile"
6. Update your information (name, email, phone, or password)
7. Click "Save Changes"
8. ✅ Your profile should be updated

### Test 5: Shopping Flow
1. Log out
2. Browse products and add items to cart
3. Go to cart page - ✅ should work without login
4. Click "Proceed to Checkout"
5. ✅ You should be redirected to login
6. After logging in, you should be redirected to checkout page

## Testing with API Tools (Postman/Thunder Client)

### Register a New User
```
POST http://localhost:5000/api/users
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "+91 9876543211",
  "password": "SecurePass456"
}
```

Expected Response (201 Created):
```json
{
  "_id": "...",
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "+91 9876543211",
  "isAdmin": false,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "avatar": "https://ui-avatars.com/api/?name=Jane+Doe"
}
```

### Login
```
POST http://localhost:5000/api/users/login
Content-Type: application/json

{
  "email": "jane@example.com",
  "password": "SecurePass456"
}
```

### Get User Profile (Protected)
```
GET http://localhost:5000/api/users/profile
Authorization: Bearer <your_jwt_token_here>
```

### Update User Profile (Protected)
```
PUT http://localhost:5000/api/users/profile
Authorization: Bearer <your_jwt_token_here>
Content-Type: application/json

{
  "name": "Jane Updated",
  "phone": "+91 9876543212"
}
```

## Verifying in MongoDB Compass

1. Open MongoDB Compass
2. Connect to `mongodb://127.0.0.1:27017`
3. Select the `ecommerce` database
4. Click on the `users` collection
5. ✅ You should see all registered users
6. ✅ Passwords should be hashed (not plain text)
7. ✅ Emails should be in lowercase

## Common Issues and Solutions

### Issue: "Cannot connect to MongoDB"
**Solution**: 
- Make sure MongoDB is running
- Check if the connection string in `.env` is correct
- Try connecting with MongoDB Compass first

### Issue: "JWT_SECRET is not defined"
**Solution**: 
- Check your `.env` file
- Make sure `JWT_SECRET` is set
- Restart the backend server after updating `.env`

### Issue: "User already exists"
**Solution**: 
- This email is already registered
- Try a different email or login with existing credentials
- Or delete the user from MongoDB Compass and try again

### Issue: "Invalid email or password"
**Solution**: 
- Check if you're using the correct credentials
- Email is case-insensitive (stored as lowercase)
- Password is case-sensitive

### Issue: "Password validation failed"
**Solution**: 
- Password must be at least 6 characters
- Must contain at least one uppercase letter
- Must contain at least one lowercase letter
- Must contain at least one number

### Issue: PowerShell execution policy error
**Solution**: 
Run this command in PowerShell as Administrator:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## Expected Behavior Checklist

- ✅ Users can register with valid information
- ✅ Duplicate emails are rejected
- ✅ Weak passwords are rejected
- ✅ Users can log in with correct credentials
- ✅ Wrong credentials are rejected
- ✅ JWT tokens are generated on login/register
- ✅ Tokens are stored in localStorage
- ✅ Protected routes redirect to login when not authenticated
- ✅ Users are redirected back after login
- ✅ User can view their profile
- ✅ User can update their profile
- ✅ User can change their password
- ✅ User can logout
- ✅ Navbar shows user name when logged in
- ✅ Navbar shows login link when not logged in
- ✅ Cart works without authentication
- ✅ Checkout requires authentication

## Next Steps

After testing, you can:
1. Add more users through the signup form
2. Test the complete shopping flow (browse → cart → checkout)
3. Customize the authentication UI in `Auth.jsx`
4. Add more protected routes as needed
5. Implement additional features like password reset, email verification, etc.

## Need Help?

If you encounter any issues:
1. Check the browser console for errors
2. Check the backend terminal for server errors
3. Verify MongoDB is running and connected
4. Check the `.env` file for correct configuration
5. Refer to `AUTHENTICATION.md` for detailed API documentation
