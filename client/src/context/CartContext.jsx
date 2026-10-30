import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { token, user } = useAuth();
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('fn_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState(null);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [orderType, setOrderType] = useState('delivery'); // 'delivery' or 'pickup'
  const [restaurantSource, setRestaurantSource] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('fn_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  const addItem = (item, sourceName = 'Food Network Culinary Hub', restaurantId = null) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.itemId === item.id || i.itemId === item._id || (i.name === item.name && i.price === item.price));
      if (existing) {
        return prev.map((i) =>
          (i.itemId === item.id || i.itemId === item._id || (i.name === item.name && i.price === item.price))
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [
        ...prev,
        {
          itemId: item.id || item._id || Date.now().toString(),
          name: item.name || item.title,
          price: Number(item.price) || 0,
          quantity: 1,
          image: item.image || item.coverImage,
          category: item.category || 'Dish',
          restaurantName: sourceName,
          restaurantId: restaurantId,
        },
      ];
    });

    if (sourceName) {
      setRestaurantSource({ name: sourceName, id: restaurantId });
    }
    setIsCartOpen(true);
  };

  const removeItem = (itemId) => {
    setCartItems((prev) => prev.filter((i) => i.itemId !== itemId));
  };

  const updateQuantity = (itemId, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.itemId === itemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const subtotal = Number(
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)
  );
  const tax = Number((subtotal * 0.0825).toFixed(2));
  const deliveryFee = orderType === 'delivery' && cartItems.length > 0 ? 3.99 : 0;
  const serviceFee = cartItems.length > 0 ? 2.49 : 0;
  const total = Number((subtotal + tax + deliveryFee + serviceFee).toFixed(2));

  const placeOrder = async (customerDetails, deliveryAddress) => {
    const orderPayload = {
      restaurantId: restaurantSource?.id || null,
      restaurantName: restaurantSource?.name || 'Food Network Culinary Market',
      orderType,
      customer: customerDetails,
      deliveryAddress: orderType === 'delivery' ? deliveryAddress : undefined,
      items: cartItems,
      paymentMethod: 'credit_card',
    };

    const res = await api.createOrder(orderPayload, token);
    if (res.success) {
      clearCart();
      setIsCartOpen(false);
      setActiveOrder(res.order);
      setIsTrackingModalOpen(true);
      return { success: true, order: res.order };
    }
    return { success: false, message: res.message };
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        subtotal,
        tax,
        deliveryFee,
        serviceFee,
        total,
        isCartOpen,
        setIsCartOpen,
        activeOrder,
        setActiveOrder,
        isTrackingModalOpen,
        setIsTrackingModalOpen,
        orderType,
        setOrderType,
        placeOrder,
        restaurantSource,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
