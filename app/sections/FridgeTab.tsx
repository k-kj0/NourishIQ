"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  Type,
  ChefHat,
  Flame,
  Clock,
  Users,
  Heart,
  X,
  RefreshCw,
  Volume2,
  VolumeX,
  Sparkles,
  ChevronRight,
  UtensilsCrossed,
  Thermometer,
  Leaf,
  Droplets,
  Zap,
  Search,
  Filter,
  ArrowLeft,
} from "lucide-react";
import { KawaiiCharacter } from "../components/KawaiiCharacter";

interface GeneratedRecipe {
  id: string;
  name: string;
  image: string;
  description: string;
  time: string;
  servings: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  vitamins: { name: string; amount: string; percent: number }[];
  ingredients: { item: string; amount: string; checked: boolean }[];
  steps: { step: number; text: string; time?: string }[];
  cookingMethod: string;
  spiceLevel: string;
  difficulty: string;
  tags: string[];
  healthBenefits: string[];
  substitutes: { original: string; alternatives: string[] }[];
}

const COOKING_METHODS = [
  { id: "any", label: "Any", icon: "🍳" },
  { id: "stovetop", label: "Stovetop", icon: "🔥" },
  { id: "microwave", label: "Microwave", icon: "📡" },
  { id: "oven", label: "Oven", icon: "🔥" },
  { id: "air-fryer", label: "Air Fryer", icon: "💨" },
  { id: "no-cook", label: "No Cook", icon: "🥗" },
  { id: "blender", label: "Blender", icon: "🥤" },
];

const INGREDIENT_COUNTS = [
  { id: "any", label: "Any count" },
  { id: "3", label: "3 ingredients" },
  { id: "5", label: "5 ingredients" },
  { id: "7", label: "7 ingredients" },
  { id: "10", label: "10 ingredients" },
];

const SPICE_LEVELS = [
  { id: "mild", label: "Mild", color: "#84cc16", icon: "🌿" },
  { id: "medium", label: "Medium", color: "#f97316", icon: "🌶️" },
  { id: "hot", label: "Hot", color: "#ef4444", icon: "🔥" },
  { id: "very-hot", label: "Very Hot", color: "#dc2626", icon: "🌶️🔥" },
];

const RECIPE_TYPES = [
  { id: "any", label: "Any" },
  { id: "sweet", label: "Sweet" },
  { id: "savory", label: "Savory" },
  { id: "no-bake", label: "No-Bake" },
  { id: "no-cook", label: "No-Cook" },
  { id: "quick", label: "Quick (< 20 min)" },
  { id: "high-protein", label: "High Protein" },
  { id: "low-carb", label: "Low Carb" },
];

