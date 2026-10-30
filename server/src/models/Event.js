const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  category: {
    type: String,
    enum: ['Wine Tasting Gala', 'Mixology Masterclass', 'Artisan Coffee Roasting', 'Chef & Sommelier Dinner'],
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  host: {
    name: String,
    role: String,
    avatar: String,
  },
  ticketPrice: {
    type: Number,
    required: true,
  },
  availableSeats: {
    type: Number,
    default: 30,
  },
  totalSeats: {
    type: Number,
    default: 40,
  },
  image: String,
  includedItems: [String],
  sponsor: String,
  isFeatured: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Event', eventSchema);
