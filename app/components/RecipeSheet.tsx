"use client";

import { useApp } from "../AppContext";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, Volume2, VolumeX, Play, Pause, ChefHat, Clock, Flame, Users, ShoppingBag, AlertCircle, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";

export function RecipeSheet() {
  const {
    selectedMeal,
    setShowRecipeSheet,
    showRecipeSheet,
    toggleLikeMeal,
    regenerateMealForDay,
  } = useApp();

  const [speakingStep, setSpeakingStep] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"ingredients" | "steps" | "substitutes">("ingredients");
  const [checkedIngredients, setCheckedIngredients] = useState<Set<string>>(new Set());

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (!selectedMeal || !showRecipeSheet) return null;

  const speakStep = (stepIndex: number) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();

    if (speakingStep === stepIndex) {
      setSpeakingStep(null);
      return;
    }

    setSpeakingStep(stepIndex);

    let text = "";
    if (stepIndex === -1) {
      text = `Let's make ${selectedMeal.name}. You'll need: ${selectedMeal.ingredients.join(", ")}. Let's begin!`;
    } else if (stepIndex === -2) {
      text = selectedMeal.substitutes.map(s => `No ${s.ingredient}? Try: ${s.alternatives.join(", ")}.`).join(" ");
    } else {
      const step = selectedMeal.steps[stepIndex];
      text = `Step ${step.step}: ${step.text}. This takes ${step.time}.`;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85;
    utterance.pitch = 1.05;
    utterance.onend = () => setSpeakingStep(null);
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setSpeakingStep(null);
  };

  const toggleIngredient = (ing: string) => {
    setCheckedIngredients(prev => {
      const next = new Set(prev);
      if (next.has(ing)) next.delete(ing);
      else next.add(ing);
      return next;
    });
  };

  const speakAllSteps = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();

    const allText = selectedMeal.steps.map(s => `Step ${s.step}: ${s.text}. Time: ${s.time}.`).join(" Next. ");
    const utterance = new SpeechSynthesisUtterance(`Recipe for ${selectedMeal.name}. ${allText}`);
    utterance.rate = 0.85;
    utterance.pitch = 1.05;
    utterance.onend = () => setSpeakingStep(null);
    setSpeakingStep(-3);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm"
        onClick={() => {
          stopSpeaking();
          setShowRecipeSheet(false);
        }}
      >
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="w-full max-w-[460px] bg-white rounded-t-3xl max-h-[90vh] overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Image */}
          <div className="relative h-56 shrink-0">
            <motion.img
              src={selectedMeal.image}
              alt={selectedMeal.name}
              className="w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://placehold.co/800x400/22c55e/ffffff?text=${encodeURIComponent(selectedMeal.name)}`;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Close button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                stopSpeaking();
                setShowRecipeSheet(false);
              }}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-colors"
            >
              <X className="w-5 h-5" />
            </motion.button>

            {/* Like button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => toggleLikeMeal(selectedMeal.id)}
              className="absolute top-4 left-4 p-2.5 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-colors"
            >
              <Heart className={`w-5 h-5 ${selectedMeal.isLiked ? "fill-red-500 text-red-500" : ""}`} />
            </motion.button>

            {/* Title overlay */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex flex-wrap gap-1.5 mb-2">
                {selectedMeal.dietaryTags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-bold">
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="text-2xl font-black text-white font-display">{selectedMeal.name}</h2>
              <p className="text-white/70 text-sm mt-1">{selectedMeal.ingredients.slice(0, 5).join(" · ")}</p>
            </div>
          </div>

          {/* Quick stats */}
          <div className="px-6 py-4 border-b border-gray-100">
            <div className="grid grid-cols-4 gap-3">
              {[
                { icon: <Flame className="w-4 h-4" />, value: `${selectedMeal.calories}`, label: "kcal", color: "text-orange-500" },
                { icon: <Clock className="w-4 h-4" />, value: selectedMeal.cookTime, label: "", color: "text-blue-500" },
                { icon: <ChefHat className="w-4 h-4" />, value: `${selectedMeal.ingredients.length}`, label: "items", color: "text-green-500" },
                { icon: <Users className="w-4 h-4" />, value: "2", label: "servings", color: "text-purple-500" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className={`flex items-center justify-center gap-1 ${stat.color} font-bold text-sm`}>
                    {stat.icon}
                    <span>{stat.value}</span>
                  </div>
                  <p className="text-[10px] text-gray-400 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Voice agent bar */}
          <div className="px-6 py-3 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white">
                  <Volume2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Voice Chef</p>
                  <p className="text-xs text-gray-400">Listen to recipe step-by-step</p>
                </div>
              </div>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => speakStep(-1)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 ${
                    speakingStep === -1 
                      ? "bg-green-500 text-white" 
                      : "bg-white border-2 border-green-200 text-green-600"
                  }`}
                >
                  {speakingStep === -1 ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                  Intro
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => speakingStep === -3 ? stopSpeaking() : speakAllSteps()}
                  className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 ${
                    speakingStep === -3
                      ? "bg-red-500 text-white" 
                      : "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                  }`}
                >
                  {speakingStep === -3 ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                  Play All
                </motion.button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="px-6 pt-4 border-b border-gray-100">
            <div className="flex gap-1">
              {(["ingredients", "steps", "substitutes"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-t-xl text-sm font-bold transition-all capitalize ${
                    activeTab === tab
                      ? "text-green-600 border-b-2 border-green-500 bg-green-50"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto custom-scrollbar px-6 py-4">
            <AnimatePresence mode="wait">
              {activeTab === "ingredients" && (
                <motion.div
                  key="ingredients"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                      <ShoppingBag className="w-4 h-4 text-green-500" />
                      Ingredients
                    </h3>
                    <span className="text-xs text-gray-400 font-medium">
                      {checkedIngredients.size}/{selectedMeal.ingredients.length} checked
                    </span>
                  </div>
                  {selectedMeal.ingredients.map((ing, i) => (
                    <motion.button
                      key={ing}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => toggleIngredient(ing)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left ${
                        checkedIngredients.has(ing)
                          ? "bg-green-50 border-2 border-green-200"
                          : "bg-gray-50 border-2 border-transparent hover:border-gray-200"
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        checkedIngredients.has(ing) 
                          ? "bg-green-500 text-white" 
                          : "bg-gray-200 text-gray-500"
                      }`}>
                        {checkedIngredients.has(ing) ? "✓" : i + 1}
                      </div>
                      <span className={`font-bold ${checkedIngredients.has(ing) ? "text-green-700 line-through" : "text-gray-700"}`}>
                        {ing}
                      </span>
                    </motion.button>
                  ))}

                  {/* Spices section */}
                  <div className="mt-4">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-2">
                      <span className="text-lg">🌶️</span>
                      Spices
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedMeal.spices.map((spice) => (
                        <span key={spice} className="px-3 py-1.5 rounded-full bg-orange-50 text-orange-600 text-xs font-bold border border-orange-100">
                          {spice}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "steps" && (
                <motion.div
                  key="steps"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                      <ChefHat className="w-4 h-4 text-green-500" />
                      Cooking Steps
                    </h3>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => speakingStep === -3 ? stopSpeaking() : speakAllSteps()}
                      className="px-3 py-1.5 rounded-xl bg-green-100 text-green-600 text-xs font-bold flex items-center gap-1"
                    >
                      {speakingStep === -3 ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                      {speakingStep === -3 ? "Stop" : "Read All"}
                    </motion.button>
                  </div>
                  {selectedMeal.steps.map((step, i) => (
                    <motion.div
                      key={step.step}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className={`relative p-4 rounded-2xl transition-all ${
                        speakingStep === i 
                          ? "bg-green-50 border-2 border-green-300 shadow-glow" 
                          : "bg-gray-50 border-2 border-transparent"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black shrink-0 ${
                          speakingStep === i
                            ? "bg-green-500 text-white"
                            : "bg-white text-gray-400 shadow-sm"
                        }`}>
                          {step.step}
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-800 leading-relaxed">{step.text}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="flex items-center gap-1 text-xs text-gray-400 font-medium">
                              <Clock className="w-3 h-3" />
                              {step.time}
                            </span>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => speakStep(i)}
                              className={`p-1.5 rounded-lg ${
                                speakingStep === i 
                                  ? "bg-green-500 text-white" 
                                  : "bg-white text-green-500 shadow-sm"
                              }`}
                            >
                              {speakingStep === i ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                            </motion.button>
                          </div>
                        </div>
                      </div>
                      {speakingStep === i && (
                        <motion.div
                          className="absolute left-0 top-0 bottom-0 w-1 bg-green-500 rounded-l-2xl"
                          layoutId="activeStep"
                        />
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {activeTab === "substitutes" && (
                <motion.div
                  key="substitutes"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-4"
                >
                  <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-500" />
                    Don&apos;t have an ingredient?
                  </h3>
                  {selectedMeal.substitutes.map((sub, i) => (
                    <motion.div
                      key={sub.ingredient}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-4 rounded-2xl bg-amber-50 border border-amber-100"
                    >
                      <p className="font-bold text-amber-800 mb-2">No {sub.ingredient}?</p>
                      <p className="text-sm text-amber-600">
                        Try: <span className="font-bold">{sub.alternatives.join(", ")}</span>
                      </p>
                    </motion.div>
                  ))}

                  {/* Benefits */}
                  <div className="mt-6">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-3">
                      <span className="text-lg">💚</span>
                      Health Benefits
                    </h3>
                    {selectedMeal.benefits.map((b, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-2 mb-2"
                      >
                        <span className="text-green-500 mt-0.5">•</span>
                        <p className="text-sm text-gray-600">{b}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Gender benefits */}
                  {selectedMeal.genderBenefits && (
                    <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-100">
                      <h3 className="font-bold text-pink-700 flex items-center gap-2 mb-2">
                        <span className="text-lg">🌸</span>
                        For Women
                      </h3>
                      {selectedMeal.genderBenefits.map((b, i) => (
                        <p key={i} className="text-sm text-pink-600 mb-1">• {b}</p>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom actions */}
          <div className="px-6 py-4 border-t border-gray-100 bg-white">
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleLikeMeal(selectedMeal.id)}
                className={`flex-1 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${
                  selectedMeal.isLiked 
                    ? "bg-red-50 text-red-500 border-2 border-red-200" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Heart className={`w-5 h-5 ${selectedMeal.isLiked ? "fill-red-500" : ""}`} />
                {selectedMeal.isLiked ? "Liked" : "Like"}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  regenerateMealForDay(selectedMeal.id, selectedMeal.category);
                  setShowRecipeSheet(false);
                }}
                className="flex-1 py-3 rounded-2xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                Regenerate
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
