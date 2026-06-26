"use client";

import { useState } from "react";
import { useApp } from "../AppContext";
import { RecipeSheet } from "../components/RecipeSheet";
import { Volume2, Bell, ChevronDown, RotateCcw } from "lucide-react";

const categoryConfig: Record<string, { bg: string; text: string; label: string }> = {
  breakfast: { bg: "bg-orange-400", text: "text-white", label: "BREAKFAST" },
  lunch: { bg: "bg-lime-500", text: "text-white", label: "LUNCH" },
  dinner: { bg: "bg-indigo-500", text: "text-white", label: "DINNER" },
  snack: { bg: "bg-rose-400", text: "text-white", label: "SNACK" },
  beverage: { bg: "bg-sky-400", text: "text-white", label: "BEVERAGE" },
};

const nutrients = [
  { label: "Iron", value: "12.5", unit: "mg", color: "text-red-500", dot: "bg-red-500" },
  { label: "Magnesium", value: "210", unit: "mg", color: "text-purple-500", dot: "bg-purple-500" },
  { label: "Zinc", value: "8.2", unit: "mg", color: "text-green-500", dot: "bg-green-500" },
  { label: "Calcium", value: "320", unit: "mg", color: "text-blue-500", dot: "bg-blue-500" },
  { label: "Potassium", value: "1200", unit: "mg", color: "text-amber-500", dot: "bg-amber-500" },
  { label: "Vitamin D", value: "15", unit: "mcg", color: "text-yellow-500", dot: "bg-yellow-500" },
];

