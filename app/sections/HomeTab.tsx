"use client";

import { useApp } from "../AppContext";
import { RecipeSheet } from "../components/RecipeSheet";
import { ChevronLeft, ChevronRight, RotateCcw, Volume2, Sun, Moon, UtensilsCrossed, Coffee, Droplets } from "lucide-react";

const categoryIcons: Record<string, React.ReactNode> = {
  breakfast: <Sun size={16} />,
  lunch: <UtensilsCrossed size={16} />,
  dinner: <Moon size={16} />,
  snack: <Coffee size={16} />,
  dessert: <Coffee size={16} />,
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

  return (
    <div className="max-w-md mx-auto px-4 pt-4 pb-24">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Hey, {userProfile.name || "Sam"}</h1>
          <p className="text-xs text-gray-500">Fuel right. Feel good. Crush your goals.</p>
        </div>
        <button className="p-2 bg-gray-100 rounded-full">
          <Volume2 size={18} className="text-gray-600" />
        </button>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-green-600">
              <Sun size={16} />
            </span>
            <span className="text-sm font-semibold text-gray-700">
              {selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
            </span>
          </div>
          <ChevronLeft size={16} className="text-gray-400" />
        </div>

        <div className="grid grid-cols-7 gap-1 mb-4">
          {days.map((d, i) => {
            const info = formatDate(d);
            return (
              <button
                key={i}
                onClick={() => setSelectedDate(d)}
                className={`flex flex-col items-center py-2 rounded-xl transition-colors ${
                  info.isSelected ? "bg-green-500 text-white" : info.isToday ? "bg-green-100 text-green-700" : "text-gray-500"
                }`}
              >
                <span className="text-[10px] font-medium">{info.day}</span>
                <span className="text-sm font-bold">{info.date}</span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Iron", value: "12.5", unit: "mg", color: "text-red-500" },
            { label: "Magnesium", value: "210", unit: "mg", color: "text-purple-500" },
            { label: "Zinc", value: "8.2", unit: "mg", color: "text-green-500" },
            { label: "Calcium", value: "320", unit: "mg", color: "text-blue-500" },
            { label: "Potassium", value: "1200", unit: "mg", color: "text-amber-500" },
            { label: "Vitamin D", value: "15", unit: "mcg", color: "text-yellow-500" },
          ].map((nutrient) => (
            <div key={nutrient.label} className="bg-gray-50 rounded-xl p-2 text-center">
              <p className={`text-xs font-bold ${nutrient.color}`}>{nutrient.value} {nutrient.unit}</p>
              <p className="text-[10px] text-gray-500">{nutrient.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {dayPlan.meals.map((meal) => {
          const isLiked = favorites.some((m) => m.id === meal.id);

          return (
            <div
              key={meal.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm"
            >
              <div className="flex">
                <div className={`${categoryColors[meal.category] || "bg-gray-500"} w-12 flex flex-col items-center justify-center text-white py-3`}>
                  {categoryIcons[meal.category]}
                  <span className="text-[9px] font-bold uppercase mt-1">{meal.category}</span>
                </div>
                <div className="flex-1 p-3">
                  <div className="flex gap-3">
                    <img
                      src={meal.image}
                      alt={meal.name}
                      className="w-20 h-20 rounded-xl object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://placehold.co/200x200/22c55e/ffffff?text=${encodeURIComponent(meal.name)}`;
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <h3 className="text-sm font-bold text-gray-900 truncate">{meal.name}</h3>
                        <button
                          onClick={() => toggleLikeMeal(meal.id)}
                          className={`ml-2 ${isLiked ? "text-red-500" : "text-gray-300"}`}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                          </svg>
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {meal.ingredients.slice(0, 3).join(", ")}{meal.ingredients.length > 3 ? "..." : ""}
                      </p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                        <span className="font-semibold text-gray-700">{meal.calories} kcal</span>
                        <span className="text-orange-500 font-medium">P {meal.protein}g</span>
                        <span className="text-blue-500 font-medium">C {meal.carbs}g</span>
                        <span className="text-yellow-500 font-medium">F {meal.fat}g</span>
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

      <RecipeSheet />
    </div>
  );
}
