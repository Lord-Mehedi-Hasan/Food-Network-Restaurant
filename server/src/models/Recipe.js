const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
  },
  subtitle: String,
  description: {
    type: String,
    required: true,
  },
  chef: {
    name: { type: String, required: true },
    avatar: String,
    role: String,
    bio: String,
  },
  category: {
    type: String,
    default: 'Recipes & Cooking',
  },
  cuisine: {
    type: String,
    required: true,
    index: true,
  },
  dietaryRestrictions: [{
    type: String,
    index: true,
  }], // e.g., 'Vegan', 'Keto', 'Gluten-Free', 'Vegetarian', 'Low-Carb', 'Halal', 'Dairy-Free'
  prepTimeMinutes: {
    type: Number,
    required: true,
  },
  cookTimeMinutes: {
    type: Number,
    required: true,
  },
  servings: {
    type: Number,
    default: 4,
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Master Chef'],
    default: 'Easy',
  },
  rating: {
    type: Number,
    default: 4.8,
  },
  reviewsCount: {
    type: Number,
    default: 12,
  },
  calories: Number,
  image: {
    type: String,
    required: true,
  },
  videoUrl: String, // embedded step-by-step video or guide
  videoDuration: String,
  ingredients: [{
    item: { type: String, required: true },
    amount: String,
    unit: String,
    aisle: {
      type: String,
      default: 'Produce', // Produce, Meat & Seafood, Dairy, Bakery, Pantry, Spices
    },
  }],
  instructions: [{
    stepNumber: Number,
    instruction: { type: String, required: true },
    tip: String,
    timerMinutes: Number, // interactive countdown timer
  }],
  kitchenTools: [{
    name: String,
    brand: String,
    price: Number,
    affiliateUrl: String, // Affiliate monetization link
    image: String,
  }],
  isSponsored: {
    type: Boolean,
    default: false,
  },
  sponsorName: String, // e.g., 'KitchenAid Artisans', 'Le Creuset Culinary'
  sponsorTagline: String,
  sponsorBanner: String,
  isPremiumOnly: {
    type: Boolean,
    default: false,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  tags: [String],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Recipe', recipeSchema);
