const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const connectDB = require('../config/db');
const User = require('../models/User');
const Recipe = require('../models/Recipe');
const Restaurant = require('../models/Restaurant');
const Beverage = require('../models/Beverage');
const SubscriptionBox = require('../models/SubscriptionBox');
const Event = require('../models/Event');
const Order = require('../models/Order');
const Reservation = require('../models/Reservation');

const { recipes, restaurants, beverages, subscriptionBoxes, events } = require('./seedData');

const seedAll = async () => {
  try {
    console.log('[Seeding]: Connecting to MongoDB...');
    await connectDB();

    console.log('[Seeding]: Clearing existing collections...');
    await Promise.all([
      User.deleteMany({}),
      Recipe.deleteMany({}),
      Restaurant.deleteMany({}),
      Beverage.deleteMany({}),
      SubscriptionBox.deleteMany({}),
      Event.deleteMany({}),
      Order.deleteMany({}),
      Reservation.deleteMany({}),
    ]);

    console.log('[Seeding]: Creating demo users...');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    const demoUsers = await User.create([
      {
        name: 'Chef Marco Bellini',
        email: 'chef@foodnetwork.com',
        password: hashedPassword,
        role: 'restaurant_partner',
        avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=300&q=80',
        subscription: {
          isPremium: true,
          tier: 'chef_club',
          validUntil: new Date('2028-01-01'),
        },
      },
      {
        name: 'Sarah Jenkins (Foodie & Home Cook)',
        email: 'foodie@foodnetwork.com',
        password: hashedPassword,
        role: 'customer',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        subscription: {
          isPremium: true,
          tier: 'chef_club',
          validUntil: new Date('2027-12-31'),
        },
        mealPlan: [
          {
            day: 'Monday',
            slot: 'Dinner',
            customTitle: 'Tuscan Truffle Butter Ribeye',
            completed: false,
          },
          {
            day: 'Wednesday',
            slot: 'Dinner',
            customTitle: 'Authentic Neapolitan Margherita Pizza',
            completed: false,
          },
          {
            day: 'Friday',
            slot: 'Dinner',
            customTitle: 'Artisan Wild King Salmon Bowl',
            completed: false,
          }
        ],
        shoppingList: [
          {
            id: 'sl-1',
            item: 'Prime Dry-Aged Ribeye',
            amount: '2 steaks (16 oz each)',
            category: 'Meat & Seafood',
            checked: false,
            recipeSource: 'Tuscan Truffle Butter Ribeye',
          },
          {
            id: 'sl-2',
            item: 'San Marzano D.O.P. Whole Peeled Tomatoes',
            amount: '1 can (28 oz)',
            category: 'Pantry',
            checked: true,
            recipeSource: 'Neapolitan Margherita Pizza',
          },
          {
            id: 'sl-3',
            item: 'Fresh Fior di Latte Mozzarella',
            amount: '250 grams',
            category: 'Dairy',
            checked: false,
            recipeSource: 'Neapolitan Margherita Pizza',
          },
          {
            id: 'sl-4',
            item: 'Wild Alaskan King Salmon fillets',
            amount: '2 fillets',
            category: 'Meat & Seafood',
            checked: false,
            recipeSource: 'Artisan Wild King Salmon Bowl',
          }
        ],
      },
      {
        name: 'Alex Rivera (Admin & Culinary Director)',
        email: 'admin@foodnetwork.com',
        password: hashedPassword,
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
        subscription: {
          isPremium: true,
          tier: 'chef_club',
          validUntil: new Date('2030-01-01'),
        },
      }
    ]);

    console.log(`[Seeding]: Created ${demoUsers.length} users.`);

    console.log('[Seeding]: Inserting Recipes...');
    const insertedRecipes = await Recipe.insertMany(recipes);
    console.log(`[Seeding]: Inserted ${insertedRecipes.length} recipes.`);

    // Attach first recipe to foodie user's meal plan
    const foodie = demoUsers.find(u => u.email === 'foodie@foodnetwork.com');
    if (foodie && insertedRecipes.length > 0) {
      foodie.savedRecipes.push(insertedRecipes[0]._id, insertedRecipes[1]._id);
      foodie.mealPlan[0].recipe = insertedRecipes[0]._id;
      foodie.mealPlan[1].recipe = insertedRecipes[1]._id;
      foodie.mealPlan[2].recipe = insertedRecipes[2]._id;
      await foodie.save();
    }

    console.log('[Seeding]: Inserting Restaurants...');
    const insertedRestaurants = await Restaurant.insertMany(restaurants);
    console.log(`[Seeding]: Inserted ${insertedRestaurants.length} restaurants.`);

    console.log('[Seeding]: Inserting Beverages...');
    const insertedBeverages = await Beverage.insertMany(beverages);
    console.log(`[Seeding]: Inserted ${insertedBeverages.length} beverages.`);

    console.log('[Seeding]: Inserting Subscription Boxes...');
    const insertedBoxes = await SubscriptionBox.insertMany(subscriptionBoxes);
    console.log(`[Seeding]: Inserted ${insertedBoxes.length} subscription boxes.`);

    console.log('[Seeding]: Inserting Events...');
    const insertedEvents = await Event.insertMany(events);
    console.log(`[Seeding]: Inserted ${insertedEvents.length} events.`);

    // Insert sample orders and reservations to populate metrics
    console.log('[Seeding]: Inserting Sample Orders & Reservations...');
    await Reservation.create({
      restaurant: insertedRestaurants[0]._id,
      restaurantName: insertedRestaurants[0].name,
      guestName: 'Sarah Jenkins',
      guestEmail: 'foodie@foodnetwork.com',
      guestPhone: '(555) 234-8901',
      partySize: 4,
      date: '2026-10-24',
      timeSlot: '7:45 PM',
      seatingArea: 'Glasshouse Patio',
      specialRequests: 'Celebrating a culinary milestone!',
      occasion: 'Anniversary',
      confirmationCode: 'FN-RES-883912',
      status: 'confirmed',
    });

    await Order.create({
      orderNumber: 'FN-839201-441',
      user: foodie._id,
      restaurant: insertedRestaurants[0]._id,
      restaurantName: insertedRestaurants[0].name,
      orderType: 'delivery',
      customer: {
        name: 'Sarah Jenkins',
        email: 'foodie@foodnetwork.com',
        phone: '(555) 234-8901',
      },
      deliveryAddress: {
        street: '742 Evergreen Terrace, Apt 4B',
        city: 'Culinary City',
        state: 'NY',
        zip: '10014',
        instructions: 'Please ring unit 4B on intercom',
      },
      items: [
        {
          itemId: 'obv-2',
          name: 'Handcrafted Tagliolini al Tartufo Nero',
          price: 36.00,
          quantity: 2,
          category: 'Handcrafted Pastas',
        },
        {
          itemId: 'obv-3',
          name: 'Burrata di Puglia with Heirloom Roasted Figs',
          price: 24.00,
          quantity: 1,
          category: 'Appetizers',
        }
      ],
      subtotal: 96.00,
      tax: 7.92,
      deliveryFee: 4.99,
      serviceFee: 2.49,
      commissionAmount: 11.52,
      total: 111.40,
      status: 'preparing',
      paymentMethod: 'credit_card',
      paymentStatus: 'paid',
      estimatedDeliveryTime: '30-40 min',
      statusHistory: [
        {
          status: 'received',
          timestamp: new Date(Date.now() - 15 * 60 * 1000),
          message: 'Order received and confirmed with culinary team',
        },
        {
          status: 'preparing',
          timestamp: new Date(Date.now() - 8 * 60 * 1000),
          message: 'Chef is handcrafting your truffle tagliolini and burrata',
        }
      ],
    });

    console.log('✅ [Seeding Complete]: All MERN database collections successfully initialized!');
    process.exit(0);
  } catch (error) {
    console.error('❌ [Seeding Error]:', error);
    process.exit(1);
  }
};

seedAll();
