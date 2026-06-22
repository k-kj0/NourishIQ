"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useApp } from "../AppContext";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { ALL_MEALS, APPLIANCE_OPTIONS } from "../lib/mealData";

const filters = ["All", "Breakfast", "Lunch", "Dinner", "Snack", "High Protein", "Quick", "Comfort Food"];

export function ExploreTab() {
  const { setSelectedMeal, setShowRecipeSheet, applianceFilter, setApplianceFilter } = useApp();
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilterPopup, setShowFilterPopup] = useState(false);

  const filtered = ALL_MEALS.filter((m) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Breakfast") return m.category === "breakfast";
    if (activeFilter === "Lunch") return m.category === "lunch";
    if (activeFilter === "Dinner") return m.category === "dinner";
    if (activeFilter === "Snack") return m.category === "snack";
    if (activeFilter === "High Protein") return m.protein > 20;
    if (activeFilter === "Quick") return m.cookTime.includes("15") || m.cookTime.includes("5");
    if (activeFilter === "Comfort Food") return m.dietaryTags.includes("Comfort Food");
    return true;
  }).filter((m) => {
    if (applianceFilter) return m.appliances.includes(applianceFilter as any) || m.appliances.includes("none");
    return true;
  }).filter((m) => {
    if (!searchQuery) return true;
    return m.name.toLowerCase().includes(searchQuery.toLowerCase()) || m.ingredients.some((i) => i.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  return (
    <div className="px-5 pt-12 pb-4">
      <h1 className="text-2xl font-black mb-4">Explore</h1>

      <div className="relative mb-4">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search meals, ingredients..."
          className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white border-2 border-gray-200 focus:border-leaf outline-none font-bold text-sm"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto no-scrollbar mb-4">
        <button
          onClick={() => setShowFilterPopup(true)}
          className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1 ${
            applianceFilter ? "gradient-ocean text-white" : "bg-white border-2 border-gray-200"
          }`}
        >
          <SlidersHorizontal className="w-3 h-3" />
          {applianceFilter ? APPLIANCE_OPTIONS.find(a => a.id === applianceFilter)?.name : "Appliance"}
        </button>
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all ${
              activeFilter === f ? "gradient-leaf text-white" : "bg-white border-2 border-gray-200"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {showFilterPopup && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-4 shadow-card mb-4"
        >
          <div className="flex items-center justify-between mb-3">
            <p className="font-bold text-sm">Filter by appliance</p>
            <button onClick={() => setShowFilterPopup(false)}><X className="w-4 h-4" /></button>
          </div>
          <div className="flex flex-wrap gap-2">
            {APPLIANCE_OPTIONS.map((a) => (
              <button
                key={a.id}
                onClick={() => {
                  setApplianceFilter(applianceFilter === a.id ? null : a.id);
                  setShowFilterPopup(false);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                  applianceFilter === a.id ? "gradient-ocean text-white" : "bg-gray-100 text-gray-600"
                }`}
              >
                {a.name}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-2 gap-3">
        {filtered.map((meal, i) => (
          <motion.button
            key={meal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => {
              setSelectedMeal(meal);
              setShowRecipeSheet(true);
            }}
            className="bg-white rounded-2xl overflow-hidden shadow-card text-left"
          >
            <div className="h-32 overflow-hidden">
              <img src={meal.image} alt={meal.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-3">
              <p className="font-bold text-sm leading-tight mb-1">{meal.name}</p>
              <p className="text-[10px] text-gray-500">{meal.calories} kcal • {meal.cookTime}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
