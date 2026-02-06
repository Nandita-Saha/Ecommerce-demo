# Rangeen - South Asian Fashion E-Commerce Platform

A modern full-stack e-commerce application built with **React**, **Redux Toolkit**, **Node.js**, **Express**, **MongoDB**, and **JWT Authentication**.

## 🌟 Features

### Frontend Features
- **Exact UI Replication**: Pixel-perfect design with smooth animations
- **State Management**: Redux Toolkit for products, categories, cart, and authentication
- **Shopping Cart**: 
  - Add to cart with specific colors and sizes
  - Cart persistence using localStorage
  - Real-time calculations for totals
  - Coupon system (Try code: `WOMEN10` for 10% off)
- **Routing**: Full navigation for all pages
- **Responsive Design**: Works on desktop, tablet, and mobile

### Backend Features (NEW! 🎉)
- **User Authentication**: 
  - JWT-based authentication
  - Secure password hashing with bcrypt
  - User registration and login
  - Protected routes
- **User Profile Management**:
  - View and edit profile
  - Update email, phone, password
  - Profile persistence
- **Security**:
  - Input validation and sanitization
  - Email and phone format validation
  - Password strength requirements
  - Protected API endpoints
- **Database**: MongoDB with Mongoose ODM

## 🛠 Tech Stack

### Frontend
- **Framework**: React 19 (Vite)
- **Styling**: Tailwind CSS 4
- **State**: Redux Toolkit + React Redux
- **Routing**: React Router DOM 7
- **Icons**: UTF-8 emojis + CSS shapes

### Backend
- **Runtime**: Node.js
- **Framework**: Express 5
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Security**: bcryptjs for password hashing
- **Validation**: Custom validation utilities

## 🚀 Quick Start

### Prerequisites
- Node.js installed
- MongoDB installed and running
- npm or yarn package manager

### Installation

1. **Clone the repository** (if applicable)
   ```bash
   cd full-stack
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set up Environment Variables**
   
   Make sure your `.env` file contains:
   ```env
   NODE_ENV=development
   MONGO_URI=mongodb://127.0.0.1:27017/ecommerce
   JWT_SECRET=your_super_secret_jwt_key_here
   PORT=5000
   ```

4. **Start MongoDB**
   - Ensure MongoDB is running on your system
   - Or open MongoDB Compass and connect to `mongodb://127.0.0.1:27017`

5. **Start the Backend Server**
   ```bash
   npm run server
   ```
   You should see:
   ```
   Server running on port 5000
   MongoDB Connected: 127.0.0.1
   ```

6. **Start the Frontend** (in a new terminal)
   ```bash
   npm run dev
   ```

7. **Open in Browser**
   Visit `http://localhost:5173`

## 📁 Project Structure

```
full-stack/
├── backend/
│   ├── config/
│   │   └── db.js                    # MongoDB connection
│   ├── controllers/
│   │   └── authController.js        # Authentication logic
│   ├── middleware/
│   │   ├── authMiddleware.js        # JWT verification
│   │   └── errorMiddleware.js       # Error handling
│   ├── models/
│   │   └── User.js                  # User schema
│   ├── routes/
│   │   └── userRoutes.js            # API routes
│   ├── utils/
│   │   ├── generateToken.js         # JWT generation
│   │   └── validation.js            # Input validation
│   └── server.js                    # Express server
│
├── src/
│   ├── components/
│   │   ├── Navbar.jsx               # Navigation with auth
│   │   ├── ProtectedRoute.jsx       # Route protection
│   │   └── ...                      # Other components
│   ├── pages/
│   │   ├── Auth.jsx                 # Login/Signup page
│   │   ├── UserProfile.jsx          # User profile page
│   │   ├── Checkout.jsx             # Checkout (protected)
│   │   └── ...                      # Other pages
│   ├── store/
│   │   ├── slices/
│   │   │   ├── authSlice.js         # Auth state
│   │   │   ├── cartSlice.js         # Cart state
│   │   │   └── ...                  # Other slices
│   │   └── store.js                 # Redux store
│   └── data/                        # Mock product data
│
├── .env                             # Environment variables
├── package.json                     # Dependencies
└── Documentation/
    ├── QUICK_START.md               # Quick start guide
    ├── AUTHENTICATION.md            # Auth API docs
    ├── TESTING_GUIDE.md             # Testing instructions
    ├── IMPLEMENTATION_SUMMARY.md    # What was implemented
    ├── ARCHITECTURE.md              # System architecture
    └── CHECKLIST.md                 # Verification checklist
```

