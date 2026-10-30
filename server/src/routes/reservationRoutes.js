const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');
const Restaurant = require('../models/Restaurant');
const { optionalAuth, requireAuth } = require('../middleware/auth');

// Create a table reservation
router.post('/', optionalAuth, async (req, res) => {
  try {
    const {
      restaurantId,
      guestName,
      guestEmail,
      guestPhone,
      partySize,
      date,
      timeSlot,
      seatingArea,
      specialRequests,
      occasion,
    } = req.body;

    if (!restaurantId || !guestName || !guestEmail || !date || !timeSlot || !partySize) {
      return res.status(400).json({ success: false, message: 'Please provide all reservation details' });
    }

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ success: false, message: 'Restaurant not found' });
    }

    const confirmationCode = `FN-RES-${Math.floor(100000 + Math.random() * 900000)}`;

    const reservation = await Reservation.create({
      restaurant: restaurant._id,
      restaurantName: restaurant.name,
      user: req.user?._id || null,
      guestName,
      guestEmail,
      guestPhone: guestPhone || '555-0199',
      partySize: Number(partySize),
      date,
      timeSlot,
      seatingArea: seatingArea || 'Main Dining Room',
      specialRequests: specialRequests || '',
      occasion: occasion || 'Casual Dining',
      confirmationCode,
      status: 'confirmed',
    });

    res.status(201).json({
      success: true,
      message: 'Table reservation successfully confirmed!',
      reservation,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get user reservations
router.get('/my', requireAuth, async (req, res) => {
  try {
    const reservations = await Reservation.find({
      $or: [
        { user: req.user._id },
        { guestEmail: req.user.email },
      ],
    }).sort({ createdAt: -1 });

    res.json({ success: true, reservations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Cancel a reservation
router.put('/:id/cancel', optionalAuth, async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ success: false, message: 'Reservation not found' });
    }

    reservation.status = 'cancelled';
    await reservation.save();

    res.json({ success: true, message: 'Reservation cancelled', reservation });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// All reservations for partners/admins
router.get('/', optionalAuth, async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ createdAt: -1 }).limit(50);
    res.json({ success: true, reservations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
