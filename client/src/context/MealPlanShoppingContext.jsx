import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from './AuthContext';

const MealPlanShoppingContext = createContext();

const DEFAULT_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const DEFAULT_SLOTS = ['Breakfast', 'Lunch', 'Dinner'];

export const MealPlanShoppingProvider = ({ children }) => {
  const { user, token } = useAuth();
  
  const [mealPlan, setMealPlan] = useState(() => {
    try {
      const saved = localStorage.getItem('fn_meal_plan');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [shoppingList, setShoppingList] = useState(() => {
    try {
      const saved = localStorage.getItem('fn_shopping_list');
      return saved ? JSON.parse(saved) : [
        { id: '1', item: 'Fresh Rosemary & Thyme', amount: '1 bunch', category: 'Produce', checked: false, recipeSource: 'Tuscan Truffle Butter Ribeye' },
        { id: '2', item: 'Prime Dry-Aged Ribeye', amount: '2 steaks (16 oz)', category: 'Meat & Seafood', checked: false, recipeSource: 'Tuscan Truffle Butter Ribeye' },
        { id: '3', item: 'San Marzano D.O.P. Tomatoes', amount: '1 can (28 oz)', category: 'Pantry', checked: true, recipeSource: 'Neapolitan Margherita' },
        { id: '4', item: 'Fresh Fior di Latte Mozzarella', amount: '250g', category: 'Dairy', checked: false, recipeSource: 'Neapolitan Margherita' }
      ];
    } catch {
      return [];
    }
  });

  // Sync with user profile when logged in
  useEffect(() => {
    if (user?.mealPlan && user.mealPlan.length > 0) {
      setMealPlan(user.mealPlan);
    }
    if (user?.shoppingList && user.shoppingList.length > 0) {
      setShoppingList(user.shoppingList);
    }
  }, [user]);

  // Persist locally
  useEffect(() => {
    localStorage.setItem('fn_meal_plan', JSON.stringify(mealPlan));
  }, [mealPlan]);

  useEffect(() => {
    localStorage.setItem('fn_shopping_list', JSON.stringify(shoppingList));
  }, [shoppingList]);

  // Meal Planner operations
  const assignRecipeToMealPlan = async (day, slot, recipe, customNotes = '') => {
    const newSlot = {
      _id: Date.now().toString(),
      day,
      slot,
      recipe: recipe,
      customTitle: recipe.title,
      notes: customNotes,
      completed: false,
    };

    setMealPlan((prev) => {
      const filtered = prev.filter((item) => !(item.day === day && item.slot === slot));
      return [...filtered, newSlot];
    });

    if (token) {
      try {
        await api.addMealPlanSlot(token, {
          day,
          slot,
          recipeId: recipe._id || recipe.id,
          customTitle: recipe.title,
          notes: customNotes,
        });
      } catch (e) {
        console.error('Failed to sync meal plan slot:', e);
      }
    }
  };

  const removeMealPlanSlot = async (slotId) => {
    setMealPlan((prev) => prev.filter((s) => s._id !== slotId && s.id !== slotId));
    if (token) {
      try {
        await api.removeMealPlanSlot(token, slotId);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const toggleMealPlanCompleted = (slotId) => {
    setMealPlan((prev) =>
      prev.map((s) =>
        (s._id === slotId || s.id === slotId) ? { ...s, completed: !s.completed } : s
      )
    );
  };

  // Shopping list operations
  const addIngredientsFromRecipe = async (recipe) => {
    if (!recipe.ingredients || recipe.ingredients.length === 0) return 0;

    const newItems = recipe.ingredients.map((ing) => ({
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      item: ing.item,
      amount: ing.amount ? `${ing.amount} ${ing.unit || ''}`.trim() : '',
      category: ing.aisle || 'Produce',
      checked: false,
      recipeSource: recipe.title,
    }));

    setShoppingList((prev) => [...prev, ...newItems]);

    if (token) {
      try {
        await api.addShoppingItems(token, newItems);
      } catch (e) {
        console.error(e);
      }
    }

    return newItems.length;
  };

  const addCustomShoppingItem = async (item, amount = '', category = 'Produce') => {
    const newItem = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      item,
      amount,
      category,
      checked: false,
      recipeSource: 'Custom Item',
    };

    setShoppingList((prev) => [...prev, newItem]);

    if (token) {
      try {
        await api.addShoppingItems(token, [newItem]);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const toggleShoppingItem = async (itemId) => {
    setShoppingList((prev) =>
      prev.map((i) => (i.id === itemId || i._id === itemId) ? { ...i, checked: !i.checked } : i)
    );

    if (token) {
      try {
        await api.toggleShoppingItem(token, itemId);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const removeShoppingItem = async (itemId) => {
    setShoppingList((prev) => prev.filter((i) => i.id !== itemId && i._id !== itemId));

    if (token) {
      try {
        await api.deleteShoppingItem(token, itemId);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const clearCompletedShoppingItems = async () => {
    setShoppingList((prev) => prev.filter((i) => !i.checked));

    if (token) {
      try {
        await api.clearShoppingList(token, true);
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <MealPlanShoppingContext.Provider
      value={{
        mealPlan,
        shoppingList,
        assignRecipeToMealPlan,
        removeMealPlanSlot,
        toggleMealPlanCompleted,
        addIngredientsFromRecipe,
        addCustomShoppingItem,
        toggleShoppingItem,
        removeShoppingItem,
        clearCompletedShoppingItems,
        days: DEFAULT_DAYS,
        slots: DEFAULT_SLOTS,
      }}
    >
      {children}
    </MealPlanShoppingContext.Provider>
  );
};

export const useMealPlanShopping = () => useContext(MealPlanShoppingContext);
