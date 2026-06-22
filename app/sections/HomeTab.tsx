"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "../AppContext";
import { KawaiiCharacter } from "../components/KawaiiCharacter";
import { Settings, Moon, Sun, Heart, X, RefreshCw, ChevronRight, Plus, Minus, Droplets } from "lucide-react";
import { getGreeting, getDaysInMonth } from "../lib/mealData";
import { RecipeSheet } from "../components/RecipeSheet";

export function HomeTab() {
  const {
    userProfile, selectedDate, setSelectedDate, dayPlan,
    toggleLikeMeal, regenerateMealForDay, setSelectedMeal, setShowRecipeSheet,
    includeDessert, setIncludeDessert, includeBeverage, setIncludeBeverage,
    mealsPerDay, setMealsPerDay, loggedMeals, toggleLoggedMeal,
    cravingQuery, setCravingQuery, searchCravings, cravingResults,
  } = useApp();

  const [showMealLog, setShowMealLog] = useState(false);
  const [showCravingInput, setShowCravingInput] = useState(false);

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const days = getDaysInMonth(currentYear, currentMonth);

  const categoryColors: Record<string, string> = {
    breakfast: "bg-coral",
    lunch: "bg-leaf",
    dinner: "bg-grape",
    snack: "bg-ocean",
    dessert: "bg-sweet",
    beverage: "bg-ocean",
  };

  const consumedCal = dayPlan.meals
    .filter((m) => loggedMeals[m.id] === true)
    .reduce((s, m) => s + m.calories, 0);

  return (
    <div className="px-5 pt-12 pb-4">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h1 className="flex items-center gap-2 text-[22px] font-black leading-tight">
            {getGreeting(userProfile.name || "friend")}
            <span>{today.getHours() >= 6 && today.getHours() < 18 ? <Sun className="w-5 h-5 text-coral" /> : <Moon className="w-5 h-5 text-grape" />}</span>
          </h1>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {userProfile.goal && (
              <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-semibold text-gray-500">
                {userProfile.goal}
              </span>
            )}
            {userProfile.diet && (
              <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-semibold text-gray-500">
                {userProfile.diet}
              </span>
            )}
            {userProfile.region && (
              <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-semibold text-gray-500">
                {userProfile.region}
              </span>
            )}
          </div>
        </div>
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-card">
          <Settings className="w-5 h-5" />
        </button>
      </div>

      {/* Calendar */}
      <div className="mb-4">
        <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
          {today.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </p>
        <div className="no-scrollbar mt-2 flex gap-2 overflow-x-auto pb-2">
          {days.map((date, i) => {
            const isSelected =
              date.getDate() === selectedDate.getDate() &&
              date.getMonth() === selectedDate.getMonth();
            const isPast = date < new Date(today.setHours(0, 0, 0, 0));
            return (
              <motion.button
                key={i}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedDate(date)}
                className={`relative flex w-14 shrink-0 flex-col items-center gap-1 rounded-2xl px-2 py-3 ${
                  isSelected
                    ? "gradient-leaf text-white shadow-soft"
                    : isPast
                    ? "bg-white text-gray-400 opacity-50"
                    : "bg-white text-gray-700 shadow-card"
                }`}
              >
                <span className="text-lg font-black">{date.getDate()}</span>
                <span className="text-[10px] font-bold uppercase">
                  {date.toLocaleDateString("en-US", { weekday: "short" })}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Daily Summary */}
      <div className="flex gap-2 mb-4">
        <div className="flex-1 rounded-2xl bg-leaf/10 text-leaf px-3 py-2">
          <p className="text-[10px] font-bold uppercase opacity-70">kcal</p>
          <p className="text-sm font-black">
            {consumedCal}
            <span className="text-[10px] font-semibold opacity-60"> / {dayPlan.targetCalories}</span>
          </p>
        </div>
        <div className="flex-1 rounded-2xl bg-coral/10 text-coral px-3 py-2">
          <p className="text-[10px] font-bold uppercase opacity-70">protein</p>
          <p className="text-sm font-black">
            {dayPlan.totalProtein}g
            <span className="text-[10px] font-semibold opacity-60"> / {dayPlan.targetProtein}g</span>
          </p>
        </div>
        <div className="flex-1 rounded-2xl bg-grape/10 text-grape px-3 py-2">
          <p className="text-[10px] font-bold uppercase opacity-70">carbs</p>
          <p className="text-sm font-black">
            {dayPlan.totalCarbs}g
            <span className="text-[10px] font-semibold opacity-60"> / {dayPlan.targetCarbs}g</span>
          </p>
        </div>
      </div>

      {/* Toggles */}
      <div className="flex gap-2 mb-4 flex-wrap">
        <button
          onClick={() => setIncludeDessert(!includeDessert)}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
            includeDessert ? "gradient-sweet text-white" : "bg-white border-2 border-gray-200"
          }`}
        >
          + Dessert
        </button>
        <button
          onClick={() => setIncludeBeverage(!includeBeverage)}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
            includeBeverage ? "gradient-ocean text-white" : "bg-white border-2 border-gray-200"
          }`}
        >
          <Droplets className="w-3 h-3 inline mr-1" />
          Beverage
        </button>
        <button
          onClick={() => setShowMealLog(!showMealLog)}
          className="px-4 py-2 rounded-full text-xs font-bold bg-white border-2 border-gray-200"
        >
          Log meals
        </button>
        <button
          onClick={() => setShowCravingInput(!showCravingInput)}
          className="px-4 py-2 rounded-full text-xs font-bold bg-white border-2 border-gray-200"
        >
          Craving?
        </button>
      </div>

      {/* Craving Input */}
      <AnimatePresence>
        {showCravingInput && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4"
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={cravingQuery}
                onChange={(e) => setCravingQuery(e.target.value)}
                placeholder="What are you craving? (e.g. Chinese, spicy, sweet...)"
                className="flex-1 px-4 py-2 rounded-2xl border-2 border-gray-200 text-sm font-bold focus:border-leaf outline-none"
                onKeyPress={(e) => e.key === "Enter" && searchCravings(cravingQuery)}
              />
              <button
                onClick={() => searchCravings(cravingQuery)}
                className="gradient-leaf text-white px-4 py-2 rounded-2xl font-bold text-sm"
              >
                Find
              </button>
            </div>
            {cravingResults.length > 0 && (
              <div className="mt-2 flex gap-2 overflow-x-auto no-scrollbar">
                {cravingResults.slice(0, 5).map((meal) => (
                  <button
                    key={meal.id}
                    onClick={() => {
                      setSelectedMeal(meal);
                      setShowRecipeSheet(true);
                    }}
                    className="shrink-0 bg-white rounded-2xl p-3 shadow-card text-left w-32"
                  >
                    <p className="font-bold text-xs">{meal.name}</p>
                    <p className="text-[10px] text-gray-500">{meal.calories} kcal</p>
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Meal Cards */}
      <div className="space-y-4">
        <AnimatePresence>
          {dayPlan.meals.map((meal, index) => (
            <motion.div
              key={meal.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
              className="relative overflow-hidden rounded-[24px] bg-white shadow-card"
            >
              <button
                className="block w-full text-left"
                onClick={() => {
                  setSelectedMeal(meal);
                  setShowRecipeSheet(true);
                }}
              >
                <div className="relative h-44 w-full overflow-hidden">
                  <img src={meal.image} alt={meal.name} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[10px] font-black tracking-wider text-white ${categoryColors[meal.category] || "bg-gray-500"}`}>
                    {meal.category.toUpperCase()}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-[18px] font-black leading-tight">{meal.name}</h3>
                  <p className="mt-1 text-xs text-gray-500">{meal.ingredients.slice(0, 4).join(" · ")}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <span className="rounded-full bg-leaf/10 text-leaf px-2.5 py-1 text-[11px] font-bold">{meal.calories} kcal</span>
                    <span className="rounded-full bg-coral/10 text-coral px-2.5 py-1 text-[11px] font-bold">P {meal.protein}g</span>
                    <span className="rounded-full bg-grape/10 text-grape px-2.5 py-1 text-[11px] font-bold">C {meal.carbs}g</span>
                    <span className="rounded-full bg-orange-100 text-orange-600 px-2.5 py-1 text-[11px] font-bold">F {meal.fat}g</span>
                  </div>
                </div>
              </button>

              {/* Action buttons */}
              <div className="absolute right-3 top-3 flex gap-1.5">
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLikeMeal(meal.id);
                  }}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/95 shadow"
                >
                  <Heart className={`w-4 h-4 ${meal.isLiked ? "fill-red-500 text-red-500" : "text-gray-700"}`} />
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    regenerateMealForDay(meal.id, meal.category);
                  }}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/95 shadow"
                >
                  <RefreshCw className="w-4 h-4 text-leaf" />
                </motion.button>
              </div>

              {/* Frequency badge */}
              {meal.frequency && (
                <div className="absolute bottom-3 right-3 rounded-full bg-leaf/10 px-3 py-1 text-[10px] font-bold text-leaf">
                  {meal.frequency}
                </div>
              )}

              {/* Meal log */}
              {showMealLog && (
                <div className="px-4 pb-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLoggedMeal(meal.id);
                    }}
                    className={`w-full py-2 rounded-xl text-xs font-bold transition-all ${
                      loggedMeals[meal.id] === true
                        ? "bg-leaf text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {loggedMeals[meal.id] === true ? "✓ Logged" : `Did you have ${meal.category}?`}
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Custom meal builder */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        className="relative flex w-full items-center gap-3 overflow-hidden rounded-3xl gradient-grape p-5 text-left text-white shadow-soft mt-4"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20">
          <KawaiiCharacter emotion="chef" size={32} />
        </div>
        <div>
          <p className="text-base font-black">Build a custom meal</p>
          <p className="text-xs text-white/80">Tell us what&apos;s in your kitchen</p>
        </div>
      </motion.button>

      <div className="flex justify-center mt-6">
        <KawaiiCharacter emotion="happy" size={60} />
      </div>

      <RecipeSheet />
    </div>
  );
}
