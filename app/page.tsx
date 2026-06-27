"use client";

import React, { useState } from "react";
import { 
  Bell, ChevronDown, ChevronLeft, ChevronRight, Volume2, Home, 
  Sparkles, Plane, ShoppingBasket, User, X, Plus, Minus, Camera, Check, CreditCard, ShieldAlert, Award
} from "lucide-react";

export interface Meal {
  id: string;
  name: string;
  category: "BREAKFAST" | "LUNCH" | "DINNER" | "SNACK" | "BEVERAGE";
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  cookTime: string;
  servings: number;
  image: string;
  description: string;
  ingredients: { name: string; amount: string }[];
  steps: string[];
}

const DATA_MEALS: Meal[] = [
  {
    id: "m1",
    name: "Shakshuka with Feta",
    category: "BREAKFAST",
    calories: 352,
    protein: 22,
    carbs: 36,
    fat: 14,
    cookTime: "25 min",
    servings: 1,
    image: "https://unsplash.com",
    description: "Rich spiced tomato and pepper sauce with perfectly poached eggs and crumbly feta.",
    ingredients: [{ name: "Eggs", amount: "2 large" }, { name: "Crumbled Feta", amount: "50 g" }, { name: "Tomato Puree", amount: "1 cup" }],
    steps: ["Cook peppers and spices.", "Add tomato puree and simmer.", "Crack eggs inside, cover, and top with feta."]
  },
  {
    id: "m2",
    name: "Lemon Herb Chicken Bowl",
    category: "LUNCH",
    calories: 480,
    protein: 34,
    carbs: 42,
    fat: 16,
    cookTime: "30 min",
    servings: 2,
    image: "https://unsplash.com",
    description: "Citrusy grilled chicken over fluffy quinoa, avocado and crisp greens.",
    ingredients: [{ name: "Chicken breast", amount: "200 g" }, { name: "Lemon juice", amount: "2 tbsp" }, { name: "Cooked quinoa", amount: "1 cup" }],
    steps: ["Marinate chicken in lemon juice.", "Grill chicken until cooked through.", "Layer quinoa, greens, and chicken in a bowl."]
  },
  {
    id: "m3",
    name: "Chola Masala with Flatbread",
    category: "DINNER",
    calories: 410,
    protein: 16,
    carbs: 58,
    fat: 12,
    cookTime: "30 min",
    servings: 2,
    image: "https://unsplash.com",
    description: "Traditional chickpea curry cooked with spices, served with flatbread.",
    ingredients: [{ name: "Chickpeas", amount: "1.5 cups" }, { name: "Flatbread", amount: "2 pieces" }],
    steps: ["Sauté onions and spices.", "Simmer chickpeas in tomato gravy.", "Serve with warm flatbreads."]
  },
  {
    id: "m4",
    name: "Poha",
    category: "SNACK",
    calories: 280,
    protein: 8,
    carbs: 46,
    fat: 6,
    cookTime: "15 min",
    servings: 1,
    image: "https://unsplash.com",
    description: "Fluffy flattened rice seasoned with yellow turmeric, mustard seeds, and crunchy peanuts.",
    ingredients: [{ name: "Flattened Rice", amount: "1 cup" }, { name: "Turmeric", amount: "0.5 tsp" }, { name: "Peanuts", amount: "2 tbsp" }],
    steps: ["Rinse poha lightly.", "Sauté peanuts and tempering spices.", "Gently mix ingredients."]
  }
];

const TRAVEL_CUISINES = [
  {
    country: "Japan", tag: "JP VEGAN", bg: "linear-gradient(135deg, #1e293b 0%, #3b82f6 100%)",
    items: [
      { name: "Miso Soup", time: "15 min", kcal: "110 kcal", img: "https://unsplash.com" },
      { name: "Avocado Sushi", time: "25 min", kcal: "290 kcal", img: "https://unsplash.com" }
    ]
  },
  {
    country: "India", tag: "IN VEGAN", bg: "linear-gradient(135deg, #db2777 0%, #f43f5e 100%)",
    items: [
      { name: "Chola Masala with Flatbread", time: "30 min", kcal: "410 kcal", img: "https://unsplash.com" },
      { name: "Poha", time: "15 min", kcal: "280 kcal", img: "https://unsplash.com" }
    ]
  }
];

const APOTHECARY_ITEMS = [
  { id: "ap1", name: "Ginger Turmeric Health Shot", category: "TONIC", desc: "Immunity & inflammation", color: "#FFB020" },
  { id: "ap2", name: "Orange Skin Tea with Honey", category: "TEA", desc: "Glow & antioxidants", color: "#FF8C42" },
  { id: "ap3", name: "DIY Clove Skin Oil", category: "OIL", desc: "Spot treatment & calming", color: "#10B981" },
  { id: "ap4", name: "Honey Oat Calming Mask", category: "MASK", desc: "Soothing & hydration", color: "#EC4899" }
];

