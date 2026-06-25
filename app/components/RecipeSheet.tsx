"use client";

import { useState, useEffect } from "react";
import { useApp } from "../AppContext";
import { X, Heart, Volume2, VolumeX } from "lucide-react";

export function RecipeSheet() {
  const {
    selectedMeal,
    showRecipeSheet,
    setShowRecipeSheet,
    toggleLikeMeal,
    regenerateMealForDay,
    favorites,
  } = useApp();

  const [activeTab, setActiveTab] = useState<"ingredients" | "steps" | "substitutes">("ingredients");
  const [checkedIngredients, setCheckedIngredients] = useState<Set<string>>(new Set());
  const [speakingStep, setSpeakingStep] = useState<number | null>(null);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (!selectedMeal || !showRecipeSheet) return null;

  const stopSpeaking = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setSpeakingStep(null);
  };

  const speakText = (text: string, stepIndex: number) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    if (speakingStep === stepIndex) { setSpeakingStep(null); return; }
    setSpeakingStep(stepIndex);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85;
    utterance.pitch = 1.05;
    utterance.onend = () => setSpeakingStep(null);
    window.speechSynthesis.speak(utterance);
  };

  const toggleIngredient = (ing: string) => {
    setCheckedIngredients((prev) => {
      const next = new Set(prev);
      if (next.has(ing)) next.delete(ing);
      else next.add(ing);
      return next;
    });
  };

  const isFavorited = favorites.some((f) => f.id === selectedMeal.id);

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-end">
      <div className="w-full max-w-md bg-white h-full overflow-y-auto">
        <div className="relative h-48 bg-gray-200">
          <img
            src={selectedMeal.image}
            alt={selectedMeal.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://placehold.co/800x400/22c55e/ffffff?text=${encodeURIComponent(selectedMeal.name)}`;
            }}
          />
          <button onClick={() => { stopSpeaking(); setShowRecipeSheet(false); }} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center">
            <X size={16} />
          </button>
          <button onClick={() => toggleLikeMeal(selectedMeal.id)} className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center">
            <Heart size={16} className={isFavorited ? "text-red-500 fill-red-500" : "text-gray-600"} />
          </button>
        </div>

        <div className="p-4">
          <div className="flex flex-wrap gap-1 mb-2">
            {selectedMeal.dietaryTags.map((tag) => (
              <span key={tag} className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">{tag}</span>
            ))}
          </div>
          <h2 className="text-xl font-bold">{selectedMeal.name}</h2>
          <p className="text-gray-500 text-sm mt-1">{selectedMeal.ingredients.slice(0, 5).join(" ")}</p>
          <div className="flex gap-4 mt-3 text-sm">
            <span className="text-orange-600 font-bold">{selectedMeal.calories} kcal</span>
            <span className="text-blue-600 font-bold">{selectedMeal.cookTime}</span>
            <span className="text-green-600 font-bold">{selectedMeal.ingredients.length} items</span>
          </div>

          <div className="flex gap-2 mt-4 border-b border-gray-200">
            {(["ingredients", "steps", "substitutes"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 px-3 text-sm font-bold capitalize ${activeTab === tab ? "text-green-600 border-b-2 border-green-600" : "text-gray-400"}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="mt-4">
            {activeTab === "ingredients" && (
              <div>
                <p className="text-xs text-gray-500 mb-2">{checkedIngredients.size}/{selectedMeal.ingredients.length} checked</p>
                {selectedMeal.ingredients.map((ing, i) => (
                  <button
                    key={ing}
                    onClick={() => toggleIngredient(ing)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl mb-2 text-left ${checkedIngredients.has(ing) ? "bg-green-50 border-2 border-green-200" : "bg-gray-50 border-2 border-transparent"}`}
                  >
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${checkedIngredients.has(ing) ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"}`}>
                      {checkedIngredients.has(ing) ? "OK" : i + 1}
                    </span>
                    <span className="flex-1 text-sm">{ing}</span>
                  </button>
                ))}
                <div className="mt-3">
                  <p className="text-xs font-bold text-gray-500 mb-1">Spices</p>
                  <div className="flex flex-wrap gap-1">
                    {selectedMeal.spices.map((spice) => (
                      <span key={spice} className="text-xs bg-orange-50 text-orange-600 px-2 py-1 rounded-lg">{spice}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "steps" && (
              <div>
                <div className="flex gap-2 mb-3">
                  <button onClick={() => speakText(`Let's make ${selectedMeal.name}. You'll need: ${selectedMeal.ingredients.join(", ")}. Let's begin!`, -1)} className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 ${speakingStep === -1 ? "bg-green-500 text-white" : "bg-green-100 text-green-700"}`}>
                    {speakingStep === -1 ? <VolumeX size={14} /> : <Volume2 size={14} />} Intro
                  </button>
                  <button onClick={() => { if (speakingStep === -3) { stopSpeaking(); } else { const allText = selectedMeal.steps.map((s) => `Step ${s.step}: ${s.text}. Time: ${s.time}.`).join(" Next. "); speakText(`Recipe for ${selectedMeal.name}. ${allText}`, -3); } }} className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 ${speakingStep === -3 ? "bg-red-500 text-white" : "bg-gradient-to-r from-green-500 to-emerald-600 text-white"}`}>
                    {speakingStep === -3 ? <VolumeX size={14} /> : <Volume2 size={14} />} Play All
                  </button>
                </div>
                {selectedMeal.steps.map((step, i) => (
                  <div key={step.step} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl mb-2">
                    <span className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold shrink-0">{step.step}</span>
                    <div className="flex-1">
                      <p className="text-sm">{step.text}</p>
                      <p className="text-xs text-gray-400 mt-1">{step.time}</p>
                    </div>
                    <button onClick={() => speakText(`Step ${step.step}: ${step.text}. This takes ${step.time}.`, i)} className={`p-1.5 rounded-lg ${speakingStep === i ? "bg-green-500 text-white" : "bg-white text-green-500"}`}>
                      {speakingStep === i ? <VolumeX size={14} /> : <Volume2 size={14} />}
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "substitutes" && (
              <div>
                {selectedMeal.substitutes.map((sub) => (
                  <div key={sub.ingredient} className="p-3 bg-gray-50 rounded-xl mb-2">
                    <p className="text-sm font-bold">No {sub.ingredient}?</p>
                    <p className="text-xs text-gray-500 mt-1">Try: {sub.alternatives.join(", ")}</p>
                  </div>
                ))}
                <div className="mt-3">
                  <p className="text-xs font-bold text-gray-500 mb-1">Health Benefits</p>
                  {selectedMeal.benefits.map((b) => (
                    <p key={b} className="text-xs text-green-600 mb-1">- {b}</p>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
            <button onClick={() => toggleLikeMeal(selectedMeal.id)} className={`flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 ${isFavorited ? "bg-red-50 text-red-500 border-2 border-red-200" : "bg-gray-100 text-gray-700"}`}>
              <Heart size={16} className={isFavorited ? "fill-red-500" : ""} />
              {isFavorited ? "Liked" : "Like"}
            </button>
            <button onClick={() => { regenerateMealForDay(selectedMeal.id, selectedMeal.category); setShowRecipeSheet(false); }} className="flex-1 py-3 rounded-xl font-bold text-sm bg-green-500 text-white">
              Regenerate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
