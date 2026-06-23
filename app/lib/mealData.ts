"use client";

// ==================== APPLIANCES ====================
export const APPLIANCE_OPTIONS = [
  { id: "none", name: "No appliance / Stovetop" },
  { id: "microwave", name: "Microwave" },
  { id: "airfryer", name: "Air Fryer" },
  { id: "oven", name: "Oven" },
  { id: "toaster", name: "Toaster" },
  { id: "instant-pot", name: "Instant Pot / Pressure Cooker" },
  { id: "slow-cooker", name: "Slow Cooker" },
  { id: "blender", name: "Blender" },
  { id: "food-processor", name: "Food Processor" },
  { id: "grill", name: "Grill / Griddle" },
];

// ==================== REGIONS ====================
export const REGIONS = [
  { code: "US", flag: "US", name: "United States", currency: "USD" },
  { code: "IN", flag: "IN", name: "India", currency: "INR" },
  { code: "GB", flag: "GB", name: "United Kingdom", currency: "GBP" },
  { code: "CA", flag: "CA", name: "Canada", currency: "CAD" },
  { code: "AU", flag: "AU", name: "Australia", currency: "AUD" },
  { code: "DE", flag: "DE", name: "Germany", currency: "EUR" },
  { code: "FR", flag: "FR", name: "France", currency: "EUR" },
  { code: "IT", flag: "IT", name: "Italy", currency: "EUR" },
  { code: "ES", flag: "ES", name: "Spain", currency: "EUR" },
  { code: "NL", flag: "NL", name: "Netherlands", currency: "EUR" },
  { code: "BR", flag: "BR", name: "Brazil", currency: "BRL" },
  { code: "MX", flag: "MX", name: "Mexico", currency: "MXN" },
  { code: "JP", flag: "JP", name: "Japan", currency: "JPY" },
  { code: "KR", flag: "KR", name: "South Korea", currency: "KRW" },
  { code: "SG", flag: "SG", name: "Singapore", currency: "SGD" },
  { code: "AE", flag: "AE", name: "UAE", currency: "AED" },
  { code: "ZA", flag: "ZA", name: "South Africa", currency: "ZAR" },
  { code: "NG", flag: "NG", name: "Nigeria", currency: "NGN" },
  { code: "KE", flag: "KE", name: "Kenya", currency: "KES" },
  { code: "PH", flag: "PH", name: "Philippines", currency: "PHP" },
  { code: "TH", flag: "TH", name: "Thailand", currency: "THB" },
  { code: "ID", flag: "ID", name: "Indonesia", currency: "IDR" },
  { code: "MY", flag: "MY", name: "Malaysia", currency: "MYR" },
  { code: "VN", flag: "VN", name: "Vietnam", currency: "VND" },
  { code: "TR", flag: "TR", name: "Turkey", currency: "TRY" },
  { code: "PK", flag: "PK", name: "Pakistan", currency: "PKR" },
  { code: "BD", flag: "BD", name: "Bangladesh", currency: "BDT" },
  { code: "LK", flag: "LK", name: "Sri Lanka", currency: "LKR" },
  { code: "NP", flag: "NP", name: "Nepal", currency: "NPR" },
  { code: "MM", flag: "MM", name: "Myanmar", currency: "MMK" },
  { code: "KH", flag: "KH", name: "Cambodia", currency: "KHR" },
  { code: "CN", flag: "CN", name: "China", currency: "CNY" },
];

export const DIET_TYPES = [
  { id: "vegan", label: "Vegan" },
  { id: "vegetarian", label: "Vegetarian" },
  { id: "vegetarian-eggs", label: "Vegetarian + Eggs" },
  { id: "non-veg", label: "Non-vegetarian" },
  { id: "no-beef", label: "No Beef" },
  { id: "no-pork", label: "No Pork" },
  { id: "no-dairy", label: "No Dairy" },
  { id: "pescatarian", label: "Pescatarian" },
  { id: "jain", label: "Jain" },
  { id: "halal", label: "Halal" },
  { id: "kosher", label: "Kosher" },
];

export const HEALTH_GOALS = [
  { id: "lose-weight", label: "Lose weight" },
  { id: "build-muscle", label: "Build muscle" },
  { id: "tone-up", label: "Tone up" },
  { id: "skin-health", label: "Boost skin health" },
  { id: "gut-health", label: "Improve gut health" },
  { id: "energy", label: "Boost energy" },
  { id: "hair-nails", label: "Hair and nail health" },
  { id: "sleep", label: "Better sleep" },
  { id: "pcos", label: "Manage PCOS" },
  { id: "thyroid", label: "Manage thyroid" },
  { id: "diabetes", label: "Manage diabetes" },
  { id: "blood-pressure", label: "Manage blood pressure" },
  { id: "fertility", label: "Improve fertility" },
];

export const HEALTH_CONDITIONS = [
  { id: "none", label: "None" },
  { id: "diabetes", label: "Diabetes" },
  { id: "bp", label: "High blood pressure" },
  { id: "pcos", label: "PCOS/PCOD" },
  { id: "thyroid", label: "Thyroid condition" },
  { id: "ibs", label: "IBS or gut issues" },
  { id: "lactose", label: "Lactose intolerant" },
  { id: "gluten", label: "Gluten intolerant" },
  { id: "pregnant", label: "Pregnant" },
  { id: "postpartum", label: "Postpartum" },
  { id: "breastfeeding", label: "Breastfeeding" },
  { id: "elderly", label: "Elderly (65+)" },
  { id: "no-kitchen", label: "No kitchen access" },
  { id: "young-kids", label: "Have young kids" },
];

export const FOOD_CATEGORIES: Record<string, string[]> = {
  "Meats": ["Chicken", "Pork", "Beef", "Mutton", "Lamb", "Turkey", "Duck"],
  "Seafood": ["Salmon", "Tuna", "Prawns", "Shrimp", "Crab", "Lobster", "Mussels"],
  "Dairy": ["Cheddar", "Parmesan", "Mozzarella", "Greek Yogurt", "Butter", "Paneer"],
  "Vegan Dairy": ["Almond Milk", "Oat Milk", "Soy Milk", "Tofu", "Tempeh"],
  "Pulses": ["Chickpeas", "Lentils", "Black Beans", "Kidney Beans", "Edamame"],
  "Grains": ["White Rice", "Brown Rice", "Quinoa", "Oats", "Amaranth", "Millet"],
  "Bread": ["Sourdough", "Whole Wheat", "Tortilla", "Pita", "Bagel"],
  "Vegetables": ["Spinach", "Kale", "Broccoli", "Bell Pepper", "Zucchini", "Mushrooms"],
  "Fruits": ["Apple", "Mango", "Banana", "Berries", "Watermelon", "Papaya"],
  "Spices": ["Garlic", "Ginger", "Cumin", "Turmeric", "Chili", "Cinnamon"],
};

export const TEXTURE_DISLIKES = ["Slimy", "Mushy", "Crunchy", "Chewy", "Rubbery", "Stringy", "Gritty"];
export const FLAVOR_DISLIKES = ["Smoky", "Bitter", "Very spicy", "Overly sweet", "Fishy", "Sour", "Fermented"];

// ==================== TYPES ====================
export interface Meal {
  id: string;
  name: string;
  category: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: string[];
  spices: string[];
  steps: { step: number; text: string; time: string }[];
  substitutes: { ingredient: string; alternatives: string[] }[];
  dietaryTags: string[];
  appliances: string[];
  cookTime: string;
  frequency?: string;
  isLiked?: boolean;
  benefits: string[];
  genderBenefits?: string[];
  image: string;
}

