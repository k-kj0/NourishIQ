"use client";

import { useApp } from "../AppContext";
import { Heart, X } from "lucide-react";

export function FavoritesTab() {
  const { favorites, toggleLikeMeal, setSelectedMeal, setShowRecipeSheet } =
    useApp();

  return (
    <div className="max-w-md mx-auto px-4 pt-6 pb-24">
      <h1 className="text-2xl font-extrabold text-gray-900 mb-4">
        Your <span className="text-green-500">Favorites</span>
      </h1>

      {favorites.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Heart size={28} className="text-gray-300" />
          </div>
          <p className="text-sm font-semibold text-gray-700 mb-1">
            No favorites yet
          </p>
          <p className="text-xs text-gray-500">
            Heart meals you love to save them here
          </p>
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
              />
              <div className="flex-1 p-3 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-gray-900">
                    {meal.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {meal.calories} kcal · {meal.cookTime}
                  </p>
                </div>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => {
                      setSelectedMeal(meal);
                      setShowRecipeSheet(true);
                    }}
                    className="flex-1 bg-green-50 text-green-700 text-xs font-semibold py-1.5 rounded-lg"
                  >
                    View
                  </button>
                  <button
                    onClick={() => toggleLikeMeal(meal)}
                    className="px-3 bg-red-50 text-red-500 rounded-lg"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
