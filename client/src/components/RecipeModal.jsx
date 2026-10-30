import React, { useState, useEffect } from 'react';
import { 
  X, 
  Clock, 
  Users, 
  Flame, 
  ChefHat, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle, 
  Plus, 
  Calendar, 
  ExternalLink, 
  Sparkles, 
  Crown, 
  Heart,
  Share2,
  Bookmark
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useMealPlanShopping } from '../context/MealPlanShoppingContext';

export const RecipeModal = ({ recipe, onClose }) => {
  const { isPremium, setIsChefClubModalOpen } = useAuth();
  const { addIngredientsFromRecipe, assignRecipeToMealPlan, days, slots } = useMealPlanShopping();

  // Serving multiplier
  const [servingsMultiplier, setServingsMultiplier] = useState(1);
  const [completedSteps, setCompletedSteps] = useState({});
  const [addedToast, setAddedToast] = useState('');
  
  // Interactive cooking timer
  const [activeTimerMinutes, setActiveTimerMinutes] = useState(null);
  const [timerSecondsLeft, setTimerSecondsLeft] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Meal plan assignment popover
  const [showMealPlanPicker, setShowMealPlanPicker] = useState(false);
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [selectedSlot, setSelectedSlot] = useState('Dinner');

  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timerSecondsLeft > 0) {
      interval = setInterval(() => {
        setTimerSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (timerSecondsLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      // Play a quick chime notification or visual trigger
      alert(`⏰ Cooking Timer Finished for Step: ${recipe.title}!`);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSecondsLeft, recipe?.title]);

  if (!recipe) return null;

  const isLocked = recipe.isPremiumOnly && !isPremium;

  const handleStartTimer = (minutes) => {
    setActiveTimerMinutes(minutes);
    setTimerSecondsLeft(minutes * 60);
    setIsTimerRunning(true);
  };

  const toggleStepCompleted = (stepIdx) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [stepIdx]: !prev[stepIdx],
    }));
  };

  const handleAddAllToShoppingList = async () => {
    const count = await addIngredientsFromRecipe(recipe);
    setAddedToast(`Added ${count} ingredients to your Shopping List!`);
    setTimeout(() => setAddedToast(''), 3500);
  };

  const handleAssignToMealPlan = () => {
    assignRecipeToMealPlan(selectedDay, selectedSlot, recipe);
    setShowMealPlanPicker(false);
    setAddedToast(`Scheduled for ${selectedDay} ${selectedSlot}!`);
    setTimeout(() => setAddedToast(''), 3500);
  };

  const formatTimerTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-100 my-8">
        
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-stone-900/60 hover:bg-stone-900 text-white backdrop-blur-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Header with Media */}
        <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-stone-950">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent"></div>

          {/* Badges on hero */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-600 text-white shadow-md">
              {recipe.cuisine}
            </span>
            {recipe.dietaryRestrictions?.map((diet) => (
              <span key={diet} className="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-stone-900 backdrop-blur-md shadow-md">
                {diet}
              </span>
            ))}
            {recipe.isSponsored && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-stone-950 flex items-center gap-1 shadow-md">
                <Sparkles className="w-3.5 h-3.5" />
                Sponsored by {recipe.sponsorName}
              </span>
            )}
            {recipe.isPremiumOnly && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-amber-400 to-yellow-500 text-stone-950 flex items-center gap-1 shadow-md">
                <Crown className="w-3.5 h-3.5 fill-stone-950" />
                Chef Club Exclusive
              </span>
            )}
          </div>

          {/* Title & Chef in Hero */}
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <h2 className="font-serif text-2xl sm:text-4xl font-black leading-tight text-white mb-2">
              {recipe.title}
            </h2>
            <p className="text-sm text-stone-300 max-w-2xl line-clamp-2">
              {recipe.subtitle || recipe.description}
            </p>

            {/* Chef info */}
            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/10">
              <img
                src={recipe.chef?.avatar || 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=150&q=80'}
                alt={recipe.chef?.name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-orange-500"
              />
              <div>
                <p className="text-xs font-bold text-white">{recipe.chef?.name}</p>
                <p className="text-[11px] text-stone-400">{recipe.chef?.role || 'Master Chef'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Recipe Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-stone-100 bg-stone-50 border-b border-stone-200 text-center py-4 px-2">
          <div className="p-2">
            <div className="flex items-center justify-center gap-1.5 text-xs text-stone-500 mb-1">
              <Clock className="w-4 h-4 text-orange-500" />
              <span>Prep Time</span>
            </div>
            <p className="font-bold text-sm text-stone-900">{recipe.prepTimeMinutes} mins</p>
          </div>
          <div className="p-2">
            <div className="flex items-center justify-center gap-1.5 text-xs text-stone-500 mb-1">
              <Flame className="w-4 h-4 text-orange-500" />
              <span>Cook Time</span>
            </div>
            <p className="font-bold text-sm text-stone-900">{recipe.cookTimeMinutes} mins</p>
          </div>
          <div className="p-2">
            <div className="flex items-center justify-center gap-1.5 text-xs text-stone-500 mb-1">
              <Users className="w-4 h-4 text-orange-500" />
              <span>Servings</span>
            </div>
            <p className="font-bold text-sm text-stone-900">{recipe.servings * servingsMultiplier} servings</p>
          </div>
          <div className="p-2">
            <div className="flex items-center justify-center gap-1.5 text-xs text-stone-500 mb-1">
              <ChefHat className="w-4 h-4 text-orange-500" />
              <span>Difficulty</span>
            </div>
            <p className="font-bold text-sm text-stone-900">{recipe.difficulty}</p>
          </div>
        </div>

        {/* Action notification banner if any */}
        {addedToast && (
          <div className="bg-emerald-600 text-white text-xs font-bold py-2.5 px-4 text-center transition-all animate-in fade-in">
            {addedToast}
          </div>
        )}

        {/* If Premium Lock is Active */}
        {isLocked ? (
          <div className="p-8 sm:p-12 text-center bg-gradient-to-b from-amber-500/10 to-transparent">
            <div className="w-16 h-16 rounded-3xl bg-amber-400 text-stone-950 flex items-center justify-center mx-auto mb-4 shadow-xl">
              <Crown className="w-8 h-8 fill-stone-950" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-stone-900 mb-2">
              Exclusive Food Network Chef Club Masterclass
            </h3>
            <p className="text-sm text-stone-600 max-w-lg mx-auto mb-6">
              This masterclass recipe by {recipe.chef?.name} is locked for Chef Club members. Subscribe today for ad-free cooking, full 4K step-by-step masterclasses, and exclusive culinary guides.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setIsChefClubModalOpen(true)}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-bold text-sm shadow-lg shadow-orange-500/20 hover:scale-105 transition-transform flex items-center gap-2"
              >
                <Crown className="w-4 h-4 fill-stone-950" />
                <span>Unlock for $9.99/mo</span>
              </button>
            </div>
          </div>
        ) : (
          /* Main Interactive Recipe Content */
          <div className="p-6 sm:p-8 space-y-8">

            {/* Quick Actions Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-orange-50 border border-orange-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-stone-700">Adjust Servings:</span>
                {[1, 2, 3].map((multiplier) => (
                  <button
                    key={multiplier}
                    onClick={() => setServingsMultiplier(multiplier)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                      servingsMultiplier === multiplier
                        ? 'bg-orange-600 text-white shadow-sm'
                        : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                    }`}
                  >
                    {multiplier * recipe.servings}x
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={handleAddAllToShoppingList}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-orange-600 text-white hover:bg-orange-700 transition-colors shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add to Shopping List</span>
                </button>

                {/* Meal planner dropdown trigger */}
                <div className="relative">
                  <button
                    onClick={() => setShowMealPlanPicker(!showMealPlanPicker)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-white text-stone-800 border border-stone-300 hover:bg-stone-100 transition-colors"
                  >
                    <Calendar className="w-4 h-4 text-orange-600" />
                    <span>Plan Meal</span>
                  </button>

                  {showMealPlanPicker && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-stone-200 p-4 z-30 animate-in fade-in">
                      <p className="text-xs font-bold text-stone-900 mb-2">Schedule this Recipe</p>
                      
                      <div className="space-y-2 mb-3">
                        <div>
                          <label className="text-[11px] font-semibold text-stone-500 block">Day of the Week</label>
                          <select
                            value={selectedDay}
                            onChange={(e) => setSelectedDay(e.target.value)}
                            className="w-full text-xs font-semibold p-2 rounded-xl border border-stone-200 bg-stone-50"
                          >
                            {days.map((d) => <option key={d} value={d}>{d}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="text-[11px] font-semibold text-stone-500 block">Meal Slot</label>
                          <select
                            value={selectedSlot}
                            onChange={(e) => setSelectedSlot(e.target.value)}
                            className="w-full text-xs font-semibold p-2 rounded-xl border border-stone-200 bg-stone-50"
                          >
                            {slots.map((s) => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </div>
                      </div>

                      <button
                        onClick={handleAssignToMealPlan}
                        className="w-full py-2 rounded-xl text-xs font-bold bg-orange-600 text-white hover:bg-orange-700"
                      >
                        Confirm Slot
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Active Floating Digital Timer if running */}
            {activeTimerMinutes !== null && (
              <div className="p-4 rounded-2xl bg-stone-900 text-white flex items-center justify-between shadow-xl border border-orange-500/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center text-white font-bold animate-pulse">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-orange-400 tracking-wider">
                      Interactive Cooking Timer
                    </span>
                    <p className="font-mono text-2xl font-black text-white">
                      {formatTimerTime(timerSecondsLeft)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                    className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-white"
                  >
                    {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => {
                      setTimerSecondsLeft(activeTimerMinutes * 60);
                      setIsTimerRunning(false);
                    }}
                    className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-white"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setActiveTimerMinutes(null);
                      setIsTimerRunning(false);
                    }}
                    className="p-2 rounded-xl bg-stone-800 hover:bg-red-900/50 text-stone-400 hover:text-white text-xs font-bold"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            {/* Ingredients & Interactive Cooking Steps Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Column: Ingredients */}
              <div className="lg:col-span-1 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                  <h3 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
                    <span>Ingredients</span>
                    <span className="text-xs font-sans font-semibold text-stone-500">
                      ({recipe.ingredients?.length})
                    </span>
                  </h3>
                </div>

                <ul className="space-y-2.5">
                  {recipe.ingredients?.map((ing, idx) => (
                    <li
                      key={idx}
                      className="p-3 rounded-xl bg-stone-50 border border-stone-100 flex items-start justify-between text-xs hover:bg-orange-50/50 transition-colors"
                    >
                      <div>
                        <span className="font-bold text-stone-900 block">{ing.item}</span>
                        <span className="text-stone-500 text-[11px]">{ing.aisle}</span>
                      </div>
                      <span className="font-semibold text-orange-600 bg-orange-100/60 px-2 py-0.5 rounded-lg text-right">
                        {ing.amount ? `${ing.amount} ${ing.unit || ''}` : ''}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Column: Step-by-Step Cooking Guidance */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                  <h3 className="font-serif text-lg font-bold text-stone-900">
                    Step-by-Step Culinary Guidance
                  </h3>
                  <span className="text-xs text-stone-500">
                    {Object.values(completedSteps).filter(Boolean).length} / {recipe.instructions?.length} Completed
                  </span>
                </div>

                <div className="space-y-4">
                  {recipe.instructions?.map((inst, idx) => {
                    const isDone = completedSteps[idx];
                    return (
                      <div
                        key={idx}
                        className={`p-4 rounded-2xl border transition-all ${
                          isDone
                            ? 'bg-emerald-50/50 border-emerald-200 opacity-80'
                            : 'bg-white border-stone-200 shadow-sm hover:border-orange-300'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <button
                            onClick={() => toggleStepCompleted(idx)}
                            className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 transition-colors ${
                              isDone
                                ? 'bg-emerald-600 text-white'
                                : 'bg-stone-100 text-stone-700 hover:bg-orange-500 hover:text-white'
                            }`}
                          >
                            {isDone ? <CheckCircle className="w-4 h-4" /> : inst.stepNumber}
                          </button>

                          <div className="flex-1 space-y-2">
                            <p className={`text-sm leading-relaxed ${isDone ? 'line-through text-stone-500' : 'text-stone-800'}`}>
                              {inst.instruction}
                            </p>

                            {inst.tip && (
                              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200/60 text-xs text-amber-900 flex items-start gap-2">
                                <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                                <div>
                                  <span className="font-bold">Chef's Pro-Tip: </span>
                                  {inst.tip}
                                </div>
                              </div>
                            )}

                            {inst.timerMinutes && (
                              <button
                                onClick={() => handleStartTimer(inst.timerMinutes)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-100 text-orange-700 text-xs font-bold hover:bg-orange-200 transition-colors"
                              >
                                <Play className="w-3.5 h-3.5 fill-orange-700" />
                                <span>Start {inst.timerMinutes} Min Cooking Timer</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Embedded Video Guide if available */}
                {recipe.videoUrl && (
                  <div className="mt-8 pt-6 border-t border-stone-200">
                    <h4 className="font-serif text-base font-bold text-stone-900 mb-3 flex items-center gap-2">
                      <Play className="w-4 h-4 text-orange-600" />
                      <span>Watch Step-by-Step Cooking Masterclass</span>
                    </h4>
                    <div className="relative aspect-video rounded-2xl overflow-hidden bg-stone-900 shadow-md">
                      <iframe
                        src={recipe.videoUrl}
                        title={recipe.title}
                        className="w-full h-full border-0"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Affiliate Monetization Section: Tools Used by Chef */}
            {recipe.kitchenTools && recipe.kitchenTools.length > 0 && (
              <div className="p-6 rounded-3xl bg-stone-50 border border-stone-200/80">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-orange-600 tracking-wider">
                      Affiliate Culinary Equipment
                    </span>
                    <h4 className="font-serif text-lg font-bold text-stone-900">
                      Shop Kitchen Tools Used in this Recipe
                    </h4>
                  </div>
                  <span className="text-[11px] text-stone-400">
                    Verified Chef Network Gear
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {recipe.kitchenTools.map((tool, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-white border border-stone-200 flex items-center justify-between gap-4 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={tool.image}
                          alt={tool.name}
                          className="w-14 h-14 rounded-xl object-cover bg-stone-100"
                        />
                        <div>
                          <p className="text-xs font-bold text-stone-900 line-clamp-1">{tool.name}</p>
                          <p className="text-[11px] text-stone-500">{tool.brand}</p>
                          <p className="text-xs font-black text-orange-600 mt-1">${tool.price?.toFixed(2)}</p>
                        </div>
                      </div>

                      <a
                        href={tool.affiliateUrl || 'https://amazon.com'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-orange-600 text-white text-xs font-bold flex items-center gap-1.5 transition-colors flex-shrink-0"
                      >
                        <span>Buy</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
