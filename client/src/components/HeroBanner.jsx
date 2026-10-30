import React from 'react';
import { 
  Search, 
  Sparkles, 
  UtensilsCrossed, 
  BookOpen, 
  Wine, 
  Crown,
  ChefHat,
  Flame,
  ArrowRight
} from 'lucide-react';

export const HeroBanner = ({ searchQuery, setSearchQuery, activeFilter, setActiveFilter, setActiveTab }) => {
  const quickFilters = [
    { label: 'All Culinary', filter: 'All' },
    { label: 'Italian & Wood-Fired', filter: 'Italian' },
    { label: 'Keto & Low-Carb', filter: 'Keto' },
    { label: 'Vegan Plant-Based', filter: 'Vegan' },
    { label: 'Gluten-Free', filter: 'Gluten-Free' },
    { label: 'Chef Club Exclusive', filter: 'Premium' },
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl sm:rounded-[2.5rem] bg-gradient-to-br from-stone-950 via-stone-900 to-stone-950 text-white shadow-2xl p-6 sm:p-12 mb-10 border border-stone-800">
      
      {/* Background culinary aesthetic glow */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-orange-600/15 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 rounded-full bg-rose-600/10 blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-3xl space-y-6">
        
        {/* Brand Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 text-xs font-bold tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-orange-400" />
          <span>The Definitive Food, Dining & Beverage Ecosystem</span>
        </div>

        {/* Title */}
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
          Savor Every Moment. <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-400">
            Cook. Dine. Celebrate.
          </span>
        </h1>

        <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-2xl">
          From master chef step-by-step recipes and weekly meal planners, to real-time table reservations at premier restaurants and direct-to-consumer sommelier cellar vintages.
        </p>

        {/* Unified Search Input */}
        <div className="relative max-w-2xl mt-4">
          <Search className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search recipes, ingredients, restaurants, craft cocktails, or fine wines..."
            className="w-full py-4 pl-12 pr-32 rounded-2xl bg-white/10 text-white placeholder-stone-400 border border-white/20 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-xs sm:text-sm font-medium transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Quick Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="text-[11px] font-bold text-stone-400 mr-1">Quick Picks:</span>
          {quickFilters.map((qf) => (
            <button
              key={qf.filter}
              onClick={() => setActiveFilter(qf.filter)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeFilter === qf.filter
                  ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30'
                  : 'bg-white/10 hover:bg-white/15 text-stone-300 border border-white/10'
              }`}
            >
              {qf.label}
            </button>
          ))}
        </div>

      </div>

      {/* 3 Pillar Quick Links at Bottom */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-3 mt-10 pt-8 border-t border-white/10">
        <button
          onClick={() => setActiveTab('restaurants')}
          className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-all group"
        >
          <div className="flex items-center justify-between mb-1">
            <UtensilsCrossed className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
            <ArrowRight className="w-4 h-4 text-stone-400 group-hover:translate-x-1 transition-transform" />
          </div>
          <h4 className="font-serif font-bold text-sm text-white">🍽️ Restaurants & Dining</h4>
          <p className="text-[11px] text-stone-400 mt-0.5">Digital menus, table booking & delivery</p>
        </button>

        <button
          onClick={() => setActiveTab('recipes')}
          className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-all group"
        >
          <div className="flex items-center justify-between mb-1">
            <BookOpen className="w-5 h-5 text-orange-400 group-hover:scale-110 transition-transform" />
            <ArrowRight className="w-4 h-4 text-stone-400 group-hover:translate-x-1 transition-transform" />
          </div>
          <h4 className="font-serif font-bold text-sm text-white">🍳 Recipes & Cooking</h4>
          <p className="text-[11px] text-stone-400 mt-0.5">Meal plans, step videos & tool guides</p>
        </button>

        <button
          onClick={() => setActiveTab('beverages')}
          className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-all group"
        >
          <div className="flex items-center justify-between mb-1">
            <Wine className="w-5 h-5 text-rose-400 group-hover:scale-110 transition-transform" />
            <ArrowRight className="w-4 h-4 text-stone-400 group-hover:translate-x-1 transition-transform" />
          </div>
          <h4 className="font-serif font-bold text-sm text-white">☕ Beverages & Drinks</h4>
          <p className="text-[11px] text-stone-400 mt-0.5">Mixology database, wine cellar & clubs</p>
        </button>
      </div>

    </div>
  );
};
