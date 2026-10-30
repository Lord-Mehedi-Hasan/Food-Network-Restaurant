import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  UtensilsCrossed, 
  Wine, 
  Calendar, 
  Search, 
  Clock, 
  Flame, 
  Star, 
  Plus, 
  Sparkles, 
  Crown, 
  MapPin, 
  Phone, 
  SlidersHorizontal,
  Award,
  ChevronRight,
  Filter
} from 'lucide-react';

import { useAuth } from './context/AuthContext';
import { useCart } from './context/CartContext';
import { useMealPlanShopping } from './context/MealPlanShoppingContext';
import { api } from './services/api';

// Components
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { MonetizationBanner } from './components/MonetizationBanner';
import { RecipeModal } from './components/RecipeModal';
import { RestaurantModal } from './components/RestaurantModal';
import { BeverageSection } from './components/BeverageSection';
import { MealPlannerView } from './components/MealPlannerView';
import { ShoppingListView } from './components/ShoppingListView';
import { CartDrawer } from './components/CartDrawer';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { ChefClubModal } from './components/ChefClubModal';
import { AuthModal } from './components/AuthModal';
import { AdminPartnerPortal } from './components/AdminPartnerPortal';
import { Footer } from './components/Footer';

export function App() {
  const { isPremium, setIsChefClubModalOpen } = useAuth();
  const { assignRecipeToMealPlan } = useMealPlanShopping();

  // Navigation state
  const [activeTab, setActiveTab] = useState('restaurants'); // 'restaurants', 'recipes', 'beverages', 'planner', 'admin'
  const [plannerSubTab, setPlannerSubTab] = useState('planner'); // 'planner' or 'shopping'

  // Data state
  const [recipes, setRecipes] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search & Filtering state
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [maxCookTime, setMaxCookTime] = useState(120);

  // Modals state
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  // Load recipes and restaurants on mount
  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        const [recRes, restRes] = await Promise.all([
          api.getRecipes(),
          api.getRestaurants(),
        ]);
        if (recRes.success) setRecipes(recRes.recipes);
        if (restRes.success) setRestaurants(restRes.restaurants);
      } catch (e) {
        console.error('Failed to load content from API:', e);
      } finally {
        setLoading(false);
      }
    };
    loadContent();
  }, []);

  // Filter recipes based on unified search and criteria
  const filteredRecipes = recipes.filter((rec) => {
    // Quick Pick filter
    if (activeFilter === 'Italian' && rec.cuisine !== 'Italian') return false;
    if (activeFilter === 'Keto' && !rec.dietaryRestrictions?.includes('Keto')) return false;
    if (activeFilter === 'Vegan' && !rec.dietaryRestrictions?.includes('Vegan')) return false;
    if (activeFilter === 'Gluten-Free' && !rec.dietaryRestrictions?.includes('Gluten-Free')) return false;
    if (activeFilter === 'Premium' && !rec.isPremiumOnly) return false;

    // Cuisine filter
    if (selectedCuisine !== 'All' && rec.cuisine !== selectedCuisine) return false;

    // Difficulty filter
    if (selectedDifficulty !== 'All' && rec.difficulty !== selectedDifficulty) return false;

    // Max cook time filter
    if ((rec.prepTimeMinutes + rec.cookTimeMinutes) > maxCookTime) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = rec.title.toLowerCase().includes(q);
      const matchDesc = rec.description.toLowerCase().includes(q);
      const matchIngredient = rec.ingredients?.some((ing) => ing.item.toLowerCase().includes(q));
      const matchCuisine = rec.cuisine?.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchIngredient && !matchCuisine) return false;
    }

    return true;
  });

  // Filter restaurants
  const filteredRestaurants = restaurants.filter((rest) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = rest.name.toLowerCase().includes(q);
      const matchTagline = rest.tagline?.toLowerCase().includes(q);
      const matchCuisine = rest.cuisineTypes?.some((c) => c.toLowerCase().includes(q));
      const matchDish = rest.menu?.some((d) => d.name.toLowerCase().includes(q));
      if (!matchName && !matchTagline && !matchCuisine && !matchDish) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 selection:bg-orange-500 selection:text-white">
      
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSearch={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        {/* Hero Banner (Visible on Dining and Recipes) */}
        {(activeTab === 'restaurants' || activeTab === 'recipes') && (
          <HeroBanner
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            setActiveTab={setActiveTab}
          />
        )}

        {/* Display Monetization Banner (Ad-Free for Chef Club Members) */}
        {(activeTab === 'restaurants' || activeTab === 'recipes') && (
          <MonetizationBanner type="recipe-top" />
        )}

        {/* ==================================================== */}
        {/* PILLAR 1: 🍳 RECIPES & COOKING */}
        {/* ==================================================== */}
        {activeTab === 'recipes' && (
          <div className="space-y-8">
            
            {/* Filter Controls Bar */}
            <div className="p-4 sm:p-5 rounded-3xl bg-white border border-stone-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-bold text-stone-500 flex items-center gap-1.5">
                  <SlidersHorizontal className="w-4 h-4 text-orange-600" />
                  <span>Filters:</span>
                </span>

                {/* Cuisine select */}
                <select
                  value={selectedCuisine}
                  onChange={(e) => setSelectedCuisine(e.target.value)}
                  className="text-xs font-bold p-2 rounded-xl border border-stone-200 bg-stone-50 text-stone-800"
                >
                  <option value="All">All Cuisines</option>
                  <option value="Italian">Italian</option>
                  <option value="Japanese">Japanese</option>
                  <option value="French">French</option>
                  <option value="Korean">Korean</option>
                </select>

                {/* Difficulty select */}
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="text-xs font-bold p-2 rounded-xl border border-stone-200 bg-stone-50 text-stone-800"
                >
                  <option value="All">All Skill Levels</option>
                  <option value="Easy">Easy (Under 30m)</option>
                  <option value="Medium">Medium</option>
                  <option value="Master Chef">Master Chef</option>
                </select>
              </div>

              {/* Cook Time Slider */}
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <span className="text-xs font-bold text-stone-500 whitespace-nowrap">
                  Max Time: <strong className="text-stone-900">{maxCookTime} mins</strong>
                </span>
                <input
                  type="range"
                  min="20"
                  max="240"
                  step="10"
                  value={maxCookTime}
                  onChange={(e) => setMaxCookTime(Number(e.target.value))}
                  className="w-32 accent-orange-600 cursor-pointer"
                />
              </div>
            </div>

            {/* Recipes Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-2xl font-black text-stone-900">
                  Featured Culinary Creations
                </h3>
                <span className="text-xs font-semibold text-stone-500">
                  Showing {filteredRecipes.length} recipes
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRecipes.map((recipe) => (
                  <div
                    key={recipe._id}
                    className="group rounded-3xl bg-white border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-orange-300 transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Image Thumbnail */}
                      <div className="relative h-60 w-full overflow-hidden bg-stone-900">
                        <img
                          src={recipe.image}
                          alt={recipe.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent"></div>

                        {/* Top Badges */}
                        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-orange-600 text-white shadow">
                            {recipe.cuisine}
                          </span>
                          {recipe.dietaryRestrictions?.[0] && (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-white/90 text-stone-900 backdrop-blur-md">
                              {recipe.dietaryRestrictions[0]}
                            </span>
                          )}
                          {recipe.isSponsored && (
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-400 text-stone-950 flex items-center gap-1 shadow">
                              <Sparkles className="w-3 h-3" />
                              Sponsored
                            </span>
                          )}
                          {recipe.isPremiumOnly && (
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-gradient-to-r from-amber-400 to-yellow-500 text-stone-950 flex items-center gap-1 shadow">
                              <Crown className="w-3 h-3 fill-stone-950" />
                              Chef Club
                            </span>
                          )}
                        </div>

                        {/* Bottom metrics on image */}
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                          <div className="flex items-center gap-1 text-amber-400 font-bold">
                            <Star className="w-3.5 h-3.5 fill-amber-400" />
                            <span>{recipe.rating}</span>
                            <span className="text-stone-300 font-normal">({recipe.reviewsCount})</span>
                          </div>
                          <span className="flex items-center gap-1 text-stone-200">
                            <Clock className="w-3.5 h-3.5 text-orange-400" />
                            <span>{recipe.prepTimeMinutes + recipe.cookTimeMinutes} mins</span>
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 space-y-3">
                        <h4 className="font-serif text-lg font-bold text-stone-900 leading-snug group-hover:text-orange-600 transition-colors line-clamp-2">
                          {recipe.title}
                        </h4>

                        <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                          {recipe.subtitle || recipe.description}
                        </p>

                        <div className="flex items-center gap-2 pt-2 border-t border-stone-100">
                          <img
                            src={recipe.chef?.avatar || 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=100&q=80'}
                            alt={recipe.chef?.name}
                            className="w-7 h-7 rounded-full object-cover ring-1 ring-orange-500/30"
                          />
                          <span className="text-xs font-semibold text-stone-700">{recipe.chef?.name}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom CTA */}
                    <div className="p-5 pt-0">
                      <button
                        onClick={() => setSelectedRecipe(recipe)}
                        className="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-orange-600 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Cook & Step-by-Step Timers</span>
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ==================================================== */}
        {/* PILLAR 2: 🍽️ RESTAURANTS & DINING */}
        {/* ==================================================== */}
        {activeTab === 'restaurants' && (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 pb-4 border-b border-stone-200">
              <div>
                <div className="flex items-center gap-2 text-orange-600 font-bold text-xs uppercase tracking-wider mb-1">
                  <UtensilsCrossed className="w-4 h-4" />
                  <span>Restaurants & Dining Platforms</span>
                </div>
                <h2 className="font-serif text-3xl font-black text-stone-900">
                  Discover, Reserve & Order from Premier Kitchens
                </h2>
                <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-2xl">
                  Connect directly with top establishments. Reserve verified tables in real time, explore interactive digital menus, and order online for delivery or pickup.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRestaurants.map((restaurant) => (
                <div
                  key={restaurant._id}
                  className="rounded-3xl bg-white border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-orange-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Cover Photo */}
                    <div className="relative h-56 w-full overflow-hidden bg-stone-900">
                      <img
                        src={restaurant.coverImage}
                        alt={restaurant.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent"></div>

                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-orange-600 text-white shadow">
                          {restaurant.diningStyle}
                        </span>
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/60 text-white backdrop-blur-md">
                          {restaurant.priceRange}
                        </span>
                        {restaurant.sponsoredBadge && (
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-400 text-stone-950 flex items-center gap-1 shadow">
                            <Award className="w-3 h-3" />
                            {restaurant.sponsoredBadge}
                          </span>
                        )}
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <div className="flex items-center gap-1 text-amber-400 text-xs font-bold mb-0.5">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <span>{restaurant.rating}</span>
                          <span className="text-stone-300 font-normal">({restaurant.reviewCount} reviews)</span>
                        </div>
                        <h3 className="font-serif text-xl font-bold leading-tight">
                          {restaurant.name}
                        </h3>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="p-5 space-y-3">
                      <p className="text-xs text-stone-600 line-clamp-2">
                        {restaurant.tagline}
                      </p>

                      <div className="space-y-1.5 text-xs text-stone-500 pt-1">
                        <p className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-orange-500" />
                          <span>{restaurant.address?.street}, {restaurant.address?.neighborhood}</span>
                        </p>
                        <p className="flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-orange-500" />
                          <span>{restaurant.phone}</span>
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1 pt-1">
                        {restaurant.cuisineTypes?.map((c) => (
                          <span key={c} className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-stone-100 text-stone-700">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setSelectedRestaurant(restaurant)}
                      className="py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition-colors shadow-sm text-center"
                    >
                      Digital Menu
                    </button>
                    <button
                      onClick={() => setSelectedRestaurant(restaurant)}
                      className="py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition-colors text-center"
                    >
                      Reserve Table
                    </button>
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* PILLAR 3: ☕ BEVERAGES & DRINKS */}
        {/* ==================================================== */}
        {activeTab === 'beverages' && (
          <BeverageSection />
        )}

        {/* ==================================================== */}
        {/* MEAL PLANNER & SHOPPING LIST */}
        {/* ==================================================== */}
        {activeTab === 'planner' && (
          <div className="space-y-8">
            {/* Sub-navigation tabs */}
            <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-stone-100 border border-stone-200/80 w-fit">
              <button
                onClick={() => setPlannerSubTab('planner')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  plannerSubTab === 'planner'
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Calendar className="w-4 h-4 text-orange-600" />
                <span>Weekly Meal Schedule</span>
              </button>
              <button
                onClick={() => setPlannerSubTab('shopping')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  plannerSubTab === 'shopping'
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Plus className="w-4 h-4 text-orange-600" />
                <span>Smart Shopping List</span>
              </button>
            </div>

            {plannerSubTab === 'planner' ? (
              <MealPlannerView onSelectRecipe={(recipe) => setSelectedRecipe(recipe)} />
            ) : (
              <ShoppingListView />
            )}
          </div>
        )}

        {/* ==================================================== */}
        {/* ADMIN & PARTNER PORTAL */}
        {/* ==================================================== */}
        {activeTab === 'admin' && (
          <AdminPartnerPortal />
        )}

      </main>

      {/* Global Modals & Drawers */}
      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}

      {selectedRestaurant && (
        <RestaurantModal
          restaurant={selectedRestaurant}
          onClose={() => setSelectedRestaurant(null)}
        />
      )}

      <CartDrawer />
      <OrderTrackingModal />
      <ChefClubModal />
      <AuthModal />

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

    </div>
  );
}

export default App;
