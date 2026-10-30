import React, { useState } from 'react';
import { UtensilsCrossed, Heart, ShieldCheck, Mail, Check } from 'lucide-react';

export const Footer = ({ setActiveTab }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="mt-20 border-t border-stone-200 bg-white text-stone-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-orange-600 flex items-center justify-center text-white font-bold">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <span className="font-serif text-lg font-black text-stone-900 tracking-tight">
                FOOD NETWORK
              </span>
            </div>
            <p className="text-xs text-stone-500 leading-relaxed">
              The premier culinary ecosystem uniting home cooking guidance, professional restaurant dining & table reservations, and artisan cellar beverages.
            </p>
          </div>

          {/* Pillar 1 & 2 Links */}
          <div className="space-y-2 text-xs">
            <h4 className="font-serif font-bold text-stone-900 uppercase tracking-wider text-[11px]">
              🍳 Recipes & Cooking
            </h4>
            <ul className="space-y-1.5 text-stone-500">
              <li><button onClick={() => setActiveTab('recipes')} className="hover:text-orange-600">Recipe Search & Filters</button></li>
              <li><button onClick={() => setActiveTab('recipes')} className="hover:text-orange-600">Step-by-Step Cooking Timers</button></li>
              <li><button onClick={() => setActiveTab('planner')} className="hover:text-orange-600">Weekly Meal Planner</button></li>
              <li><button onClick={() => setActiveTab('planner')} className="hover:text-orange-600">Smart Shopping List Builder</button></li>
              <li><button onClick={() => setActiveTab('recipes')} className="hover:text-orange-600">Chef Club Exclusive Recipes</button></li>
            </ul>
          </div>

          {/* Pillar 3 Links */}
          <div className="space-y-2 text-xs">
            <h4 className="font-serif font-bold text-stone-900 uppercase tracking-wider text-[11px]">
              🍽️ Dining & ☕ Cellar
            </h4>
            <ul className="space-y-1.5 text-stone-500">
              <li><button onClick={() => setActiveTab('restaurants')} className="hover:text-orange-600">Interactive Digital Menus</button></li>
              <li><button onClick={() => setActiveTab('restaurants')} className="hover:text-orange-600">Real-Time Table Reservations</button></li>
              <li><button onClick={() => setActiveTab('beverages')} className="hover:text-orange-600">Craft Cocktail Mixology</button></li>
              <li><button onClick={() => setActiveTab('beverages')} className="hover:text-orange-600">Sommelier Wine Tasting Guide</button></li>
              <li><button onClick={() => setActiveTab('beverages')} className="hover:text-orange-600">Monthly Wine & Coffee Clubs</button></li>
            </ul>
          </div>

          {/* Newsletter & Monetization Disclosure */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-stone-900 uppercase tracking-wider text-[11px]">
              Culinary Newsletter
            </h4>
            <p className="text-xs text-stone-500">
              Receive weekly chef masterclass tips, seasonal menus, and secret bottle releases.
            </p>
            {subscribed ? (
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Subscribed! Welcome to the table.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="chef@email.com"
                  className="flex-1 text-xs p-2 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white"
                  required
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs"
                >
                  Join
                </button>
              </form>
            )}

            <p className="text-[10px] text-stone-400 leading-tight pt-1">
              Affiliate Disclosure: Food Network may earn compensation via affiliate links to kitchen cookware (Amazon, Lodge, KitchenAid) and partner restaurant orders.
            </p>
          </div>

        </div>

        <div className="mt-12 pt-6 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>© 2026 Food Network Restaurant & Culinary Hub. Built with full MERN Stack.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Crafted for Foodies & Master Chefs
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
