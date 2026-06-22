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
