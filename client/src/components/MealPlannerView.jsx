import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Trash2, 
  CheckCircle, 
  Plus, 
  Clock, 
  Sparkles, 
  ShoppingCart,
  ChevronRight
} from 'lucide-react';
import { useMealPlanShopping } from '../context/MealPlanShoppingContext';

export const MealPlannerView = ({ onSelectRecipe }) => {
  const { mealPlan, removeMealPlanSlot, toggleMealPlanCompleted, addIngredientsFromRecipe, days, slots } = useMealPlanShopping();
  const [toast, setToast] = useState('');

  const getSlotMeal = (day, slot) => {
    return mealPlan.find((item) => item.day === day && item.slot === slot);
  };

  const handleAddMealIngredients = async (recipe) => {
    if (!recipe) return;
    const count = await addIngredientsFromRecipe(recipe);
    setToast(`Added ${count} ingredients from ${recipe.title} to shopping list!`);
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2 text-orange-600 font-bold text-xs uppercase tracking-wider mb-1">
            <CalendarIcon className="w-4 h-4" />
            <span>Weekly Culinary Schedule</span>
          </div>
          <h2 className="font-serif text-3xl font-black text-stone-900">
            Interactive Meal Planner
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Organize your week of home dining. Click any recipe to cook with live timers or add items directly to your shopping list.
          </p>
        </div>

        {toast && (
          <div className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold animate-in fade-in">
            {toast}
          </div>
        )}
      </div>

      {/* 7-Day Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
        {days.map((day) => {
          const isToday = day === 'Monday'; // Highlight current day
          return (
            <div
              key={day}
              className={`rounded-3xl border transition-all flex flex-col justify-between overflow-hidden ${
                isToday
                  ? 'bg-orange-50/40 border-orange-300 ring-2 ring-orange-500/20 shadow-sm'
                  : 'bg-white border-stone-200 shadow-sm'
              }`}
            >
              {/* Day Header */}
              <div className={`p-3.5 text-center border-b ${
                isToday ? 'bg-orange-600 text-white' : 'bg-stone-50 border-stone-100 text-stone-900'
              }`}>
                <span className="font-serif font-black text-sm block">{day}</span>
                <span className={`text-[10px] font-semibold ${isToday ? 'text-orange-100' : 'text-stone-400'}`}>
                  {isToday ? 'Today' : 'Planned'}
                </span>
              </div>

              {/* Meal Slots */}
              <div className="p-3 space-y-3 flex-1 flex flex-col justify-between">
                {slots.map((slot) => {
                  const entry = getSlotMeal(day, slot);
                  const recipe = entry?.recipe;

                  return (
                    <div
                      key={slot}
                      className={`p-2.5 rounded-2xl border transition-all ${
                        entry
                          ? entry.completed
                            ? 'bg-emerald-50/50 border-emerald-200 opacity-75'
                            : 'bg-white border-stone-200 shadow-sm hover:border-orange-300'
                          : 'bg-stone-50/60 border-dashed border-stone-200 text-stone-400'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                          {slot}
                        </span>
                        {entry && (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => toggleMealPlanCompleted(entry._id || entry.id)}
                              title={entry.completed ? 'Mark incomplete' : 'Mark cooked'}
                              className={`p-1 rounded-lg ${
                                entry.completed ? 'text-emerald-600' : 'text-stone-300 hover:text-stone-500'
                              }`}
                            >
                              <CheckCircle className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => removeMealPlanSlot(entry._id || entry.id)}
                              title="Remove slot"
                              className="p-1 rounded-lg text-stone-300 hover:text-red-500"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>

                      {entry ? (
                        <div className="space-y-2">
                          {recipe?.image && (
                            <img
                              src={recipe.image}
                              alt={entry.customTitle}
                              className="w-full h-16 rounded-xl object-cover"
                            />
                          )}

                          <div>
                            <p
                              onClick={() => recipe && onSelectRecipe && onSelectRecipe(recipe)}
                              className={`text-xs font-bold text-stone-900 line-clamp-2 hover:text-orange-600 cursor-pointer ${
                                entry.completed ? 'line-through text-stone-400' : ''
                              }`}
                            >
                              {entry.customTitle || recipe?.title}
                            </p>
                            {recipe && (
                              <p className="text-[10px] text-stone-400 flex items-center gap-1 mt-0.5">
                                <Clock className="w-3 h-3 text-orange-500" />
                                <span>{recipe.prepTimeMinutes + recipe.cookTimeMinutes}m total</span>
                              </p>
                            )}
                          </div>

                          {recipe && (
                            <button
                              onClick={() => handleAddMealIngredients(recipe)}
                              className="w-full py-1 rounded-lg bg-orange-100/70 hover:bg-orange-200 text-orange-800 text-[10px] font-bold flex items-center justify-center gap-1 transition-colors"
                            >
                              <ShoppingCart className="w-3 h-3" />
                              <span>Add Ingredients</span>
                            </button>
                          )}
                        </div>
                      ) : (
                        <div className="py-3 text-center">
                          <span className="text-[10px] text-stone-400 font-medium">Empty slot</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
