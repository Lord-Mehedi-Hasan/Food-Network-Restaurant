const mongoose = require('mongoose');

const subscriptionBoxSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  tagline: String,
  type: {
    type: String,
    enum: ['Wine Club', 'Coffee Roasters Vault', 'Craft Mixology Box'],
    required: true,
  },
  pricePerMonth: {
    type: Number,
    required: true,
  },
  frequencyOptions: [String], // ['Monthly', 'Bi-Monthly', 'Quarterly']
  description: String,
  image: String,
  perks: [String],
  sampleBottlesOrPacks: [String],
  subscriberCount: {
    type: Number,
    default: 1420,
  },
  badge: String, // 'Most Popular', 'Master Sommelier Curated', 'Barista Gold'
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('SubscriptionBox', subscriptionBoxSchema);
