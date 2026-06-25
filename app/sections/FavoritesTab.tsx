"use client";

import { useApp } from "../AppContext";
import { motion } from "framer-motion";
import { Heart, Clock, Flame, ChefHat } from "lucide-react";
import { KawaiiCharacter } from "../components/KawaiiCharacter";

export function FavoritesTab() {
  const { favorites, setSelectedMeal, setShowRecipeSheet } = useApp();

  return (
    <div className="flex flex-col min-h-[calc(100dvh-80px)] px-6 pt-6 pb-24">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900 font-display">Your Favorites</h1>
          <p className="text-sm text-gray-400 mt-1">Recipes you love</p>
        </div>
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <KawaiiCharacter emotion="love" size={50} />
        </motion.div>
      </div>

      {favorites.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center py-20">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-6xl mb-4"
          >
            💔
          </motion.div>
          <h3 className="text-xl font-bold text-gray-400 mb-2">No favorites yet</h3>
          <p className="text-sm text-gray-400 max-w-[200px]">
            Heart your favorite meals to see them here!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {favorites.map((meal, index) => (
            <motion.button
              key={meal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setSelectedMeal(meal);
                setShowRecipeSheet(true);
              }}
              className="w-full bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden text-left"
            >
              <div className="relative h-40">
                <img
                  src={meal.image}
                  alt={meal.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://placehold.co/800x400/22c55e/ffffff?text=${encodeURIComponent(meal.name)}`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-bold">
                    {meal.category.toUpperCase()}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="font-bold text-white text-lg">{meal.name}</h3>
                  <p className="text-white/70 text-xs">{meal.cuisine}</p>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Flame className="w-3 h-3 text-orange-400" />
                    {meal.calories} kcal
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-blue-400" />
                    {meal.cookTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <ChefHat className="w-3 h-3 text-green-400" />
                    {meal.difficulty}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {meal.dietaryTags.slice(0, 3).map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded-full bg-green-50 text-green-600 text-[10px] font-bold">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}
