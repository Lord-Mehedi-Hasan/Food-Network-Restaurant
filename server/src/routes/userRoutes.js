const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Recipe = require('../models/Recipe');
const { requireAuth } = require('../middleware/auth');

// Toggle Saved Recipe
router.post('/saved-recipes/:recipeId', requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const recipeId = req.params.recipeId;

    const exists = user.savedRecipes.some(id => id.toString() === recipeId);
    if (exists) {
      user.savedRecipes = user.savedRecipes.filter(id => id.toString() !== recipeId);
    } else {
      user.savedRecipes.push(recipeId);
    }
    await user.save();

    res.json({
      success: true,
      saved: !exists,
      savedRecipes: user.savedRecipes,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get Meal Plan
router.get('/meal-plan', requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('mealPlan.recipe');
    res.json({ success: true, mealPlan: user.mealPlan || [] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Add / Update Meal Plan Slot
router.post('/meal-plan', requireAuth, async (req, res) => {
  try {
    const { day, slot, recipeId, customTitle, notes } = req.body;
    const user = await User.findById(req.user._id);

    // Remove existing if any on same day and slot, or update
    user.mealPlan = user.mealPlan.filter(item => !(item.day === day && item.slot === slot));
    user.mealPlan.push({
      day,
      slot,
      recipe: recipeId || null,
      customTitle: customTitle || 'Chef Special',
      notes: notes || '',
      completed: false,
    });

    await user.save();
    const updatedUser = await User.findById(req.user._id).populate('mealPlan.recipe');
    res.json({ success: true, mealPlan: updatedUser.mealPlan });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Remove Meal Plan Slot
router.delete('/meal-plan/:slotId', requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.mealPlan = user.mealPlan.filter(item => item._id.toString() !== req.params.slotId);
    await user.save();
    res.json({ success: true, mealPlan: user.mealPlan });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get Shopping List
router.get('/shopping-list', requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({ success: true, shoppingList: user.shoppingList || [] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Add Single or Multiple Items to Shopping List
router.post('/shopping-list', requireAuth, async (req, res) => {
  try {
    const { items } = req.body; // array of { item, amount, category, recipeSource }
    const user = await User.findById(req.user._id);

    if (Array.isArray(items)) {
      items.forEach(itm => {
        user.shoppingList.push({
          id: Date.now().toString() + Math.random().toString(36).substring(2, 7),
          item: itm.item,
          amount: itm.amount || '',
          category: itm.category || 'Produce',
          checked: false,
          recipeSource: itm.recipeSource || '',
        });
      });
    } else if (req.body.item) {
      user.shoppingList.push({
        id: Date.now().toString() + Math.random().toString(36).substring(2, 7),
        item: req.body.item,
        amount: req.body.amount || '',
        category: req.body.category || 'Produce',
        checked: false,
        recipeSource: req.body.recipeSource || '',
      });
    }

    await user.save();
    res.json({ success: true, shoppingList: user.shoppingList });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Toggle Shopping List Item Checked
router.put('/shopping-list/:itemId/toggle', requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const item = user.shoppingList.find(i => i.id === req.params.itemId || i._id?.toString() === req.params.itemId);
    if (item) {
      item.checked = !item.checked;
      await user.save();
    }
    res.json({ success: true, shoppingList: user.shoppingList });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete Item from Shopping List
router.delete('/shopping-list/:itemId', requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.shoppingList = user.shoppingList.filter(i => i.id !== req.params.itemId && i._id?.toString() !== req.params.itemId);
    await user.save();
    res.json({ success: true, shoppingList: user.shoppingList });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Clear Checked or All Shopping List Items
router.delete('/shopping-list', requireAuth, async (req, res) => {
  try {
    const { onlyChecked } = req.query;
    const user = await User.findById(req.user._id);
    if (onlyChecked === 'true') {
      user.shoppingList = user.shoppingList.filter(i => !i.checked);
    } else {
      user.shoppingList = [];
    }
    await user.save();
    res.json({ success: true, shoppingList: user.shoppingList });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
