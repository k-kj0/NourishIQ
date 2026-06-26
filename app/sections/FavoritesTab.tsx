"use client";

import { useApp } from "../AppContext";
import { RecipeSheet } from "../components/RecipeSheet";
import { Heart } from "lucide-react";

export function FavoritesTab() {
  const { favorites, setSelectedMeal, setShowRecipeSheet, toggleLikeMeal } = useApp();

  return (
    <div className="max-w-md mx-auto bg-[#fafaf8] min-h-screen pb-24">
      <div className="px-5 pt-5 pb-3">
        <h2 className="text-2xl font-bold text-gray-900">Favorites</h2>
      </div>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Heart size={28} className="text-gray-300" />
          </div>
          <p className="text-gray-500 font-medium">No favorites yet</p>
          <p className="text-sm text-gray-400 mt-1">Heart meals you love to save them here</p>
        </div>
      ) : (
        <div className="px-4 space-y-3">
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
                  (e.target as HTMLImageElement).src = `https://placehold.co/200x200/e8e8e8/666666?text=${encodeURIComponent(meal.name)}`;
                }}
              />
              <div className="flex-1 p-3 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-gray-900">{meal.name}</h3>
                  <p className="text-xs text-gray-500">{meal.calories} kcal &middot; {meal.cookTime}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedMeal(meal);
                      setShowRecipeSheet(true);
                    }}
                    className="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1.5 rounded-xl"
                  >
                    View Recipe
                  </button>
                  <button
                    onClick={() => toggleLikeMeal(meal)}
                    className="text-red-400 p-1"
                  >
                    <Heart size={16} fill="currentColor" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <RecipeSheet />
    </div>
  );
}