export interface DayPlan {
  meals: Meal[];
  targetCalories: number;
  targetProtein: number;
  targetCarbs: number;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
}

export interface CalorieLog {
  date: string;
  consumed: number;
  target: number;
}

// ==================== MEAL DATA ====================
// 7 different daily meal sets for variety (rotates by day of month)

const BREAKFAST_SETS: Meal[][] = [
  [{
    id: "b1", name: "Blueberry Oat Pancakes", category: "breakfast",
    calories: 420, protein: 14, carbs: 58, fat: 12,
    ingredients: ["Oats", "Blueberries", "Eggs", "Milk", "Honey", "Baking powder"],
    spices: ["Cinnamon", "Vanilla"],
    steps: [
      { step: 1, text: "Blend oats into flour", time: "2 min" },
      { step: 2, text: "Mix with eggs, milk, and baking powder", time: "3 min" },
      { step: 3, text: "Cook on medium heat, flip when bubbles form", time: "5 min" },
      { step: 4, text: "Top with blueberries and honey", time: "1 min" },
    ],
    substitutes: [{ ingredient: "Blueberries", alternatives: ["Strawberries", "Raspberries", "Banana slices"] }],
    dietaryTags: ["Vegetarian", "High Fiber"], appliances: ["none"], cookTime: "15 min",
    benefits: ["High fiber keeps you full", "Antioxidants from berries", "Slow-release energy"],
    genderBenefits: ["Iron from oats supports menstrual health", "Antioxidants help skin glow"],
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80",
  }],
  [{
    id: "b2", name: "Avocado Toast with Poached Egg", category: "breakfast",
    calories: 380, protein: 16, carbs: 32, fat: 20,
    ingredients: ["Sourdough bread", "Avocado", "Eggs", "Lemon", "Chili flakes", "Olive oil"],
    spices: ["Chili flakes", "Black pepper", "Salt"],
    steps: [
      { step: 1, text: "Toast sourdough bread until golden", time: "3 min" },
      { step: 2, text: "Mash avocado with lemon and salt", time: "2 min" },
      { step: 3, text: "Poach egg in simmering water", time: "4 min" },
      { step: 4, text: "Assemble and sprinkle chili flakes", time: "1 min" },
    ],
    substitutes: [{ ingredient: "Eggs", alternatives: ["Tofu scramble", "Chickpea flour omelet"] }],
    dietaryTags: ["Vegetarian", "High Protein"], appliances: ["toaster"], cookTime: "12 min",
    benefits: ["Healthy fats support brain function", "Protein keeps you satiated", "Fiber aids digestion"],
    genderBenefits: ["Healthy fats support hormone balance", "Folate from avocado supports fertility"],
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&q=80",
  }],
  [{
    id: "b3", name: "Greek Yogurt Parfait", category: "breakfast",
    calories: 350, protein: 22, carbs: 42, fat: 8,
    ingredients: ["Greek yogurt", "Granola", "Mixed berries", "Honey", "Chia seeds", "Almonds"],
    spices: ["Cinnamon"],
    steps: [
      { step: 1, text: "Layer yogurt at the bottom of a bowl", time: "1 min" },
      { step: 2, text: "Add granola and berries in layers", time: "2 min" },
      { step: 3, text: "Sprinkle chia seeds and almonds", time: "1 min" },
      { step: 4, text: "Drizzle honey on top", time: "30 sec" },
    ],
    substitutes: [{ ingredient: "Greek yogurt", alternatives: ["Coconut yogurt", "Skyr", "Kefir"] }],
    dietaryTags: ["Vegetarian", "Probiotic"], appliances: ["none"], cookTime: "5 min",
    benefits: ["Probiotics support gut health", "High protein for muscle maintenance", "Antioxidants from berries"],
    genderBenefits: ["Calcium supports bone health", "Probiotics improve digestion during periods"],
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80",
  }],
  [{
    id: "b4", name: "Spinach and Feta Omelet", category: "breakfast",
    calories: 340, protein: 20, carbs: 8, fat: 24,
    ingredients: ["Eggs", "Spinach", "Feta cheese", "Olive oil", "Tomato", "Onion"],
    spices: ["Oregano", "Black pepper", "Salt"],
    steps: [
      { step: 1, text: "Saute onion and tomato until soft", time: "3 min" },
      { step: 2, text: "Add spinach and wilt", time: "2 min" },
      { step: 3, text: "Pour beaten eggs over vegetables", time: "1 min" },
      { step: 4, text: "Sprinkle feta and fold omelet", time: "3 min" },
    ],
    substitutes: [{ ingredient: "Feta", alternatives: ["Goat cheese", "Cottage cheese", "Tofu"] }],
    dietaryTags: ["Vegetarian", "Low Carb", "Keto-friendly"], appliances: ["none"], cookTime: "12 min",
    benefits: ["Iron from spinach boosts energy", "High protein for muscle repair", "Low carb for stable blood sugar"],
    genderBenefits: ["Iron-rich for menstrual health", "Folate supports reproductive health"],
    image: "https://images.unsplash.com/photo-1510693206972-df098062cb71?w=800&q=80",
  }],
  [{
    id: "b5", name: "Overnight Chia Pudding", category: "breakfast",
    calories: 310, protein: 12, carbs: 38, fat: 14,
    ingredients: ["Chia seeds", "Almond milk", "Maple syrup", "Vanilla", "Mango", "Coconut flakes"],
    spices: ["Cardamom"],
    steps: [
      { step: 1, text: "Mix chia seeds, almond milk, maple syrup, and vanilla", time: "3 min" },
      { step: 2, text: "Refrigerate overnight (or 4+ hours)", time: "8 hr" },
      { step: 3, text: "Top with fresh mango and coconut flakes", time: "2 min" },
    ],
    substitutes: [{ ingredient: "Almond milk", alternatives: ["Oat milk", "Coconut milk", "Soy milk"] }],
    dietaryTags: ["Vegan", "Gluten-free", "Prep ahead"], appliances: ["none"], cookTime: "5 min + overnight",
    benefits: ["Omega-3 from chia supports heart health", "Fiber aids digestion", "No morning prep needed"],
    genderBenefits: ["Omega-3 reduces inflammation", "Fiber helps hormonal balance"],
    image: "https://images.unsplash.com/photo-1551893138-7ba8b1c1e5c8?w=800&q=80",
  }],
  [{
    id: "b6", name: "Masala Dosa with Coconut Chutney", category: "breakfast",
    calories: 450, protein: 10, carbs: 72, fat: 14,
    ingredients: ["Dosa batter", "Potato", "Onion", "Mustard seeds", "Curry leaves", "Coconut"],
    spices: ["Turmeric", "Cumin", "Mustard seeds", "Curry leaves"],
    steps: [
      { step: 1, text: "Prepare potato masala filling with spices", time: "10 min" },
      { step: 2, text: "Spread dosa batter thin on hot pan", time: "2 min" },
      { step: 3, text: "Add masala filling and fold", time: "2 min" },
      { step: 4, text: "Blend coconut with green chili for chutney", time: "3 min" },
    ],
    substitutes: [{ ingredient: "Dosa batter", alternatives: ["Rice flour batter", "Store-bought dosa mix"] }],
    dietaryTags: ["Vegetarian", "Indian", "Fermented"], appliances: ["none"], cookTime: "20 min",
    benefits: ["Fermented batter improves gut health", "Complex carbs for sustained energy", "Spices boost metabolism"],
    genderBenefits: ["Fermented foods aid digestion", "Iron from spices supports blood health"],
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&q=80",
  }],
  [{
    id: "b7", name: "Shakshuka (Eggs in Spicy Tomato Sauce)", category: "breakfast",
    calories: 360, protein: 18, carbs: 28, fat: 18,
    ingredients: ["Eggs", "Tomatoes", "Bell pepper", "Onion", "Garlic", "Feta cheese"],
    spices: ["Cumin", "Paprika", "Harissa", "Cilantro"],
    steps: [
      { step: 1, text: "Saute onion, pepper, and garlic until soft", time: "5 min" },
      { step: 2, text: "Add tomatoes and spices, simmer", time: "10 min" },
      { step: 3, text: "Make wells and crack eggs into sauce", time: "2 min" },
      { step: 4, text: "Cover and cook until eggs are set", time: "5 min" },
    ],
    substitutes: [{ ingredient: "Eggs", alternatives: ["Tofu cubes", "Chickpeas"] }],
    dietaryTags: ["Vegetarian", "Mediterranean", "One-pan"], appliances: ["none"], cookTime: "25 min",
    benefits: ["Lycopene from tomatoes protects skin", "Protein-rich for muscle maintenance", "Anti-inflammatory spices"],
    genderBenefits: ["Lycopene supports skin health", "Iron from eggs and tomatoes"],
    image: "https://images.unsplash.com/photo-1590412200988-a436970781fa?w=800&q=80",
  }],
];