const SAMPLE_RECIPES: GeneratedRecipe[] = [
  {
    id: "fridge-1",
    name: "Creamy Tomato Basil Pasta",
    image: "https://images.unsplash.com/photo-1626844131082-256783844137?w=800&h=600&fit=crop",
    description: "A rich and comforting pasta dish with fresh tomatoes, basil, and cream. Perfect for a quick weeknight dinner using pantry staples.",
    time: "25 min",
    servings: 2,
    calories: 420,
    protein: 14,
    carbs: 58,
    fat: 16,
    fiber: 4,
    sugar: 8,
    vitamins: [
      { name: "Vitamin A", amount: "450 mcg", percent: 50 },
      { name: "Vitamin C", amount: "28 mg", percent: 31 },
      { name: "Iron", amount: "3.2 mg", percent: 18 },
      { name: "Calcium", amount: "180 mg", percent: 14 },
      { name: "Potassium", amount: "520 mg", percent: 11 },
    ],
    ingredients: [
      { item: "Pasta", amount: "200g", checked: false },
      { item: "Tomatoes", amount: "3 medium, diced", checked: false },
      { item: "Fresh Basil", amount: "1 cup", checked: false },
      { item: "Heavy Cream", amount: "1/2 cup", checked: false },
      { item: "Garlic", amount: "3 cloves, minced", checked: false },
      { item: "Olive Oil", amount: "2 tbsp", checked: false },
      { item: "Parmesan Cheese", amount: "1/4 cup, grated", checked: false },
      { item: "Salt & Pepper", amount: "to taste", checked: false },
    ],
    steps: [
      { step: 1, text: "Bring a large pot of salted water to boil. Cook pasta according to package directions until al dente. Reserve 1/2 cup pasta water before draining.", time: "10 min" },
      { step: 2, text: "While pasta cooks, heat olive oil in a large skillet over medium heat. Add minced garlic and sauté for 30 seconds until fragrant.", time: "2 min" },
      { step: 3, text: "Add diced tomatoes to the skillet. Cook for 5-7 minutes until they break down and form a sauce. Season with salt and pepper.", time: "7 min" },
      { step: 4, text: "Stir in heavy cream and simmer for 2-3 minutes until slightly thickened. Add torn basil leaves and stir.", time: "3 min" },
      { step: 5, text: "Add cooked pasta to the sauce along with reserved pasta water. Toss to coat. Top with grated Parmesan and fresh basil.", time: "3 min" },
    ],
    cookingMethod: "stovetop",
    spiceLevel: "mild",
    difficulty: "Easy",
    tags: ["quick", "comfort-food", "vegetarian"],
    healthBenefits: [
      "Rich in lycopene from tomatoes — supports heart health",
      "Basil provides anti-inflammatory properties",
      "Good source of complex carbohydrates for energy",
    ],
    substitutes: [
      { original: "Heavy Cream", alternatives: ["Coconut milk", "Greek yogurt", "Cashew cream"] },
      { original: "Parmesan", alternatives: ["Nutritional yeast", "Vegan parmesan", "Pecorino"] },
    ],
  },
  {
    id: "fridge-2",
    name: "5-Minute Avocado Toast",
    image: "https://images.unsplash.com/photo-1588137372308-15f75323ca8d?w=800&h=600&fit=crop",
    description: "The ultimate quick breakfast — creamy avocado on toasted bread with a sprinkle of everything seasoning.",
    time: "5 min",
    servings: 1,
    calories: 320,
    protein: 8,
    carbs: 28,
    fat: 22,
    fiber: 10,
    sugar: 2,
    vitamins: [
      { name: "Vitamin K", amount: "35 mcg", percent: 29 },
      { name: "Folate", amount: "120 mcg", percent: 30 },
      { name: "Vitamin E", amount: "4 mg", percent: 27 },
      { name: "Potassium", amount: "485 mg", percent: 10 },
      { name: "Fiber", amount: "10g", percent: 36 },
    ],
    ingredients: [
      { item: "Bread", amount: "2 slices", checked: false },
      { item: "Avocado", amount: "1 ripe", checked: false },
      { item: "Lemon Juice", amount: "1 tsp", checked: false },
      { item: "Salt", amount: "pinch", checked: false },
      { item: "Red Pepper Flakes", amount: "optional", checked: false },
    ],
    steps: [
      { step: 1, text: "Toast the bread slices until golden and crispy.", time: "2 min" },
      { step: 2, text: "Mash the avocado in a bowl with lemon juice and salt.", time: "1 min" },
      { step: 3, text: "Spread mashed avocado generously on toast. Sprinkle with red pepper flakes if desired.", time: "2 min" },
    ],
    cookingMethod: "no-cook",
    spiceLevel: "mild",
    difficulty: "Easy",
    tags: ["no-cook", "quick", "breakfast", "vegetarian"],
    healthBenefits: [
      "High in healthy monounsaturated fats",
      "Excellent source of fiber for digestion",
      "Packed with potassium — more than bananas",
    ],
    substitutes: [
      { original: "Bread", alternatives: ["Rice cakes", "Sweet potato toast", "Lettuce wraps"] },
      { original: "Avocado", alternatives: ["Hummus", "Peanut butter", "Ricotta"] },
    ],
  },
  {
    id: "fridge-3",
    name: "Spicy Garlic Noodles",
    image: "https://images.unsplash.com/photo-1552611052-33e04de081de?w=800&h=600&fit=crop",
    description: "Fiery garlic noodles with a kick of chili — ready in under 15 minutes with just a few ingredients.",
    time: "12 min",
    servings: 2,
    calories: 380,
    protein: 12,
    carbs: 52,
    fat: 14,
    fiber: 3,
    sugar: 4,
    vitamins: [
      { name: "Vitamin B6", amount: "0.4 mg", percent: 24 },
      { name: "Iron", amount: "2.8 mg", percent: 16 },
      { name: "Selenium", amount: "18 mcg", percent: 33 },
      { name: "Manganese", amount: "1.2 mg", percent: 52 },
    ],
    ingredients: [
      { item: "Noodles", amount: "200g", checked: false },
      { item: "Garlic", amount: "6 cloves, minced", checked: false },
      { item: "Soy Sauce", amount: "3 tbsp", checked: false },
      { item: "Chili Oil", amount: "2 tbsp", checked: false },
      { item: "Green Onions", amount: "2, sliced", checked: false },
      { item: "Sesame Seeds", amount: "1 tbsp", checked: false },
    ],
    steps: [
      { step: 1, text: "Cook noodles according to package. Drain and rinse with cold water.", time: "5 min" },
      { step: 2, text: "Heat chili oil in a pan. Add minced garlic and cook until golden and fragrant.", time: "2 min" },
      { step: 3, text: "Add soy sauce and cooked noodles. Toss vigorously to coat evenly.", time: "2 min" },
      { step: 4, text: "Top with sliced green onions and sesame seeds. Serve immediately.", time: "3 min" },
    ],
    cookingMethod: "stovetop",
    spiceLevel: "hot",
    difficulty: "Easy",
    tags: ["quick", "spicy", "asian"],
    healthBenefits: [
      "Garlic supports immune system function",
      "Chili peppers boost metabolism",
      "Good source of manganese for bone health",
    ],
    substitutes: [
      { original: "Soy Sauce", alternatives: ["Tamari", "Coconut aminos", "Liquid aminos"] },
      { original: "Chili Oil", alternatives: ["Sriracha", "Red pepper flakes + oil", "Gochujang"] },
    ],
  },
];

