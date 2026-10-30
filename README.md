# Food Network Restaurant & Culinary Platform 🍳🍽️☕

A comprehensive, production-grade **MERN Stack (MongoDB, Express, React, Node.js)** platform created for **Food Network Restaurant**. The platform unifies the three essential food & drink subcategories into an interconnected culinary ecosystem with integrated multi-channel monetization.

---

## 🌟 The Three Core Pillars & Functions

### 1. 🍳 Recipes & Cooking Sites
*Designed for home cooks seeking step-by-step culinary guidance, interactive meal planning, and kitchen tools.*
- **Unified Recipe Search & Filters**: Search across ingredients, dietary restrictions (Vegan, Keto, Gluten-Free, Halal), preparation time, difficulty (Easy, Medium, Master Chef), and cuisine (Italian, French, Japanese, Korean, American).
- **Interactive Step-by-Step Cooking Mode**:
  - Live digital countdown timer with start, pause, reset, and visual/audio alert upon completion.
  - Interactive checkboxes to mark each step done.
  - Servings scaler (auto-scales all ingredient amounts dynamically for 2x, 4x, etc.).
  - Embedded 4K video masterclasses from TV and Michelin-trained chefs.
- **Weekly Meal Planner**: 7-day visual calendar grid (Monday–Sunday) across Breakfast, Lunch, Dinner, and Snacks. Assign any recipe with 1 click.
- **Smart Shopping List Builder**: Auto-populates ingredients from any recipe into categorized supermarket aisles (Produce, Meat & Seafood, Dairy, Bakery, Pantry, Spices). Features item checkoff, custom item creation, and 1-click clipboard export.
- **Monetization Engine**:
  - **Display Ad Banners**: Responsive promotional showcases with one-click suppression for premium subscribers.
  - **Affiliate Kitchen Tools**: Embedded product carousels with direct affiliate links (e.g. Lodge Cast Iron Skillets, KitchenAid Stand Mixers, Le Creuset Dutch Ovens).
  - **Chef Club VIP Subscription**: $9.99/mo or $79.99/yr paywall unlocking exclusive Master Chef recipes (e.g. Valrhona Molten Lava Cake), 100% ad-free cooking, and 15% cellar discounts.

---

### 2. 🍽️ Restaurant & Dining Platforms
*Connecting diners with physical food establishments, discovering menus, reserving tables, and ordering meals.*
- **Interactive Digital Menus**: Tabbed categories (Chef Specialties, Handcrafted Pastas, Wood-Fired, Appetizers, Desserts), spice level indicators, dietary badges, allergen tags, and one-click "Add to Order".
- **Real-Time Table Reservation System**:
  - Select party size (1–12+ guests), reservation date, and available time slots.
  - Choose seating zones: Main Dining Room, Glasshouse Patio, Chef's Counter, or Private Wine Cellar.
  - Instant confirmation code generation (e.g. `FN-RES-883912`) and email notice.
- **Verified Diner Reviews**: Star ratings, photos, user comments, and dish recommendations.
- **Online Food Ordering (Delivery & Pickup)**: Full cart slide-over with item customization, delivery fee calculation, and order tracking.
- **Live Order Tracking Pipeline**:
  - Visual status progress: `Order Received` ➔ `Kitchen Preparing` ➔ `Out for Delivery` ➔ `Delivered`.
  - Built-in simulator controls allowing testers and evaluators to advance order stages in real time.
- **Monetization Engine**:
  - **Marketplace Commission Fee**: Transparent 12% platform fee calculated on all dining orders.
  - **Featured Partner Listings**: Verified badges and promotional placement for premier restaurants.

---

### 3. ☕ Beverages & Drinks
*Split between educational mixology/sommelier knowledge and direct-to-consumer e-commerce.*
- **Craft Cocktail Mixology Database**:
  - Filter by spirit base (Bourbon, Gin, Tequila, Mezcal, Vodka, Zero-Proof).
  - ABV indicators, appropriate glassware, flavor profile tags (Smoky, Floral, Citrus, Oaked).
  - Step-by-step mixology steps and champion bartender pro-tips.
