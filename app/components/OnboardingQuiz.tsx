"use client";

import { useState } from "react";
import { useApp } from "../AppContext";
import { motion, AnimatePresence } from "framer-motion";
import { KawaiiCharacter } from "./KawaiiCharacter";
import { ChevronLeft, ChevronRight, Cake, Scale } from "lucide-react";
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
    <div className="flex flex-col items-center justify-center h-full px-6 pt-16 pb-8 text-center relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 left-4 w-16 h-16 rounded-full bg-leaf/20 blur-xl"
          animate={{ y: [0, -20, 0], x: [0, 10, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-32 right-6 w-20 h-20 rounded-full bg-coral/20 blur-xl"
          animate={{ y: [0, 15, 0], x: [0, -15, 0], scale: [1, 1.3, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute bottom-40 left-8 w-12 h-12 rounded-full bg-grape/20 blur-xl"
          animate={{ y: [0, -25, 0], scale: [1, 1.4, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-14 h-14 rounded-full bg-ocean/20 blur-xl"
          animate={{ y: [0, 20, 0], x: [0, -10, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        {/* Floating food icons */}
        <motion.span
          className="absolute top-20 left-1/4 text-2xl opacity-30"
          animate={{ y: [0, -30, 0], rotate: [0, 15, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >🥑</motion.span>
        <motion.span
          className="absolute top-40 right-1/4 text-xl opacity-30"
          animate={{ y: [0, -20, 0], rotate: [0, -10, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        >🍓</motion.span>
        <motion.span
          className="absolute bottom-52 left-1/3 text-lg opacity-30"
          animate={{ y: [0, -25, 0], rotate: [0, 20, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
        >🥦</motion.span>
        <motion.span
          className="absolute bottom-32 right-1/3 text-2xl opacity-30"
          animate={{ y: [0, -15, 0], rotate: [0, -15, 15, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        >🍊</motion.span>
      </div>

      {/* Kawaii character with bounce */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
      >
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <KawaiiCharacter emotion="excited" size={140} />
        </motion.div>
      </motion.div>

      {/* Animated NourishIQ Title */}
      <motion.div
        className="mt-6 relative"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <motion.h1
          className="text-[40px] font-black leading-tight tracking-tight"
          style={{
            background: "linear-gradient(135deg, #84cc16 0%, #65a30d 25%, #f97316 50%, #a855f7 75%, #0ea5e9 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        >
          NourishIQ
        </motion.h1>

        {/* Animated underline */}
        <motion.div
          className="h-1.5 rounded-full mt-1 mx-auto"
          style={{
            background: "linear-gradient(90deg, #84cc16, #f97316, #a855f7)",
          }}
          initial={{ width: 0 }}
          animate={{ width: "80%" }}
          transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
        />
      </motion.div>

      {/* Animated tagline */}
      <motion.p
        className="mt-4 text-lg text-gray-500 font-medium"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        Your food, your rules.
      </motion.p>

      {/* Animated feature pills */}
      <motion.div
        className="mt-6 flex flex-wrap justify-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
      >
        {["Personalized", "Delicious", "Nutritious"].map((tag, i) => (
          <motion.span
            key={tag}
            className="px-4 py-1.5 rounded-full text-xs font-bold text-white"
            style={{
              background: i === 0 ? "linear-gradient(135deg, #84cc16, #65a30d)" :
                        i === 1 ? "linear-gradient(135deg, #f97316, #ea580c)" :
                        "linear-gradient(135deg, #a855f7, #7e22ce)",
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1 + i * 0.15, type: "spring", stiffness: 300 }}
          >
            {tag}
          </motion.span>
        ))}
      </motion.div>

      {/* Animated CTA button */}
      <motion.button
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.5 }}
        whileHover={{ scale: 1.05, boxShadow: "0 8px 30px rgba(132, 204, 22, 0.4)" }}
        whileTap={{ scale: 0.95 }}
        onClick={goNext}
        className="mt-10 w-full gradient-leaf text-white font-bold py-4 rounded-2xl text-lg shadow-glow relative overflow-hidden"
      >
        <motion.span
          className="relative z-10"
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          Let&apos;s go &rarr;
        </motion.span>
        <motion.div
          className="absolute inset-0 bg-white/20"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.5 }}
        />
      </motion.button>

      {/* Bottom floating particles */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-leaf/40"
            animate={{ y: [0, -10, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
      </div>
    </div>
  );

  // ==================== REST OF STEPS (unchanged) ====================
  const NameStep = () => (
    <div className="px-6 pt-12">
      <h2 className="text-2xl font-black mb-2">What should we call you?</h2>
      <p className="text-gray-500 mb-8">We want to make this personal.</p>
      <input
        type="text"
        value={quizState.name}
        onChange={(e) => updateQuizState({ name: e.target.value })}
        placeholder="Your name"
        className="w-full text-2xl font-bold p-4 rounded-2xl border-2 border-gray-200 focus:border-leaf outline-none bg-white"
      />
      {quizState.name && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 flex items-center gap-3">
          <div className="w-12 h-12 rounded-full gradient-leaf flex items-center justify-center text-white font-bold text-lg">
            {quizState.name.slice(0, 2).toUpperCase()}
          </div>
          <span className="text-gray-600">Nice to meet you, {quizState.name}!</span>
        </motion.div>
      )}
    </div>
  );

  const AgeStep = () => (
    <div className="px-6 pt-12">
      <div className="flex items-center gap-3 mb-4">
        <Cake className="w-8 h-8 text-coral" />
        <h2 className="text-2xl font-black">How old are you?</h2>
      </div>
      <input
        type="number"
        min={10}
        max={99}
        value={quizState.age || ""}
        onChange={(e) => updateQuizState({ age: parseInt(e.target.value) || null })}
        placeholder="Age"
        className="w-full text-3xl font-black p-4 rounded-2xl border-2 border-gray-200 focus:border-leaf outline-none bg-white text-center"
      />
    </div>
  );

  const GenderStep = () => (
    <div className="px-6 pt-12">
      <h2 className="text-2xl font-black mb-2">How do you identify?</h2>
      <p className="text-gray-500 mb-6">Used for meal planning only.</p>
      <div className="grid grid-cols-2 gap-3">
        {["Male", "Female", "Non-binary", "Other", "Prefer not to say"].map((g) => (
          <motion.button
            key={g}
            whileTap={{ scale: 0.95 }}
            onClick={() => updateQuizState({ gender: g as any })}
            className={`p-4 rounded-2xl font-bold text-sm transition-all ${
              quizState.gender === g
                ? "gradient-leaf text-white shadow-glow scale-105"
                : "bg-white border-2 border-gray-200 text-gray-700"
            }`}
          >
            {g}
          </motion.button>
        ))}
      </div>
    </div>
  );

  const RegionStep = () => (
    <div className="px-6 pt-12">
      <h2 className="text-2xl font-black mb-6">Where are you based?</h2>
      <div className="space-y-2 max-h-[400px] overflow-y-auto no-scrollbar">
        {REGIONS.map((r) => (
          <motion.button
            key={r.code}
            whileTap={{ scale: 0.98 }}
            onClick={() => updateQuizState({ region: r.name })}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${
              quizState.region === r.name
                ? "gradient-leaf text-white shadow-glow"
                : "bg-white border-2 border-gray-200 text-gray-700"
            }`}
          >
            <span className="text-2xl">{r.flag}</span>
            <span>{r.name}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );

  const DietStep = () => (
    <div className="px-6 pt-12">
      <h2 className="text-2xl font-black mb-2">What&apos;s your diet?</h2>
      <p className="text-gray-500 mb-6">Select all that apply.</p>
      <div className="flex flex-wrap gap-2">
        {DIET_TYPES.map((d) => (
          <motion.button
            key={d.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const current = quizState.dietType;
              const updated = current.includes(d.id)
                ? current.filter((x) => x !== d.id)
                : [...current, d.id];
              updateQuizState({ dietType: updated });
            }}
            className={`px-4 py-3 rounded-full font-bold text-sm transition-all ${
              quizState.dietType.includes(d.id)
                ? "gradient-leaf text-white shadow-glow scale-105"
                : "bg-white border-2 border-gray-200 text-gray-700"
            }`}
          >
            {d.label}
          </motion.button>
        ))}
      </div>
    </div>
  );

  const GoalsStep = () => (
    <div className="px-6 pt-12">
      <h2 className="text-2xl font-black mb-2">Health goals</h2>
      <p className="text-gray-500 mb-6">What are you working toward?</p>
      <div className="flex flex-wrap gap-2">
        {HEALTH_GOALS.map((g) => (
          <motion.button
            key={g.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const current = quizState.healthGoals;
              const updated = current.includes(g.id)
                ? current.filter((x) => x !== g.id)
                : [...current, g.id];
              updateQuizState({ healthGoals: updated });
            }}
            className={`px-4 py-3 rounded-full font-bold text-sm transition-all ${
              quizState.healthGoals.includes(g.id)
                ? "gradient-coral text-white shadow-soft scale-105"
                : "bg-white border-2 border-gray-200 text-gray-700"
            }`}
          >
            {g.label}
          </motion.button>
        ))}
      </div>
    </div>
  );

  const ConditionsStep = () => (
    <div className="px-6 pt-12">
      <h2 className="text-2xl font-black mb-2">Any health conditions?</h2>
      <p className="text-gray-500 mb-6">Select all that apply.</p>
      <div className="space-y-2">
        {HEALTH_CONDITIONS.map((c) => (
          <motion.button
            key={c.id}
            whileTap={{ scale: 0.98 }}
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
                ? "gradient-grape text-white shadow-soft"
                : "bg-white border-2 border-gray-200 text-gray-700"
            }`}
          >
            {c.label}
          </motion.button>
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
      <div className="px-6 pt-12">
        <h2 className="text-2xl font-black mb-2">Menstrual health</h2>
        <p className="text-gray-500 mb-4">Do you have a menstrual cycle?</p>
        <div className="grid grid-cols-3 gap-2 mb-6">
          {["Yes", "No", "Prefer not to say"].map((opt) => (
            <motion.button
              key={opt}
              whileTap={{ scale: 0.95 }}
              onClick={() => updateQuizState({ hasMenstrualCycle: opt })}
              className={`p-3 rounded-2xl font-bold text-sm transition-all ${
                quizState.hasMenstrualCycle === opt
                  ? "gradient-leaf text-white"
                  : "bg-white border-2 border-gray-200"
              }`}
            >
              {opt}
            </motion.button>
          ))}
        </div>
        {quizState.hasMenstrualCycle === "Yes" && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
            <p className="text-gray-500 mb-3">Want meal recommendations for your cycle?</p>
            <div className="flex gap-2 mb-4">
              {["Yes", "No"].map((opt) => (
                <button
                  key={opt}
                  onClick={() => updateQuizState({ wantMenstrualMeals: opt === "Yes" })}
                  className={`flex-1 p-3 rounded-2xl font-bold text-sm ${
                    (opt === "Yes" && quizState.wantMenstrualMeals) ||
                    (opt === "No" && !quizState.wantMenstrualMeals && quizState.wantMenstrualMeals !== false)
                      ? "gradient-leaf text-white"
                      : "bg-white border-2 border-gray-200"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            <p className="text-gray-500 mb-3">Current phase?</p>
            <div className="space-y-2">
              {["Menstrual (Day 1-5)", "Follicular (Day 6-13)", "Ovulatory (Day 14-16)", "Luteal (Day 17-28)", "Not sure"].map((phase) => (
                <button
                  key={phase}
                  onClick={() => updateQuizState({ menstrualPhase: phase })}
                  className={`w-full text-left p-3 rounded-2xl font-bold text-sm transition-all ${
                    quizState.menstrualPhase === phase
                      ? "bg-coral/20 text-coral border-2 border-coral"
                      : "bg-white border-2 border-gray-200"
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
    <div className="px-6 pt-12">
      <h2 className="text-2xl font-black mb-2">Foods you love</h2>
      <p className="text-gray-500 mb-6">Select categories you enjoy.</p>
      <div className="space-y-2 max-h-[400px] overflow-y-auto no-scrollbar">
        {Object.entries(FOOD_CATEGORIES).slice(0, 6).map(([cat, items]) => (
          <div key={cat} className="bg-white rounded-2xl p-4 border-2 border-gray-100">
            <h3 className="font-bold text-sm capitalize text-gray-700 mb-2">{cat}</h3>
            <div className="flex flex-wrap gap-1">
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
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                    quizState.lovedFoods.includes(item)
                      ? "bg-leaf text-white"
                      : "bg-gray-100 text-gray-600"
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
    <div className="px-6 pt-12">
      <h2 className="text-2xl font-black mb-2">What do you want to avoid?</h2>
      <p className="text-gray-500 mb-6">Textures, flavors, and foods.</p>
      <div className="mb-4">
        <p className="font-bold text-sm mb-2">Textures</p>
        <div className="flex flex-wrap gap-2">
          {TEXTURE_DISLIKES.map((t) => (
            <button
              key={t}
              onClick={() => {
                const current = quizState.avoidedTextures;
                const updated = current.includes(t) ? current.filter((x) => x !== t) : [...current, t];
                updateQuizState({ avoidedTextures: updated });
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                quizState.avoidedTextures.includes(t)
                  ? "bg-coral text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <p className="font-bold text-sm mb-2">Flavors</p>
        <div className="flex flex-wrap gap-2">
          {FLAVOR_DISLIKES.map((f) => (
            <button
              key={f}
              onClick={() => {
                const current = quizState.avoidedFlavors;
                const updated = current.includes(f) ? current.filter((x) => x !== f) : [...current, f];
                updateQuizState({ avoidedFlavors: updated });
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                quizState.avoidedFlavors.includes(f)
                  ? "bg-grape text-white"
                  : "bg-gray-100 text-gray-600"
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
    <div className="px-6 pt-12">
      <h2 className="text-2xl font-black mb-2">How much time?</h2>
      <p className="text-gray-500 mb-6">For cooking each meal.</p>
      <div className="space-y-3">
        {[
          { id: "under-15", label: "Under 15 mins", icon: "Zap" },
          { id: "15-30", label: "15-30 mins", icon: "Cook" },
          { id: "30-60", label: "30-60 mins", icon: "Chef" },
          { id: "1-2-hours", label: "1-2 hours", icon: "Clock" },
          { id: "meal-prep", label: "I meal prep once a week", icon: "Box" },
        ].map((opt) => (
          <motion.button
            key={opt.id}
            whileTap={{ scale: 0.98 }}
            onClick={() => updateQuizState({ cookingTime: opt.id as any })}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${
              quizState.cookingTime === opt.id
                ? "gradient-leaf text-white shadow-glow"
                : "bg-white border-2 border-gray-200 text-gray-700"
            }`}
          >
            <span className="text-2xl font-black text-leaf/80">{opt.icon[0]}</span>
            <span>{opt.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );

  const TimingStep = () => (
    <div className="px-6 pt-12">
      <h2 className="text-2xl font-black mb-2">Meal timing</h2>
      <p className="text-gray-500 mb-6">When do you usually eat?</p>
      <div className="space-y-4">
        {[
          { key: "breakfast", label: "Breakfast", default: "08:00" },
          { key: "lunch", label: "Lunch", default: "13:00" },
          { key: "snack", label: "Snack", default: "16:00" },
          { key: "dinner", label: "Dinner", default: "20:00" },
        ].map((meal) => (
          <div key={meal.key} className="flex items-center justify-between bg-white p-4 rounded-2xl border-2 border-gray-100">
            <span className="font-bold">{meal.label}</span>
            <input
              type="time"
              value={quizState.mealTimes[meal.key as keyof typeof quizState.mealTimes]}
              onChange={(e) => {
                const newTimes = { ...quizState.mealTimes, [meal.key]: e.target.value };
                updateQuizState({ mealTimes: newTimes });
              }}
              className="bg-gray-100 rounded-xl px-3 py-2 font-bold text-sm"
            />
          </div>
        ))}
      </div>
      <div className="mt-6">
        <p className="font-bold mb-3">How many full meals per day?</p>
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((n) => (
            <button
              key={n}
              onClick={() => updateQuizState({ mealsPerDay: n })}
              className={`flex-1 py-3 rounded-2xl font-bold ${
                quizState.mealsPerDay === n
                  ? "gradient-leaf text-white"
                  : "bg-white border-2 border-gray-200"
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
        <div className="px-6 pt-12 text-center">
          <p className="text-gray-500">Skipping weight - not needed for your goals.</p>
        </div>
      );
    }
    return (
      <div className="px-6 pt-12">
        <div className="flex items-center gap-3 mb-4">
          <Scale className="w-8 h-8 text-leaf" />
          <h2 className="text-2xl font-black">Weight details</h2>
        </div>
        <div className="space-y-4">
          <div>
            <p className="font-bold mb-2">Current weight</p>
            <div className="flex gap-2">
              <input
                type="number"
                value={quizState.currentWeight || ""}
                onChange={(e) => updateQuizState({ currentWeight: parseInt(e.target.value) || null })}
                placeholder="0"
                className="flex-1 text-2xl font-black p-4 rounded-2xl border-2 border-gray-200 focus:border-leaf outline-none text-center"
              />
              <div className="flex bg-gray-100 rounded-2xl overflow-hidden">
                <button
                  onClick={() => updateQuizState({ weightUnit: "kg" })}
                  className={`px-4 font-bold ${quizState.weightUnit === "kg" ? "bg-leaf text-white" : "text-gray-500"}`}
                >
                  kg
                </button>
                <button
                  onClick={() => updateQuizState({ weightUnit: "lbs" })}
                  className={`px-4 font-bold ${quizState.weightUnit === "lbs" ? "bg-leaf text-white" : "text-gray-500"}`}
                >
                  lbs
                </button>
              </div>
            </div>
          </div>
          <div>
            <p className="font-bold mb-2">Target weight</p>
            <input
              type="number"
              value={quizState.targetWeight || ""}
              onChange={(e) => updateQuizState({ targetWeight: parseInt(e.target.value) || null })}
              placeholder="0"
              className="w-full text-2xl font-black p-4 rounded-2xl border-2 border-gray-200 focus:border-leaf outline-none text-center"
            />
          </div>
        </div>
      </div>
    );
  };

  const AppliancesStep = () => (
    <div className="px-6 pt-12">
      <h2 className="text-2xl font-black mb-2">Your kitchen setup</h2>
      <p className="text-gray-500 mb-6">What appliances do you have?</p>
      <div className="grid grid-cols-2 gap-3">
        {APPLIANCE_OPTIONS.map((a) => (
          <motion.button
            key={a.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const current = quizState.appliances;
              const updated = current.includes(a.id as any)
                ? current.filter((x) => x !== a.id)
                : [...current, a.id as any];
              updateQuizState({ appliances: updated });
            }}
            className={`p-4 rounded-2xl font-bold text-sm transition-all ${
              quizState.appliances.includes(a.id as any)
                ? "gradient-ocean text-white shadow-soft"
                : "bg-white border-2 border-gray-200 text-gray-700"
            }`}
          >
            {a.name}
          </motion.button>
        ))}
      </div>
    </div>
  );

  const ConfirmStep = () => (
    <div className="px-6 pt-12 pb-24">
      <h2 className="text-2xl font-black mb-6 text-center">All set, {quizState.name}!</h2>
      <div className="bg-white rounded-3xl p-6 shadow-card border-2 border-gray-100">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full gradient-leaf flex items-center justify-center text-white font-black text-xl">
            {quizState.name.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <p className="font-black text-lg">{quizState.name}</p>
            <p className="text-gray-500 text-sm">{quizState.region} &bull; {quizState.dietType[0]}</p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            {quizState.healthGoals.map((g) => (
              <span key={g} className="px-3 py-1 rounded-full bg-coral/10 text-coral text-xs font-bold">
                {HEALTH_GOALS.find((h) => h.id === g)?.label || g}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {quizState.dietType.map((d) => (
              <span key={d} className="px-3 py-1 rounded-full bg-leaf/10 text-leaf text-xs font-bold">
                {DIET_TYPES.find((dt) => dt.id === d)?.label || d}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex gap-3 mt-6">
        <button
          onClick={() => setQuizStep(1)}
          className="flex-1 py-4 rounded-2xl font-bold border-2 border-gray-200 bg-white"
        >
          Edit answers
        </button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setCurrentView("dashboard")}
          className="flex-1 gradient-leaf text-white py-4 rounded-2xl font-bold shadow-glow"
        >
          Build my plan!
        </motion.button>
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

  return (
    <div className="flex flex-col h-screen bg-cream">
      {quizStep > 1 && quizStep < 16 && (
        <div className="px-6 pt-4">
          <div className="flex items-center justify-between mb-2">
            <button onClick={goBack} className="p-2 rounded-full bg-white shadow-card">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm font-bold text-gray-500">{quizStep - 1} of {totalQuizSteps - 1}</span>
            <div className="w-10" />
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full gradient-leaf rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto no-scrollbar">
        <AnimatePresence custom={direction} mode="wait">
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

      {quizStep > 1 && quizStep < 16 && (
        <div className="px-6 pb-8 pt-4 bg-cream">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={goNext}
            className="w-full gradient-leaf text-white font-bold py-4 rounded-2xl text-lg shadow-glow flex items-center justify-center gap-2"
          >
            Continue <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      )}
    </div>
  );
}
