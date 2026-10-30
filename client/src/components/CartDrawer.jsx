import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Bike, 
  Store, 
  ShieldCheck, 
  CreditCard,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export const CartDrawer = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    tax,
    deliveryFee,
    serviceFee,
    total,
    orderType,
    setOrderType,
    placeOrder,
    restaurantSource,
  } = useCart();

  const { user } = useAuth();

  const [customerName, setCustomerName] = useState(user?.name || 'Sarah Jenkins');
  const [customerEmail, setCustomerEmail] = useState(user?.email || 'foodie@foodnetwork.com');
  const [customerPhone, setCustomerPhone] = useState('(555) 234-8901');
  const [streetAddress, setStreetAddress] = useState('742 Evergreen Terrace, Apt 4B');
  const [deliveryNotes, setDeliveryNotes] = useState('Please leave with doorman or ring buzzer 4B');
  const [isPlacing, setIsPlacing] = useState(false);

  if (!isCartOpen) return null;

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    setIsPlacing(true);
    try {
      await placeOrder(
        {
          name: customerName,
          email: customerEmail,
          phone: customerPhone,
        },
        {
          street: streetAddress,
          city: 'Culinary City',
          state: 'NY',
          zip: '10014',
          instructions: deliveryNotes,
        }
      );
    } catch (err) {
      console.error(err);
      alert('Error placing order');
    } finally {
      setIsPlacing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/70 backdrop-blur-sm animate-in fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-orange-600 flex items-center justify-center text-white">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900">Your Culinary Cart</h3>
                <p className="text-[11px] text-stone-500">
                  {restaurantSource?.name || 'Food Network Marketplace'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="p-5 overflow-y-auto flex-1 space-y-4">
            {cartItems.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-lg font-bold text-stone-800">Your Cart is Empty</h4>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Explore our digital restaurant menus, sommelier cellar wines, or artisan coffees to start ordering.
                </p>
              </div>
            ) : (
              <>
                {/* Order Type Toggle (Delivery vs Pickup) */}
                <div className="p-1 rounded-2xl bg-stone-100 grid grid-cols-2 gap-1 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setOrderType('delivery')}
                    className={`py-2 rounded-xl flex items-center justify-center gap-2 transition-all ${
                      orderType === 'delivery'
                        ? 'bg-white text-stone-900 shadow-sm'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    <Bike className="w-4 h-4 text-orange-600" />
                    <span>Delivery (30-40m)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('pickup')}
                    className={`py-2 rounded-xl flex items-center justify-center gap-2 transition-all ${
                      orderType === 'pickup'
                        ? 'bg-white text-stone-900 shadow-sm'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    <Store className="w-4 h-4 text-orange-600" />
                    <span>Pickup (15-20m)</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div
                      key={item.itemId}
                      className="p-3.5 rounded-2xl border border-stone-200 flex items-center justify-between gap-3 bg-stone-50/50"
                    >
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <h5 className="text-xs font-bold text-stone-900 truncate">{item.name}</h5>
                        <p className="text-[11px] text-orange-600 font-bold">${item.price.toFixed(2)}</p>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => updateQuantity(item.itemId, -1)}
                          className="w-7 h-7 rounded-lg bg-stone-200/80 hover:bg-stone-300 flex items-center justify-center text-stone-700"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-black w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.itemId, 1)}
                          className="w-7 h-7 rounded-lg bg-stone-200/80 hover:bg-stone-300 flex items-center justify-center text-stone-700"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => removeItem(item.itemId)}
                          className="text-stone-300 hover:text-red-500 p-1 ml-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivery Address Form */}
                {orderType === 'delivery' && (
                  <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
                      Delivery Destination
                    </span>
                    <input
                      type="text"
                      value={streetAddress}
                      onChange={(e) => setStreetAddress(e.target.value)}
                      placeholder="Street address & Apt"
                      className="w-full text-xs p-2 rounded-xl border border-stone-200 bg-white"
                      required
                    />
                    <input
                      type="text"
                      value={deliveryNotes}
                      onChange={(e) => setDeliveryNotes(e.target.value)}
                      placeholder="Delivery instructions (buzzer code, gate...)"
                      className="w-full text-xs p-2 rounded-xl border border-stone-200 bg-white"
                    />
                  </div>
                )}
              </>
            )}
          </div>

          {/* Drawer Footer & Checkout */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-stone-200 bg-stone-50 space-y-4">
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-stone-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax (8.25%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                {orderType === 'delivery' && (
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Service Fee</span>
                  <span>${serviceFee.toFixed(2)}</span>
                </div>

                {/* Monetization commission note */}
                <div className="pt-1.5 border-t border-stone-200/60 flex justify-between items-center text-[10px] text-stone-400">
                  <span>Platform Commission (12% to venue)</span>
                  <span className="text-emerald-700 font-bold">Included</span>
                </div>

                <div className="pt-2 border-t border-stone-200 flex justify-between text-sm font-black text-stone-900">
                  <span>Total Amount</span>
                  <span className="text-orange-600">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isPlacing}
                className="w-full py-3.5 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm shadow-lg shadow-orange-600/20 transition-all flex items-center justify-center gap-2"
              >
                <CreditCard className="w-4 h-4" />
                <span>{isPlacing ? 'Processing Order...' : `Place ${orderType === 'delivery' ? 'Delivery' : 'Pickup'} Order ($${total.toFixed(2)})`}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