const LUNCH_SETS: Meal[][] = [
  [{
    id: "l1", name: "Grilled Chicken Buddha Bowl", category: "lunch",
    calories: 580, protein: 42, carbs: 52, fat: 18,
    ingredients: ["Chicken breast", "Quinoa", "Kale", "Chickpeas", "Avocado", "Tahini"],
    spices: ["Cumin", "Paprika", "Garlic powder"],
    steps: [
      { step: 1, text: "Season and grill chicken breast", time: "12 min" },
      { step: 2, text: "Cook quinoa according to package", time: "15 min" },
      { step: 3, text: "Massage kale with olive oil and lemon", time: "3 min" },
      { step: 4, text: "Assemble bowl with all components", time: "2 min" },
    ],
    substitutes: [{ ingredient: "Chicken", alternatives: ["Tofu", "Tempeh", "Chickpeas"] }],
    dietaryTags: ["High Protein", "Gluten-free"], appliances: ["none"], cookTime: "30 min",
    benefits: ["Complete protein from quinoa", "Fiber-rich for gut health", "Healthy fats from avocado"],
    genderBenefits: ["Iron and protein support menstrual health", "Calcium from tahini for bones"],
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
  }],
  [{
    id: "l2", name: "Mediterranean Lentil Soup", category: "lunch",
    calories: 420, protein: 18, carbs: 58, fat: 10,
    ingredients: ["Red lentils", "Carrots", "Celery", "Onion", "Tomatoes", "Spinach"],
    spices: ["Cumin", "Coriander", "Turmeric", "Bay leaf"],
    steps: [
      { step: 1, text: "Saute onion, carrot, and celery", time: "5 min" },
      { step: 2, text: "Add lentils, tomatoes, and spices", time: "3 min" },
      { step: 3, text: "Simmer with broth until lentils are tender", time: "25 min" },
      { step: 4, text: "Stir in spinach and serve", time: "2 min" },
    ],
    substitutes: [{ ingredient: "Red lentils", alternatives: ["Yellow lentils", "Split peas", "Chickpeas"] }],
    dietaryTags: ["Vegan", "High Fiber", "One-pot"], appliances: ["none"], cookTime: "35 min",
    benefits: ["Plant-based protein and iron", "Fiber supports digestive health", "Anti-inflammatory turmeric"],
    genderBenefits: ["Iron-rich for energy during periods", "Folate supports reproductive health"],
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80",
  }],
  [{
    id: "l3", name: "Salmon Poke Bowl", category: "lunch",
    calories: 520, protein: 38, carbs: 48, fat: 20,
    ingredients: ["Salmon", "Sushi rice", "Edamame", "Cucumber", "Avocado", "Sesame seeds"],
    spices: ["Soy sauce", "Rice vinegar", "Sesame oil", "Ginger"],
    steps: [
      { step: 1, text: "Cook sushi rice and let cool", time: "20 min" },
      { step: 2, text: "Cube salmon and marinate in soy/ginger", time: "10 min" },
      { step: 3, text: "Slice cucumber and avocado", time: "3 min" },
      { step: 4, text: "Assemble bowl with rice, salmon, and toppings", time: "2 min" },
    ],
    substitutes: [{ ingredient: "Salmon", alternatives: ["Tuna", "Tofu", "Cooked shrimp"] }],
    dietaryTags: ["Pescatarian", "Omega-3", "Japanese"], appliances: ["none"], cookTime: "25 min",
    benefits: ["Omega-3 fatty acids for heart and brain", "High-quality protein", "Low glycemic index rice"],
    genderBenefits: ["Omega-3 reduces PMS symptoms", "Protein supports lean muscle"],
    image: "https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?w=800&q=80",
  }],
  [{
    id: "l4", name: "Chickpea and Spinach Curry", category: "lunch",
    calories: 480, protein: 16, carbs: 62, fat: 16,
    ingredients: ["Chickpeas", "Spinach", "Tomatoes", "Coconut milk", "Onion", "Ginger"],
    spices: ["Garam masala", "Turmeric", "Cumin", "Coriander", "Chili"],
    steps: [
      { step: 1, text: "Saute onion, ginger, and garlic", time: "5 min" },
      { step: 2, text: "Add spices and toast for 30 seconds", time: "1 min" },
      { step: 3, text: "Add chickpeas, tomatoes, and coconut milk", time: "3 min" },
      { step: 4, text: "Simmer 15 min, stir in spinach at end", time: "15 min" },
    ],
    substitutes: [{ ingredient: "Coconut milk", alternatives: ["Cashew cream", "Oat cream", "Yogurt"] }],
    dietaryTags: ["Vegan", "Indian", "One-pot"], appliances: ["none"], cookTime: "25 min",
    benefits: ["Plant protein and fiber from chickpeas", "Iron from spinach", "Anti-inflammatory spices"],
    genderBenefits: ["Iron supports menstrual health", "Anti-inflammatory spices ease cramps"],
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80",
  }],
  [{
    id: "l5", name: "Turkey and Veggie Lettuce Wraps", category: "lunch",
    calories: 380, protein: 32, carbs: 18, fat: 18,
    ingredients: ["Ground turkey", "Lettuce leaves", "Water chestnuts", "Green onion", "Soy sauce", "Sesame oil"],
    spices: ["Ginger", "Garlic", "Soy sauce", "Rice vinegar"],
    steps: [
      { step: 1, text: "Brown ground turkey with ginger and garlic", time: "8 min" },
      { step: 2, text: "Add water chestnuts and green onion", time: "2 min" },
      { step: 3, text: "Season with soy sauce and rice vinegar", time: "1 min" },
      { step: 4, text: "Spoon into lettuce leaves and serve", time: "2 min" },
    ],
    substitutes: [{ ingredient: "Ground turkey", alternatives: ["Ground chicken", "Crumbled tofu", "Lentils"] }],
    dietaryTags: ["Low Carb", "High Protein", "Gluten-free"], appliances: ["none"], cookTime: "15 min",
    benefits: ["Lean protein for muscle maintenance", "Low carb for stable energy", "Crunchy texture satisfies cravings"],
    genderBenefits: ["Lean protein supports metabolism", "Low calorie for weight management"],
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&q=80",
  }],
  [{
    id: "l6", name: "Quinoa Stuffed Bell Peppers", category: "lunch",
    calories: 460, protein: 16, carbs: 58, fat: 16,
    ingredients: ["Bell peppers", "Quinoa", "Black beans", "Corn", "Cheese", "Tomato sauce"],
    spices: ["Cumin", "Chili powder", "Oregano", "Garlic"],
    steps: [
      { step: 1, text: "Cook quinoa and mix with beans, corn, and spices", time: "15 min" },
      { step: 2, text: "Halve peppers and remove seeds", time: "3 min" },
      { step: 3, text: "Stuff peppers with quinoa mixture", time: "3 min" },
      { step: 4, text: "Top with cheese and bake until tender", time: "25 min" },
    ],
    substitutes: [{ ingredient: "Cheese", alternatives: ["Nutritional yeast", "Vegan cheese", "Skip it"] }],
    dietaryTags: ["Vegetarian", "Mexican-inspired", "Meal-prep friendly"], appliances: ["oven"], cookTime: "45 min",
    benefits: ["Complete protein from quinoa", "Fiber-rich beans and veggies", "Vitamin C from peppers"],
    genderBenefits: ["Vitamin C aids iron absorption", "Fiber supports hormonal balance"],
    image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800&q=80",
  }],
  [{
    id: "l7", name: "Thai Basil Chicken Stir-fry", category: "lunch",
    calories: 540, protein: 36, carbs: 48, fat: 18,
    ingredients: ["Chicken thigh", "Thai basil", "Chili", "Garlic", "Fish sauce", "Jasmine rice"],
    spices: ["Fish sauce", "Oyster sauce", "Sugar", "White pepper"],
    steps: [
      { step: 1, text: "Cook jasmine rice", time: "15 min" },
      { step: 2, text: "Stir-fry chicken with garlic and chili", time: "8 min" },
      { step: 3, text: "Add sauces and toss in Thai basil", time: "2 min" },
      { step: 4, text: "Serve over rice with extra basil", time: "1 min" },
    ],
    substitutes: [{ ingredient: "Fish sauce", alternatives: ["Soy sauce + lime", "Vegetarian fish sauce"] }],
    dietaryTags: ["Thai", "High Protein", "Quick"], appliances: ["none"], cookTime: "25 min",
    benefits: ["High protein for muscle repair", "Basil has anti-inflammatory properties", "Complex carbs for energy"],
    genderBenefits: ["Protein supports lean muscle mass", "Basil helps reduce stress hormones"],
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1af970?w=800&q=80",
  }],
];