export function HomeTab() {
  const {
    userProfile,
    selectedDate,
    setSelectedDate,
    dayPlan,
    setSelectedMeal,
    setShowRecipeSheet,
    regenerateMealForSlot,
    toggleLikeMeal,
    favorites,
  } = useApp();

  const [showNutrientTip, setShowNutrientTip] = useState(false);

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() - 3 + i);
    return d;
  });

  const formatDate = (d: Date) => ({
    dayNum: d.getDate(),
    dayName: d.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase().slice(0, 3),
    isToday: d.toDateString() === new Date().toDateString(),
    isSelected: d.toDateString() === selectedDate.toDateString(),
  });

  return (
    <div className="max-w-md mx-auto bg-[#fafaf8] min-h-screen pb-24">
      {/* Header */}
      <div className="px-5 pt-5 pb-3">
        <div className="flex items-center justify-between mb-1">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Hey, {userProfile.name || "Sam"}
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Fuel right. Feel good. Crush your goals. <span className="text-purple-400">✦</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Volume2 size={20} className="text-gray-600" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 relative">
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
          </div>
        </div>
      </div>

      {/* Date & Nutrients Card */}
      <div className="mx-4 bg-white rounded-3xl shadow-sm p-4 mb-4">
        {/* Date selector */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-green-500">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </span>
          <span className="text-sm font-semibold text-gray-700">
            {selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
          </span>
          <ChevronDown size={16} className="text-gray-400" />
        </div>

        {/* Nutrients */}
        <div className="grid grid-cols-6 gap-2 mb-4">
          {nutrients.map((n) => (
            <div key={n.label} className="text-center">
              <div className="flex items-center justify-center gap-0.5 mb-1">
                <span className={`w-1.5 h-1.5 rounded-full ${n.dot}`} />
                <span className="text-[9px] text-gray-400">{n.label}</span>
              </div>
              <p className={`text-xs font-bold ${n.color}`}>{n.value}</p>
              <p className="text-[8px] text-gray-400">{n.unit}</p>
            </div>
          ))}
        </div>

        {/* Day picker */}
        <div className="flex items-center justify-between">
          <button className="p-1 text-gray-400">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <div className="flex gap-1">
            {days.map((d, i) => {
              const info = formatDate(d);
              return (
                <button
                  key={i}
                  onClick={() => setSelectedDate(d)}
                  className={`flex flex-col items-center py-2 px-2.5 rounded-2xl min-w-[44px] transition-all ${
                    info.isSelected
                      ? "bg-green-500 text-white shadow-lg shadow-green-200"
                      : info.isToday
                      ? "bg-green-50 text-green-600"
                      : "text-gray-400 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-[10px] font-medium opacity-80">{info.dayName}</span>
                  <span className="text-lg font-bold">{info.dayNum}</span>
                </button>
              );
            })}
          </div>
          <button className="p-1 text-gray-400">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Meal Cards */}
      <div className="px-4 space-y-3">
        {dayPlan.meals.map((meal, index) => {
          const config = categoryConfig[meal.category] || categoryConfig.breakfast;
          const isLiked = favorites.some((m) => m.id === meal.id);

          return (
            <div
              key={meal.id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm animate-pop"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex">
                {/* Category Badge */}
                <div className={`${config.bg} w-16 flex flex-col items-center justify-center text-white py-4 relative`}>
                  {meal.category === "breakfast" && (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mb-1">
                      <circle cx="12" cy="12" r="5" />
                      <line x1="12" y1="1" x2="12" y2="3" />
                      <line x1="12" y1="21" x2="12" y2="23" />
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                      <line x1="1" y1="12" x2="3" y2="12" />
                      <line x1="21" y1="12" x2="23" y2="12" />
                      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                    </svg>
                  )}
                  {meal.category === "lunch" && (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mb-1">
                      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
                      <path d="M7 2v20" />
                      <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
                    </svg>
                  )}
                  {meal.category === "dinner" && (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mb-1">
                      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                    </svg>
                  )}
                  {meal.category === "snack" && (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mb-1">
                      <path d="M2 12h20" />
                      <path d="M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8" />
                      <path d="m4 8 16-4" />
                      <path d="m8.86 6.78-.45-1.81a2 2 0 0 1 1.45-2.43l1.94-.48a2 2 0 0 1 2.43 1.46l.45 1.8" />
                    </svg>
                  )}
                  {meal.category === "beverage" && (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mb-1">
                      <path d="M12 2.69l5.74 5.88a1 1 0 0 1 .26.73v8.7a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-8.7a1 1 0 0 1 .26-.73L12 2.69z" />
                    </svg>
                  )}
                  <span className="text-[9px] font-bold tracking-wider">{config.label}</span>
                </div>

                {/* Meal Content */}
                <div className="flex-1 p-3">
                  <div className="flex gap-3">
                    <img
                      src={meal.image}
                      alt={meal.name}
                      className="w-20 h-20 rounded-2xl object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://placehold.co/200x200/e8e8e8/666666?text=${encodeURIComponent(meal.name)}`;
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-sm font-bold text-gray-900 leading-tight">{meal.name}</h3>
                          <p className="text-[11px] text-gray-400 mt-0.5">
                            {meal.ingredients.slice(0, 2).join(", ")}{meal.ingredients.length > 2 ? "..." : ""}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 ml-2">
                          <button
                            onClick={() => toggleLikeMeal(meal)}
                            className={`${isLiked ? "text-red-400" : "text-gray-300"}`}
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                            </svg>
                          </button>
                          <button className="text-green-400">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Macros */}
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-xs font-bold text-gray-800">{meal.calories} <span className="text-[10px] font-normal text-gray-400">kcal</span></span>
                        <span className="text-[11px] font-medium text-orange-400">{meal.protein}g <span className="text-[9px] text-gray-400">protein</span></span>
                        <span className="text-[11px] font-medium text-amber-400">{meal.carbs}g <span className="text-[9px] text-gray-400">carbs</span></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Nutrient Tip Card */}
      <div className="mx-4 mt-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl p-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="indigo" strokeWidth="2">
              <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 16a1 1 0 1 1 1-1 1 1 0 0 1-1 1zm1-5V7a1 1 0 0 0-2 0v6a1 1 0 0 0 2 0z" />
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-800">Nutrients that can support better sleep & weight loss</h4>
            <p className="text-[11px] text-gray-500 mt-0.5">Based on medical research</p>
            <div className="flex gap-3 mt-2">
              {[
                { icon: "🌿", name: "Magnesium", desc: "Helps muscles relax & improve sleep" },
                { icon: "🍃", name: "Zinc", desc: "Regulates metabolism & promotes deeper sleep" },
                { icon: "💎", name: "Calcium", desc: "Helps melatonin production for deeper rest" },
                { icon: "☀️", name: "Vitamin D", desc: "Improves sleep quality & mood" },
                { icon: "💧", name: "Iron", desc: "Helps reduce fatigue & supports weight loss" },
              ].map((item) => (
                <div key={item.name} className="text-center">
                  <span className="text-lg">{item.icon}</span>
                  <p className="text-[9px] font-bold text-gray-700 mt-0.5">{item.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <p className="text-[10px] text-gray-400 mt-3 flex items-center gap-1">
          <span className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center text-[8px]">i</span>
          A balanced diet with these nutrients, regular workouts & quality sleep can help you improve sleep and lose weight.
        </p>
      </div>

      <RecipeSheet />
    </div>
  );
}
