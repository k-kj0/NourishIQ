"use client";

import { useState } from "react";
import { useApp } from "../AppContext";
import { motion, AnimatePresence } from "framer-motion";
import { KawaiiCharacter } from "../components/KawaiiCharacter";
import { Heart, RefreshCw, ChevronLeft, ChevronRight, Clock, Flame, Utensils, X, Volume2, VolumeX, Play, Pause, Search, Sparkles } from "lucide-react";
import { getGreeting } from "../lib/mealData";

export function HomeTab() {
  const {
    userProfile,
    selectedDate,
    setSelectedDate,
    dayPlan,
    includeDessert,
    setIncludeDessert,
    includeBeverage,
    setIncludeBeverage,
    toggleLikeMeal,
    regenerateMealForDay,
    setSelectedMeal,
    setShowRecipeSheet,
    loggedMeals,
    toggleLoggedMeal,
    cravingQuery,
    setCravingQuery,
    cravingResults,
    searchCravings,
    showCravingInput,
    setShowCravingInput,
  } = useApp();

  const [showMealLog, setShowMealLog] = useState<string | null>(null);
  const [showCravingPopup, setShowCravingPopup] = useState(false);
  const [speakingMealId, setSpeakingMealId] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const today = new Date();
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - 3 + i);
    return d;
  });

  const consumedCal = Object.entries(loggedMeals)
    .filter(([_, logged]) => logged)
    .reduce((sum, [mealId]) => {
      const meal = dayPlan.meals.find((m) => m.id === mealId);
      return sum + (meal?.calories || 0);
    }, 0);

  // Voice agent using Web Speech API
  const speakRecipe = (meal: any, stepIndex: number = 0) => {
    if (!window.speechSynthesis) return;

    window.speechSynthesis.cancel();

    if (speakingMealId === meal.id && stepIndex === currentStep) {
      setSpeakingMealId(null);
      setCurrentStep(0);
      return;
    }

    setSpeakingMealId(meal.id);
    setCurrentStep(stepIndex);

    const text = stepIndex === 0 
      ? `${meal.name}. ${meal.ingredients.join(", ")}. Let's start cooking.`
      : `Step ${stepIndex}: ${meal.steps[stepIndex - 1]?.text}. Time: ${meal.steps[stepIndex - 1]?.time}.`;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    utterance.onend = () => {
      if (stepIndex < meal.steps.length) {
        setCurrentStep(stepIndex + 1);
        setTimeout(() => speakRecipe(meal, stepIndex + 1), 500);
      } else {
        setSpeakingMealId(null);
        setCurrentStep(0);
      }
    };
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setSpeakingMealId(null);
    setCurrentStep(0);
  };

  // Craving popup with cuisine search
  const CravingPopup = () => {
    const [localQuery, setLocalQuery] = useState("");
    const [localResults, setLocalResults] = useState<any[]>([]);
    const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);

    const cuisines = [
      { name: "Chinese", emoji: "🥡", color: "from-red-400 to-red-500" },
      { name: "Thai", emoji: "🍜", color: "from-orange-400 to-amber-500" },
      { name: "Japanese", emoji: "🍣", color: "from-pink-400 to-rose-500" },
      { name: "Indian", emoji: "🍛", color: "from-yellow-400 to-orange-500" },
      { name: "Italian", emoji: "🍝", color: "from-green-400 to-emerald-500" },
      { name: "Mexican", emoji: "🌮", color: "from-amber-400 to-yellow-500" },
      { name: "Mediterranean", emoji: "🥙", color: "from-blue-400 to-cyan-500" },
      { name: "Korean", emoji: "🥘", color: "from-red-400 to-pink-500" },
    ];

    const handleCuisineClick = (cuisine: string) => {
      setSelectedCuisine(cuisine);
      setLocalQuery(cuisine);
      searchCravings(cuisine);
      setLocalResults(cravingResults.slice(0, 8));
    };

    const handleSearch = () => {
      if (localQuery.trim()) {
        searchCravings(localQuery);
        setLocalResults(cravingResults.slice(0, 8));
      }
    };

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm"
        onClick={() => setShowCravingPopup(false)}
      >
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="w-full max-w-[460px] bg-white rounded-t-3xl max-h-[85vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-6 pt-6 pb-4 border-b border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-white text-lg">
                  🔍
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">What are you craving?</h3>
                  <p className="text-xs text-gray-400">Search by cuisine, ingredient, or mood</p>
                </div>
              </div>
              <button 
                onClick={() => setShowCravingPopup(false)}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Search bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Chinese, spicy, sweet, pasta..."
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-gray-50 border-2 border-gray-100 focus:border-orange-400 outline-none font-bold text-sm"
              />
              <button 
                onClick={handleSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-gradient-to-r from-orange-400 to-amber-500 text-white"
              >
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Cuisine grid */}
          {!selectedCuisine && (
            <div className="px-6 py-4">
              <p className="text-sm font-bold text-gray-500 mb-3">Popular cuisines</p>
              <div className="grid grid-cols-4 gap-3">
                {cuisines.map((cuisine) => (
                  <motion.button
                    key={cuisine.name}
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCuisineClick(cuisine.name)}
                    className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-2xl">{cuisine.emoji}</span>
                    <span className="text-xs font-bold text-gray-700">{cuisine.name}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Results */}
          <div className="px-6 py-4 overflow-y-auto max-h-[400px] custom-scrollbar">
            {localResults.length > 0 ? (
              <div className="space-y-3">
                <p className="text-sm font-bold text-gray-500 mb-2">
                  {localResults.length} results for "{localQuery}"
                </p>
                {localResults.map((meal, i) => (
                  <motion.button
                    key={meal.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => {
                      setSelectedMeal(meal);
                      setShowRecipeSheet(true);
                      setShowCravingPopup(false);
                    }}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-green-50 transition-colors text-left"
                  >
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white text-xl shrink-0">
                      {meal.category === "breakfast" ? "🌅" :
                       meal.category === "lunch" ? "☀️" :
                       meal.category === "dinner" ? "🌙" :
                       meal.category === "snack" ? "🍿" :
                       meal.category === "dessert" ? "🍰" : "🥤"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-900 truncate">{meal.name}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                        <span className="flex items-center gap-1">
                          <Flame className="w-3 h-3 text-orange-400" />
                          {meal.calories} kcal
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-blue-400" />
                          {meal.cookTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <Utensils className="w-3 h-3 text-green-400" />
                          {meal.ingredients.length} ingredients
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 shrink-0" />
                  </motion.button>
                ))}
              </div>
            ) : selectedCuisine ? (
              <div className="text-center py-8">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-4xl mb-3"
                >
                  🔍
                </motion.div>
                <p className="text-gray-400 text-sm">No results found. Try a different search!</p>
              </div>
            ) : null}
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="flex flex-col min-h-[calc(100dvh-80px)]">
      {/* Greeting Header with animated background */}
      <div className="relative px-6 pt-6 pb-4 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br from-green-200/30 to-emerald-200/20 blur-2xl"
            animate={{ scale: [1, 1.2, 1], x: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-5 -left-5 w-32 h-32 rounded-full bg-gradient-to-br from-orange-200/20 to-amber-200/15 blur-2xl"
            animate={{ scale: [1, 1.3, 1], y: [0, 10, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>

        <div className="relative z-10 flex items-center justify-between">
          <div>
            <motion.h1 
              className="text-2xl font-black text-gray-900 font-display"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-gradient-warm">{getGreeting(userProfile.name || "friend")}</span>
              <motion.span
                className="inline-block ml-2"
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {today.getHours() >= 18 ? "🌙" : today.getHours() >= 12 ? "☀️" : "🌅"}
              </motion.span>
            </motion.h1>
            <motion.p 
              className="text-sm text-gray-400 font-medium mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {today.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
            </motion.p>
          </div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.3 }}
            className="relative"
          >
            <KawaiiCharacter emotion="happy" size={50} />
            <motion.div
              className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-400 border-2 border-white"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </div>

      {/* Date picker with today highlighted */}
      <div className="px-6 pb-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            {today.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </p>
          <div className="flex gap-1">
            <button className="p-1 rounded-full hover:bg-gray-100 transition-colors">
              <ChevronLeft className="w-4 h-4 text-gray-400" />
            </button>
            <button className="p-1 rounded-full hover:bg-gray-100 transition-colors">
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
          {days.map((date, i) => {
            const isSelected =
              date.getDate() === selectedDate.getDate() &&
              date.getMonth() === selectedDate.getMonth();
            const isToday = date.getDate() === today.getDate() && date.getMonth() === today.getMonth();
            const isPast = date < new Date(today.setHours(0, 0, 0, 0));

            return (
              <motion.button
                key={i}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedDate(date)}
                className={`relative flex w-14 shrink-0 flex-col items-center gap-1 rounded-2xl px-2 py-3 transition-all ${
                  isSelected
                    ? "bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-glow"
                    : isToday
                    ? "bg-white border-2 border-green-400 text-green-600 shadow-soft"
                    : isPast
                    ? "bg-white text-gray-300 opacity-60"
                    : "bg-white text-gray-600 shadow-soft border border-gray-100"
                }`}
              >
                {isToday && !isSelected && (
                  <motion.span 
                    className="absolute -top-1.5 text-xs"
                    animate={{ y: [0, -2, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    📍
                  </motion.span>
                )}
                <span className="text-lg font-black">{date.getDate()}</span>
                <span className="text-[10px] font-bold uppercase">
                  {date.toLocaleDateString("en-US", { weekday: "short" })}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Macros with animated bars */}
      <div className="px-6 pb-4">
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "KCAL", value: consumedCal, target: dayPlan.targetCalories, color: "from-green-400 to-emerald-500", bg: "bg-green-50", text: "text-green-600" },
            { label: "PROTEIN", value: dayPlan.totalProtein, target: dayPlan.targetProtein, color: "from-orange-400 to-amber-500", bg: "bg-orange-50", text: "text-orange-600", suffix: "g" },
            { label: "CARBS", value: dayPlan.totalCarbs, target: dayPlan.targetCarbs, color: "from-purple-400 to-violet-500", bg: "bg-purple-50", text: "text-purple-600", suffix: "g" },
          ].map((macro) => (
            <motion.div 
              key={macro.label}
              whileHover={{ scale: 1.02, y: -2 }}
              className={`${macro.bg} rounded-2xl p-3 shadow-soft`}
            >
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{macro.label}</p>
              <div className="flex items-baseline gap-1 mt-1">
                <motion.span 
                  className={`text-xl font-black ${macro.text}`}
                  key={macro.value}
                  initial={{ scale: 1.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring" }}
                >
                  {macro.value}
                </motion.span>
                <span className="text-xs text-gray-400 font-medium">/ {macro.target}{macro.suffix || ""}</span>
              </div>
              <div className="w-full h-1.5 bg-gray-200 rounded-full mt-2 overflow-hidden">
                <motion.div
                  className={`h-full rounded-full bg-gradient-to-r ${macro.color}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((macro.value / macro.target) * 100, 100)}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div className="px-6 pb-4 flex gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowMealLog(showMealLog ? null : "all")}
          className="flex-1 py-3 rounded-2xl bg-white border-2 border-gray-100 font-bold text-sm text-gray-700 shadow-soft hover:shadow-md transition-all flex items-center justify-center gap-2"
        >
          <Utensils className="w-4 h-4 text-green-500" />
          Log meals
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowCravingPopup(true)}
          className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-orange-400 to-amber-500 text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          Craving?
        </motion.button>
      </div>

      {/* Meal cards with proper images and voice agent */}
      <div className="px-6 pb-24 space-y-4">
        <AnimatePresence>
          {dayPlan.meals.map((meal, index) => (
            <motion.div
              key={meal.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="bg-white rounded-3xl shadow-soft overflow-hidden border border-gray-100"
            >
              {/* Image with overlay */}
              <div 
                className="relative h-48 bg-gray-100 overflow-hidden cursor-pointer"
                onClick={() => {
                  setSelectedMeal(meal);
                  setShowRecipeSheet(true);
                }}
              >
                <motion.img
                  src={meal.image}
                  alt={meal.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://placehold.co/800x400/22c55e/ffffff?text=${encodeURIComponent(meal.name)}`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Category badge */}
                <div className="absolute top-3 left-3">
                  <span className={`px-3 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r ${
                    meal.category === "breakfast" ? "from-orange-400 to-amber-500" :
                    meal.category === "lunch" ? "from-green-400 to-emerald-500" :
                    meal.category === "dinner" ? "from-purple-400 to-violet-500" :
                    meal.category === "snack" ? "from-pink-400 to-rose-500" :
                    meal.category === "dessert" ? "from-red-400 to-rose-500" :
                    "from-blue-400 to-cyan-500"
                  }`}>
                    {meal.category.toUpperCase()}
                  </span>
                </div>

                {/* Action buttons */}
                <div className="absolute top-3 right-3 flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLikeMeal(meal.id);
                    }}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/95 shadow-md backdrop-blur-sm"
                  >
                    <Heart className={`w-4 h-4 ${meal.isLiked ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      regenerateMealForDay(meal.id, meal.category);
                    }}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/95 shadow-md backdrop-blur-sm"
                  >
                    <RefreshCw className="w-4 h-4 text-green-500" />
                  </motion.button>
                </div>

                {/* Voice agent button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (speakingMealId === meal.id) {
                      stopSpeaking();
                    } else {
                      speakRecipe(meal, 0);
                    }
                  }}
                  className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 shadow-md backdrop-blur-sm"
                >
                  {speakingMealId === meal.id ? (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    >
                      <VolumeX className="w-4 h-4 text-red-500" />
                    </motion.div>
                  ) : (
                    <Volume2 className="w-4 h-4 text-green-500" />
                  )}
                </motion.button>

                {/* Speaking indicator */}
                {speakingMealId === meal.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-3 left-3 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm shadow-md"
                  >
                    <div className="flex items-center gap-2">
                      <motion.div
                        animate={{ scaleY: [1, 0.5, 1] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        className="w-1 h-3 bg-green-500 rounded-full"
                      />
                      <motion.div
                        animate={{ scaleY: [1, 0.3, 1] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }}
                        className="w-1 h-4 bg-green-500 rounded-full"
                      />
                      <motion.div
                        animate={{ scaleY: [1, 0.5, 1] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
                        className="w-1 h-3 bg-green-500 rounded-full"
                      />
                      <span className="text-xs font-bold text-green-600">Speaking step {currentStep}...</span>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Meal info */}
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-900">{meal.name}</h3>
                <p className="text-sm text-gray-400 mt-1 truncate">{meal.ingredients.slice(0, 4).join(" · ")}{meal.ingredients.length > 4 ? "..." : ""}</p>

                <div className="flex items-center gap-2 mt-3 flex-wrap">
                  <span className="px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-bold">
                    {meal.calories} kcal
                  </span>
                  <span className="px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-xs font-bold">
                    P {meal.protein}g
                  </span>
                  <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-600 text-xs font-bold">
                    C {meal.carbs}g
                  </span>
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold">
                    F {meal.fat}g
                  </span>
                  <span className="px-3 py-1 rounded-full bg-gray-50 text-gray-500 text-xs font-bold flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {meal.cookTime}
                  </span>
                </div>

                {/* Log meal toggle */}
                {showMealLog && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => toggleLoggedMeal(meal.id)}
                    className={`mt-3 w-full py-2.5 rounded-xl font-bold text-sm transition-all ${
                      loggedMeals[meal.id]
                        ? "bg-green-500 text-white shadow-glow"
                        : "bg-gray-100 text-gray-500 hover:bg-green-50 hover:text-green-600"
                    }`}
                  >
                    {loggedMeals[meal.id] ? "✅ Logged!" : "Log this meal"}
                  </motion.button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Craving Popup */}
      <AnimatePresence>
        {showCravingPopup && <CravingPopup />}
      </AnimatePresence>
    </div>
  );
}