const DINNER_SETS: Meal[][] = [
  [{
    id: "d1", name: "Baked Salmon with Roasted Vegetables", category: "dinner",
    calories: 520, protein: 38, carbs: 28, fat: 24,
    ingredients: ["Salmon fillet", "Broccoli", "Sweet potato", "Olive oil", "Lemon", "Dill"],
    spices: ["Dill", "Garlic", "Lemon zest", "Black pepper"],
    steps: [
      { step: 1, text: "Preheat oven to 400F (200C)", time: "5 min" },
      { step: 2, text: "Toss vegetables with olive oil and spices", time: "3 min" },
      { step: 3, text: "Bake vegetables for 20 minutes", time: "20 min" },
      { step: 4, text: "Add salmon and bake 12 more minutes", time: "12 min" },
    ],
    substitutes: [{ ingredient: "Salmon", alternatives: ["Trout", "Cod", "Tofu steak"] }],
    dietaryTags: ["Pescatarian", "Omega-3", "One-pan"], appliances: ["oven"], cookTime: "40 min",
    benefits: ["Omega-3 for heart and brain health", "Fiber and vitamins from vegetables", "High-quality protein"],
    genderBenefits: ["Omega-3 reduces inflammation and PMS", "Vitamin D from salmon supports mood"],
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80",
  }],
  [{
    id: "d2", name: "Mushroom and Spinach Risotto", category: "dinner",
    calories: 480, protein: 14, carbs: 68, fat: 14,
    ingredients: ["Arborio rice", "Mushrooms", "Spinach", "Vegetable broth", "Parmesan", "White wine"],
    spices: ["Thyme", "Garlic", "Nutmeg", "Black pepper"],
    steps: [
      { step: 1, text: "Saute mushrooms until golden", time: "8 min" },
      { step: 2, text: "Add rice and toast for 2 minutes", time: "2 min" },
      { step: 3, text: "Add wine, then ladle broth gradually", time: "20 min" },
      { step: 4, text: "Stir in spinach and parmesan at end", time: "3 min" },
    ],
    substitutes: [{ ingredient: "Arborio rice", alternatives: ["Carnaroli rice", "Pearl barley", "Quinoa"] }],
    dietaryTags: ["Vegetarian", "Italian", "Comfort Food"], appliances: ["none"], cookTime: "35 min",
    benefits: ["Complex carbs for serotonin production", "Mushrooms support immunity", "Calcium from parmesan"],
    genderBenefits: ["Serotonin from carbs supports mood", "Iron from spinach"],
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&q=80",
  }],
  [{
    id: "d3", name: "Chicken Tikka Masala", category: "dinner",
    calories: 580, protein: 40, carbs: 42, fat: 24,
    ingredients: ["Chicken breast", "Yogurt", "Tomatoes", "Cream", "Onion", "Ginger"],
    spices: ["Garam masala", "Cumin", "Coriander", "Turmeric", "Paprika", "Fenugreek"],
    steps: [
      { step: 1, text: "Marinate chicken in yogurt and spices", time: "30 min (or overnight)" },
      { step: 2, text: "Grill or pan-sear chicken until charred", time: "10 min" },
      { step: 3, text: "Simmer sauce with tomatoes, cream, and spices", time: "15 min" },
      { step: 4, text: "Add chicken to sauce and simmer 10 min", time: "10 min" },
    ],
    substitutes: [{ ingredient: "Cream", alternatives: ["Coconut cream", "Cashew cream", "Greek yogurt"] }],
    dietaryTags: ["Indian", "High Protein", "Comfort Food"], appliances: ["none"], cookTime: "65 min",
    benefits: ["Protein-rich for muscle repair", "Anti-inflammatory spices", "Probiotics from yogurt marinade"],
    genderBenefits: ["Protein supports hormone production", "Anti-inflammatory spices ease menstrual pain"],
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80",
  }],
  [{
    id: "d4", name: "Zucchini Noodles with Pesto", category: "dinner",
    calories: 340, protein: 12, carbs: 18, fat: 24,
    ingredients: ["Zucchini", "Basil pesto", "Cherry tomatoes", "Pine nuts", "Parmesan", "Olive oil"],
    spices: ["Garlic", "Black pepper", "Red pepper flakes"],
    steps: [
      { step: 1, text: "Spiralize zucchini into noodles", time: "5 min" },
      { step: 2, text: "Saute zoodles for 2-3 min (do not overcook)", time: "3 min" },
      { step: 3, text: "Toss with pesto and halved tomatoes", time: "2 min" },
      { step: 4, text: "Top with parmesan and pine nuts", time: "1 min" },
    ],
    substitutes: [{ ingredient: "Zucchini", alternatives: ["Sweet potato noodles", "Carrot noodles", "Shirataki"] }],
    dietaryTags: ["Low Carb", "Vegetarian", "Keto-friendly", "Quick"], appliances: ["none"], cookTime: "12 min",
    benefits: ["Very low calorie and carb", "Healthy fats from pesto", "Vitamins A and C from zucchini"],
    genderBenefits: ["Low calorie for weight management", "Vitamin C supports collagen production"],
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&q=80",
  }],
  [{
    id: "d5", name: "Beef and Broccoli Stir-fry", category: "dinner",
    calories: 520, protein: 38, carbs: 32, fat: 22,
    ingredients: ["Beef sirloin", "Broccoli", "Soy sauce", "Oyster sauce", "Ginger", "Garlic"],
    spices: ["Soy sauce", "Oyster sauce", "Sesame oil", "Cornstarch"],
    steps: [
      { step: 1, text: "Slice beef thin against the grain", time: "5 min" },
      { step: 2, text: "Marinate beef in soy sauce and cornstarch", time: "15 min" },
      { step: 3, text: "Stir-fry broccoli with ginger and garlic", time: "5 min" },
      { step: 4, text: "Add beef and sauce, cook until done", time: "5 min" },
    ],
    substitutes: [{ ingredient: "Beef", alternatives: ["Chicken", "Tofu", "Seitan"] }],
    dietaryTags: ["High Protein", "Chinese", "Quick"], appliances: ["none"], cookTime: "25 min",
    benefits: ["Iron and zinc from beef", "Vitamin C from broccoli aids iron absorption", "High protein for satiety"],
    genderBenefits: ["Iron-rich for menstrual health", "Zinc supports skin and immune health"],
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&q=80",
  }],
  [{
    id: "d6", name: "Eggplant Parmesan", category: "dinner",
    calories: 480, protein: 18, carbs: 52, fat: 20,
    ingredients: ["Eggplant", "Marinara sauce", "Mozzarella", "Parmesan", "Breadcrumbs", "Eggs"],
    spices: ["Oregano", "Basil", "Garlic powder", "Red pepper flakes"],
    steps: [
      { step: 1, text: "Slice eggplant and salt to draw moisture", time: "15 min" },
      { step: 2, text: "Dredge in egg and breadcrumbs", time: "5 min" },
      { step: 3, text: "Bake or air-fry eggplant until crispy", time: "20 min" },
      { step: 4, text: "Layer with sauce and cheese, bake 15 min", time: "15 min" },
    ],
    substitutes: [{ ingredient: "Eggplant", alternatives: ["Zucchini", "Portobello mushrooms", "Cauliflower steaks"] }],
    dietaryTags: ["Vegetarian", "Italian", "Comfort Food"], appliances: ["oven", "airfryer"], cookTime: "55 min",
    benefits: ["Fiber and antioxidants from eggplant", "Calcium from cheese", "Lycopene from tomato sauce"],
    genderBenefits: ["Antioxidants support skin aging", "Calcium for bone density"],
    image: "https://images.unsplash.com/photo-1572453800999-e8d2d1587b3c?w=800&q=80",
  }],
  [{
    id: "d7", name: "Shrimp Tacos with Cabbage Slaw", category: "dinner",
    calories: 460, protein: 30, carbs: 42, fat: 18,
    ingredients: ["Shrimp", "Corn tortillas", "Cabbage", "Lime", "Cilantro", "Avocado"],
    spices: ["Cumin", "Chili powder", "Garlic", "Lime juice"],
    steps: [
      { step: 1, text: "Season shrimp with cumin and chili powder", time: "2 min" },
      { step: 2, text: "Saute shrimp 2-3 min per side", time: "5 min" },
      { step: 3, text: "Toss cabbage with lime and cilantro for slaw", time: "3 min" },
      { step: 4, text: "Warm tortillas and assemble tacos", time: "3 min" },
    ],
    substitutes: [{ ingredient: "Shrimp", alternatives: ["Fish", "Chicken", "Cauliflower"] }],
    dietaryTags: ["Pescatarian", "Mexican", "Quick"], appliances: ["none"], cookTime: "15 min",
    benefits: ["Low calorie, high protein", "Omega-3 from shrimp", "Fiber from cabbage"],
    genderBenefits: ["Iodine from shrimp supports thyroid", "Low calorie for weight management"],
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800&q=80",
  }],
];

