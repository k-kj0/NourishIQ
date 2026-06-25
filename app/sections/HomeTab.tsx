"use client";

import { useState } from "react";
import { useApp } from "../AppContext";
import { getGreeting } from "../lib/mealData";
import { Heart, RefreshCw, Volume2, VolumeX } from "lucide-react";

export function HomeTab() {
  const {
    userProfile,
    dayPlan,
    setSelectedMeal,
    setShowRecipeSheet,
    toggleLikeMeal,
    regenerateMealForDay,
    favorites,
    loggedMeals,
    toggleLoggedMeal,
  } = useApp();

  const [speakingMealId, setSpeakingMealId] = useState<string | null>(null);
  const [showMealLog, setShowMealLog] = useState(false);
  const today = new Date();

  const stopSpeaking = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setSpeakingMealId(null);
  };

  const speakRecipe = (meal: any, stepIndex: number) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    setSpeakingMealId(meal.id);
    const text = `Recipe for ${meal.name}. ${meal.ingredients.join(", ")}. Step ${stepIndex + 1}: ${meal.steps[stepIndex]?.text || "Enjoy your meal!"}`;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.onend = () => setSpeakingMealId(null);
    window.speechSynthesis.speak(utterance);
  };

  const isFavorited = (mealId: string) => favorites.some((f) => f.id === mealId);

  return (
    <div className="flex flex-col h-full bg-gray-50 pb-4">
      <div className="px-4 pt-4 pb-2">
        <h1 className="text-xl font-bold">{getGreeting(userProfile.name || "friend")}</h1>
        <p className="text-gray-500 text-sm">
          {today.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
        </p>
      </div>

      <div className="px-4 mb-3">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-bold text-green-600">KCAL</span>
            <span className="text-gray-500">{dayPlan.targetCalories} target</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: "60%" }} />
          </div>
        </div>
      </div>

      <div className="px-4 mb-3 flex gap-2">
        <button
          onClick={() => setShowMealLog(!showMealLog)}
          className="flex-1 py-2.5 rounded-xl bg-white border border-gray-200 font-bold text-sm text-gray-700"
        >
          Log meals
        </button>
        <button className="flex-1 py-2.5 rounded-xl bg-green-500 text-white font-bold text-sm">
          Craving?
        </button>
      </div>

      <div className="px-4 flex-1 overflow-y-auto">
        {dayPlan.meals.map((meal) => (
          <div
            key={meal.id}
            className="bg-white rounded-2xl overflow-hidden shadow-sm mb-3 cursor-pointer"
            onClick={() => {
              setSelectedMeal(meal);
              setShowRecipeSheet(true);
            }}
          >
            <div className="relative h-40 bg-gray-200">
              <img
                src={meal.image}
                alt={meal.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://placehold.co/800x400/22c55e/ffffff?text=${encodeURIComponent(meal.name)}`;
                }}
              />
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={(e) => { e.stopPropagation(); toggleLikeMeal(meal.id); }}
                  className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-sm"
                >
                  <Heart size={14} className={isFavorited(meal.id) ? "text-red-500 fill-red-500" : "text-gray-400"} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); regenerateMealForDay(meal.id, meal.category); }}
                  className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-sm"
                >
                  <RefreshCw size={14} className="text-gray-600" />
                </button>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (speakingMealId === meal.id) stopSpeaking();
                  else speakRecipe(meal, 0);
                }}
                className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-sm"
              >
                {speakingMealId === meal.id ? <VolumeX size={14} className="text-green-600" /> : <Volume2 size={14} className="text-green-600" />}
              </button>
            </div>
            <div className="p-3">
              <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full uppercase">{meal.category}</span>
              <h3 className="font-bold mt-1">{meal.name}</h3>
              <p className="text-gray-500 text-xs mt-0.5">{meal.ingredients.slice(0, 3).join(" ")}{meal.ingredients.length > 3 ? "..." : ""}</p>
              <div className="flex gap-3 mt-2 text-xs text-gray-500">
                <span>{meal.calories} kcal</span>
                <span>P {meal.protein}g</span>
                <span>C {meal.carbs}g</span>
                <span>F {meal.fat}g</span>
              </div>
            </div>
            {showMealLog && (
              <button
                onClick={(e) => { e.stopPropagation(); toggleLoggedMeal(meal.id); }}
                className={`w-full py-2 text-xs font-bold ${loggedMeals[meal.id] ? "bg-green-500 text-white" : "bg-gray-100 text-gray-500"}`}
              >
                {loggedMeals[meal.id] ? "Logged!" : "Log this meal"}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
