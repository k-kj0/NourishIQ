"use client";

export interface Meal {
  id: string;
  name: string;
  category: string;
  image: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  cookTime: string;
  prepTime: string;
  ingredients: string[];
  spices: string[];
  steps: { step: number; text: string; time: string }[];
  substitutes: { ingredient: string; alternatives: string[] }[];
  benefits: string[];
  genderBenefits?: string[];
  dietaryTags: string[];
  appliances: string[];
  isLiked: boolean;
  cuisine: string;
  difficulty: string;
  servings: number;
}

export interface DayPlan {
  date: string;
  meals: Meal[];
  targetCalories: number;
  targetProtein: number;
  targetCarbs: number;
  targetFat: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
}

export interface CalorieLog {
  date: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export const REGIONS = [
  { code: "US", flag: "🇺🇸", name: "United States", currency: "USD" },
  { code: "IN", flag: "🇮🇳", name: "India", currency: "INR" },
  { code: "GB", flag: "🇬🇧", name: "United Kingdom", currency: "GBP" },
  { code: "CA", flag: "🇨🇦", name: "Canada", currency: "CAD" },
  { code: "AU", flag: "🇦🇺", name: "Australia", currency: "AUD" },
  { code: "DE", flag: "🇩🇪", name: "Germany", currency: "EUR" },
  { code: "FR", flag: "🇫🇷", name: "France", currency: "EUR" },
  { code: "JP", flag: "🇯🇵", name: "Japan", currency: "JPY" },
  { code: "CN", flag: "🇨🇳", name: "China", currency: "CNY" },
  { code: "KR", flag: "🇰🇷", name: "South Korea", currency: "KRW" },
  { code: "TH", flag: "🇹🇭", name: "Thailand", currency: "THB" },
  { code: "MX", flag: "🇲🇽", name: "Mexico", currency: "MXN" },
  { code: "IT", flag: "🇮🇹", name: "Italy", currency: "EUR" },
  { code: "ES", flag: "🇪🇸", name: "Spain", currency: "EUR" },
  { code: "BR", flag: "🇧🇷", name: "Brazil", currency: "BRL" },
  { code: "AE", flag: "🇦🇪", name: "UAE", currency: "AED" },
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

export const APPLIANCE_OPTIONS = [
  { id: "none", name: "No special appliances" },
  { id: "microwave", name: "Microwave" },
  { id: "airfryer", name: "Air Fryer" },
  { id: "oven", name: "Oven" },
  { id: "toaster", name: "Toaster" },
  { id: "instant-pot", name: "Instant Pot" },
  { id: "slow-cooker", name: "Slow Cooker" },
  { id: "blender", name: "Blender" },
  { id: "food-processor", name: "Food Processor" },
]

const BREAKFAST_MEALS: Meal[] = [
  {
    id: "bf-1",
    name: "Overnight Chia Pudding",
    category: "breakfast",
    image: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=800&h=400&fit=crop",
    calories: 310, protein: 12, carbs: 38, fat: 14,
    cookTime: "5 min", prepTime: "8 hr",
    ingredients: ["Chia seeds (3 tbsp)", "Almond milk (1 cup)", "Maple syrup (1 tbsp)", "Vanilla extract (1 tsp)", "Fresh mango (1/2 cup)", "Coconut flakes (2 tbsp)"],
    spices: ["Cinnamon", "Cardamom"],
    steps: [
      { step: 1, text: "Mix chia seeds, almond milk, maple syrup, and vanilla in a jar. Stir well.", time: "3 min" },
      { step: 2, text: "Refrigerate overnight (or 4+ hours) until pudding consistency forms.", time: "8 hr" },
      { step: 3, text: "Top with fresh mango and coconut flakes. Add a sprinkle of cinnamon.", time: "2 min" },
    ],
    substitutes: [
      { ingredient: "Almond milk", alternatives: ["Oat milk", "Coconut milk", "Soy milk"] },
      { ingredient: "Maple syrup", alternatives: ["Honey", "Agave", "Stevia"] },
    ],
    benefits: ["High in omega-3 fatty acids", "Rich in fiber for digestion", "Antioxidant-rich from chia seeds", "Supports heart health"],
    genderBenefits: ["Supports hormonal balance", "Rich in calcium for bone health"],
    dietaryTags: ["Vegan", "Gluten-free", "Dairy-free"],
    appliances: ["none"], isLiked: false, cuisine: "International", difficulty: "Easy", servings: 2,
  },
  {
    id: "bf-2",
    name: "Masala Dosa with Sambar",
    category: "breakfast",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&h=400&fit=crop",
    calories: 380, protein: 10, carbs: 62, fat: 12,
    cookTime: "15 min", prepTime: "30 min",
    ingredients: ["Dosa batter (1 cup)", "Potatoes (2 medium, boiled)", "Onion (1, sliced)", "Mustard seeds (1 tsp)", "Turmeric (1/2 tsp)", "Curry leaves (8-10 leaves)", "Sambar (1 cup)"],
    spices: ["Turmeric", "Mustard seeds", "Cumin", "Coriander"],
    steps: [
      { step: 1, text: "Heat a non-stick pan. Pour a ladle of dosa batter and spread in circular motion.", time: "2 min" },
      { step: 2, text: "Add oil around edges. Cook until crispy and golden brown.", time: "3 min" },
      { step: 3, text: "For filling: heat oil, add mustard seeds, curry leaves, onions. Saute until golden.", time: "5 min" },
      { step: 4, text: "Add mashed potatoes, turmeric, salt. Mix well and cook for 2 minutes.", time: "3 min" },
      { step: 5, text: "Place potato filling in center of dosa. Fold and serve hot with sambar.", time: "2 min" },
    ],
    substitutes: [
      { ingredient: "Dosa batter", alternatives: ["Store-bought dosa mix", "Rava dosa batter"] },
      { ingredient: "Sambar", alternatives: ["Coconut chutney", "Tomato chutney"] },
    ],
    benefits: ["Fermented batter aids gut health", "Rich in complex carbohydrates", "Good source of plant protein", "Probiotic-rich"],
    dietaryTags: ["Vegetarian", "Gluten-free"],
    appliances: ["none"], isLiked: false, cuisine: "Indian", difficulty: "Medium", servings: 2,
  },
  {
    id: "bf-3",
    name: "Avocado Toast with Poached Egg",
    category: "breakfast",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&h=400&fit=crop",
    calories: 420, protein: 18, carbs: 32, fat: 24,
    cookTime: "10 min", prepTime: "5 min",
    ingredients: ["Sourdough bread (2 slices)", "Ripe avocado (1)", "Eggs (2)", "Lemon juice (1 tsp)", "Chili flakes (1/2 tsp)", "Microgreens (handful)", "Olive oil (1 tbsp)"],
    spices: ["Chili flakes", "Black pepper", "Sea salt"],
    steps: [
      { step: 1, text: "Toast sourdough bread slices until golden and crispy.", time: "3 min" },
      { step: 2, text: "Mash avocado with lemon juice, salt, and pepper.", time: "2 min" },
      { step: 3, text: "Bring water to simmer. Create vortex and drop egg gently. Poach for 3 minutes.", time: "4 min" },
      { step: 4, text: "Spread avocado on toast. Top with poached egg, chili flakes, and microgreens.", time: "1 min" },
    ],
    substitutes: [
      { ingredient: "Sourdough", alternatives: ["Whole wheat bread", "Gluten-free bread"] },
      { ingredient: "Eggs", alternatives: ["Tofu scramble", "Chickpea flour omelet"] },
    ],
    benefits: ["Healthy fats from avocado", "High-quality protein from eggs", "Fiber-rich whole grains", "Supports brain health"],
    dietaryTags: ["Vegetarian"],
    appliances: ["none"], isLiked: false, cuisine: "International", difficulty: "Easy", servings: 1,
  },
  {
    id: "bf-4",
    name: "Japanese Matcha Smoothie Bowl",
    category: "breakfast",
    image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=800&h=400&fit=crop",
    calories: 290, protein: 14, carbs: 42, fat: 8,
    cookTime: "5 min", prepTime: "5 min",
    ingredients: ["Frozen banana (1)", "Matcha powder (1 tsp)", "Greek yogurt (1/2 cup)", "Almond milk (1/4 cup)", "Granola (2 tbsp)", "Fresh berries (1/4 cup)", "Chia seeds (1 tsp)"],
    spices: ["Matcha powder"],
    steps: [
      { step: 1, text: "Blend frozen banana, matcha powder, Greek yogurt, and almond milk until smooth.", time: "2 min" },
      { step: 2, text: "Pour into a bowl. Smooth the top with a spatula.", time: "1 min" },
      { step: 3, text: "Top with granola, fresh berries, and chia seeds. Arrange beautifully.", time: "2 min" },
    ],
    substitutes: [
      { ingredient: "Greek yogurt", alternatives: ["Coconut yogurt", "Silken tofu"] },
      { ingredient: "Matcha", alternatives: ["Spirulina powder", "Green tea powder"] },
    ],
    benefits: ["Antioxidant-rich from matcha", "Probiotic from yogurt", "Natural energy boost", "Supports metabolism"],
    dietaryTags: ["Vegetarian", "Gluten-free"],
    appliances: ["blender"], isLiked: false, cuisine: "Japanese", difficulty: "Easy", servings: 1,
  },
  {
    id: "bf-5",
    name: "Shakshuka with Feta",
    category: "breakfast",
    image: "https://images.unsplash.com/photo-1590412200988-a436970781fa?w=800&h=400&fit=crop",
    calories: 350, protein: 16, carbs: 22, fat: 22,
    cookTime: "20 min", prepTime: "10 min",
    ingredients: ["Olive oil (2 tbsp)", "Onion (1, diced)", "Bell pepper (1, diced)", "Garlic (2 cloves)", "Canned tomatoes (400g)", "Eggs (4)", "Feta cheese (50g)", "Fresh parsley (handful)"],
    spices: ["Cumin", "Paprika", "Cayenne", "Harissa"],
    steps: [
      { step: 1, text: "Heat olive oil in a skillet. Saute onion and bell pepper until soft.", time: "5 min" },
      { step: 2, text: "Add garlic, cumin, paprika, and cayenne. Cook for 1 minute until fragrant.", time: "2 min" },
      { step: 3, text: "Add canned tomatoes. Simmer for 10 minutes until sauce thickens.", time: "10 min" },
      { step: 4, text: "Make wells in sauce. Crack eggs into wells. Cover and cook 5-7 minutes.", time: "7 min" },
      { step: 5, text: "Top with crumbled feta and fresh parsley. Serve with crusty bread.", time: "1 min" },
    ],
    substitutes: [
      { ingredient: "Feta", alternatives: ["Goat cheese", "Vegan feta", "Cottage cheese"] },
      { ingredient: "Eggs", alternatives: ["Tofu scramble", "Chickpea flour eggs"] },
    ],
    benefits: ["Lycopene-rich from tomatoes", "Protein-packed eggs", "Anti-inflammatory spices", "Mediterranean diet staple"],
    dietaryTags: ["Vegetarian", "Gluten-free"],
    appliances: ["none"], isLiked: false, cuisine: "Mediterranean", difficulty: "Medium", servings: 2,
  },
  {
    id: "bf-6",
    name: "Korean Kimchi Fried Rice",
    category: "breakfast",
    image: "https://images.unsplash.com/photo-1583224964978-2257b96070d3?w=800&h=400&fit=crop",
    calories: 450, protein: 14, carbs: 58, fat: 18,
    cookTime: "15 min", prepTime: "5 min",
    ingredients: ["Cooked rice (2 cups)", "Kimchi (1 cup, chopped)", "Eggs (2)", "Sesame oil (1 tbsp)", "Soy sauce (1 tbsp)", "Green onions (2, sliced)", "Sesame seeds (1 tsp)"],
    spices: ["Gochugaru", "Gochujang", "Garlic"],
    steps: [
      { step: 1, text: "Heat sesame oil in a wok. Add kimchi and stir-fry for 2 minutes.", time: "3 min" },
      { step: 2, text: "Add cooked rice, soy sauce, and gochujang. Stir-fry on high heat for 5 minutes.", time: "5 min" },
      { step: 3, text: "Push rice to side. Fry eggs in the empty space. Cook to preference.", time: "4 min" },
      { step: 4, text: "Top with green onions and sesame seeds. Mix everything together.", time: "3 min" },
    ],
    substitutes: [
      { ingredient: "Kimchi", alternatives: ["Sauerkraut", "Pickled vegetables"] },
      { ingredient: "Gochujang", alternatives: ["Sriracha", "Chili garlic sauce"] },
    ],
    benefits: ["Probiotic-rich from kimchi", "Fermented foods aid digestion", "Complex carbs for sustained energy", "Anti-inflammatory"],
    dietaryTags: ["Vegetarian"],
    appliances: ["none"], isLiked: false, cuisine: "Korean", difficulty: "Easy", servings: 2,
  },
  {
    id: "bf-7",
    name: "French Toast with Berries",
    category: "breakfast",
    image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=800&h=400&fit=crop",
    calories: 380, protein: 14, carbs: 48, fat: 16,
    cookTime: "10 min", prepTime: "5 min",
    ingredients: ["Brioche bread (4 slices)", "Eggs (2)", "Milk (1/2 cup)", "Vanilla extract (1 tsp)", "Cinnamon (1/2 tsp)", "Butter (2 tbsp)", "Mixed berries (1/2 cup)", "Maple syrup (2 tbsp)"],
    spices: ["Cinnamon", "Vanilla"],
    steps: [
      { step: 1, text: "Whisk eggs, milk, vanilla, and cinnamon in a shallow dish.", time: "2 min" },
      { step: 2, text: "Dip bread slices in egg mixture, coating both sides.", time: "2 min" },
      { step: 3, text: "Melt butter in a pan. Cook bread 2-3 minutes per side until golden.", time: "6 min" },
      { step: 4, text: "Top with fresh berries and drizzle with maple syrup.", time: "1 min" },
    ],
    substitutes: [
      { ingredient: "Brioche", alternatives: ["Sourdough", "Whole wheat bread", "Gluten-free bread"] },
      { ingredient: "Milk", alternatives: ["Oat milk", "Almond milk", "Coconut milk"] },
    ],
    benefits: ["Comfort food with whole grains", "Antioxidants from berries", "Protein from eggs", "Calcium from milk"],
    dietaryTags: ["Vegetarian"],
    appliances: ["none"], isLiked: false, cuisine: "French", difficulty: "Easy", servings: 2,
  },
];

const LUNCH_MEALS: Meal[] = [
  {
    id: "ln-1",
    name: "Chicken Biryani",
    category: "lunch",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&h=400&fit=crop",
    calories: 520, protein: 28, carbs: 58, fat: 20,
    cookTime: "30 min", prepTime: "20 min",
    ingredients: ["Basmati rice (1.5 cups)", "Chicken thighs (500g)", "Onion (2, sliced)", "Yogurt (1/2 cup)", "Ginger-garlic paste (2 tbsp)", "Saffron (pinch)", "Fried onions (1/4 cup)"],
    spices: ["Biryani masala", "Cardamom", "Cloves", "Cinnamon", "Bay leaf", "Turmeric", "Red chili powder"],
    steps: [
      { step: 1, text: "Marinate chicken with yogurt, ginger-garlic paste, and biryani masala for 30 minutes.", time: "30 min" },
      { step: 2, text: "Saute sliced onions until golden. Add whole spices and marinated chicken.", time: "10 min" },
      { step: 3, text: "Cook chicken until partially done. Add water and bring to boil.", time: "5 min" },
      { step: 4, text: "Add soaked basmati rice. Cook on low with lid sealed for 15 minutes.", time: "15 min" },
      { step: 5, text: "Top with saffron milk and fried onions. Let rest 10 minutes before serving.", time: "10 min" },
    ],
    substitutes: [
      { ingredient: "Chicken", alternatives: ["Paneer", "Tofu", "Mushrooms"] },
      { ingredient: "Basmati rice", alternatives: ["Jasmine rice", "Brown rice"] },
    ],
    benefits: ["Complete protein from chicken", "Complex carbs for energy", "Anti-inflammatory spices", "Probiotic from yogurt"],
    dietaryTags: ["Non-vegetarian", "Gluten-free"],
    appliances: ["none"], isLiked: false, cuisine: "Indian", difficulty: "Hard", servings: 3,
  },
  {
    id: "ln-2",
    name: "Mediterranean Buddha Bowl",
    category: "lunch",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=400&fit=crop",
    calories: 480, protein: 18, carbs: 52, fat: 22,
    cookTime: "15 min", prepTime: "10 min",
    ingredients: ["Quinoa (1 cup, cooked)", "Chickpeas (1 cup)", "Cucumber (1, diced)", "Cherry tomatoes (1 cup)", "Kalamata olives (1/4 cup)", "Feta cheese (50g)", "Hummus (3 tbsp)", "Lemon tahini dressing (2 tbsp)"],
    spices: ["Za'atar", "Sumac", "Oregano"],
    steps: [
      { step: 1, text: "Cook quinoa according to package instructions. Let cool slightly.", time: "15 min" },
      { step: 2, text: "Arrange quinoa as base in a bowl. Add chickpeas, cucumber, and tomatoes in sections.", time: "3 min" },
      { step: 3, text: "Add olives and crumbled feta. Drizzle with lemon tahini dressing.", time: "2 min" },
      { step: 4, text: "Top with a dollop of hummus and sprinkle za'atar. Serve fresh.", time: "1 min" },
    ],
    substitutes: [
      { ingredient: "Quinoa", alternatives: ["Brown rice", "Couscous", "Bulgur"] },
      { ingredient: "Feta", alternatives: ["Vegan feta", "Goat cheese"] },
    ],
    benefits: ["Plant-based protein from chickpeas", "Healthy fats from olives", "Fiber-rich vegetables", "Mediterranean diet benefits"],
    dietaryTags: ["Vegetarian", "Gluten-free"],
    appliances: ["none"], isLiked: false, cuisine: "Mediterranean", difficulty: "Easy", servings: 1,
  },
  {
    id: "ln-3",
    name: "Thai Green Curry",
    category: "lunch",
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e9cd8?w=800&h=400&fit=crop",
    calories: 450, protein: 22, carbs: 28, fat: 28,
    cookTime: "25 min", prepTime: "10 min",
    ingredients: ["Green curry paste (2 tbsp)", "Coconut milk (1 can)", "Chicken breast (300g)", "Thai eggplant (2)", "Bamboo shoots (1/2 cup)", "Thai basil (handful)", "Fish sauce (1 tbsp)", "Palm sugar (1 tbsp)"],
    spices: ["Green curry paste", "Galangal", "Lemongrass", "Kaffir lime leaves"],
    steps: [
      { step: 1, text: "Heat 2 tbsp thick coconut cream in a wok. Fry curry paste until fragrant.", time: "3 min" },
      { step: 2, text: "Add chicken pieces. Stir-fry until partially cooked.", time: "5 min" },
      { step: 3, text: "Add remaining coconut milk, eggplant, and bamboo shoots. Simmer 15 minutes.", time: "15 min" },
      { step: 4, text: "Season with fish sauce and palm sugar. Add Thai basil. Serve with jasmine rice.", time: "2 min" },
    ],
    substitutes: [
      { ingredient: "Chicken", alternatives: ["Tofu", "Shrimp", "Vegetables"] },
      { ingredient: "Fish sauce", alternatives: ["Soy sauce", "Coconut aminos"] },
    ],
    benefits: ["Anti-inflammatory from turmeric", "Healthy fats from coconut", "Immune-boosting herbs", "Metabolism support"],
    dietaryTags: ["Non-vegetarian", "Gluten-free", "Dairy-free"],
    appliances: ["none"], isLiked: false, cuisine: "Thai", difficulty: "Medium", servings: 2,
  },
  {
    id: "ln-4",
    name: "Beef and Broccoli Stir-fry",
    category: "lunch",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&h=400&fit=crop",
    calories: 420, protein: 32, carbs: 28, fat: 20,
    cookTime: "15 min", prepTime: "15 min",
    ingredients: ["Beef sirloin (300g, sliced)", "Broccoli florets (2 cups)", "Garlic (3 cloves)", "Ginger (1 inch)", "Soy sauce (3 tbsp)", "Oyster sauce (1 tbsp)", "Sesame oil (1 tsp)", "Cornstarch (1 tsp)"],
    spices: ["Ginger", "Garlic", "White pepper"],
    steps: [
      { step: 1, text: "Marinate beef with soy sauce, cornstarch, and sesame oil for 15 minutes.", time: "15 min" },
      { step: 2, text: "Blanch broccoli in boiling water for 2 minutes. Drain and set aside.", time: "3 min" },
      { step: 3, text: "Heat oil in wok. Stir-fry beef on high heat for 2-3 minutes until browned.", time: "3 min" },
      { step: 4, text: "Add garlic, ginger, and broccoli. Toss with oyster sauce. Cook 2 more minutes.", time: "3 min" },
      { step: 5, text: "Serve immediately over steamed rice.", time: "1 min" },
    ],
    substitutes: [
      { ingredient: "Beef", alternatives: ["Chicken", "Tofu", "Mushrooms"] },
      { ingredient: "Oyster sauce", alternatives: ["Hoisin sauce", "Soy sauce + sugar"] },
    ],
    benefits: ["High-quality protein from beef", "Vitamin C from broccoli", "Iron-rich", "Low carb option"],
    dietaryTags: ["Non-vegetarian", "Dairy-free"],
    appliances: ["none"], isLiked: false, cuisine: "Chinese", difficulty: "Easy", servings: 2,
  },
  {
    id: "ln-5",
    name: "Mexican Burrito Bowl",
    category: "lunch",
    image: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=800&h=400&fit=crop",
    calories: 550, protein: 24, carbs: 62, fat: 22,
    cookTime: "20 min", prepTime: "10 min",
    ingredients: ["Brown rice (1 cup, cooked)", "Black beans (1 cup)", "Grilled chicken (200g)", "Corn (1/2 cup)", "Avocado (1)", "Pico de gallo (1/2 cup)", "Sour cream (2 tbsp)", "Shredded cheese (1/4 cup)"],
    spices: ["Cumin", "Chili powder", "Smoked paprika", "Oregano"],
    steps: [
      { step: 1, text: "Season chicken with cumin, chili powder, and paprika. Grill until cooked through.", time: "10 min" },
      { step: 2, text: "Warm black beans with garlic and cumin. Season with salt.", time: "5 min" },
      { step: 3, text: "Assemble bowl: rice base, beans, sliced chicken, corn, and pico de gallo.", time: "3 min" },
      { step: 4, text: "Top with avocado slices, sour cream, and shredded cheese. Add hot sauce if desired.", time: "2 min" },
    ],
    substitutes: [
      { ingredient: "Chicken", alternatives: ["Sofritas (tofu)", "Beef", "Beans only"] },
      { ingredient: "Sour cream", alternatives: ["Greek yogurt", "Vegan sour cream"] },
    ],
    benefits: ["Complete protein combination", "Fiber from beans and rice", "Healthy fats from avocado", "Balanced macronutrients"],
    dietaryTags: ["Gluten-free"],
    appliances: ["none"], isLiked: false, cuisine: "Mexican", difficulty: "Easy", servings: 1,
  },
  {
    id: "ln-6",
    name: "Japanese Teriyaki Salmon",
    category: "lunch",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&h=400&fit=crop",
    calories: 480, protein: 35, carbs: 32, fat: 22,
    cookTime: "20 min", prepTime: "15 min",
    ingredients: ["Salmon fillet (2, 200g each)", "Soy sauce (3 tbsp)", "Mirin (2 tbsp)", "Sake (1 tbsp)", "Brown sugar (1 tbsp)", "Ginger (1 tsp, grated)", "Garlic (1 clove)", "Sesame seeds (1 tsp)"],
    spices: ["Ginger", "Garlic", "Sesame"],
    steps: [
      { step: 1, text: "Mix soy sauce, mirin, sake, brown sugar, ginger, and garlic for teriyaki sauce.", time: "2 min" },
      { step: 2, text: "Marinate salmon in half the sauce for 15 minutes.", time: "15 min" },
      { step: 3, text: "Heat pan with oil. Cook salmon skin-side down for 4 minutes.", time: "4 min" },
      { step: 4, text: "Flip and cook 3 more minutes. Pour remaining sauce and glaze for 2 minutes.", time: "5 min" },
      { step: 5, text: "Serve with steamed rice and sprinkle sesame seeds. Garnish with green onions.", time: "1 min" },
    ],
    substitutes: [
      { ingredient: "Salmon", alternatives: ["Tofu", "Chicken", "Cod"] },
      { ingredient: "Mirin", alternatives: ["Rice vinegar + sugar", "Dry sherry"] },
    ],
    benefits: ["Omega-3 fatty acids from salmon", "High-quality protein", "Anti-inflammatory", "Heart-healthy"],
    dietaryTags: ["Non-vegetarian", "Gluten-free", "Dairy-free"],
    appliances: ["none"], isLiked: false, cuisine: "Japanese", difficulty: "Medium", servings: 2,
  },
  {
    id: "ln-7",
    name: "Italian Caprese Salad with Grilled Chicken",
    category: "lunch",
    image: "https://images.unsplash.com/photo-1529312266912-b33cf6227e24?w=800&h=400&fit=crop",
    calories: 420, protein: 35, carbs: 12, fat: 28,
    cookTime: "15 min", prepTime: "10 min",
    ingredients: ["Chicken breast (2, 200g)", "Fresh mozzarella (150g)", "Ripe tomatoes (3)", "Fresh basil (handful)", "Balsamic glaze (2 tbsp)", "Olive oil (3 tbsp)", "Pine nuts (2 tbsp)", "Mixed greens (2 cups)"],
    spices: ["Basil", "Oregano", "Black pepper"],
    steps: [
      { step: 1, text: "Season chicken with salt, pepper, and oregano. Grill 6-7 minutes per side.", time: "15 min" },
      { step: 2, text: "Slice tomatoes and mozzarella into thick rounds. Arrange on plate alternating.", time: "3 min" },
      { step: 3, text: "Tuck fresh basil leaves between tomato and mozzarella slices.", time: "1 min" },
      { step: 4, text: "Drizzle with olive oil and balsamic glaze. Top with grilled chicken and pine nuts.", time: "2 min" },
    ],
    substitutes: [
      { ingredient: "Mozzarella", alternatives: ["Burrata", "Vegan mozzarella", "Feta"] },
      { ingredient: "Chicken", alternatives: ["Tofu", "Prosciutto", "White beans"] },
    ],
    benefits: ["High protein, low carb", "Calcium from mozzarella", "Lycopene from tomatoes", "Antioxidants from basil"],
    dietaryTags: ["Gluten-free", "Low-carb"],
    appliances: ["none"], isLiked: false, cuisine: "Italian", difficulty: "Easy", servings: 2,
  },
];

const DINNER_MEALS: Meal[] = [
  {
    id: "dn-1",
    name: "Grilled Salmon with Asparagus",
    category: "dinner",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&h=400&fit=crop",
    calories: 420, protein: 35, carbs: 8, fat: 26,
    cookTime: "20 min", prepTime: "10 min",
    ingredients: ["Salmon fillet (2, 200g each)", "Asparagus (1 bunch)", "Lemon (1)", "Olive oil (2 tbsp)", "Garlic (2 cloves)", "Dill (fresh, handful)", "Butter (1 tbsp)", "Salt and pepper"],
    spices: ["Dill", "Garlic", "Lemon zest"],
    steps: [
      { step: 1, text: "Preheat oven to 400°F. Season salmon with salt, pepper, and lemon zest.", time: "3 min" },
      { step: 2, text: "Toss asparagus with olive oil, garlic, salt, and pepper on a baking sheet.", time: "2 min" },
      { step: 3, text: "Place salmon on the same sheet. Bake for 12-15 minutes until salmon flakes easily.", time: "15 min" },
      { step: 4, text: "Top with fresh dill, lemon juice, and a pat of butter. Serve immediately.", time: "1 min" },
    ],
    substitutes: [
      { ingredient: "Salmon", alternatives: ["Trout", "Arctic char", "Tofu"] },
      { ingredient: "Asparagus", alternatives: ["Green beans", "Broccoli", "Zucchini"] },
    ],
    benefits: ["Omega-3 for brain health", "High protein, low carb", "Vitamin K from asparagus", "Anti-inflammatory"],
    dietaryTags: ["Non-vegetarian", "Gluten-free", "Keto-friendly", "Low-carb"],
    appliances: ["oven"], isLiked: false, cuisine: "International", difficulty: "Easy", servings: 2,
  },
  {
    id: "dn-2",
    name: "Butter Chicken (Murgh Makhani)",
    category: "dinner",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800&h=400&fit=crop",
    calories: 580, protein: 32, carbs: 18, fat: 42,
    cookTime: "35 min", prepTime: "20 min",
    ingredients: ["Chicken thighs (500g)", "Tomato puree (1.5 cups)", "Heavy cream (1/2 cup)", "Butter (4 tbsp)", "Ginger-garlic paste (2 tbsp)", "Kasuri methi (1 tbsp)", "Honey (1 tbsp)", "Garam masala (1 tsp)"],
    spices: ["Garam masala", "Turmeric", "Red chili powder", "Cumin", "Coriander", "Fenugreek"],
    steps: [
      { step: 1, text: "Marinate chicken in yogurt, turmeric, and red chili powder for 30 minutes.", time: "30 min" },
      { step: 2, text: "Grill or pan-sear chicken until charred. Set aside.", time: "10 min" },
      { step: 3, text: "In same pan, melt butter. Add ginger-garlic paste and tomato puree. Simmer 15 minutes.", time: "15 min" },
      { step: 4, text: "Add cream, honey, and garam masala. Simmer 5 more minutes.", time: "5 min" },
      { step: 5, text: "Add grilled chicken. Crush kasuri methi between palms and sprinkle. Serve with naan.", time: "5 min" },
    ],
    substitutes: [
      { ingredient: "Chicken", alternatives: ["Paneer", "Tofu", "Mushrooms"] },
      { ingredient: "Heavy cream", alternatives: ["Coconut cream", "Cashew cream", "Greek yogurt"] },
    ],
    benefits: ["Protein-rich", "Lycopene from tomatoes", "Healthy fats from butter", "Comforting and satisfying"],
    dietaryTags: ["Non-vegetarian", "Gluten-free"],
    appliances: ["none"], isLiked: false, cuisine: "Indian", difficulty: "Medium", servings: 3,
  },
  {
    id: "dn-3",
    name: "Mushroom Risotto",
    category: "dinner",
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&h=400&fit=crop",
    calories: 480, protein: 12, carbs: 68, fat: 18,
    cookTime: "35 min", prepTime: "10 min",
    ingredients: ["Arborio rice (1.5 cups)", "Mixed mushrooms (400g)", "Vegetable stock (4 cups)", "White wine (1/2 cup)", "Parmesan (1/2 cup)", "Shallots (2)", "Butter (3 tbsp)", "Thyme (fresh, handful)"],
    spices: ["Thyme", "Bay leaf", "Nutmeg"],
    steps: [
      { step: 1, text: "Saute sliced mushrooms in butter until golden. Set aside.", time: "8 min" },
      { step: 2, text: "In same pot, saute shallots. Add rice and toast for 2 minutes.", time: "3 min" },
      { step: 3, text: "Add wine and stir until absorbed. Add warm stock one ladle at a time, stirring constantly.", time: "20 min" },
      { step: 4, text: "When rice is al dente, stir in mushrooms, parmesan, and remaining butter.", time: "3 min" },
      { step: 5, text: "Season with salt, pepper, and nutmeg. Garnish with fresh thyme.", time: "1 min" },
    ],
    substitutes: [
      { ingredient: "Arborio rice", alternatives: ["Carnaroli rice", "Pearl barley"] },
      { ingredient: "Parmesan", alternatives: ["Nutritional yeast", "Vegan parmesan"] },
    ],
    benefits: ["Umami-rich mushrooms", "Creamy comfort food", "B-vitamins from mushrooms", "Satisfying and filling"],
    dietaryTags: ["Vegetarian", "Gluten-free"],
    appliances: ["none"], isLiked: false, cuisine: "Italian", difficulty: "Hard", servings: 3,
  },
  {
    id: "dn-4",
    name: "Korean BBQ Beef (Bulgogi)",
    category: "dinner",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=400&fit=crop",
    calories: 450, protein: 30, carbs: 28, fat: 24,
    cookTime: "15 min", prepTime: "30 min",
    ingredients: ["Beef sirloin (400g, thinly sliced)", "Soy sauce (3 tbsp)", "Sesame oil (1 tbsp)", "Brown sugar (2 tbsp)", "Garlic (4 cloves)", "Asian pear (1/2, grated)", "Green onions (3)", "Sesame seeds (1 tbsp)"],
    spices: ["Gochugaru", "Ginger", "Black pepper"],
    steps: [
      { step: 1, text: "Mix soy sauce, sesame oil, brown sugar, garlic, grated pear, and gochugaru.", time: "3 min" },
      { step: 2, text: "Marinate beef slices in sauce for at least 30 minutes (or overnight).", time: "30 min" },
      { step: 3, text: "Heat grill or pan on high. Cook beef in batches for 2-3 minutes per side.", time: "8 min" },
      { step: 4, text: "Garnish with green onions and sesame seeds. Serve with rice and kimchi.", time: "2 min" },
    ],
    substitutes: [
      { ingredient: "Beef", alternatives: ["Chicken", "Pork", "Tofu"] },
      { ingredient: "Asian pear", alternatives: ["Kiwi", "Apple", "Pineapple juice"] },
    ],
    benefits: ["High-quality protein", "Iron-rich", "Probiotic from kimchi pairing", "Balanced meal"],
    dietaryTags: ["Non-vegetarian", "Dairy-free"],
    appliances: ["none"], isLiked: false, cuisine: "Korean", difficulty: "Easy", servings: 2,
  },
  {
    id: "dn-5",
    name: "Mediterranean Stuffed Bell Peppers",
    category: "dinner",
    image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800&h=400&fit=crop",
    calories: 380, protein: 18, carbs: 42, fat: 16,
    cookTime: "30 min", prepTime: "15 min",
    ingredients: ["Bell peppers (4, halved)", "Quinoa (1 cup, cooked)", "Ground turkey (300g)", "Tomato sauce (1 cup)", "Feta cheese (100g)", "Oregano (1 tsp)", "Garlic (2 cloves)", "Olive oil (2 tbsp)"],
    spices: ["Oregano", "Basil", "Cinnamon"],
    steps: [
      { step: 1, text: "Cook ground turkey with garlic and oregano until browned. Mix with cooked quinoa.", time: "10 min" },
      { step: 2, text: "Halve bell peppers and remove seeds. Brush with olive oil.", time: "3 min" },
      { step: 3, text: "Stuff peppers with turkey-quinoa mixture. Top with tomato sauce.", time: "5 min" },
      { step: 4, text: "Bake at 375°F for 25 minutes. Top with crumbled feta in last 5 minutes.", time: "25 min" },
    ],
    substitutes: [
      { ingredient: "Turkey", alternatives: ["Lentils", "Black beans", "Ground beef"] },
      { ingredient: "Quinoa", alternatives: ["Brown rice", "Couscous", "Cauliflower rice"] },
    ],
    benefits: ["High fiber from vegetables", "Lean protein", "Vitamin C from peppers", "Mediterranean diet benefits"],
    dietaryTags: ["Gluten-free"],
    appliances: ["oven"], isLiked: false, cuisine: "Mediterranean", difficulty: "Medium", servings: 4,
  },
  {
    id: "dn-6",
    name: "Thai Pad Thai",
    category: "dinner",
    image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800&h=400&fit=crop",
    calories: 520, protein: 24, carbs: 68, fat: 18,
    cookTime: "20 min", prepTime: "15 min",
    ingredients: ["Rice noodles (200g)", "Shrimp (200g)", "Eggs (2)", "Bean sprouts (1 cup)", "Tamarind paste (2 tbsp)", "Fish sauce (2 tbsp)", "Palm sugar (2 tbsp)", "Peanuts (1/4 cup, crushed)", "Lime (1)"],
    spices: ["Chili flakes", "Garlic", "Shallots"],
    steps: [
      { step: 1, text: "Soak rice noodles in warm water for 15 minutes until flexible. Drain.", time: "15 min" },
      { step: 2, text: "Mix tamarind, fish sauce, and palm sugar for pad thai sauce.", time: "2 min" },
      { step: 3, text: "Heat oil in wok. Cook shrimp until pink. Push to side. Scramble eggs.", time: "4 min" },
      { step: 4, text: "Add noodles and sauce. Toss everything together for 3 minutes.", time: "3 min" },
      { step: 5, text: "Add bean sprouts. Toss 1 more minute. Top with peanuts and lime wedges.", time: "2 min" },
    ],
    substitutes: [
      { ingredient: "Shrimp", alternatives: ["Chicken", "Tofu", "Vegetables only"] },
      { ingredient: "Fish sauce", alternatives: ["Soy sauce", "Coconut aminos"] },
    ],
    benefits: ["Balanced macros", "Gluten-free noodles", "Protein from shrimp and eggs", "Tamarind aids digestion"],
    dietaryTags: ["Gluten-free", "Dairy-free"],
    appliances: ["none"], isLiked: false, cuisine: "Thai", difficulty: "Medium", servings: 2,
  },
  {
    id: "dn-7",
    name: "Moroccan Lamb Tagine",
    category: "dinner",
    image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=800&h=400&fit=crop",
    calories: 550, protein: 32, carbs: 38, fat: 28,
    cookTime: "90 min", prepTime: "20 min",
    ingredients: ["Lamb shoulder (500g, cubed)", "Onions (2, sliced)", "Dried apricots (1/2 cup)", "Chickpeas (1 can)", "Chicken stock (2 cups)", "Cinnamon stick (1)", "Cumin (1 tsp)", "Honey (2 tbsp)", "Couscous (1.5 cups)"],
    spices: ["Cinnamon", "Cumin", "Coriander", "Ginger", "Turmeric", "Saffron"],
    steps: [
      { step: 1, text: "Brown lamb cubes in oil. Remove and set aside.", time: "8 min" },
      { step: 2, text: "Saute onions until soft. Add spices and cook 1 minute.", time: "5 min" },
      { step: 3, text: "Return lamb to pot. Add stock, apricots, and chickpeas. Simmer covered for 1 hour.", time: "60 min" },
      { step: 4, text: "Add honey. Cook 10 more minutes until sauce thickens.", time: "10 min" },
      { step: 5, text: "Prepare couscous with hot water. Fluff with fork. Serve tagine over couscous.", time: "7 min" },
    ],
    substitutes: [
      { ingredient: "Lamb", alternatives: ["Beef", "Chicken", "Chickpeas only"] },
      { ingredient: "Apricots", alternatives: ["Dates", "Raisins", "Prunes"] },
    ],
    benefits: ["Iron-rich lamb", "Fiber from chickpeas", "Anti-inflammatory spices", "Slow-cooked for tenderness"],
    dietaryTags: ["Non-vegetarian", "Dairy-free"],
    appliances: ["none"], isLiked: false, cuisine: "Moroccan", difficulty: "Hard", servings: 3,
  },
];

const SNACK_MEALS: Meal[] = [
  {
    id: "sn-1",
    name: "Hummus with Veggie Sticks",
    category: "snack",
    image: "https://images.unsplash.com/photo-1637949385162-e416fb15b2ce?w=800&h=400&fit=crop",
    calories: 180, protein: 8, carbs: 18, fat: 10,
    cookTime: "5 min", prepTime: "5 min",
    ingredients: ["Chickpeas (1 can)", "Tahini (2 tbsp)", "Lemon juice (2 tbsp)", "Garlic (1 clove)", "Olive oil (2 tbsp)", "Cumin (1/2 tsp)", "Carrot sticks (1 cup)", "Cucumber sticks (1 cup)"],
    spices: ["Cumin", "Paprika", "Sumac"],
    steps: [
      { step: 1, text: "Blend chickpeas, tahini, lemon juice, garlic, and cumin until smooth.", time: "3 min" },
      { step: 2, text: "Transfer to bowl. Create a well in center and drizzle with olive oil.", time: "1 min" },
      { step: 3, text: "Sprinkle paprika and sumac. Serve with fresh veggie sticks.", time: "1 min" },
    ],
    substitutes: [
      { ingredient: "Tahini", alternatives: ["Peanut butter", "Sunflower seed butter", "Yogurt"] },
    ],
    benefits: ["Plant-based protein", "Fiber from vegetables", "Healthy fats from tahini", "Satisfying snack"],
    dietaryTags: ["Vegan", "Gluten-free"],
    appliances: ["blender"], isLiked: false, cuisine: "Mediterranean", difficulty: "Easy", servings: 4,
  },
  {
    id: "sn-2",
    name: "Energy Balls",
    category: "snack",
    image: "https://images.unsplash.com/photo-1604329760661-e71d94b1f3f8?w=800&h=400&fit=crop",
    calories: 150, protein: 5, carbs: 18, fat: 8,
    cookTime: "10 min", prepTime: "5 min",
    ingredients: ["Dates (1 cup, pitted)", "Oats (1 cup)", "Almond butter (1/2 cup)", "Dark chocolate chips (1/4 cup)", "Chia seeds (2 tbsp)", "Vanilla extract (1 tsp)", "Cocoa powder (2 tbsp)"],
    spices: ["Cinnamon", "Vanilla"],
    steps: [
      { step: 1, text: "Blend dates in food processor until paste forms.", time: "2 min" },
      { step: 2, text: "Add oats, almond butter, cocoa powder, and vanilla. Pulse until combined.", time: "3 min" },
      { step: 3, text: "Stir in chocolate chips and chia seeds. Roll into 1-inch balls.", time: "5 min" },
      { step: 4, text: "Refrigerate for 30 minutes. Store in airtight container.", time: "30 min" },
    ],
    substitutes: [
      { ingredient: "Almond butter", alternatives: ["Peanut butter", "Sunflower seed butter"] },
      { ingredient: "Dark chocolate", alternatives: ["Cacao nibs", "Raisins", "Dried cranberries"] },
    ],
    benefits: ["Natural energy from dates", "Fiber from oats", "Healthy fats", "No added sugar"],
    dietaryTags: ["Vegan", "Gluten-free", "No added sugar"],
    appliances: ["food-processor"], isLiked: false, cuisine: "International", difficulty: "Easy", servings: 12,
  },
  {
    id: "sn-3",
    name: "Greek Yogurt Parfait",
    category: "snack",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&h=400&fit=crop",
    calories: 220, protein: 18, carbs: 28, fat: 6,
    cookTime: "5 min", prepTime: "0 min",
    ingredients: ["Greek yogurt (1 cup)", "Granola (1/4 cup)", "Mixed berries (1/2 cup)", "Honey (1 tbsp)", "Chia seeds (1 tsp)", "Almonds (1 tbsp, sliced)"],
    spices: ["Cinnamon"],
    steps: [
      { step: 1, text: "Layer Greek yogurt at bottom of glass or jar.", time: "1 min" },
      { step: 2, text: "Add a layer of granola, then berries.", time: "1 min" },
      { step: 3, text: "Repeat layers. Top with honey, chia seeds, and almonds.", time: "2 min" },
      { step: 4, text: "Sprinkle cinnamon. Serve immediately or refrigerate.", time: "1 min" },
    ],
    substitutes: [
      { ingredient: "Greek yogurt", alternatives: ["Coconut yogurt", "Skyr", "Regular yogurt"] },
      { ingredient: "Granola", alternatives: ["Muesli", "Toasted oats", "Nuts"] },
    ],
    benefits: ["Probiotic for gut health", "High protein", "Antioxidants from berries", "Calcium-rich"],
    dietaryTags: ["Vegetarian", "Gluten-free"],
    appliances: ["none"], isLiked: false, cuisine: "Greek", difficulty: "Easy", servings: 1,
  },
  {
    id: "sn-4",
    name: "Edamame with Sea Salt",
    category: "snack",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=800&h=400&fit=crop",
    calories: 190, protein: 17, carbs: 14, fat: 8,
    cookTime: "5 min", prepTime: "0 min",
    ingredients: ["Frozen edamame (2 cups, in pods)", "Sea salt (1 tsp)", "Water (4 cups)"],
    spices: ["Sea salt", "Chili flakes"],
    steps: [
      { step: 1, text: "Bring water to boil. Add edamame and cook for 3-5 minutes.", time: "5 min" },
      { step: 2, text: "Drain and transfer to bowl. Sprinkle generously with sea salt.", time: "1 min" },
      { step: 3, text: "Toss to coat. Serve warm or at room temperature.", time: "1 min" },
    ],
    substitutes: [
      { ingredient: "Edamame", alternatives: ["Green peas", "Fava beans", "Lima beans"] },
    ],
    benefits: ["Complete plant protein", "Fiber-rich", "Isoflavones for hormonal health", "Low calorie snack"],
    dietaryTags: ["Vegan", "Gluten-free", "Dairy-free"],
    appliances: ["none"], isLiked: false, cuisine: "Japanese", difficulty: "Easy", servings: 2,
  },
  {
    id: "sn-5",
    name: "Apple Slices with Almond Butter",
    category: "snack",
    image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=800&h=400&fit=crop",
    calories: 200, protein: 6, carbs: 22, fat: 12,
    cookTime: "3 min", prepTime: "0 min",
    ingredients: ["Apple (1, sliced)", "Almond butter (2 tbsp)", "Cinnamon (1/2 tsp)", "Chia seeds (1 tsp)"],
    spices: ["Cinnamon"],
    steps: [
      { step: 1, text: "Slice apple into thin wedges. Remove core and seeds.", time: "2 min" },
      { step: 2, text: "Arrange on plate. Drizzle almond butter over slices.", time: "1 min" },
      { step: 3, text: "Sprinkle cinnamon and chia seeds. Serve immediately.", time: "1 min" },
    ],
    substitutes: [
      { ingredient: "Almond butter", alternatives: ["Peanut butter", "Cashew butter", "Sunflower seed butter"] },
      { ingredient: "Apple", alternatives: ["Pear", "Banana", "Strawberries"] },
    ],
    benefits: ["Fiber from apple", "Healthy fats from almond butter", "Natural sweetness", "Sustained energy"],
    dietaryTags: ["Vegan", "Gluten-free", "Dairy-free"],
    appliances: ["none"], isLiked: false, cuisine: "International", difficulty: "Easy", servings: 1,
  },
  {
    id: "sn-6",
    name: "Roasted Chickpeas",
    category: "snack",
    image: "https://images.unsplash.com/photo-1546548970-71785318caaa?w=800&h=400&fit=crop",
    calories: 160, protein: 7, carbs: 20, fat: 6,
    cookTime: "30 min", prepTime: "5 min",
    ingredients: ["Chickpeas (1 can, drained)", "Olive oil (1 tbsp)", "Paprika (1 tsp)", "Cumin (1/2 tsp)", "Garlic powder (1/2 tsp)", "Salt (1/2 tsp)"],
    spices: ["Paprika", "Cumin", "Garlic powder"],
    steps: [
      { step: 1, text: "Preheat oven to 400°F. Pat chickpeas completely dry with paper towels.", time: "3 min" },
      { step: 2, text: "Toss with olive oil and spices. Spread on baking sheet in single layer.", time: "2 min" },
      { step: 3, text: "Roast for 25-30 minutes, shaking pan halfway through, until crispy.", time: "30 min" },
      { step: 4, text: "Let cool completely. Store in airtight container for up to 3 days.", time: "5 min" },
    ],
    substitutes: [
      { ingredient: "Chickpeas", alternatives: ["Black beans", "Edamame", "Fava beans"] },
    ],
    benefits: ["Crunchy protein snack", "Fiber-rich", "Customizable flavors", "Budget-friendly"],
    dietaryTags: ["Vegan", "Gluten-free", "Dairy-free"],
    appliances: ["oven"], isLiked: false, cuisine: "International", difficulty: "Easy", servings: 4,
  },
  {
    id: "sn-7",
    name: "Rice Cake with Avocado",
    category: "snack",
    image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=800&h=400&fit=crop",
    calories: 170, protein: 4, carbs: 20, fat: 10,
    cookTime: "3 min", prepTime: "0 min",
    ingredients: ["Rice cakes (2)", "Avocado (1/2)", "Lemon juice (1 tsp)", "Red chili flakes (1/4 tsp)", "Sea salt (pinch)", "Cherry tomatoes (4, halved)"],
    spices: ["Chili flakes", "Sea salt"],
    steps: [
      { step: 1, text: "Mash avocado with lemon juice, salt, and chili flakes.", time: "2 min" },
      { step: 2, text: "Spread evenly on rice cakes. Top with cherry tomato halves.", time: "1 min" },
      { step: 3, text: "Add extra chili flakes if desired. Serve immediately.", time: "1 min" },
    ],
    substitutes: [
      { ingredient: "Rice cakes", alternatives: ["Whole grain crackers", "Cucumber slices", "Lettuce wraps"] },
      { ingredient: "Avocado", alternatives: ["Hummus", "Mashed white beans", "Greek yogurt"] },
    ],
    benefits: ["Healthy fats from avocado", "Light and crunchy", "Quick energy", "Satisfying"],
    dietaryTags: ["Vegan", "Gluten-free", "Dairy-free"],
    appliances: ["none"], isLiked: false, cuisine: "International", difficulty: "Easy", servings: 1,
  },
];

const DESSERT_MEALS: Meal[] = [
  {
    id: "ds-1",
    name: "Dark Chocolate Mousse",
    category: "dessert",
    image: "https://images.unsplash.com/photo-1511381939415-e44015466834?w=800&h=400&fit=crop",
    calories: 280, protein: 6, carbs: 22, fat: 20,
    cookTime: "15 min", prepTime: "10 min",
    ingredients: ["Dark chocolate 70% (200g)", "Heavy cream (1 cup)", "Eggs (3, separated)", "Sugar (2 tbsp)", "Vanilla extract (1 tsp)", "Sea salt (pinch)"],
    spices: ["Vanilla", "Sea salt"],
    steps: [
      { step: 1, text: "Melt chocolate in a heatproof bowl over simmering water. Let cool slightly.", time: "5 min" },
      { step: 2, text: "Whip cream to soft peaks. Set aside.", time: "3 min" },
      { step: 3, text: "Beat egg yolks with sugar until pale. Fold into melted chocolate.", time: "3 min" },
      { step: 4, text: "Whip egg whites to stiff peaks. Gently fold into chocolate mixture.", time: "3 min" },
      { step: 5, text: "Fold in whipped cream. Divide into glasses. Chill for 2 hours.", time: "2 hr" },
    ],
    substitutes: [
      { ingredient: "Heavy cream", alternatives: ["Coconut cream", "Aquafaba", "Silken tofu"] },
      { ingredient: "Eggs", alternatives: ["Aquafaba", "Commercial egg replacer"] },
    ],
    benefits: ["Antioxidants from dark chocolate", "Rich and satisfying", "Lower sugar than milk chocolate", "Mood-boosting"],
    dietaryTags: ["Vegetarian", "Gluten-free"],
    appliances: ["none"], isLiked: false, cuisine: "French", difficulty: "Medium", servings: 4,
  },
  {
    id: "ds-2",
    name: "Mango Sticky Rice",
    category: "dessert",
    image: "https://images.unsplash.com/photo-1596797038530-2c1072295b31?w=800&h=400&fit=crop",
    calories: 320, protein: 5, carbs: 58, fat: 10,
    cookTime: "25 min", prepTime: "10 min",
    ingredients: ["Glutinous rice (1 cup)", "Coconut milk (1 can)", "Sugar (1/4 cup)", "Salt (1/4 tsp)", "Ripe mango (2)", "Sesame seeds (1 tsp)", "Mung beans (2 tbsp, toasted)"],
    spices: ["Salt", "Sugar"],
    steps: [
      { step: 1, text: "Soak glutinous rice in water for 4 hours or overnight. Drain.", time: "4 hr" },
      { step: 2, text: "Steam rice for 25 minutes until tender and sticky.", time: "25 min" },
      { step: 3, text: "Heat coconut milk with sugar and salt. Pour half over hot rice. Let absorb.", time: "5 min" },
      { step: 4, text: "Slice mangoes. Arrange rice and mango on plate. Drizzle remaining coconut milk.", time: "3 min" },
      { step: 5, text: "Sprinkle with sesame seeds and toasted mung beans. Serve warm.", time: "1 min" },
    ],
    substitutes: [
      { ingredient: "Glutinous rice", alternatives: ["Sushi rice", "Jasmine rice"] },
      { ingredient: "Mango", alternatives: ["Papaya", "Peach", "Pineapple"] },
    ],
    benefits: ["Natural sweetness from mango", "Coconut for healthy fats", "Gluten-free", "Tropical flavors"],
    dietaryTags: ["Vegan", "Gluten-free", "Dairy-free"],
    appliances: ["none"], isLiked: false, cuisine: "Thai", difficulty: "Medium", servings: 2,
  },
  {
    id: "ds-3",
    name: "Chia Berry Parfait",
    category: "dessert",
    image: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=800&h=400&fit=crop",
    calories: 240, protein: 8, carbs: 28, fat: 12,
    cookTime: "5 min", prepTime: "5 min",
    ingredients: ["Chia seeds (3 tbsp)", "Coconut milk (1 cup)", "Maple syrup (1 tbsp)", "Vanilla extract (1 tsp)", "Mixed berries (1/2 cup)", "Shredded coconut (1 tbsp)"],
    spices: ["Vanilla", "Cinnamon"],
    steps: [
      { step: 1, text: "Mix chia seeds, coconut milk, maple syrup, and vanilla in a jar.", time: "2 min" },
      { step: 2, text: "Stir well and refrigerate for at least 4 hours or overnight.", time: "4 hr" },
      { step: 3, text: "Top with fresh berries and shredded coconut before serving.", time: "1 min" },
    ],
    substitutes: [
      { ingredient: "Coconut milk", alternatives: ["Almond milk", "Oat milk", "Soy milk"] },
      { ingredient: "Maple syrup", alternatives: ["Honey", "Agave", "Stevia"] },
    ],
    benefits: ["Omega-3 fatty acids", "High fiber", "Antioxidants from berries", "No refined sugar"],
    dietaryTags: ["Vegan", "Gluten-free", "Dairy-free"],
    appliances: ["none"], isLiked: false, cuisine: "International", difficulty: "Easy", servings: 2,
  },
  {
    id: "ds-4",
    name: "Baked Apple with Cinnamon",
    category: "dessert",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=400&fit=crop",
    calories: 180, protein: 2, carbs: 38, fat: 6,
    cookTime: "30 min", prepTime: "5 min",
    ingredients: ["Apples (2, cored)", "Butter (1 tbsp, melted)", "Brown sugar (1 tbsp)", "Cinnamon (1 tsp)", "Walnuts (2 tbsp, chopped)", "Raisins (1 tbsp)", "Greek yogurt (2 tbsp)"],
    spices: ["Cinnamon", "Nutmeg"],
    steps: [
      { step: 1, text: "Preheat oven to 375°F. Core apples and place in baking dish.", time: "3 min" },
      { step: 2, text: "Mix butter, brown sugar, cinnamon, walnuts, and raisins. Stuff into apple centers.", time: "2 min" },
      { step: 3, text: "Bake for 25-30 minutes until apples are tender.", time: "30 min" },
      { step: 4, text: "Serve warm with a dollop of Greek yogurt on top.", time: "1 min" },
    ],
    substitutes: [
      { ingredient: "Butter", alternatives: ["Coconut oil", "Vegan butter"] },
      { ingredient: "Greek yogurt", alternatives: ["Coconut cream", "Cashew cream"] },
    ],
    benefits: ["Fiber from apples", "Natural sweetness", "Warm and comforting", "Low calorie dessert"],
    dietaryTags: ["Vegetarian", "Gluten-free"],
    appliances: ["oven"], isLiked: false, cuisine: "International", difficulty: "Easy", servings: 2,
  },
  {
    id: "ds-5",
    name: "Japanese Mochi Ice Cream",
    category: "dessert",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&h=400&fit=crop",
    calories: 150, protein: 2, carbs: 28, fat: 4,
    cookTime: "30 min", prepTime: "20 min",
    ingredients: ["Glutinous rice flour (1 cup)", "Sugar (1/4 cup)", "Water (3/4 cup)", "Ice cream (1 pint, any flavor)", "Cornstarch (for dusting)"],
    spices: ["Sugar"],
    steps: [
      { step: 1, text: "Mix rice flour, sugar, and water. Microwave in 1-minute intervals, stirring each time, for 3 minutes total.", time: "3 min" },
      { step: 2, text: "Knead mochi dough on cornstarch-dusted surface until smooth.", time: "5 min" },
      { step: 3, text: "Roll dough thin. Cut into circles. Wrap around small scoops of ice cream.", time: "10 min" },
      { step: 4, text: "Freeze immediately for at least 2 hours before serving.", time: "2 hr" },
    ],
    substitutes: [
      { ingredient: "Ice cream", alternatives: ["Frozen yogurt", "Sorbet", "Coconut ice cream"] },
    ],
    benefits: ["Fun and unique texture", "Customizable flavors", "Lower calorie than regular ice cream", "Cultural experience"],
    dietaryTags: ["Vegetarian", "Gluten-free"],
    appliances: ["microwave"], isLiked: false, cuisine: "Japanese", difficulty: "Hard", servings: 8,
  },
  {
    id: "ds-6",
    name: "Tiramisu Cups",
    category: "dessert",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&h=400&fit=crop",
    calories: 320, protein: 6, carbs: 32, fat: 20,
    cookTime: "20 min", prepTime: "15 min",
    ingredients: ["Mascarpone (250g)", "Heavy cream (1/2 cup)", "Sugar (1/4 cup)", "Espresso (1/2 cup)", "Ladyfingers (12)", "Cocoa powder (2 tbsp)", "Dark chocolate (shaved)"],
    spices: ["Cocoa powder"],
    steps: [
      { step: 1, text: "Whip mascarpone, heavy cream, and sugar until smooth and fluffy.", time: "5 min" },
      { step: 2, text: "Dip ladyfingers briefly in cooled espresso. Layer in glasses.", time: "5 min" },
      { step: 3, text: "Spread mascarpone mixture over ladyfingers. Repeat layers.", time: "5 min" },
      { step: 4, text: "Dust with cocoa powder and top with chocolate shavings. Chill 4 hours.", time: "4 hr" },
    ],
    substitutes: [
      { ingredient: "Mascarpone", alternatives: ["Cream cheese + heavy cream", "Vegan cream cheese"] },
      { ingredient: "Ladyfingers", alternatives: ["Sponge cake", "Gluten-free cookies"] },
    ],
    benefits: ["Coffee for energy boost", "Rich and indulgent", "Make-ahead dessert", "Italian classic"],
    dietaryTags: ["Vegetarian"],
    appliances: ["none"], isLiked: false, cuisine: "Italian", difficulty: "Medium", servings: 4,
  },
  {
    id: "ds-7",
    name: "Fresh Fruit Sorbet",
    category: "dessert",
    image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=800&h=400&fit=crop",
    calories: 120, protein: 1, carbs: 28, fat: 0,
    cookTime: "5 min", prepTime: "5 min",
    ingredients: ["Frozen mixed fruit (3 cups)", "Honey (2 tbsp)", "Lemon juice (1 tbsp)", "Water (1/4 cup)"],
    spices: ["Lemon"],
    steps: [
      { step: 1, text: "Blend frozen fruit, honey, lemon juice, and water until smooth.", time: "3 min" },
      { step: 2, text: "Scrape down sides and blend again for 1 minute until creamy.", time: "1 min" },
      { step: 3, text: "Serve immediately for soft-serve texture, or freeze 1 hour for firmer sorbet.", time: "1 min" },
    ],
    substitutes: [
      { ingredient: "Honey", alternatives: ["Maple syrup", "Agave", "Stevia"] },
      { ingredient: "Mixed fruit", alternatives: ["Single fruit", "Frozen mango", "Frozen berries"] },
    ],
    benefits: ["No dairy", "No added fat", "Natural fruit sugars", "Vitamin C rich"],
    dietaryTags: ["Vegan", "Gluten-free", "Dairy-free", "Fat-free"],
    appliances: ["blender"], isLiked: false, cuisine: "International", difficulty: "Easy", servings: 4,
  },
];

const BEVERAGE_MEALS: Meal[] = [
  {
    id: "bv-1",
    name: "Green Smoothie",
    category: "beverage",
    image: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=800&h=400&fit=crop",
    calories: 180, protein: 8, carbs: 28, fat: 4,
    cookTime: "5 min", prepTime: "5 min",
    ingredients: ["Spinach (2 cups)", "Banana (1, frozen)", "Green apple (1)", "Ginger (1 inch)", "Lemon juice (1 tbsp)", "Coconut water (1 cup)", "Chia seeds (1 tsp)"],
    spices: ["Ginger", "Lemon"],
    steps: [
      { step: 1, text: "Add all ingredients to blender. Start with liquids, then soft fruits, then greens.", time: "2 min" },
      { step: 2, text: "Blend on high for 1 minute until completely smooth.", time: "1 min" },
      { step: 3, text: "Pour into glass. Add chia seeds on top. Serve immediately.", time: "1 min" },
    ],
    substitutes: [
      { ingredient: "Spinach", alternatives: ["Kale", "Mixed greens", "Lettuce"] },
      { ingredient: "Coconut water", alternatives: ["Almond milk", "Oat milk", "Water"] },
    ],
    benefits: ["Iron from spinach", "Potassium from banana", "Hydrating", "Immune-boosting ginger"],
    dietaryTags: ["Vegan", "Gluten-free", "Dairy-free"],
    appliances: ["blender"], isLiked: false, cuisine: "International", difficulty: "Easy", servings: 1,
  },
  {
    id: "bv-2",
    name: "Watermelon Mint Cooler",
    category: "beverage",
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&h=400&fit=crop",
    calories: 60, protein: 1, carbs: 15, fat: 0,
    cookTime: "5 min", prepTime: "5 min",
    ingredients: ["Watermelon (3 cups, cubed)", "Fresh mint (10 leaves)", "Lime juice (2 tbsp)", "Honey (1 tbsp)", "Ice cubes (1 cup)", "Sparkling water (1 cup)"],
    spices: ["Mint", "Lime"],
    steps: [
      { step: 1, text: "Blend watermelon, mint, lime juice, and honey until smooth.", time: "2 min" },
      { step: 2, text: "Strain through fine mesh if desired. Pour over ice.", time: "1 min" },
      { step: 3, text: "Top with sparkling water. Garnish with mint sprig and lime wedge.", time: "1 min" },
    ],
    substitutes: [
      { ingredient: "Watermelon", alternatives: ["Cantaloupe", "Honeydew", "Strawberries"] },
      { ingredient: "Honey", alternatives: ["Agave", "Maple syrup", "Stevia"] },
    ],
    benefits: ["Hydrating", "Low calorie", "Vitamin C from lime", "Refreshing"],
    dietaryTags: ["Vegan", "Gluten-free", "Dairy-free"],
    appliances: ["blender"], isLiked: false, cuisine: "International", difficulty: "Easy", servings: 2,
  },
  {
    id: "bv-3",
    name: "Golden Turmeric Latte",
    category: "beverage",
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=800&h=400&fit=crop",
    calories: 120, protein: 2, carbs: 12, fat: 6,
    cookTime: "10 min", prepTime: "5 min",
    ingredients: ["Milk (1 cup)", "Turmeric powder (1 tsp)", "Cinnamon (1/2 tsp)", "Ginger powder (1/4 tsp)", "Black pepper (pinch)", "Honey (1 tbsp)", "Coconut oil (1 tsp)"],
    spices: ["Turmeric", "Cinnamon", "Ginger", "Black pepper"],
    steps: [
      { step: 1, text: "Heat milk in small saucepan over medium heat until steaming.", time: "5 min" },
      { step: 2, text: "Whisk in turmeric, cinnamon, ginger, black pepper, and coconut oil.", time: "2 min" },
      { step: 3, text: "Simmer for 3 minutes. Remove from heat. Stir in honey.", time: "3 min" },
      { step: 4, text: "Pour into mug. Dust with extra cinnamon. Serve warm.", time: "1 min" },
    ],
    substitutes: [
      { ingredient: "Milk", alternatives: ["Oat milk", "Almond milk", "Coconut milk"] },
      { ingredient: "Honey", alternatives: ["Maple syrup", "Agave", "Stevia"] },
    ],
    benefits: ["Anti-inflammatory turmeric", "Warming spices", "Good for sleep", "Immune support"],
    dietaryTags: ["Vegetarian", "Gluten-free"],
    appliances: ["none"], isLiked: false, cuisine: "International", difficulty: "Easy", servings: 1,
  },
  {
    id: "bv-4",
    name: "Berry Antioxidant Blast",
    category: "beverage",
    image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=800&h=400&fit=crop",
    calories: 200, protein: 6, carbs: 38, fat: 2,
    cookTime: "5 min", prepTime: "5 min",
    ingredients: ["Mixed berries (1.5 cups, frozen)", "Greek yogurt (1/2 cup)", "Orange juice (1/2 cup)", "Honey (1 tbsp)", "Flax seeds (1 tsp)", "Ice (1/2 cup)"],
    spices: ["Orange"],
    steps: [
      { step: 1, text: "Add all ingredients to blender. Blend on high for 1 minute.", time: "2 min" },
      { step: 2, text: "Add more orange juice if too thick. Blend 30 seconds more.", time: "1 min" },
      { step: 3, text: "Pour into glass. Top with extra berries if desired.", time: "1 min" },
    ],
    substitutes: [
      { ingredient: "Greek yogurt", alternatives: ["Coconut yogurt", "Silken tofu", "Protein powder"] },
      { ingredient: "Orange juice", alternatives: ["Apple juice", "Coconut water", "Almond milk"] },
    ],
    benefits: ["Antioxidant-rich berries", "Probiotic from yogurt", "Vitamin C from orange", "Omega-3 from flax"],
    dietaryTags: ["Vegetarian", "Gluten-free"],
    appliances: ["blender"], isLiked: false, cuisine: "International", difficulty: "Easy", servings: 1,
  },
  {
    id: "bv-5",
    name: "Iced Matcha Latte",
    category: "beverage",
    image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=800&h=400&fit=crop",
    calories: 140, protein: 4, carbs: 18, fat: 6,
    cookTime: "5 min", prepTime: "5 min",
    ingredients: ["Matcha powder (1 tsp)", "Hot water (1/4 cup)", "Milk (3/4 cup)", "Ice (1 cup)", "Honey (1 tbsp)", "Vanilla extract (1/4 tsp)"],
    spices: ["Matcha", "Vanilla"],
    steps: [
      { step: 1, text: "Sift matcha powder into bowl. Add hot water. Whisk in zigzag motion until frothy.", time: "2 min" },
      { step: 2, text: "Fill glass with ice. Pour milk over ice.", time: "1 min" },
      { step: 3, text: "Pour matcha over milk. Add honey and vanilla. Stir gently.", time: "1 min" },
      { step: 4, text: "Serve with straw. Enjoy the layered effect before stirring.", time: "1 min" },
    ],
    substitutes: [
      { ingredient: "Milk", alternatives: ["Oat milk", "Almond milk", "Coconut milk"] },
      { ingredient: "Matcha", alternatives: ["Green tea powder", "Spirulina powder"] },
    ],
    benefits: ["Antioxidants from matcha", "L-theanine for calm focus", "Natural energy", "Metabolism support"],
    dietaryTags: ["Vegetarian", "Gluten-free"],
    appliances: ["none"], isLiked: false, cuisine: "Japanese", difficulty: "Easy", servings: 1,
  },
  {
    id: "bv-6",
    name: "Mango Lassi",
    category: "beverage",
    image: "https://images.unsplash.com/photo-1626202158825-663860e7d2f4?w=800&h=400&fit=crop",
    calories: 220, protein: 8, carbs: 32, fat: 6,
    cookTime: "5 min", prepTime: "5 min",
    ingredients: ["Ripe mango (1, chopped)", "Greek yogurt (1/2 cup)", "Milk (1/2 cup)", "Cardamom (1/4 tsp)", "Honey (1 tbsp)", "Ice (1/2 cup)"],
    spices: ["Cardamom"],
    steps: [
      { step: 1, text: "Blend mango, yogurt, milk, cardamom, honey, and ice until smooth.", time: "2 min" },
      { step: 2, text: "Add more milk if too thick. Blend 30 seconds more.", time: "1 min" },
      { step: 3, text: "Pour into glass. Sprinkle with extra cardamom. Serve chilled.", time: "1 min" },
    ],
    substitutes: [
      { ingredient: "Greek yogurt", alternatives: ["Coconut yogurt", "Regular yogurt"] },
      { ingredient: "Mango", alternatives: ["Peach", "Papaya", "Banana"] },
    ],
    benefits: ["Probiotic from yogurt", "Vitamin A from mango", "Digestive aid from cardamom", "Refreshing"],
    dietaryTags: ["Vegetarian", "Gluten-free"],
    appliances: ["blender"], isLiked: false, cuisine: "Indian", difficulty: "Easy", servings: 1,
  },
  {
    id: "bv-7",
    name: "Detox Cucumber Lemon Water",
    category: "beverage",
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&h=400&fit=crop",
    calories: 15, protein: 0, carbs: 3, fat: 0,
    cookTime: "5 min", prepTime: "5 min",
    ingredients: ["Cucumber (1, sliced)", "Lemon (1, sliced)", "Mint leaves (10)", "Ginger (3 slices)", "Water (4 cups)", "Ice (1 cup)"],
    spices: ["Mint", "Ginger", "Lemon"],
    steps: [
      { step: 1, text: "Add cucumber, lemon, mint, and ginger to a large pitcher.", time: "2 min" },
      { step: 2, text: "Pour water over ingredients. Add ice.", time: "1 min" },
      { step: 3, text: "Let infuse for at least 30 minutes in refrigerator. Serve chilled.", time: "30 min" },
    ],
    substitutes: [
      { ingredient: "Cucumber", alternatives: ["Lime", "Orange", "Strawberries"] },
      { ingredient: "Mint", alternatives: ["Basil", "Rosemary", "Lemongrass"] },
    ],
    benefits: ["Hydrating", "Detoxifying", "Zero calories", "Refreshing"],
    dietaryTags: ["Vegan", "Gluten-free", "Dairy-free", "Sugar-free"],
    appliances: ["none"], isLiked: false, cuisine: "International", difficulty: "Easy", servings: 4,
  },
];

export const ALL_MEALS: Meal[] = [
  ...BREAKFAST_MEALS,
  ...LUNCH_MEALS,
  ...DINNER_MEALS,
  ...SNACK_MEALS,
  ...DESSERT_MEALS,
  ...BEVERAGE_MEALS,
];

export function generateDailyPlan(
  dateStr: string,
  includeDessert: boolean,
  includeBeverage: boolean,
  mealsPerDay: number
): DayPlan {
  const dayIndex = new Date(dateStr).getDate() % 7;

  const breakfast = BREAKFAST_MEALS[dayIndex % BREAKFAST_MEALS.length];
  const lunch = LUNCH_MEALS[dayIndex % LUNCH_MEALS.length];
  const dinner = DINNER_MEALS[dayIndex % DINNER_MEALS.length];
  const snack = SNACK_MEALS[dayIndex % SNACK_MEALS.length];

  let meals = [breakfast, lunch, dinner, snack];

  if (includeDessert) {
    const dessert = DESSERT_MEALS[dayIndex % DESSERT_MEALS.length];
    meals.push(dessert);
  }

  if (includeBeverage) {
    const beverage = BEVERAGE_MEALS[dayIndex % BEVERAGE_MEALS.length];
    meals.push(beverage);
  }

  if (mealsPerDay <= 3) {
    meals = meals.slice(0, mealsPerDay);
  }

  const totalProtein = meals.reduce((sum, m) => sum + m.protein, 0);
  const totalCarbs = meals.reduce((sum, m) => sum + m.carbs, 0);
  const totalFat = meals.reduce((sum, m) => sum + m.fat, 0);
  const totalCalories = meals.reduce((sum, m) => sum + m.calories, 0);

  return {
    date: dateStr,
    meals,
    targetCalories: 1840,
    targetProtein: 95,
    targetCarbs: 180,
    targetFat: 65,
    totalProtein,
    totalCarbs,
    totalFat,
  };
}

export function regenerateMeal(dateStr: string, category: string, currentMeals: Meal[]): Meal[] {
  const dayIndex = new Date(dateStr).getDate() % 7;
  const categoryMap: Record<string, Meal[]> = {
    breakfast: BREAKFAST_MEALS,
    lunch: LUNCH_MEALS,
    dinner: DINNER_MEALS,
    snack: SNACK_MEALS,
    dessert: DESSERT_MEALS,
    beverage: BEVERAGE_MEALS,
  };

  const pool = categoryMap[category] || BREAKFAST_MEALS;
  const newIndex = (dayIndex + 1) % pool.length;
  const newMeal = pool[newIndex];

  return currentMeals.map((m) =>
    m.category === category ? { ...newMeal, id: m.id } : m
  );
}

export function matchCraving(query: string, avoided: string[], appliances: string[]): Meal[] {
  const q = query.toLowerCase();
  return ALL_MEALS.filter((meal) => {
    const matchName = meal.name.toLowerCase().includes(q);
    const matchIngredient = meal.ingredients.some((i) => i.toLowerCase().includes(q));
    const matchCuisine = meal.cuisine.toLowerCase().includes(q);
    const matchCategory = meal.category.toLowerCase().includes(q);
    const matchSpice = meal.spices.some((s) => s.toLowerCase().includes(q));

    const avoidMatch = avoided.some((a) =>
      meal.name.toLowerCase().includes(a.toLowerCase()) ||
      meal.ingredients.some((i) => i.toLowerCase().includes(a.toLowerCase()))
    );

    return (matchName || matchIngredient || matchCuisine || matchCategory || matchSpice) && !avoidMatch;
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
  if (hour < 21) return `Good evening, ${name}`;
  return `Good night, ${name}`;
}
