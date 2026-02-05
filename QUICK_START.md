# 🚀 Quick Start Guide

## Prerequisites
- ✅ MongoDB installed and running
- ✅ Node.js installed
- ✅ All dependencies installed (`npm install`)

## Starting Your Application

### Option 1: Using Two Terminals (Recommended)

**Terminal 1 - Backend:**
```bash
npm run server
```
Expected output:
```
Server running on port 5000
MongoDB Connected: 127.0.0.1
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```
Expected output:
```
VITE v7.x.x ready in xxx ms
➜ Local: http://localhost:5173/
```

### Option 2: If PowerShell Execution Policy Error

If you get "running scripts is disabled" error, run this **once** in PowerShell as Administrator:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Then try the commands again.

## First Time Setup

1. **Open your browser** to `http://localhost:5173`

2. **Create an account:**
   - Click the user icon (👤) in the navbar
   - Click "Sign Up" tab
   - Fill in:
     - Name: Your Name
     - Email: your@email.com
     - Phone: +91 9876543210
     - Password: Test123 (must have uppercase, lowercase, number)
     - Confirm Password: Test123
   - Click "Create Account"

3. **You're logged in!** 
   - Notice your name appears in the navbar
   - Click your name to see profile options

## Testing the Flow

1. **Browse products** on the home page
2. **Add items to cart** (no login required)
3. **View cart** (no login required)
4. **Click "Proceed to Checkout"**
   - If not logged in → redirected to login
   - After login → back to checkout ✅

## Quick Commands Reference

```bash
# Start backend server
npm run server

# Start frontend dev server
npm run dev

# Build for production
npm run build

# Install dependencies (if needed)
npm install
```

## Checking MongoDB

1. Open **MongoDB Compass**
2. Connect to: `mongodb://127.0.0.1:27017`
3. Select database: `ecommerce`
4. View collection: `users`
5. You should see your registered users with hashed passwords

## Common Issues

### "Cannot connect to MongoDB"
→ Make sure MongoDB is running. Start it with `mongod` or MongoDB Compass.

### "Port 5000 already in use"
→ Another app is using port 5000. Change `PORT` in `.env` file.

### "Port 5173 already in use"
→ Vite will automatically use another port (5174, 5175, etc.)

### "Invalid email or password"
→ Remember: email is case-insensitive, password is case-sensitive

## What's Protected?

- ✅ `/checkout` - Requires login
- ✅ `/profile` - Requires login
- ❌ Everything else is public

## Key Features to Test

1. ✅ Sign up with new account
2. ✅ Login with existing account
3. ✅ View/edit profile
4. ✅ Change password
5. ✅ Logout
6. ✅ Try accessing checkout without login
7. ✅ Add to cart without login
8. ✅ Complete purchase flow

## File Structure

```
backend/
├── config/db.js              # MongoDB connection
├── controllers/
│   └── authController.js     # Auth logic (enhanced)
├── middleware/
│   ├── authMiddleware.js     # JWT verification (NEW)
│   └── errorMiddleware.js    # Error handling
├── models/User.js            # User schema (enhanced)
├── routes/userRoutes.js      # API routes (enhanced)
├── utils/
│   ├── generateToken.js      # JWT generation
│   └── validation.js         # Input validation (NEW)
└── server.js                 # Express server

src/
├── components/
│   ├── Navbar.jsx            # With auth menu (enhanced)
│   └── ProtectedRoute.jsx    # Route protection
├── pages/
│   ├── Auth.jsx              # Login/Signup page
│   └── UserProfile.jsx       # Profile page (NEW)
├── store/slices/
│   └── authSlice.js          # Auth state (enhanced)
└── App.jsx                   # Routes (enhanced)
```

## Environment Variables

Your `.env` file should have:
```env
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/ecommerce
JWT_SECRET=your_super_secret_key_here
PORT=5000
```

## Need More Help?

📖 **Detailed Documentation:**
- `AUTHENTICATION.md` - Complete API docs
- `TESTING_GUIDE.md` - Detailed testing steps
- `IMPLEMENTATION_SUMMARY.md` - What was changed

## You're Ready! 🎉

Your authentication system is fully functional. Start the servers and begin testing!

```bash
# Terminal 1
npm run server

# Terminal 2  
npm run dev
```

Then open `http://localhost:5173` and enjoy! 🚀
