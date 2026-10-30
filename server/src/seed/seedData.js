const recipes = [
  {
    title: 'Tuscan Truffle Butter Ribeye with Roasted Garlic Pomme Purée',
    slug: 'tuscan-truffle-butter-ribeye',
    subtitle: 'Prime dry-aged ribeye seared in cast iron with rosemary and black truffle butter',
    description: 'A decadent steakhouse centerpiece featuring a thick-cut prime ribeye basted in foaming garlic-rosemary butter, finished with shaved black summer truffles and silky potato purée.',
    chef: {
      name: 'Chef Marco Bellini',
      avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=300&q=80',
      role: 'Executive Chef & Food Network Star',
      bio: 'Michelin-trained Tuscan chef specializing in open-fire meats and artisanal butchery.',
    },
    cuisine: 'Italian',
    dietaryRestrictions: ['Keto', 'Low-Carb', 'Gluten-Free'],
    prepTimeMinutes: 20,
    cookTimeMinutes: 25,
    servings: 2,
    difficulty: 'Medium',
    rating: 4.9,
    reviewsCount: 38,
    calories: 820,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/embed/nsw0Px-Pho8',
    videoDuration: '8:45',
    isSponsored: true,
    sponsorName: 'Lodge Cast Iron Artisans',
    sponsorTagline: 'Unmatched heat retention for restaurant-quality searing at home.',
    sponsorBanner: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
    isPremiumOnly: false,
    featured: true,
    tags: ['Steak', 'Date Night', 'Truffle', 'Keto Favorite'],
    ingredients: [
      { item: 'Prime Dry-Aged Ribeye (1.5 inch thick)', amount: '2 steaks (16 oz each)', unit: 'steaks', aisle: 'Meat & Seafood' },
      { item: 'Unsalted European Butter', amount: '4', unit: 'tbsp', aisle: 'Dairy' },
      { item: 'Black Truffle Butter or Oil', amount: '2', unit: 'tbsp', aisle: 'Pantry' },
      { item: 'Fresh Rosemary & Thyme sprigs', amount: '6', unit: 'sprigs', aisle: 'Produce' },
      { item: 'Whole Garlic cloves, crushed', amount: '6', unit: 'cloves', aisle: 'Produce' },
      { item: 'Flaky Maldon Sea Salt & Fresh Black Peppercorns', amount: '1', unit: 'tbsp', aisle: 'Spices' },
      { item: 'Yukon Gold Potatoes', amount: '2', unit: 'lbs', aisle: 'Produce' },
      { item: 'Heavy Cream', amount: '1/2', unit: 'cup', aisle: 'Dairy' }
    ],
    instructions: [
      {
        stepNumber: 1,
        instruction: 'Bring steaks to room temperature for 30 minutes. Pat completely dry with paper towels, then generously season every surface with coarse kosher salt and freshly cracked black pepper.',
        tip: 'Dry steak skin creates an ultra-crispy caramelized crust.',
        timerMinutes: 30
      },
      {
        stepNumber: 2,
        instruction: 'Preheat a heavy 12-inch cast-iron skillet over high heat until wisps of smoke appear. Add high-smoke point oil and gently lay the steaks away from you.',
        tip: 'Press gently with tongs to ensure full surface contact with the pan.',
        timerMinutes: 2
      },
      {
        stepNumber: 3,
        instruction: 'Sear for 3 minutes without moving, then flip. Drop in the European butter, crushed garlic, and rosemary sprigs. Tilt the pan and continuously spoon the foaming herb butter over the steaks for 3-4 minutes for medium-rare (130°F).',
        tip: 'Aroser (basting) caramelizes the exterior while cooking the core gently.',
        timerMinutes: 4
      },
      {
        stepNumber: 4,
        instruction: 'Transfer steaks to a cutting board, crown with a dollop of black truffle butter, and rest for 8 minutes before slicing across the grain.',
        tip: 'Resting allows juices to redistribute so steak stays succulent.',
        timerMinutes: 8
      }
    ],
    kitchenTools: [
      {
        name: 'Lodge 12-Inch Pre-Seasoned Cast Iron Skillet',
        brand: 'Lodge Cast Iron',
        price: 39.90,
        affiliateUrl: 'https://amazon.com/dp/B00006JSUA?tag=foodnetwork-affiliate-20',
        image: 'https://images.unsplash.com/photo-1584990347449-39906666e855?auto=format&fit=crop&w=400&q=80'
      },
      {
        name: 'Instant Read Digital Meat Thermometer Pro',
        brand: 'ThermoPro',
        price: 24.99,
        affiliateUrl: 'https://amazon.com/dp/B01IHHLB3W?tag=foodnetwork-affiliate-20',
        image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=400&q=80'
      }
    ]
  },
  {
    title: 'Authentic Neapolitan Margherita Pizza with San Marzano Crushed Sauce',
    slug: 'authentic-neapolitan-margherita-pizza',
    subtitle: '72-hour cold fermented dough, sweet San Marzano tomatoes, and fresh Fior di Latte mozzarella',
    description: 'The quintessential Italian classic. Charred leopard-spotted crust, fragrant basil leaves, and creamy molten mozzarella over sweet Italian plum tomatoes.',
    chef: {
      name: 'Chef Sofia Rossi',
      avatar: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=300&q=80',
      role: 'Master Pizzaiola & Author',
      bio: 'Born in Naples, certified master instructor of VPN (Verace Pizza Napoletana).',
    },
    cuisine: 'Italian',
    dietaryRestrictions: ['Vegetarian'],
    prepTimeMinutes: 25,
    cookTimeMinutes: 8,
    servings: 4,
    difficulty: 'Medium',
    rating: 4.95,
    reviewsCount: 72,
    calories: 640,
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/embed/Svbm884pQ4Q',
    videoDuration: '10:12',
    isSponsored: false,
    isPremiumOnly: false,
    featured: true,
    tags: ['Pizza', 'Wood-Fired', 'Vegetarian', 'Italian Classic'],
    ingredients: [
      { item: 'Tipo 00 Italian Pizza Flour', amount: '500', unit: 'grams', aisle: 'Pantry' },
      { item: 'San Marzano D.O.P. Whole Peeled Tomatoes', amount: '1', unit: 'can (28 oz)', aisle: 'Pantry' },
      { item: 'Fresh Fior di Latte Mozzarella (drained)', amount: '250', unit: 'grams', aisle: 'Dairy' },
      { item: 'Fresh Sweet Basil leaves', amount: '15', unit: 'leaves', aisle: 'Produce' },
      { item: 'Extra Virgin Olive Oil (first cold press)', amount: '2', unit: 'tbsp', aisle: 'Pantry' },
      { item: 'Active Dry Yeast', amount: '1', unit: 'tsp', aisle: 'Pantry' },
      { item: 'Sea Salt', amount: '10', unit: 'grams', aisle: 'Spices' }
    ],
    instructions: [
      {
        stepNumber: 1,
        instruction: 'Hand-crush San Marzano tomatoes with a pinch of sea salt. Do not blend, keeping natural rustic texture.',
        tip: 'Blending aerates tomatoes and turns them orange; hand-crushing preserves ruby red sweetness.',
        timerMinutes: 5
      },
      {
        stepNumber: 2,
        instruction: 'Stretch proofed dough ball from center outward on a semolina-dusted board, preserving a puffy 1-inch crust border (cornicione).',
        tip: 'Never use a rolling pin; it pushes out the airy carbon dioxide bubbles.',
        timerMinutes: 3
      },
      {
        stepNumber: 3,
        instruction: 'Ladle crushed tomatoes evenly, tear fresh mozzarella pieces over the surface, scatter basil, and drizzle extra virgin olive oil.',
        tip: 'Drain mozzarella well so excess water doesn’t make the center soggy.',
        timerMinutes: 2
      },
      {
        stepNumber: 4,
        instruction: 'Bake on a preheated pizza stone or steel at 500°F (or 900°F in an outdoor pizza oven) until blistered and crust is charred.',
        tip: 'Watch for the signature leopard spotting on the cornicione.',
        timerMinutes: 7
      }
    ],
    kitchenTools: [
      {
        name: 'Ooni Koda 16 Gas-Powered Outdoor Pizza Oven',
        brand: 'Ooni',
        price: 599.00,
        affiliateUrl: 'https://ooni.com/products/ooni-koda-16?aff=foodnetwork',
        image: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=400&q=80'
      },
      {
        name: 'Aluminum Perforated Pizza Turning Peel 14-inch',
        brand: 'Gi.Metal',
        price: 49.95,
        affiliateUrl: 'https://amazon.com/dp/B085V8Q1XX?tag=foodnetwork-affiliate-20',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80'
      }
    ]
  },
  {
    title: 'Artisan Wild King Salmon Bowl with Quinoa & Citrus Yuzu Ponzu',
    slug: 'artisan-wild-salmon-quinoa-bowl',
    subtitle: 'Pan-crisped Pacific salmon over toasted tricolor quinoa, edamame, and pickled radish',
    description: 'A vibrant, nutrient-dense bowl bursting with omega-3s, crisp vegetables, creamy hass avocado, and a bright Japanese yuzu ponzu reduction.',
    chef: {
      name: 'Chef Kenji Tanaka',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80',
      role: 'Culinary Innovator',
      bio: 'Tokyo-born chef championing sustainable coastal seafood and zero-waste cooking.',
    },
    cuisine: 'Japanese',
    dietaryRestrictions: ['Gluten-Free', 'Dairy-Free', 'Halal'],
    prepTimeMinutes: 15,
    cookTimeMinutes: 15,
    servings: 2,
    difficulty: 'Easy',
    rating: 4.85,
    reviewsCount: 29,
    calories: 580,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/embed/5U2t3CjW7uY',
    videoDuration: '6:30',
    isSponsored: false,
    isPremiumOnly: false,
    featured: true,
    tags: ['Salmon', 'Healthy', 'Bowl', 'Gluten-Free'],
    ingredients: [
      { item: 'Wild Alaskan King Salmon fillets', amount: '2 fillets (6 oz each)', unit: 'fillets', aisle: 'Meat & Seafood' },
      { item: 'Cooked Tricolor Quinoa', amount: '2', unit: 'cups', aisle: 'Pantry' },
      { item: 'Ripe Hass Avocado, sliced', amount: '1', unit: 'avocado', aisle: 'Produce' },
      { item: 'Shelled Edamame beans', amount: '1', unit: 'cup', aisle: 'Produce' },
      { item: 'Japanese Yuzu Juice & Gluten-Free Tamari', amount: '3', unit: 'tbsp', aisle: 'Pantry' },
      { item: 'Toasted Sesame Oil & Toasted Furikake', amount: '1', unit: 'tbsp', aisle: 'Spices' },
      { item: 'Pickled Watermelon Radish & Cucumber', amount: '1/2', unit: 'cup', aisle: 'Produce' }
    ],
    instructions: [
      {
        stepNumber: 1,
        instruction: 'Score salmon skin lightly, pat dry, and season with sea salt.',
        tip: 'Scoring prevents salmon from curling when it hits the hot skillet.',
        timerMinutes: 2
      },
      {
        stepNumber: 2,
        instruction: 'Sear salmon skin-side down in sesame oil over medium heat for 5 minutes until crispy and golden. Flip and cook for 2 more minutes.',
        tip: '90% of cooking is done skin-side down for maximum crunch.',
        timerMinutes: 7
      },
      {
        stepNumber: 3,
        instruction: 'Whisk yuzu juice, tamari, grated fresh ginger, and maple syrup to create the dressing.',
        tip: 'Yuzu adds floral acidity unmatched by ordinary lemons.',
        timerMinutes: 3
      },
      {
        stepNumber: 4,
        instruction: 'Assemble warm quinoa in shallow ceramic bowls, arrange avocado fans, edamame, and radish, top with crispy salmon, and drizzle with yuzu dressing.',
        tip: 'Sprinkle furikake over avocado for crunchy sesame notes.',
        timerMinutes: 2
      }
    ],
    kitchenTools: [
      {
        name: 'Zwilling Pro 8-inch Japanese Chef Knife',
        brand: 'Zwilling J.A. Henckels',
        price: 159.95,
        affiliateUrl: 'https://amazon.com/dp/B00004RFMT?tag=foodnetwork-affiliate-20',
        image: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?auto=format&fit=crop&w=400&q=80'
      }
    ]
  },
  {
    title: 'Slow-Braised Short Rib Ragù over Handcrafted Pappardelle',
    slug: 'slow-braised-short-rib-ragu',
    subtitle: 'Rich Chianti wine braise with aromatic mirepoix, San Marzano tomatoes, and aged Parmigiano Reggiano',
    description: 'Tender beef short ribs gently braised for four hours in Italian red wine until meltingly soft, shredded and folded through broad ribbon pappardelle.',
    chef: {
      name: 'Chef Marco Bellini',
      avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=300&q=80',
      role: 'Executive Chef & Food Network Star',
      bio: 'Michelin-trained Tuscan chef specializing in open-fire meats and artisanal butchery.',
    },
    cuisine: 'Italian',
    dietaryRestrictions: ['Halal'],
    prepTimeMinutes: 30,
    cookTimeMinutes: 240,
    servings: 6,
    difficulty: 'Medium',
    rating: 4.96,
    reviewsCount: 88,
    calories: 780,
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d628108a?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/embed/8eWk89aW5gQ',
    videoDuration: '12:20',
    isSponsored: true,
    sponsorName: 'Le Creuset Enameled Cookware',
    sponsorTagline: 'Heirloom Dutch Ovens handcrafted in France since 1925.',
    sponsorBanner: 'https://images.unsplash.com/photo-1584990347449-39906666e855?auto=format&fit=crop&w=800&q=80',
    isPremiumOnly: false,
    featured: false,
    tags: ['Pasta', 'Comfort Food', 'Beef', 'Slow Cooker'],
    ingredients: [
      { item: 'Bone-in Beef Short Ribs', amount: '3.5', unit: 'lbs', aisle: 'Meat & Seafood' },
      { item: 'Dry Italian Red Wine (Chianti or Sangiovese)', amount: '1', unit: 'bottle (750ml)', aisle: 'Beverages' },
      { item: 'Carrots, Celery, and Yellow Onion (diced fine)', amount: '3', unit: 'cups', aisle: 'Produce' },
      { item: 'San Marzano Whole Plum Tomatoes', amount: '2', unit: 'cans (28 oz each)', aisle: 'Pantry' },
      { item: 'Fresh Handcrafted Pappardelle pasta', amount: '1.2', unit: 'lbs', aisle: 'Bakery' },
      { item: 'Fresh Rosemary, Thyme & Bay Leaves bundle', amount: '1', unit: 'bouquet garni', aisle: 'Produce' },
      { item: 'Parmigiano Reggiano 24-Month Aged', amount: '1', unit: 'wedge', aisle: 'Dairy' }
    ],
    instructions: [
      {
        stepNumber: 1,
        instruction: 'Generously salt short ribs. Sear in heavy Dutch oven until deep mahogany crust forms on all sides, then set aside.',
        tip: 'Fond on bottom of the pot creates deep umami richness.',
        timerMinutes: 12
      },
      {
        stepNumber: 2,
        instruction: 'Sauté mirepoix vegetables until sweet and caramelized. Pour in Chianti wine to deglaze, scraping up all browned bits.',
        tip: 'Reduce wine by half before adding tomatoes.',
        timerMinutes: 10
      },
      {
        stepNumber: 3,
        instruction: 'Return short ribs, add tomatoes, beef stock, and herb bouquet. Cover and braise in oven at 300°F (150°C) for 3.5 hours until fork tender.',
        tip: 'Low, slow heat breaks down collagen into succulent gelatin.',
        timerMinutes: 210
      },
      {
        stepNumber: 4,
        instruction: 'Shred meat, discard bones, and simmer sauce with al dente pappardelle and a splash of starchy pasta water. Garnish with microplaned Parmigiano.',
        tip: 'Pasta water emulsifies the ragù so it clings luxuriously to every noodle.',
        timerMinutes: 5
      }
    ],
    kitchenTools: [
      {
        name: 'Le Creuset Enameled Cast Iron Signature Round Dutch Oven 5.5 Qt',
        brand: 'Le Creuset',
        price: 420.00,
        affiliateUrl: 'https://lecreuset.com/round-dutch-oven?aff=foodnetwork',
        image: 'https://images.unsplash.com/photo-1584990347449-39906666e855?auto=format&fit=crop&w=400&q=80'
      }
    ]
  },
  {
    title: 'Valrhona Grand Cru Molten Dark Chocolate Lava Cake with Tahitian Gelato',
    slug: 'valrhona-molten-dark-chocolate-lava-cake',
    subtitle: '70% Guanaja chocolate with a molten flowing ganache center and Bourbon vanilla gelato',
    description: 'Exclusive Master Chef recipe. Rich French chocolate soufflé exterior giving way to a warm, velvety chocolate river. Reserved exclusively for Food Network Chef Club members.',
    chef: {
      name: 'Pastry Chef Claire Dubois',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
      role: 'Master Chocolatier',
      bio: 'Award-winning Parisian pastry chef and guest judge on Food Network Champion Baker.',
    },
    cuisine: 'French',
    dietaryRestrictions: ['Vegetarian'],
    prepTimeMinutes: 20,
    cookTimeMinutes: 12,
    servings: 4,
    difficulty: 'Master Chef',
    rating: 5.0,
    reviewsCount: 45,
    calories: 520,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/embed/9w_Yh7k0mU0',
    videoDuration: '14:15',
    isSponsored: false,
    isPremiumOnly: true, // Monetization: Premium Chef Club lock
    featured: true,
    tags: ['Chocolate', 'Dessert', 'French', 'Chef Club Exclusive'],
    ingredients: [
      { item: 'Valrhona 70% Guanaja Dark Chocolate Discs', amount: '200', unit: 'grams', aisle: 'Pantry' },
      { item: 'European High-Fat Cultured Butter', amount: '100', unit: 'grams', aisle: 'Dairy' },
      { item: 'Free-Range Organic Eggs & Egg Yolks', amount: '4', unit: 'eggs', aisle: 'Dairy' },
      { item: 'Superfine Caster Sugar', amount: '60', unit: 'grams', aisle: 'Pantry' },
      { item: 'Organic Pastry Flour', amount: '35', unit: 'grams', aisle: 'Pantry' },
      { item: 'Tahitian Vanilla Bean Gelato', amount: '1', unit: 'pint', aisle: 'Dairy' }
    ],
    instructions: [
      {
        stepNumber: 1,
        instruction: 'Melt Valrhona chocolate and butter in a heatproof bowl set over simmering water (bain-marie) until silky smooth.',
        tip: 'Ensure bowl does not touch water directly to avoid scorching delicate cocoa solids.',
        timerMinutes: 6
      },
      {
        stepNumber: 2,
        instruction: 'Whisk eggs, egg yolks, and sugar until pale, ribbon-like, and doubled in volume.',
        tip: 'Whisking air into the eggs provides the lift instead of baking powder.',
        timerMinutes: 5
      },
      {
        stepNumber: 3,
        instruction: 'Gently fold chocolate into whipped eggs, then sift flour over the top and fold with rubber spatula.',
        tip: 'Fold gently in an infinity pattern to prevent deflating batter.',
        timerMinutes: 3
      },
      {
        stepNumber: 4,
        instruction: 'Butter ramekins, dust with Valrhona cocoa powder, pour batter, and bake at 400°F (200°C) for precisely 11 minutes.',
        tip: 'The center must jiggle softly when nudged while the rim is set.',
        timerMinutes: 11
      }
    ],
    kitchenTools: [
      {
        name: 'KitchenAid Artisan Series 5-Quart Stand Mixer',
        brand: 'KitchenAid',
        price: 449.99,
        affiliateUrl: 'https://kitchenaid.com/stand-mixers?aff=foodnetwork',
        image: 'https://images.unsplash.com/photo-1594385208974-2e75f8d7bb48?auto=format&fit=crop&w=400&q=80'
      }
    ]
  },
  {
    title: 'Crispy Korean Gochujang Glazed Cauliflower Wings',
    slug: 'crispy-korean-gochujang-cauliflower',
    subtitle: 'Double-dredged cauliflower florets tossed in sweet-savory fermented chili sauce with toasted sesame',
    description: 'An addictive plant-based sensation! Extra crunchy batter drenched in fiery, savory, and sweet Korean gochujang reduction, topped with scallions and crushed peanuts.',
    chef: {
      name: 'Chef Jin-Woo Park',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      role: 'Seoul Street Food Master',
      bio: 'Popular culinary YouTuber and cookbook author known for reinventing Korean classics.',
    },
    cuisine: 'Korean',
    dietaryRestrictions: ['Vegan', 'Vegetarian', 'Dairy-Free'],
    prepTimeMinutes: 15,
    cookTimeMinutes: 20,
    servings: 4,
    difficulty: 'Easy',
    rating: 4.88,
    reviewsCount: 54,
    calories: 340,
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/embed/5F_1lW8wZ_A',
    videoDuration: '7:40',
    isSponsored: false,
    isPremiumOnly: false,
    featured: false,
    tags: ['Vegan', 'Korean', 'Spicy', 'Appetizer'],
    ingredients: [
      { item: 'Large Head of Cauliflower (cut into florets)', amount: '1', unit: 'head', aisle: 'Produce' },
      { item: 'Cornstarch & All-Purpose Flour blend', amount: '1', unit: 'cup', aisle: 'Pantry' },
      { item: 'Ice-Cold Sparkling Water', amount: '1', unit: 'cup', aisle: 'Beverages' },
      { item: 'Korean Gochujang Fermented Chili Paste', amount: '3', unit: 'tbsp', aisle: 'Pantry' },
      { item: 'Pure Maple Syrup or Agave', amount: '2', unit: 'tbsp', aisle: 'Pantry' },
      { item: 'Toasted Sesame Seeds & Crushed Peanuts', amount: '2', unit: 'tbsp', aisle: 'Pantry' },
      { item: 'Thinly sliced scallions', amount: '3', unit: 'stalks', aisle: 'Produce' }
    ],
    instructions: [
      {
        stepNumber: 1,
        instruction: 'Whisk cornstarch, flour, garlic powder, salt, and cold sparkling water into a tempura-like batter.',
        tip: 'Sparkling water creates tiny carbonation pockets that make the crust shatteringly crisp.',
        timerMinutes: 4
      },
      {
        stepNumber: 2,
        instruction: 'Dip cauliflower florets and fry in hot peanut oil at 375°F (190°C) until golden and crispy (approx. 5 minutes).',
        tip: 'Do not overcrowd the pot or oil temperature drops.',
        timerMinutes: 5
      },
      {
        stepNumber: 3,
        instruction: 'Simmer gochujang, maple syrup, minced garlic, soy sauce, and rice vinegar in a saucepan for 3 minutes until bubbling glaze forms.',
        tip: 'The glaze should coat the back of a wooden spoon.',
        timerMinutes: 3
      },
      {
        stepNumber: 4,
        instruction: 'Toss hot fried cauliflower in glaze until glistening, shower with sesame seeds, peanuts, and scallions, and serve immediately.',
        tip: 'Serve with pickled daikon radish for cooling contrast.',
        timerMinutes: 2
      }
    ],
    kitchenTools: [
      {
        name: 'Digital Air Fryer Pro XL 6-Qt',
        brand: 'Ninja Kitchen',
        price: 129.99,
        affiliateUrl: 'https://amazon.com/dp/B07S65PBMQ?tag=foodnetwork-affiliate-20',
        image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=400&q=80'
      }
    ]
  }
];

