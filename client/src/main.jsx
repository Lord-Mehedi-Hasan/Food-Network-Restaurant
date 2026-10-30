import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { MealPlanShoppingProvider } from './context/MealPlanShoppingContext';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <MealPlanShoppingProvider>
          <App />
        </MealPlanShoppingProvider>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>,
);
