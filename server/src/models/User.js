const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['customer', 'restaurant_partner', 'admin'],
    default: 'customer',
  },
  avatar: {
    type: String,
    default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  },
  subscription: {
    isPremium: {
      type: Boolean,
      default: false,
    },
    tier: {
      type: String,
      enum: ['free', 'chef_club', 'sommelier_reserve'],
      default: 'free',
    },
    validUntil: {
      type: Date,
      default: null,
    },
  },
  savedRecipes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe',
  }],
  mealPlan: [{
    day: {
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      required: true,
    },
    slot: {
      type: String,
      enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack'],
      required: true,
    },
    recipe: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe',
    },
    customTitle: String,
    notes: String,
    completed: {
      type: Boolean,
      default: false,
    },
  }],
  shoppingList: [{
    id: String,
    item: { type: String, required: true },
    amount: String,
    category: {
      type: String,
      default: 'Pantry',
    },
    checked: {
      type: Boolean,
      default: false,
    },
    recipeSource: String,
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema);
