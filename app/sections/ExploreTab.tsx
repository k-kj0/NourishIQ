"use client";

import { useState } from "react";
import { useApp } from "../AppContext";
import { RecipeSheet } from "../components/RecipeSheet";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { APPLIANCE_OPTIONS } from "../lib/mealData";

const filters = ["All", "Breakfast", "Lunch", "Dinner", "Snack", "Dessert", "Beverage"];

export function ExploreTab() {
  const { setSelectedMeal, setShowRecipeSheet, applianceFilter, setApplianceFilter } = useApp();
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilterPopup, setShowFilterPopup] = useState(false);

  return (
    <div className="max-w-md mx-auto px-4 pt-4 pb-24">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Explore</h2>

      <div className="relative mb-4">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search meals, ingredients..."
          className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white border-2 border-gray-200 focus:border-green-500 outline-none font-medium text-sm"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
              activeFilter === f ? "bg-green-600 text-white" : "bg-white text-gray-600 border border-gray-200"
            }`}
          >
            {f}
          </button>
        ))}
        <button
          onClick={() => setShowFilterPopup(true)}
          className="px-3 py-2 rounded-full bg-white border border-gray-200 text-gray-600"
        >
          <SlidersHorizontal size={16} />
        </button>
      </div>

      {showFilterPopup && (
        <div className="fixed inset-0 z-40 bg-black/50 flex items-end justify-center">
          <div className="w-full max-w-md bg-white rounded-t-3xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Filter by appliance</h3>
              <button onClick={() => setShowFilterPopup(false)}><X size={20} /></button>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {APPLIANCE_OPTIONS.map((a) => (
                <button
                  key={a.id}
                  onClick={() => {
                    setApplianceFilter(applianceFilter === a.id ? null : a.id);
                    setShowFilterPopup(false);
                  }}
                  className={`w-full text-left p-3 rounded-xl border-2 transition-colors ${
                    applianceFilter === a.id ? "bg-green-50 border-green-500" : "bg-white border-gray-100"
                  }`}
                >
                  <p className="font-semibold text-sm">{a.name}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        {/* Placeholder for filtered meals - would connect to actual meal data */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
          <div className="h-32 bg-gray-200" />
          <div className="p-3">
            <p className="text-sm font-bold text-gray-900">Sample Meal</p>
            <p className="text-xs text-gray-500">350 kcal · 20 min</p>
          </div>
        </div>
      </div>

      <RecipeSheet />
    </div>
  );
}
