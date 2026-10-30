const express = require('express');
const router = express.Router();
const Beverage = require('../models/Beverage');
const SubscriptionBox = require('../models/SubscriptionBox');
const Event = require('../models/Event');
const { optionalAuth, requireAuth } = require('../middleware/auth');

// Get all beverages with filters (cocktails, wine, coffee, craft spirits)
router.get('/', async (req, res) => {
  try {
    const {
      type,
      spiritOrBase,
      flavor,
      ecommerceOnly,
      q,
      limit = 40,
    } = req.query;

    const filter = {};

    if (q) {
      filter.$or = [
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { spiritOrBase: { $regex: q, $options: 'i' } },
        { flavorProfile: { $in: [new RegExp(q, 'i')] } },
      ];
    }

    if (type && type !== 'All') {
      filter.type = type;
    }

    if (spiritOrBase && spiritOrBase !== 'All') {
      filter.spiritOrBase = new RegExp(`^${spiritOrBase}$`, 'i');
    }

    if (flavor && flavor !== 'All') {
      filter.flavorProfile = { $in: [new RegExp(`^${flavor}$`, 'i')] };
    }

    if (ecommerceOnly === 'true') {
      filter.isEcommerceProduct = true;
    }

    const beverages = await Beverage.find(filter).sort({ rating: -1, isSponsored: -1 }).limit(Number(limit));
    res.json({ success: true, count: beverages.length, beverages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single beverage by ID or Slug
router.get('/item/:idOrSlug', async (req, res) => {
  try {
    const { idOrSlug } = req.params;
    let beverage;
    if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
      beverage = await Beverage.findById(idOrSlug);
    } else {
      beverage = await Beverage.findOne({ slug: idOrSlug });
    }

    if (!beverage) {
      return res.status(404).json({ success: false, message: 'Beverage not found' });
    }

    res.json({ success: true, beverage });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get Subscription Boxes
router.get('/subscription-boxes', async (req, res) => {
  try {
    const boxes = await SubscriptionBox.find({ isActive: true });
    res.json({ success: true, boxes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Join a Subscription Box (Monetization)
router.post('/subscription-boxes/join', optionalAuth, async (req, res) => {
  try {
    const { boxId, frequency = 'Monthly', subscriberName, subscriberEmail, shippingAddress } = req.body;
    const box = await SubscriptionBox.findById(boxId);
    if (!box) {
      return res.status(404).json({ success: false, message: 'Subscription box not found' });
    }

    box.subscriberCount += 1;
    await box.save();

    const membershipId = `CLUB-${Math.floor(100000 + Math.random() * 900000)}`;

    res.status(201).json({
      success: true,
      message: `Welcome to the ${box.title}! Your first curated box is scheduled for dispatch.`,
      membership: {
        membershipId,
        boxTitle: box.title,
        pricePerMonth: box.pricePerMonth,
        frequency,
        subscriberEmail,
        joinedAt: new Date(),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get Culinary & Beverage Events
router.get('/events', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json({ success: true, events });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Book Event Ticket (Monetization)
router.post('/events/book-ticket', optionalAuth, async (req, res) => {
  try {
    const { eventId, ticketsCount = 1, attendeeName, attendeeEmail } = req.body;
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    const count = Number(ticketsCount);
    if (event.availableSeats < count) {
      return res.status(400).json({ success: false, message: 'Not enough seats available' });
    }

    event.availableSeats -= count;
    await event.save();

    const ticketCode = `TKT-${Math.floor(100000 + Math.random() * 900000)}`;
    const totalAmount = event.ticketPrice * count;

    res.status(201).json({
      success: true,
      message: 'Tickets confirmed successfully!',
      ticket: {
        ticketCode,
        eventTitle: event.title,
        date: event.date,
        time: event.time,
        location: event.location,
        seatsBooked: count,
        totalAmount,
        attendeeName,
        attendeeEmail,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