- **Wine & Sommelier Cellar Guide**:
  - Sensory tasting notes matrix (Aroma, Acidity, Body, Tannin, Finish).
  - Recommended recipe food pairings matching platform dishes.
  - **Direct-to-Consumer (D2C) E-Commerce**: Order rare estate bottles (e.g. 2019 Rutherford Reserve Cabernet $89, 2021 Domaine Pinot Noir $64) directly to your door with temperature-controlled shipping.
- **Artisan Coffee & Tea**:
  - Micro-lot single-origin beans (Ethiopian Yirgacheffe, Kyoto Uji Ceremonial Matcha).
  - Brewing ratio recipes (Chemex, V60, Chawan whisking).
  - Direct bag & tin checkout.
- **Monetization Engine**:
  - **Subscription Boxes**: Recurring monthly clubs (The Grand Sommelier Wine Vault $89/mo, Coffee Roasters Vault $34/mo, Craft Mixologist Crate $48/mo) with instant join flow and membership IDs.
  - **Culinary Event Ticketing**: Ticket passes for live tastings (Napa Valley Grand Tasting Gala $125, Mixology Smoke Masterclass $75) with seat allocation and digital ticket codes.

---

### 4. 📊 Partner & Administrative Portal
- Real-time platform metrics:
  - **Gross Merchandise Value (GMV)** ($)
  - **12% Dining Order Commissions Earned** ($)
  - **Chef Club Monthly Recurring Revenue (MRR)** ($)
  - **Active Table Reservations Count**
- **Live Order Pipeline Manager**: Change order status on the backend (`received` ➔ `preparing` ➔ `on_the_way` ➔ `delivered`) to observe real-time tracker reactions.

---

## 🛠️ Architecture & Tech Stack

```
Food Network Restaurant/
├── server/                    # Node.js + Express + MongoDB (Port 5000)
│   ├── src/
│   │   ├── config/db.js       # MongoDB Mongoose connection
│   │   ├── models/            # User, Recipe, Restaurant, Reservation, Order, Beverage, SubscriptionBox, Event
│   │   ├── routes/            # authRoutes, recipeRoutes, restaurantRoutes, reservationRoutes, orderRoutes, beverageRoutes, adminRoutes, userRoutes
│   │   ├── middleware/auth.js # JWT authentication & role authorization
│   │   └── seed/              # Realistic culinary seed data & seedRunner.js
│   ├── .env                   # Port, MongoDB URI, JWT Secret
│   └── index.js               # Express application entry point
├── client/                    # React 19 + Vite + Tailwind CSS (Port 5173)
│   ├── src/
│   │   ├── components/        # Navbar, HeroBanner, RecipeModal, RestaurantModal, BeverageSection, MealPlannerView, ShoppingListView, CartDrawer, OrderTrackingModal, ChefClubModal, AuthModal, AdminPartnerPortal, Footer
│   │   ├── context/           # AuthContext, CartContext, MealPlanShoppingContext
│   │   ├── services/api.js    # API service connecting to backend
│   │   ├── App.jsx            # Main app coordinator
│   │   └── main.jsx           # Root providers setup
│   └── tailwind.config.js     # Custom culinary palette & fonts
└── package.json               # Root scripts
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js** (v18+ recommended)
- **MongoDB** (running on `mongodb://127.0.0.1:27017/food_network_db`)

### 1. Database Seeding (Already Pre-populated!)
```bash
cd server
npm run seed
```

### 2. Start Backend Server
```bash
cd server
node index.js
# Server running at http://localhost:5000
```

### 3. Start Frontend Client
```bash
cd client
npm run dev
# Frontend accessible at http://localhost:5173
```

---

## 🔑 Demo Personas (1-Click Switcher in Auth Modal)

Click **"Sign In"** in the top navigation to switch personas instantly:

| Persona | Email | Password | Role / Perks |
|---|---|---|---|
| **Sarah Jenkins** | `foodie@foodnetwork.com` | `password123` | **Chef Club VIP Member** (Ad-free, active meal plan, unlocked masterclasses) |
| **Chef Marco Bellini** | `chef@foodnetwork.com` | `password123` | **Restaurant Partner & Master Chef** |
| **Alex Rivera** | `admin@foodnetwork.com` | `password123` | **Platform Admin** (Director of Culinary Operations) |
