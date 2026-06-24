"use client";

import { useState } from "react";
import { useApp } from "../AppContext";
import { motion, AnimatePresence } from "framer-motion";
import { KawaiiCharacter } from "./KawaiiCharacter";
import { ChevronLeft, ChevronRight, Zap, Clock, ChefHat, Package, Sparkles, Heart, Star, ArrowRight } from "lucide-react";
import { REGIONS, DIET_TYPES, HEALTH_GOALS, HEALTH_CONDITIONS, FOOD_CATEGORIES, TEXTURE_DISLIKES, FLAVOR_DISLIKES, APPLIANCE_OPTIONS } from "../lib/mealData";

const stepEmotions: Record<number, string> = {
  1: "wave",
  2: "happy",
  3: "excited",
  4: "love",
  5: "thinking",
  6: "chef",
  7: "excited",
  8: "thinking",
  9: "surprised",
  10: "eating",
  11: "thinking",
  12: "chef",
  13: "happy",
  14: "cool",
  15: "dancing",
  16: "love",
};

const stepColors: Record<number, string> = {
  1: "from-green-400 to-emerald-500",
  2: "from-blue-400 to-indigo-500",
  3: "from-purple-400 to-pink-500",
  4: "from-pink-400 to-rose-500",
  5: "from-orange-400 to-amber-500",
  6: "from-green-400 to-teal-500",
  7: "from-cyan-400 to-blue-500",
  8: "from-violet-400 to-purple-500",
  9: "from-rose-400 to-pink-500",
  10: "from-amber-400 to-orange-500",
  11: "from-teal-400 to-emerald-500",
  12: "from-indigo-400 to-blue-500",
  13: "from-yellow-400 to-orange-500",
  14: "from-green-400 to-lime-500",
  15: "from-sky-400 to-cyan-500",
  16: "from-pink-400 to-rose-500",
};

