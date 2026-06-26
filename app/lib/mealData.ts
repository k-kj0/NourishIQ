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