const restaurants = [
  {
    name: "L'Osteria Bella Vista",
    slug: 'losteria-bella-vista',
    tagline: 'Modern Tuscan Fine Dining & Wood-Fired Hearth',
    description: 'Perched in the historic culinary quarter, L’Osteria Bella Vista unites traditional Tuscan wood-fire craft with avant-garde Italian gastronomy. Featuring handmade heritage pastas, dry-aged Bistecca alla Fiorentina, and a subterranean 2,000-bottle wine cellar.',
    logo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80'
    ],
    cuisineTypes: ['Italian', 'Fine Dining', 'Wood-Fired', 'Wine Bar'],
    diningStyle: 'Fine Dining',
    priceRange: '$$$$',
    rating: 4.9,
    reviewCount: 142,
    address: {
      street: '450 Grand Riverview Blvd',
      neighborhood: 'Historic District',
      city: 'Culinary City',
      state: 'NY',
      zip: '10014',
    },
    phone: '(212) 555-8940',
    openingHours: 'Tue - Sun: 5:00 PM - 11:00 PM (Closed Mondays)',
    features: ['Chef Tasting Table', 'Private Wine Cellar', 'Valet Parking', 'Wood-Fired Hearth', 'Sommelier on Duty'],
    isFeatured: true,
    commissionRatePercent: 12,
    sponsoredBadge: 'Michelin Guide Recommended 2026',
    deliveryInfo: {
      estimatedTime: '35-50 min',
      deliveryFee: 4.99,
      minOrder: 30.00,
      isDeliveryAvailable: true,
      isPickupAvailable: true,
    },
    reservationSettings: {
      acceptsReservations: true,
      maxPartySize: 12,
      seatingAreas: ['Main Dining Room', 'Glasshouse Patio', "Chef's Counter", 'Private Cellar Room'],
      timeSlots: [
        { time: '5:30 PM', availableTables: 4 },
        { time: '6:15 PM', availableTables: 2 },
        { time: '7:00 PM', availableTables: 1 },
        { time: '7:45 PM', availableTables: 3 },
        { time: '8:30 PM', availableTables: 5 },
        { time: '9:15 PM', availableTables: 4 },
      ]
    },
    menu: [
      {
        id: 'obv-1',
        category: 'Chef Specialties',
        name: 'Dry-Aged Bistecca alla Fiorentina (36 oz)',
        description: 'Prime Chianina beef, rosemary basted over white oak coals, flaky salt, cold-pressed olive oil.',
        price: 98.00,
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
        isSpicy: false,
        dietary: ['Keto', 'Gluten-Free'],
        popular: true,
      },
      {
        id: 'obv-2',
        category: 'Handcrafted Pastas',
        name: 'Handcrafted Tagliolini al Tartufo Nero',
        description: '30-yolk pasta ribbons, cultured butter emulsion, freshly shaved Norcia black truffles.',
        price: 36.00,
        image: 'https://images.unsplash.com/photo-1621996346565-e3d5d628108a?auto=format&fit=crop&w=600&q=80',
        isSpicy: false,
        dietary: ['Vegetarian'],
        popular: true,
      },
      {
        id: 'obv-3',
        category: 'Appetizers',
        name: 'Burrata di Puglia with Heirloom Roasted Figs',
        description: 'Creamy burrata, prosciutto di San Daniele, aged balsamic reduction, grilled focaccia.',
        price: 24.00,
        image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb22509?auto=format&fit=crop&w=600&q=80',
        isSpicy: false,
        dietary: ['Vegetarian'],
        popular: true,
      },
      {
        id: 'obv-4',
        category: 'Wood-Fired',
        name: 'Smoked Provolone & Spicy Nduja Pizza',
        description: 'San Marzano tomatoes, calabrian nduja sausage, smoked provola cheese, wild oregano.',
        price: 26.00,
        image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=600&q=80',
        isSpicy: true,
        dietary: [],
        popular: false,
      },
      {
        id: 'obv-5',
        category: 'Desserts',
        name: 'Classic Espresso Tiramisù al Marsala',
        description: 'House-baked savoiardi dipped in single-origin espresso, mascarpone zabaglione, bitter cocoa.',
        price: 16.00,
        image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80',
        isSpicy: false,
        dietary: ['Vegetarian'],
        popular: true,
      }
    ],
    reviews: [
      {
        userName: 'Elena Rostova',
        userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        comment: 'Hands down the most exquisite Italian dining experience in the state. The black truffle tagliolini is transcendent, and the sommelier wine pairings were spot-on!',
        dishRecommended: 'Handcrafted Tagliolini al Tartufo Nero',
        createdAt: new Date('2026-09-12'),
      },
      {
        userName: 'David Vance',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        comment: 'Reserved the Chef Counter for our anniversary. Watching the culinary brigade work the wood-fired hearth was theater at its finest. 10/10.',
        dishRecommended: 'Dry-Aged Bistecca alla Fiorentina',
        createdAt: new Date('2026-10-02'),
      }
    ]
  },
  {
    name: 'Sakura Omakase & Robata Lounge',
    slug: 'sakura-omakase-robata',
    tagline: 'Artisanal Edomae Sushi & Binchotan Charcoal Robata',
    description: 'An intimate 14-seat cypress sushi counter and izakaya lounge. Fresh seafood air-flown directly from Tokyo’s Toyosu Market three times weekly, paired with rare boutique sakes.',
    logo: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'
    ],
    cuisineTypes: ['Japanese', 'Omakase', 'Sushi', 'Robata Grill'],
    diningStyle: 'Omakase Bar',
    priceRange: '$$$$',
    rating: 4.95,
    reviewCount: 98,
    address: {
      street: '128 Zen Garden Way',
      neighborhood: 'Downtown Arts',
      city: 'Culinary City',
      state: 'NY',
      zip: '10012',
    },
    phone: '(212) 555-7258',
    openingHours: 'Wed - Sun: 5:30 PM & 8:15 PM seatings',
    features: ['14-Seat Hinoki Counter', 'Rare Japanese Whisky Flights', 'Toyosu Direct Seafood', 'Omakase Only'],
    isFeatured: true,
    commissionRatePercent: 15,
    sponsoredBadge: 'Top 10 Culinary Destination 2026',
    deliveryInfo: {
      estimatedTime: '40-55 min',
      deliveryFee: 5.99,
      minOrder: 40.00,
      isDeliveryAvailable: true,
      isPickupAvailable: true,
    },
    reservationSettings: {
      acceptsReservations: true,
      maxPartySize: 6,
      seatingAreas: ['Hinoki Sushi Counter', 'Private Robata Booth'],
      timeSlots: [
        { time: '5:30 PM', availableTables: 2 },
        { time: '8:15 PM', availableTables: 1 },
      ]
    },
    menu: [
      {
        id: 'sak-1',
        category: 'Chef Specialties',
        name: 'Chef Omakase Nigiri Selection (12 Pieces)',
        description: 'Otoro, Uni from Hokkaido, Shima Aji, A5 Miyazaki Wagyu, Akami marinated in aged soy, Tamago.',
        price: 110.00,
        image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=600&q=80',
        isSpicy: false,
        dietary: ['Gluten-Free', 'Halal'],
        popular: true,
      },
      {
        id: 'sak-2',
        category: 'Chef Specialties',
        name: 'A5 Miyazaki Wagyu Robata Skewers',
        description: 'Charred over Japanese Binchotan white coals with freshly grated real wasabi and sea salt.',
        price: 48.00,
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
        isSpicy: false,
        dietary: ['Gluten-Free', 'Keto'],
        popular: true,
      },
      {
        id: 'sak-3',
        category: 'Appetizers',
        name: 'Crispy Rice with Spicy Bluefin Tuna Tartare',
        description: 'Toasted sushi rice cakes crowned with minced bluefin, serrano chili, and sweet eel drizzle.',
        price: 22.00,
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80',
        isSpicy: true,
        dietary: [],
        popular: true,
      }
    ],
    reviews: [
      {
        userName: 'Jonathan Kim',
        userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        comment: 'The Hokkaido Uni and A5 Wagyu robata are unforgettable. The attention to detail from the chef is Michelin-star standard.',
        dishRecommended: 'Chef Omakase Nigiri Selection',
        createdAt: new Date('2026-10-10'),
      }
    ]
  },
  {
    name: 'The Smoked Oak Gastropub & Brewery',
    slug: 'the-smoked-oak-gastropub',
    tagline: 'Artisanal Craft Burgers, Smokehouse Meats & Micro-Brewery',
    description: 'A bustling gastropub celebrating house-smoked Texas-style brisket, dry-aged smashburgers on brioche, and 24 taps pouring proprietary microbrews and barrel-aged sours.',
    logo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80'
    ],
    cuisineTypes: ['American', 'Gastropub', 'Burgers', 'Craft Beer'],
    diningStyle: 'Gastropub',
    priceRange: '$$',
    rating: 4.78,
    reviewCount: 215,
    address: {
      street: '72 Copper Kettle Lane',
      neighborhood: 'Brewery Quarter',
      city: 'Culinary City',
      state: 'NY',
      zip: '10019',
    },
    phone: '(212) 555-2337',
    openingHours: 'Mon - Sun: 11:30 AM - Midnight',
    features: ['24 Craft Taps', 'Outdoor Beer Garden', 'Dog Friendly Patio', 'Live Music Fridays'],
    isFeatured: false,
    commissionRatePercent: 10,
    deliveryInfo: {
      estimatedTime: '25-35 min',
      deliveryFee: 2.99,
      minOrder: 18.00,
      isDeliveryAvailable: true,
      isPickupAvailable: true,
    },
    reservationSettings: {
      acceptsReservations: true,
      maxPartySize: 20,
      seatingAreas: ['Beer Hall Bench', 'Covered Garden Patio', 'Bar Seating'],
      timeSlots: [
        { time: '6:00 PM', availableTables: 8 },
        { time: '7:30 PM', availableTables: 6 },
        { time: '9:00 PM', availableTables: 10 },
      ]
    },
    menu: [
      {
        id: 'so-1',
        category: 'Chef Specialties',
        name: 'The Truffle Bacon Jam Double Smashburger',
        description: 'Two 4oz custom beef patties, sharp Vermont white cheddar, slow-cooked bacon onion jam, black truffle aioli, toasted brioche bun.',
        price: 19.50,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
        isSpicy: false,
        dietary: [],
        popular: true,
      },
      {
        id: 'so-2',
        category: 'Chef Specialties',
        name: '14-Hour Post Oak Smoked Beef Brisket Platter',
        description: 'Half-pound of prime brisket, smoked mac & cheese, sweet honey cornbread, house pickles.',
        price: 28.00,
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
        isSpicy: false,
        dietary: ['Gluten-Free'],
        popular: true,
      },
      {
        id: 'so-3',
        category: 'Appetizers',
        name: 'Loaded Smoked Pork Belly Poutine',
        description: 'Crispy skin-on russet fries, cheese curds, rich bone broth gravy, crispy braised pork belly bits.',
        price: 15.00,
        image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=600&q=80',
        isSpicy: false,
        dietary: [],
        popular: true,
      }
    ],
    reviews: [
      {
        userName: 'Michael Harris',
        userAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        comment: 'Best smashburger in the city! The bacon jam and truffle aioli combo is next level. Fast delivery too.',
        dishRecommended: 'The Truffle Bacon Jam Double Smashburger',
        createdAt: new Date('2026-10-14'),
      }
    ]
  }
];

