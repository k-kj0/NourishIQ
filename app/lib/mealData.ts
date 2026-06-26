export const REGIONS = [
  { code: "IN", name: "India", flag: "🇮🇳" },
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "UK", name: "United Kingdom", flag: "🇬🇧" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
  { code: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "JP", name: "Japan", flag: "🇯🇵" },
  { code: "BR", name: "Brazil", flag: "🇧🇷" },
  { code: "MX", name: "Mexico", flag: "🇲🇽" },
  { code: "FR", name: "France", flag: "🇫🇷" },
  { code: "IT", name: "Italy", flag: "🇮🇹" },
  { code: "ZA", name: "South Africa", flag: "🇿🇦" },
  { code: "NG", name: "Nigeria", flag: "🇳🇬" },
  { code: "AE", name: "UAE", flag: "🇦🇪" },
  { code: "SG", name: "Singapore", flag: "🇸🇬" },
  { code: "OTHER", name: "Other", flag: "🌍" },
];

export const DIET_TYPES = [
  { id: "vegan", label: "Vegan" },
  { id: "vegetarian", label: "Vegetarian" },
  { id: "veg-eggs", label: "Vegetarian + Eggs" },
  { id: "non-veg", label: "Non-vegetarian" },
  { id: "no-beef", label: "No Beef" },
  { id: "no-pork", label: "No Pork" },
  { id: "no-dairy", label: "No Dairy" },
  { id: "pescatarian", label: "Pescatarian" },
];

export const HEALTH_GOALS = [
  { id: "lose-weight", label: "Lose Weight" },
  { id: "gain-muscle", label: "Gain Muscle" },
  { id: "eat-healthy", label: "Eat Healthier" },
  { id: "boost-energy", label: "Boost Energy" },
  { id: "better-sleep", label: "Better Sleep" },
  { id: "manage-stress", label: "Manage Stress" },
  { id: "improve-gut", label: "Improve Gut Health" },
  { id: "heart-health", label: "Heart Health" },
];

export const HEALTH_CONDITIONS = [
  { id: "none", label: "None" },
  { id: "diabetes", label: "Diabetes" },
  { id: "high-bp", label: "High blood pressure" },
  { id: "pcos", label: "PCOS/PCOD" },
  { id: "thyroid", label: "Thyroid condition" },
  { id: "other", label: "Other" },
];

export const FOOD_CATEGORIES: Record<string, string[]> = {
  Meats: ["Chicken", "Pork", "Beef", "Mutton", "Lamb"],
  Seafood: ["Salmon", "Tuna", "Prawns", "Shrimp", "Crab"],
  Dairy: ["Cheddar", "Parmesan", "Mozzarella", "Greek Yogurt", "Butter"],
  "Vegan Dairy": ["Almond Milk", "Oat Milk", "Soy Milk", "Tofu"],
  Grains: ["Rice", "Quinoa", "Oats", "Whole Wheat", "Millet"],
};

export const TEXTURE_DISLIKES = ["Mushy", "Slimy", "Crunchy", "Chewy", "Gritty", "Rubbery"];

export const FLAVOR_DISLIKES = ["Very Spicy", "Bitter", "Sour", "Very Sweet", "Fishy", "Pungent"];

export const APPLIANCE_OPTIONS = [
  { id: "none", name: "No special appliances", desc: "I keep it simple" },
  { id: "microwave", name: "Microwave", desc: "Quick & easy cooking" },
  { id: "airfryer", name: "Air Fryer", desc: "Crispy with less oil" },
  { id: "oven", name: "Oven", desc: "Baking & roasting" },
  { id: "toaster", name: "Toaster", desc: "For quick bites" },
  { id: "instant-pot", name: "Instant Pot", desc: "One-pot wonders" },
  { id: "slow-cooker", name: "Slow Cooker", desc: "Set it & forget it" },
  { id: "blender", name: "Blender", desc: "Smoothies & more" },
  { id: "food-processor", name: "Food Processor", desc: "Chop, slice, shred with ease" },
];

