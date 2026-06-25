"use client";

import { useState } from "react";
import { Camera, PenLine, ChefHat, Leaf, Flame, Clock } from "lucide-react";

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
  vitamins: { name: string; amount: string }[];
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
  vitamins: [
    { name: "Potassium", amount: "422mg" },
    { name: "Magnesium", amount: "58mg" },
    { name: "Vitamin C", amount: "10mg" },
    { name: "Iron", amount: "1.8mg" },
    { name: "Calcium", amount: "45mg" },
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
      <div className="max-w-md mx-auto px-4 pt-4 pb-24">
        <button
          onClick={() => setSelectedRecipe(null)}
          className="text-sm text-green-600 font-semibold mb-4"
        >
          Back to Fridge
        </button>

        <div className="bg-white rounded-2xl p-5 shadow-sm mb-4">
          <h2 className="text-xl font-bold text-gray-900 mb-2">{selectedRecipe.name}</h2>
          <p className="text-sm text-gray-500 mb-4">{selectedRecipe.description}</p>

          <div className="flex gap-4 text-sm text-gray-600 mb-5">
            <span className="flex items-center gap-1"><Clock size={14} /> {selectedRecipe.time}</span>
            <span className="flex items-center gap-1"><ChefHat size={14} /> {selectedRecipe.servings} servings</span>
            <span className="flex items-center gap-1"><Flame size={14} /> {selectedRecipe.calories} kcal</span>
          </div>

          <div className="bg-green-50 rounded-xl p-4 mb-5">
            <p className="text-sm font-bold text-gray-700 mb-3">Nutrition per serving</p>
            <div className="grid grid-cols-3 gap-3 mb-3">
              <div className="text-center">
                <p className="text-lg font-bold text-green-600">{selectedRecipe.protein}g</p>
                <p className="text-xs text-gray-500">Protein</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-blue-500">{selectedRecipe.carbs}g</p>
                <p className="text-xs text-gray-500">Carbs</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-yellow-500">{selectedRecipe.fat}g</p>
                <p className="text-xs text-gray-500">Fat</p>
              </div>
            </div>
            <div className="grid grid-cols-5 gap-1">
              {selectedRecipe.vitamins.map((v) => (
                <div key={v.name} className="text-center bg-white rounded-lg p-1">
                  <p className="text-[10px] font-bold text-gray-700">{v.amount}</p>
                  <p className="text-[8px] text-gray-400">{v.name}</p>
                </div>
              ))}
            </div>
          </div>

          <h3 className="text-sm font-bold text-gray-700 mb-3">Ingredients</h3>
          {selectedRecipe.ingredients.map((ing) => (
            <button
              key={ing.item}
              onClick={() => toggleIngredient(ing.item)}
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer mb-2 border-2 w-full text-left transition-colors ${
                checkedIngredients.has(ing.item) ? "bg-green-50 border-green-200" : "bg-white border-gray-100"
              }`}
            >
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                checkedIngredients.has(ing.item) ? "bg-green-500 border-green-500" : "border-gray-300"
              }`}>
                {checkedIngredients.has(ing.item) && <span className="text-white text-xs">OK</span>}
              </div>
              <span className="text-sm font-medium text-gray-800">{ing.item}</span>
              <span className="text-xs text-gray-400 ml-auto">{ing.amount}</span>
            </button>
          ))}

          <h3 className="text-sm font-bold text-gray-700 mb-3 mt-5">Steps</h3>
          {selectedRecipe.steps.map((step) => (
            <button
              key={step.step}
              onClick={() => toggleStep(step.step)}
              className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer mb-2 border-2 w-full text-left transition-colors ${
                completedSteps.has(step.step) ? "bg-green-50 border-green-200" : "bg-white border-gray-100"
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                completedSteps.has(step.step) ? "bg-green-500 text-white" : "bg-gray-200 text-gray-600"
              }`}>
                {completedSteps.has(step.step) ? "OK" : step.step}
              </div>
              <span className="text-sm text-gray-700">{step.text}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 pt-4 pb-24">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">What is in your fridge?</h2>
      </div>
      <p className="text-sm text-gray-500 mb-6">Let AI turn it into something delicious</p>

      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setActiveTab("scan")}
          className={`flex-1 p-4 rounded-2xl border-2 text-center transition-colors ${
            activeTab === "scan" ? "bg-blue-50 border-blue-300" : "bg-white border-gray-200"
          }`}
        >
          <Camera size={24} className="mx-auto mb-2 text-blue-500" />
          <p className="text-sm font-bold text-gray-800">Scan your fridge</p>
          <p className="text-xs text-gray-500">Take a photo and let AI see what you have</p>
        </button>
        <button
          onClick={() => setActiveTab("type")}
          className={`flex-1 p-4 rounded-2xl border-2 text-center transition-colors ${
            activeTab === "type" ? "bg-green-50 border-green-300" : "bg-white border-gray-200"
          }`}
        >
          <PenLine size={24} className="mx-auto mb-2 text-green-500" />
          <p className="text-sm font-bold text-gray-800">Type ingredients</p>
          <p className="text-xs text-gray-500">List what you have in your fridge</p>
        </button>
      </div>

      {activeTab === "type" && (
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex gap-2 mb-4">
            <div className="flex-1">
              <label className="text-xs text-gray-500 block mb-1">Cooking method</label>
              <select className="w-full p-2 rounded-xl border border-gray-200 text-sm">
                <option>Stovetop</option>
                <option>Oven</option>
                <option>Air Fryer</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="text-xs text-gray-500 block mb-1">Ingredients</label>
              <select className="w-full p-2 rounded-xl border border-gray-200 text-sm">
                <option>3 Ingredients</option>
                <option>5 Ingredients</option>
                <option>Any</option>
              </select>
            </div>
          </div>

          <button
            onClick={() => setSelectedRecipe(sampleRecipe)}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 rounded-xl mb-6"
          >
            <span className="flex items-center justify-center gap-2">
              <ChefHat size={18} />
              Find recipes
            </span>
          </button>

          <h3 className="text-sm font-bold text-gray-700 mb-3">AI Recipe Suggestions</h3>
          <p className="text-xs text-gray-400 mb-3">Based on your fridge, preferences and goals</p>

          <div
            onClick={() => setSelectedRecipe(sampleRecipe)}
            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer"
          >
            <div className="h-40 bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
              <span className="text-4xl">🍫🍌</span>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-bold text-gray-900">{sampleRecipe.name}</h4>
                <button className="text-red-400">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                <span className="flex items-center gap-1"><Leaf size={12} /> 5 ingredients</span>
                <span>Sweet</span>
                <span>Medium Spice</span>
                <span className="flex items-center gap-1"><Clock size={12} /> 5 min</span>
              </div>
              <div className="flex gap-3 text-xs mb-3">
                <span className="font-bold text-gray-700">{sampleRecipe.calories} kcal</span>
                <span className="text-orange-500">{sampleRecipe.protein}g protein</span>
                <span className="text-blue-500">{sampleRecipe.carbs}g carbs</span>
                <span className="text-yellow-500">{sampleRecipe.fat}g fat</span>
                <span className="text-red-500">18g sugar</span>
              </div>
              <div className="bg-green-50 rounded-xl p-3">
                <p className="text-xs font-bold text-green-700 mb-1">Why this is good for you</p>
                <p className="text-xs text-green-600">
                  Great source of potassium and magnesium which support muscle function and help maintain energy levels.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