const beverages = [
  // Cocktails
  {
    name: 'Smoked Rosemary Old Fashioned',
    slug: 'smoked-rosemary-old-fashioned',
    tagline: 'Kentucky Straight Bourbon, Torched Rosemary & Bitter Demerara',
    type: 'Cocktail Recipe',
    spiritOrBase: 'Bourbon',
    flavorProfile: ['Smoky', 'Velvety Oaked', 'Herbal'],
    abv: 32,
    glassware: 'Double Old Fashioned / Rocks Glass',
    difficulty: 'Intermediate',
    rating: 4.95,
    reviewsCount: 64,
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80',
    description: 'A theatrical twist on the world’s most iconic classic. Kentucky bourbon rested in toasted white oak is stirred with rich demerara syrup, Angostura bitters, and captured under a cloche with smoldering aromatic rosemary smoke.',
    ingredients: [
      { item: 'Kentucky Straight Bourbon Whiskey', amount: '2.5 oz', isSpecialty: true },
      { item: 'Rich Demerara Sugar Syrup (2:1)', amount: '0.25 oz', isSpecialty: false },
      { item: 'Angostura Aromatic Bitters', amount: '2 dashes', isSpecialty: false },
      { item: 'Orange Bitters', amount: '1 dash', isSpecialty: false },
      { item: 'Fresh Rosemary Sprig (for smoking)', amount: '1 sprig', isSpecialty: false },
      { item: 'Large Clear Ice Sphere or Block', amount: '1 cube', isSpecialty: false },
      { item: 'Orange Peel (expressed oil)', amount: '1 swath', isSpecialty: false }
    ],
    steps: [
      { stepNumber: 1, instruction: 'In a mixing glass, combine bourbon, demerara syrup, and aromatic bitters.' },
      { stepNumber: 2, instruction: 'Fill mixing glass with cracked ice and stir smoothly for 35 revolutions until thoroughly chilled and diluted.' },
      { stepNumber: 3, instruction: 'Strain over a large crystal-clear ice block in an old fashioned glass.' },
      { stepNumber: 4, instruction: 'Torch the tip of a fresh rosemary sprig until glowing ember appears, express orange peel oils over the drink, and rest smoldering rosemary across the glass rim.' }
    ],
    proTip: 'For full theatrical bar effect, invert a chilled rocks glass over the smoking rosemary for 15 seconds before pouring the cocktail.',
    tastingNotes: {
      aroma: 'Charred pine, sweet vanilla, roasted orange zest',
      body: 'Silky, full-bodied and warming',
      finish: 'Lingering caramel, toasted oak, herbal smoke'
    },
    pairingSuggestions: ['Tuscan Truffle Ribeye', 'Smoked Beef Brisket', 'Dark Chocolate Truffles'],
    isEcommerceProduct: false,
    isSponsored: true,
    sponsorName: 'Woodford Reserve Master Distillers',
  },
  {
    name: 'Botanical Empress 1908 Violet Fizz',
    slug: 'botanical-empress-violet-fizz',
    tagline: 'Indigo Butterfly Pea Gin, Elderflower & Effervescent Citrus',
    type: 'Cocktail Recipe',
    spiritOrBase: 'Gin',
    flavorProfile: ['Floral & Crisp', 'Citrus & Bright'],
    abv: 18,
    glassware: 'Crystal Highball',
    difficulty: 'Simple',
    rating: 4.89,
    reviewsCount: 42,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    description: 'A mesmerizing visual masterpiece. Natural butterfly pea blossom gin shifts dynamically from deep indigo to radiant lavender when kissed by freshly squeezed lemon and sparkling elderflower tonic.',
    ingredients: [
      { item: 'Empress 1908 Indigo Gin', amount: '2.0 oz', isSpecialty: true },
      { item: 'Freshly squeezed Meyer Lemon Juice', amount: '0.75 oz', isSpecialty: false },
      { item: 'St-Germain Elderflower Liqueur', amount: '0.5 oz', isSpecialty: true },
      { item: 'Simple Syrup', amount: '0.25 oz', isSpecialty: false },
      { item: 'Artisanal Tonic or Club Soda', amount: '3.0 oz', isSpecialty: false },
      { item: 'Edible Organic Orchids & Lemon Wheel', amount: 'Garnish', isSpecialty: false }
    ],
    steps: [
      { stepNumber: 1, instruction: 'Fill a highball glass with spear ice cubes.' },
      { stepNumber: 2, instruction: 'Add lemon juice, simple syrup, and St-Germain elderflower liqueur, stirring to mix.' },
      { stepNumber: 3, instruction: 'Top with sparkling club soda, leaving 1.5 inches at the top.' },
      { stepNumber: 4, instruction: 'Gently float Empress 1908 Gin over a bar spoon to create a spellbinding color gradient. Garnish with edible violet orchid.' }
    ],
    proTip: 'Serve with a glass straw so guests can stir and witness the magical color shift from indigo to magenta.',
    tastingNotes: {
      aroma: 'Fresh citrus blossoms, wild juniper, soft elderflower',
      body: 'Effervescent, light, crisp and refreshing',
      finish: 'Clean herbal minerality'
    },
    pairingSuggestions: ['King Salmon Quinoa Bowl', 'Burrata with Figs', 'Neapolitan Margherita'],
    isEcommerceProduct: false,
  },
  // Wine & Sommelier Guide (with D2C Buy Option)
  {
    name: '2019 Rutherford Reserve Cabernet Sauvignon',
    slug: '2019-rutherford-reserve-cabernet',
    tagline: 'Single-Vineyard Napa Valley Icon | 96 Pts Wine Spectator',
    type: 'Wine & Sommelier Guide',
    spiritOrBase: 'Cabernet Sauvignon',
    flavorProfile: ['Velvety Oaked', 'Berry & Tart', 'Smoky'],
    abv: 14.8,
    glassware: 'Bordeaux Grand Cru Goblet',
    difficulty: 'Mixologist Level',
    rating: 4.98,
    reviewsCount: 91,
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
    description: 'Estate-grown along the famous Rutherford bench in Napa Valley. Matured for 22 months in 80% new French oak barrels. Delivers the signature "Rutherford Dust" minerality seamlessly interwoven with crème de cassis, graphite, and cocoa nibs.',
    tastingNotes: {
      aroma: 'Black cherry, crushed violets, cigar cedar, roasted mocha',
      body: 'Full-Bodied with powerful, velvety tannins',
      acidity: 'Balanced & vibrant structural backbone',
      finish: '60+ second lingering finish of dark fruit and espresso',
      tanninOrRoast: 'Polished, structured, cellar-worthy 15+ years'
    },
    pairingSuggestions: ['Dry-Aged Ribeye', 'Bistecca alla Fiorentina', 'Slow-Braised Short Rib Ragù'],
    isEcommerceProduct: true,
    price: 89.00,
    inStock: true,
    stockCount: 48,
    bottleOrBagSize: '750 ml',
    regionOrOrigin: 'Rutherford, Napa Valley, California',
    roasterOrDistiller: 'Domaine de la Vallée Estate',
    sponsorName: 'Sommelier Guild Selection',
  },
  {
    name: '2021 Domaine De La Rivière Willamette Valley Pinot Noir',
    slug: '2021-domaine-pinot-noir',
    tagline: 'Biodynamic Oregon Pinot Noir with Forest Floor & Wild Raspberry',
    type: 'Wine & Sommelier Guide',
    spiritOrBase: 'Pinot Noir',
    flavorProfile: ['Floral & Crisp', 'Berry & Tart'],
    abv: 13.5,
    glassware: 'Burgundy Balloon Glass',
    difficulty: 'Simple',
    rating: 4.88,
    reviewsCount: 53,
    image: 'https://images.unsplash.com/photo-1558001373-7b93ee48ffa0?auto=format&fit=crop&w=800&q=80',
    description: 'Crafted using native yeast fermentation in volcanic Jory soils. Shimmers with pure red currant, forest bramble, black tea leaves, and exotic baking spices.',
    tastingNotes: {
      aroma: 'Ripe rainier cherry, wild chanterelle mushrooms, clove, rose petals',
      body: 'Silky, elegant medium body',
      acidity: 'Bright, energetic, electric acidity',
      finish: 'Delicate mineral finish with hints of pomegranate'
    },
    pairingSuggestions: ['Pan-Crisped King Salmon', 'Handcrafted Tagliolini', 'Mushroom Risotto'],
    isEcommerceProduct: true,
    price: 64.00,
    inStock: true,
    stockCount: 32,
    bottleOrBagSize: '750 ml',
    regionOrOrigin: 'Willamette Valley, Oregon',
    roasterOrDistiller: 'River Valley Biodynamics',
  },
  // Artisan Coffee & Tea (with D2C Buy Option)
  {
    name: 'Ethiopian Yirgacheffe Single-Origin Natural Process',
    slug: 'ethiopian-yirgacheffe-natural-coffee',
    tagline: 'Micro-Lot Heirloom Coffee | Notes of Bergamot, Jasmine & Blueberry Jam',
    type: 'Artisan Coffee & Tea',
    spiritOrBase: 'Single Origin Coffee',
    flavorProfile: ['Citrus & Bright', 'Berry & Tart', 'Floral & Crisp'],
    abv: 0,
    glassware: 'Ceramic Tasting Cup / Chemex Carafe',
    difficulty: 'Intermediate',
    rating: 4.92,
    reviewsCount: 78,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    description: 'Sun-dried on raised African beds in the high-elevation mist of Gedeo zone. Roasted light-medium to preserve exquisite floral aromatics resembling jasmine tea and explosive blueberry sweetness.',
    ingredients: [
      { item: 'Whole Bean Natural Yirgacheffe Beans', amount: '25 grams', isSpecialty: true },
      { item: 'Filtered Water at 202°F (94°C)', amount: '375 grams', isSpecialty: false }
    ],
    steps: [
      { stepNumber: 1, instruction: 'Grind coffee to medium-coarse consistency (resembling sea salt).' },
      { stepNumber: 2, instruction: 'Rinse Chemex paper filter with boiling water to discard paper taste, then discard rinse water.' },
      { stepNumber: 3, instruction: 'Pour 60g hot water to allow 45-second bloom while carbon dioxide releases.' },
      { stepNumber: 4, instruction: 'Pour remaining water in gentle concentric circles, finishing total brew at 3:30.' }
    ],
    proTip: 'Allow coffee to cool slightly below 140°F (60°C); that is when the burst of fresh fruit acidity and honeysuckle sweetness truly shines.',
    tastingNotes: {
      aroma: 'Jasmine flowers, crushed blueberries, fresh bergamot peel',
      body: 'Tea-like, silky and luminous',
      acidity: 'Sparkling sweet stonefruit acidity',
      finish: 'Meyer lemon and honey lingering note'
    },
    pairingSuggestions: ['Valrhona Chocolate Lava Cake', 'Lemon Blueberry Tart', 'Morning Almond Croissants'],
    isEcommerceProduct: true,
    price: 24.50,
    inStock: true,
    stockCount: 60,
    bottleOrBagSize: '12 oz (340g) Whole Bean',
    regionOrOrigin: 'Gedeo Zone, Yirgacheffe, Ethiopia',
    roasterOrDistiller: 'Artisan Counter Roasters',
  },
  {
    name: 'Kyoto Uji Ceremonial First-Harvest Matcha',
    slug: 'kyoto-uji-ceremonial-matcha',
    tagline: 'Stone-Ground Shaded Tencha Tea Leaves | Rich Umami & Emerald Froth',
    type: 'Artisan Coffee & Tea',
    spiritOrBase: 'Ceremonial Matcha',
    flavorProfile: ['Floral & Crisp', 'Herbal'],
    abv: 0,
    glassware: 'Handcrafted Chawan Matcha Bowl',
    difficulty: 'Intermediate',
    rating: 4.96,
    reviewsCount: 112,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
    description: 'Grown in the legendary mist-shrouded fields of Uji, Kyoto. Shaded from sunlight for 30 days prior to harvest to maximize L-theanine and vibrant chlorophyll, stone-ground at 40 grams per hour.',
    ingredients: [
      { item: 'Ceremonial Grade Uji Matcha', amount: '2 grams (2 chashaku scoops)', isSpecialty: true },
      { item: 'Pure Spring Water at 175°F (80°C)', amount: '60 ml', isSpecialty: false }
    ],
    steps: [
      { stepNumber: 1, instruction: 'Sift 2g of matcha through a fine mesh strainer into a pre-warmed chawan bowl.' },
      { stepNumber: 2, instruction: 'Add 60ml of water at 175°F (never boiling, which scorches the tea).' },
      { stepNumber: 3, instruction: 'Whisk vigorously with a 100-prong bamboo chasen in a rapid "W" motion from the wrist for 20 seconds.' },
      { stepNumber: 4, instruction: 'Once a dense micro-foam forms with no visible bubbles, lift chasen gently from center.' }
    ],
    proTip: 'Never use boiling water; 175°F protects amino acids, yielding creamy natural sweetness with zero bitterness.',
    tastingNotes: {
      aroma: 'Sweet spring grass, baby spinach, roasted nori',
      body: 'Velvety, creamy, cloud-like foam',
      acidity: 'Zero astringency, pure sweet savory umami',
      finish: 'Deep calming sweetness and calm mental clarity'
    },
    pairingSuggestions: ['Japanese Wagashi', 'Almond Biscotti', 'Dark Chocolate Gelato'],
    isEcommerceProduct: true,
    price: 36.00,
    inStock: true,
    stockCount: 45,
    bottleOrBagSize: '30g Hermetic Tin',
    regionOrOrigin: 'Uji, Kyoto Prefecture, Japan',
    roasterOrDistiller: 'Uji Heritage Tea Gardens',
  }
];