export const HOME_REMEDIES = [
  {
    id: "headache-tea",
    title: "DIY Hibiscus Tea",
    symptom: "Headache",
    benefit:
      "Hibiscus is rich in antioxidants and may help relax blood vessels, easing tension-related headaches while keeping you hydrated.",
    ingredients: [
      "Dried hibiscus flowers (2 tbsp)",
      "Water (2 cups)",
      "Honey (1 tsp, optional)",
      "Fresh mint leaves (a few, optional)",
    ],
    steps: [
      "Bring water to a boil, then remove from heat.",
      "Add dried hibiscus flowers and steep for 5–7 minutes.",
      "Strain into a cup. Add honey and mint if desired.",
      "Sip slowly in a quiet, dim room.",
    ],
    prepTime: "10 min",
  },
  {
    id: "fatigue-shot",
    title: "DIY Ginger Energy Shot",
    symptom: "Tiredness",
    benefit:
      "Fresh ginger and lemon provide a natural pick-me-up, supporting circulation and digestion without the crash of caffeine.",
    ingredients: [
      "Fresh ginger, grated (1 tbsp)",
      "Lemon juice (1 tbsp)",
      "Water (2 tbsp)",
      "Honey (1 tsp)",
      "Pinch of cayenne (optional)",
    ],
    steps: [
      "Grate fresh ginger and squeeze out the juice using a strainer or cheesecloth.",
      "Mix ginger juice with lemon juice, water, and honey.",
      "Add a pinch of cayenne if you'd like extra kick.",
      "Drink immediately, first thing in the morning or mid-afternoon.",
    ],
    prepTime: "5 min",
  },
  {
    id: "stomach-ache",
    title: "Soothing Fennel & Mint Infusion",
    symptom: "Stomach ache",
    benefit:
      "Fennel seeds and mint are traditionally used to relax digestive muscles and reduce bloating and cramping.",
    ingredients: [
      "Fennel seeds (1 tsp)",
      "Fresh mint leaves (5–6)",
      "Water (1.5 cups)",
    ],
    steps: [
      "Lightly crush the fennel seeds.",
      "Boil water, then add fennel seeds and mint leaves.",
      "Simmer for 5 minutes, then strain.",
      "Sip warm, slowly, after meals.",
    ],
    prepTime: "8 min",
  },
  {
    id: "sore-throat",
    title: "Honey Lemon Ginger Warmer",
    symptom: "Sore throat",
    benefit:
      "Warm honey and lemon coat and soothe an irritated throat, while ginger adds mild anti-inflammatory support.",
    ingredients: [
      "Warm water (1 cup)",
      "Honey (1 tbsp)",
      "Lemon juice (1 tbsp)",
      "Fresh ginger, sliced (2–3 pieces)",
    ],
    steps: [
      "Steep sliced ginger in hot water for 5 minutes.",
      "Let the water cool to warm (not hot).",
      "Stir in honey and lemon juice.",
      "Sip slowly, 2–3 times a day as needed.",
    ],
    prepTime: "7 min",
  },
  {
    id: "trouble-sleeping",
    title: "Warm Turmeric Moon Milk",
    symptom: "Trouble sleeping",
    benefit:
      "Warm milk with turmeric and a touch of nutmeg is a traditional bedtime ritual thought to promote relaxation before sleep.",
    ingredients: [
      "Milk or plant milk (1 cup)",
      "Turmeric powder (1/4 tsp)",
      "Pinch of black pepper",
      "Pinch of nutmeg",
      "Honey (1 tsp, optional)",
    ],
    steps: [
      "Warm the milk gently in a saucepan, do not boil.",
      "Whisk in turmeric, black pepper, and nutmeg.",
      "Simmer 2–3 minutes, stirring occasionally.",
      "Sweeten with honey if desired and drink 30 minutes before bed.",
    ],
    prepTime: "6 min",
  },
  {
    id: "bloating",
    title: "Cumin & Coriander Digestive Water",
    symptom: "Bloating",
    benefit:
      "Cumin and coriander seeds are commonly used to support digestion and ease feelings of fullness or bloating.",
    ingredients: [
      "Cumin seeds (1 tsp)",
      "Coriander seeds (1 tsp)",
      "Water (2 cups)",
    ],
    steps: [
      "Lightly toast cumin and coriander seeds in a dry pan for 1 minute.",
      "Add water and bring to a boil.",
      "Simmer for 5 minutes, then strain.",
      "Sip warm after meals.",
    ],
    prepTime: "8 min",
  },
];

export const TRAVEL_CUISINES = [
  {
    id: "tokyo-ramen",
    city: "Tokyo",
    country: "Japan",
    dish: "Shoyu Ramen",
    description:
      "A soy-sauce-based broth ramen with chewy noodles, tender chashu pork, and a soft-boiled egg.",
    image: "https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=800&q=80",
    tags: ["Comfort Food", "Umami"],
    whyTry: "A staple of everyday Tokyo life, found in tiny shops on nearly every street corner.",
  },
  {
    id: "mumbai-vada-pav",
    city: "Mumbai",
    country: "India",
    dish: "Vada Pav",
    description:
      "A spiced potato fritter sandwiched in a soft bun with chutneys — Mumbai's favorite street snack.",
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800&q=80",
    tags: ["Street Food", "Vegetarian"],
    whyTry: "Cheap, filling, and iconic — it's practically Mumbai's unofficial fast food.",
  },
  {
    id: "mexico-city-tacos",
    city: "Mexico City",
    country: "Mexico",
    dish: "Tacos al Pastor",
    description:
      "Marinated, spit-roasted pork tacos topped with pineapple, onion, and cilantro on a corn tortilla.",
    image: "https://images.unsplash.com/photo-1551504734-1a8ad9c14a17?w=800&q=80",
    tags: ["Street Food", "Spicy"],
    whyTry: "Born from Lebanese immigrants' shawarma technique, now a true Mexico City classic.",
  },
  {
    id: "bangkok-padthai",
    city: "Bangkok",
    country: "Thailand",
    dish: "Pad Thai",
    description:
      "Stir-fried rice noodles with shrimp or tofu, peanuts, egg, and a sweet-savory tamarind sauce.",
    image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800&q=80",
    tags: ["Quick Meal", "Balanced"],
    whyTry: "Thailand's most famous export — every street vendor has their own twist on it.",
  },
  {
    id: "rome-carbonara",
    city: "Rome",
    country: "Italy",
    dish: "Spaghetti alla Carbonara",
    description:
      "A simple but rich pasta of egg, Pecorino Romano, guanciale, and black pepper — no cream involved.",
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&q=80",
    tags: ["High Protein", "Classic"],
    whyTry: "Skip the touristy versions with cream — the real Roman recipe is silkier and lighter.",
  },
  {
    id: "istanbul-kebab",
    city: "Istanbul",
    country: "Turkey",
    dish: "Iskender Kebab",
    description:
      "Thinly sliced döner meat over pita, drenched in tomato sauce and melted butter, served with yogurt.",
    image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=800&q=80",
    tags: ["High Protein", "Hearty"],
    whyTry: "Named after the chef who invented it in the 1860s — a true taste of Ottoman-era Istanbul.",
  },
];

