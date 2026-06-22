"use client";

import { useState } from "react";
import { useApp } from "../AppContext";
import { motion, AnimatePresence } from "framer-motion";
import { KawaiiCharacter } from "./KawaiiCharacter";
import { ChevronLeft, ChevronRight, Cake, Scale } from "lucide-react";
import { REGIONS, DIET_TYPES, HEALTH_GOALS, HEALTH_CONDITIONS, APPLIANCES, FOOD_CATEGORIES } from "../lib/utils";

export function OnboardingQuiz() {
  const { quizStep, setQuizStep, totalQuizSteps, quizState, updateQuizState, setCurrentView } = useApp();
  const [direction, setDirection] = useState(1);

  const progress = (quizStep / totalQuizSteps) * 100;

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

  // Step 1: Welcome
  const WelcomeStep = () => (
    <div className="flex flex-col items-center justify-center h-full px-6 pt-20 pb-8 text-center">
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <KawaiiCharacter emotion="excited" size={120} />
      </motion.div>
      <h1 className="mt-8 text-[32px] font-black text-leaf">NourishIQ</h1>
      <p className="mt-2 text-lg text-gray-500">Your food, your rules.</p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={goNext}
        className="mt-12 w-full gradient-leaf text-white font-bold py-4 rounded-2xl text-lg shadow-glow"
      >
        Let's go →
      </motion.button>
    </div>
  );

  // Step 2: Name
  const NameStep = () => (
    <div className="px-6 pt-12">
      <h2 className="text-2xl font-black mb-2">What should we call you?</h2>
      <p className="text-gray-500 mb-8">We want to make this personal.</p>
      <input
        type="text"
        value={quizState.name}
        onChange={(e) => updateQuizState({ name: e.target.value })}
        placeholder="Type your name..."
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

  // Step 3: Age
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

  // Step 4: Gender
  const GenderStep = () => (
    <div className="px-6 pt-12">
      <h2 className="text-2xl font-black mb-2">How do you identify?</h2>
      <p className="text-gray-500 mb-6">Used for meal planning only.</p>
      <div className="grid grid-cols-2 gap-3">
        {["Male", "Female", "Non-binary", "Other", "Prefer not to say"].map((g) => (
          <motion.button
            key={g}
            whileTap={{ scale: 0.95 }}
            onClick={() => updateQuizState({ gender: g })}
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

  // Step 5: Region
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

  // Step 6: Diet Type
  const DietStep = () => (
    <div className="px-6 pt-12">
      <h2 className="text-2xl font-black mb-2">What's your diet?</h2>
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

  // Step 7: Health Goals
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

  // Step 8: Health Conditions
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

  // Step 9: Menstrual Cycle (conditional)
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

  // Steps 10-11: Foods (simplified - use accordions in real implementation)
  const FoodsStep = () => (
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

  // Step 12: Cooking Time
  const CookingTimeStep = () => (
    <div className="px-6 pt-12">
      <h2 className="text-2xl font-black mb-2">How much time?</h2>
      <p className="text-gray-500 mb-6">For cooking each meal.</p>
      <div className="space-y-3">
        {[
          { id: "under-15", label: "Under 15 mins", icon: "⚡" },
          { id: "15-30", label: "15-30 mins", icon: "🍳" },
          { id: "30-60", label: "30-60 mins", icon: "👨‍🍳" },
          { id: "1-2", label: "1-2 hours", icon: "🕐" },
          { id: "meal-prep", label: "I meal prep once a week", icon: "📦" },
        ].map((opt) => (
          <motion.button
            key={opt.id}
            whileTap={{ scale: 0.98 }}
            onClick={() => updateQuizState({ cookingTime: opt.id })}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${
              quizState.cookingTime === opt.id
                ? "gradient-leaf text-white shadow-glow"
                : "bg-white border-2 border-gray-200 text-gray-700"
            }`}
          >
            <span className="text-2xl">{opt.icon}</span>
            <span>{opt.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );

  // Step 13: Meal Timing
  const TimingStep = () => (
    <div className="px-6 pt-12">
      <h2 className="text-2xl font-black mb-2">Meal timing</h2>
      <p className="text-gray-500 mb-6">When do you usually eat?</p>
      <div className="space-y-4">
        {[
          { key: "breakfast", label: "Breakfast", default: "8:00 AM" },
          { key: "lunch", label: "Lunch", default: "1:00 PM" },
          { key: "snack", label: "Snack", default: "4:00 PM" },
          { key: "dinner", label: "Dinner", default: "8:00 PM" },
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

  // Step 14: Weight (conditional on lose-weight goal)
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

  // Step 15: Appliances
  const AppliancesStep = () => (
    <div className="px-6 pt-12">
      <h2 className="text-2xl font-black mb-2">Your kitchen setup</h2>
      <p className="text-gray-500 mb-6">What appliances do you have?</p>
      <div className="grid grid-cols-2 gap-3">
        {APPLIANCES.map((a) => (
          <motion.button
            key={a.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const current = quizState.appliances;
              const updated = current.includes(a.id)
                ? current.filter((x) => x !== a.id)
                : [...current, a.id];
              updateQuizState({ appliances: updated });
            }}
            className={`p-4 rounded-2xl font-bold text-sm transition-all ${
              quizState.appliances.includes(a.id)
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

  // Step 16: Confirmation
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
            <p className="text-gray-500 text-sm">{quizState.region} • {quizState.dietType[0]}</p>
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
    10: <FoodsStep />,
    11: <FoodsStep />,
    12: <CookingTimeStep />,
    13: <TimingStep />,
    14: <WeightStep />,
    15: <AppliancesStep />,
    16: <ConfirmStep />,
  };

  return (
    <div className="flex flex-col h-screen bg-cream">
      {/* Progress bar */}
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
      
      {/* Step content */}
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
      
      {/* Bottom button */}
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