export function OnboardingQuiz() {
  const { quizStep, setQuizStep, totalQuizSteps, quizState, updateQuizState, setCurrentView } = useApp();
  const [direction, setDirection] = useState(1);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  const progress = ((quizStep - 1) / (totalQuizSteps - 1)) * 100;

  const goNext = () => {
    if (quizStep < totalQuizSteps) {
      setDirection(1);
      setQuizStep(quizStep + 1);
      setSelectedItems(new Set());
    } else {
      setCurrentView("dashboard");
    }
  };

  const goBack = () => {
    if (quizStep > 1) {
      setDirection(-1);
      setQuizStep(quizStep - 1);
      setSelectedItems(new Set());
    }
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0, scale: 0.95 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0, scale: 0.95 }),
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  // ==================== ANIMATED WELCOME SCREEN ====================
  const WelcomeStep = () => (
    <div className="flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-green-50 via-emerald-50/50 to-orange-50/30 px-6 py-8 min-h-[calc(100dvh-80px)]">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-10 -left-10 w-72 h-72 rounded-full bg-gradient-to-br from-green-200/40 to-emerald-200/30 blur-3xl"
          animate={{ scale: [1, 1.2, 1], x: [0, 20, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-20 -right-10 w-56 h-56 rounded-full bg-gradient-to-br from-orange-200/30 to-amber-200/20 blur-3xl"
          animate={{ scale: [1, 1.3, 1], x: [0, -15, 0], y: [0, 15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-32 left-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-purple-200/20 to-pink-200/15 blur-3xl"
          animate={{ scale: [1, 1.15, 1], x: [0, 10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 right-1/4 w-48 h-48 rounded-full bg-gradient-to-br from-blue-200/20 to-cyan-200/15 blur-3xl"
          animate={{ scale: [1, 1.2, 1], y: [0, -10, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Floating food emojis with better animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          { emoji: "🥑", top: "8%", left: "5%", delay: 0, duration: 3.5 },
          { emoji: "🍓", top: "5%", right: "10%", delay: 0.5, duration: 4 },
          { emoji: "🥦", top: "22%", right: "3%", delay: 1, duration: 3.8 },
          { emoji: "🍊", top: "15%", left: "12%", delay: 1.5, duration: 4.2 },
          { emoji: "🥕", top: "40%", left: "2%", delay: 0.8, duration: 3.2 },
          { emoji: "🍎", top: "35%", right: "8%", delay: 1.2, duration: 3.6 },
          { emoji: "🍇", top: "55%", left: "8%", delay: 2, duration: 4 },
          { emoji: "🥥", top: "50%", right: "5%", delay: 1.8, duration: 3.5 },
          { emoji: "🌿", top: "70%", left: "15%", delay: 0.3, duration: 4.5 },
          { emoji: "✨", top: "65%", right: "12%", delay: 2.5, duration: 3 },
        ].map((item, i) => (
          <motion.span
            key={i}
            className="absolute text-2xl"
            style={{ top: item.top, left: item.left, right: item.right }}
            animate={{ 
              y: [0, -25, 0], 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: item.duration, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: item.delay 
            }}
          >
            {item.emoji}
          </motion.span>
        ))}
      </div>

      {/* Sparkle particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute w-1 h-1 rounded-full bg-yellow-400"
            style={{
              top: `${20 + Math.random() * 60}%`,
              left: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Kawaii character with enhanced animation */}
      <motion.div
        initial={{ scale: 0, y: 30, rotate: -15 }}
        animate={{ scale: 1, y: 0, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.3 }}
        className="mb-2 relative z-10"
      >
        <div className="relative">
          <KawaiiCharacter emotion="wave" size={110} />
          <motion.div
            className="absolute -top-2 -right-2 text-2xl"
            animate={{ rotate: [0, 20, -20, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ✨
          </motion.div>
        </div>
      </motion.div>

      {/* Animated NourishIQ Title with enhanced styling */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="text-center mb-1 relative z-10"
      >
        <h1 className="text-6xl font-black tracking-tight font-display">
          <span className="text-gradient">NourishIQ</span>
        </h1>
      </motion.div>

      {/* Animated underline with shimmer */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: 140, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
        className="h-1.5 rounded-full mb-3 relative z-10 overflow-hidden"
        style={{
          background: "linear-gradient(90deg, #22c55e, #f97316, #a855f7, #22c55e)",
          backgroundSize: "200% auto",
        }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
          }}
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

      {/* Tagline with typing effect */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="text-lg text-gray-500 font-medium mb-6 text-center relative z-10"
      >
        Your food, your rules. 
        <motion.span
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          ✨
        </motion.span>
      </motion.p>

      {/* Feature pills with enhanced animation */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="flex gap-3 mb-8 flex-wrap justify-center relative z-10"
      >
        {[
          { label: "Personalized", color: "#22c55e", bg: "#dcfce7", icon: "✨" },
          { label: "Delicious", color: "#f97316", bg: "#ffedd5", icon: "😋" },
          { label: "Nutritious", color: "#a855f7", bg: "#f3e8ff", icon: "💪" },
        ].map((tag, i) => (
          <motion.span
            key={tag.label}
            initial={{ scale: 0, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ delay: 1.2 + i * 0.15, type: "spring", stiffness: 400, damping: 15 }}
            whileHover={{ scale: 1.1, y: -3 }}
            className="px-4 py-2.5 rounded-full text-sm font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
            style={{ backgroundColor: tag.bg, color: tag.color }}
          >
            <span>{tag.icon}</span>
            {tag.label}
          </motion.span>
        ))}
      </motion.div>

      {/* Stats preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="flex gap-6 mb-8 relative z-10"
      >
        {[
          { number: "500+", label: "Recipes", color: "text-green-500" },
          { number: "50+", label: "Cuisines", color: "text-orange-500" },
          { number: "100%", label: "Personalized", color: "text-purple-500" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            className="text-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.6 + i * 0.1, type: "spring" }}
          >
            <p className={`text-xl font-black ${stat.color}`}>{stat.number}</p>
            <p className="text-xs text-gray-400 font-medium">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA Button with enhanced animation */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.5 }}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={goNext}
        className="px-10 py-4 rounded-2xl text-white font-bold text-lg shadow-lg flex items-center gap-2 relative z-10 overflow-hidden group"
        style={{
          background: "linear-gradient(135deg, #22c55e, #16a34a)",
          boxShadow: "0 10px 40px rgba(34, 197, 94, 0.35), 0 4px 15px rgba(0,0,0,0.1)",
        }}
      >
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <span className="relative z-10">Let&apos;s get started</span>
        <motion.span
          className="relative z-10"
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowRight className="w-5 h-5" />
        </motion.span>
      </motion.button>

      {/* Bottom dots with enhanced animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="flex gap-2 mt-6 relative z-10"
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2.5 h-2.5 rounded-full"
            style={{
              backgroundColor: i === 0 ? "#22c55e" : "#e5e7eb",
            }}
            animate={i === 0 ? { scale: [1, 1.4, 1], opacity: [1, 0.7, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          />
        ))}
      </motion.div>
    </div>
  );

  // ==================== QUIZ STEP WRAPPER ====================
  const QuizStepWrapper = ({ 
    children, 
    title, 
    subtitle, 
    stepNumber 
  }: { 
    children: React.ReactNode; 
    title: string; 
    subtitle?: string;
    stepNumber: number;
  }) => (
    <div className="space-y-5">
      {/* Kawaii character for this step */}
      <motion.div 
        className="flex justify-center"
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="relative">
          <KawaiiCharacter 
            emotion={stepEmotions[stepNumber] as any || "happy"} 
            size={60} 
            animate={false}
          />
          <motion.div
            className="absolute -top-1 -right-1"
            animate={{ scale: [1, 1.3, 1], rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-4 h-4 text-yellow-400" />
          </motion.div>
        </div>
      </motion.div>

      <div className="text-center">
        <motion.h2 
          className="text-2xl font-bold text-gray-900 font-display"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {title}
        </motion.h2>
        {subtitle && (
          <motion.p 
            className="text-gray-400 text-sm mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {children}
      </motion.div>
    </div>
  );

  // ==================== ENHANCED OPTION BUTTON ====================
  const OptionButton = ({ 
    selected, 
    onClick, 
    children, 
    className = "",
    delay = 0
  }: { 
    selected: boolean; 
    onClick: () => void; 
    children: React.ReactNode;
    className?: string;
    delay?: number;
  }) => (
    <motion.button
      variants={itemVariants}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative overflow-hidden transition-all duration-300 ${className} ${
        selected
          ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-glow scale-[1.02]"
          : "bg-white border-2 border-gray-100 text-gray-700 hover:border-green-200 hover:shadow-soft"
      }`}
    >
      {selected && (
        <motion.div
          className="absolute top-2 right-2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500 }}
        >
          <Star className="w-4 h-4 fill-white text-white" />
        </motion.div>
      )}
      {children}
    </motion.button>
  );

  // ==================== REST OF STEPS ====================
  const NameStep = () => (
    <QuizStepWrapper title="What should we call you?" subtitle="We want to make this personal ✨" stepNumber={2}>
      <motion.div variants={itemVariants}>
        <input
          type="text"
          value={quizState.name}
          onChange={(e) => updateQuizState({ name: e.target.value })}
          placeholder="Your name"
          className="w-full text-2xl font-bold p-4 rounded-2xl border-2 border-gray-100 focus:border-green-400 outline-none bg-white transition-all shadow-soft focus:shadow-glow text-center"
        />
      </motion.div>
      {quizState.name && (
        <motion.div 
          variants={itemVariants}
          className="flex items-center justify-center gap-3 pt-2"
        >
          <motion.div 
            className="w-14 h-14 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white font-bold text-xl shadow-glow"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {quizState.name.slice(0, 2).toUpperCase()}
          </motion.div>
          <motion.p 
            className="text-green-600 font-semibold"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
          >
            Nice to meet you, {quizState.name}! 
            <motion.span
              animate={{ rotate: [0, 20, -20, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="inline-block"
            >
              👋
            </motion.span>
          </motion.p>
        </motion.div>
      )}
    </QuizStepWrapper>
  );

  const AgeStep = () => (
    <QuizStepWrapper title="How old are you?" subtitle="Age helps us calculate your nutrition needs" stepNumber={3}>
      <motion.div variants={itemVariants} className="relative">
        <input
          type="number"
          value={quizState.age || ""}
          onChange={(e) => updateQuizState({ age: parseInt(e.target.value) || null })}
          placeholder="25"
          className="w-full text-4xl font-black p-6 rounded-2xl border-2 border-gray-100 focus:border-green-400 outline-none bg-white text-center transition-all shadow-soft focus:shadow-glow"
        />
        <motion.span 
          className="absolute right-6 top-1/2 -translate-y-1/2 text-2xl"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🎂
        </motion.span>
      </motion.div>
      {quizState.age && (
        <motion.p 
          className="text-center text-gray-400 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {quizState.age < 30 ? "Prime time for building healthy habits! 💪" : 
           quizState.age < 50 ? "Perfect age to optimize your nutrition! 🌟" : 
           "Age is just a number — let's get you feeling amazing! ✨"}
        </motion.p>
      )}
    </QuizStepWrapper>
  );

  const GenderStep = () => (
    <QuizStepWrapper title="How do you identify?" subtitle="Used for personalized meal planning only" stepNumber={4}>
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Male", emoji: "👨" },
          { label: "Female", emoji: "👩" },
          { label: "Non-binary", emoji: "🧑" },
          { label: "Other", emoji: "🌈" },
          { label: "Prefer not to say", emoji: "🤫" },
        ].map((g) => (
          <OptionButton
            key={g.label}
            selected={quizState.gender === g.label}
            onClick={() => updateQuizState({ gender: g.label })}
            className="p-4 rounded-2xl font-bold text-sm flex flex-col items-center gap-2"
          >
            <span className="text-2xl">{g.emoji}</span>
            <span>{g.label}</span>
          </OptionButton>
        ))}
      </div>
    </QuizStepWrapper>
  );

  const RegionStep = () => (
    <QuizStepWrapper title="Where are you based?" subtitle="We'll customize recipes for your region" stepNumber={5}>
      <div className="space-y-2 max-h-[380px] overflow-y-auto hide-scrollbar">
        {REGIONS.map((r, i) => (
          <motion.button
            key={r.code}
            variants={itemVariants}
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => updateQuizState({ region: r.name })}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold transition-all text-left ${
              quizState.region === r.name
                ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-glow"
                : "bg-white border-2 border-gray-100 text-gray-700 hover:border-green-200 hover:shadow-soft"
            }`}
          >
            <span className="text-2xl">{r.flag}</span>
            <span className="flex-1">{r.name}</span>
            {quizState.region === r.name && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring" }}
              >
                <Star className="w-5 h-5 fill-white" />
              </motion.span>
            )}
          </motion.button>
        ))}
      </div>
    </QuizStepWrapper>
  );

  const DietStep = () => (
    <QuizStepWrapper title="What's your diet?" subtitle="Select all that apply — no judgment here!" stepNumber={6}>
      <div className="flex flex-wrap gap-2">
        {DIET_TYPES.map((d) => (
          <OptionButton
            key={d.id}
            selected={quizState.dietType.includes(d.id)}
            onClick={() => {
              const current = quizState.dietType;
              const updated = current.includes(d.id)
                ? current.filter((x) => x !== d.id)
                : [...current, d.id];
              updateQuizState({ dietType: updated });
            }}
            className="px-4 py-3 rounded-full font-bold text-sm"
          >
            {d.label}
          </OptionButton>
        ))}
      </div>
      {quizState.dietType.length > 0 && (
        <motion.p 
          className="text-center text-green-500 text-sm font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {quizState.dietType.length} diet type{quizState.dietType.length > 1 ? "s" : ""} selected 
          <motion.span
            animate={{ rotate: [0, 20, -20, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="inline-block ml-1"
          >
            🌱
          </motion.span>
        </motion.p>
      )}
    </QuizStepWrapper>
  );

  const GoalsStep = () => (
    <QuizStepWrapper title="Health goals" subtitle="What are you working toward? 🎯" stepNumber={7}>
      <div className="flex flex-wrap gap-2">
        {HEALTH_GOALS.map((g) => (
          <OptionButton
            key={g.id}
            selected={quizState.healthGoals.includes(g.id)}
            onClick={() => {
              const current = quizState.healthGoals;
              const updated = current.includes(g.id)
                ? current.filter((x) => x !== g.id)
                : [...current, g.id];
              updateQuizState({ healthGoals: updated });
            }}
            className="px-4 py-3 rounded-full font-bold text-sm"
          >
            {g.label}
          </OptionButton>
        ))}
      </div>
    </QuizStepWrapper>
  );

  const ConditionsStep = () => (
    <QuizStepWrapper title="Any health conditions?" subtitle="We'll tailor recipes to keep you safe & healthy" stepNumber={8}>
      <div className="space-y-2 max-h-[380px] overflow-y-auto hide-scrollbar">
        {HEALTH_CONDITIONS.map((c) => (
          <motion.button
            key={c.id}
            variants={itemVariants}
            whileHover={{ scale: 1.01, x: 3 }}
            whileTap={{ scale: 0.99 }}
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
            className={`w-full text-left p-4 rounded-2xl font-bold transition-all flex items-center gap-3 ${
              quizState.healthConditions.includes(c.id)
                ? "bg-gradient-to-r from-purple-500 to-violet-600 text-white shadow-glow-purple"
                : "bg-white border-2 border-gray-100 text-gray-700 hover:border-purple-200 hover:shadow-soft"
            }`}
          >
            <span className="text-lg">
              {c.id === "none" ? "✅" : 
               c.id === "diabetes" ? "🩺" :
               c.id === "bp" ? "💓" :
               c.id === "pcos" ? "🌸" :
               c.id === "thyroid" ? "🦋" :
               c.id === "ibs" ? "🫃" :
               c.id === "lactose" ? "🥛" :
               c.id === "gluten" ? "🌾" :
               c.id === "pregnant" ? "🤰" :
               c.id === "postpartum" ? "👶" :
               c.id === "breastfeeding" ? "🍼" :
               c.id === "elderly" ? "👴" :
               c.id === "no-kitchen" ? "🏠" :
               "👶"}
            </span>
            {c.label}
          </motion.button>
        ))}
      </div>
    </QuizStepWrapper>
  );

  const MenstrualStep = () => {
    const showMenstrual = ["Female", "Non-binary", "Other"].includes(quizState.gender);
    if (!showMenstrual) {
      setTimeout(goNext, 100);
      return null;
    }
    return (
      <QuizStepWrapper title="Menstrual health" subtitle="Help us support your cycle with the right nutrition" stepNumber={9}>
        <div className="grid grid-cols-3 gap-3">
          {["Yes", "No", "Prefer not to say"].map((opt) => (
            <OptionButton
              key={opt}
              selected={quizState.hasMenstrualCycle === opt}
              onClick={() => updateQuizState({ hasMenstrualCycle: opt })}
              className="p-3 rounded-2xl font-bold text-sm"
            >
              {opt}
            </OptionButton>
          ))}
        </div>
        {quizState.hasMenstrualCycle === "Yes" && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: "auto" }} 
            className="space-y-4 mt-4"
          >
            <p className="text-gray-500 font-medium text-sm">Want meal recommendations for your cycle?</p>
            <div className="grid grid-cols-2 gap-3">
              {["Yes", "No"].map((opt) => (
                <OptionButton
                  key={opt}
                  selected={(quizState.wantMenstrualMeals && opt === "Yes") || (!quizState.wantMenstrualMeals && opt === "No")}
                  onClick={() => updateQuizState({ wantMenstrualMeals: opt === "Yes" })}
                  className="p-3 rounded-2xl font-bold text-sm"
                >
                  {opt}
                </OptionButton>
              ))}
            </div>
            <p className="text-gray-500 font-medium text-sm">Current phase?</p>
            <div className="space-y-2">
              {["Menstrual (Day 1-5)", "Follicular (Day 6-13)", "Ovulatory (Day 14-16)", "Luteal (Day 17-28)", "Not sure"].map((phase) => (
                <motion.button
                  key={phase}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => updateQuizState({ menstrualPhase: phase })}
                  className={`w-full text-left p-3 rounded-2xl font-bold text-sm transition-all ${
                    quizState.menstrualPhase === phase
                      ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-glow"
                      : "bg-white border-2 border-gray-100 hover:border-pink-200"
                  }`}
                >
                  {phase}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </QuizStepWrapper>
    );
  };

  const FoodsLoveStep = () => (
    <QuizStepWrapper title="Foods you love" subtitle="Select categories you enjoy most" stepNumber={10}>
      <div className="space-y-4 max-h-[380px] overflow-y-auto hide-scrollbar">
        {Object.entries(FOOD_CATEGORIES).slice(0, 6).map(([cat, items]) => (
          <motion.div key={cat} variants={itemVariants}>
            <h3 className="font-bold text-gray-700 mb-2 text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              {cat}
            </h3>
            <div className="flex flex-wrap gap-2">
              {items.slice(0, 5).map((item) => (
                <OptionButton
                  key={item}
                  selected={quizState.lovedFoods.includes(item)}
                  onClick={() => {
                    const current = quizState.lovedFoods;
                    const updated = current.includes(item)
                      ? current.filter((x) => x !== item)
                      : [...current, item];
                    updateQuizState({ lovedFoods: updated });
                  }}
                  className="px-3 py-2 rounded-xl text-sm font-bold"
                >
                  {item}
                </OptionButton>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </QuizStepWrapper>
  );

  const FoodsAvoidStep = () => (
    <QuizStepWrapper title="What do you want to avoid?" subtitle="Textures, flavors, and foods you dislike" stepNumber={11}>
      <div className="space-y-5">
        <div>
          <h3 className="font-bold text-gray-700 mb-2 text-sm flex items-center gap-2">
            <span>🫠</span> Textures
          </h3>
          <div className="flex flex-wrap gap-2">
            {TEXTURE_DISLIKES.map((t) => (
              <OptionButton
                key={t}
                selected={quizState.avoidedTextures.includes(t)}
                onClick={() => {
                  const current = quizState.avoidedTextures;
                  const updated = current.includes(t)
                    ? current.filter((x) => x !== t)
                    : [...current, t];
                  updateQuizState({ avoidedTextures: updated });
                }}
                className="px-3 py-2 rounded-xl text-sm font-bold"
              >
                {t}
              </OptionButton>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-bold text-gray-700 mb-2 text-sm flex items-center gap-2">
            <span>👅</span> Flavors
          </h3>
          <div className="flex flex-wrap gap-2">
            {FLAVOR_DISLIKES.map((f) => (
              <OptionButton
                key={f}
                selected={quizState.avoidedFlavors.includes(f)}
                onClick={() => {
                  const current = quizState.avoidedFlavors;
                  const updated = current.includes(f)
                    ? current.filter((x) => x !== f)
                    : [...current, f];
                  updateQuizState({ avoidedFlavors: updated });
                }}
                className="px-3 py-2 rounded-xl text-sm font-bold"
              >
                {f}
              </OptionButton>
            ))}
          </div>
        </div>
      </div>
    </QuizStepWrapper>
  );

  const CookingTimeStep = () => (
    <QuizStepWrapper title="How much time?" subtitle="For cooking each meal ⏱️" stepNumber={12}>
      <div className="space-y-3">
        {[
          { id: "under-15", label: "Under 15 mins", icon: <Zap className="w-5 h-5" />, desc: "Quick & easy", color: "from-yellow-400 to-amber-500" },
          { id: "15-30", label: "15-30 mins", icon: <Clock className="w-5 h-5" />, desc: "Standard cooking", color: "from-green-400 to-emerald-500" },
          { id: "30-60", label: "30-60 mins", icon: <ChefHat className="w-5 h-5" />, desc: "Weekend cooking", color: "from-blue-400 to-indigo-500" },
          { id: "1-2-hours", label: "1-2 hours", icon: <Clock className="w-5 h-5" />, desc: "Special occasions", color: "from-purple-400 to-violet-500" },
          { id: "meal-prep", label: "I meal prep once a week", icon: <Package className="w-5 h-5" />, desc: "Batch cooking", color: "from-pink-400 to-rose-500" },
        ].map((opt) => (
          <motion.button
            key={opt.id}
            variants={itemVariants}
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => updateQuizState({ cookingTime: opt.id })}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold transition-all text-left ${
              quizState.cookingTime === opt.id
                ? `bg-gradient-to-r ${opt.color} text-white shadow-lg`
                : "bg-white border-2 border-gray-100 text-gray-700 hover:border-green-200 hover:shadow-soft"
            }`}
          >
            <div className={`p-2 rounded-xl ${quizState.cookingTime === opt.id ? "bg-white/20" : "bg-gray-100"}`}>
              {opt.icon}
            </div>
            <div className="flex-1">
              <p className="font-bold">{opt.label}</p>
              <p className="text-xs opacity-70">{opt.desc}</p>
            </div>
            {quizState.cookingTime === opt.id && (
              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
                <Star className="w-5 h-5 fill-white" />
              </motion.span>
            )}
          </motion.button>
        ))}
      </div>
    </QuizStepWrapper>
  );

  const TimingStep = () => (
    <QuizStepWrapper title="Meal timing" subtitle="When do you usually eat? 🍽️" stepNumber={13}>
      <div className="space-y-4">
        {[
          { key: "breakfast", label: "Breakfast", default: "08:00", emoji: "🌅" },
          { key: "lunch", label: "Lunch", default: "13:00", emoji: "☀️" },
          { key: "snack", label: "Snack", default: "16:00", emoji: "🍿" },
          { key: "dinner", label: "Dinner", default: "20:00", emoji: "🌙" },
        ].map((meal) => (
          <motion.div 
            key={meal.key}
            variants={itemVariants}
            className="flex items-center justify-between p-4 bg-white rounded-2xl border-2 border-gray-100 shadow-soft hover:border-green-200 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{meal.emoji}</span>
              <span className="font-bold text-gray-700">{meal.label}</span>
            </div>
            <input
              type="time"
              value={quizState.mealTimes[meal.key as keyof typeof quizState.mealTimes] || meal.default}
              onChange={(e) => {
                const newTimes = { ...quizState.mealTimes, [meal.key]: e.target.value };
                updateQuizState({ mealTimes: newTimes });
              }}
              className="bg-gray-50 rounded-xl px-4 py-2 font-bold text-sm border-2 border-gray-100 focus:border-green-400 outline-none"
            />
          </motion.div>
        ))}
      </div>
      <motion.div variants={itemVariants}>
        <p className="text-gray-500 font-medium mb-2 text-sm">How many full meals per day?</p>
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((n) => (
            <OptionButton
              key={n}
              selected={quizState.mealsPerDay === n}
              onClick={() => updateQuizState({ mealsPerDay: n })}
              className="flex-1 p-3 rounded-xl font-bold"
            >
              {n}
            </OptionButton>
          ))}
        </div>
      </motion.div>
    </QuizStepWrapper>
  );

  const WeightStep = () => {
    const showWeight = quizState.healthGoals.includes("lose-weight");
    if (!showWeight) {
      setTimeout(goNext, 100);
      return (
        <QuizStepWrapper title="Weight details" subtitle="Not needed for your goals!" stepNumber={14}>
          <div className="text-center py-10">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-4xl mb-4"
            >
              🎉
            </motion.div>
            <p className="text-gray-500">Skipping weight — not needed for your goals!</p>
          </div>
        </QuizStepWrapper>
      );
    }
    return (
      <QuizStepWrapper title="Weight details" subtitle="Help us set realistic targets" stepNumber={14}>
        <div className="space-y-4">
          <motion.div variants={itemVariants}>
            <p className="text-gray-500 font-medium mb-2 text-sm">Current weight</p>
            <div className="flex gap-2">
              <input
                type="number"
                value={quizState.currentWeight || ""}
                onChange={(e) => updateQuizState({ currentWeight: parseInt(e.target.value) || null })}
                placeholder="0"
                className="flex-1 text-2xl font-black p-4 rounded-2xl border-2 border-gray-100 focus:border-green-400 outline-none text-center transition-all shadow-soft focus:shadow-glow"
              />
              <select
                value={quizState.weightUnit}
                onChange={(e) => updateQuizState({ weightUnit: e.target.value })}
                className="bg-white border-2 border-gray-100 rounded-2xl px-4 font-bold text-lg shadow-soft"
              >
                <option value="kg">kg</option>
                <option value="lbs">lbs</option>
              </select>
            </div>
          </motion.div>
          <motion.div variants={itemVariants}>
            <p className="text-gray-500 font-medium mb-2 text-sm">Target weight</p>
            <input
              type="number"
              value={quizState.targetWeight || ""}
              onChange={(e) => updateQuizState({ targetWeight: parseInt(e.target.value) || null })}
              placeholder="0"
              className="w-full text-2xl font-black p-4 rounded-2xl border-2 border-gray-100 focus:border-green-400 outline-none text-center transition-all shadow-soft focus:shadow-glow"
            />
          </motion.div>
        </div>
      </QuizStepWrapper>
    );
  };

  const AppliancesStep = () => (
    <QuizStepWrapper title="Your kitchen setup" subtitle="What appliances do you have? 🔧" stepNumber={15}>
      <div className="grid grid-cols-2 gap-3">
        {APPLIANCE_OPTIONS.map((a) => (
          <OptionButton
            key={a.id}
            selected={quizState.appliances.includes(a.id)}
            onClick={() => {
              const current = quizState.appliances;
              const updated = current.includes(a.id)
                ? current.filter((x) => x !== a.id)
                : [...current, a.id];
              updateQuizState({ appliances: updated });
            }}
            className="p-4 rounded-2xl font-bold text-sm flex flex-col items-center gap-2 text-center"
          >
            <span className="text-2xl">
              {a.id === "none" ? "🔥" :
               a.id === "microwave" ? "📡" :
               a.id === "airfryer" ? "🌪️" :
               a.id === "oven" ? "🔥" :
               a.id === "toaster" ? "🍞" :
               a.id === "instant-pot" ? "⚡" :
               a.id === "slow-cooker" ? "🐌" :
               a.id === "blender" ? "🌪️" :
               a.id === "food-processor" ? "⚙️" :
               "🔥"}
            </span>
            <span className="text-xs leading-tight">{a.name}</span>
          </OptionButton>
        ))}
      </div>
    </QuizStepWrapper>
  );

  const ConfirmStep = () => (
    <div className="space-y-6 text-center py-4">
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        <div className="relative inline-block">
          <KawaiiCharacter emotion="love" size={90} animate={false} />
          <motion.div
            className="absolute -top-2 -right-2"
            animate={{ scale: [1, 1.3, 1], rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Heart className="w-6 h-6 text-rose-400 fill-rose-400" />
          </motion.div>
        </div>
      </motion.div>

      <motion.h2 
        className="text-2xl font-bold text-gray-900 font-display"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        All set, {quizState.name}! 
        <motion.span
          animate={{ rotate: [0, 20, -20, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="inline-block ml-1"
        >
          🎉
        </motion.span>
      </motion.h2>

      <motion.div 
        className="flex flex-col items-center gap-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <motion.div 
          className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white font-bold text-2xl shadow-glow"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {quizState.name.slice(0, 2).toUpperCase()}
        </motion.div>
        <p className="font-bold text-lg">{quizState.name}</p>
        <p className="text-gray-400 text-sm">
          {quizState.region} • {quizState.dietType[0] ? DIET_TYPES.find((dt) => dt.id === quizState.dietType[0])?.label : "No diet selected"}
        </p>
      </motion.div>

      <motion.div 
        className="flex flex-wrap justify-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {quizState.healthGoals.map((g) => (
          <motion.span 
            key={g} 
            className="px-3 py-1.5 rounded-full bg-orange-50 text-orange-600 text-sm font-bold border border-orange-100"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring" }}
          >
            {HEALTH_GOALS.find((h) => h.id === g)?.label || g}
          </motion.span>
        ))}
      </motion.div>

      <motion.div 
        className="flex flex-wrap justify-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {quizState.dietType.map((d) => (
          <motion.span 
            key={d} 
            className="px-3 py-1.5 rounded-full bg-green-50 text-green-600 text-sm font-bold border border-green-100"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring" }}
          >
            {DIET_TYPES.find((dt) => dt.id === d)?.label || d}
          </motion.span>
        ))}
      </motion.div>

      {/* Confetti animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              backgroundColor: ["#22c55e", "#f97316", "#a855f7", "#3b82f6", "#ec4899"][i % 5],
              left: `${10 + Math.random() * 80}%`,
              top: "20%",
            }}
            animate={{
              y: [0, 200 + Math.random() * 100],
              x: [0, (Math.random() - 0.5) * 100],
              rotate: [0, 720],
              opacity: [1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
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
    <div className="min-h-[100dvh] bg-gradient-to-b from-gray-50 to-white flex flex-col">
      {/* Progress bar with enhanced styling */}
      <div className="px-6 pt-6 pb-2">
        <div className="flex items-center justify-between mb-3">
          <motion.button
            onClick={goBack}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2.5 rounded-full bg-white border-2 border-gray-100 hover:border-green-200 transition-all shadow-soft"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </motion.button>
          <span className="text-sm font-bold text-gray-400">
            {quizStep - 1} <span className="text-gray-300">/</span> {totalQuizSteps - 1}
          </span>
          <div className="w-10" />
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, #22c55e, #34d399, #22c55e)",
              backgroundSize: "200% auto",
            }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-4 overflow-y-auto hide-scrollbar">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={quizStep}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            {steps[quizStep] || steps[1]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom button */}
      <div className="px-6 pb-8 pt-4">
        <motion.button
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={goNext}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg shadow-lg flex items-center justify-center gap-2 relative overflow-hidden group"
          style={{ boxShadow: "0 10px 40px rgba(34, 197, 94, 0.3)" }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <span className="relative z-10">
            {quizStep === totalQuizSteps ? "Get Started! 🚀" : "Continue"}
          </span>
          <motion.span
            className="relative z-10"
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronRight className="w-5 h-5" />
          </motion.span>
        </motion.button>
      </div>
    </div>
  );
}
