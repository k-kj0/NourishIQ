"use client";

import { useState } from "react";
import { useApp } from "../AppContext";
import { X, Heart, Clock, Users, Flame, Check } from "lucide-react";

export function RecipeSheet() {
  const { selectedMeal, showRecipeSheet, setShowRecipeSheet, toggleLikeMeal, favorites } = useApp();
  const [activeTab, setActiveTab] = useState<"ingredients" | "steps" | "substitutes">("ingredients");
  const [checkedIngredients, setCheckedIngredients] = useState<Set<number>>(new Set());

  if (!selectedMeal || !showRecipeSheet) return null;

  const isLiked = favorites.some((m) => m.id === selectedMeal.id);

  const toggleIngredient = (index: number) => {
    setCheckedIngredients((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50">
      <div className="w-full max-w-md bg-white rounded-t-3xl max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img
            src={selectedMeal.image}
            alt={selectedMeal.name}
            className="w-full h-56 object-cover rounded-t-3xl"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://placehold.co/800x400/22c55e/ffffff?text=${encodeURIComponent(selectedMeal.name)}`;
            }}
          />
          <button
            onClick={() => setShowRecipeSheet(false)}
            className="absolute top-3 right-3 bg-white/90 rounded-full p-2 shadow"
          >
            <X size={18} />
          </button>
          <button
            onClick={() => toggleLikeMeal(selectedMeal.id)}
            className={`absolute top-3 left-3 rounded-full p-2 shadow ${isLiked ? "bg-red-500 text-white" : "bg-white/90 text-gray-500"}`}
          >
            <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
          </button>
        </div>

        <div className="p-5">
          <div className="flex flex-wrap gap-2 mb-3">
            {selectedMeal.dietaryTags.map((tag) => (
              <span key={tag} className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full font-medium">
                {tag}
              </span>
            ))}
          </div>

          <h2 className="text-xl font-bold text-gray-900 mb-1">{selectedMeal.name}</h2>
          <p className="text-sm text-gray-500 mb-4">{selectedMeal.ingredients.slice(0, 5).join(", ")}</p>

          <div className="flex gap-4 text-sm text-gray-600 mb-5">
            <span className="flex items-center gap-1"><Flame size={14} /> {selectedMeal.calories} kcal</span>
            <span className="flex items-center gap-1"><Clock size={14} /> {selectedMeal.cookTime}</span>
            <span className="flex items-center gap-1"><Users size={14} /> {selectedMeal.servings}</span>
          </div>

          <div className="flex gap-2 mb-4">
            {(["ingredients", "steps", "substitutes"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 rounded-xl text-sm font-semibold capitalize transition-colors ${
                  activeTab === tab ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === "ingredients" && (
            <div>
              <p className="text-sm text-gray-500 mb-3">
                {checkedIngredients.size}/{selectedMeal.ingredients.length} checked
              </p>
              {selectedMeal.ingredients.map((ing, i) => (
                <button
                  key={i}
                  onClick={() => toggleIngredient(i)}
                  className={`flex items-center gap-3 w-full p-3 rounded-xl mb-2 border-2 text-left transition-colors ${
                    checkedIngredients.has(i) ? "bg-green-50 border-green-200" : "bg-white border-gray-100"
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    checkedIngredients.has(i) ? "bg-green-500 border-green-500" : "border-gray-300"
                  }`}>
                    {checkedIngredients.has(i) && <Check size={12} className="text-white" />}
                  </div>
                  <span className="text-sm font-medium text-gray-800">{ing}</span>
                </button>
              ))}
              {selectedMeal.spices.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-bold text-gray-700 mb-2">Spices</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedMeal.spices.map((spice) => (
                      <span key={spice} className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded-full font-medium">
                        {spice}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "steps" && (
            <div className="space-y-4">
              {selectedMeal.steps.map((step, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                  <div>
                    <p className="text-sm text-gray-800 leading-relaxed">{step.text}</p>
                    <span className="text-xs text-gray-400">{step.time}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "substitutes" && (
            <div className="space-y-3">
              {selectedMeal.substitutes.map((sub, i) => (
                <div key={i} className="bg-amber-50 rounded-xl p-4">
                  <p className="text-sm font-semibold text-amber-800 mb-1">No {sub.ingredient}?</p>
                  <p className="text-sm text-amber-700">Try: {sub.alternatives.join(", ")}</p>
                </div>
              ))}
              <div className="mt-4">
                <h4 className="text-sm font-bold text-gray-700 mb-2">Health Benefits</h4>
                {selectedMeal.benefits.map((b, i) => (
                  <p key={i} className="text-sm text-gray-600 flex items-start gap-2 mb-1">
                    <span className="text-green-500 mt-0.5">-</span> {b}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
