"use client";

import { useState } from "react";
import { Camera, PenLine, ChefHat, History, ChevronDown, X, Heart, Clock, Leaf, Flame, Sparkles } from "lucide-react";

interface Recipe {
  id: string;
  name: string;
  description: string;
  time: string;
  servings: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  sugar: number;
  vitamins: { name: string; amount: string; percent: string }[];
  ingredients: { item: string; amount: string }[];
  steps: { step: number; text: string }[];
}

const sampleRecipe: Recipe = {
  id: "r1",
  name: "Chocolate Banana Pudding",
  description: "A creamy, rich and healthy dessert made with simple ingredients you already have!",
  time: "5 min",
  servings: 2,
  calories: 245,
  protein: 6,
  carbs: 34,
  fat: 10,
  sugar: 18,
  vitamins: [
    { name: "Potassium", amount: "422mg", percent: "14%" },
    { name: "Magnesium", amount: "58mg", percent: "12%" },
    { name: "Vitamin C", amount: "10mg", percent: "8%" },
    { name: "Iron", amount: "1.8mg", percent: "10%" },
    { name: "Calcium", amount: "45mg", percent: "4%" },
  ],
  ingredients: [
    { item: "Ripe banana", amount: "1 large" },
    { item: "Cocoa powder", amount: "2 tbsp" },
    { item: "Greek yogurt", amount: "1/2 cup" },
    { item: "Honey", amount: "1 tbsp" },
    { item: "Chia seeds", amount: "1 tsp" },
  ],
  steps: [
    { step: 1, text: "Peel the banana and mash it in a bowl until smooth." },
    { step: 2, text: "Add cocoa powder, Greek yogurt, and honey. Mix well." },
    { step: 3, text: "Fold in chia seeds and refrigerate for 10 minutes." },
    { step: 4, text: "Serve chilled with toppings of your choice." },
  ],
};