function speakText(text: string) {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    window.speechSynthesis.speak(utterance);
    return utterance;
  }
  return null;
}

export function FridgeTab() {
  const [activeTab, setActiveTab] = useState<"scan" | "type">("type");
  const [ingredients, setIngredients] = useState("");
  const [generatedRecipes, setGeneratedRecipes] = useState<GeneratedRecipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<GeneratedRecipe | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [isGenerating, setIsGenerating] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [checkedIngredients, setCheckedIngredients] = useState<Set<string>>(new Set());
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  // Filters
  const [cookingMethod, setCookingMethod] = useState("any");
  const [ingredientCount, setIngredientCount] = useState("any");
  const [spiceLevel, setSpiceLevel] = useState("any");
  const [recipeType, setRecipeType] = useState("any");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleGenerate = () => {
    if (!ingredients.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedRecipes(SAMPLE_RECIPES);
      setIsGenerating(false);
    }, 2000);
  };

  const handleRegenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const shuffled = [...SAMPLE_RECIPES].sort(() => Math.random() - 0.5);
      setGeneratedRecipes(shuffled);
      setIsGenerating(false);
    }, 1500);
  };

  const handleSpeakRecipe = (recipe: GeneratedRecipe) => {
    const text = `Recipe for ${recipe.name}. Ingredients: ${recipe.ingredients.map((i) => `${i.amount} ${i.item}`).join(", ")}. Steps: ${recipe.steps.map((s) => `Step ${s.step}: ${s.text}`).join(". ")}`;
    speakText(text);
    setSpeaking(true);
    setTimeout(() => setSpeaking(false), 10000);
  };

  const handleSpeakStep = (step: { step: number; text: string }) => {
    speakText(`Step ${step.step}: ${step.text}`);
  };

  const toggleIngredient = (item: string) => {
    setCheckedIngredients((prev) => {
      const next = new Set(prev);
      if (next.has(item)) next.delete(item);
      else next.add(item);
      return next;
    });
  };

  const toggleStep = (stepNum: number) => {
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(stepNum)) next.delete(stepNum);
      else next.add(stepNum);
      return next;
    });
  };

  if (selectedRecipe) {
    return (
      <RecipeDetail
        recipe={selectedRecipe}
        onBack={() => setSelectedRecipe(null)}
        isFavorite={favorites.has(selectedRecipe.id)}
        onToggleFavorite={() => toggleFavorite(selectedRecipe.id)}
        speaking={speaking}
        onSpeak={() => handleSpeakRecipe(selectedRecipe)}
        checkedIngredients={checkedIngredients}
        onToggleIngredient={toggleIngredient}
        completedSteps={completedSteps}
        onToggleStep={toggleStep}
        onSpeakStep={handleSpeakStep}
      />
    );
  }

  return (
    <div className="flex flex-col h-full bg-cream" style={{ backgroundColor: "#fefcf7" }}>
      {/* Header */}
      <div className="px-6 pt-6 pb-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-4"
        >
          <KawaiiCharacter emotion="chef" size={50} />
          <div>
            <h1 className="text-2xl font-black">What&apos;s in your fridge?</h1>
            <p className="text-sm text-gray-500">Let AI turn it into something delicious</p>
          </div>
        </motion.div>

        {/* Toggle: Scan vs Type */}
        <div className="flex gap-2 mb-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab("scan")}
            className={`flex-1 py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all border-2 ${
              activeTab === "scan"
                ? "text-white border-transparent"
                : "bg-white border-gray-200 text-gray-600"
            }`}
            style={activeTab === "scan" ? { background: "linear-gradient(135deg, #84cc16, #65a30d)" } : {}}
          >
            <Camera className="w-4 h-4" />
            Scan Fridge
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab("type")}
            className={`flex-1 py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all border-2 ${
              activeTab === "type"
                ? "text-white border-transparent"
                : "bg-white border-gray-200 text-gray-600"
            }}
            style={activeTab === "type" ? { background: "linear-gradient(135deg, #84cc16, #65a30d)" } : {}}
          >
            <Type className="w-4 h-4" />
            Type Ingredients
          </motion.button>
        </div>

        {/* Input Area */}
        <AnimatePresence mode="wait">
          {activeTab === "scan" ? (
            <motion.div
              key="scan"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-3xl p-8 border-2 border-dashed border-gray-300 text-center"
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setIngredients("tomato, onion, garlic, pasta, basil, cheese");
                    handleGenerate();
                  }
                }}
              />
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Camera className="w-12 h-12 mx-auto mb-3" style={{ color: "#84cc16" }} />
              </motion.div>
              <p className="font-bold text-gray-700">Take a photo of your fridge</p>
              <p className="text-sm text-gray-500 mt-1">AI will identify ingredients automatically</p>
            </motion.div>
          ) : (
            <motion.div
              key="type"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="relative">
                <textarea
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  placeholder="e.g., tomato, onion, garlic, pasta, cheese, eggs..."
                  className="w-full p-4 rounded-2xl border-2 border-gray-200 focus:border-green-400 outline-none bg-white text-sm min-h-[100px] resize-none"
                  style={{ focusBorderColor: "#84cc16" }}
                />
                <div className="absolute bottom-3 right-3 flex gap-2">
                  {ingredients && (
                    <motion.button
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIngredients("")}
                      className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                    >
                      <X className="w-4 h-4 text-gray-500" />
                    </motion.button>
                  )}
                </div>
              </div>

              {/* Quick suggestions */}
              <div className="flex flex-wrap gap-1 mt-2">
                {["Tomato", "Onion", "Garlic", "Eggs", "Cheese", "Pasta", "Rice", "Chicken", "Spinach"].map((item) => (
                  <motion.button
                    key={item}
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setIngredients((prev) => (prev ? prev + ", " + item.toLowerCase() : item.toLowerCase()))}
                    className="px-3 py-1 rounded-full bg-white border border-gray-200 text-xs font-bold text-gray-600 hover:border-green-400 transition-colors"
                  >
                    + {item}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filters Toggle */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowFilters(!showFilters)}
          className="mt-4 w-full py-3 rounded-2xl bg-white border-2 border-gray-200 font-bold text-sm flex items-center justify-center gap-2 hover:border-gray-300 transition-colors"
        >
          <Filter className="w-4 h-4" />
          {showFilters ? "Hide Filters" : "Customize Preferences"}
          <motion.span
            animate={{ rotate: showFilters ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronRight className="w-4 h-4" />
          </motion.span>
        </motion.button>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 space-y-4 overflow-hidden"
            >
              {/* Cooking Method */}
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Cooking Method</p>
                <div className="flex flex-wrap gap-2">
                  {COOKING_METHODS.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setCookingMethod(m.id)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold border-2 transition-all ${
                        cookingMethod === m.id
                          ? "text-white border-transparent"
                          : "bg-white border-gray-200 text-gray-600"
                      }`}
                      style={cookingMethod === m.id ? { background: "linear-gradient(135deg, #84cc16, #65a30d)" } : {}}
                    >
                      <span className="mr-1">{m.icon}</span>
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ingredient Count */}
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Ingredient Count</p>
                <div className="flex flex-wrap gap-2">
                  {INGREDIENT_COUNTS.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setIngredientCount(c.id)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold border-2 transition-all ${
                        ingredientCount === c.id
                          ? "text-white border-transparent"
                          : "bg-white border-gray-200 text-gray-600"
                      }`}
                      style={ingredientCount === c.id ? { background: "linear-gradient(135deg, #f97316, #ea580c)" } : {}}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Spice Level */}
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Spice Level</p>
                <div className="flex flex-wrap gap-2">
                  {SPICE_LEVELS.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSpiceLevel(s.id)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold border-2 transition-all ${
                        spiceLevel === s.id
                          ? "text-white border-transparent"
                          : "bg-white border-gray-200 text-gray-600"
                      }`}
                      style={spiceLevel === s.id ? { background: s.color } : {}}
                    >
                      <span className="mr-1">{s.icon}</span>
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recipe Type */}
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Recipe Type</p>
                <div className="flex flex-wrap gap-2">
                  {RECIPE_TYPES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setRecipeType(t.id)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold border-2 transition-all ${
                        recipeType === t.id
                          ? "text-white border-transparent"
                          : "bg-white border-gray-200 text-gray-600"
                      }`}
                      style={recipeType === t.id ? { background: "linear-gradient(135deg, #a855f7, #7e22ce)" } : {}}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Generate Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleGenerate}
          disabled={!ingredients.trim() || isGenerating}
          className="mt-4 w-full py-4 rounded-2xl text-white font-bold text-lg shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: "linear-gradient(135deg, #84cc16, #65a30d)",
            boxShadow: "0 8px 30px rgba(132, 204, 22, 0.4)",
          }}
        >
          {isGenerating ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5" />
            </motion.div>
          ) : (
            <Sparkles className="w-5 h-5" />
          )}
          {isGenerating ? "Cooking up ideas..." : "Find Recipes"}
        </motion.button>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto px-6 pb-8">
        {generatedRecipes.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4"
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-black text-lg">AI Recipe Suggestions</h2>
              <span className="text-xs text-gray-500">Based on your ingredients</span>
            </div>

            <div className="space-y-4">
              {generatedRecipes.map((recipe, index) => (
                <motion.div
                  key={recipe.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-3xl overflow-hidden border-2 border-gray-100 shadow-lg cursor-pointer"
                  onClick={() => setSelectedRecipe(recipe)}
                >
                  <div className="relative">
                    <img
                      src={recipe.image}
                      alt={recipe.name}
                      className="w-full h-48 object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-3 right-3 flex gap-2">
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(recipe.id);
                        }}
                        className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
                          favorites.has(recipe.id) ? "bg-red-500" : "bg-white"
                        }`}
                      >
                        <Heart
                          className={`w-5 h-5 ${favorites.has(recipe.id) ? "text-white fill-white" : "text-gray-400"}`}
                        />
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRegenerate();
                        }}
                        className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg"
                      >
                        <RefreshCw className="w-5 h-5 text-gray-600" />
                      </motion.button>
                    </div>
                    <div className="absolute bottom-3 left-3 flex gap-2">
                      <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur text-xs font-bold shadow-sm">
                        {recipe.difficulty}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur text-xs font-bold shadow-sm">
                        {recipe.cookingMethod}
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-black text-lg leading-tight">{recipe.name}</h3>
                      <span className="text-xs font-bold px-2 py-1 rounded-lg bg-orange-100 text-orange-600">
                        {recipe.spiceLevel}
                      </span>
                    </div>

                    <p className="text-sm text-gray-500 mb-3 line-clamp-2">{recipe.description}</p>

                    <div className="flex items-center gap-4 text-sm mb-3">
                      <span className="flex items-center gap-1 text-gray-600">
                        <Clock className="w-4 h-4" />
                        {recipe.time}
                      </span>
                      <span className="flex items-center gap-1 text-gray-600">
                        <Users className="w-4 h-4" />
                        {recipe.servings}
                      </span>
                      <span className="flex items-center gap-1 text-gray-600">
                        <Flame className="w-4 h-4" />
                        {recipe.calories} kcal
                      </span>
                    </div>

                    {/* Nutrition Preview */}
                    <div className="flex gap-2 mb-3">
                      {[
                        { label: "P", value: `${recipe.protein}g`, color: "#84cc16" },
                        { label: "C", value: `${recipe.carbs}g`, color: "#f97316" },
                        { label: "F", value: `${recipe.fat}g`, color: "#a855f7" },
                      ].map((n) => (
                        <div
                          key={n.label}
                          className="flex-1 py-2 rounded-xl text-center"
                          style={{ backgroundColor: `${n.color}15` }}
                        >
                          <span className="text-xs font-bold" style={{ color: n.color }}>
                            {n.value}
                          </span>
                          <span className="text-[10px] text-gray-400 block">{n.label}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {recipe.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 rounded-full bg-gray-100 text-[10px] font-bold text-gray-600">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ─── RECIPE DETAIL COMPONENT ───
function RecipeDetail({
  recipe,
  onBack,
  isFavorite,
  onToggleFavorite,
  speaking,
  onSpeak,
  checkedIngredients,
  onToggleIngredient,
  completedSteps,
  onToggleStep,
  onSpeakStep,
}: {
  recipe: GeneratedRecipe;
  onBack: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  speaking: boolean;
  onSpeak: () => void;
  checkedIngredients: Set<string>;
  onToggleIngredient: (item: string) => void;
  completedSteps: Set<number>;
  onToggleStep: (step: number) => void;
  onSpeakStep: (step: { step: number; text: string }) => void;
}) {
  const [activeTab, setActiveTab] = useState<"ingredients" | "steps" | "nutrition">("ingredients");

  return (
    <div className="flex flex-col h-full bg-cream" style={{ backgroundColor: "#fefcf7" }}>
      {/* Header Image */}
      <div className="relative">
        <img src={recipe.image} alt={recipe.name} className="w-full h-64 object-cover" />
        <div className="absolute top-4 left-4 right-4 flex justify-between">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-lg"
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
          <div className="flex gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onSpeak}
              className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${speaking ? "bg-green-500" : "bg-white/90 backdrop-blur"}`}
            >
              {speaking ? <Volume2 className="w-5 h-5 text-white" /> : <Volume2 className="w-5 h-5" />}
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onToggleFavorite}
              className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${isFavorite ? "bg-red-500" : "bg-white/90 backdrop-blur"}`}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? "text-white fill-white" : ""}`} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-black mb-2">{recipe.name}</h1>
          <p className="text-sm text-gray-500 mb-4">{recipe.description}</p>

          {/* Quick Stats */}
          <div className="flex gap-3 mb-4">
            {[
              { icon: Clock, label: recipe.time, color: "#84cc16" },
              { icon: Users, label: `${recipe.servings} servings`, color: "#f97316" },
              { icon: Flame, label: `${recipe.calories} kcal`, color: "#ef4444" },
            ].map((stat) => (
              <div key={stat.label} className="flex-1 bg-white rounded-2xl p-3 text-center border border-gray-100">
                <stat.icon className="w-5 h-5 mx-auto mb-1" style={{ color: stat.color }} />
                <span className="text-xs font-bold">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Macro Bars */}
          <div className="bg-white rounded-2xl p-4 border border-gray-100 mb-4">
            <p className="text-xs font-bold text-gray-400 uppercase mb-3">Nutrition per serving</p>
            <div className="space-y-3">
              {[
                { label: "Protein", value: recipe.protein, total: 50, color: "#84cc16", icon: Zap },
                { label: "Carbs", value: recipe.carbs, total: 80, color: "#f97316", icon: Leaf },
                { label: "Fat", value: recipe.fat, total: 40, color: "#a855f7", icon: Droplets },
                { label: "Fiber", value: recipe.fiber, total: 30, color: "#0ea5e9", icon: UtensilsCrossed },
              ].map((macro) => (
                <div key={macro.label}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <macro.icon className="w-4 h-4" style={{ color: macro.color }} />
                      <span className="text-sm font-bold">{macro.label}</span>
                    </div>
                    <span className="text-sm font-bold" style={{ color: macro.color }}>
                      {macro.value}g
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: macro.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((macro.value / macro.total) * 100, 100)}%` }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vitamins */}
          <div className="bg-white rounded-2xl p-4 border border-gray-100 mb-4">
            <p className="text-xs font-bold text-gray-400 uppercase mb-3">Vitamins & Minerals</p>
            <div className="grid grid-cols-2 gap-2">
              {recipe.vitamins.map((v, i) => (
                <motion.div
                  key={v.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="p-3 rounded-xl bg-gray-50"
                >
                  <p className="text-xs font-bold text-gray-700">{v.name}</p>
                  <p className="text-xs text-gray-500">{v.amount}</p>
                  <div className="mt-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: "#84cc16" }}
                      initial={{ width: 0 }}
                      animate={{ width: `${v.percent}%` }}
                      transition={{ duration: 0.5, delay: 0.3 + i * 0.05 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 mb-4">
            {[
              { id: "ingredients" as const, label: "Ingredients", count: recipe.ingredients.length },
              { id: "steps" as const, label: "Steps", count: recipe.steps.length },
              { id: "nutrition" as const, label: "Health Benefits", count: recipe.healthBenefits.length },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 rounded-2xl font-bold text-xs transition-all border-2 ${
                  activeTab === tab.id
                    ? "text-white border-transparent"
                    : "bg-white border-gray-200 text-gray-600"
                }`}
                style={activeTab === tab.id ? { background: "linear-gradient(135deg, #84cc16, #65a30d)" } : {}}
              >
                {tab.label}
                <span className="ml-1 opacity-70">({tab.count})</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === "ingredients" && (
              <motion.div
                key="ingredients"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-2"
              >
                <p className="text-xs font-bold text-gray-400 mb-2">For {recipe.servings} servings</p>
                {recipe.ingredients.map((ing, i) => (
                  <motion.div
                    key={ing.item}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    onClick={() => onToggleIngredient(ing.item)}
                    className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all border-2 ${
                      checkedIngredients.has(ing.item)
                        ? "bg-green-50 border-green-200"
                        : "bg-white border-gray-100"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        checkedIngredients.has(ing.item)
                          ? "bg-green-500 border-green-500"
                          : "border-gray-300"
                      }`}
                    >
                      {checkedIngredients.has(ing.item) && <span className="text-white text-xs">✓</span>}
                    </div>
                    <span className={`flex-1 font-medium text-sm ${checkedIngredients.has(ing.item) ? "line-through text-gray-400" : ""}`}>
                      {ing.item}
                    </span>
                    <span className="text-xs text-gray-500 font-medium">{ing.amount}</span>
                  </motion.div>
                ))}

                {/* Substitutes */}
                {recipe.substitutes.length > 0 && (
                  <div className="mt-4 p-4 bg-orange-50 rounded-2xl border border-orange-100">
                    <p className="text-xs font-bold text-orange-600 mb-2">💡 Substitute Ideas</p>
                    {recipe.substitutes.map((sub) => (
                      <div key={sub.original} className="mb-2 last:mb-0">
                        <p className="text-xs text-gray-600">
                          <span className="font-bold">{sub.original}:</span> {sub.alternatives.join(", ")}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === "steps" && (
              <motion.div
                key="steps"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-3"
              >
                {recipe.steps.map((step, i) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => onToggleStep(step.step)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                      completedSteps.has(step.step)
                        ? "bg-green-50 border-green-200"
                        : "bg-white border-gray-100"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm flex-shrink-0 ${
                          completedSteps.has(step.step)
                            ? "bg-green-500 text-white"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {completedSteps.has(step.step) ? "✓" : step.step}
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm leading-relaxed ${completedSteps.has(step.step) ? "text-gray-500" : ""}`}>
                          {step.text}
                        </p>
                        {step.time && (
                          <span className="text-xs text-gray-400 mt-1 block">⏱️ {step.time}</span>
                        )}
                      </div>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onSpeakStep(step);
                        }}
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0"
                      >
                        <Volume2 className="w-4 h-4 text-gray-600" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === "nutrition" && (
              <motion.div
                key="nutrition"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-3"
              >
                {recipe.healthBenefits.map((benefit, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-gray-100"
                  >
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Leaf className="w-4 h-4 text-green-600" />
                    </div>
                    <p className="text-sm text-gray-700">{benefit}</p>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
