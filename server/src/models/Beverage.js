const mongoose = require('mongoose');

const beverageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
  },
  tagline: String,
  type: {
    type: String,
    enum: ['Cocktail Recipe', 'Wine & Sommelier Guide', 'Artisan Coffee & Tea', 'Craft Spirit / Brewery'],
    required: true,
    index: true,
  },
  category: {
    type: String,
    default: 'Beverages & Drinks',
  },
  spiritOrBase: {
    type: String,
    index: true, // Bourbon, Gin, Tequila, Rum, Vodka, Single Origin Coffee, Ceremonial Matcha, Cabernet, Pinot Noir, Craft Hops
  },
  flavorProfile: [String], // 'Smoky', 'Citrus & Bright', 'Velvety Oaked', 'Floral & Crisp', 'Dark Chocolate & Nutty', 'Berry & Tart'
  abv: {
    type: Number,
    default: 0,
  },
  glassware: String, // Coupe, Highball, Nick & Nora, Glencairn, Wine Goblet, Ceramic Mug
  difficulty: {
    type: String,
    enum: ['Simple', 'Intermediate', 'Mixologist Level'],
    default: 'Simple',
  },
  rating: {
    type: Number,
    default: 4.8,
  },
  reviewsCount: {
    type: Number,
    default: 18,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  
  // Mixology / Brew recipe details
  ingredients: [{
    item: String,
    amount: String,
    isSpecialty: Boolean,
  }],
  steps: [{
    stepNumber: Number,
    instruction: String,
  }],
  proTip: String,

  // Wine / Coffee Tasting Sensory Profile
  tastingNotes: {
    aroma: String,
    body: String, // 'Light', 'Medium-Full', 'Full-Bodied', 'Velvety'
    acidity: String, // 'Bright', 'Balanced', 'Soft'
    finish: String,
    sweetness: String,
  },
  pairingSuggestions: [String], // Pairs with Truffle Pasta, Dry-Aged Ribeye, Lemon Tart, etc.

  // Direct to Consumer (D2C) E-commerce
  isEcommerceProduct: {
    type: Boolean,
    default: false,
  },
  price: Number,
  inStock: {
    type: Boolean,
    default: true,
  },
  stockCount: {
    type: Number,
    default: 25,
  },
  bottleOrBagSize: String, // '750 ml', '12 oz (340g)', '500 ml'
  regionOrOrigin: String, // 'Napa Valley, CA', 'Yirgacheffe, Ethiopia', 'Oaxaca, Mexico', 'Kyoto, Japan'
  roasterOrDistiller: String,

  // Brand Sponsorship
  isSponsored: {
    type: Boolean,
    default: false,
  },
  sponsorName: String,
  affiliateShopLink: String,
}, {
  timestamps: true,
});

module.exports = mongoose.model('Beverage', beverageSchema);
