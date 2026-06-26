"use client";

import { useState } from "react";
import { useApp } from "../AppContext";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { APPLIANCE_OPTIONS } from "../lib/mealData";
import { MEALS as ALL_MEALS } from "../AppContext";

const filters = ["All", "Breakfast", "Lunch", "Dinner", "Snack", "Dessert", "Beverage"];

export function ExploreTab() {
  const { setSelectedMeal, setShowRecipeSheet } = useApp();
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const [applianceFilter, setApplianceFilter] = useState<string | null>(null);

  const filteredMeals = ALL_MEALS.filter((meal) => {
    const matchesFilter = activeFilter === "All" || meal.category.toLowerCase() === activeFilter.toLowerCase();
    const matchesSearch = !searchQuery ||
      meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meal.ingredients.some((i) => i.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-md mx-auto bg-[#fafaf8] min-h-screen pb-24">
      {/* Header */}
      <div className="px-5 pt-5 pb-3">
        <h2 className="text-2xl font-bold text-gray-900">Explore</h2>
      </div>

      {/* Search */}
      <div className="px-4 mb-4">
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search meals, ingredients..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border-2 border-gray-100 focus:border-green-400 outline-none font-medium text-sm shadow-sm"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="px-4 flex gap-2 overflow-x-auto pb-3 mb-4 hide-scrollbar">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-4 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
              activeFilter === f
                ? "bg-green-500 text-white shadow-md shadow-green-200"
                : "bg-white text-gray-600 border border-gray-200"
            }`}
          >
            {f}
          </button>
        ))}
        <button
          onClick={() => setShowFilterPopup(true)}
          className="px-3 py-2.5 rounded-full bg-white border border-gray-200 text-gray-600"
        >
          <SlidersHorizontal size={16} />
        </button>
      </div>

      {/* Filter Popup */}
      {showFilterPopup && (
        <div className="fixed inset-0 z-40 bg-black/50 flex items-end justify-center">
          <div className="w-full max-w-md bg-white rounded-t-[2rem] p-5 animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Filter by appliance</h3>
              <button onClick={() => setShowFilterPopup(false)} className="p-2 bg-gray-100 rounded-full">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto pb-4">
              {APPLIANCE_OPTIONS.map((a) => (
                <button
                  key={a.id}
                  onClick={() => {
                    setApplianceFilter(applianceFilter === a.id ? null : a.id);
                    setShowFilterPopup(false);
                  }}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all ${
                    applianceFilter === a.id
                      ? "bg-green-50 border-green-400"
                      : "bg-white border-gray-100"
                  }`}
                >
                  <p className="font-semibold text-sm text-gray-800">{a.name}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Meal Grid */}
      <div className="px-4 grid grid-cols-2 gap-3">
        {filteredMeals.slice(0, 6).map((meal) => (
          <button
            key={meal.id}
            onClick={() => {
              setSelectedMeal(meal);
              setShowRecipeSheet(true);
            }}
            className="bg-white rounded-2xl overflow-hidden shadow-sm text-left"
          >
            <div className="h-32 bg-gray-100 relative">
              <img
                src={meal.image}
                alt={meal.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://placehold.co/400x300/e8e8e8/666666?text=${encodeURIComponent(meal.name)}`;
                }}
              />
            </div>
            <div className="p-3">
              <p className="text-sm font-bold text-gray-900 truncate">{meal.name}</p>
              <p className="text-xs text-gray-500 mt-0.5">{meal.calories} kcal &middot; {meal.cookTime}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
