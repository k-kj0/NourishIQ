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
];

const DESSERT_MEALS: Meal[] = [
  {
    id: "ds-1",
    name: "Dark Chocolate Mousse",
    category: "dessert",
    image: "https://images.unsplash.com/photo-1511381939415-e44015466834?w=800&h=400&fit=crop",
    calories: 280,
    protein: 6,
    carbs: 22,
    fat: 20,
    cookTime: "15 min",
    prepTime: "10 min",
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
    appliances: ["none"],
    isLiked: false,
    cuisine: "French",
    difficulty: "Medium",
    servings: 4,
  },
  {
    id: "ds-2",
    name: "Mango Sticky Rice",
    category: "dessert",
    image: "https://images.unsplash.com/photo-1596797038530-2c1072295b31?w=800&h=400&fit=crop",
    calories: 320,
    protein: 5,
    carbs: 58,
    fat: 10,
    cookTime: "25 min",
    prepTime: "10 min",
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
    appliances: ["none"],
    isLiked: false,
    cuisine: "Thai",
    difficulty: "Medium",
    servings: 2,
  },
  {
    id: "ds-3",
    name: "Chia Berry Parfait",
    category: "dessert",
    image: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=800&h=400&fit=crop",
    calories: 240,
    protein: 8,
    carbs: 28,
    fat: 12,
    cookTime: "5 min",
    prepTime: "5 min",
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
    appliances: ["none"],
    isLiked: false,
    cuisine: "International",
    difficulty: "Easy",
    servings: 2,
  },
  {
    id: "ds-4",
    name: "Baked Apple with Cinnamon",
    category: "dessert",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=400&fit=crop",
    calories: 180,
    protein: 2,
    carbs: 38,
    fat: 6,
    cookTime: "30 min",
    prepTime: "5 min",
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
    appliances: ["oven"],
    isLiked: false,
    cuisine: "International",
    difficulty: "Easy",
    servings: 2,
  },
  {
    id: "ds-5",
    name: "Japanese Mochi Ice Cream",
    category: "dessert",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&h=400&fit=crop",
    calories: 150,
    protein: 2,
    carbs: 28,
    fat: 4,
    cookTime: "30 min",
    prepTime: "20 min",
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
    appliances: ["microwave"],
    isLiked: false,
    cuisine: "Japanese",
    difficulty: "Hard",
    servings: 8,
  },
  {
    id: "ds-6",
    name: "Tiramisu Cups",
    category: "dessert",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&h=400&fit=crop",
    calories: 320,
    protein: 6,
    carbs: 32,
    fat: 20,
    cookTime: "20 min",
    prepTime: "15 min",
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
    appliances: ["none"],
    isLiked: false,
    cuisine: "Italian",
    difficulty: "Medium",
    servings: 4,
  },
  {
    id: "ds-7",
    name: "Fresh Fruit Sorbet",
    category: "dessert",
    image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=800&h=400&fit=crop",
    calories: 120,
    protein: 1,
    carbs: 28,
    fat: 0,
    cookTime: "5 min",
    prepTime: "5 min",
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
    appliances: ["blender"],
    isLiked: false,
    cuisine: "International",
    difficulty: "Easy",
    servings: 4,
  },
];

const BEVERAGE_MEALS: Meal[] = [
  {
    id: "bv-1",
    name: "Green Smoothie",
    category: "beverage",
    image: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=800&h=400&fit=crop",
    calories: 180,
    protein: 8,
    carbs: 28,
    fat: 4,
    cookTime: "5 min",
    prepTime: "5 min",
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
    appliances: ["blender"],
    isLiked: false,
    cuisine: "International",
    difficulty: "Easy",
    servings: 1,
  },
  {
    id: "bv-2",
    name: "Watermelon Mint Cooler",
    category: "beverage",
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&h=400&fit=crop",
    calories: 60,
    protein: 1,
    carbs: 15,
    fat: 0,
    cookTime: "5 min",
    prepTime: "5 min",
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
    appliances: ["blender"],
    isLiked: false,
    cuisine: "International",
    difficulty: "Easy",
    servings: 2,
  },
  {
    id: "bv-3",
    name: "Golden Turmeric Latte",
    category: "beverage",
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=800&h=400&fit=crop",
    calories: 120,
    protein: 2,
    carbs: 12,
    fat: 6,
    cookTime: "10 min",
    prepTime: "5 min",
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
    appliances: ["none"],
    isLiked: false,
    cuisine: "International",
    difficulty: "Easy",
    servings: 1,
  },
  {
    id: "bv-4",
    name: "Berry Antioxidant Blast",
    category: "beverage",
    image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=800&h=400&fit=crop",
    calories: 200,
    protein: 6,
    carbs: 38,
    fat: 2,
    cookTime: "5 min",
    prepTime: "5 min",
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
    appliances: ["blender"],
    isLiked: false,
    cuisine: "International",
    difficulty: "Easy",
    servings: 1,
  },
  {
    id: "bv-5",
    name: "Iced Matcha Latte",
    category: "beverage",
    image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=800&h=400&fit=crop",
    calories: 140,
    protein: 4,
    carbs: 18,
    fat: 6,
    cookTime: "5 min",
    prepTime: "5 min",
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
    appliances: ["none"],
    isLiked: false,
    cuisine: "Japanese",
    difficulty: "Easy",
    servings: 1,
  },
  {
    id: "bv-6",
    name: "Mango Lassi",
    category: "beverage",
    image: "https://images.unsplash.com/photo-1626202158825-663860e7d2f4?w=800&h=400&fit=crop",
    calories: 220,
    protein: 8,
    carbs: 32,
    fat: 6,
    cookTime: "5 min",
    prepTime: "5 min",
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
    appliances: ["blender"],
    isLiked: false,
    cuisine: "Indian",
    difficulty: "Easy",
    servings: 1,
  },
  {
    id: "bv-7",
    name: "Detox Cucumber Lemon Water",
    category: "beverage",
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&h=400&fit=crop",
    calories: 15,
    protein: 0,
    carbs: 3,
    fat: 0,
    cookTime: "5 min",
    prepTime: "5 min",
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
    appliances: ["none"],
    isLiked: false,
    cuisine: "International",
    difficulty: "Easy",
    servings: 4,
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

  // If mealsPerDay is less than 4, adjust
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
