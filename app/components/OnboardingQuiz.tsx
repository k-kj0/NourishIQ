"use client";

import { useState } from "react";
import { useApp } from "../AppContext";
import { motion, AnimatePresence } from "framer-motion";
import { KawaiiCharacter } from "./KawaiiCharacter";
import { ChevronLeft, ChevronRight, Zap, Clock, ChefHat, Package, Sparkles, Heart, Star, ArrowRight, Check } from "lucide-react";
import { REGIONS, DIET_TYPES, HEALTH_GOALS, HEALTH_CONDITIONS, FOOD_CATEGORIES, TEXTURE_DISLIKES, FLAVOR_DISLIKES, APPLIANCE_OPTIONS } from "../lib/mealData";

const stepEmotions: Record<number, string> = {
  1: "wave", 2: "happy", 3: "excited", 4: "love", 5: "thinking",
  6: "chef", 7: "excited", 8: "thinking", 9: "surprised", 10: "eating",
  11: "thinking", 12: "chef", 13: "happy", 14: "cool", 15: "dancing", 16: "love",
};

// Floating food decorations used on the welcome/name screens
const FoodDecorations = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <img src="https://placehold.co/100x100/f0fdf4/22c55e?text=🥑" alt="" className="absolute top-4 left-2 w-16 h-16 opacity-90 object-cover rounded-full" style={{background:"transparent"}} />
    <div className="absolute top-3 left-2 text-5xl select-none">🥑</div>
    <div className="absolute top-4 right-4 text-4xl select-none">🍓</div>
    <div className="absolute top-20 right-2 text-3xl select-none">🌿</div>
    <div className="absolute bottom-40 right-3 text-4xl select-none opacity-70">🍲</div>
    <div className="absolute bottom-52 left-3 text-3xl select-none opacity-60">🥦</div>
  </div>
);