const subscriptionBoxes = [
  {
    title: 'The Grand Sommelier Wine Vault',
    slug: 'grand-sommelier-wine-vault',
    tagline: '3 Master Sommelier-Selected Rare Estate Wines Every Month',
    type: 'Wine Club',
    pricePerMonth: 89.00,
    frequencyOptions: ['Monthly', 'Bi-Monthly', 'Quarterly'],
    description: 'Unlock exclusive allocation-only wines from boutique estates in Napa, Bordeaux, Burgundy, and Barolo. Includes Sommelier pairing cards, recipe cards, and virtual video tasting invites.',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
    perks: [
      '3 hand-selected limited release boutique bottles',
      'Detailed Sommelier tasting notes & cellar aging guides',
      'Chef-paired recipe cards tailored to each bottle',
      'Complimentary access to monthly live Master Sommelier tastings',
      'Ad-free access to all Food Network Masterclasses'
    ],
    sampleBottlesOrPacks: [
      '2019 Rutherford Reserve Cabernet Sauvignon',
      '2021 Domaine De La Rivière Pinot Noir',
      '2022 Chablis Premier Cru Domaine Vaillons'
    ],
    subscriberCount: 2840,
    badge: 'Master Sommelier Choice',
  },
  {
    title: 'Artisan Coffee Roasters Vault',
    slug: 'artisan-coffee-roasters-vault',
    tagline: '2 Freshly Roasted Single-Origin Micro-Lots Shipped Within 48 Hours',
    type: 'Coffee Roasters Vault',
    pricePerMonth: 34.00,
    frequencyOptions: ['Bi-Weekly', 'Monthly'],
    description: 'Explore the world of third-wave specialty coffee. Ethically sourced from micro-lot farms in Ethiopia, Colombia, Guatemala, and Kenya, roasted to order and shipped at peak degassing.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    perks: [
      'Two 12 oz bags of freshly roasted single-origin whole bean coffee',
      'Brewing ratio cards for Chemex, V60, Aeropress, and Espresso',
      'Roaster interview and farm elevation transparency cards',
      'Free shipping and flexible skip or pause anytime'
    ],
    sampleBottlesOrPacks: [
      'Ethiopian Yirgacheffe Natural Process (Notes of Jasmine & Blueberry)',
      'Colombian Huila Geisha Anaerobic Fermentation (Notes of Peach & Bergamot)'
    ],
    subscriberCount: 4120,
    badge: 'Most Popular',
  },
  {
    title: 'Craft Mixologist Cocktail Lab Crate',
    slug: 'craft-mixologist-cocktail-lab',
    tagline: 'Artisan Bitters, Small-Batch Syrups, Dehydrated Botanicals & Bar Tools',
    type: 'Craft Mixology Box',
    pricePerMonth: 48.00,
    frequencyOptions: ['Monthly', 'Bi-Monthly'],
    description: 'Elevate your home bar to world-class craft cocktail status. Everything you need to create 12-16 professional craft cocktails, just add your favorite base spirit.',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80',
    perks: [
      'Curated artisan mixers, specialty syrups & tincture droppers',
      'Dehydrated wheel garnishes, edible flowers & smoked wood chips',
      '1 premium collectible copper/matte-black bar tool each month',
      'Step-by-step mixology video access from award-winning bartenders'
    ],
    sampleBottlesOrPacks: [
      'Handcrafted Blood Orange Cordial (8 oz)',
      'Smoked Cedar & Black Walnut Bitters (2 oz dropper)',
      'Dehydrated Persian Lime Wheels & Rosemary Skewers',
      'Heavyweight Japanese Steel Jigger'
    ],
    subscriberCount: 1690,
    badge: 'Bar Champion Curated',
  }
];