const SNACK_SETS: Meal[][] = [
  [{
    id: "s1", name: "Apple Slices with Almond Butter", category: "snack",
    calories: 220, protein: 6, carbs: 28, fat: 10,
    ingredients: ["Apple", "Almond butter", "Cinnamon", "Chia seeds"],
    spices: ["Cinnamon"],
    steps: [
      { step: 1, text: "Slice apple into wedges", time: "2 min" },
      { step: 2, text: "Dip or drizzle with almond butter", time: "1 min" },
      { step: 3, text: "Sprinkle cinnamon and chia seeds", time: "30 sec" },
    ],
    substitutes: [{ ingredient: "Almond butter", alternatives: ["Peanut butter", "Sunflower seed butter", "Cashew butter"] }],
    dietaryTags: ["Vegan", "Gluten-free", "No-cook"], appliances: ["none"], cookTime: "4 min",
    benefits: ["Fiber from apple aids digestion", "Healthy fats and protein from nut butter", "Natural energy boost"],
    genderBenefits: ["Fiber helps hormonal balance", "Healthy fats support skin elasticity"],
    image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=800&q=80",
  }],
  [{
    id: "s2", name: "Hummus and Veggie Sticks", category: "snack",
    calories: 200, protein: 8, carbs: 22, fat: 10,
    ingredients: ["Hummus", "Carrots", "Cucumber", "Bell pepper", "Celery"],
    spices: ["Paprika", "Cumin"],
    steps: [
      { step: 1, text: "Cut vegetables into sticks", time: "5 min" },
      { step: 2, text: "Serve with hummus in a bowl", time: "1 min" },
    ],
    substitutes: [{ ingredient: "Hummus", alternatives: ["White bean dip", "Guacamole", "Greek yogurt dip"] }],
    dietaryTags: ["Vegan", "Gluten-free", "No-cook"], appliances: ["none"], cookTime: "6 min",
    benefits: ["Plant protein from chickpeas", "Vitamins from raw vegetables", "Low calorie, high volume"],
    genderBenefits: ["Plant protein supports hormone balance", "Raw veggies provide enzymes"],
    image: "https://images.unsplash.com/photo-1637949385162-e416fb15b2ce?w=800&q=80",
  }],
  [{
    id: "s3", name: "Greek Yogurt with Honey and Walnuts", category: "snack",
    calories: 240, protein: 18, carbs: 18, fat: 12,
    ingredients: ["Greek yogurt", "Honey", "Walnuts", "Cinnamon"],
    spices: ["Cinnamon"],
    steps: [
      { step: 1, text: "Scoop Greek yogurt into a bowl", time: "1 min" },
      { step: 2, text: "Drizzle honey and sprinkle walnuts", time: "1 min" },
      { step: 3, text: "Dust with cinnamon", time: "30 sec" },
    ],
    substitutes: [{ ingredient: "Walnuts", alternatives: ["Almonds", "Pecans", "Pumpkin seeds"] }],
    dietaryTags: ["Vegetarian", "Probiotic", "No-cook"], appliances: ["none"], cookTime: "3 min",
    benefits: ["Probiotics for gut health", "Omega-3 from walnuts", "Protein keeps you full"],
    genderBenefits: ["Calcium for bone health", "Omega-3 reduces inflammation"],
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80",
  }],
  [{
    id: "s4", name: "Rice Cakes with Avocado", category: "snack",
    calories: 180, protein: 4, carbs: 24, fat: 8,
    ingredients: ["Rice cakes", "Avocado", "Lemon", "Chili flakes", "Salt"],
    spices: ["Chili flakes", "Salt", "Black pepper"],
    steps: [
      { step: 1, text: "Mash avocado with lemon and salt", time: "2 min" },
      { step: 2, text: "Spread on rice cakes", time: "1 min" },
      { step: 3, text: "Sprinkle chili flakes", time: "30 sec" },
    ],
    substitutes: [{ ingredient: "Rice cakes", alternatives: ["Corn cakes", "Whole grain crackers", "Cucumber slices"] }],
    dietaryTags: ["Vegan", "Gluten-free", "No-cook"], appliances: ["none"], cookTime: "4 min",
    benefits: ["Healthy fats from avocado", "Low calorie snack", "Fiber supports digestion"],
    genderBenefits: ["Healthy fats support hormone production", "Folate for reproductive health"],
    image: "https://images.unsplash.com/photo-1541529086526-db283c563270?w=800&q=80",
  }],
  [{
    id: "s5", name: "Hard-Boiled Eggs with Everything Spice", category: "snack",
    calories: 160, protein: 14, carbs: 2, fat: 10,
    ingredients: ["Eggs", "Everything bagel seasoning", "Salt"],
    spices: ["Everything bagel seasoning"],
    steps: [
      { step: 1, text: "Boil eggs for 10 minutes", time: "10 min" },
      { step: 2, text: "Cool in ice water and peel", time: "5 min" },
      { step: 3, text: "Halve and sprinkle with seasoning", time: "1 min" },
    ],
    substitutes: [{ ingredient: "Eggs", alternatives: ["Deviled tofu", "Chickpea flour bites"] }],
    dietaryTags: ["Keto-friendly", "High Protein", "Low Carb"], appliances: ["none"], cookTime: "16 min",
    benefits: ["Complete protein source", "Choline supports brain health", "Very low carb"],
    genderBenefits: ["Choline supports fetal brain development", "Protein supports lean muscle"],
    image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800&q=80",
  }],
  [{
    id: "s6", name: "Trail Mix Energy Bites", category: "snack",
    calories: 200, protein: 6, carbs: 24, fat: 10,
    ingredients: ["Oats", "Peanut butter", "Honey", "Dark chocolate chips", "Dried cranberries", "Chia seeds"],
    spices: ["Cinnamon", "Vanilla"],
    steps: [
      { step: 1, text: "Mix all ingredients in a bowl", time: "3 min" },
      { step: 2, text: "Roll into bite-sized balls", time: "5 min" },
      { step: 3, text: "Refrigerate for 30 min to set", time: "30 min" },
    ],
    substitutes: [{ ingredient: "Peanut butter", alternatives: ["Almond butter", "Sunflower seed butter"] }],
    dietaryTags: ["Vegan", "No-bake", "Meal-prep friendly"], appliances: ["none"], cookTime: "8 min + chill",
    benefits: ["Slow-release energy from oats", "Antioxidants from dark chocolate", "Fiber and healthy fats"],
    genderBenefits: ["Iron from oats", "Antioxidants support skin health"],
    image: "https://images.unsplash.com/photo-1604329760661-e71dc83f8d26?w=800&q=80",
  }],
  [{
    id: "s7", name: "Edamame with Sea Salt", category: "snack",
    calories: 190, protein: 18, carbs: 14, fat: 8,
    ingredients: ["Edamame pods", "Sea salt", "Lemon"],
    spices: ["Sea salt"],
    steps: [
      { step: 1, text: "Boil edamame in salted water for 5 min", time: "5 min" },
      { step: 2, text: "Drain and toss with sea salt", time: "1 min" },
      { step: 3, text: "Squeeze lemon over pods", time: "30 sec" },
    ],
    substitutes: [{ ingredient: "Edamame", alternatives: ["Green peas", "Fava beans", "Chickpeas"] }],
    dietaryTags: ["Vegan", "High Protein", "Gluten-free"], appliances: ["none"], cookTime: "7 min",
    benefits: ["Complete plant protein", "Fiber for satiety", "Isoflavones support hormone balance"],
    genderBenefits: ["Isoflavones may ease menopause symptoms", "Protein supports lean muscle"],
    image: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=800&q=80",
  }],
];

