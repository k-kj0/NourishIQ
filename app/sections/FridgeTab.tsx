"use client";

import { useState } from "react";
import { Camera, Type, Flame, Clock, Users, Heart, X, RefreshCw, Volume2, ArrowLeft, ChefHat, Filter } from "lucide-react";

interface Recipe {
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
  ingredients: Array<{ item: string; amount: string }>;
  steps: Array<{ step: number; text: string }>;
  vitamins: Array<{ name: string; amount: string; percent: number }>;
}

const RECIPES: Recipe[] = [
  {
    id: "r1",
    name: "Creamy Tomato Pasta",
    image: "https://images.unsplash.com/photo-1626844131082-256783844137?w=800&h=600&fit=crop",
    description: "Rich pasta with fresh tomatoes and basil.",
    time: "25 min",
    servings: 2,
    calories: 420,
    protein: 14,
    carbs: 58,
    fat: 16,
    ingredients: [
      { item: "Pasta", amount: "200g" },
      { item: "Tomatoes", amount: "3 medium" },
      { item: "Basil", amount: "1 cup" },
      { item: "Cream", amount: "1/2 cup" },
      { item: "Garlic", amount: "3 cloves" },
    ],
    steps: [
      { step: 1, text: "Boil pasta until al dente. Reserve 1/2 cup pasta water." },
      { step: 2, text: "Saute garlic in olive oil for 30 seconds." },
      { step: 3, text: "Add tomatoes, cook 5-7 minutes until saucy." },
      { step: 4, text: "Stir in cream and basil. Toss with pasta." },
    ],
    vitamins: [
      { name: "Vitamin A", amount: "450 mcg", percent: 50 },
      { name: "Vitamin C", amount: "28 mg", percent: 31 },
      { name: "Iron", amount: "3.2 mg", percent: 18 },
    ],
  },
  {
    id: "r2",
    name: "Avocado Toast",
    image: "https://images.unsplash.com/photo-1588137372308-15f75323ca8d?w=800&h=600&fit=crop",
    description: "Quick breakfast with creamy avocado on toast.",
    time: "5 min",
    servings: 1,
    calories: 320,
    protein: 8,
    carbs: 28,
    fat: 22,
    ingredients: [
      { item: "Bread", amount: "2 slices" },
      { item: "Avocado", amount: "1 ripe" },
      { item: "Lemon Juice", amount: "1 tsp" },
      { item: "Salt", amount: "pinch" },
    ],
    steps: [
      { step: 1, text: "Toast bread until golden." },
      { step: 2, text: "Mash avocado with lemon juice and salt." },
      { step: 3, text: "Spread on toast. Enjoy!" },
    ],
    vitamins: [
      { name: "Vitamin K", amount: "35 mcg", percent: 29 },
      { name: "Folate", amount: "120 mcg", percent: 30 },
      { name: "Potassium", amount: "485 mg", percent: 10 },
    ],
  },
];

function speakText(text: string) {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }
}

