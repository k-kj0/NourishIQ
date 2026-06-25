"use client";

import { useApp } from "../AppContext";
import { RecipeSheet } from "../components/RecipeSheet";
import { Heart, Trash2 } from "lucide-react";

export function FavoritesTab() {
  const { favorites, setSelectedMeal, setShowRecipeSheet, toggleLikeMeal } = useApp();

  return (
    <div className="max-w-md mx-auto px-4 pt-4 pb-24">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Favorites</h2>

      {favorites.length === 0 ? (
        <div className="text-center py-20">
          <Heart size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 font-medium">No favorites yet</p>
          <p className="text-sm text-gray-400 mt-1">Heart meals you love to save them here</p>
        </div>
      ) : (
        <div className="space-y-3">
          {favorites.map((meal) => (
            <div
              key={meal.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm flex"
            >
              <img
                src={meal.image}
                alt={meal.name}
                className="w-24 h-24 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://placehold.co/200x200/22c55e/ffffff?text=${encodeURIComponent(meal.name)}`;
                }}
              />
              <div className="flex-1 p-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">{meal.name}</h3>
                    <p className="text-xs text-gray-500">{meal.calories} kcal · {meal.cookTime}</p>
                  </div>
                  <button
                    onClick={() => toggleLikeMeal(meal.id)}
                    className="text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <button
                  onClick={() => {
                    setSelectedMeal(meal);
                    setShowRecipeSheet(true);
                  }}
                  className="mt-2 text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-lg"
                >
                  View Recipe
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <RecipeSheet />
    </div>
  );
}