## 🔐 Authentication Flow

1. **Sign Up**: Create an account with email, password, name, and phone
2. **Login**: Authenticate with email and password
3. **Protected Routes**: Checkout requires authentication
4. **Profile Management**: View and update your profile
5. **Logout**: Clear session and return to home

## 🛒 Shopping Flow

1. Browse products on the home page
2. View product details
3. Add items to cart (no login required)
4. View cart and apply coupons
5. Proceed to checkout (login required)
6. Complete purchase

## 🎫 Coupon Codes

- **WOMEN10**: Get 10% discount on your order

## 📚 Documentation

For detailed information, see:

- **[QUICK_START.md](./QUICK_START.md)** - Get started in 5 minutes
- **[AUTHENTICATION.md](./AUTHENTICATION.md)** - Complete API documentation
- **[TESTING_GUIDE.md](./TESTING_GUIDE.md)** - How to test the system
- **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - What was built
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System architecture diagrams
- **[CHECKLIST.md](./CHECKLIST.md)** - Verification checklist

## 🔒 Security Features

- ✅ JWT token-based authentication
- ✅ Password hashing with bcrypt
- ✅ Input validation and sanitization
- ✅ Protected API endpoints
- ✅ Email normalization
- ✅ Password strength requirements
- ✅ Secure token storage

## 🧪 Testing

See [TESTING_GUIDE.md](./TESTING_GUIDE.md) for comprehensive testing instructions.

Quick test:
1. Navigate to `/login`
2. Create an account
3. Try accessing `/checkout` - you should be logged in
4. Update your profile at `/profile`
5. Logout and login again

## 📝 API Endpoints

### Public
- `POST /api/users` - Register new user
- `POST /api/users/login` - Login user

### Protected (Require JWT Token)
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check connection string in `.env`
- Try connecting with MongoDB Compass

### PowerShell Execution Policy Error
Run in PowerShell as Administrator:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Port Already in Use
- Backend: Change `PORT` in `.env`
- Frontend: Vite will auto-select another port

## 🚀 Deployment

### Deploy to Render (Recommended - FREE Forever ✅)

**Render offers a truly free tier that doesn't expire!**

For detailed step-by-step instructions, see **[RENDER_DEPLOYMENT.md](./RENDER_DEPLOYMENT.md)**

**Quick Deploy:**
1. Push your code to GitHub
2. Create a Render account at https://render.com
3. Create a new Web Service from your GitHub repo
4. Add environment variables (see guide)
5. Deploy! 🚀

**Why Render?**
- ✅ FREE tier that lasts forever
- ✅ 750 hours/month (enough for 24/7 operation)
- ✅ Auto-deploy from GitHub
- ✅ Free SSL certificates
- ✅ Easy setup and configuration

### Alternative: Deploy to Railway

**Railway offers $5 free credit per month (not free forever)**

For detailed instructions, see **[RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md)**

### Deployment Comparison

| Feature | Render (Free) | Railway (Free Trial) |
|---------|---------------|---------------------|
| **Cost** | FREE forever ✅ | $5 credit/month |
| **Uptime** | Spins down after 15min | Always on (until credit runs out) |
| **Best For** | Long-term hosting | Testing/short-term |

### Production Checklist

Before deploying to either platform:
1. Set `NODE_ENV=production`
2. Use MongoDB Atlas (free tier)
3. Generate a strong `JWT_SECRET` (64+ characters)
4. Add environment variables to your platform
5. Test locally with production build: `npm run build && npm start`


## 🤝 Contributing

This is a personal e-commerce project. Feel free to fork and customize!

## 📄 License

This project is for educational and portfolio purposes.

## 🎉 What's New

### Version 2.0 (Latest)
- ✅ Full authentication system with JWT
- ✅ User registration and login
- ✅ Protected checkout route
- ✅ User profile management
- ✅ MongoDB integration
- ✅ Password security with bcrypt
- ✅ Input validation
- ✅ Enhanced navbar with user menu
- ✅ Comprehensive documentation

### Version 1.0
- React frontend with Redux
- Shopping cart functionality
- Product browsing
- Responsive design

---

**Built with ❤️ for South Asian Fashion Enthusiasts**

For questions or issues, refer to the documentation files or check the code comments.

