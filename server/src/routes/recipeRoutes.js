const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const { optionalAuth, requireAuth } = require('../middleware/auth');

// Get all recipes with comprehensive filtering
router.get('/', optionalAuth, async (req, res) => {
  try {
    const {
      q,
      cuisine,
      dietary,
      difficulty,
      maxTime,
      sponsored,
      isPremiumOnly,
      limit = 30,
      page = 1,
    } = req.query;

    const filter = {};

    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { 'ingredients.item': { $regex: q, $options: 'i' } },
        { tags: { $in: [new RegExp(q, 'i')] } },
      ];
    }

    if (cuisine && cuisine !== 'All') {
      filter.cuisine = new RegExp(`^${cuisine}$`, 'i');
    }

    if (dietary && dietary !== 'All') {
      filter.dietaryRestrictions = { $in: [new RegExp(`^${dietary}$`, 'i')] };
    }

    if (difficulty && difficulty !== 'All') {
      filter.difficulty = difficulty;
    }

    if (maxTime) {
      const timeNum = Number(maxTime);
      filter.$expr = { $lte: [{ $add: ['$prepTimeMinutes', '$cookTimeMinutes'] }, timeNum] };
    }

    if (sponsored === 'true') {
      filter.isSponsored = true;
    }

    if (isPremiumOnly === 'true') {
      filter.isPremiumOnly = true;
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Recipe.countDocuments(filter);
    const recipes = await Recipe.find(filter)
      .sort({ featured: -1, rating: -1, createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.json({
      success: true,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      recipes,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get featured recipes & sponsor banners
router.get('/featured', async (req, res) => {
  try {
    const featured = await Recipe.find({ featured: true }).limit(6);
    const sponsored = await Recipe.find({ isSponsored: true }).limit(3);
    res.json({ success: true, featured, sponsored });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single recipe
router.get('/:idOrSlug', optionalAuth, async (req, res) => {
  try {
    const { idOrSlug } = req.params;
    let recipe;
    if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
      recipe = await Recipe.findById(idOrSlug);
    } else {
      recipe = await Recipe.findOne({ slug: idOrSlug });
    }

    if (!recipe) {
      return res.status(404).json({ success: false, message: 'Recipe not found' });
    }

    // Check premium access
    const isUserPremium = req.user?.subscription?.isPremium;
    const isLocked = recipe.isPremiumOnly && !isUserPremium;

    res.json({
      success: true,
      recipe,
      isLocked,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create recipe (Chef or Admin)
router.post('/', requireAuth, async (req, res) => {
  try {
    const slug = req.body.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const newRecipe = await Recipe.create({
      ...req.body,
      slug: `${slug}-${Date.now().toString().slice(-4)}`,
      chef: {
        name: req.body.chef?.name || req.user.name,
        avatar: req.body.chef?.avatar || req.user.avatar,
        role: req.body.chef?.role || 'Culinary Creator',
      },
    });

    res.status(201).json({ success: true, recipe: newRecipe });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Rate / Review recipe
router.post('/:id/review', optionalAuth, async (req, res) => {
  try {
    const { rating } = req.body;
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ success: false, message: 'Recipe not found' });
    }

    const currentTotal = recipe.rating * recipe.reviewsCount;
    recipe.reviewsCount += 1;
    recipe.rating = Number(((currentTotal + Number(rating)) / recipe.reviewsCount).toFixed(1));

    await recipe.save();
    res.json({ success: true, rating: recipe.rating, reviewsCount: recipe.reviewsCount });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