const events = [
  {
    title: 'Napa Valley Grand Tasting & Sommelier Pairing Gala',
    slug: 'napa-valley-grand-tasting-gala',
    category: 'Wine Tasting Gala',
    date: 'Saturday, November 14, 2026',
    time: '6:30 PM - 10:30 PM EST',
    location: 'The Glasshouse Grand Terrace, Culinary City, NY',
    description: 'An enchanting evening of discovery featuring 40 prestigious wineries from Napa Valley, Sonoma, and Willamette Valley. Enjoy an eight-course passed gastronomic tasting curated by Food Network Star Chefs while tasting library vintage reserves.',
    host: {
      name: 'Master Sommelier Julian Deveraux',
      role: 'Court of Master Sommeliers Vice Chair',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
    ticketPrice: 125.00,
    availableSeats: 32,
    totalSeats: 100,
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80',
    includedItems: [
      'Unlimited tastings across 40+ reserve winery booths',
      '8-course gourmet tasting menu prepared live by Star Chefs',
      'Commemorative crystal Riedel Bordeaux tasting glass to keep',
      'Exclusive auction access to private cellar library vintages'
    ],
    sponsor: 'Napa Valley Vintners Association',
    isFeatured: true,
  },
  {
    title: 'World Champion Craft Mixology & Smoke Masterclass',
    slug: 'craft-mixology-smoke-masterclass',
    category: 'Mixology Masterclass',
    date: 'Thursday, November 19, 2026',
    time: '7:00 PM - 9:30 PM EST',
    location: 'The Vault Mixology Studio, 45 Copper St, NY',
    description: 'Learn the molecular techniques behind world-class cocktails. Master flavor extraction, fat washing, clear ice carving, torch smoking, and balancing acid-to-sweetness ratios from a world champion bartender.',
    host: {
      name: 'Elena Morales',
      role: 'World 50 Best Bars Head Mixologist',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    },
    ticketPrice: 75.00,
    availableSeats: 14,
    totalSeats: 25,
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=80',
    includedItems: [
      'Interactive bar station with shakers, jiggers, and torch guns',
      'Creation and tasting of 4 bespoke craft cocktails',
      'Artisanal small-plate charcuterie pairing board',
      'Gift box with house-made aromatic bitters and cocktail recipe booklet'
    ],
    sponsor: 'Woodford Reserve & Fever-Tree Artisans',
    isFeatured: true,
  },
  {
    title: 'Third-Wave Coffee Cupping & Latte Art Immersion',
    slug: 'coffee-cupping-latte-art-immersion',
    category: 'Artisan Coffee Roasting',
    date: 'Sunday, November 22, 2026',
    time: '10:00 AM - 1:00 PM EST',
    location: 'Roastery Lab, 12 Zenith Lane, NY',
    description: 'Step behind the commercial espresso bar. Learn the international SCA cupping protocol, calibrate grinder micron levels, master milk steaming micro-foam physics, and pour swan and tulip latte art.',
    host: {
      name: 'Oliver Thorne',
      role: 'National Barista Champion & Q-Grader',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    },
    ticketPrice: 49.00,
    availableSeats: 18,
    totalSeats: 30,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80',
    includedItems: [
      'Guided cupping of 6 rare anaerobic micro-lot coffees',
      'Hands-on dual-boiler commercial espresso machine practice',
      'Free 12 oz bag of limited roast whole bean coffee of your choice',
      'Stainless steel precision latte art milk pitcher'
    ],
    sponsor: 'La Marzocco & Oatly Barista',
    isFeatured: false,
  }
];

module.exports = {
  recipes,
  restaurants,
  beverages,
  subscriptionBoxes,
  events,
};
