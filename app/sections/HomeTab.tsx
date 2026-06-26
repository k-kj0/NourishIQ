"use client";

import { useApp } from "../AppContext";
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Volume2,
  Sun,
  Moon,
  UtensilsCrossed,
  Coffee,
  Droplets,
  Leaf,
  Zap,
  Dumbbell,
  Fish,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";

const categoryIcons: Record<string, React.ReactNode> = {
  breakfast: <Sun size={16} />,
  lunch: <UtensilsCrossed size={16} />,
  dinner: <Moon size={16} />,
  snack: <Coffee size={16} />,
  dessert: <Sparkles size={16} />,
  beverage: <Droplets size={16} />,
};

const categoryColors: Record<string, string> = {
  breakfast: "bg-orange-500",
  lunch: "bg-green-500",
  dinner: "bg-indigo-500",
  snack: "bg-pink-500",
  dessert: "bg-rose-500",
  beverage: "bg-sky-500",
};

const categoryLabels: Record<string, string> = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
  snack: "Snack",
  dessert: "Dessert",
  beverage: "Beverage",
};

export function HomeTab() {
  const {
    profile,
    selectedDate,
    setSelectedDate,
    dayPlan,
    setSelectedMeal,
    setShowRecipeSheet,
    regenerateMealForSlot,
    toggleLikeMeal,
    favorites,
    dailySuggestions,
    hydrationLog,
    addWater,
    generateMealPrep,
    mealPrepPlan,
  } = useApp();

  const [showGrocery, setShowGrocery] = useState(false);

  useEffect(() => {
    generateMealPrep();
  }, []);

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() - 3 + i);
    return d;
  });

  const formatDate = (d: Date) => ({
    day: d.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase(),
    date: d.getDate(),
    isToday: d.toDateString() === new Date().toDateString(),
    isSelected: d.toDateString() === selectedDate.toDateString(),
  });

  const suggestionIcons: Record<string, React.ReactNode> = {
    leaf: <Leaf size={16} />,
    fish: <Fish size={16} />,
    zap: <Zap size={16} />,
    dumbbell: <Dumbbell size={16} />,
    droplets: <Droplets size={16} />,
  };

  return (
    <div className="max-w-md mx-auto px-4 pt-4 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            Hey, {profile.name || "Sam"}
          </h1>
          <p className="text-xs text-gray-500">
            Fuel right. Feel good. Crush your goals.
          </p>
        </div>
        <button className="p-2 bg-gray-100 rounded-full">
          <Volume2 size={18} className="text-gray-600" />
        </button>
      </div>

      {/* Daily AI Suggestions */}
      {dailySuggestions.length > 0 && (
        <div className="mb-4 space-y-2">
          {dailySuggestions.map((s) => (
            <div
              key={s.id}
              className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex items-start gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                <span className="text-green-600">
                  {suggestionIcons[s.icon] || <Sparkles size={16} />}
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  {s.message}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{s.action}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Hydration Tracker */}
      <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Droplets size={16} className="text-blue-500" />
            <span className="text-sm font-semibold text-gray-700">
              Hydration
            </span>
          </div>
          <span className="text-xs text-gray-500">
            {hydrationLog.glasses}/{hydrationLog.target} glasses
          </span>
        </div>
        <div className="flex gap-2 mb-3">
          {Array.from({ length: hydrationLog.target }, (_, i) => (
            <button
              key={i}
              onClick={() => {
                if (i === hydrationLog.glasses) addWater();
              }}
              className={
                i < hydrationLog.glasses
                  ? "flex-1 h-8 rounded-lg bg-blue-400 transition-all"
                  : "flex-1 h-8 rounded-lg bg-blue-100 transition-all"
              }
            />
          ))}
        </div>
        <button
          onClick={addWater}
          disabled={hydrationLog.glasses >= hydrationLog.target}
          className="w-full py-2 bg-blue-50 text-blue-600 rounded-xl text-sm font-semibold disabled:opacity-50"
        >
          + Add Glass
        </button>
      </div>

      {/* Date Card */}
      <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sun size={16} className="text-green-600" />
            <span className="text-sm font-semibold text-gray-700">
              {selectedDate.toLocaleDateString("en-US", {
                weekday: "long",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => {
                const d = new Date(selectedDate);
                d.setDate(d.getDate() - 1);
                setSelectedDate(d);
              }}
              className="p-1 hover:bg-gray-100 rounded-lg"
            >
              <ChevronLeft size={16} className="text-gray-400" />
            </button>
            <button
              onClick={() => {
                const d = new Date(selectedDate);
                d.setDate(d.getDate() + 1);
                setSelectedDate(d);
              }}
              className="p-1 hover:bg-gray-100 rounded-lg"
            >
              <ChevronRight size={16} className="text-gray-400" />
            </button>
          </div>
        </div>

        {/* Day picker */}
        <div className="grid grid-cols-7 gap-1 mb-4">
          {days.map((d, i) => {
            const info = formatDate(d);
            return (
              <button
                key={i}
                onClick={() => setSelectedDate(d)}
                className={
                  info.isSelected
                    ? "flex flex-col items-center py-2 rounded-xl transition-colors bg-green-500 text-white"
                    : info.isToday
                    ? "flex flex-col items-center py-2 rounded-xl transition-colors bg-green-100 text-green-700"
                    : "flex flex-col items-center py-2 rounded-xl transition-colors text-gray-500"
                }
              >
                <span className="text-[10px] font-medium">{info.day}</span>
                <span className="text-sm font-bold">{info.date}</span>
              </button>
            );
          })}
        </div>

        {/* Nutrients */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Iron", value: "12.5", unit: "mg", color: "text-red-500" },
            {
              label: "Magnesium",
              value: "210",
              unit: "mg",
              color: "text-purple-500",
            },
            { label: "Zinc", value: "8.2", unit: "mg", color: "text-green-500" },
            {
              label: "Calcium",
              value: "320",
              unit: "mg",
              color: "text-blue-500",
            },
            {
              label: "Potassium",
              value: "1200",
              unit: "mg",
              color: "text-amber-500",
            },
            {
              label: "Vitamin D",
              value: "15",
              unit: "mcg",
              color: "text-yellow-500",
            },
          ].map((nutrient) => (
            <div
              key={nutrient.label}
              className="bg-gray-50 rounded-xl p-2 text-center"
            >
              <p className={`text-xs font-bold ${nutrient.color}`}>
                {nutrient.value} {nutrient.unit}
              </p>
              <p className="text-[10px] text-gray-500">{nutrient.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Meal Prep Optimizer */}
      {mealPrepPlan.length > 0 && (
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
          <h3 className="text-sm font-bold text-gray-800 mb-2">
            Smart Meal Prep
          </h3>
          <p className="text-xs text-gray-500 mb-3">
            Cook once, eat multiple times
          </p>
          <div className="space-y-2">
            {mealPrepPlan.map((meal) => (
              <div
                key={meal.id}
                className="flex items-center gap-3 bg-gray-50 rounded-xl p-2"
              >
                <img
                  src={meal.image}
                  alt={meal.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-800 truncate">
                    {meal.name}
                  </p>
                  <p className="text-[10px] text-gray-500">
                    {meal.calories} kcal · Prep once, eat twice
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Meals */}
      <div className="space-y-3">
        {dayPlan.meals.map((meal) => {
          const isLiked = favorites.some((m) => m.id === meal.id);
          const config = categoryColors[meal.category] || "bg-gray-500";
          const label = categoryLabels[meal.category] || meal.category;

          return (
            <div
              key={meal.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm"
            >
              <div className="flex">
                <div
                  className={`${config} w-12 flex flex-col items-center justify-center text-white py-3`}
                >
                  {categoryIcons[meal.category]}
                  <span className="text-[9px] font-bold uppercase mt-1">
                    {label}
                  </span>
                </div>
                <div className="flex-1 p-3">
                  <div className="flex gap-3">
                    <img
                      src={meal.image}
                      alt={meal.name}
                      className="w-20 h-20 rounded-xl object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://placehold.co/200x200/e8e8e8/666666?text=" +
                          encodeURIComponent(meal.name);
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <h3 className="text-sm font-bold text-gray-900 truncate">
                          {meal.name}
                        </h3>
                        <button
                          onClick={() => toggleLikeMeal(meal)}
                          className={
                            isLiked
                              ? "ml-2 text-red-500"
                              : "ml-2 text-gray-300"
                          }
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill={isLiked ? "currentColor" : "none"}
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                          </svg>
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {meal.ingredients.slice(0, 2).join(", ")}
                        {meal.ingredients.length > 2 ? "..." : ""}
                      </p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                        <span className="font-semibold text-gray-700">
                          {meal.calories} kcal
                        </span>
                        <span className="text-orange-500 font-medium">
                          P {meal.protein}g
                        </span>
                        <span className="text-blue-500 font-medium">
                          C {meal.carbs}g
                        </span>
                        <span className="text-yellow-500 font-medium">
                          F {meal.fat}g
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => {
                        setSelectedMeal(meal);
                        setShowRecipeSheet(true);
                      }}
                      className="flex-1 bg-green-50 text-green-700 text-xs font-semibold py-1.5 rounded-lg"
                    >
                      View Recipe
                    </button>
                    <button
                      onClick={() => regenerateMealForSlot(meal.category)}
                      className="px-3 bg-gray-100 text-gray-600 rounded-lg"
                    >
                      <RotateCcw size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Nutrient Tip */}
      <div className="mt-4 bg-white rounded-2xl p-4 shadow-sm">
        <h4 className="text-sm font-bold text-gray-800 mb-2">
          Nutrients that support your goals
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {[
            {
              icon: "🌿",
              name: "Magnesium",
              desc: "Helps muscles relax & improve sleep",
            },
            {
              icon: "🍃",
              name: "Zinc",
              desc: "Regulates metabolism & promotes deeper sleep",
            },
            {
              icon: "💎",
              name: "Calcium",
              desc: "Helps melatonin production for deeper rest",
            },
            {
              icon: "☀️",
              name: "Vitamin D",
              desc: "Improves sleep quality & mood",
            },
          ].map((item) => (
            <div key={item.name} className="bg-gray-50 rounded-xl p-2">
              <p className="text-xs">
                {item.icon} <span className="font-semibold">{item.name}</span>
              </p>
              <p className="text-[10px] text-gray-500 mt-0.5">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
