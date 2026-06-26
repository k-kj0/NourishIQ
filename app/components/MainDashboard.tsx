"use client";

import { useApp, MEALS, Meal } from "../AppContext";
import { Bell, ChevronDown, ChevronLeft, ChevronRight, Volume2, Heart, Home, Compass, Refrigerator, Star, Target, ShoppingCart, Check, X } from "lucide-react";
import { useState } from "react";
import { ExploreTab } from "../sections/ExploreTab";
import { FridgeTab } from "../sections/FridgeTab";
import { FavoritesTab } from "../sections/FavoritesTab";
import { ProfileTab } from "../sections/ProfileTab";
import { WEEKLY_CHALLENGE } from "../lib/mealData";

const DAYS = [
  { day: "MON", date: 22 },
  { day: "TUE", date: 23 },
  { day: "WED", date: 24 },
  { day: "THU", date: 25 },
  { day: "FRI", date: 26 },
  { day: "SAT", date: 27 },
  { day: "SUN", date: 28 },
];

const NUTRIENTS = [
  { name: "Iron", val: "12.5", unit: "mg", icon: "🔴", color: "#e74c3c" },
  { name: "Magnesium", val: "210", unit: "mg", icon: "🟣", color: "#8e44ad" },
  { name: "Zinc", val: "8.2", unit: "mg", icon: "🛡️", color: "#27ae60" },
  { name: "Calcium", val: "320", unit: "mg", icon: "💙", color: "#3498db" },
  { name: "Potassium", val: "1200", unit: "mg", icon: "⚡", color: "#f39c12" },
  { name: "Vitamin D", val: "15", unit: "mcg", icon: "☀️", color: "#f1c40f" },
];

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  BREAKFAST: { bg: "#FF8C42", text: "white" },
  LUNCH: { bg: "#4CAF50", text: "white" },
  DINNER: { bg: "#7C5CBF", text: "white" },
  SNACK: { bg: "#E91E8C", text: "white" },
  BEVERAGE: { bg: "#00BCD4", text: "white" },
};