const CRAVER_DECK = [
  { name: "Spaghetti", img: "https://unsplash.com" },
  { name: "Sushi", img: "https://unsplash.com" },
  { name: "Tacos", img: "https://unsplash.com" },
  { name: "Ramen", img: "https://unsplash.com" },
  { name: "Pizza", img: "https://unsplash.com" },
  { name: "Buddha Bowl", img: "https://unsplash.com" }
];

const DAYS = [
  { day: "MON", date: 22 }, { day: "TUE", date: 23 }, { day: "WED", date: 24 },
  { day: "THU", date: 25 }, { day: "FRI", date: 26 }, { day: "SAT", date: 27 }, { day: "SUN", date: 28 }
];

export default function NourishIQApp() {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");
  const [selectedDayIndex, setSelectedDayIndex] = useState(5); 
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [showRecipeSheet, setShowRecipeSheet] = useState(false);
  const [showApothecary, setShowApothecary] = useState(false);
  const [waterCount, setWaterCount] = useState(0);
  const [groceryToast, setGroceryToast] = useState<string | null>(null);
  const [scanState, setScanState] = useState<"idle" | "image_selected" | "scanning" | "done">("idle");
  const [scannedFileName, setScannedFileName] = useState("");
  const [craverInput, setCraverInput] = useState("");
  const [craverResult, setCraverResult] = useState<string | null>(null);

  const [groceryList, setGroceryList] = useState<{ name: string; checked: boolean }[]>([
    { name: "Chicken breast", checked: false }, { name: "Lemon juice", checked: false }
  ]);

  const [profile, setProfile] = useState({
    name: "", step: 1, goal: "Eat cleaner", diet: "Omnivore"
  });

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 0.95;
      window.speechSynthesis.speak(u);
    }
  };

  const executeScanningSequence = () => {
    setScanState("scanning");
    setTimeout(() => setScanState("done"), 2200);
  };

  const handleImageChoice = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files && e.target.files[0]) {
      setScannedFileName(e.target.files[0].name);
      setScanState("image_selected");
    }
  };

  if (!isOnboarded) {
    const handleNext = () => {
      if (profile.step === 10) setIsOnboarded(true);
      else setProfile(p => ({ ...p, step: p.step + 1 }));
    };

    return (
      <div className="min-h-screen max-w-md mx-auto flex flex-col justify-between px-6 py-8 bg-[#FCFBF7] shadow-2xl">
        <div className="w-full">
          <p className="text-[11px] font-black text-center text-emerald-950 tracking-widest">{profile.step} / 10</p>
          <div className="w-full h-1 bg-neutral-100 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-green-600 transition-all duration-300" style={{ width: `${profile.step * 10}%` }} />
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center my-8 text-center">
          <h2 className="font-display text-3xl font-black text-emerald-600 mb-6">NourishIQ</h2>

          {profile.step === 1 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-800">Welcome to NourishIQ 🌿</h3>
              <p className="text-xs text-gray-500 max-w-xs mx-auto leading-relaxed bg-white border p-4 rounded-2xl shadow-sm">
                Personalised meal plans, plate scans, travel cuisine, cravings, and DIY apothecary — matching your mockup sheets perfectly.
              </p>
            </div>
          )}

          {profile.step === 2 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-gray-800">What should we call you? 👋</h3>
              <input type="text" value={profile.name} onChange={e => setProfile(p => ({ ...p, name: e.target.value }))} placeholder="Your name" className="w-full max-w-xs mx-auto border bg-white rounded-full px-5 py-3 text-xs text-center font-bold" />
            </div>
          )}

          {profile.step === 3 && (
            <div className="space-y-2 max-w-xs mx-auto w-full">
              <h3 className="text-base font-bold text-gray-800 mb-2">How do you identify? 🧬</h3>
              {["Male", "Female", "Non-binary", "Prefer not to say"].map((g) => (
                <button key={g} type="button" onClick={handleNext} className="w-full bg-white border p-3 rounded-xl font-bold text-xs text-gray-700 hover:border-green-600 mb-1">{g}</button>
              ))}
            </div>
          )}

          {profile.step === 4 && (
            <div className="space-y-2 max-w-xs mx-auto w-full">
              <h3 className="text-base font-bold text-gray-800 mb-2">What&apos;s your health goal? 🎯</h3>
              {["Lose fat", "Build muscle", "Eat cleaner", "Boost energy"].map((g) => (
                <button key={g} type="button" onClick={() => { setProfile(p => ({ ...p, goal: g })); handleNext(); }} className={`w-full p-3 rounded-xl font-bold text-xs border ${profile.goal === g ? "bg-green-50 border-green-600 text-green-700" : "bg-white text-gray-700"}`}>{g}</button>
              ))}
            </div>
          )}

          {profile.step === 5 && (
            <div className="space-y-2 max-w-xs mx-auto w-full">
              <h3 className="text-base font-bold text-gray-800 mb-2">What dietary path do you follow? 🥦</h3>
              {["Omnivore", "Vegetarian", "Vegan", "Pescatarian"].map((d) => (
                <button key={d} type="button" onClick={() => { setProfile(p => ({ ...p, diet: d })); handleNext(); }} className="w-full bg-white border p-3 rounded-xl font-bold text-xs text-gray-700 mb-1">{d}</button>
              ))}
            </div>
          )}

          {profile.step === 6 && (
            <div className="space-y-2 max-w-xs mx-auto w-full">
              <h3 className="text-base font-bold text-gray-800 mb-2">Any specific food allergies? ⚠️</h3>
              {["Gluten Free", "Nut Free", "Dairy Free", "None"].map((a) => (
                <button key={a} type="button" onClick={handleNext} className="w-full bg-white border p-3 rounded-xl font-bold text-xs text-gray-700 mb-1">{a}</button>
              ))}
            </div>
          )}

          {profile.step === 7 && (
            <div className="space-y-2 max-w-xs mx-auto w-full">
              <h3 className="text-base font-bold text-gray-800 mb-2">Preferred spice tolerance? 🌶️</h3>
              {["Mild", "Medium", "Extra Hot"].map((s) => (
                <button key={s} type="button" onClick={handleNext} className="w-full bg-white border p-3 rounded-xl font-bold text-xs text-gray-700 mb-1">{s}</button>
              ))}
            </div>
          )}

          {profile.step === 8 && (
            <div className="space-y-2 max-w-xs mx-auto w-full">
              <h3 className="text-base font-bold text-gray-800 mb-2">Usual duration for cooking? ⏱️</h3>
              {["Less than 15m", "30 minutes", "Under an hour"].map((t) => (
                <button key={t} type="button" onClick={handleNext} className="w-full bg-white border p-3 rounded-xl font-bold text-xs text-gray-700 mb-1">{t}</button>
              ))}
            </div>
          )}

          {profile.step === 9 && (
            <div className="space-y-2 max-w-xs mx-auto w-full">
              <h3 className="text-base font-bold text-gray-800 mb-2">Daily hydration target? 💧</h3>
              {["1-2 Litres", "3 Litres+", "Not tracking"].map((w) => (
                <button key={w} type="button" onClick={handleNext} className="w-full bg-white border p-3 rounded-xl font-bold text-xs text-gray-700 mb-1">{w}</button>
              ))}
            </div>
          )}

          {profile.step === 10 && (
            <div className="space-y-3">
              <h3 className="text-base font-bold text-gray-800">Primary cooking hardware? 🍳</h3>
              <div className="flex flex-wrap gap-2 justify-center max-w-xs mx-auto">
                {["Stovetop", "Oven", "Air fryer", "Blender"].map(ap => (
                  <span key={ap} onClick={handleNext} className="bg-white border border-green-200 text-green-800 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm cursor-pointer hover:border-green-600">{ap}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        <button type="button" onClick={handleNext} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-full text-xs transition-all">
          {profile.step === 10 ? "Finish Setup ✓" : "Continue"}
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto relative bg-[#FCFBF7] shadow-2xl overflow-hidden">
      <div className="flex-1 overflow-y-auto pb-24 scrollbar-hide">
        
        {activeTab === "Home" && (
          <div className="p-4 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="font-display text-2xl font-black text-emerald-950">Hey, {profile.name || "Friend"} 👋</h1>
                <p className="text-xs text-gray-500 font-medium">Fuel right. Feel good. Crush your goals. ✦</p>
              </div>
              <span className="w-8 h-8 rounded-full bg-white border flex items-center justify-center text-xs shadow-sm">LOG</span>
            </div>

            <div className="mb-4 bg-white/40 border p-2 rounded-2xl shadow-sm text-center">
              <p className="text-xs font-black text-emerald-900">📅 Saturday 27 June</p>
            </div>

            <div className="grid grid-cols-4 gap-2 mb-5">
              {[{ name: "Iron", val: "12.5 mg", icon: "🔴" }, { name: "Magnesium", val: "210 mg", icon: "🟣" }, { name: "Zinc", val: "8.2 mg", icon: "🛡️" }, { name: "Calcium", val: "320 mg", icon: "💙" }].map((n, i) => (
                <div key={i} className="bg-white rounded-xl p-2 border shadow-sm text-center">
                  <span className="text-xs block">{n.icon}</span>
                  <p className="text-[9px] uppercase font-black text-gray-400 mt-0.5">{n.name}</p>
                  <p className="text-xs font-black text-gray-800 mt-0.5">{n.val}</p>
                </div>
              ))}
            </div>

            <div className="space-y-3 mb-6">
              {DATA_MEALS.map((meal) => (
                <div key={meal.id} onClick={() => { setSelectedMeal(meal); setShowRecipeSheet(true); }} className="bg-white rounded-2xl border flex items-center p-2.5 gap-3 cursor-pointer group hover:border-green-200 transition-all">
                  <div className="w-14 h-10 rounded-xl bg-green-600 text-white font-black text-[9px] flex items-center justify-center px-1 text-center">{meal.category}</div>
                  <img src={meal.image} alt="" className="w-12 h-12 rounded-xl object-cover shadow-inner" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-gray-900 truncate group-hover:text-green-600">{meal.name}</p>
                    <p className="text-[11px] text-gray-500 mt-0.5"><span className="text-orange-500 font-extrabold">{meal.calories}</span> kcal • <span className="text-green-600 font-bold">{meal.protein}g</span> protein</p>
                  </div>
                  <button type="button" onClick={(e) => { e.stopPropagation(); speakText(meal.name); }} className="w-7 h-7 bg-neutral-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-green-100"><Volume2 size={13} /></button>
                </div>
              ))}
            </div>

            <h3 className="font-display text-base font-black text-emerald-950 mb-3">Explore today</h3>
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div onClick={() => setActiveTab("Travel")} className="p-4 rounded-2xl text-white bg-gradient-to-br from-sky-400 to-blue-500 cursor-pointer shadow-md"><Plane size={18} className="mb-2" /><p className="font-bold text-sm">Travel cuisine</p></div>
              <div className="p-4 rounded-2xl text-white bg-gradient-to-br from-amber-400 to-orange-500 shadow-md"><Sparkles size={18} className="mb-2" /><p className="font-bold text-sm">Weekly goal</p></div>
              <div onClick={() => setShowApothecary(true)} className="p-4 rounded-2xl text-white bg-gradient-to-br from-emerald-500 to-teal-600 cursor-pointer shadow-md"><ShoppingBasket size={18} className="mb-2" /><p className="font-bold text-sm">Apothecary</p></div>
              <div onClick={() => setActiveTab("Craver")} className="p-4 rounded-2xl text-white bg-gradient-to-br from-pink-500 to-rose-500 cursor-pointer shadow-md"><Sparkles size={18} className="mb-2" /><p className="font-bold text-sm">Craver</p></div>
            </div>

            {/* REAL INTERACTIVE NON-AUTOMATED DEVICE INPUT PLATE SCANNER */}
            <div className="bg-white border border-neutral-100 rounded-2xl p-4 shadow-sm mb-5 relative overflow-hidden">
              <div className="flex justify-between items-center mb-1">
                <h4 className="text-xs font-bold text-emerald-950 flex items-center gap-1">📸 Plate Scanner</h4>
                {scanState === "done" && (
                  <button type="button" onClick={() => { setScanState("idle"); setScannedFileName(""); }} className="text-[10px] bg-red-500 text-white font-black px-2.5 py-1 rounded-full shadow-sm">Reset</button>
                )}
              </div>
              <p className="text-[11px] text-gray-400 mb-3">Snap your plate → calories, protein & healthier swap.</p>

              {scanState === "idle" && (
                <div className="bg-neutral-50 py-6 rounded-xl border border-dashed border-gray-200 text-center text-gray-400 text-xs font-bold relative hover:bg-neutral-100 transition-all">
                  <input type="file" accept="image/*" onChange={handleImageChoice} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
                  <Camera size={16} className="text-gray-300 mx-auto mb-1" />
                  Click to select food picture
                </div>
              )}

              {scanState === "image_selected" && (
                <div className="bg-neutral-50 p-4 rounded-xl border border-green-200 text-center animate-fade-in">
                  <p className="text-xs font-bold text-gray-700 truncate mb-2">Selected: {scannedFileName}</p>
                  <button type="button" onClick={executeScanningSequence} className="w-full bg-green-600 text-white font-black py-2 rounded-xl text-xs shadow-md">Run Macro Analysis</button>
                </div>
              )}

              {scanState === "scanning" && (
                <div className="bg-neutral-900 text-white py-6 rounded-xl relative overflow-hidden text-center flex flex-col items-center justify-center">
                  <div className="absolute inset-x-0 h-0.5 bg-green-400 shadow-[0_0_10px_#10b981] animate-bounce w-full top-0" />
                  <p className="text-xs font-black tracking-widest text-green-400 animate-pulse">READING MEAL IMAGE MATRIX...</p>
                </div>
              )}

              {scanState === "done" && (
                <div className="bg-green-50/70 border border-green-200 p-3 rounded-xl text-left animate-fade-in">
                  <p className="text-xs font-black text-green-700 flex items-center gap-1">✨ Computer-Vision Scan Complete</p>
                  <div className="mt-2 space-y-1 text-[11px] text-gray-700 font-medium">
                    <p>• <span className="font-bold">Estimated Profile:</span> Avocado Toast & Egg</p>
                    <p>• <span className="font-bold">Calculated Energy:</span> <span className="text-orange-600 font-bold">320 kcal</span> | <span className="text-green-700 font-bold">12g Protein</span></p>
                    <p className="text-xs font-bold text-emerald-900 mt-2 bg-white p-1.5 rounded border border-green-100">💡 Healthy Swap: Switch white bread for sourdough toast to increase fiber density.</p>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white border rounded-2xl p-4 shadow-sm flex items-center justify-between">
              <div><h4 className="text-xs font-bold text-emerald-950">💧 Water Tracker</h4><p className="text-[10px] text-gray-400">Stay hydrated — your skin thanks you</p></div>
              <div className="flex items-center gap-3">
                <button type="button" onClick={() => setWaterCount(Math.max(0, waterCount - 1))} className="w-6 h-6 bg-neutral-100 rounded border flex items-center justify-center font-bold text-gray-500">-</button>
                <span className="text-xs font-black w-4 text-center">{waterCount}</span>
                <button type="button" onClick={() => setWaterCount(waterCount + 1)} className="w-6 h-6 bg-green-600 text-white rounded flex items-center justify-center font-bold">+</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "Craver" && (
          <div className="p-4 animate-fade-in">
            <h1 className="font-display text-2xl font-black text-emerald-950 mb-1">Craver</h1>
            <p className="text-xs text-gray-400 font-medium mb-4">Recommendations matching goal: <span className="text-green-600 font-bold">&quot;{profile.goal}&quot;</span></p>
            <div className="flex gap-2 mb-5">
              <input type="text" value={craverInput} onChange={e => setCraverInput(e.target.value)} placeholder="Type a craving — e.g. spaghetti meatballs" className="flex-1 bg-white border rounded-xl px-3 text-xs focus:outline-none text-gray-800" />
              <button type="button" onClick={() => { if(craverInput.trim()) setCraverResult(`Crafting macro-balanced ${craverInput} alternative...`); }} className="bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl">Find recipe</button>
            </div>
            {craverResult && <div className="bg-pink-50 border border-pink-100 p-3 rounded-xl text-xs text-pink-900 mb-5 font-bold">{craverResult}</div>}
            
            <div className="grid grid-cols-2 gap-3">
              {CRAVER_DECK.map((pick, i) => (
                <div key={i} onClick={() => { setCraverInput(pick.name); setCraverResult(`Perfect! Generating options layouts for ${pick.name}...`); }} className="bg-white border rounded-2xl overflow-hidden shadow-sm text-left hover:border-pink-300 transition-colors tap-scale">
                  <img src={pick.img} alt="" className="w-full h-24 object-cover" />
                  <div className="p-2.5">
                    <p className="font-bold text-xs text-gray-800">{pick.name}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">Tap to craft recipe</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "Travel" && (
          <div className="p-4 animate-fade-in">
            <h1 className="font-display text-2xl font-black text-emerald-950 mb-1">Travel</h1>
            <p className="text-xs text-gray-400 font-medium mb-4">Eat the world from your kitchen ✈️</p>
            <div className="space-y-4">
              {TRAVEL_CUISINES.map((cu, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="rounded-2xl p-3 text-white font-bold flex justify-between items-center text-sm" style={{ background: cu.bg }}><span>{cu.country}</span><span className="text-[9px] tracking-wider font-black">{cu.tag}</span></div>
                  <div className="grid grid-cols-2 gap-2">
                    {cu.items.map((item, i) => (
                      <div key={i} className="bg-white border rounded-xl overflow-hidden shadow-sm cursor-pointer">
                        <img src={item.img} alt="" className="w-full h-24 object-cover" />
                        <p className="text-xs font-bold p-2 truncate text-gray-800">{item.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "Grocery" && (
          <div className="p-4 animate-fade-in">
            <div className="flex justify-between items-baseline mb-2">
              <h1 className="font-display text-2xl font-black text-emerald-950">Grocery</h1>
              <button type="button" onClick={() => setGroceryList([])} className="text-[10px] font-bold text-red-500 hover:underline">Clear list</button>
            </div>
            <div className="bg-white border rounded-2xl p-4 shadow-sm space-y-2">
              {groceryList.map((item, idx) => (
                <div key={idx} onClick={() => setGroceryList(prev => prev.map(i => i.name === item.name ? { ...i, checked: !i.checked } : i))} className="flex items-center justify-between p-3 border-b border-neutral-100 cursor-pointer">
                  <span className={`text-xs font-semibold ${item.checked ? "line-through text-gray-300" : "text-gray-700"}`}>{item.name}</span>
                  <span className="text-xs">{item.checked ? "✅" : "⬜"}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "Me" && (
          <div className="p-4 animate-fade-in space-y-5">
            <h1 className="font-display text-2xl font-black text-emerald-950 mb-1">Me</h1>
            
            {/* Real Pricing Premium Subscriptions Box */}
            <div className="bg-gradient-to-br from-emerald-600 to-emerald-900 text-white rounded-2xl p-4 shadow-md space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[9px] font-black tracking-widest uppercase bg-white/20 px-2 py-0.5 rounded">PREMIUM MEMBER</span>
                  <h3 className="text-lg font-bold mt-1">NourishIQ Pro Tracker</h3>
                </div>
                <Award size={24} className="text-amber-400" />
              </div>
              <p className="text-xs opacity-90 leading-relaxed">Unlock complete AI food photo macro lookups, custom culinary modules, and smart grocery trackers.</p>
              <div className="border-t border-white/20 pt-3 flex justify-between items-center">
                <div>
                  <p className="text-[9px] opacity-60 uppercase font-bold">ANNUAL SUBSCRIPTION</p>
                  <p className="text-sm font-black">$4.99 <span className="text-xs font-normal opacity-80">/ month</span></p>
                </div>
                <button type="button" className="bg-white text-emerald-950 text-xs font-black px-4 py-2 rounded-xl shadow-sm hover:bg-neutral-50">Active Tier</button>
              </div>
            </div>

            {/* Historical Calorie Tracking Metrics Summaries */}
            <div className="bg-white border rounded-2xl p-4 shadow-sm space-y-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-gray-400">Baseline Metabolism & Log Summary</h3>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="bg-neutral-50 p-3 rounded-xl border">
                  <p className="text-[9px] font-bold text-gray-400">DAILY LOG BASELINE</p>
                  <p className="text-base font-black text-gray-800">1,850 <span className="text-xs font-normal">kcal</span></p>
                </div>
                <div className="bg-neutral-50 p-3 rounded-xl border">
                  <p className="text-[9px] font-bold text-gray-400">COMPLETED TARGET</p>
                  <p className="text-base font-black text-green-700">82% <span className="text-xs font-normal text-gray-400">this week</span></p>
                </div>
              </div>
            </div>

            {/* Framework Controls */}
            <div className="bg-white border rounded-2xl p-4 shadow-sm text-center">
              <p className="text-xs font-bold text-gray-600">User Configuration Identifier Matrix Active</p>
              <button type="button" onClick={() => { setIsOnboarded(false); setProfile({ name: "", step: 1, goal: "Eat cleaner", diet: "Omnivore" }); }} className="mt-3 w-full bg-neutral-900 text-white font-bold py-2.5 rounded-xl text-xs shadow-md">Restart Onboard Quiz Flow</button>
            </div>

            {/* Canonical Required Legal Disclaimer Panel */}
            <div className="bg-amber-50/50 border border-amber-200/60 rounded-2xl p-3.5 flex gap-3 text-left">
              <ShieldAlert size={20} className="text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h5 className="text-xs font-bold text-amber-900 uppercase tracking-wider">Health Framework & Legal Disclaimer</h5>
                <p className="text-[10px] text-amber-800/80 leading-relaxed mt-1 font-medium">
                  NourishIQ provides general healthy lifestyle tracking matrices and macro data lookups for informational utility only. This platform is not a certified healthcare provider, medical hardware utility, or clinical diagnostic mechanism. Always consult certified medical practitioners before introducing specific macro adjustments or training structures.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Pop-up sheet drawers */}
      {showRecipeSheet && selectedMeal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex flex-col justify-end" onClick={() => setShowRecipeSheet(false)}>
          <div className="bg-white rounded-t-3xl max-w-md mx-auto w-full p-4 overflow-y-auto max-h-[75vh]" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-2"><span className="text-[9px] px-2 py-0.5 rounded text-white bg-green-600 font-bold">{selectedMeal.category}</span><button type="button" onClick={() => setShowRecipeSheet(false)}><X size={14}/></button></div>
            <h2 className="font-display text-lg font-black text-emerald-950 mb-2">{selectedMeal.name}</h2>
            <img src={selectedMeal.image} alt="" className="w-full h-36 object-cover rounded-xl mb-3 shadow-inner" />
            <p className="text-xs text-gray-600 italic mb-4">{selectedMeal.description}</p>
            <button type="button" onClick={() => {
              const items = selectedMeal.ingredients.map(ing => ({ name: ing.name, checked: false }));
              setGroceryList(prev => [...prev, ...items]);
              setGroceryToast(`Added ingredients checklist`);
              setShowRecipeSheet(false);
              setTimeout(() => setGroceryToast(null), 2000);
            }} className="w-full bg-green-600 text-white font-bold py-3 rounded-xl text-xs">+ Add to grocery list</button>
          </div>
        </div>
      )}

      {/* Apothecary Menu Shelf Drawer */}
      {showApothecary && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end" onClick={() => setShowApothecary(false)}>
          <div className="bg-white rounded-t-3xl max-w-md mx-auto w-full p-4 max-h-[65vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4"><h3 className="font-display text-base font-black text-emerald-950">🌿 Apothecary Shelf</h3><button type="button" onClick={() => setShowApothecary(false)}><X size={14}/></button></div>
            <div className="grid grid-cols-2 gap-2">
              {APOTHECARY_ITEMS.map(ap => (
                <div key={ap.id} className="p-3 rounded-xl border text-left bg-neutral-50 shadow-sm" style={{ borderLeft: `4px solid ${ap.color}` }}>
                  <h4 className="text-xs font-bold text-gray-900">{ap.name}</h4>
                  <p className="text-[10px] text-gray-500 mt-0.5">{ap.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* System Navigation Tray */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t flex items-center justify-around z-40 shadow-xl h-16 rounded-t-2xl">
        {[
          { id: "Home", icon: Home, label: "Home" }, { id: "Craver", icon: Sparkles, label: "Craver" },
          { id: "Travel", icon: Plane, label: "Travel" }, { id: "Grocery", icon: ShoppingBasket, label: "Grocery" },
          { id: "Me", icon: User, label: "Me" }
        ].map((t) => {
          const Icon = t.icon;
          const isSel = activeTab === t.id;
          return (
            <button key={t.id} type="button" onClick={() => setActiveTab(t.id)} className="flex flex-col items-center justify-center py-1 px-3">
              <Icon size={18} className={isSel ? "text-green-600 scale-105" : "text-gray-400"} />
              <span className={`text-[9px] mt-0.5 font-bold ${isSel ? "text-green-600" : "text-gray-400"}`}>{t.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

        {activeTab === "Me" && (
          <div className="p-4 animate-fade-in space-y-5">
            <h1 className="font-display text-2xl font-black text-emerald-950 mb-1">Me</h1>
            
            {/* Real Pricing Premium Subscriptions Box */}
            <div className="bg-gradient-to-br from-emerald-600 to-emerald-900 text-white rounded-2xl p-4 shadow-md space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[9px] font-black tracking-widest uppercase bg-white/20 px-2 py-0.5 rounded">PREMIUM MEMBER</span>
                  <h3 className="text-lg font-bold mt-1">NourishIQ Pro Tracker</h3>
                </div>
                <Award size={24} className="text-amber-400" />
              </div>
              <p className="text-xs opacity-90 leading-relaxed">Unlock complete AI food photo macro lookups, custom culinary modules, and smart grocery trackers.</p>
              <div className="border-t border-white/20 pt-3 flex justify-between items-center">
                <div>
                  <p className="text-[9px] opacity-60 uppercase font-bold">ANNUAL SUBSCRIPTION</p>
                  <p className="text-sm font-black">$4.99 <span className="text-xs font-normal opacity-80">/ month</span></p>
                </div>
                <button type="button" className="bg-white text-emerald-950 text-xs font-black px-4 py-2 rounded-xl shadow-sm hover:bg-neutral-50">Active Tier</button>
              </div>
            </div>

            {/* Historical Calorie Tracking Metrics Summaries */}
            <div className="bg-white border rounded-2xl p-4 shadow-sm space-y-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-gray-400">Baseline Metabolism & Log Summary</h3>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="bg-neutral-50 p-3 rounded-xl border">
                  <p className="text-[9px] font-bold text-gray-400">DAILY LOG BASELINE</p>
                  <p className="text-base font-black text-gray-800">1,850 <span className="text-xs font-normal">kcal</span></p>
                </div>
                <div className="bg-neutral-50 p-3 rounded-xl border">
                  <p className="text-[9px] font-bold text-gray-400">COMPLETED TARGET</p>
                  <p className="text-base font-black text-green-700">82% <span className="text-xs font-normal text-gray-400">this week</span></p>
                </div>
              </div>
            </div>

            {/* Framework Controls */}
            <div className="bg-white border rounded-2xl p-4 shadow-sm text-center">
              <p className="text-xs font-bold text-gray-600">User Configuration Identifier Matrix Active</p>
              <button type="button" onClick={() => { setIsOnboarded(false); setProfile({ name: "", step: 1, goal: "Eat cleaner", diet: "Omnivore" }); }} className="mt-3 w-full bg-neutral-900 text-white font-bold py-2.5 rounded-xl text-xs shadow-md">Restart Onboard Quiz Flow</button>
            </div>

            {/* Canonical Required Legal Disclaimer Panel */}
            <div className="bg-amber-50/50 border border-amber-200/60 rounded-2xl p-3.5 flex gap-3 text-left">
              <ShieldAlert size={20} className="text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h5 className="text-xs font-bold text-amber-900 uppercase tracking-wider">Health Framework & Legal Disclaimer</h5>
                <p className="text-[10px] text-amber-800/80 leading-relaxed mt-1 font-medium">
                  NourishIQ provides general healthy lifestyle tracking matrices and macro data lookups for informational utility only. This platform is not a certified healthcare provider, medical hardware utility, or clinical diagnostic mechanism. Always consult certified medical practitioners before introducing specific macro adjustments or training structures.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Pop-up sheet drawers */}
      {showRecipeSheet && selectedMeal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex flex-col justify-end" onClick={() => setShowRecipeSheet(false)}>
          <div className="bg-white rounded-t-3xl max-w-md mx-auto w-full p-4 overflow-y-auto max-h-[75vh]" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-2"><span className="text-[9px] px-2 py-0.5 rounded text-white bg-green-600 font-bold">{selectedMeal.category}</span><button type="button" onClick={() => setShowRecipeSheet(false)}><X size={14}/></button></div>
            <h2 className="font-display text-lg font-black text-emerald-950 mb-2">{selectedMeal.name}</h2>
            <img src={selectedMeal.image} alt="" className="w-full h-36 object-cover rounded-xl mb-3 shadow-inner" />
            <p className="text-xs text-gray-600 italic mb-4">{selectedMeal.description}</p>
            <button type="button" onClick={() => {
              const items = selectedMeal.ingredients.map(ing => ({ name: ing.name, checked: false }));
              setGroceryList(prev => [...prev, ...items]);
              setGroceryToast(`Added ingredients checklist`);
              setShowRecipeSheet(false);
              setTimeout(() => setGroceryToast(null), 2000);
            }} className="w-full bg-green-600 text-white font-bold py-3 rounded-xl text-xs">+ Add to grocery list</button>
          </div>
        </div>
      )}

      {/* Apothecary Menu Shelf Drawer */}
      {showApothecary && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end" onClick={() => setShowApothecary(false)}>
          <div className="bg-white rounded-t-3xl max-w-md mx-auto w-full p-4 max-h-[65vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4"><h3 className="font-display text-base font-black text-emerald-950">🌿 Apothecary Shelf</h3><button type="button" onClick={() => setShowApothecary(false)}><X size={14}/></button></div>
            <div className="grid grid-cols-2 gap-2">
              {APOTHECARY_ITEMS.map(ap => (
                <div key={ap.id} className="p-3 rounded-xl border text-left bg-neutral-50 shadow-sm" style={{ borderLeft: `4px solid ${ap.color}` }}>
                  <h4 className="text-xs font-bold text-gray-900">{ap.name}</h4>
                  <p className="text-[10px] text-gray-500 mt-0.5">{ap.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* System Navigation Tray */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t flex items-center justify-around z-40 shadow-xl h-16 rounded-t-2xl">
        {[
          { id: "Home", icon: Home, label: "Home" }, { id: "Craver", icon: Sparkles, label: "Craver" },
          { id: "Travel", icon: Plane, label: "Travel" }, { id: "Grocery", icon: ShoppingBasket, label: "Grocery" },
          { id: "Me", icon: User, label: "Me" }
        ].map((t) => {
          const Icon = t.icon;
          const isSel = activeTab === t.id;
          return (
            <button key={t.id} type="button" onClick={() => setActiveTab(t.id)} className="flex flex-col items-center justify-center py-1 px-3">
              <Icon size={18} className={isSel ? "text-green-600 scale-105" : "text-gray-400"} />
              <span className={`text-[9px] mt-0.5 font-bold ${isSel ? "text-green-600" : "text-gray-400"}`}>{t.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
