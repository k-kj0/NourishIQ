"use client";

import { useState, useEffect } from "react";
import { useApp } from "../AppContext";
import { X, Clock, Users, Flame, Plus, Heart, Volume2 } from "lucide-react";

export function RecipeSheet() {
  const { selectedMeal, showRecipeSheet, setShowRecipeSheet, toggleLikeMeal, favorites } = useApp();
  const [activeTab, setActiveTab] = useState("ingredients");
  const [checkedIngredients, setCheckedIngredients] = useState(new Set<number>());
  const [completedSteps, setCompletedSteps] = useState(new Set<number>());
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    setActiveTab("ingredients");
    setCheckedIngredients(new Set());
    setCompletedSteps(new Set());
  }, [selectedMeal]);

  if (!selectedMeal || !showRecipeSheet) return null;

  const isLiked = favorites.some((m) => m.id === selectedMeal.id);

  const toggleIngredient = (i: number) => {
    setCheckedIngredients((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  const toggleStep = (n: number) => {
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      next.has(n) ? next.delete(n) : next.add(n);
      return next;
    });
  };

  const speakContent = () => {
    if ("speechSynthesis" in window) {
      if (speaking) {
        window.speechSynthesis.cancel();
        setSpeaking(false);
        return;
      }
      const text = activeTab === "ingredients"
        ? `Ingredients for ${selectedMeal.name}. For ${selectedMeal.servings} servings. ${selectedMeal.ingredients.join(". ")}`
        : activeTab === "steps"
        ? `Steps to cook ${selectedMeal.name}. ${selectedMeal.steps.map((s) => `Step ${s.step}: ${s.text}`).join(". ")}`
        : `Benefits of ${selectedMeal.name}. ${selectedMeal.benefits.join(". ")}`;
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.onend = () => setSpeaking(false);
      setSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  const categoryColor: Record<string, string> = {
    BREAKFAST: "text-orange-500 bg-orange-50",
    LUNCH: "text-green-600 bg-green-50",
    DINNER: "text-purple-600 bg-purple-50",
    SNACK: "text-pink-600 bg-pink-50",
    BEVERAGE: "text-blue-600 bg-blue-50",
  };
  const catClass = categoryColor[selectedMeal.category] || "text-green-600 bg-green-50";

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      style={{ background: "rgba(0,0,0,0.5)" }}
      onClick={() => setShowRecipeSheet(false)}
    >
      <div
        className="w-full max-w-md bg-white rounded-t-[2rem] max-h-[95vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative">
          <img
            src={selectedMeal.image}
            alt={selectedMeal.name}
            className="w-full h-52 object-cover rounded-t-[2rem]"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://placehold.co/800x400/22c55e/ffffff?text=${encodeURIComponent(selectedMeal.name)}`;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-t-[2rem]" />
          <button
            onClick={() => setShowRecipeSheet(false)}
            className="absolute top-4 right-4 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow"
          >
            <X size={16} className="text-gray-700" />
          </button>
        </div>

        {/* Content */}
        <div className="px-5 pt-4 pb-24">
          {/* Category & title */}
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${catClass}`}>
              ✦ {selectedMeal.category}
            </span>
          </div>
          <div className="flex items-start justify-between mb-2">
            <h2 className="text-xl font-bold text-gray-900 flex-1 pr-2">{selectedMeal.name}</h2>
            <button
              onClick={() => toggleLikeMeal(selectedMeal)}
              className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center"
            >
              <Heart
                size={18}
                className={isLiked ? "fill-red-500 text-red-500" : "text-gray-400"}
              />
            </button>
          </div>
          <p className="text-sm text-gray-500 mb-4 leading-relaxed">
            A hearty and protein-packed dish with fresh ingredients and bold flavors.
          </p>

          {/* Stats */}
          <div className="flex items-center gap-4 mb-5">
            <div className="flex items-center gap-1.5 text-sm text-gray-600">
              <Clock size={15} className="text-green-500" />
              <span>{selectedMeal.cookTime}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-600">
              <Users size={15} className="text-green-500" />
              <span>{selectedMeal.servings} servings</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-600">
              <Flame size={15} className="text-orange-500" />
              <span>{selectedMeal.calories} kcal</span>
            </div>
          </div>

          {/* Tab bar */}
          <div className="flex gap-1 bg-gray-100 rounded-2xl p-1 mb-5">
            {["ingredients", "steps", "substitutes"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold capitalize transition-all ${
                  activeTab === tab
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Speaker button */}
          <div className="flex justify-end mb-3">
            <button
              onClick={speakContent}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                speaking ? "bg-green-500 text-white" : "bg-gray-100 text-gray-600"
              }`}
            >
              <Volume2 size={14} />
              {speaking ? "Stop" : "Listen"}
            </button>
          </div>

          {/* Ingredients Tab */}
          {activeTab === "ingredients" && (
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-3">
                For {selectedMeal.servings} {selectedMeal.servings === 1 ? "serving" : "servings"}
              </p>
              {selectedMeal.ingredients.map((ing, i) => {
                const parts = ing.split("(");
                const ingName = parts[0].trim();
                const amount = parts[1] ? parts[1].replace(")", "").trim() : "";
                const isChecked = checkedIngredients.has(i);
                return (
                  <div
                    key={i}
                    onClick={() => toggleIngredient(i)}
                    className={`flex items-center justify-between p-3 rounded-2xl mb-2 cursor-pointer transition-all border-2 ${
                      isChecked ? "bg-green-50 border-green-200" : "bg-gray-50 border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isChecked ? "bg-green-500 border-green-500" : "border-gray-300"}`}>
                        {isChecked && (
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                      <span className={`text-sm font-medium ${isChecked ? "text-gray-400 line-through" : "text-gray-800"}`}>{ingName}</span>
                    </div>
                    {amount && <span className="text-sm text-gray-400">{amount}</span>}
                  </div>
                );
              })}

              {/* Nutrition */}
              <div className="mt-5 bg-gray-50 rounded-2xl p-4">
                <h4 className="text-sm font-bold text-gray-800 mb-3">Nutritional Spotlight</h4>
                <div className="flex gap-6">
                  {[
                    { label: "Protein", val: `${selectedMeal.protein}g`, color: "text-green-600" },
                    { label: "Carbs", val: `${selectedMeal.carbs}g`, color: "text-orange-500" },
                    { label: "Fats", val: `${selectedMeal.fat}g`, color: "text-yellow-500" },
                    { label: "Fiber", val: "4g", color: "text-blue-500" },
                  ].map((n) => (
                    <div key={n.label} className="text-center">
                      <p className="text-xs text-gray-400 mb-1">{n.label}</p>
                      <p className={`text-lg font-bold ${n.color}`}>{n.val}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 bg-amber-50 rounded-2xl p-4">
                <h4 className="text-sm font-bold text-amber-800 mb-2">Sam&apos;s Tip 💡</h4>
                <p className="text-sm text-amber-700">Serve with whole grain toast or warm pita for a balanced meal.</p>
              </div>
            </div>
          )}

          {/* Steps Tab */}
          {activeTab === "steps" && (
            <div className="space-y-4">
              {selectedMeal.steps.map((step, i) => {
                const isDone = completedSteps.has(step.step);
                const parts = step.text.split(". ");
                const title = parts[0];
                const desc = parts.length > 1 ? parts.slice(1).join(". ") : step.text;
                return (
                  <div key={i} className="flex gap-4">
                    <button
                      onClick={() => toggleStep(step.step)}
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                        isDone ? "bg-green-500 text-white" : "bg-green-100 text-green-700"
                      }`}
                    >
                      {isDone ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : step.step}
                    </button>
                    <div className="flex-1">
                      <p className={`text-sm font-bold ${isDone ? "text-gray-400 line-through" : "text-gray-800"}`}>{title}</p>
                      <p className={`text-sm leading-relaxed ${isDone ? "text-gray-400 line-through" : "text-gray-600"}`}>{desc}</p>
                      {step.time && <span className="text-xs text-gray-400 mt-1 block">⏱ {step.time}</span>}
                    </div>
                  </div>
                );
              })}
              <div className="mt-4 bg-orange-50 rounded-2xl p-4">
                <h4 className="text-sm font-bold text-orange-800 mb-2">Make It Your Way 🔥</h4>
                <p className="text-sm text-orange-700 mb-1"><span className="font-semibold">Spicy Kick:</span> Add extra chili flakes or dried jalapeños.</p>
                <p className="text-sm text-orange-700"><span className="font-semibold">Veggie Boost:</span> Add spinach or kale in the last 2 minutes.</p>
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
                <h4 className="text-sm font-bold text-gray-700 mb-2">Health Benefits 🌱</h4>
                {selectedMeal.benefits.map((b, i) => (
                  <p key={i} className="text-sm text-gray-600 flex items-start gap-2 mb-2">
                    <span className="text-green-500 mt-0.5">•</span> {b}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Add to meals button */}
        <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto px-5 pb-6 bg-white pt-2">
          <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-green-200">
            <Plus size={20} />
            Add to My Meals
          </button>
        </div>
      </div>
    </div>
  );
}
