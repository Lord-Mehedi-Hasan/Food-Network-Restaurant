const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  id: { type: String, required: true },
  category: {
    type: String,
    required: true,
  }, // Appetizers, Chef Specialties, Handcrafted Pastas, Wood-Fired, Desserts, Cocktails
  name: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  image: String,
  isSpicy: { type: Boolean, default: false },
  dietary: [String], // Vegan, Vegetarian, Gluten-Free, Halal
  allergens: [String], // Dairy, Nuts, Shellfish, Gluten
  popular: { type: Boolean, default: false },
  calories: Number,
});

const reviewSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  userAvatar: String,
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  dishRecommended: String,
  photo: String,
  createdAt: { type: Date, default: Date.now },
});

const restaurantSchema = new mongoose.Schema({
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
  description: {
    type: String,
    required: true,
  },
  logo: String,
  coverImage: {
    type: String,
    required: true,
  },
  gallery: [String],
  cuisineTypes: [{
    type: String,
    index: true,
  }],
  diningStyle: {
    type: String,
    enum: ['Fine Dining', 'Casual Dining', 'Bistro & Lounge', 'Wood-Fired Pizzeria', 'Artisan Bakery & Cafe', 'Omakase Bar', 'Gastropub', 'Craft Brewery', 'Wine Bar'],
    default: 'Casual Dining',
  },
  priceRange: {
    type: String,
    enum: ['$', '$$', '$$$', '$$$$'],
    default: '$$',
  },
  rating: {
    type: Number,
    default: 4.8,
  },
  reviewCount: {
    type: Number,
    default: 84,
  },
  address: {
    street: String,
    neighborhood: String,
    city: String,
    state: String,
    zip: String,
    coordinates: {
      lat: Number,
      lng: Number,
    },
  },
  phone: String,
  openingHours: String,
  website: String,
  features: [String], // 'Valet Parking', 'Chef Tasting Table', 'Heated Patio', 'Cocktail Lounge', 'Wheelchair Accessible'
  
  // Monetization fields
  isFeatured: {
    type: Boolean,
    default: false,
  },
  commissionRatePercent: {
    type: Number,
    default: 12, // Platform commission fee (12%)
  },
  isPartner: {
    type: Boolean,
    default: true,
  },
  sponsoredBadge: String, // 'Sponsored Pick', 'Michelin Guide Mention'

  menu: [menuItemSchema],
  reviews: [reviewSchema],

  deliveryInfo: {
    estimatedTime: { type: String, default: '30-45 min' },
    deliveryFee: { type: Number, default: 3.99 },
    minOrder: { type: Number, default: 15.00 },
    isDeliveryAvailable: { type: Boolean, default: true },
    isPickupAvailable: { type: Boolean, default: true },
  },

  reservationSettings: {
    acceptsReservations: { type: Boolean, default: true },
    maxPartySize: { type: Number, default: 12 },
    timeSlots: [{
      time: String,
      availableTables: Number,
    }],
    seatingAreas: [String], // 'Main Dining Room', 'Glasshouse Patio', 'Chef Counter', 'Private Cellar Room'
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
