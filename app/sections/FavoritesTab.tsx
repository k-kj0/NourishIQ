"use client";

import { motion } from "framer-motion";
import { useApp } from "../AppContext";
import { Heart } from "lucide-react";

export function FavoritesTab() {
  const { favorites, setSelectedMeal, setShowRecipeSheet } = useApp();

  return (
    <div className="px-5 pt-12 pb-4">
      <h1 className="text-2xl font-black mb-4">Your Favorites</h1>
      {favorites.length === 0 ? (
        <div className="text-center py-20">
          <Heart className="w-16 h-16 text-gray-200 mx-auto mb-4" />
          <p className="text-gray-400 font-bold">No favorites yet</p>
          <p className="text-gray-400 text-sm">Heart meals to save them here</p>
        </div>
      ) : (
        <div className="space-y-4">
          {favorites.map((meal, i) => (
            <motion.button
              key={meal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => {
                setSelectedMeal(meal);
                setShowRecipeSheet(true);
              }}
              className="w-full bg-white rounded-2xl overflow-hidden shadow-card text-left flex"
            >
              <div className="w-24 h-24 shrink-0">
                <img src={meal.image} alt={meal.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-3 flex-1">
                <p className="font-bold text-sm">{meal.name}</p>
                <p className="text-[10px] text-gray-500 mt-1">{meal.calories} kcal</p>
                {meal.frequency && (
                  <span className="inline-block mt-2 px-2 py-0.5 rounded-full bg-leaf/10 text-leaf text-[10px] font-bold">
                    {meal.frequency}
                  </span>
                )}
              </div>
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}