export function OnboardingQuiz() {
  const { quizStep, setQuizStep, totalQuizSteps, quizState, updateQuizState, setCurrentView } = useApp();
  const [direction, setDirection] = useState(1);
  const [planDays, setPlanDays] = useState(5); 

  const progress = ((quizStep - 1) / (totalQuizSteps - 1)) * 100;

  const goNext = () => {
    if (quizStep < totalQuizSteps) { setDirection(1); setQuizStep(quizStep + 1); }
    else { setCurrentView("dashboard"); }
  };
  const goBack = () => {
    if (quizStep > 1) { setDirection(-1); setQuizStep(quizStep - 1); }
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  // ==================== WELCOME SCREEN ====================
  const WelcomeStep = () => (
    <div className="relative min-h-[100dvh] bg-[#f8f6f0] flex flex-col items-center justify-center overflow-hidden px-6">
      <FoodDecorations />
      {/* Logo */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8 relative z-10">
        <h1 className="text-5xl font-black tracking-tight text-center">
          <span className="text-[#1a472a]">Nourish</span><span className="text-[#f97316]">IQ</span>
          <span className="text-[#22c55e] text-3xl ml-1">✦</span>
        </h1>
        <motion.div className="h-1 w-32 mx-auto mt-1 rounded-full bg-gradient-to-r from-[#22c55e] via-[#f97316] to-[#a855f7]"
          initial={{ width: 0 }} animate={{ width: 128 }} transition={{ delay: 0.6, duration: 0.7 }} />
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }} className="relative z-10 mb-6">
        <KawaiiCharacter emotion="wave" size={100} />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-center mb-8 relative z-10">
        <h2 className="text-3xl font-black text-gray-900 mb-2">Smart meal planning,<br />made personal.</h2>
        <p className="text-gray-400 text-base">15 quick questions to unlock your perfect meal plan ✨</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="flex gap-3 mb-8 relative z-10 flex-wrap justify-center">
        {[{label:"500+ Recipes",color:"#22c55e",bg:"#dcfce7"},{label:"AI-Powered",color:"#a855f7",bg:"#f3e8ff"},{label:"100% Yours",color:"#f97316",bg:"#ffedd5"}].map(tag => (
          <span key={tag.label} className="px-4 py-2 rounded-full text-sm font-bold" style={{backgroundColor: tag.bg, color: tag.color}}>{tag.label}</span>
        ))}
      </motion.div>

      <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
        whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={goNext}
        className="w-full max-w-sm py-4 rounded-2xl text-white font-bold text-lg flex items-center justify-center gap-2 relative z-10"
        style={{ background: "linear-gradient(135deg, #22c55e, #16a34a)", boxShadow: "0 8px 32px rgba(34,197,94,0.35)" }}>
        Let&apos;s get started <ArrowRight className="w-5 h-5" />
      </motion.button>
      <p className="text-gray-400 text-sm mt-4 relative z-10">You can always change this later</p>
    </div>
  );

  // ==================== QUIZ STEP SHELL ====================
  const Shell = ({ title, subtitle, children }: { title: React.ReactNode; subtitle?: string; children: React.ReactNode }) => (
    <div className="space-y-5 pb-4">
      <div className="text-center">
        <h2 className="text-2xl font-black text-gray-900 leading-snug">{title}</h2>
        {subtitle && <p className="text-sm text-[#22c55e] font-medium mt-1">{subtitle}</p>}
      </div>
      {children}
    </div>
  );

  // ==================== STEPS ====================
  const NameStep = () => (
    <div className="relative min-h-[calc(100dvh-120px)] bg-[#f8f6f0] flex flex-col items-center justify-center px-4">
      <FoodDecorations />
      {/* Logo */}
      <div className="relative z-10 mb-6 text-center">
        <h1 className="text-4xl font-black"><span className="text-[#1a472a]">Nourish</span><span className="text-[#f97316]">IQ</span><span className="text-[#22c55e] text-2xl ml-1">✦</span></h1>
        <div className="h-1 w-28 mx-auto mt-1 rounded-full bg-gradient-to-r from-[#22c55e] via-[#f97316] to-[#a855f7]" />
      </div>
      <div className="relative z-10 w-full max-w-sm space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-black text-gray-900">What should<br />we call <span className="text-[#f97316]">you?</span></h2>
          <p className="text-gray-400 text-sm mt-1">We want to make this personal ✨</p>
        </div>
        <div className="bg-white rounded-2xl px-4 py-3 flex items-center gap-3 shadow-sm border border-gray-100">
          <span className="text-[#22c55e] text-xl">👤</span>
          <input type="text" value={quizState.name} onChange={(e) => updateQuizState({ name: e.target.value })}
            placeholder="Your name"
            className="flex-1 text-base font-semibold outline-none bg-transparent text-gray-700 placeholder:text-gray-300" />
        </div>
        <p className="text-center text-gray-400 text-xs">You can always change this later</p>
      </div>
    </div>
  );

  const AgeStep = () => (
    <Shell title="How old are you?" subtitle="Age helps us calculate your nutrition needs">
      <div className="relative">
        <input type="number" value={quizState.age || ""} onChange={(e) => updateQuizState({ age: parseInt(e.target.value) || null })}
          placeholder="25"
          className="w-full text-4xl font-black p-6 rounded-2xl border-2 border-gray-100 focus:border-green-400 outline-none bg-white text-center" />
        <span className="absolute right-6 top-1/2 -translate-y-1/2 text-2xl">🎂</span>
      </div>
      {quizState.age && (
        <p className="text-center text-gray-400 text-sm">
          {quizState.age < 30 ? "Prime time for building healthy habits! 💪" : quizState.age < 50 ? "Perfect age to optimize your nutrition! 🌟" : "Age is just a number — let's get you feeling amazing! ✨"}
        </p>
      )}
    </Shell>
  );

  const GenderStep = () => (
    <div className="relative bg-[#f8f6f0] min-h-[calc(100dvh-120px)] flex flex-col items-center justify-center px-4">
      <FoodDecorations />
      <div className="relative z-10 w-full max-w-sm space-y-5">
        {/* Logo small */}
        <div className="text-center">
          <span className="text-2xl font-black"><span className="text-[#1a472a]">Nourish</span><span className="text-[#f97316]">IQ</span></span>
          <div className="h-0.5 w-20 mx-auto mt-0.5 rounded-full bg-gradient-to-r from-[#22c55e] to-[#f97316]" />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-black text-gray-900">How do you identify?</h2>
          <p className="text-[#22c55e] text-sm font-medium mt-1">Used for personalized meal planning only 🌿</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Male", emoji: "🧑‍🦱", color: "#fef3c7" },
            { label: "Female", emoji: "👩", color: "#fce7f3" },
            { label: "Non-binary", emoji: "🧑", color: "#ede9fe" },
            { label: "Other", emoji: "🌈", color: "#ecfdf5" },
          ].map((g) => (
            <button key={g.label} onClick={() => updateQuizState({ gender: g.label })}
              className={`relative p-4 rounded-2xl flex flex-col items-center gap-2 border-2 transition-all font-bold text-sm ${
                quizState.gender === g.label ? "border-[#22c55e] bg-[#f0fdf4]" : "border-transparent bg-white"}`}
              style={{ background: quizState.gender === g.label ? undefined : g.color }}>
              {quizState.gender === g.label && (
                <span className="absolute top-2 right-2 bg-[#22c55e] rounded-full w-5 h-5 flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </span>
              )}
              <span className="text-3xl">{g.emoji}</span>
              <span className="text-gray-700">{g.label}</span>
            </button>
          ))}
        </div>
        <button onClick={() => updateQuizState({ gender: "Prefer not to say" })}
          className={`w-full p-3 rounded-2xl border-2 transition-all font-bold text-sm flex items-center justify-center gap-2 ${
            quizState.gender === "Prefer not to say" ? "border-[#22c55e] bg-[#f0fdf4]" : "border-transparent bg-white"}`}>
          <span className="text-xl">🤫</span> Prefer not to say
        </button>
      </div>
    </div>
  );

  const RegionStep = () => (
    <Shell title="Where are you based?" subtitle="We'll customize recipes for your region 🌍">
      <div className="space-y-2 max-h-[380px] overflow-y-auto">
        {REGIONS.map((r) => (
          <button key={r.code} onClick={() => updateQuizState({ region: r.name })}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold transition-all text-left ${
              quizState.region === r.name ? "bg-[#22c55e] text-white" : "bg-white border border-gray-100 text-gray-700 hover:border-green-200"}`}>
            <span className="text-2xl">{r.flag}</span>
            <span className="flex-1">{r.name}</span>
            {quizState.region === r.name && <Check className="w-5 h-5" />}
          </button>
        ))}
      </div>
    </Shell>
  );

  const DietStep = () => (
    <div className="relative bg-[#f8f6f0] min-h-[calc(100dvh-120px)] flex flex-col items-center justify-center px-4">
      <FoodDecorations />
      <div className="relative z-10 w-full max-w-sm space-y-5">
        <div className="text-center">
          <h2 className="text-2xl font-black text-gray-900">What&apos;s your diet?</h2>
          <p className="text-gray-400 text-sm mt-1">Select all that apply — no judgment here!</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {DIET_TYPES.slice(0, 8).map((d) => {
            const icons: Record<string, string> = { vegan:"🌱", vegetarian:"🥬", "veg-eggs":"🥚", "non-veg":"🍗", "no-beef":"🐄", "no-pork":"🐷", "no-dairy":"🥛", pescatarian:"🐟" };
            const isSelected = quizState.dietType.includes(d.id);
            return (
              <button key={d.id} onClick={() => {
                const updated = quizState.dietType.includes(d.id) ? quizState.dietType.filter(x=>x!==d.id) : [...quizState.dietType, d.id];
                updateQuizState({ dietType: updated });
              }}
                className={`relative flex items-center gap-2 p-3 rounded-2xl border-2 font-bold text-sm transition-all bg-white ${
                  isSelected ? "border-[#22c55e] bg-[#f0fdf4]" : "border-transparent"}`}>
                {isSelected && <span className="absolute top-1.5 right-1.5 bg-[#22c55e] rounded-full w-4 h-4 flex items-center justify-center"><Check className="w-2.5 h-2.5 text-white"/></span>}
                <span className="text-xl">{icons[d.id] || "🍽️"}</span>
                <span className="text-gray-700 text-xs leading-tight">{d.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  const GoalsStep = () => (
    <Shell title="Health goals" subtitle="What are you working toward? 🎯">
      <div className="flex flex-wrap gap-2">
        {HEALTH_GOALS.map((g) => {
          const sel = quizState.healthGoals.includes(g.id);
          return (
            <button key={g.id} onClick={() => {
              const updated = sel ? quizState.healthGoals.filter(x=>x!==g.id) : [...quizState.healthGoals, g.id];
              updateQuizState({ healthGoals: updated });
            }}
              className={`px-4 py-2.5 rounded-full font-bold text-sm border-2 transition-all ${sel ? "bg-[#22c55e] text-white border-[#22c55e]" : "bg-white border-gray-100 text-gray-700"}`}>
              {g.label}
            </button>
          );
        })}
      </div>
    </Shell>
  );

  const ConditionsStep = () => (
    <div className="relative bg-[#f8f6f0] min-h-[calc(100dvh-120px)] flex flex-col items-center justify-center px-4">
      <div className="relative z-10 w-full max-w-sm space-y-4">
        <div className="text-center">
          <h2 className="text-2xl font-black text-gray-900">Any health conditions?</h2>
          <p className="text-gray-400 text-sm mt-1">We&apos;ll tailor recipes to keep you safe &amp; healthy</p>
        </div>
        <div className="space-y-2">
          {HEALTH_CONDITIONS.map((c) => {
            const sel = quizState.healthConditions.includes(c.id);
            return (
              <button key={c.id} onClick={() => {
                let updated: string[];
                if (c.id === "none") { updated = sel ? [] : ["none"]; }
                else { updated = sel ? quizState.healthConditions.filter(x=>x!==c.id) : [...quizState.healthConditions.filter(x=>x!=="none"), c.id]; }
                updateQuizState({ healthConditions: updated });
              }}
                className={`w-full flex items-center gap-3 p-4 rounded-2xl font-semibold text-sm transition-all border-2 ${
                  sel ? "border-[#22c55e] bg-[#f0fdf4] text-gray-900" : "border-gray-100 bg-white text-gray-700"}`}>
                <span className={`w-5 h-5 rounded flex items-center justify-center border-2 flex-shrink-0 transition-all ${sel ? "bg-[#22c55e] border-[#22c55e]" : "border-gray-300"}`}>
                  {sel && <Check className="w-3 h-3 text-white" />}
                </span>
                {c.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  const MenstrualStep = () => {
    const show = ["Female", "Non-binary", "Other"].includes(quizState.gender);
    if (!show) { setTimeout(goNext, 100); return null; }
    return (
      <Shell title="Menstrual health" subtitle="Help us support your cycle with the right nutrition">
        <div className="grid grid-cols-3 gap-3">
          {["Yes","No","Prefer not to say"].map(opt => (
            <button key={opt} onClick={() => updateQuizState({ hasMenstrualCycle: opt })}
              className={`p-3 rounded-2xl font-bold text-sm border-2 transition-all ${quizState.hasMenstrualCycle===opt ? "bg-[#22c55e] text-white border-[#22c55e]" : "bg-white border-gray-100 text-gray-700"}`}>
              {opt}
            </button>
          ))}
        </div>
        {quizState.hasMenstrualCycle==="Yes" && (
          <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:"auto"}} className="space-y-3 mt-2">
            <p className="text-gray-500 font-medium text-sm">Current phase?</p>
            <div className="space-y-2">
              {["Menstrual (Day 1-5)","Follicular (Day 6-13)","Ovulatory (Day 14-16)","Luteal (Day 17-28)","Not sure"].map(phase => (
                <button key={phase} onClick={() => updateQuizState({ menstrualPhase: phase })}
                  className={`w-full text-left p-3 rounded-2xl font-bold text-sm border-2 transition-all ${quizState.menstrualPhase===phase ? "bg-[#22c55e] text-white border-[#22c55e]" : "bg-white border-gray-100"}`}>
                  {phase}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </Shell>
    );
  };

 const FoodsLoveStep = () => {
  const categoryImages: Record<string, string> = {
    Meats: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=100&q=80",
    Seafood: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=100&q=80",
    Dairy: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=100&q=80",
    "Vegan Dairy": "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=100&q=80",
    Grains: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=100&q=80",
  };

  return (
    <div className="relative bg-[#f8f6f0] min-h-[calc(100dvh-120px)] flex flex-col justify-center px-4 py-6">
      <div className="relative z-10 w-full max-w-sm mx-auto space-y-4">
        <div className="text-center">
          <div className="text-3xl mb-1">🍽️</div>
          <h2 className="text-2xl font-black text-gray-900">Foods you love</h2>
          <p className="text-gray-400 text-sm mt-1">Select categories you enjoy most</p>
        </div>
        <div className="space-y-3 max-h-[420px] overflow-y-auto">
          {Object.entries(FOOD_CATEGORIES).slice(0, 5).map(([cat, items]) => (
            <div key={cat} className="bg-white rounded-2xl p-4 border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={categoryImages[cat] || "https://placehold.co/48x48/f0fdf4/22c55e?text=🍽️"}
                  alt={cat}
                  className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                  onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/48x48/f0fdf4/22c55e?text=food"; }}
                />
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 text-sm">{cat}</h3>
                  <p className="text-gray-400 text-xs">{(items as string[]).slice(0, 4).join(", ")}</p>
                </div>
                <button className="text-gray-400 text-xs">▲</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {(items as string[]).slice(0, 5).map((item) => {
                  const sel = quizState.lovedFoods.includes(item);
                  return (
                    <button
                      key={item}
                      onClick={() => {
                        const updated = sel
                          ? quizState.lovedFoods.filter((x) => x !== item)
                          : [...quizState.lovedFoods, item];
                        updateQuizState({ lovedFoods: updated });
                      }}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                        sel
                          ? "bg-[#22c55e] text-white border-[#22c55e]"
                          : "bg-white text-gray-600 border-gray-200"
                      }`}
                    >
                      {sel && (
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
  const FoodsAvoidStep = () => (
    <Shell title="What do you want to avoid?" subtitle="Textures, flavors, and foods you dislike">
      <div className="space-y-5">
        <div>
          <h3 className="font-bold text-gray-700 mb-2 text-sm">🫠 Textures</h3>
          <div className="flex flex-wrap gap-2">
            {TEXTURE_DISLIKES.map(t => {
              const sel = quizState.avoidedTextures.includes(t);
              return <button key={t} onClick={() => updateQuizState({ avoidedTextures: sel ? quizState.avoidedTextures.filter(x=>x!==t) : [...quizState.avoidedTextures,t] })}
                className={`px-3 py-2 rounded-xl text-sm font-bold border-2 transition-all ${sel ? "bg-[#22c55e] text-white border-[#22c55e]" : "bg-white border-gray-100 text-gray-700"}`}>{t}</button>;
            })}
          </div>
        </div>
        <div>
          <h3 className="font-bold text-gray-700 mb-2 text-sm">👅 Flavors</h3>
          <div className="flex flex-wrap gap-2">
            {FLAVOR_DISLIKES.map(f => {
              const sel = quizState.avoidedFlavors.includes(f);
              return <button key={f} onClick={() => updateQuizState({ avoidedFlavors: sel ? quizState.avoidedFlavors.filter(x=>x!==f) : [...quizState.avoidedFlavors,f] })}
                className={`px-3 py-2 rounded-xl text-sm font-bold border-2 transition-all ${sel ? "bg-[#22c55e] text-white border-[#22c55e]" : "bg-white border-gray-100 text-gray-700"}`}>{f}</button>;
            })}
          </div>
        </div>
      </div>
    </Shell>
  );

  const CookingTimeStep = () => {
  return (
    <div className="relative bg-[#f8f6f0] min-h-[calc(100dvh-120px)] flex flex-col items-center justify-center px-4">
      <div className="relative z-10 w-full max-w-sm space-y-4">
        <div className="text-center">
          <div className="text-3xl mb-1">⏱️</div>
          <h2 className="text-2xl font-black text-gray-900">How much time?</h2>
          <p className="text-gray-400 text-sm mt-1">For cooking each meal ⏱️</p>
        </div>
        <div className="space-y-3">
          {[
            { id: "under-15", label: "Under 15 mins", icon: "⚡", desc: "Quick & easy", bg: "#fef9c3" },
            { id: "15-30", label: "15–30 mins", icon: "🕐", desc: "Standard cooking", bg: "#fef3c7" },
            { id: "30-60", label: "30–60 mins", icon: "👨‍🍳", desc: "Weekend cooking", bg: "#fee2e2" },
            { id: "1-2-hours", label: "1–2 hours", icon: "🕐", desc: "Special occasions", bg: "#ede9fe" },
            { id: "meal-prep", label: "I meal prep once a week", icon: "📦", desc: "Batch cooking", bg: "#dbeafe" },
          ].map((opt) => {
            const sel = quizState.cookingTime === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => updateQuizState({ cookingTime: opt.id })}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold transition-all text-left border-2 ${
                  sel ? "border-[#22c55e] bg-white" : "border-transparent bg-white"
                }`}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: opt.bg }}>
                  {opt.icon}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900 text-sm">{opt.label}</p>
                  <p className="text-xs text-gray-400">{opt.desc}</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 ${sel ? "bg-[#22c55e] border-[#22c55e]" : "border-gray-300"}`}>
                  {sel && <svg className="m-auto mt-0.5" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>}
                </div>
              </button>
            );
          })}
        </div>

        {/* Custom meal planning section — screenshot 6 */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Custom Meal Planning</p>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-xl flex-shrink-0">📅</div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-bold text-gray-900 text-sm">Custom meal planning</p>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">Recommended</span>
              </div>
              <p className="text-xs text-gray-400">Choose how many days you want to plan</p>
            </div>
            <div className="w-5 h-5 rounded-full bg-[#22c55e] border-[#22c55e] border-2 flex items-center justify-center">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
            </div>
          </div>
          <div className="flex gap-2">
            {[3, 4, 5, 6, 7].map((d) => (
              <button
                key={d}
                onClick={() => setPlanDays(d)}
                className={`flex-1 py-2 rounded-xl text-sm font-bold border-2 transition-all ${
                  planDays === d ? "bg-[#22c55e] text-white border-[#22c55e]" : "bg-gray-50 text-gray-600 border-transparent"
                }`}
              >
                {d} days
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
  const TimingStep = () => (
    <Shell title="Meal timing" subtitle="When do you usually eat? 🍽️">
      <div className="space-y-3">
        {[{key:"breakfast",label:"Breakfast",default:"08:00",emoji:"🌅"},{key:"lunch",label:"Lunch",default:"13:00",emoji:"☀️"},{key:"snack",label:"Snack",default:"16:00",emoji:"🍿"},{key:"dinner",label:"Dinner",default:"20:00",emoji:"🌙"}].map(meal => (
          <div key={meal.key} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100">
            <div className="flex items-center gap-3"><span className="text-xl">{meal.emoji}</span><span className="font-bold text-gray-700">{meal.label}</span></div>
            <input type="time" value={quizState.mealTimes[meal.key as keyof typeof quizState.mealTimes] || meal.default}
              onChange={(e) => updateQuizState({ mealTimes: { ...quizState.mealTimes, [meal.key]: e.target.value } })}
              className="bg-gray-50 rounded-xl px-3 py-2 font-bold text-sm border border-gray-100 outline-none" />
          </div>
        ))}
      </div>
      <div>
        <p className="text-gray-500 font-medium mb-2 text-sm">How many full meals per day?</p>
        <div className="flex gap-2">
          {[1,2,3,4].map(n => (
            <button key={n} onClick={() => updateQuizState({ mealsPerDay: n })}
              className={`flex-1 p-3 rounded-xl font-bold border-2 transition-all ${quizState.mealsPerDay===n ? "bg-[#22c55e] text-white border-[#22c55e]" : "bg-white border-gray-100 text-gray-700"}`}>{n}</button>
          ))}
        </div>
      </div>
    </Shell>
  );

  const WeightStep = () => {
    if (!quizState.healthGoals.includes("lose-weight")) { setTimeout(goNext, 100); return null; }
    return (
      <Shell title="Weight details" subtitle="Help us set realistic targets">
        <div className="space-y-4">
          <div>
            <p className="text-gray-500 font-medium mb-2 text-sm">Current weight</p>
            <div className="flex gap-2">
              <input type="number" value={quizState.currentWeight||""} onChange={(e) => updateQuizState({ currentWeight: parseInt(e.target.value)||null })}
                placeholder="0" className="flex-1 text-2xl font-black p-4 rounded-2xl border-2 border-gray-100 focus:border-green-400 outline-none text-center" />
              <select value={quizState.weightUnit} onChange={(e) => updateQuizState({ weightUnit: e.target.value })}
                className="bg-white border-2 border-gray-100 rounded-2xl px-4 font-bold text-lg outline-none">
                <option value="kg">kg</option><option value="lbs">lbs</option>
              </select>
            </div>
          </div>
          <div>
            <p className="text-gray-500 font-medium mb-2 text-sm">Target weight</p>
            <input type="number" value={quizState.targetWeight||""} onChange={(e) => updateQuizState({ targetWeight: parseInt(e.target.value)||null })}
              placeholder="0" className="w-full text-2xl font-black p-4 rounded-2xl border-2 border-gray-100 focus:border-green-400 outline-none text-center" />
          </div>
        </div>
      </Shell>
    );
  };

  const AppliancesStep = () => (
    <div className="relative bg-[#f8f6f0] min-h-[calc(100dvh-120px)] flex flex-col items-center justify-center px-4">
      <div className="relative z-10 w-full max-w-sm space-y-4">
        <div className="text-center">
          <div className="text-3xl mb-1">🍳</div>
          <h2 className="text-2xl font-black text-gray-900">Your kitchen setup</h2>
          <p className="text-gray-400 text-sm mt-1">Select the appliances you have</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {APPLIANCE_OPTIONS.map(a => {
            const icons: Record<string,string> = {none:"⊞",microwave:"📡",airfryer:"🌪️",oven:"🔥",toaster:"🍞","instant-pot":"⚡","slow-cooker":"🐌",blender:"🌀","food-processor":"⚙️"};
            const bgs: Record<string,string> = {none:"#f0fdf4",microwave:"#ede9fe",airfryer:"#fff7ed",oven:"#fef9c3",toaster:"#dcfce7","instant-pot":"#dbeafe","slow-cooker":"#fee2e2",blender:"#faf5ff","food-processor":"#ecfdf5"};
            const sel = quizState.appliances.includes(a.id);
            return (
              <button key={a.id} onClick={() => {
                const updated = sel ? quizState.appliances.filter(x=>x!==a.id) : [...quizState.appliances, a.id];
                updateQuizState({ appliances: updated });
              }}
                className={`relative p-4 rounded-2xl border-2 font-bold text-sm flex flex-col items-center gap-1.5 transition-all ${sel ? "border-[#22c55e]" : "border-transparent"}`}
                style={{background: sel ? "#f0fdf4" : (bgs[a.id]||"#fff")}}>
                {sel && <span className="absolute top-2 right-2 bg-[#22c55e] rounded-full w-5 h-5 flex items-center justify-center"><Check className="w-3 h-3 text-white"/></span>}
                <span className="text-2xl">{icons[a.id]||"🔥"}</span>
                <span className="text-gray-800 text-xs leading-tight text-center">{a.name}</span>
                {a.desc && <span className="text-gray-400 text-[10px] text-center">{a.desc}</span>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  const ConfirmStep = () => (
    <div className="space-y-6 text-center py-4">
      <motion.div initial={{scale:0}} animate={{scale:1}} transition={{type:"spring",stiffness:200,damping:15}}>
        <KawaiiCharacter emotion="love" size={90} animate={false} />
      </motion.div>
      <h2 className="text-2xl font-black text-gray-900">All set, {quizState.name}! 🎉</h2>
      <div className="flex flex-col items-center gap-3">
        <div className="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-2xl"
          style={{background:"linear-gradient(135deg,#22c55e,#16a34a)"}}>
          {quizState.name.slice(0,2).toUpperCase()}
        </div>
        <p className="font-bold text-lg">{quizState.name}</p>
        <p className="text-gray-400 text-sm">{quizState.region} • {quizState.dietType[0] ? DIET_TYPES.find(dt=>dt.id===quizState.dietType[0])?.label : "No diet selected"}</p>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {quizState.healthGoals.map(g => (
          <span key={g} className="px-3 py-1.5 rounded-full bg-orange-50 text-orange-600 text-sm font-bold border border-orange-100">
            {HEALTH_GOALS.find(h=>h.id===g)?.label||g}
          </span>
        ))}
      </div>
    </div>
  );

  const steps: Record<number, React.ReactNode> = {
    1: <WelcomeStep />, 2: <NameStep />, 3: <AgeStep />, 4: <GenderStep />,
    5: <RegionStep />, 6: <DietStep />, 7: <GoalsStep />, 8: <ConditionsStep />,
    9: <MenstrualStep />, 10: <FoodsLoveStep />, 11: <FoodsAvoidStep />,
    12: <CookingTimeStep />, 13: <TimingStep />, 14: <WeightStep />,
    15: <AppliancesStep />, 16: <ConfirmStep />,
  };

  // Full-screen steps that handle their own layout
  const fullScreenSteps = new Set([1,2,4,6,8,10,12,15]);

  if (quizStep === 1) return <WelcomeStep />;

  // Full-screen steps with their own background/layout
  if (fullScreenSteps.has(quizStep)) {
    return (
      <div className="min-h-[100dvh] flex flex-col">
        {/* Progress bar */}
        <div className="px-5 pt-5 pb-2 absolute top-0 left-0 right-0 z-20">
          <div className="flex items-center justify-between mb-2">
            <button onClick={goBack} className="p-2 rounded-full bg-white/80 border border-gray-100 shadow-sm backdrop-blur-sm">
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <span className="text-sm font-bold text-gray-500 bg-white/80 px-3 py-1 rounded-full backdrop-blur-sm">
              {quizStep - 1} / {totalQuizSteps - 1}
            </span>
            <div className="w-10" />
          </div>
          <div className="w-full h-1.5 bg-white/60 rounded-full overflow-hidden backdrop-blur-sm">
            <motion.div className="h-full rounded-full bg-[#22c55e]"
              initial={{width:0}} animate={{width:`${progress}%`}} transition={{duration:0.4}} />
          </div>
        </div>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div key={quizStep} custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{duration:0.3}} className="flex-1">
            {steps[quizStep]}
          </motion.div>
        </AnimatePresence>

        {/* Bottom continue button */}
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-8 pt-4 bg-gradient-to-t from-white/90 to-transparent">
          <button onClick={goNext}
            className="w-full py-4 rounded-2xl text-white font-bold text-base flex items-center justify-center gap-2"
            style={{background:"linear-gradient(135deg,#22c55e,#16a34a)",boxShadow:"0 8px 24px rgba(34,197,94,0.3)"}}>
            {quizStep === totalQuizSteps ? "Get Started! 🚀" : "Continue"}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  // Standard scrollable steps
  return (
    <div className="min-h-[100dvh] bg-white flex flex-col">
      <div className="px-5 pt-5 pb-2">
        <div className="flex items-center justify-between mb-3">
          <button onClick={goBack} className="p-2.5 rounded-full bg-gray-50 border border-gray-100">
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <span className="text-sm font-bold text-gray-400">{quizStep - 1} / {totalQuizSteps - 1}</span>
          <div className="w-10" />
        </div>
        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <motion.div className="h-full rounded-full bg-[#22c55e]"
            initial={{width:0}} animate={{width:`${progress}%`}} transition={{duration:0.4}} />
        </div>
      </div>

      <div className="flex-1 px-5 py-4 overflow-y-auto">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div key={quizStep} custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{duration:0.3}}>
            {steps[quizStep] || steps[1]}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="px-5 pb-8 pt-2">
        <button onClick={goNext}
          className="w-full py-4 rounded-2xl text-white font-bold text-base flex items-center justify-center gap-2"
          style={{background:"linear-gradient(135deg,#22c55e,#16a34a)",boxShadow:"0 8px 24px rgba(34,197,94,0.3)"}}>
          {quizStep === totalQuizSteps ? "Get Started! 🚀" : "Continue →"}
        </button>
      </div>
    </div>
  );
}
