const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');
const { requireAuth, optionalAuth } = require('../middleware/auth');

// Get all restaurants with filters
router.get('/', async (req, res) => {
  try {
    const {
      q,
      cuisine,
      diningStyle,
      priceRange,
      featured,
      limit = 30,
      page = 1,
    } = req.query;

    const filter = {};

    if (q) {
      filter.$or = [
        { name: { $regex: q, $options: 'i' } },
        { tagline: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { 'address.neighborhood': { $regex: q, $options: 'i' } },
        { 'menu.name': { $regex: q, $options: 'i' } },
      ];
    }

    if (cuisine && cuisine !== 'All') {
      filter.cuisineTypes = { $in: [new RegExp(`^${cuisine}$`, 'i')] };
    }

    if (diningStyle && diningStyle !== 'All') {
      filter.diningStyle = diningStyle;
    }

    if (priceRange && priceRange !== 'All') {
      filter.priceRange = priceRange;
    }

    if (featured === 'true') {
      filter.isFeatured = true;
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Restaurant.countDocuments(filter);
    const restaurants = await Restaurant.find(filter)
      .sort({ isFeatured: -1, rating: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.json({
      success: true,
      total,
      restaurants,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single restaurant
router.get('/:idOrSlug', async (req, res) => {
  try {
    const { idOrSlug } = req.params;
    let restaurant;
    if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
      restaurant = await Restaurant.findById(idOrSlug);
    } else {
      restaurant = await Restaurant.findOne({ slug: idOrSlug });
    }

    if (!restaurant) {
      return res.status(404).json({ success: false, message: 'Restaurant not found' });
    }

    res.json({ success: true, restaurant });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Post a review to a restaurant
router.post('/:id/reviews', optionalAuth, async (req, res) => {
  try {
    const { userName, rating, comment, dishRecommended, photo } = req.body;
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ success: false, message: 'Restaurant not found' });
    }

    const newReview = {
      userName: userName || req.user?.name || 'Gourmet Diner',
      userAvatar: req.user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      rating: Number(rating) || 5,
      comment: comment || 'Sensational food and atmosphere!',
      dishRecommended: dishRecommended || '',
      photo: photo || '',
      createdAt: new Date(),
    };

    restaurant.reviews.unshift(newReview);
    restaurant.reviewCount = restaurant.reviews.length;
    const totalScore = restaurant.reviews.reduce((sum, r) => sum + r.rating, 0);
    restaurant.rating = Number((totalScore / restaurant.reviews.length).toFixed(1));

    await restaurant.save();
    res.status(201).json({ success: true, reviews: restaurant.reviews, rating: restaurant.rating });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
