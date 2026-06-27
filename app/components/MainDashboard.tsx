"use client";

import { useApp, MEALS, Meal } from "../AppContext";
import { Bell, ChevronDown, ChevronLeft, ChevronRight, Volume2, Home, Sparkles, Plane, ShoppingBasket, User, Camera, Droplet, Globe, Trophy, Leaf } from "lucide-react";
import { CraverTab } from "../sections/CraverTab";
import { TravelTab } from "../sections/TravelTab";
import { GroceryTab } from "../sections/GroceryTab";
import { ProfileTab } from "../sections/ProfileTab";
import { WEEKLY_CHALLENGE, HOME_REMEDIES } from "../lib/mealData";
import { useState } from "react";

const DAYS = [
  { day: "MON", date: 22 },
  { day: "TUE", date: 23 },
  { day: "WED", date: 24 },
  { day: "THU", date: 25 },
  { day: "FRI", date: 26 },
  { day: "SAT", date: 27 },
  { day: "SUN", date: 28 },
];

const NUTRIENTS = [
  { name: "Iron", val: "12.5", unit: "mg", icon: "🔴", color: "#e74c3c" },
  { name: "Magnesium", val: "210", unit: "mg", icon: "🟣", color: "#8e44ad" },
  { name: "Zinc", val: "8.2", unit: "mg", icon: "🛡️", color: "#27ae60" },
  { name: "Calcium", val: "320", unit: "mg", icon: "💙", color: "#3498db" },
];

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  BREAKFAST: { bg: "#FF8C42", text: "white" },
  LUNCH: { bg: "#4CAF50", text: "white" },
  DINNER: { bg: "#7C5CBF", text: "white" },
  SNACK: { bg: "#E91E8C", text: "white" },
  BEVERAGE: { bg: "#00BCD4", text: "white" },
};

