"use client";

import { useState } from "react";
import { useApp } from "../AppContext";
import { motion, AnimatePresence } from "framer-motion";
import { KawaiiCharacter } from "./KawaiiCharacter";
import { ChevronLeft, ChevronRight, Zap, Clock, ChefHat, Package } from "lucide-react";
import { REGIONS, DIET_TYPES, HEALTH_GOALS, HEALTH_CONDITIONS, FOOD_CATEGORIES, TEXTURE_DISLIKES, FLAVOR_DISLIKES, APPLIANCE_OPTIONS } from "../lib/mealData";

export function OnboardingQuiz() {
  const { quizStep, setQuizStep, totalQuizSteps, quizState, updateQuizState, setCurrentView } = useApp();
  const [direction, setDirection] = useState(1);

  const progress = ((quizStep - 1) / (totalQuizSteps - 1)) * 100;

  const goNext = () => {
    if (quizStep < totalQuizSteps) {
      setDirection(1);
      setQuizStep(quizStep + 1);
    } else {
      setCurrentView("dashboard");
    }
  };

  const goBack = () => {
    if (quizStep > 1) {
      setDirection(-1);
      setQuizStep(quizStep - 1);
    }
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  // ==================== ANIMATED WELCOME SCREEN ====================
  const WelcomeStep = () => (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-green-50 via-white to-orange-50 px-6">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 left-10 w-64 h-64 rounded-full bg-green-200/30 blur-3xl"
          animate={{ scale: [1, 1.2, 1], x: [0, 20, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-40 right-5 w-48 h-48 rounded-full bg-orange-200/30 blur-3xl"
          animate={{ scale: [1, 1.3, 1], x: [0, -15, 0], y: [0, 15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 left-1/4 w-56 h-56 rounded-full bg-purple-200/20 blur-3xl"
          animate={{ scale: [1, 1.15, 1], x: [0, 10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Floating food emojis */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.span
          className="absolute top-[12%] left-[8%] text-3xl"
          animate={{ y: [0, -25, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        >
          🥑
        </motion.span>
        <motion.span
          className="absolute top-[8%] right-[12%] text-2xl"
          animate={{ y: [0, -20, 0], rotate: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          🍓
        </motion.span>
        <motion.span
          className="absolute top-[25%] right-[5%] text-2xl"
          animate={{ y: [0, -18, 0], rotate: [0, 12, 0] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          🥦
        </motion.span>
        <motion.span
          className="absolute top-[18%] left-[15%] text-2xl"
          animate={{ y: [0, -22, 0], rotate: [0, -6, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        >
          🍊
        </motion.span>
        <motion.span
          className="absolute bottom-[35%] left-[5%] text-2xl"
          animate={{ y: [0, -15, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        >
          🥕
        </motion.span>
        <motion.span
          className="absolute bottom-[40%] right-[8%] text-2xl"
          animate={{ y: [0, -20, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        >
          🍎
        </motion.span>
      </div>

      {/* Kawaii character */}
      <motion.div
        initial={{ scale: 0, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.3 }}
        className="mb-4"
      >
        <KawaiiCharacter emotion="wave" size={100} />
      </motion.div>

      {/* Animated NourishIQ Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="text-center mb-2"
      >
        <h1
          className="text-6xl font-black tracking-tight"
          style={{
            background: "linear-gradient(90deg, #22c55e, #f97316, #a855f7, #3b82f6, #22c55e)",
            backgroundSize: "300% 100%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "gradient-shift 4s ease infinite",
          }}
        >
          NourishIQ
        </h1>
      </motion.div>

      {/* Animated underline */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: 120 }}
        transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
        className="h-1.5 rounded-full mb-4"
        style={{
          background: "linear-gradient(90deg, #22c55e, #f97316)",
        }}
      />

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="text-lg text-gray-600 font-medium mb-8 text-center"
      >
        Your food, your rules.
      </motion.p>

      {/* Feature pills */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="flex gap-3 mb-10 flex-wrap justify-center"
      >
        {[
          { label: "Personalized", color: "#22c55e", bg: "#dcfce7" },
          { label: "Delicious", color: "#f97316", bg: "#ffedd5" },
          { label: "Nutritious", color: "#a855f7", bg: "#f3e8ff" },
        ].map((tag, i) => (
          <motion.span
            key={tag.label}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.2 + i * 0.15, type: "spring", stiffness: 300 }}
            className="px-4 py-2 rounded-full text-sm font-bold"
            style={{ backgroundColor: tag.bg, color: tag.color }}
          >
            {tag.label}
          </motion.span>
        ))}
      </motion.div>

      {/* CTA Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={goNext}
        className="px-10 py-4 rounded-2xl text-white font-bold text-lg shadow-lg flex items-center gap-2"
        style={{
          background: "linear-gradient(135deg, #22c55e, #16a34a)",
          boxShadow: "0 10px 40px rgba(34, 197, 94, 0.3)",
        }}
      >
        Let&apos;s go
        <motion.span
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          →
        </motion.span>
      </motion.button>

      {/* Bottom dots */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="flex gap-2 mt-8"
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full"
            style={{
              backgroundColor: i === 0 ? "#22c55e" : "#d1d5db",
            }}
            animate={i === 0 ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          />
        ))}
      </motion.div>
    </div>
  );

  // ==================== REST OF STEPS ====================
  const NameStep = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">What should we call you?</h2>
      <p className="text-gray-500">We want to make this personal.</p>
      <input
        type="text"
        value={quizState.name}
        onChange={(e) => updateQuizState({ name: e.target.value })}
        placeholder="Your name"
        className="w-full text-2xl font-bold p-4 rounded-2xl border-2 border-gray-200 focus:border-green-500 outline-none bg-white transition-colors"
      />
      {quizState.name && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold text-lg">
            {quizState.name.slice(0, 2).toUpperCase()}
          </div>
          <p className="text-green-600 font-medium">Nice to meet you, {quizState.name}!</p>
        </motion.div>
      )}
    </div>
  );

  const AgeStep = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">How old are you?</h2>
      <input
        type="number"
        value={quizState.age || ""}
        onChange={(e) => updateQuizState({ age: parseInt(e.target.value) || null })}
        placeholder="Age"
        className="w-full text-3xl font-black p-4 rounded-2xl border-2 border-gray-200 focus:border-green-500 outline-none bg-white text-center transition-colors"
      />
    </div>
  );

  const GenderStep = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">How do you identify?</h2>
      <p className="text-gray-500">Used for meal planning only.</p>
      <div className="grid grid-cols-2 gap-3">
        {["Male", "Female", "Non-binary", "Other", "Prefer not to say"].map((g) => (
          <button
            key={g}
            onClick={() => updateQuizState({ gender: g })}
            className={`p-4 rounded-2xl font-bold text-sm transition-all ${
              quizState.gender === g
                ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg scale-105"
                : "bg-white border-2 border-gray-200 text-gray-700 hover:border-green-300"
            }`}
          >
            {g}
          </button>
        ))}
      </div>
    </div>
  );

  const RegionStep = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Where are you based?</h2>
      <div className="space-y-2 max-h-[400px] overflow-y-auto">
        {REGIONS.map((r) => (
          <button
            key={r.code}
            onClick={() => updateQuizState({ region: r.name })}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold transition-all text-left ${
              quizState.region === r.name
                ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg"
                : "bg-white border-2 border-gray-200 text-gray-700 hover:border-green-300"
            }`}
          >
            <span className="text-2xl">{r.flag}</span>
            <span>{r.name}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const DietStep = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">What&apos;s your diet?</h2>
      <p className="text-gray-500">Select all that apply.</p>
      <div className="flex flex-wrap gap-2">
        {DIET_TYPES.map((d) => (
          <button
            key={d.id}
            onClick={() => {
              const current = quizState.dietType;
              const updated = current.includes(d.id)
                ? current.filter((x) => x !== d.id)
                : [...current, d.id];
              updateQuizState({ dietType: updated });
            }}
            className={`px-4 py-3 rounded-full font-bold text-sm transition-all ${
              quizState.dietType.includes(d.id)
                ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg scale-105"
                : "bg-white border-2 border-gray-200 text-gray-700 hover:border-green-300"
            }`}
          >
            {d.label}
          </button>
        ))}
      </div>
    </div>
  );

  const GoalsStep = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Health goals</h2>
      <p className="text-gray-500">What are you working toward?</p>
      <div className="flex flex-wrap gap-2">
        {HEALTH_GOALS.map((g) => (
          <button
            key={g.id}
            onClick={() => {
              const current = quizState.healthGoals;
              const updated = current.includes(g.id)
                ? current.filter((x) => x !== g.id)
                : [...current, g.id];
              updateQuizState({ healthGoals: updated });
            }}
            className={`px-4 py-3 rounded-full font-bold text-sm transition-all ${
              quizState.healthGoals.includes(g.id)
                ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg scale-105"
                : "bg-white border-2 border-gray-200 text-gray-700 hover:border-orange-300"
            }`}
          >
            {g.label}
          </button>
        ))}
      </div>
    </div>
  );

  const ConditionsStep = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Any health conditions?</h2>
      <p className="text-gray-500">Select all that apply.</p>
      <div className="space-y-2 max-h-[400px] overflow-y-auto">
        {HEALTH_CONDITIONS.map((c) => (
          <button
            key={c.id}
            onClick={() => {
              const current = quizState.healthConditions;
              let updated: string[];
              if (c.id === "none") {
                updated = current.includes("none") ? [] : ["none"];
              } else {
                updated = current.includes(c.id)
                  ? current.filter((x) => x !== c.id)
                  : [...current.filter((x) => x !== "none"), c.id];
              }
              updateQuizState({ healthConditions: updated });
            }}
            className={`w-full text-left p-4 rounded-2xl font-bold transition-all ${
              quizState.healthConditions.includes(c.id)
                ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg"
                : "bg-white border-2 border-gray-200 text-gray-700 hover:border-purple-300"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>
    </div>
  );

  const MenstrualStep = () => {
    const showMenstrual = ["Female", "Non-binary", "Other"].includes(quizState.gender);
    if (!showMenstrual) {
      setTimeout(goNext, 100);
      return null;
    }
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Menstrual health</h2>
        <p className="text-gray-500">Do you have a menstrual cycle?</p>
        <div className="grid grid-cols-3 gap-3">
          {["Yes", "No", "Prefer not to say"].map((opt) => (
            <button
              key={opt}
              onClick={() => updateQuizState({ hasMenstrualCycle: opt })}
              className={`p-3 rounded-2xl font-bold text-sm transition-all ${
                quizState.hasMenstrualCycle === opt
                  ? "bg-gradient-to-r from-green-500 to-green-600 text-white"
                  : "bg-white border-2 border-gray-200 hover:border-green-300"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
        {quizState.hasMenstrualCycle === "Yes" && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-4">
            <p className="text-gray-500 font-medium">Want meal recommendations for your cycle?</p>
            <div className="grid grid-cols-2 gap-3">
              {["Yes", "No"].map((opt) => (
                <button
                  key={opt}
                  onClick={() => updateQuizState({ wantMenstrualMeals: opt === "Yes" })}
                  className={`p-3 rounded-2xl font-bold text-sm transition-all ${
                    (quizState.wantMenstrualMeals && opt === "Yes") || (!quizState.wantMenstrualMeals && opt === "No")
                      ? "bg-gradient-to-r from-green-500 to-green-600 text-white"
                      : "bg-white border-2 border-gray-200 hover:border-green-300"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            <p className="text-gray-500 font-medium">Current phase?</p>
            <div className="space-y-2">
              {["Menstrual (Day 1-5)", "Follicular (Day 6-13)", "Ovulatory (Day 14-16)", "Luteal (Day 17-28)", "Not sure"].map((phase) => (
                <button
                  key={phase}
                  onClick={() => updateQuizState({ menstrualPhase: phase })}
                  className={`w-full text-left p-3 rounded-2xl font-bold text-sm transition-all ${
                    quizState.menstrualPhase === phase
                      ? "bg-gradient-to-r from-green-500 to-green-600 text-white"
                      : "bg-white border-2 border-gray-200 hover:border-green-300"
                  }`}
                >
                  {phase}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    );
  };

  const FoodsLoveStep = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Foods you love</h2>
      <p className="text-gray-500">Select categories you enjoy.</p>
      <div className="space-y-4 max-h-[400px] overflow-y-auto">
        {Object.entries(FOOD_CATEGORIES).slice(0, 6).map(([cat, items]) => (
          <div key={cat}>
            <h3 className="font-bold text-gray-700 mb-2">{cat}</h3>
            <div className="flex flex-wrap gap-2">
              {items.slice(0, 5).map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    const current = quizState.lovedFoods;
                    const updated = current.includes(item)
                      ? current.filter((x) => x !== item)
                      : [...current, item];
                    updateQuizState({ lovedFoods: updated });
                  }}
                  className={`px-3 py-2 rounded-xl text-sm font-bold transition-all ${
                    quizState.lovedFoods.includes(item)
                      ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md"
                      : "bg-white border-2 border-gray-200 text-gray-700 hover:border-green-300"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const FoodsAvoidStep = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">What do you want to avoid?</h2>
      <p className="text-gray-500">Textures, flavors, and foods.</p>
      <div>
        <h3 className="font-bold text-gray-700 mb-2">Textures</h3>
        <div className="flex flex-wrap gap-2">
          {TEXTURE_DISLIKES.map((t) => (
            <button
              key={t}
              onClick={() => {
                const current = quizState.avoidedTextures;
                const updated = current.includes(t)
                  ? current.filter((x) => x !== t)
                  : [...current, t];
                updateQuizState({ avoidedTextures: updated });
              }}
              className={`px-3 py-2 rounded-xl text-sm font-bold transition-all ${
                quizState.avoidedTextures.includes(t)
                  ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md"
                  : "bg-white border-2 border-gray-200 text-gray-700 hover:border-orange-300"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-bold text-gray-700 mb-2">Flavors</h3>
        <div className="flex flex-wrap gap-2">
          {FLAVOR_DISLIKES.map((f) => (
            <button
              key={f}
              onClick={() => {
                const current = quizState.avoidedFlavors;
                const updated = current.includes(f)
                  ? current.filter((x) => x !== f)
                  : [...current, f];
                updateQuizState({ avoidedFlavors: updated });
              }}
              className={`px-3 py-2 rounded-xl text-sm font-bold transition-all ${
                quizState.avoidedFlavors.includes(f)
                  ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-md"
                  : "bg-white border-2 border-gray-200 text-gray-700 hover:border-purple-300"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const CookingTimeStep = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">How much time?</h2>
      <p className="text-gray-500">For cooking each meal.</p>
      <div className="space-y-3">
        {[
          { id: "under-15", label: "Under 15 mins", icon: <Zap className="w-5 h-5" /> },
          { id: "15-30", label: "15-30 mins", icon: <Clock className="w-5 h-5" /> },
          { id: "30-60", label: "30-60 mins", icon: <ChefHat className="w-5 h-5" /> },
          { id: "1-2-hours", label: "1-2 hours", icon: <Clock className="w-5 h-5" /> },
          { id: "meal-prep", label: "I meal prep once a week", icon: <Package className="w-5 h-5" /> },
        ].map((opt) => (
          <button
            key={opt.id}
            onClick={() => updateQuizState({ cookingTime: opt.id })}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold transition-all text-left ${
              quizState.cookingTime === opt.id
                ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg"
                : "bg-white border-2 border-gray-200 text-gray-700 hover:border-green-300"
            }`}
          >
            {opt.icon}
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );

  const TimingStep = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Meal timing</h2>
      <p className="text-gray-500">When do you usually eat?</p>
      <div className="space-y-4">
        {[
          { key: "breakfast", label: "Breakfast", default: "08:00" },
          { key: "lunch", label: "Lunch", default: "13:00" },
          { key: "snack", label: "Snack", default: "16:00" },
          { key: "dinner", label: "Dinner", default: "20:00" },
        ].map((meal) => (
          <div key={meal.key} className="flex items-center justify-between p-3 bg-white rounded-xl border-2 border-gray-200">
            <span className="font-bold text-gray-700">{meal.label}</span>
            <input
              type="time"
              value={quizState.mealTimes[meal.key as keyof typeof quizState.mealTimes] || meal.default}
              onChange={(e) => {
                const newTimes = { ...quizState.mealTimes, [meal.key]: e.target.value };
                updateQuizState({ mealTimes: newTimes });
              }}
              className="bg-gray-100 rounded-xl px-3 py-2 font-bold text-sm border-0"
            />
          </div>
        ))}
      </div>
      <div>
        <p className="text-gray-500 font-medium mb-2">How many full meals per day?</p>
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((n) => (
            <button
              key={n}
              onClick={() => updateQuizState({ mealsPerDay: n })}
              className={`flex-1 p-3 rounded-xl font-bold transition-all ${
                quizState.mealsPerDay === n
                  ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md"
                  : "bg-white border-2 border-gray-200 text-gray-700 hover:border-green-300"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const WeightStep = () => {
    const showWeight = quizState.healthGoals.includes("lose-weight");
    if (!showWeight) {
      setTimeout(goNext, 100);
      return (
        <div className="text-center py-10">
          <p className="text-gray-500">Skipping weight - not needed for your goals.</p>
        </div>
      );
    }
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Weight details</h2>
        <div className="space-y-4">
          <div>
            <p className="text-gray-500 font-medium mb-2">Current weight</p>
            <div className="flex gap-2">
              <input
                type="number"
                value={quizState.currentWeight || ""}
                onChange={(e) => updateQuizState({ currentWeight: parseInt(e.target.value) || null })}
                placeholder="0"
                className="flex-1 text-2xl font-black p-4 rounded-2xl border-2 border-gray-200 focus:border-green-500 outline-none text-center transition-colors"
              />
              <select
                value={quizState.weightUnit}
                onChange={(e) => updateQuizState({ weightUnit: e.target.value })}
                className="bg-white border-2 border-gray-200 rounded-2xl px-4 font-bold"
              >
                <option value="kg">kg</option>
                <option value="lbs">lbs</option>
              </select>
            </div>
          </div>
          <div>
            <p className="text-gray-500 font-medium mb-2">Target weight</p>
            <input
              type="number"
              value={quizState.targetWeight || ""}
              onChange={(e) => updateQuizState({ targetWeight: parseInt(e.target.value) || null })}
              placeholder="0"
              className="w-full text-2xl font-black p-4 rounded-2xl border-2 border-gray-200 focus:border-green-500 outline-none text-center transition-colors"
            />
          </div>
        </div>
      </div>
    );
  };

  const AppliancesStep = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Your kitchen setup</h2>
      <p className="text-gray-500">What appliances do you have?</p>
      <div className="grid grid-cols-2 gap-3">
        {APPLIANCE_OPTIONS.map((a) => (
          <button
            key={a.id}
            onClick={() => {
              const current = quizState.appliances;
              const updated = current.includes(a.id)
                ? current.filter((x) => x !== a.id)
                : [...current, a.id];
              updateQuizState({ appliances: updated });
            }}
            className={`p-4 rounded-2xl font-bold text-sm transition-all ${
              quizState.appliances.includes(a.id)
                ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                : "bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-300"
            }`}
          >
            {a.name}
          </button>
        ))}
      </div>
    </div>
  );

  const ConfirmStep = () => (
    <div className="space-y-6 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <KawaiiCharacter emotion="love" size={80} className="mx-auto" />
      </motion.div>
      <h2 className="text-2xl font-bold text-gray-900">All set, {quizState.name}!</h2>
      <div className="flex flex-col items-center gap-3">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold text-xl">
          {quizState.name.slice(0, 2).toUpperCase()}
        </div>
        <p className="font-bold text-lg">{quizState.name}</p>
        <p className="text-gray-500">{quizState.region} • {quizState.dietType[0] ? DIET_TYPES.find((dt) => dt.id === quizState.dietType[0])?.label : "No diet selected"}</p>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {quizState.healthGoals.map((g) => (
          <span key={g} className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-sm font-bold">
            {HEALTH_GOALS.find((h) => h.id === g)?.label || g}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {quizState.dietType.map((d) => (
          <span key={d} className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-bold">
            {DIET_TYPES.find((dt) => dt.id === d)?.label || d}
          </span>
        ))}
      </div>
    </div>
  );

  const steps: Record<number, React.ReactNode> = {
    1: <WelcomeStep />,
    2: <NameStep />,
    3: <AgeStep />,
    4: <GenderStep />,
    5: <RegionStep />,
    6: <DietStep />,
    7: <GoalsStep />,
    8: <ConditionsStep />,
    9: <MenstrualStep />,
    10: <FoodsLoveStep />,
    11: <FoodsAvoidStep />,
    12: <CookingTimeStep />,
    13: <TimingStep />,
    14: <WeightStep />,
    15: <AppliancesStep />,
    16: <ConfirmStep />,
  };

  if (quizStep === 1) {
    return <WelcomeStep />;
  }

  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-green-50 to-white flex flex-col">
      {/* Progress bar */}
      <div className="px-6 pt-6 pb-2">
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={goBack}
            className="p-2 rounded-full bg-white border-2 border-gray-200 hover:border-green-300 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <span className="text-sm font-bold text-gray-500">
            {quizStep - 1} of {totalQuizSteps - 1}
          </span>
          <div className="w-10" />
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-4 overflow-y-auto">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={quizStep}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            {steps[quizStep] || steps[1]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom button */}
      <div className="px-6 pb-8 pt-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={goNext}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-lg shadow-lg flex items-center justify-center gap-2"
        >
          {quizStep === totalQuizSteps ? "Get Started" : "Continue"}
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}