export function FridgeTab() {
  const [activeTab, setActiveTab] = useState<"scan" | "type">("type");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [checkedIngredients, setCheckedIngredients] = useState<Set<string>>(new Set());
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [isLiked, setIsLiked] = useState(false);

  const toggleIngredient = (item: string) => {
    setCheckedIngredients((prev) => {
      const next = new Set(prev);
      if (next.has(item)) next.delete(item);
      else next.add(item);
      return next;
    });
  };

  const toggleStep = (step: number) => {
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(step)) next.delete(step);
      else next.add(step);
      return next;
    });
  };

  if (selectedRecipe) {
    return (
      <div className="max-w-md mx-auto bg-[#fafaf8] min-h-screen pb-24">
        {/* Header */}
        <div className="px-5 pt-5 pb-3 flex items-center justify-between">
          <button
            onClick={() => setSelectedRecipe(null)}
            className="flex items-center gap-1 text-gray-600"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <h2 className="text-lg font-bold text-gray-900">Recipe</h2>
          <button className="text-gray-400">
            <History size={20} />
          </button>
        </div>

        <div className="px-4">
          {/* Recipe Image Placeholder */}
          <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-3xl h-48 flex items-center justify-center mb-4">
            <span className="text-6xl">🍫</span>
          </div>

          <div className="bg-white rounded-3xl p-5 shadow-sm">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{selectedRecipe.name}</h2>
                <p className="text-sm text-gray-500">{selectedRecipe.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`${isLiked ? "text-red-400" : "text-gray-300"}`}
                >
                  <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
                </button>
                <button className="text-gray-400">
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Meta */}
            <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
              <span className="flex items-center gap-1"><Leaf size={14} /> 5 ingredients</span>
              <span>Sweet</span>
              <span className="flex items-center gap-1">🌶 Medium Spice</span>
              <span className="flex items-center gap-1"><Clock size={14} /> {selectedRecipe.time}</span>
            </div>

            {/* Macros */}
            <div className="flex gap-4 mb-4">
              <div className="text-center">
                <p className="text-lg font-bold text-gray-800">{selectedRecipe.calories}</p>
                <p className="text-[10px] text-gray-400">kcal</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-orange-400">{selectedRecipe.protein}g</p>
                <p className="text-[10px] text-gray-400">protein</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-amber-400">{selectedRecipe.carbs}g</p>
                <p className="text-[10px] text-gray-400">carbs</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-yellow-400">{selectedRecipe.fat}g</p>
                <p className="text-[10px] text-gray-400">fat</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-red-400">{selectedRecipe.sugar}g</p>
                <p className="text-[10px] text-gray-400">sugar</p>
              </div>
            </div>

            {/* Nutrition & Vitamins */}
            <div className="bg-green-50 rounded-2xl p-4 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-600">
                  <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 16a1 1 0 1 1 1-1 1 1 0 0 1-1 1zm1-5V7a1 1 0 0 0-2 0v6a1 1 0 0 0 2 0z" />
                </svg>
                <h4 className="text-sm font-bold text-gray-800">Nutrition & Vitamins</h4>
                <span className="text-[10px] text-gray-400 ml-auto">per serving</span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {selectedRecipe.vitamins.map((v) => (
                  <div key={v.name} className="text-center bg-white rounded-xl p-2">
                    <p className="text-[10px] font-bold text-gray-700">{v.amount}</p>
                    <p className="text-[8px] text-gray-400">{v.name}</p>
                    <p className="text-[8px] text-green-500">{v.percent}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div className="mb-4">
              <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                <span className="text-sm font-semibold text-gray-700">Instructions</span>
                <ChevronDown size={18} className="text-gray-400" />
              </button>
            </div>

            {/* Why this is good for you */}
            <div className="bg-green-50 rounded-2xl p-4 mb-4">
              <div className="flex items-start gap-2">
                <span className="text-green-500 text-lg">🌿</span>
                <div>
                  <h4 className="text-sm font-bold text-green-800 mb-1">Why this is good for you</h4>
                  <p className="text-xs text-green-700 leading-relaxed">
                    Great source of potassium and magnesium which support muscle function and help maintain energy levels.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-gray-200 text-gray-700 font-semibold py-3 rounded-2xl">
                <Sparkles size={18} className="text-purple-500" />
                Regenerate
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 bg-pink-400 hover:bg-pink-500 text-white font-semibold py-3 rounded-2xl transition-colors">
                <Heart size={18} />
                Save to Favorites
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-[#fafaf8] min-h-screen pb-24">
      {/* Header */}
      <div className="px-5 pt-5 pb-3 flex items-center justify-between">
        <button className="text-gray-600">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <h2 className="text-xl font-bold text-gray-900">What&apos;s in your fridge?</h2>
        <button className="flex items-center gap-1 text-sm text-purple-500 font-medium">
          <History size={16} />
          History
        </button>
      </div>

      <p className="px-5 text-sm text-gray-500 mb-4">Let AI turn it into something delicious</p>

      {/* Scan / Type Options */}
      <div className="px-4 flex gap-3 mb-4">
        <button
          onClick={() => setActiveTab("scan")}
          className={`flex-1 p-4 rounded-2xl border-2 text-center transition-all ${
            activeTab === "scan"
              ? "bg-blue-50 border-blue-200 shadow-sm"
              : "bg-white border-gray-100"
          }`}
        >
          <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-2">
            <Camera size={24} className="text-blue-500" />
          </div>
          <p className="text-sm font-bold text-gray-800">Scan your fridge</p>
          <p className="text-xs text-gray-400 mt-0.5">Take a photo and let AI see what you have</p>
        </button>
        <button
          onClick={() => setActiveTab("type")}
          className={`flex-1 p-4 rounded-2xl border-2 text-center transition-all ${
            activeTab === "type"
              ? "bg-green-50 border-green-200 shadow-sm"
              : "bg-white border-gray-100"
          }`}
        >
          <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-2">
            <PenLine size={24} className="text-green-500" />
          </div>
          <p className="text-sm font-bold text-gray-800">Type ingredients</p>
          <p className="text-xs text-gray-400 mt-0.5">List what you have in your fridge</p>
        </button>
      </div>

      {/* Customize Preferences */}
      <div className="px-4 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400">
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
          </svg>
          <span className="text-sm font-semibold text-gray-700">Customize your preferences</span>
        </div>

        <div className="flex gap-2 mb-3">
          <div className="flex items-center gap-1.5 bg-white rounded-xl px-3 py-2 border border-gray-100">
            <ChefHat size={14} className="text-gray-400" />
            <span className="text-xs text-gray-600">Stovetop</span>
            <ChevronDown size={12} className="text-gray-400" />
          </div>
          <div className="flex items-center gap-1.5 bg-white rounded-xl px-3 py-2 border border-gray-100">
            <Leaf size={14} className="text-green-500" />
            <span className="text-xs text-gray-600">3 Ingredients</span>
            <ChevronDown size={12} className="text-gray-400" />
          </div>
          <div className="flex items-center gap-1.5 bg-white rounded-xl px-3 py-2 border border-gray-100">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-pink-400">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span className="text-xs text-gray-600">Sweet</span>
            <ChevronDown size={12} className="text-gray-400" />
          </div>
          <div className="flex items-center gap-1.5 bg-white rounded-xl px-3 py-2 border border-gray-100">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-400">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            <span className="text-xs text-gray-600">Medium</span>
            <ChevronDown size={12} className="text-gray-400" />
          </div>
        </div>

        {/* Additional preferences */}
        <p className="text-xs text-gray-400 mb-2">Additional preferences (optional)</p>
        <div className="flex gap-2 flex-wrap">
          {["No cook", "No bake", "Low spice", "High protein", "Quick (under 20 min)"].map((tag) => (
            <span key={tag} className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-600">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Find Recipes Button */}
      <div className="px-4 mb-6">
        <button
          onClick={() => setSelectedRecipe(sampleRecipe)}
          className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-rose-400 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-pink-200"
        >
          <Sparkles size={20} />
          Find recipes
        </button>
      </div>

      {/* AI Recipe Suggestions */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-purple-500" />
            <h3 className="text-sm font-bold text-gray-800">AI Recipe Suggestions</h3>
            <p className="text-xs text-gray-400">Based on your fridge, preferences & goals</p>
          </div>
          <button className="flex items-center gap-1 text-xs text-gray-500">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 6H3" />
              <path d="M16 6h-2" />
              <path d="M21 6h-2" />
              <path d="M19 12h-8" />
              <path d="M8 12H6" />
              <path d="M3 12h1" />
              <path d="M13 18H3" />
              <path d="M18 18h-2" />
              <path d="M21 18h-1" />
            </svg>
            Sort
          </button>
        </div>

        {/* Recipe Card */}
        <div
          onClick={() => setSelectedRecipe(sampleRecipe)}
          className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer"
        >
          <div className="h-44 bg-gradient-to-br from-amber-100 via-orange-50 to-yellow-100 flex items-center justify-center relative">
            <span className="text-7xl">🍮</span>
            <div className="absolute top-3 right-3 flex items-center gap-2">
              <button
                onClick={(e) => { e.stopPropagation(); setIsLiked(!isLiked); }}
                className={`w-8 h-8 rounded-full bg-white/80 flex items-center justify-center ${isLiked ? "text-red-400" : "text-gray-400"}`}
              >
                <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
              </button>
              <button className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-gray-400">
                <X size={16} />
              </button>
            </div>
          </div>
          <div className="p-4">
            <h4 className="font-bold text-gray-900 mb-1">{sampleRecipe.name}</h4>
            <p className="text-xs text-gray-500 mb-3">{sampleRecipe.description}</p>

            <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
              <span className="flex items-center gap-1"><Leaf size={12} /> 5 ingredients</span>
              <span>Sweet</span>
              <span className="flex items-center gap-1">🌶 Medium Spice</span>
              <span className="flex items-center gap-1"><Clock size={12} /> {sampleRecipe.time}</span>
            </div>

            <div className="flex gap-3 mb-3">
              <div className="text-center">
                <p className="text-sm font-bold text-gray-800">{sampleRecipe.calories}</p>
                <p className="text-[9px] text-gray-400">kcal</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-orange-400">{sampleRecipe.protein}g</p>
                <p className="text-[9px] text-gray-400">protein</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-amber-400">{sampleRecipe.carbs}g</p>
                <p className="text-[9px] text-gray-400">carbs</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-yellow-400">{sampleRecipe.fat}g</p>
                <p className="text-[9px] text-gray-400">fat</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-red-400">{sampleRecipe.sugar}g</p>
                <p className="text-[9px] text-gray-400">sugar</p>
              </div>
            </div>

            {/* Nutrition mini */}
            <div className="bg-green-50 rounded-xl p-3 mb-3">
              <div className="flex items-center gap-1 mb-2">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-600">
                  <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 16a1 1 0 1 1 1-1 1 1 0 0 1-1 1zm1-5V7a1 1 0 0 0-2 0v6a1 1 0 0 0 2 0z" />
                </svg>
                <span className="text-[10px] font-bold text-gray-700">Nutrition & Vitamins</span>
              </div>
              <div className="flex gap-1">
                {sampleRecipe.vitamins.slice(0, 4).map((v) => (
                  <div key={v.name} className="flex-1 text-center bg-white rounded-lg p-1">
                    <p className="text-[8px] font-bold text-gray-700">{v.amount}</p>
                    <p className="text-[7px] text-gray-400">{v.name}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-green-50 rounded-xl p-3">
              <div className="flex items-start gap-2">
                <span className="text-green-500">🌿</span>
                <div>
                  <p className="text-[10px] font-bold text-green-800 mb-0.5">Why this is good for you</p>
                  <p className="text-[10px] text-green-700 leading-relaxed">
                    Great source of potassium and magnesium which support muscle function and help maintain energy levels.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tip */}
      <div className="px-4 mt-4">
        <p className="text-xs text-gray-400 text-center">
          💡 Tip: Be more specific with ingredients or preferences for better results!
        </p>
      </div>
    </div>
  );
}