const DESSERT_SETS: Meal[][] = [
  [{
    id: "de1", name: "Dark Chocolate Avocado Mousse", category: "dessert",
    calories: 280, protein: 6, carbs: 28, fat: 18,
    ingredients: ["Avocado", "Dark chocolate", "Cocoa powder", "Maple syrup", "Vanilla", "Almond milk"],
    spices: ["Vanilla", "Cinnamon"],
    steps: [
      { step: 1, text: "Melt dark chocolate", time: "3 min" },
      { step: 2, text: "Blend avocado, cocoa, maple syrup, and milk", time: "2 min" },
      { step: 3, text: "Add melted chocolate and blend until smooth", time: "1 min" },
      { step: 4, text: "Chill for 30 min before serving", time: "30 min" },
    ],
    substitutes: [{ ingredient: "Dark chocolate", alternatives: ["Cacao powder", "Carob powder"] }],
    dietaryTags: ["Vegan", "Gluten-free", "No-bake"], appliances: ["none"], cookTime: "6 min + chill",
    benefits: ["Healthy fats from avocado", "Antioxidants from dark chocolate", "No refined sugar needed"],
    genderBenefits: ["Magnesium from chocolate eases cramps", "Healthy fats support hormone balance"],
    image: "https://images.unsplash.com/photo-1511381939415-e44015466834?w=800&q=80",
  }],
  [{
    id: "de2", name: "Baked Apple with Cinnamon", category: "dessert",
    calories: 180, protein: 2, carbs: 42, fat: 4,
    ingredients: ["Apple", "Cinnamon", "Honey", "Walnuts", "Raisins", "Butter"],
    spices: ["Cinnamon", "Nutmeg"],
    steps: [
      { step: 1, text: "Core apple and stuff with walnuts and raisins", time: "3 min" },
      { step: 2, text: "Drizzle honey and dot with butter", time: "1 min" },
      { step: 3, text: "Bake at 375F for 25 min", time: "25 min" },
    ],
    substitutes: [{ ingredient: "Butter", alternatives: ["Coconut oil", "Skip it"] }],
    dietaryTags: ["Vegetarian", "Gluten-free", "Low fat"], appliances: ["oven"], cookTime: "30 min",
    benefits: ["Fiber from apple", "Natural sweetness", "Warm comfort food"],
    genderBenefits: ["Fiber aids digestion", "Warm spices improve circulation"],
    image: "https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?w=800&q=80",
  }],
  [{
    id: "de3", name: "Greek Yogurt Berry Parfait", category: "dessert",
    calories: 220, protein: 14, carbs: 32, fat: 4,
    ingredients: ["Greek yogurt", "Mixed berries", "Granola", "Honey", "Mint"],
    spices: ["Vanilla"],
    steps: [
      { step: 1, text: "Layer yogurt, berries, and granola in a glass", time: "3 min" },
      { step: 2, text: "Drizzle honey and garnish with mint", time: "1 min" },
    ],
    substitutes: [{ ingredient: "Greek yogurt", alternatives: ["Coconut yogurt", "Skyr"] }],
    dietaryTags: ["Vegetarian", "Probiotic", "No-bake"], appliances: ["none"], cookTime: "4 min",
    benefits: ["Protein and probiotics", "Antioxidants from berries", "Low calorie dessert"],
    genderBenefits: ["Calcium for bone health", "Antioxidants for skin glow"],
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80",
  }],
  [{
    id: "de4", name: "Chia Seed Pudding with Mango", category: "dessert",
    calories: 250, protein: 8, carbs: 38, fat: 10,
    ingredients: ["Chia seeds", "Coconut milk", "Maple syrup", "Mango", "Coconut flakes"],
    spices: ["Cardamom", "Vanilla"],
    steps: [
      { step: 1, text: "Mix chia seeds, coconut milk, maple syrup, and spices", time: "3 min" },
      { step: 2, text: "Refrigerate for 4+ hours or overnight", time: "4 hr" },
      { step: 3, text: "Top with fresh mango and coconut flakes", time: "2 min" },
    ],
    substitutes: [{ ingredient: "Coconut milk", alternatives: ["Almond milk", "Oat milk"] }],
    dietaryTags: ["Vegan", "Gluten-free", "No-bake"], appliances: ["none"], cookTime: "5 min + chill",
    benefits: ["Omega-3 from chia", "Fiber keeps you full", "Tropical flavor without added sugar"],
    genderBenefits: ["Omega-3 reduces inflammation", "Fiber supports hormonal balance"],
    image: "https://images.unsplash.com/photo-1551893138-7ba8b1c1e5c8?w=800&q=80",
  }],
  [{
    id: "de5", name: "Frozen Banana Bites with Chocolate", category: "dessert",
    calories: 200, protein: 4, carbs: 32, fat: 8,
    ingredients: ["Banana", "Dark chocolate", "Peanut butter", "Coconut oil"],
    spices: ["Sea salt"],
    steps: [
      { step: 1, text: "Slice banana into thick rounds", time: "2 min" },
      { step: 2, text: "Sandwich peanut butter between two slices", time: "3 min" },
      { step: 3, text: "Melt chocolate with coconut oil", time: "3 min" },
      { step: 4, text: "Dip banana bites and freeze for 1 hour", time: "1 hr" },
    ],
    substitutes: [{ ingredient: "Peanut butter", alternatives: ["Almond butter", "Sunflower seed butter"] }],
    dietaryTags: ["Vegan", "Gluten-free", "No-bake"], appliances: ["none"], cookTime: "8 min + freeze",
    benefits: ["Natural sweetness from banana", "Potassium supports muscle function", "Antioxidants from chocolate"],
    genderBenefits: ["Potassium eases bloating", "Magnesium from chocolate relaxes muscles"],
    image: "https://images.unsplash.com/photo-1511381939415-e44015466834?w=800&q=80",
  }],
  [{
    id: "de6", name: "Oatmeal Raisin Cookies (Healthier)", category: "dessert",
    calories: 160, protein: 4, carbs: 24, fat: 6,
    ingredients: ["Oats", "Raisins", "Banana", "Cinnamon", "Vanilla", "Almond flour"],
    spices: ["Cinnamon", "Nutmeg", "Vanilla"],
    steps: [
      { step: 1, text: "Mash banana and mix with oats and almond flour", time: "3 min" },
      { step: 2, text: "Fold in raisins and spices", time: "1 min" },
      { step: 3, text: "Form cookies and bake at 350F for 12 min", time: "15 min" },
    ],
    substitutes: [{ ingredient: "Raisins", alternatives: ["Dried cranberries", "Chocolate chips", "Chopped dates"] }],
    dietaryTags: ["Vegan", "Gluten-free", "Refined sugar-free"], appliances: ["oven"], cookTime: "20 min",
    benefits: ["Fiber from oats", "Natural sweetness from banana", "No refined sugar"],
    genderBenefits: ["Iron from oats", "Fiber aids digestion"],
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80",
  }],
  [{
    id: "de7", name: "Strawberry Sorbet", category: "dessert",
    calories: 140, protein: 2, carbs: 34, fat: 0,
    ingredients: ["Frozen strawberries", "Lemon juice", "Honey", "Water"],
    spices: ["Mint"],
    steps: [
      { step: 1, text: "Blend frozen strawberries with lemon and honey", time: "2 min" },
      { step: 2, text: "Add water as needed for smooth texture", time: "1 min" },
      { step: 3, text: "Serve immediately as soft-serve or freeze 1 hour", time: "1 hr" },
    ],
    substitutes: [{ ingredient: "Strawberries", alternatives: ["Mango", "Peach", "Raspberry"] }],
    dietaryTags: ["Vegan", "Gluten-free", "Fat-free", "No-bake"], appliances: ["blender"], cookTime: "3 min",
    benefits: ["Vitamin C from strawberries", "No added fat", "Refreshing and light"],
    genderBenefits: ["Vitamin C supports collagen", "Low calorie for weight management"],
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80",
  }],
];