function MealRow({ meal }: { meal: Meal }) {
  const { setSelectedMeal, setShowRecipeSheet, favorites, toggleLikeMeal } = useApp();
  const isLiked = favorites.some((m) => m.id === meal.id);
  const cat = CATEGORY_COLORS[meal.category] || { bg: "#4CAF50", text: "white" };

  const speakMeal = (e: React.MouseEvent) => {
    e.stopPropagation();
    if ("speechSynthesis" in window) {
      const text = `${meal.name}. ${meal.calories} calories. ${meal.protein} grams protein. ${meal.carbs} grams carbs. Cook time ${meal.cookTime}.`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  if (meal.category === "BEVERAGE") {
    return (
      <div
        className="flex items-center gap-3 py-3 cursor-pointer"
        onClick={() => { setSelectedMeal(meal); setShowRecipeSheet(true); }}
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-xs font-bold"
          style={{ background: cat.bg, color: cat.text }}
        >
          <span style={{ fontSize: 10, lineHeight: 1.2, textAlign: "center" }}>{meal.category}</span>
        </div>
        <div className="flex-1 min-w-0">
          <img
            src={meal.image}
            alt={meal.name}
            className="w-full h-12 object-cover rounded-xl mb-1"
            onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/400x100/22c55e/ffffff?text=${encodeURIComponent(meal.name)}`; }}
          />
          <p className="text-sm font-semibold text-gray-900 truncate">{meal.name}</p>
          <p className="text-xs text-blue-500">Hydrating &amp; refreshing</p>
        </div>
        <button onClick={speakMeal} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
          <Volume2 size={14} className="text-green-500" />
        </button>
      </div>
    );
  }

  return (
    <div
      className="flex items-center gap-3 py-2.5 cursor-pointer"
      onClick={() => { setSelectedMeal(meal); setShowRecipeSheet(true); }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0"
        style={{ background: cat.bg, color: cat.text, fontSize: 9, padding: 4, lineHeight: 1.2, textAlign: "center" }}
      >
        {meal.category}
      </div>
      <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
        <img
          src={meal.image}
          alt={meal.name}
          className="w-full h-full object-cover"
          onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/100x100/22c55e/ffffff?text=meal`; }}
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900 truncate">{meal.name}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs font-bold text-orange-500">{meal.calories}</span>
          <span className="text-xs text-gray-400">kcal</span>
          <span className="text-xs font-bold text-green-600">{meal.protein}g</span>
          <span className="text-xs text-gray-400">protein</span>
          <span className="text-xs font-bold text-blue-500">{meal.carbs}g</span>
          <span className="text-xs text-gray-400">carbs</span>
        </div>
      </div>
      <button onClick={speakMeal} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
        <Volume2 size={14} className="text-green-500" />
      </button>
    </div>
  );
}

export function MainDashboard() {
  const { profile, setActiveTab, activeTab, weeklyGoal, logGoalProgress, groceryList, toggleGroceryItem, selectedDayIndex, setSelectedDayIndex, setSelectedMeal, setShowRecipeSheet } = useApp();
  const [showGrocery, setShowGrocery] = useState(false);
  const userName = profile.name;

  const tabs = [
    { id: "Home", icon: Home, label: "Home" },
    { id: "Explore", icon: Compass, label: "Explore" },
    { id: "Fridge", icon: Refrigerator, label: "Fridge" },
    { id: "Favorites", icon: Heart, label: "Favorites" },
    { id: "Me", icon: Star, label: "Me" },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-md mx-auto relative">
      <div className="flex-1 overflow-y-auto pb-20">

        {activeTab === "Home" && (
          <>
            {/* Header */}
            <div className="px-4 pt-5 pb-2">
              <div className="flex items-center justify-between mb-1">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Hey, {userName} 👋</h1>
                  <p className="text-sm text-gray-500">Fuel right. Feel good. Crush your goals. <span className="text-purple-500">✦</span></p>
                </div>
                <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center relative">
                  <Bell size={20} className="text-gray-700" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                </button>
              </div>
            </div>

            {/* Date & nutrients */}
            <div className="px-4 mb-4">
              <button className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 mb-3">
                📅 {DAYS[selectedDayIndex].day}, June {DAYS[selectedDayIndex].date}
                <ChevronDown size={16} className="text-gray-400" />
              </button>
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {NUTRIENTS.map((n) => (
                  <div key={n.name} className="flex-shrink-0 bg-white border border-gray-100 rounded-2xl p-3 min-w-[80px] shadow-sm">
                    <div className="flex items-center gap-1 mb-1">
                      <span className="text-xs">{n.icon}</span>
                      <span className="text-xs text-gray-500 font-medium">{n.name}</span>
                    </div>
                    <p className="text-base font-bold text-gray-900">{n.val}</p>
                    <p className="text-xs text-gray-400">{n.unit}</p>
                    <div className="mt-2 h-1 rounded-full bg-gray-100">
                      <div className="h-full rounded-full w-2/3" style={{ background: n.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Calendar */}
            <div className="px-4 mb-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setSelectedDayIndex(Math.max(0, selectedDayIndex - 1))}
                  className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center"
                >
                  <ChevronLeft size={14} className="text-gray-600" />
                </button>
                <div className="flex gap-2">
                  {DAYS.map((d, i) => {
                    const isSelected = i === selectedDayIndex;
                    return (
                      <button
                        key={d.date}
                        onClick={() => setSelectedDayIndex(i)}
                        className={`flex flex-col items-center px-2 py-2 rounded-2xl transition-all ${isSelected ? "bg-green-500 text-white" : "text-gray-500"}`}
                      >
                        <span className="text-xs font-medium">{d.day}</span>
                        <span className={`text-sm font-bold ${isSelected ? "text-white" : "text-gray-800"}`}>{d.date}</span>
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white mt-0.5" />}
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={() => setSelectedDayIndex(Math.min(DAYS.length - 1, selectedDayIndex + 1))}
                  className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center"
                >
                  <ChevronRight size={14} className="text-gray-600" />
                </button>
              </div>
            </div>

            {/* Weekly Goal */}
            <div className="px-4 mb-4">
              <div className="card-soft p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Target size={16} style={{ color: "var(--brand-deep)" }} />
                    <span className="text-sm font-bold text-gray-800">{weeklyGoal.label}</span>
                  </div>
                  <span className="text-xs font-semibold text-gray-500">
                    {weeklyGoal.current}/{weeklyGoal.target} {weeklyGoal.unit}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-gray-100 overflow-hidden mb-3">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${Math.min(100, (weeklyGoal.current / weeklyGoal.target) * 100)}%`, background: "var(--gradient-cta)" }}
                  />
                </div>
                <button
                  onClick={() => logGoalProgress(50)}
                  className="w-full py-2 rounded-xl text-sm font-semibold"
                  style={{ background: "var(--brand-soft)", color: "var(--brand-deep)" }}
                >
                  + Log progress
                </button>
              </div>
            </div>

            {/* Weekly Challenge */}
            <div className="px-4 mb-4">
              <p className="text-sm font-bold text-gray-800 mb-2">{WEEKLY_CHALLENGE.weekLabel}</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Sweet Treat", meal: WEEKLY_CHALLENGE.sweet },
                  { label: "Savory Treat", meal: WEEKLY_CHALLENGE.savory },
                ].map(({ label, meal }) => (
                  <button
                    key={meal.id}
                    onClick={() => { setSelectedMeal(meal as any); setShowRecipeSheet(true); }}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm text-left"
                  >
                    <img src={meal.image} alt={meal.name} className="w-full h-20 object-cover" />
                    <div className="p-2.5">
                      <p className="text-[10px] font-bold uppercase" style={{ color: "var(--accent-pink)" }}>{label}</p>
                      <p className="text-xs font-semibold text-gray-800 truncate">{meal.name}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Grocery list trigger */}
            <div className="px-4 mb-4">
              <button
                onClick={() => setShowGrocery(true)}
                className="w-full flex items-center justify-between card-soft p-4"
              >
                <div className="flex items-center gap-2">
                  <ShoppingCart size={16} className="text-orange-500" />
                  <span className="text-sm font-bold text-gray-800">Grocery list</span>
                </div>
                <span className="text-xs text-gray-500">
                  {groceryList.filter((g) => g.checked).length}/{groceryList.length} done
                </span>
              </button>
            </div>

            {/* Meal list */}
            <div className="px-4">
              <div className="divide-y divide-gray-50">
                {MEALS.map((meal) => (
                  <MealRow key={meal.id} meal={meal} />
                ))}
              </div>
            </div>

            {/* Sleep & nutrients card */}
            <div className="mx-4 mt-4 bg-gradient-to-br from-indigo-900 to-purple-900 rounded-3xl p-5 text-white mb-4">
              <div className="flex items-start gap-3 mb-4">
                <div className="text-3xl">🌙</div>
                <div>
                  <p className="font-bold text-base">Nutrients that can support better sleep &amp; weight loss</p>
                  <p className="text-indigo-200 text-xs mt-1">Based on medical research</p>
                </div>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {[
                  { icon: "🟣", name: "Magnesium", desc: "Regulates hormones & improves sleep" },
                  { icon: "🌿", name: "Zinc", desc: "Promotes better deep sleep" },
                  { icon: "💙", name: "Calcium", desc: "Supports melatonin production" },
                  { icon: "☀️", name: "Vitamin D", desc: "Improves sleep quality & mood" },
                  { icon: "🔴", name: "Iron", desc: "Improves sleep, helps reduce fatigue" },
                ].map((n) => (
                  <div key={n.name} className="text-center">
                    <span className="text-2xl block mb-1">{n.icon}</span>
                    <p className="text-xs font-bold text-white">{n.name}</p>
                    <p className="text-xs text-indigo-200 leading-tight mt-0.5">{n.desc}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-indigo-200 mt-4 leading-relaxed">
                A balanced diet with these nutrients, regular workouts &amp; quality sleep can help you{" "}
                <span className="text-green-300 underline">improve sleep and lose weight.</span>
              </p>
            </div>
          </>
        )}

        {activeTab === "Explore" && <ExploreTab />}
        {activeTab === "Fridge" && <FridgeTab />}
        {activeTab === "Favorites" && <FavoritesTab />}
        {activeTab === "Me" && <ProfileTab />}
      </div>

      {/* Bottom nav */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-100 flex">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex-1 flex flex-col items-center py-3 gap-0.5"
            >
              <Icon
                size={22}
                className={isActive ? "text-green-500" : "text-gray-400"}
                fill={isActive && tab.id === "Favorites" ? "#22c55e" : "none"}
              />
              <span className={`text-xs ${isActive ? "text-green-500 font-semibold" : "text-gray-400"}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grocery list modal */}
      {showGrocery && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-end justify-center">
          <div className="w-full max-w-md bg-white rounded-t-[2rem] max-h-[80vh] overflow-y-auto p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Grocery list</h3>
              <button onClick={() => setShowGrocery(false)} className="p-2 bg-gray-100 rounded-full">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-2 pb-4">
              {groceryList.map((item) => (
                <button
                  key={item.name}
                  onClick={() => toggleGroceryItem(item.name)}
                  className="w-full flex items-center justify-between p-3 rounded-2xl bg-gray-50"
                >
                  <span className={item.checked ? "text-sm text-gray-400 line-through" : "text-sm text-gray-800 font-medium"}>
                    {item.name}
                  </span>
                  <div className={item.checked ? "w-5 h-5 rounded-full bg-green-500 flex items-center justify-center" : "w-5 h-5 rounded-full border-2 border-gray-300"}>
                    {item.checked && <Check size={12} className="text-white" />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
