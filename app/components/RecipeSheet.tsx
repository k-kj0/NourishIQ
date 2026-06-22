"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "../AppContext";
import { X, Heart, RefreshCw, Clock, ChefHat, MessageCircle } from "lucide-react";
import { KawaiiCharacter } from "./KawaiiCharacter";

export function RecipeSheet() {
  const { showRecipeSheet, setShowRecipeSheet, selectedMeal, toggleLikeMeal, setShowChat } = useApp();

  if (!selectedMeal) return null;

  const totalMacros = selectedMeal.protein + selectedMeal.carbs + selectedMeal.fat;
  const proteinAngle = (selectedMeal.protein / totalMacros) * 360;
  const carbsAngle = (selectedMeal.carbs / totalMacros) * 360;
  const fatAngle = (selectedMeal.fat / totalMacros) * 360;

  return (
    <AnimatePresence>
      {showRecipeSheet && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 flex items-end justify-center"
          onClick={() => setShowRecipeSheet(false)}
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full max-w-[460px] bg-cream rounded-t-[32px] max-h-[90vh] overflow-y-auto no-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-56 w-full overflow-hidden rounded-t-[32px]">
              <img src={selectedMeal.image} alt={selectedMeal.name} className="h-full w-full object-cover" />
              <button
                onClick={() => setShowRecipeSheet(false)}
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-4 flex gap-2">
                {selectedMeal.dietaryTags.map((tag) => (
                  <span key={tag} className="rounded-full bg-white/90 px-3 py-1 text-[10px] font-black text-gray-700">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="px-6 py-6">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-black">{selectedMeal.name}</h2>
                <KawaiiCharacter emotion="eating" size={40} />
              </div>
              <p className="text-gray-500 text-sm mb-4">{selectedMeal.ingredients.join(" · ")}</p>

              <div className="bg-white rounded-2xl p-4 shadow-card mb-4">
                <div className="flex items-center justify-between">
                  <div className="relative w-24 h-24">
                    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#f97316" strokeWidth="8"
                        strokeDasharray={`${(proteinAngle / 360) * 251} 251`} />
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#16a34a" strokeWidth="8"
                        strokeDasharray={`${(carbsAngle / 360) * 251} 251`}
                        strokeDashoffset={-(proteinAngle / 360) * 251} />
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#a855f7" strokeWidth="8"
                        strokeDasharray={`${(fatAngle / 360) * 251} 251`}
                        strokeDashoffset={-((proteinAngle + carbsAngle) / 360) * 251} />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-xl font-black">{selectedMeal.calories}</span>
                      <span className="text-[10px] text-gray-500">kcal</span>
                    </div>
                  </div>
                  <div className="flex-1 ml-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-coral" />
                      <span className="text-sm font-bold">Protein {selectedMeal.protein}g</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-leaf" />
                      <span className="text-sm font-bold">Carbs {selectedMeal.carbs}g</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-grape" />
                      <span className="text-sm font-bold">Fat {selectedMeal.fat}g</span>
                    </div>
                  </div>
                </div>
              </div>

              {selectedMeal.genderBenefits && (
                <div className="bg-pink-50 rounded-2xl p-4 mb-4 border-2 border-pink-100">
                  <div className="flex items-center gap-2 mb-2">
                    <KawaiiCharacter emotion="love" size={24} />
                    <p className="text-xs font-bold text-pink-400 uppercase">For Women</p>
                  </div>
                  {selectedMeal.genderBenefits.map((b, i) => (
                    <p key={i} className="text-sm text-pink-700 font-medium">• {b}</p>
                  ))}
                </div>
              )}

              <div className="bg-leaf/5 rounded-2xl p-4 mb-4">
                <p className="text-xs font-bold text-leaf uppercase mb-2">Benefits</p>
                {selectedMeal.benefits.map((b, i) => (
                  <p key={i} className="text-sm text-gray-700 font-medium">• {b}</p>
                ))}
              </div>

              <h3 className="font-black text-lg mb-3 flex items-center gap-2">
                <ChefHat className="w-5 h-5 text-leaf" /> Ingredients
              </h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedMeal.ingredients.map((ing) => (
                  <span key={ing} className="px-3 py-1.5 rounded-full bg-gray-100 text-xs font-bold text-gray-700">
                    {ing}
                  </span>
                ))}
              </div>

              <h3 className="font-black text-lg mb-3">Spices</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedMeal.spices.map((spice) => (
                  <span key={spice} className="px-3 py-1.5 rounded-full bg-orange-50 text-xs font-bold text-orange-600 border border-orange-200">
                    {spice}
                  </span>
                ))}
              </div>

              <h3 className="font-black text-lg mb-3 flex items-center gap-2">
                <Clock className="w-5 h-5 text-coral" /> Steps
              </h3>
              <div className="space-y-3 mb-4">
                {selectedMeal.steps.map((step) => (
                  <div key={step.step} className="flex gap-3 bg-white rounded-2xl p-4 shadow-card">
                    <div className="w-8 h-8 rounded-full gradient-leaf flex items-center justify-center text-white font-black text-sm shrink-0">
                      {step.step}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">{step.text}</p>
                      <p className="text-xs text-gray-400 mt-1">{step.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="font-black text-lg mb-3">Don't have an ingredient?</h3>
              <div className="space-y-2 mb-6">
                {selectedMeal.substitutes.map((sub) => (
                  <div key={sub.ingredient} className="bg-white rounded-2xl p-4 shadow-card">
                    <p className="text-sm font-bold text-gray-800 mb-1">No {sub.ingredient}?</p>
                    <p className="text-xs text-gray-500">Try: {sub.alternatives.join(", ")}</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 mb-4">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleLikeMeal(selectedMeal.id)}
                  className={`flex-1 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 ${
                    selectedMeal.isLiked ? "bg-red-50 text-red-500 border-2 border-red-200" : "bg-gray-100 text-gray-700"
                  }`}
                >
                  <Heart className={`w-5 h-5 ${selectedMeal.isLiked ? "fill-red-500" : ""}`} />
                  {selectedMeal.isLiked ? "Liked" : "Like"}
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowChat(true)}
                  className="flex-1 py-3 rounded-2xl font-bold bg-grape/10 text-grape flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Chat
                </motion.button>
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                className="w-full gradient-leaf text-white py-4 rounded-2xl font-bold shadow-glow flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-5 h-5" /> Regenerate this meal
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
