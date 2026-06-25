"use client";

import { useState } from "react";
import { useApp } from "../AppContext";
import { X, Heart, Clock, Users, Flame, ChevronRight, Plus } from "lucide-react";

export function RecipeSheet() {
  const { selectedMeal, showRecipeSheet, setShowRecipeSheet, toggleLikeMeal, favorites } = useApp();
  const [activeTab, setActiveTab] = useState<"ingredients" | "steps" | "substitutes">("ingredients");
  const [checkedIngredients, setCheckedIngredients] = useState<Set<number>>(new Set());
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

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

  const toggleStep = (stepNum: number) => {
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(stepNum)) next.delete(stepNum);
      else next.add(stepNum);
      return next;
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-end justify-center">
      <div className="w-full max-w-md bg-white rounded-t-[2rem] max-h-[92vh] overflow-y-auto animate-slide-up">
        {/* Image Header */}
        <div className="relative">
          <img
            src={selectedMeal.image}
            alt={selectedMeal.name}
            className="w-full h-56 object-cover rounded-t-[2rem]"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://placehold.co/800x400/22c55e/ffffff?text=${encodeURIComponent(selectedMeal.name)}`;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-t-[2rem]" />

          {/* Close button */}
          <button
            onClick={() => setShowRecipeSheet(false)}
            className="absolute top-4 right-4 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-lg"
          >
            <X size={16} className="text-gray-700" />
          </button>
        </div>

        {/* Content */}
        <div className="px-5 pt-4 pb-8">
          {/* Category & Title */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-green-500 text-xs">✦</span>
            <span className="text-xs font-bold text-green-600 uppercase tracking-wider">{selectedMeal.category}</span>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedMeal.name}</h2>
          <p className="text-sm text-gray-500 mb-4 leading-relaxed">
            {selectedMeal.description || `A hearty and protein-packed dish with fresh ingredients and bold flavors.`}
          </p>

          {/* Meta info */}
          <div className="flex items-center gap-4 mb-5">
            <div className="flex items-center gap-1.5 text-sm text-gray-600">
              <Clock size={16} className="text-green-500" />
              <span>{selectedMeal.cookTime}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-600">
              <Users size={16} className="text-green-500" />
              <span>{selectedMeal.servings} servings</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-600">
              <Flame size={16} className="text-orange-500" />
              <span>{selectedMeal.calories} kcal</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 bg-gray-100 rounded-2xl p-1 mb-5">
            {(["ingredients", "steps", "substitutes"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold capitalize transition-all ${
                  activeTab === tab
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Ingredients Tab */}
          {activeTab === "ingredients" && (
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-3">
                For {selectedMeal.servings} {selectedMeal.servings === 1 ? "serving" : "servings"}
              </p>
              {selectedMeal.ingredients.map((ing, i) => {
                const parts = ing.split("(");
                const name = parts[0].trim();
                const amount = parts[1] ? parts[1].replace(")", "").trim() : "";

                return (
                  <div
                    key={i}
                    onClick={() => toggleIngredient(i)}
                    className={`flex items-center justify-between p-3 rounded-2xl mb-2 cursor-pointer transition-all ${
                      checkedIngredients.has(i)
                        ? "bg-green-50 border-2 border-green-200"
                        : "bg-gray-50 border-2 border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        checkedIngredients.has(i) ? "bg-green-500 border-green-500" : "border-gray-300"
                      }`}>
                        {checkedIngredients.has(i) && (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                      <span className={`text-sm font-medium ${checkedIngredients.has(i) ? "text-gray-400 line-through" : "text-gray-800"}`}>
                        {name}
                      </span>
                    </div>
                    {amount && <span className="text-sm text-gray-400">{amount}</span>}
                  </div>
                );
              })}

              {/* Nutritional Spotlight */}
              <div className="mt-5 bg-gray-50 rounded-2xl p-4">
                <h4 className="text-sm font-bold text-gray-800 mb-3">Nutritional Spotlight</h4>
                <div className="flex gap-4">
                  <div className="text-center">
                    <p className="text-xs text-gray-400 mb-1">Protein</p>
                    <p className="text-lg font-bold text-gray-800">{selectedMeal.protein}g</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-400 mb-1">Carbs</p>
                    <p className="text-lg font-bold text-gray-800">{selectedMeal.carbs}g</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-400 mb-1">Fats</p>
                    <p className="text-lg font-bold text-gray-800">{selectedMeal.fat}g</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-400 mb-1">Fiber</p>
                    <p className="text-lg font-bold text-gray-800">4g</p>
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div className="mt-4 bg-amber-50 rounded-2xl p-4">
                <h4 className="text-sm font-bold text-amber-800 mb-2">Sam&apos;s Tip</h4>
                <p className="text-sm text-amber-700">Serve with whole grain toast or warm pita for a balanced meal.</p>
              </div>
            </div>
          )}

          {/* Steps Tab */}
          {activeTab === "steps" && (
            <div className="space-y-4">
              {selectedMeal.steps.map((step, i) => (
                <div key={i} className="flex gap-4">
                  <button
                    onClick={() => toggleStep(step.step)}
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                      completedSteps.has(step.step)
                        ? "bg-green-500 text-white"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {completedSteps.has(step.step) ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      step.step
                    )}
                  </button>
                  <div className="flex-1">
                    <h4 className={`text-sm font-bold mb-1 ${completedSteps.has(step.step) ? "text-gray-400 line-through" : "text-gray-800"}`}>
                      {step.text.split(". ")[0]}
                    </h4>
                    <p className={`text-sm leading-relaxed ${completedSteps.has(step.step) ? "text-gray-400 line-through" : "text-gray-600"}`}>
                      {step.text.includes(". ") ? step.text.split(". ").slice(1).join(". ") : step.text}
                    </p>
                    <span className="text-xs text-gray-400 mt-1 block">{step.time}</span>
                  </div>
                </div>
              ))}

              {/* Make It Your Way */}
              <div className="mt-4 bg-orange-50 rounded-2xl p-4">
                <h4 className="text-sm font-bold text-orange-800 mb-2">Make It Your Way</h4>
                <div className="space-y-2">
                  <p className="text-sm text-orange-700">
                    <span className="font-semibold">Spicy Kick:</span> Add extra chili flakes or dried jalapeños.
                  </p>
                  <p className="text-sm text-orange-700">
                    <span className="font-semibold">Veggie Boost:</span> Add spinach or kale in the last 2 minutes.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Substitutes Tab */}
          {activeTab === "substitutes" && (
            <div className="space-y-3">
              {selectedMeal.substitutes.map((sub, i) => (
                <div key={i} className="bg-amber-50 rounded-2xl p-4">
                  <p className="text-sm font-bold text-amber-800 mb-1">No {sub.ingredient}?</p>
                  <p className="text-sm text-amber-700">Try: {sub.alternatives.join(", ")}</p>
                </div>
              ))}
              <div className="mt-4">
                <h4 className="text-sm font-bold text-gray-700 mb-2">Health Benefits</h4>
                {selectedMeal.benefits.map((b, i) => (
                  <p key={i} className="text-sm text-gray-600 flex items-start gap-2 mb-2">
                    <span className="text-green-500 mt-0.5">•</span> {b}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Add to Meals Button */}
          <button className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors">
            <Plus size={20} />
            Add to My Meals
          </button>
        </div>
      </div>
    </div>
  );
}