export function FridgeTab() {
  const [activeTab, setActiveTab] = useState("type");
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [isGenerating, setIsGenerating] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [checkedIngredients, setCheckedIngredients] = useState<Set<string>>(new Set());
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

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
      setRecipes(RECIPES);
      setIsGenerating(false);
    }, 1500);
  };

  const handleRegenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setRecipes([...RECIPES].sort(() => Math.random() - 0.5));
      setIsGenerating(false);
    }, 1000);
  };

  const handleSpeak = (recipe: Recipe) => {
    const text = "Recipe for " + recipe.name + ". Ingredients: " + recipe.ingredients.map((i) => i.amount + " " + i.item).join(", ") + ". Steps: " + recipe.steps.map((s) => "Step " + s.step + ": " + s.text).join(". ");
    speakText(text);
    setSpeaking(true);
    setTimeout(() => setSpeaking(false), 8000);
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
      <div className="flex flex-col h-full" style={{ backgroundColor: "#fefcf7" }}>
        <div className="relative">
          <img src={selectedRecipe.image} alt={selectedRecipe.name} className="w-full h-56 object-cover" />
          <div className="absolute top-4 left-4 right-4 flex justify-between">
            <button onClick={() => setSelectedRecipe(null)} className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              <button onClick={() => handleSpeak(selectedRecipe)} className={"w-10 h-10 rounded-full flex items-center justify-center shadow-lg " + (speaking ? "bg-green-500" : "bg-white/90")}>
                <Volume2 className={"w-5 h-5 " + (speaking ? "text-white" : "")} />
              </button>
              <button onClick={() => toggleFavorite(selectedRecipe.id)} className={"w-10 h-10 rounded-full flex items-center justify-center shadow-lg " + (favorites.has(selectedRecipe.id) ? "bg-red-500" : "bg-white/90")}>
                <Heart className={"w-5 h-5 " + (favorites.has(selectedRecipe.id) ? "text-white fill-white" : "")} />
              </button>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <h1 className="text-2xl font-black mb-2">{selectedRecipe.name}</h1>
          <p className="text-sm text-gray-500 mb-4">{selectedRecipe.description}</p>
          <div className="flex gap-3 mb-4">
            <div className="flex-1 bg-white rounded-2xl p-3 text-center border border-gray-100">
              <Clock className="w-5 h-5 mx-auto mb-1 text-green-500" />
              <span className="text-xs font-bold">{selectedRecipe.time}</span>
            </div>
            <div className="flex-1 bg-white rounded-2xl p-3 text-center border border-gray-100">
              <Users className="w-5 h-5 mx-auto mb-1 text-orange-500" />
              <span className="text-xs font-bold">{selectedRecipe.servings}</span>
            </div>
            <div className="flex-1 bg-white rounded-2xl p-3 text-center border border-gray-100">
              <Flame className="w-5 h-5 mx-auto mb-1 text-red-500" />
              <span className="text-xs font-bold">{selectedRecipe.calories} kcal</span>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-gray-100 mb-4">
            <p className="text-xs font-bold text-gray-400 uppercase mb-3">Nutrition per serving</p>
            <div className="flex gap-2 mb-3">
              <div className="flex-1 py-2 rounded-xl text-center" style={{ backgroundColor: "#84cc1615" }}>
                <span className="text-xs font-bold text-green-500">{selectedRecipe.protein}g</span>
                <span className="text-[10px] text-gray-400 block">Protein</span>
              </div>
              <div className="flex-1 py-2 rounded-xl text-center" style={{ backgroundColor: "#f9731615" }}>
                <span className="text-xs font-bold text-orange-500">{selectedRecipe.carbs}g</span>
                <span className="text-[10px] text-gray-400 block">Carbs</span>
              </div>
              <div className="flex-1 py-2 rounded-xl text-center" style={{ backgroundColor: "#a855f715" }}>
                <span className="text-xs font-bold text-purple-500">{selectedRecipe.fat}g</span>
                <span className="text-[10px] text-gray-400 block">Fat</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {selectedRecipe.vitamins.map((v) => (
                <div key={v.name} className="p-3 rounded-xl bg-gray-50">
                  <p className="text-xs font-bold text-gray-700">{v.name}</p>
                  <p className="text-xs text-gray-500">{v.amount}</p>
                  <div className="mt-1 h-1.5 bg-gray-200 rounded-full">
                    <div className="h-full rounded-full bg-green-500" style={{ width: v.percent + "%" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-gray-100 mb-4">
            <p className="text-xs font-bold text-gray-400 uppercase mb-3">Ingredients</p>
            {selectedRecipe.ingredients.map((ing) => (
              <div key={ing.item} onClick={() => toggleIngredient(ing.item)} className={"flex items-center gap-3 p-3 rounded-xl cursor-pointer mb-2 border-2 " + (checkedIngredients.has(ing.item) ? "bg-green-50 border-green-200" : "bg-white border-gray-100")}>
                <div className={"w-6 h-6 rounded-full border-2 flex items-center justify-center " + (checkedIngredients.has(ing.item) ? "bg-green-500 border-green-500" : "border-gray-300")}>
                  {checkedIngredients.has(ing.item) && <span className="text-white text-xs">OK</span>}
                </div>
                <span className={"flex-1 text-sm " + (checkedIngredients.has(ing.item) ? "line-through text-gray-400" : "")}>{ing.item}</span>
                <span className="text-xs text-gray-500">{ing.amount}</span>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-2xl p-4 border border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase mb-3">Steps</p>
            {selectedRecipe.steps.map((step) => (
              <div key={step.step} onClick={() => toggleStep(step.step)} className={"flex items-start gap-3 p-3 rounded-xl cursor-pointer mb-2 border-2 " + (completedSteps.has(step.step) ? "bg-green-50 border-green-200" : "bg-white border-gray-100")}>
                <div className={"w-8 h-8 rounded-full flex items-center justify-center font-black text-sm flex-shrink-0 " + (completedSteps.has(step.step) ? "bg-green-500 text-white" : "bg-gray-100 text-gray-600")}>
                  {completedSteps.has(step.step) ? "OK" : step.step}
                </div>
                <p className={"text-sm flex-1 " + (completedSteps.has(step.step) ? "text-gray-500" : "")}>{step.text}</p>
                <button onClick={(e) => { e.stopPropagation(); speakText("Step " + step.step + ": " + step.text); }} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <Volume2 className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: "#fefcf7" }}>
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #84cc16, #65a30d)" }}>
            <ChefHat className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black">What is in your fridge?</h1>
            <p className="text-sm text-gray-500">Let AI turn it into something delicious</p>
          </div>
        </div>
        <div className="flex gap-2 mb-4">
          <button onClick={() => setActiveTab("scan")} className={"flex-1 py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 border-2 " + (activeTab === "scan" ? "text-white border-transparent" : "bg-white border-gray-200 text-gray-600")} style={activeTab === "scan" ? { background: "linear-gradient(135deg, #84cc16, #65a30d)" } : {}}>
            <Camera className="w-4 h-4" /> Scan Fridge
          </button>
          <button onClick={() => setActiveTab("type")} className={"flex-1 py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 border-2 " + (activeTab === "type" ? "text-white border-transparent" : "bg-white border-gray-200 text-gray-600")} style={activeTab === "type" ? { background: "linear-gradient(135deg, #84cc16, #65a30d)" } : {}}>
            <Type className="w-4 h-4" /> Type Ingredients
          </button>
        </div>
        {activeTab === "scan" ? (
          <div className="bg-white rounded-3xl p-8 border-2 border-dashed border-gray-300 text-center cursor-pointer">
            <Camera className="w-12 h-12 mx-auto mb-3 text-green-500" />
            <p className="font-bold text-gray-700">Take a photo of your fridge</p>
            <p className="text-sm text-gray-500 mt-1">AI will identify ingredients automatically</p>
          </div>
        ) : (
          <div>
            <textarea
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="e.g., tomato, onion, garlic, pasta, cheese, eggs..."
              className="w-full p-4 rounded-2xl border-2 border-gray-200 focus:border-green-400 outline-none bg-white text-sm min-h-[100px] resize-none"
            />
            <div className="flex flex-wrap gap-1 mt-2">
              {["Tomato", "Onion", "Garlic", "Eggs", "Cheese", "Pasta", "Rice", "Chicken", "Spinach"].map((item) => (
                <button key={item} onClick={() => setIngredients((prev) => (prev ? prev + ", " + item.toLowerCase() : item.toLowerCase()))} className="px-3 py-1 rounded-full bg-white border border-gray-200 text-xs font-bold text-gray-600 hover:border-green-400">
                  + {item}
                </button>
              ))}
            </div>
          </div>
        )}
        <button onClick={() => setShowFilters(!showFilters)} className="mt-4 w-full py-3 rounded-2xl bg-white border-2 border-gray-200 font-bold text-sm flex items-center justify-center gap-2 hover:border-gray-300">
          <Filter className="w-4 h-4" /> {showFilters ? "Hide Filters" : "Customize Preferences"}
        </button>
        {showFilters && (
          <div className="mt-3 space-y-4">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase mb-2">Cooking Method</p>
              <div className="flex flex-wrap gap-2">
                {["Any", "Stovetop", "Microwave", "Oven", "Air Fryer", "No Cook", "Blender"].map((m) => (
                  <button key={m} className="px-3 py-2 rounded-xl text-xs font-bold border-2 bg-white border-gray-200 text-gray-600">{m}</button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase mb-2">Spice Level</p>
              <div className="flex flex-wrap gap-2">
                {["Mild", "Medium", "Hot", "Very Hot"].map((s) => (
                  <button key={s} className="px-3 py-2 rounded-xl text-xs font-bold border-2 bg-white border-gray-200 text-gray-600">{s}</button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase mb-2">Recipe Type</p>
              <div className="flex flex-wrap gap-2">
                {["Any", "Sweet", "Savory", "No-Bake", "No-Cook", "Quick", "High Protein"].map((t) => (
                  <button key={t} className="px-3 py-2 rounded-xl text-xs font-bold border-2 bg-white border-gray-200 text-gray-600">{t}</button>
                ))}
              </div>
            </div>
          </div>
        )}
        <button
          onClick={handleGenerate}
          disabled={!ingredients.trim() || isGenerating}
          className="mt-4 w-full py-4 rounded-2xl text-white font-bold text-lg shadow-xl flex items-center justify-center gap-2 disabled:opacity-50"
          style={{ background: "linear-gradient(135deg, #84cc16, #65a30d)" }}
        >
          {isGenerating ? "Cooking up ideas..." : "Find Recipes"}
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-6 pb-8">
        {recipes.length > 0 && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-black text-lg">AI Recipe Suggestions</h2>
              <span className="text-xs text-gray-500">Based on your ingredients</span>
            </div>
            <div className="space-y-4">
              {recipes.map((recipe) => (
                <div key={recipe.id} onClick={() => setSelectedRecipe(recipe)} className="bg-white rounded-3xl overflow-hidden border-2 border-gray-100 shadow-lg cursor-pointer">
                  <div className="relative">
                    <img src={recipe.image} alt={recipe.name} className="w-full h-48 object-cover" loading="lazy" />
                    <div className="absolute top-3 right-3 flex gap-2">
                      <button onClick={(e) => { e.stopPropagation(); toggleFavorite(recipe.id); }} className={"w-10 h-10 rounded-full flex items-center justify-center shadow-lg " + (favorites.has(recipe.id) ? "bg-red-500" : "bg-white")}>
                        <Heart className={"w-5 h-5 " + (favorites.has(recipe.id) ? "text-white fill-white" : "text-gray-400")} />
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); handleRegenerate(); }} className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg">
                        <RefreshCw className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-black text-lg mb-2">{recipe.name}</h3>
                    <p className="text-sm text-gray-500 mb-3">{recipe.description}</p>
                    <div className="flex items-center gap-4 text-sm mb-3">
                      <span className="flex items-center gap-1 text-gray-600"><Clock className="w-4 h-4" />{recipe.time}</span>
                      <span className="flex items-center gap-1 text-gray-600"><Users className="w-4 h-4" />{recipe.servings}</span>
                      <span className="flex items-center gap-1 text-gray-600"><Flame className="w-4 h-4" />{recipe.calories} kcal</span>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1 py-2 rounded-xl text-center" style={{ backgroundColor: "#84cc1615" }}>
                        <span className="text-xs font-bold text-green-500">{recipe.protein}g</span>
                        <span className="text-[10px] text-gray-400 block">Protein</span>
                      </div>
                      <div className="flex-1 py-2 rounded-xl text-center" style={{ backgroundColor: "#f9731615" }}>
                        <span className="text-xs font-bold text-orange-500">{recipe.carbs}g</span>
                        <span className="text-[10px] text-gray-400 block">Carbs</span>
                      </div>
                      <div className="flex-1 py-2 rounded-xl text-center" style={{ backgroundColor: "#a855f715" }}>
                        <span className="text-xs font-bold text-purple-500">{recipe.fat}g</span>
                        <span className="text-[10px] text-gray-400 block">Fat</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