const BEVERAGE_SETS: Meal[][] = [
  [{
    id: "bv1", name: "Lemon Infused Water", category: "beverage",
    calories: 10, protein: 0, carbs: 3, fat: 0,
    ingredients: ["Water", "Lemon slices", "Mint leaves", "Ice"],
    spices: ["Mint"],
    steps: [
      { step: 1, text: "Fill a pitcher with water and ice", time: "1 min" },
      { step: 2, text: "Add lemon slices and fresh mint", time: "1 min" },
      { step: 3, text: "Let infuse for 15 min, then enjoy", time: "15 min" },
    ],
    substitutes: [{ ingredient: "Lemon", alternatives: ["Lime", "Cucumber", "Orange slices"] }],
    dietaryTags: ["Vegan", "Zero calorie", "Hydrating"], appliances: ["none"], cookTime: "2 min",
    benefits: ["Hydrates without calories", "Vitamin C from lemon", "Mint aids digestion"],
    genderBenefits: ["Hydration supports skin elasticity", "Vitamin C boosts immunity"],
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&q=80",
  }],
  [{
    id: "bv2", name: "Iced Green Tea with Honey", category: "beverage",
    calories: 30, protein: 0, carbs: 8, fat: 0,
    ingredients: ["Green tea bag", "Water", "Honey", "Lemon", "Ice"],
    spices: ["Lemon"],
    steps: [
      { step: 1, text: "Brew green tea in hot water for 3 min", time: "3 min" },
      { step: 2, text: "Remove tea bag and let cool", time: "10 min" },
      { step: 3, text: "Add honey, lemon, and ice", time: "1 min" },
    ],
    substitutes: [{ ingredient: "Green tea", alternatives: ["White tea", "Herbal tea", "Matcha"] }],
    dietaryTags: ["Vegan", "Antioxidant", "Low calorie"], appliances: ["none"], cookTime: "15 min",
    benefits: ["Catechins boost metabolism", "Gentle caffeine for alertness", "Hydrating"],
    genderBenefits: ["Antioxidants support skin aging", "Gentle energy without jitters"],
    image: "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=800&q=80",
  }],
  [{
    id: "bv3", name: "Tropical Smoothie", category: "beverage",
    calories: 220, protein: 6, carbs: 48, fat: 2,
    ingredients: ["Mango", "Pineapple", "Banana", "Coconut water", "Lime"],
    spices: ["Lime juice"],
    steps: [
      { step: 1, text: "Chop fruit into chunks", time: "3 min" },
      { step: 2, text: "Blend with coconut water until smooth", time: "2 min" },
      { step: 3, text: "Squeeze lime and serve over ice", time: "1 min" },
    ],
    substitutes: [{ ingredient: "Coconut water", alternatives: ["Orange juice", "Almond milk", "Water"] }],
    dietaryTags: ["Vegan", "Gluten-free", "No added sugar"], appliances: ["blender"], cookTime: "6 min",
    benefits: ["Electrolytes from coconut water", "Vitamin C from tropical fruits", "Natural energy"],
    genderBenefits: ["Potassium eases bloating", "Vitamin C supports collagen"],
    image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=800&q=80",
  }],
  [{
    id: "bv4", name: "Golden Milk (Turmeric Latte)", category: "beverage",
    calories: 120, protein: 4, carbs: 10, fat: 6,
    ingredients: ["Milk", "Turmeric", "Cinnamon", "Honey", "Ginger", "Black pepper"],
    spices: ["Turmeric", "Cinnamon", "Ginger", "Black pepper"],
    steps: [
      { step: 1, text: "Warm milk in a saucepan", time: "3 min" },
      { step: 2, text: "Whisk in turmeric, cinnamon, ginger, and pepper", time: "2 min" },
      { step: 3, text: "Sweeten with honey and serve warm", time: "1 min" },
    ],
    substitutes: [{ ingredient: "Milk", alternatives: ["Almond milk", "Oat milk", "Coconut milk"] }],
    dietaryTags: ["Vegetarian", "Anti-inflammatory", "Comforting"], appliances: ["none"], cookTime: "6 min",
    benefits: ["Turmeric reduces inflammation", "Warm spices aid digestion", "Calcium from milk"],
    genderBenefits: ["Anti-inflammatory spices ease cramps", "Warm milk promotes relaxation"],
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=800&q=80",
  }],
  [{
    id: "bv5", name: "Watermelon Mint Cooler", category: "beverage",
    calories: 60, protein: 1, carbs: 15, fat: 0,
    ingredients: ["Watermelon", "Mint leaves", "Lime", "Water", "Ice"],
    spices: ["Mint", "Lime"],
    steps: [
      { step: 1, text: "Blend watermelon chunks with water", time: "2 min" },
      { step: 2, text: "Strain if desired", time: "1 min" },
      { step: 3, text: "Add lime, mint, and ice", time: "1 min" },
    ],
    substitutes: [{ ingredient: "Watermelon", alternatives: ["Cantaloupe", "Honeydew", "Cucumber"] }],
    dietaryTags: ["Vegan", "Hydrating", "Low calorie"], appliances: ["blender"], cookTime: "4 min",
    benefits: ["Hydrating electrolytes", "Lycopene from watermelon", "Refreshing for hot days"],
    genderBenefits: ["Lycopene supports skin health", "Hydration reduces bloating"],
    image: "https://images.unsplash.com/photo-1589734580748-ac071d1609af?w=800&q=80",
  }],
  [{
    id: "bv6", name: "Cucumber Basil Sparkler", category: "beverage",
    calories: 25, protein: 0, carbs: 6, fat: 0,
    ingredients: ["Cucumber", "Basil", "Sparkling water", "Lime", "Ice"],
    spices: ["Basil", "Lime"],
    steps: [
      { step: 1, text: "Muddle cucumber and basil in a glass", time: "2 min" },
      { step: 2, text: "Add ice and sparkling water", time: "1 min" },
      { step: 3, text: "Squeeze lime and stir", time: "1 min" },
    ],
    substitutes: [{ ingredient: "Sparkling water", alternatives: ["Still water", "Coconut water", "Tonic water"] }],
    dietaryTags: ["Vegan", "Zero calorie", "Refreshing"], appliances: ["none"], cookTime: "4 min",
    benefits: ["Hydrating without sugar", "Basil has anti-inflammatory properties", "Cucumber cools the body"],
    genderBenefits: ["Anti-inflammatory basil supports hormones", "Hydration for clear skin"],
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&q=80",
  }],
  [{
    id: "bv7", name: "Berry Antioxidant Blast", category: "beverage",
    calories: 140, protein: 2, carbs: 32, fat: 1,
    ingredients: ["Mixed berries", "Spinach", "Banana", "Almond milk", "Chia seeds"],
    spices: ["Vanilla"],
    steps: [
      { step: 1, text: "Blend berries, spinach, banana, and almond milk", time: "2 min" },
      { step: 2, text: "Add chia seeds and blend briefly", time: "30 sec" },
      { step: 3, text: "Serve immediately", time: "1 min" },
    ],
    substitutes: [{ ingredient: "Almond milk", alternatives: ["Oat milk", "Coconut milk", "Soy milk"] }],
    dietaryTags: ["Vegan", "Antioxidant", "Nutrient-dense"], appliances: ["blender"], cookTime: "4 min",
    benefits: ["Antioxidants from berries fight aging", "Iron from spinach", "Fiber from chia"],
    genderBenefits: ["Antioxidants support skin glow", "Iron supports menstrual health"],
    image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=800&q=80",
  }],
];

