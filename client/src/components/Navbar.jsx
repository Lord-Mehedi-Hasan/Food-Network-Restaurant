import React, { useState } from 'react';
import { 
  UtensilsCrossed, 
  BookOpen, 
  Wine, 
  Calendar, 
  ShoppingCart, 
  Crown, 
  User, 
  LogOut, 
  Menu, 
  X,
  Search,
  Sparkles,
  BarChart3
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export const Navbar = ({ activeTab, setActiveTab, onOpenSearch }) => {
  const { user, isPremium, logout, setIsAuthModalOpen, setIsChefClubModalOpen } = useAuth();
  const { cartItems, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { id: 'restaurants', label: 'Restaurants & Dining', icon: UtensilsCrossed, badge: '🍽️ Reservations & Delivery' },
    { id: 'recipes', label: 'Recipes & Cooking', icon: BookOpen, badge: '🍳 Home Cooks' },
    { id: 'beverages', label: 'Beverages & Drinks', icon: Wine, badge: '☕ Cocktails & Cellar' },
    { id: 'planner', label: 'Meal Planner & Shopping', icon: Calendar },
    { id: 'admin', label: 'Partner & Analytics', icon: BarChart3, badge: 'Admin' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-nav border-b border-stone-200/80 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div 
            onClick={() => setActiveTab('restaurants')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-600 via-amber-500 to-amber-400 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <UtensilsCrossed className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-2xl font-black tracking-tight text-stone-900 group-hover:text-orange-600 transition-colors">
                  FOOD NETWORK
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-orange-100 text-orange-700">
                  RESTAURANT & HUB
                </span>
              </div>
              <p className="text-xs text-stone-500 hidden sm:block">
                Culinary Recipes • Dining Reservations • Craft Cellar
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/30'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-stone-400'}`} />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & Auth */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Live Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-xl transition-colors"
              title="Search recipes, restaurants & beverages"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Chef Club Premium Button */}
            <button
              onClick={() => setIsChefClubModalOpen(true)}
              className={`hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                isPremium
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-stone-950 shadow-sm border border-yellow-300'
                  : 'bg-stone-900 hover:bg-orange-600 text-white shadow-sm hover:shadow-orange-500/20'
              }`}
            >
              <Crown className={`w-4 h-4 ${isPremium ? 'text-stone-950 fill-stone-950' : 'text-amber-400'}`} />
              <span>{isPremium ? 'Chef Club VIP' : 'Join Chef Club'}</span>
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 text-stone-700 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all"
              title="View Cart & Orders"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-600 text-white font-bold text-xs rounded-full flex items-center justify-center shadow-sm badge-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Profile / Auth Button */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-stone-100 transition-colors"
                >
                  <img
                    src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-orange-500/30"
                  />
                  <span className="text-xs font-bold text-stone-800 hidden md:block max-w-[100px] truncate">
                    {user.name}
                  </span>
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-stone-200 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-2 border-b border-stone-100">
                      <p className="text-xs font-semibold text-stone-900 truncate">{user.name}</p>
                      <p className="text-[11px] text-stone-500 truncate">{user.email}</p>
                      <div className="mt-1 flex items-center gap-1.5">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isPremium ? 'bg-amber-100 text-amber-800' : 'bg-stone-100 text-stone-600'
                        }`}>
                          {isPremium ? '⭐ Chef Club Member' : 'Free Account'}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setActiveTab('planner');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-xs text-stone-700 hover:bg-orange-50 hover:text-orange-600 flex items-center gap-2"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>My Meal Plan & Shopping List</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('admin');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-xs text-stone-700 hover:bg-orange-50 hover:text-orange-600 flex items-center gap-2"
                    >
                      <BarChart3 className="w-4 h-4" />
                      <span>Platform Metrics & Orders</span>
                    </button>

                    <div className="border-t border-stone-100 my-1"></div>

                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-xs text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-stone-100 hover:bg-stone-200 text-stone-800 transition-colors"
              >
                <User className="w-4 h-4" />
                <span>Sign In</span>
              </button>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-600 hover:text-stone-900 rounded-xl"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white/95 px-4 py-3 space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  setActiveTab(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold ${
                  isActive ? 'bg-orange-500 text-white' : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </div>
                {link.badge && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-600'
                  }`}>
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}
          <div className="pt-2">
            <button
              onClick={() => {
                setIsChefClubModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 flex items-center justify-center gap-2"
            >
              <Crown className="w-4 h-4" />
              <span>Join Chef Club (Ad-Free & Masterclasses)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
