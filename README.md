# Rangeen - South Asian Fashion Boutique (React Version)

This is a modern e-commerce frontend built with **React (+Vite)**, **Redux Toolkit**, and **Tailwind CSS**, based on the original HTML design.

## 🚀 Features implemented

- **Exact UI Replication**: Matches the original HTML design pixel-perfectly including animations.
- **State Management**: Uses **Redux Toolkit** for managing products, categories, and cart state.
- **Cart System**: 
  - Add to cart with specific colors and sizes.
  - Cart persistence using `localStorage`.
  - Real-time calculations for totals.
  - Coupon system (Try code: `WOMEN10` for 10% off).
- **Routing**: Full navigation for Home, Product Details, and Cart pages.
- **Mock Data**: JSON-based mock database with real image URLs from Unsplash.

## 🛠 Tech Stack

- **Framework**: React 18 (Vite)
- **Styling**: Tailwind CSS 3
- **State**: Redux Toolkit + React Redux
- **Routing**: React Router DOM 6
- **Icons**: Standard UTF-8 emojis (as per original design) + CSS shapes.

## 🏃‍♂️ How to Run

1. **Install Dependencies** (if you haven't already):
   ```bash
   npm install
   ```

2. **Start the Development Server**:
   ```bash
   npm run dev
   ```

3. **Open in Browser**:
   Visit `http://localhost:5173`

## 📁 Project Structure

```
src/
 ├── components/       # Reusable UI components (Navbar, ProductCard, etc.)
 ├── pages/            # Page components (Home, ProductDetails, Cart)
 ├── store/            # Redux setup
 │    ├── slices/      # Redux slices (cart, products, categories)
 │    └── store.js     # Main store configuration
 ├── data/             # Mock JSON data
 └── index.css         # Tailwind directives and custom animations
```

## 🎫 Coupon Codes

- **WOMEN10**: Get 10% discount on your order.