export function regenerateMeal(
  dateStr: string,
  category: string,
  currentMeals: Meal[]
): Meal[] {
  const dayIndex = getDayIndex(dateStr);
  const nextDayIndex = (dayIndex + 1) % 7;

  let replacement: Meal | null = null;

  switch (category) {
    case "breakfast":
      replacement = { ...BREAKFAST_SETS[nextDayIndex][0] };
      break;
    case "lunch":
      replacement = { ...LUNCH_SETS[nextDayIndex][0] };
      break;
    case "dinner":
      replacement = { ...DINNER_SETS[nextDayIndex][0] };
      break;
    case "snack":
      replacement = { ...SNACK_SETS[nextDayIndex][0] };
      break;
    case "dessert":
      replacement = { ...DESSERT_SETS[nextDayIndex][0] };
      break;
    case "beverage":
      replacement = { ...BEVERAGE_SETS[nextDayIndex][0] };
      break;
  }

  if (!replacement) return currentMeals;

  replacement.id = replacement.id + "-regen-" + Date.now();

  return currentMeals.map((m) =>
    m.category === category ? replacement! : m
  );
}

export function matchCraving(
  query: string,
  avoidedFoods: string[] = [],
  applianceFilter: string[] = []
): Meal[] {
  const q = query.toLowerCase();
  return ALL_MEALS.filter((meal) => {
    const matchesQuery =
      meal.name.toLowerCase().includes(q) ||
      meal.category.toLowerCase().includes(q) ||
      meal.ingredients.some((i) => i.toLowerCase().includes(q)) ||
      meal.dietaryTags.some((t) => t.toLowerCase().includes(q)) ||
      meal.spices.some((s) => s.toLowerCase().includes(q));

    const notAvoided = !avoidedFoods.some((af) =>
      meal.ingredients.some((i) => i.toLowerCase().includes(af.toLowerCase()))
    );

    const matchesAppliance =
      applianceFilter.length === 0 ||
      applianceFilter.some((a) =>
        meal.appliances.includes(a) || meal.appliances.includes("none")
      );

    return matchesQuery && notAvoided && matchesAppliance;
  });
}

export function getDaysInMonth(year: number, month: number): Date[] {
  const days: Date[] = [];
  const date = new Date(year, month, 1);
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

export function getGreeting(name: string): string {
  const hour = new Date().getHours();
  if (hour < 12) return `Good morning, ${name}`;
  if (hour < 17) return `Good afternoon, ${name}`;
  return `Good evening, ${name}`;
}
