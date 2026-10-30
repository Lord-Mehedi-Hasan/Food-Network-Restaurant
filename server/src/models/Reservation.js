const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
  },
  restaurantName: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  guestName: {
    type: String,
    required: true,
  },
  guestEmail: {
    type: String,
    required: true,
  },
  guestPhone: {
    type: String,
    required: true,
  },
  partySize: {
    type: Number,
    required: true,
    min: 1,
    max: 20,
  },
  date: {
    type: String, // e.g. '2026-10-25'
    required: true,
  },
  timeSlot: {
    type: String, // e.g. '7:00 PM'
    required: true,
  },
  seatingArea: {
    type: String,
    default: 'Main Dining Room',
  },
  specialRequests: String,
  occasion: String, // 'Anniversary', 'Birthday', 'Business Dinner', 'Casual'
  status: {
    type: String,
    enum: ['confirmed', 'seated', 'cancelled', 'completed'],
    default: 'confirmed',
  },
  confirmationCode: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Reservation', reservationSchema);
