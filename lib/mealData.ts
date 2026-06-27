export interface Meal {
  id: string;
  name: string;
  category: "BREAKFAST" | "LUNCH" | "DINNER" | "SNACK" | "BEVERAGE";
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  cookTime: string;
  servings: number;
  image: string;
  description: string;
  ingredients: { name: string; amount: string }[];
  steps: string[];
}

export const DATA_MEALS: Meal[] = [
  {
    id: "m1",
    name: "Shakshuka with Feta",
    category: "BREAKFAST",
    calories: 352,
    protein: 22,
    carbs: 36,
    fat: 14,
    cookTime: "25 min",
    servings: 1,
    image: "https://unsplash.com",
    description: "Rich spiced tomato and pepper sauce with perfectly poached eggs and crumbly feta.",
    ingredients: [{ name: "Eggs", amount: "2 large" }, { name: "Crumbled Feta", amount: "50 g" }, { name: "Tomato Puree", amount: "1 cup" }, { name: "Bell Peppers", amount: "0.5" }],
    steps: ["Cook peppers and spices.", "Add tomato puree and simmer.", "Create wells, crack eggs inside, and cover.", "Top with feta and serve."]
  },
  {
    id: "m2",
    name: "Lemon Herb Chicken Bowl",
    category: "LUNCH",
    calories: 480,
    protein: 34,
    carbs: 42,
    fat: 16,
    cookTime: "30 min",
    servings: 2,
    image: "https://unsplash.com",
    description: "Citrusy grilled chicken over fluffy quinoa, avocado and crisp greens.",
    ingredients: [
      { name: "Chicken breast", amount: "200 g" },
      { name: "Lemon juice", amount: "2 tbsp" },
      { name: "Garlic, minced", amount: "2 cloves" },
      { name: "Cooked quinoa", amount: "1 cup" },
      { name: "Avocado", amount: "0.5" },
      { name: "Cherry tomatoes", amount: "0.5 cup" },
      { name: "Mixed greens", amount: "2 cups" },
      { name: "Olive oil", amount: "1 tbsp" }
    ],
    steps: [
      "Marinate chicken in lemon juice, garlic, oregano, salt, pepper for 10 min.",
      "Grill chicken 5-6 min per side until cooked through.",
      "Layer quinoa, greens, tomatoes, avocado in a bowl.",
      "Slice chicken and place on top. Drizzle olive oil and lemon."
    ]
  },
  {
    id: "m3",
    name: "Chola Masala with Flatbread",
    category: "DINNER",
    calories: 410,
    protein: 16,
    carbs: 58,
    fat: 12,
    cookTime: "30 min",
    servings: 2,
    image: "https://unsplash.com", // High quality Paneer/Chola visual
    description: "Spicy and tangy chickpea curry served with warm flatbread.",
    ingredients: [{ name: "Chickpeas", amount: "1.5 cups" }, { name: "Flatbread", amount: "2 pieces" }, { name: "Garam Masala", amount: "1 tsp" }],
    steps: ["Sauté onions and spices.", "Simmer chickpeas in tomato gravy.", "Warm flatbreads and serve together."]
  },
  {
    id: "m4",
    name: "Poha",
    category: "SNACK",
    calories: 280,
    protein: 8,
    carbs: 46,
    fat: 6,
    cookTime: "15 min",
    servings: 1,
    image: "https://unsplash.com", // Authentic Poha with golden yellow tint
    description: "Light and fluffy flattened rice seasoned with turmeric, mustard seeds, and curry leaves.",
    ingredients: [{ name: "Flattened Rice", amount: "1 cup" }, { name: "Turmeric", amount: "0.5 tsp" }, { name: "Peanuts", amount: "2 tbsp" }],
    steps: ["Rinse poha lightly.", "Sauté peanuts, mustard seeds, and turmeric.", "Toss poha gently in the mix."]
  },
  {
    id: "m5",
    name: "Lemon Mint Water",
    category: "BEVERAGE",
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    cookTime: "3 min",
    servings: 1,
    image: "https://unsplash.com",
    description: "Hydrating & refreshing wellness water infused with citrus essences.",
    ingredients: [{ name: "Water", amount: "500 ml" }, { name: "Fresh Mint", amount: "5 leaves" }, { name: "Lemon", amount: "3 slices" }],
    steps: ["Muddle mint gently.", "Add lemon slices and ice.", "Fill with water and steep for 2 mins."]
  }
];

export const TRAVEL_CUISINES = [
  {
    country: "Japan",
    tag: "JP VEGAN",
    bg: "linear-gradient(135deg, #2c3e50 0%, #3498db 100%)",
    items: [
      { name: "Miso Soup", time: "15 min", kcal: "110 kcal", img: "https://unsplash.com" },
      { name: "Avocado Sushi", time: "25 min", kcal: "290 kcal", img: "https://unsplash.com" },
      { name: "Strawberry Mochi", time: "20 min", kcal: "140 kcal", img: "https://unsplash.com" },
      { name: "Vegan Udon Noodles", time: "20 min", kcal: "380 kcal", img: "https://unsplash.com" }
    ]
  },
  {
    country: "India",
    tag: "IN VEGAN",
    bg: "linear-gradient(135deg, #EC4899 0%, #F43F5E 100%)",
    items: [
      { name: "Chola Masala with Flatbread", time: "30 min", kcal: "410 kcal", img: "https://unsplash.com" },
      { name: "Dhokla", time: "25 min", kcal: "220 kcal", img: "https://unsplash.com" },
      { name: "Poha", time: "15 min", kcal: "280 kcal", img: "https://unsplash.com" }
    ]
  }
];

export const APOTHECARY_ITEMS = [
  { id: "ap1", name: "Ginger Turmeric Health Shot", category: "TONIC", desc: "Immunity & inflammation", color: "#FFB020", ingredients: ["Fresh ginger (1 inch)", "Fresh turmeric (1 inch)", "Lemon (1)", "Black pepper (pinch)", "Honey (1 tsp)"], steps: ["Juice ginger, turmeric and lemon.", "Add black pepper to boost absorption.", "Stir in honey and drink as a 30ml shot."] },
  { id: "ap2", name: "Orange Skin Tea with Honey", category: "TEA", desc: "Glow & antioxidants", color: "#FF8C42", ingredients: ["Orange peel", "Water", "Honey"], steps: ["Boil peel in water.", "Strain and stir in honey."] },
  { id: "ap3", name: "DIY Clove Skin Oil", category: "OIL", desc: "Spot treatment & calming", color: "#10B981", ingredients: ["Cloves", "Carrier oil"], steps: ["Infuse cloves in warm oil."] },
  { id: "ap4", name: "Honey Oat Calming Mask", category: "MASK", desc: "Soothing & hydration", color: "#EC4899", ingredients: ["Oats", "Honey", "Yogurt"], steps: ["Mix into paste and apply."] }
];