export const WEEKLY_CHALLENGE = {
  weekLabel: "This week's challenge",
  sweet: {
    id: "challenge-lemon-blueberry-cake",
    name: "Lemon Blueberry Cake",
    category: "DESSERT",
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80",
    cookTime: "55 min",
    servings: 8,
    calories: 310,
    protein: 5,
    carbs: 42,
    fat: 13,
    ingredients: [
      "All-Purpose Flour (1.5 cups)", "Baking Powder (1.5 tsp)", "Salt (1/4 tsp)",
      "Butter, softened (1/2 cup)", "Sugar (1 cup)", "Eggs (2)",
      "Lemon Zest (1 tbsp)", "Lemon Juice (2 tbsp)", "Greek Yogurt (1/2 cup)",
      "Fresh Blueberries (1.5 cups)", "Powdered Sugar, for glaze (1/2 cup)",
    ],
    steps: [
      { step: 1, text: "Preheat oven to 350°F (175°C) and grease a loaf pan.", time: "5 min" },
      { step: 2, text: "Whisk flour, baking powder, and salt together in a bowl.", time: "3 min" },
      { step: 3, text: "Cream butter and sugar until fluffy, then beat in eggs, lemon zest, and juice.", time: "5 min" },
      { step: 4, text: "Fold in dry ingredients alternating with yogurt. Gently fold in blueberries.", time: "5 min" },
      { step: 5, text: "Pour batter into pan and bake for 45–50 minutes until a toothpick comes out clean.", time: "50 min" },
      { step: 6, text: "Cool, then drizzle with a lemon-powdered-sugar glaze before serving.", time: "10 min" },
    ],
    substitutes: [
      { ingredient: "Butter", alternatives: ["Coconut oil", "Vegan butter"] },
      { ingredient: "Greek Yogurt", alternatives: ["Sour cream", "Coconut yogurt"] },
    ],
    benefits: [
      "Blueberries are rich in antioxidants",
      "A lighter alternative to frosted cakes thanks to the yogurt base",
    ],
  },
  savory: {
    id: "challenge-fish-and-chips",
    name: "Fish & Chips",
    category: "DINNER",
    image: "https://images.unsplash.com/photo-1579208030886-b937da0925dc?w=800&q=80",
    cookTime: "35 min",
    servings: 2,
    calories: 610,
    protein: 32,
    carbs: 58,
    fat: 26,
    ingredients: [
      "White Fish Fillets, e.g. cod (2)", "All-Purpose Flour (1 cup)",
      "Baking Powder (1 tsp)", "Cold Sparkling Water (3/4 cup)",
      "Salt & Pepper (to taste)", "Potatoes, cut into wedges (3 large)",
      "Olive Oil (2 tbsp)", "Malt Vinegar (for serving)",
    ],
    steps: [
      { step: 1, text: "Toss potato wedges with olive oil, salt and pepper. Roast at 425°F for 25 minutes.", time: "25 min" },
      { step: 2, text: "Whisk flour, baking powder, salt, and sparkling water into a light batter.", time: "5 min" },
      { step: 3, text: "Dip fish fillets in batter and pan-fry or air-fry until golden and crisp.", time: "10 min" },
      { step: 4, text: "Serve hot with the roasted wedges and malt vinegar.", time: "2 min" },
    ],
    substitutes: [
      { ingredient: "White Fish", alternatives: ["Tofu steaks (vegetarian)", "Halloumi"] },
      { ingredient: "Potato Wedges", alternatives: ["Sweet potato wedges", "Cauliflower wedges"] },
    ],
    benefits: [
      "White fish is a lean source of high-quality protein",
      "Air-frying or baking instead of deep-frying cuts down on excess oil",
    ],
  },
};
