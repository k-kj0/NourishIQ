"use client";

import { useState } from "react";
import { useApp } from "../AppContext";
import { X, Clock, Users, Flame, Plus, Volume2, VolumeX } from "lucide-react";

export function RecipeSheet() {
  const {
    selectedMeal,
    showRecipeSheet,
    setShowRecipeSheet,
    toggleLikeMeal,
    favorites,
    voiceMode,
    setVoiceMode,
    rateMeal,
    addIngredientsToGrocery,
  } = useApp();
  const [activeTab, setActiveTab] = useState("ingredients");
  const [checkedIngredients, setCheckedIngredients] = useState<Set<number>>(
    new Set()
  );
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

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const tabsList = ["ingredients", "steps", "substitutes"];

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-end justify-center">
      <div className="w-full max-w-md bg-white rounded-t-[2rem] max-h-[92vh] overflow-y-auto animate-slide-up">
        <div className="relative">
          <img
            src={selectedMeal.image}
            alt={selectedMeal.name}
            className="w-full h-56 object-cover rounded-t-[2rem]"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://placehold.co/800x400/16a34a/ffffff?text=" +
                encodeURIComponent(selectedMeal.name);
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent rounded-t-[2rem]" />

          <button
            onClick={() => setShowRecipeSheet(false)}
            className="absolute top-4 right-4 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-lg"
          >
            <X size={16} className="text-gray-700" />
          </button>

          <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
            <div>
              <span
                className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase mb-2"
                style={{ background: "rgba(255,255,255,0.9)", color: "var(--leaf-deep)" }}
              >
                {selectedMeal.category}
              </span>
              <h2 className="font-display text-xl font-extrabold text-white leading-tight">
                {selectedMeal.name}
              </h2>
            </div>
            <button
              onClick={() => {
                setVoiceMode(!voiceMode);
                if (!voiceMode) speakText(selectedMeal.name + ". " + selectedMeal.ingredients.join(". "));
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-white flex-shrink-0 tap-scale"
              style={{ background: "var(--leaf)" }}
            >
              {voiceMode ? <Volume2 size={14} /> : <VolumeX size={14} />}
              Listen
            </button>
          </div>
        </div>

        <div className="px-5 pt-4 pb-8">
          <p className="text-sm mb-4 leading-relaxed" style={{ color: "var(--color-muted-foreground)" }}>
            A hearty and protein-packed dish with fresh ingredients and bold
            flavors.
          </p>

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

          {/* Taste Rating */}
          <div className="flex gap-2 mb-4">
            {[
              { label: "Loved it", emoji: "👍", value: "loved" as const },
              { label: "Okay", emoji: "😐", value: "okay" as const },
              { label: "Never again", emoji: "👎", value: "never" as const },
            ].map((r) => (
              <button
                key={r.value}
                onClick={() => rateMeal(selectedMeal.id, r.value)}
                className={`flex-1 py-2 rounded-xl text-xs font-semibold border-2 transition-all ${
                  selectedMeal.rating === r.value
                    ? "bg-green-50 border-green-400 text-green-700"
                    : "bg-white border-gray-200 text-gray-600"
                }`}
              >
                {r.emoji} {r.label}
              </button>
            ))}
          </div>

          <div className="flex gap-1 bg-gray-100 rounded-2xl p-1 mb-5">
            {tabsList.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={
                  activeTab === tab
                    ? "flex-1 py-2.5 rounded-xl text-sm font-semibold capitalize transition-all bg-white text-gray-900 shadow-sm"
                    : "flex-1 py-2.5 rounded-xl text-sm font-semibold capitalize transition-all text-gray-500 hover:text-gray-700"
                }
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === "ingredients" && (
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-3">
                For {selectedMeal.servings}{" "}
                {selectedMeal.servings === 1 ? "serving" : "servings"}
              </p>
              {selectedMeal.ingredients.map((ing: string, i: number) => {
                const parts = ing.split("(");
                const name = parts[0].trim();
                const amount = parts[1]
                  ? parts[1].replace(")", "").trim()
                  : "";
                const isChecked = checkedIngredients.has(i);

                return (
                  <div
                    key={i}
                    onClick={() => toggleIngredient(i)}
                    className={
                      isChecked
                        ? "flex items-center justify-between p-3 rounded-2xl mb-2 cursor-pointer transition-all bg-green-50 border-2 border-green-200"
                        : "flex items-center justify-between p-3 rounded-2xl mb-2 cursor-pointer transition-all bg-gray-50 border-2 border-transparent"
                    }
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={
                          isChecked
                            ? "w-5 h-5 rounded-full border-2 flex items-center justify-center bg-green-500 border-green-500"
                            : "w-5 h-5 rounded-full border-2 flex items-center justify-center border-gray-300"
                        }
                      >
                        {isChecked && (
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="3"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                      <span
                        className={
                          isChecked
                            ? "text-sm font-medium text-gray-400 line-through"
                            : "text-sm font-medium text-gray-800"
                        }
                      >
                        {name}
                      </span>
                    </div>
                    {amount && (
                      <span className="text-sm text-gray-400">{amount}</span>
                    )}
                  </div>
                );
              })}

              <div className="mt-5 bg-gray-50 rounded-2xl p-4">
                <h4 className="text-sm font-bold text-gray-800 mb-3">
                  Nutritional Spotlight
                </h4>
                <div className="flex gap-4">
                  <div className="text-center">
                    <p className="text-xs text-gray-400 mb-1">Protein</p>
                    <p className="text-lg font-bold text-gray-800">
                      {selectedMeal.protein}g
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-400 mb-1">Carbs</p>
                    <p className="text-lg font-bold text-gray-800">
                      {selectedMeal.carbs}g
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-400 mb-1">Fats</p>
                    <p className="text-lg font-bold text-gray-800">
                      {selectedMeal.fat}g
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-400 mb-1">Fiber</p>
                    <p className="text-lg font-bold text-gray-800">4g</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 bg-amber-50 rounded-2xl p-4">
                <h4 className="text-sm font-bold text-amber-800 mb-2">
                  Sam&apos;s Tip
                </h4>
                <p className="text-sm text-amber-700">
                  Serve with whole grain toast or warm pita for a balanced meal.
                </p>
              </div>
            </div>
          )}

          {activeTab === "steps" && (
            <div className="space-y-4">
              {selectedMeal.steps.map((step, i: number) => {
                const isDone = completedSteps.has(step.step);
                const textParts = step.text.split(". ");
                const firstPart = textParts[0];
                const restPart =
                  textParts.length > 1
                    ? textParts.slice(1).join(". ")
                    : step.text;

                return (
                  <div key={i} className="flex gap-4">
                    <button
                      onClick={() => toggleStep(step.step)}
                      className={
                        isDone
                          ? "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all bg-green-500 text-white"
                          : "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all bg-green-100 text-green-700"
                      }
                    >
                      {isDone ? (
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="3"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : (
                        step.step
                      )}
                    </button>
                    <div className="flex-1">
                      <p
                        className={
                          isDone
                            ? "text-sm font-bold text-gray-400 line-through"
                            : "text-sm font-bold text-gray-800"
                        }
                      >
                        {firstPart}
                      </p>
                      <p
                        className={
                          isDone
                            ? "text-sm leading-relaxed text-gray-400 line-through"
                            : "text-sm leading-relaxed text-gray-600"
                        }
                      >
                        {restPart}
                      </p>
                      {step.time && (
                        <span className="text-xs text-gray-400 mt-1 block">
                          {step.time}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}

              <div className="mt-4 bg-orange-50 rounded-2xl p-4">
                <h4 className="text-sm font-bold text-orange-800 mb-2">
                  Make It Your Way
                </h4>
                <div className="space-y-2">
                  <p className="text-sm text-orange-700">
                    <span className="font-semibold">Spicy Kick:</span> Add extra
                    chili flakes or dried jalapeños.
                  </p>
                  <p className="text-sm text-orange-700">
                    <span className="font-semibold">Veggie Boost:</span> Add
                    spinach or kale in the last 2 minutes.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "substitutes" && (
            <div className="space-y-3">
              {selectedMeal.substitutes.map((sub, i: number) => (
                <div key={i} className="bg-amber-50 rounded-2xl p-4">
                  <p className="text-sm font-bold text-amber-800 mb-1">
                    No {sub.ingredient}?
                  </p>
                  <p className="text-sm text-amber-700">
                    Try: {sub.alternatives.join(", ")}
                  </p>
                </div>
              ))}
              <div className="mt-4">
                <h4 className="text-sm font-bold text-gray-700 mb-2">
                  Health Benefits
                </h4>
                {selectedMeal.benefits.map((b: string, i: number) => (
                  <p
                    key={i}
                    className="text-sm text-gray-600 flex items-start gap-2 mb-2"
                  >
                    <span className="text-green-500 mt-0.5">&#8226;</span> {b}
                  </p>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={() => addIngredientsToGrocery(selectedMeal.ingredients)}
            className="w-full mt-6 text-white font-bold py-4 rounded-full flex items-center justify-center gap-2 tap-scale"
            style={{ background: "var(--leaf)" }}
          >
            <Plus size={20} />
            Add to grocery list
          </button>
        </div>
      </div>
    </div>
  );
}