function MealRow({ meal }: { meal: Meal }) {
  const { setSelectedMeal, setShowRecipeSheet } = useApp();
  const cat = CATEGORY_COLORS[meal.category] || { bg: "#4CAF50", text: "white" };

  const speakMeal = (e: React.MouseEvent) => {
    e.stopPropagation();
    if ("speechSynthesis" in window) {
      const text = `${meal.name}. ${meal.calories} calories. ${meal.protein} grams protein. ${meal.carbs} grams carbs. Cook time ${meal.cookTime}.`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div
      className="flex items-center gap-3 py-2.5 cursor-pointer tap-scale"
      onClick={() => { setSelectedMeal(meal); setShowRecipeSheet(true); }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0"
        style={{ background: cat.bg, color: cat.text, fontSize: 9, padding: 4, lineHeight: 1.2, textAlign: "center" }}
      >
        {meal.category}
      </div>
      <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
        <img
          src={meal.image}
          alt={meal.name}
          className="w-full h-full object-cover"
          onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/100x100/16a34a/ffffff?text=meal`; }}
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900 truncate">{meal.name}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs font-bold text-orange-500">{meal.calories}</span>
          <span className="text-xs text-gray-400">kcal</span>
          <span className="text-xs font-bold" style={{ color: "var(--leaf-deep)" }}>{meal.protein}g</span>
          <span className="text-xs text-gray-400">protein</span>
        </div>
      </div>
      <button onClick={speakMeal} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
        <Volume2 size={14} style={{ color: "var(--leaf)" }} />
      </button>
    </div>
  );
}

function HomeTile({ icon: Icon, title, desc, gradient, onClick }: { icon: any; title: string; desc: string; gradient: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="rounded-2xl p-4 text-left text-white tap-scale" style={{ background: gradient }}>
      <Icon size={22} className="mb-2 opacity-90" />
      <p className="font-display font-bold text-base leading-tight">{title}</p>
      <p className="text-xs opacity-90 mt-0.5">{desc}</p>
    </button>
  );
}

export function MainDashboard() {
  const {
    profile, setActiveTab, activeTab, weeklyGoal, logGoalProgress,
    selectedDayIndex, setSelectedDayIndex, setSelectedMeal, setShowRecipeSheet,
    groceryToast,
  } = useApp();
  const [showApothecary, setShowApothecary] = useState(false);
  const userName = profile.name || "Friend";

  const tabs = [
    { id: "Home", icon: Home, label: "Home" },
    { id: "Craver", icon: Sparkles, label: "Craver" },
    { id: "Travel", icon: Plane, label: "Travel" },
    { id: "Grocery", icon: ShoppingBasket, label: "Grocery" },
    { id: "Me", icon: User, label: "Me" },
  ];

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto relative" style={{ background: "var(--color-bg)" }}>
      {groceryToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-2xl text-sm font-semibold shadow-lg animate-fade-in" style={{ background: "var(--leaf)", color: "white" }}>
          ✓ {groceryToast}
        </div>
      )}

      <div className="flex-1 overflow-y-auto pb-24">
        {activeTab === "Home" && (
          <div key="home" className="animate-fade-in">
            <div className="px-4 pt-5 pb-2">
              <div className="flex items-center justify-between mb-1">
                <div>
                  <h1 className="font-display text-2xl font-black" style={{ color: "var(--leaf-deep)" }}>Hey, {userName} 👋</h1>
                  <p className="text-sm" style={{ color: "var(--color-muted-foreground)" }}>Fuel right. Feel good. Crush your goals. ✦</p>
                </div>
                <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center relative shadow-sm">
                  <Bell size={20} className="text-gray-700" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                </button>
              </div>
            </div>

            <div className="px-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <button
                  onClick={() => setSelectedDayIndex(Math.max(0, selectedDayIndex - 1))}
                  className="w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-sm"
                >
                  <ChevronLeft size={14} className="text-gray-600" />
                </button>
                <span className="text-sm font-semibold flex items-center gap-1.5" style={{ color: "var(--leaf-deep)" }}>
                  📅 {DAYS[selectedDayIndex].day}, June {DAYS[selectedDayIndex].date}
                  <ChevronDown size={14} className="text-gray-400" />
                </span>
                <button
                  onClick={() => setSelectedDayIndex(Math.min(DAYS.length - 1, selectedDayIndex + 1))}
                  className="w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-sm"
                >
                  <ChevronRight size={14} className="text-gray-600" />
                </button>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {DAYS.map((d, i) => {
                  const isSelected = i === selectedDayIndex;
                  return (
                    <button
                      key={d.date}
                      onClick={() => setSelectedDayIndex(i)}
                      className="flex flex-col items-center px-2.5 py-1.5 rounded-xl transition-all flex-shrink-0"
                      style={isSelected ? { background: "var(--gradient-cta)", color: "white" } : { color: "var(--color-muted-foreground)" }}
                    >
                      <span className="text-[10px] font-medium">{d.day}</span>
                      <span className="text-sm font-bold">{d.date}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="px-4 mb-4">
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {NUTRIENTS.map((n) => (
                  <div key={n.name} className="flex-shrink-0 card-soft p-3 min-w-[80px]">
                    <div className="flex items-center gap-1 mb-1">
                      <span className="text-xs">{n.icon}</span>
                      <span className="text-xs font-medium" style={{ color: "var(--color-muted-foreground)" }}>{n.name}</span>
                    </div>
                    <p className="text-base font-bold text-gray-900">{n.val}</p>
                    <p className="text-xs text-gray-400">{n.unit}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 2x2 quick-access grid matching the prototype */}
            <div className="px-4 grid grid-cols-2 gap-3 mb-4">
              <HomeTile icon={Globe} title="Travel cuisine" desc="Eat the world from your kitchen" gradient="linear-gradient(135deg, #0ea5e9, #2563eb)" onClick={() => setActiveTab("Travel")} />
              <HomeTile icon={Trophy} title="Weekly goal" desc={weeklyGoal.label} gradient="linear-gradient(135deg, #f59e0b, #d97706)" onClick={() => logGoalProgress(50)} />
              <HomeTile icon={Leaf} title="Apothecary" desc="DIY tonics, teas & oils" gradient="linear-gradient(135deg, #16a34a, #15803d)" onClick={() => setShowApothecary(true)} />
              <HomeTile icon={Sparkles} title="Craver" desc="What are you craving?" gradient="linear-gradient(135deg, #db2777, #be185d)" onClick={() => setActiveTab("Craver")} />
            </div>

            {/* Weekly goal progress */}
            <div className="px-4 mb-4">
              <div className="card-soft p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-gray-800">{weeklyGoal.label}</span>
                  <span className="text-xs font-semibold text-gray-500">{weeklyGoal.current}/{weeklyGoal.target} {weeklyGoal.unit}</span>
                </div>
                <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${Math.min(100, (weeklyGoal.current / weeklyGoal.target) * 100)}%`, background: "var(--gradient-cta)" }} />
                </div>
              </div>
            </div>

            {/* Weekly challenge */}
            <div className="px-4 mb-4">
              <p className="text-sm font-bold text-gray-800 mb-2 font-display">{WEEKLY_CHALLENGE.weekLabel}</p>
              <div className="grid grid-cols-2 gap-3">
                {[{ label: "Sweet Treat", meal: WEEKLY_CHALLENGE.sweet }, { label: "Savory Treat", meal: WEEKLY_CHALLENGE.savory }].map(({ label, meal }) => (
                  <button
                    key={meal.id}
                    onClick={() => { setSelectedMeal(meal as any); setShowRecipeSheet(true); }}
                    className="card-soft overflow-hidden text-left tap-scale"
                  >
                    <img src={meal.image} alt={meal.name} className="w-full h-20 object-cover" />
                    <div className="p-2.5">
                      <p className="text-[10px] font-bold uppercase" style={{ color: "var(--berry)" }}>{label}</p>
                      <p className="text-xs font-semibold text-gray-800 truncate">{meal.name}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Plate scanner card */}
            <div className="px-4 mb-4">
              <div className="card-soft p-4">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <Camera size={16} style={{ color: "var(--sky)" }} />
                    <span className="text-sm font-bold text-gray-800">Plate Scanner</span>
                  </div>
                </div>
                <p className="text-xs mb-3" style={{ color: "var(--color-muted-foreground)" }}>Snap your plate → calories, protein & healthier swap.</p>
                <button className="w-full py-2.5 rounded-xl text-sm font-semibold border-2 border-dashed" style={{ borderColor: "var(--color-border)", color: "var(--color-muted-foreground)" }}>
                  📷 Tap to scan a sample plate
                </button>
              </div>
            </div>

            {/* Today's meals */}
            <div className="px-4 mb-4">
              <p className="text-sm font-bold text-gray-800 mb-1 font-display">Today's meals</p>
              <div className="card-soft px-3 py-1 divide-y" style={{ borderColor: "var(--color-border)" }}>
                {MEALS.map((meal) => (
                  <MealRow key={meal.id} meal={meal} />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "Craver" && <div className="animate-fade-in"><CraverTab /></div>}
        {activeTab === "Travel" && <div className="animate-fade-in"><TravelTab /></div>}
        {activeTab === "Grocery" && <div className="animate-fade-in"><GroceryTab /></div>}
        {activeTab === "Me" && <div className="animate-fade-in"><ProfileTab /></div>}
      </div>

      {/* Bottom nav (pill style matching prototype) */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto px-3 pb-3 pointer-events-none">
        <div className="pointer-events-auto flex items-center justify-between rounded-full px-2 py-2 shadow-lg backdrop-blur" style={{ background: "rgba(255,255,255,0.95)", border: "1px solid var(--color-border)" }}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex-1 flex flex-col items-center gap-0.5 py-1.5 rounded-full tap-scale"
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={isActive ? { background: "var(--leaf)" } : {}}
                >
                  <Icon size={18} color={isActive ? "white" : "#9a9482"} />
                </div>
                <span className="text-[10px] font-semibold" style={{ color: isActive ? "var(--leaf-deep)" : "var(--color-muted-foreground)" }}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Apothecary modal */}
      {showApothecary && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-end justify-center">
          <div className="w-full max-w-md bg-white rounded-t-[2rem] max-h-[80vh] overflow-y-auto p-5 animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg font-bold">Apothecary</h3>
              <button onClick={() => setShowApothecary(false)} className="p-2 bg-gray-100 rounded-full text-sm font-semibold">Close</button>
            </div>
            <div className="space-y-3">
              {HOME_REMEDIES.map((r) => (
                <div key={r.id} className="card-soft p-4">
                  <p className="text-sm font-bold text-gray-800">{r.title}</p>
                  <p className="text-xs mb-2" style={{ color: "var(--leaf-deep)" }}>For: {r.symptom}</p>
                  <p className="text-xs text-gray-600">{r.benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
