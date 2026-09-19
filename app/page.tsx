"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Bell, ChevronDown, ChevronLeft, ChevronRight, Volume2, Home, 
  Sparkles, Plane, ShoppingBasket, User, X, Plus, Minus, Camera, Award, ShieldAlert
} from "lucide-react";

interface Meal {
  id: string;
  name: string;
  category: "BREAKFAST" | "LUNCH" | "DINNER" | "SNACK";
  calories: number;
  protein: number;
  cookTime: string;
  description: string;
  ingredients: { name: string; amount: string }[];
}

// Larger candidate pool than we need — we only keep the ones TheMealDB
// actually has a real photo for. Nothing fake ever gets rendered.
const MEAL_CANDIDATES: Meal[] = [
  { id: "c1", name: "Shakshuka", category: "BREAKFAST", calories: 352, protein: 22, cookTime: "25 min", description: "Spiced tomato and pepper sauce with poached eggs and feta.", ingredients: [{ name: "Eggs", amount: "2 large" }, { name: "Feta", amount: "50 g" }] },
  { id: "c2", name: "Pancakes", category: "BREAKFAST", calories: 310, protein: 9, cookTime: "20 min", description: "Classic fluffy pancakes.", ingredients: [{ name: "Flour", amount: "1 cup" }, { name: "Milk", amount: "1 cup" }] },
  { id: "c3", name: "Chicken Curry", category: "LUNCH", calories: 480, protein: 34, cookTime: "35 min", description: "Slow-cooked chicken in a spiced curry sauce.", ingredients: [{ name: "Chicken", amount: "300 g" }, { name: "Curry paste", amount: "2 tbsp" }] },
  { id: "c4", name: "Spaghetti Bolognese", category: "LUNCH", calories: 520, protein: 28, cookTime: "40 min", description: "Rich meat sauce over pasta.", ingredients: [{ name: "Spaghetti", amount: "200 g" }, { name: "Ground beef", amount: "250 g" }] },
  { id: "c5", name: "Beef Stroganoff", category: "DINNER", calories: 540, protein: 30, cookTime: "35 min", description: "Beef in a creamy mushroom sauce.", ingredients: [{ name: "Beef strips", amount: "300 g" }, { name: "Mushrooms", amount: "200 g" }] },
  { id: "c6", name: "Teriyaki Chicken Casserole", category: "DINNER", calories: 460, protein: 32, cookTime: "40 min", description: "Chicken baked in a sweet-savory teriyaki glaze.", ingredients: [{ name: "Chicken thighs", amount: "300 g" }, { name: "Teriyaki sauce", amount: "3 tbsp" }] },
  { id: "c7", name: "Apple Frangipan Tart", category: "SNACK", calories: 290, protein: 6, cookTime: "45 min", description: "Almond frangipane tart topped with apple.", ingredients: [{ name: "Apples", amount: "2" }, { name: "Ground almonds", amount: "100 g" }] },
  { id: "c8", name: "Beef and Mustard Pie", category: "SNACK", calories: 410, protein: 20, cookTime: "50 min", description: "Rich beef filling in a flaky pastry crust.", ingredients: [{ name: "Beef chunks", amount: "300 g" }, { name: "Puff pastry", amount: "1 sheet" }] },
];

const TRAVEL_CANDIDATES = [
  { country: "Japan", tag: "JP", bg: "linear-gradient(135deg, #1e293b 0%, #3b82f6 100%)", dishes: ["Sushi", "Teriyaki Chicken Casserole", "Ramen"] },
  { country: "India", tag: "IN", bg: "linear-gradient(135deg, #db2777 0%, #f43f5e 100%)", dishes: ["Chicken Curry", "Vegetable Curry", "Naan"] },
  { country: "Italy", tag: "IT", bg: "linear-gradient(135deg, #059669 0%, #10b981 100%)", dishes: ["Spaghetti Bolognese", "Pizza", "Lasagne"] },
];

const CRAVER_CANDIDATES = ["Spaghetti Bolognese", "Sushi", "Tacos", "Ramen", "Pizza", "Pancakes", "Beef Stroganoff", "Apple Frangipan Tart"];

const APOTHECARY_ITEMS = [
  { id: "ap1", name: "Ginger Turmeric Health Shot", category: "TONIC", desc: "Immunity & inflammation", color: "#FFB020" },
  { id: "ap2", name: "Orange Skin Tea with Honey", category: "TEA", desc: "Glow & antioxidants", color: "#FF8C42" },
  { id: "ap3", name: "DIY Clove Skin Oil", category: "OIL", desc: "Spot treatment & calming", color: "#10B981" },
  { id: "ap4", name: "Honey Oat Calming Mask", category: "MASK", desc: "Soothing & hydration", color: "#EC4899" }
];

// --- TheMealDB (free, no signup, test key "1") ---

interface MealDbResult {
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  strCategory: string;
  strArea: string;
}

async function fetchDishImage(query: string): Promise<string | null> {
  try {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`);
    const data = await res.json();
    return data.meals?.[0]?.strMealThumb ?? null;
  } catch {
    return null;
  }
}

async function fetchRealRecipe(query: string): Promise<MealDbResult | null> {
  try {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`);
    const data = await res.json();
    return data.meals ? (data.meals[0] as MealDbResult) : null;
  } catch {
    return null;
  }
}

function DishImage({ url, className, emoji = "🍽️" }: { url: string | null | undefined; className: string; emoji?: string }) {
  if (url) return <img src={url} alt="" className={className} />;
  return <div className={`${className} bg-orange-100 flex items-center justify-center text-lg`}>{emoji}</div>;
}

// --- Free, keyless, in-browser food recognition via TensorFlow.js + MobileNet ---
// Loaded from CDN, runs entirely client-side. No API key, no signup, no backend.

function loadScriptOnce(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[data-src="${src}"]`)) return resolve();
    const script = document.createElement("script");
    script.src = src;
    script.dataset.src = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load " + src));
    document.body.appendChild(script);
  });
}

const FOOD_KEYWORD_ESTIMATES: Record<string, { kcal: number; protein: number; swap: string }> = {
  pizza: { kcal: 285, protein: 12, swap: "Choose thin crust and load up on vegetable toppings." },
  cheeseburger: { kcal: 540, protein: 25, swap: "Swap the bun for lettuce wrap to cut ~150 kcal." },
  hotdog: { kcal: 290, protein: 10, swap: "Try a chicken or turkey sausage version." },
  "ice cream": { kcal: 210, protein: 4, swap: "Frozen yogurt cuts calories while keeping the creaminess." },
  guacamole: { kcal: 150, protein: 2, swap: "Great as-is — pair with veggie sticks instead of chips." },
  pretzel: { kcal: 340, protein: 8, swap: "Go for a whole-grain pretzel for more fiber." },
  bagel: { kcal: 245, protein: 10, swap: "Use avocado instead of cream cheese for healthier fats." },
  meatloaf: { kcal: 320, protein: 24, swap: "Use lean turkey mince to lower saturated fat." },
  burrito: { kcal: 450, protein: 20, swap: "Ask for brown rice and extra veggies, less cheese." },
  espresso: { kcal: 5, protein: 0, swap: "Already a light choice — skip the added sugar." },
  trifle: { kcal: 380, protein: 5, swap: "Use Greek yogurt layers instead of custard." },
  waffle: { kcal: 290, protein: 7, swap: "Top with fruit instead of syrup." },
  banana: { kcal: 105, protein: 1, swap: "A great low-effort snack as-is." },
  orange: { kcal: 62, protein: 1, swap: "Whole fruit beats juice for fiber." },
  strawberry: { kcal: 32, protein: 1, swap: "Pair with Greek yogurt for a protein boost." },
  pineapple: { kcal: 82, protein: 1, swap: "Naturally sweet — good as a dessert swap." },
  salad: { kcal: 180, protein: 6, swap: "Go easy on creamy dressings." },
  sushi: { kcal: 350, protein: 18, swap: "Choose sashimi over tempura rolls to cut fat." },
  pasta: { kcal: 480, protein: 16, swap: "Whole wheat pasta adds fiber for the same calories." },
};

function estimateFromLabel(label: string) {
  const lower = label.toLowerCase();
  for (const key of Object.keys(FOOD_KEYWORD_ESTIMATES)) {
    if (lower.includes(key)) return { label, ...FOOD_KEYWORD_ESTIMATES[key] };
  }
  return { label, kcal: 300, protein: 10, swap: "General estimate — recognized food type not in our lookup table yet." };
}

export default function NourishIQApp() {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [showRecipeSheet, setShowRecipeSheet] = useState(false);
  const [showApothecary, setShowApothecary] = useState(false);
  const [waterCount, setWaterCount] = useState(0);
  const [groceryToast, setGroceryToast] = useState<string | null>(null);

  const [scanState, setScanState] = useState<"idle" | "image_selected" | "scanning" | "done" | "error">("idle");
  const [scannedFileName, setScannedFileName] = useState("");
  const [scanResult, setScanResult] = useState<{ label: string; kcal: number; protein: number; swap: string } | null>(null);
  const imgPreviewRef = useRef<HTMLImageElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const modelRef = useRef<any>(null);

  const [craverInput, setCraverInput] = useState("");
  const [craverResult, setCraverResult] = useState<MealDbResult | null>(null);
  const [craverLoading, setCraverLoading] = useState(false);
  const [craverNotFound, setCraverNotFound] = useState(false);

  const [groceryList, setGroceryList] = useState<{ name: string; checked: boolean }[]>([
    { name: "Chicken breast", checked: false }, { name: "Lemon juice", checked: false }
  ]);

  const [profile, setProfile] = useState({ name: "", step: 1, goal: "Eat cleaner", diet: "Omnivore" });

  const [meals, setMeals] = useState<Meal[]>([]);
  const [travelData, setTravelData] = useState<{ country: string; tag: string; bg: string; items: { name: string; img: string }[] }[]>([]);
  const [craverDeck, setCraverDeck] = useState<{ name: string; img: string }[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  // Resolve all dish data against real photos on load. Anything without
  // a real photo is dropped entirely — never shown as a placeholder tile.
  useEffect(() => {
    (async () => {
      const mealResults = await Promise.all(
        MEAL_CANDIDATES.map(async (m) => ({ meal: m, img: await fetchDishImage(m.name) }))
      );
      const realMeals = mealResults.filter(r => r.img).slice(0, 4);
      setMeals(realMeals.map(r => ({ ...r.meal, imgUrl: r.img } as any)));

      const travelResults = await Promise.all(
        TRAVEL_CANDIDATES.map(async (country) => {
          const dishResults = await Promise.all(
            country.dishes.map(async (name) => ({ name, img: await fetchDishImage(name) }))
          );
          const realDishes = dishResults.filter(d => d.img).slice(0, 2) as { name: string; img: string }[];
          return { country: country.country, tag: country.tag, bg: country.bg, items: realDishes };
        })
      );
      setTravelData(travelResults.filter(c => c.items.length > 0));

      const craverResults = await Promise.all(
        CRAVER_CANDIDATES.map(async (name) => ({ name, img: await fetchDishImage(name) }))
      );
      setCraverDeck(craverResults.filter(c => c.img).slice(0, 6) as { name: string; img: string }[]);

      setDataLoading(false);
    })();
  }, []);

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 0.95;
      window.speechSynthesis.speak(u);
    }
  };

  const handleImageChoice = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setScannedFileName(file.name);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setScanState("image_selected");
    }
  };

  const runRealScan = async () => {
    setScanState("scanning");
    try {
      if (!modelRef.current) {
        await loadScriptOnce("https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.20.0/dist/tf.min.js");
        await loadScriptOnce("https://cdn.jsdelivr.net/npm/@tensorflow-models/mobilenet@2.1.1/dist/mobilenet.min.js");
        modelRef.current = await (window as any).mobilenet.load();
      }
      // wait a tick for the preview <img> to actually render before classifying it
      await new Promise(r => setTimeout(r, 300));
      if (!imgPreviewRef.current) throw new Error("no image element");
      const predictions = await modelRef.current.classify(imgPreviewRef.current);
      const topLabel = predictions?.[0]?.className?.split(",")[0] || "unrecognized food";
      setScanResult(estimateFromLabel(topLabel));
      setScanState("done");
    } catch (err) {
      setScanState("error");
    }
  };

  const handleCraverSearch = async () => {
    if (!craverInput.trim()) return;
    setCraverLoading(true);
    setCraverNotFound(false);
    setCraverResult(null);
    const result = await fetchRealRecipe(craverInput);
    setCraverLoading(false);
    if (result) setCraverResult(result); else setCraverNotFound(true);
  };

  // --- Onboarding: redesigned to match reference mockups ---
  if (!isOnboarded) {
    const handleNext = () => {
      if (profile.step === 10) setIsOnboarded(true);
      else setProfile(p => ({ ...p, step: p.step + 1 }));
    };

    const STEP_ICONS = [
      { emoji: "🥗", label: "Meal Plans", color: "#DCFCE7" },
      { emoji: "📷", label: "Plate Scans", color: "#FEE2E2" },
      { emoji: "🌍", label: "Travel Cuisine", color: "#FEF3C7" },
      { emoji: "🍩", label: "Cravings", color: "#EDE9FE" },
      { emoji: "🌿", label: "Apothecary", color: "#D1FAE5" },
    ];

    return (
      <div className="min-h-screen max-w-md mx-auto flex flex-col justify-between px-6 py-8 bg-[#FCFBF7] relative overflow-hidden shadow-2xl">
        <div className="absolute top-6 left-4 text-2xl opacity-40 select-none">🍃</div>
        <div className="absolute top-24 right-6 text-xl opacity-30 select-none">💚</div>
        <div className="absolute bottom-32 left-6 text-xl opacity-30 select-none">✨</div>
        <div className="absolute bottom-10 right-10 text-2xl opacity-30 select-none">🍃</div>

        <div className="w-full relative z-10">
          <div className="flex justify-between items-center mb-1">
            <p className="text-[10px] font-black text-emerald-800 tracking-widest">{profile.step} / 10</p>
          </div>
          <div className="w-full h-1.5 bg-emerald-100 rounded-full overflow-hidden">
            <div className="h-full bg-green-600 transition-all duration-300 rounded-full" style={{ width: `${profile.step * 10}%` }} />
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center my-6 text-center relative z-10">
          <h2 className="font-display text-3xl font-black text-emerald-600 mb-1">NourishIQ</h2>

          {profile.step === 1 && (
            <div className="space-y-5">
              <div className="text-6xl">🥗</div>
              <h3 className="text-xl font-black text-gray-800">Your personal food companion</h3>
              <p className="text-xs text-gray-500 max-w-xs mx-auto leading-relaxed">
                Get personalised meal plans, plate scans, travel cuisine, cravings and DIY apothecary — all in one place.
              </p>
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                {STEP_ICONS.map((s) => (
                  <div key={s.label} className="flex flex-col items-center gap-1 w-16">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg" style={{ background: s.color }}>{s.emoji}</div>
                    <span className="text-[8px] font-bold text-gray-500 text-center leading-tight">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {profile.step === 2 && (
            <div className="space-y-5">
              <div className="text-6xl">👋</div>
              <h3 className="text-xl font-black text-gray-800">What should we call you?</h3>
              <input type="text" value={profile.name} onChange={e => setProfile(p => ({ ...p, name: e.target.value }))} placeholder="Your name" className="w-full max-w-xs mx-auto border-none bg-white rounded-full px-5 py-3.5 text-sm text-center font-bold shadow-sm" />
            </div>
          )}

          {profile.step === 3 && (
            <div className="space-y-3 max-w-xs mx-auto w-full">
              <div className="text-5xl mb-1">🥗</div>
              <h3 className="text-lg font-black text-gray-800 mb-2">How do you identify?</h3>
              {["Male", "Female", "Non-binary", "Prefer not to say"].map((g) => (
                <button key={g} type="button" onClick={handleNext} className="w-full bg-white p-3.5 rounded-2xl font-bold text-xs text-gray-700 shadow-sm hover:shadow-md transition-shadow mb-1.5 text-left px-5">{g}</button>
              ))}
            </div>
          )}

          {profile.step === 4 && (
            <div className="space-y-3 max-w-xs mx-auto w-full">
              <div className="text-5xl mb-1">🎯</div>
              <h3 className="text-lg font-black text-gray-800 mb-2">What&apos;s your health goal?</h3>
              {["Lose fat", "Build muscle", "Eat cleaner", "Boost energy"].map((g) => (
                <button key={g} type="button" onClick={() => { setProfile(p => ({ ...p, goal: g })); handleNext(); }} className={`w-full p-3.5 rounded-2xl font-bold text-xs text-left px-5 shadow-sm ${profile.goal === g ? "bg-green-100 text-green-700" : "bg-white text-gray-700"}`}>{g}</button>
              ))}
            </div>
          )}

          {profile.step === 5 && (
            <div className="space-y-3 max-w-xs mx-auto w-full">
              <div className="text-5xl mb-1">🥦</div>
              <h3 className="text-lg font-black text-gray-800 mb-2">Dietary path?</h3>
              {["Omnivore", "Vegetarian", "Vegan", "Pescatarian"].map((d) => (
                <button key={d} type="button" onClick={handleNext} className="w-full bg-white p-3.5 rounded-2xl font-bold text-xs text-gray-700 shadow-sm mb-1.5 text-left px-5">{d}</button>
              ))}
            </div>
          )}

          {profile.step === 6 && (
            <div className="space-y-3 max-w-xs mx-auto w-full">
              <div className="text-5xl mb-1">⚠️</div>
              <h3 className="text-lg font-black text-gray-800 mb-2">Food allergies?</h3>
              {["Gluten Free", "Nut Free", "Dairy Free", "None"].map((a) => (
                <button key={a} type="button" onClick={handleNext} className="w-full bg-white p-3.5 rounded-2xl font-bold text-xs text-gray-700 shadow-sm mb-1.5 text-left px-5">{a}</button>
              ))}
            </div>
          )}

          {profile.step === 7 && (
            <div className="space-y-3 max-w-xs mx-auto w-full">
              <div className="text-5xl mb-1">🌶️</div>
              <h3 className="text-lg font-black text-gray-800 mb-2">Spice tolerance?</h3>
              {["Mild", "Medium", "Extra Hot"].map((s) => (
                <button key={s} type="button" onClick={handleNext} className="w-full bg-white p-3.5 rounded-2xl font-bold text-xs text-gray-700 shadow-sm mb-1.5 text-left px-5">{s}</button>
              ))}
            </div>
          )}

          {profile.step === 8 && (
            <div className="space-y-3 max-w-xs mx-auto w-full">
              <div className="text-5xl mb-1">⏱️</div>
              <h3 className="text-lg font-black text-gray-800 mb-2">Cooking duration?</h3>
              {["Less than 15m", "30 minutes", "Under an hour"].map((t) => (
                <button key={t} type="button" onClick={handleNext} className="w-full bg-white p-3.5 rounded-2xl font-bold text-xs text-gray-700 shadow-sm mb-1.5 text-left px-5">{t}</button>
              ))}
            </div>
          )}

          {profile.step === 9 && (
            <div className="space-y-3 max-w-xs mx-auto w-full">
              <div className="text-5xl mb-1">💧</div>
              <h3 className="text-lg font-black text-gray-800 mb-2">Hydration target?</h3>
              {["1-2 Litres", "3 Litres+", "Not tracking"].map((w) => (
                <button key={w} type="button" onClick={handleNext} className="w-full bg-white p-3.5 rounded-2xl font-bold text-xs text-gray-700 shadow-sm mb-1.5 text-left px-5">{w}</button>
              ))}
            </div>
          )}

          {profile.step === 10 && (
            <div className="space-y-4">
              <div className="text-5xl mb-1">🍳</div>
              <h3 className="text-lg font-black text-gray-800">Cooking hardware?</h3>
              <div className="flex flex-wrap gap-2 justify-center max-w-xs mx-auto">
                {["Stovetop", "Oven", "Air fryer", "Blender"].map(ap => (
                  <span key={ap} onClick={handleNext} className="bg-white text-green-800 px-4 py-2 rounded-full text-xs font-bold shadow-sm cursor-pointer">{ap}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        <button type="button" onClick={handleNext} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-full text-sm shadow-lg flex items-center justify-center gap-2 relative z-10">
          {profile.step === 10 ? "Finish Setup" : "Continue"} <ChevronRight size={16} />
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
              {dataLoading && <p className="text-xs text-gray-400 text-center py-4">Loading real meal photos…</p>}
              {meals.map((meal: any) => (
                <div key={meal.id} onClick={() => { setSelectedMeal(meal); setShowRecipeSheet(true); }} className="bg-white rounded-2xl border flex items-center p-2.5 gap-3 cursor-pointer group hover:border-green-200 transition-all">
                  <div className="w-14 h-10 rounded-xl bg-green-600 text-white font-black text-[9px] flex items-center justify-center px-1 text-center">{meal.category}</div>
                  <DishImage url={meal.imgUrl} className="w-12 h-12 rounded-xl object-cover shadow-inner" />
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
              <div onClick={() => setActiveTab("Travel")} className="p-4 rounded-2xl text-white bg-gradient-to-br from-sky-400 to-blue-500 cursor-pointer shadow-md"><p className="font-bold text-sm">Travel cuisine</p></div>
              <div className="p-4 rounded-2xl text-white bg-gradient-to-br from-amber-400 to-orange-500 shadow-md"><p className="font-bold text-sm">Weekly goal</p></div>
              <div onClick={() => setShowApothecary(true)} className="p-4 rounded-2xl text-white bg-gradient-to-br from-emerald-500 to-teal-600 cursor-pointer shadow-md"><p className="font-bold text-sm">Apothecary</p></div>
              <div onClick={() => setActiveTab("Craver")} className="p-4 rounded-2xl text-white bg-gradient-to-br from-pink-500 to-rose-500 cursor-pointer shadow-md"><p className="font-bold text-sm">Craver</p></div>
            </div>

            <div className="bg-white border border-neutral-100 rounded-2xl p-4 shadow-sm mb-5 relative overflow-hidden">
              <div className="flex justify-between items-center mb-1">
                <h4 className="text-xs font-bold text-emerald-950 flex items-center gap-1">📸 Plate Scanner</h4>
                {(scanState === "done" || scanState === "error") && (
                  <button type="button" onClick={() => { setScanState("idle"); setScannedFileName(""); setScanResult(null); setPreviewUrl(null); }} className="text-[10px] bg-red-500 text-white font-black px-2.5 py-1 rounded-full shadow-sm">Reset</button>
                )}
              </div>
              <p className="text-[11px] text-gray-400 mb-1">Snap your plate → calories, protein & healthier swap.</p>
              <p className="text-[10px] text-emerald-600 mb-3 italic">Real AI classification — runs in your browser via TensorFlow.js (MobileNet), free and keyless. Calorie/protein values are approximate estimates per recognized food type, not a lab-grade nutrition analysis.</p>

              {previewUrl && (
                <img ref={imgPreviewRef} src={previewUrl} alt="uploaded" crossOrigin="anonymous" className="hidden" />
              )}

              {scanState === "idle" && (
                <div className="bg-neutral-50 py-6 rounded-xl border border-dashed border-gray-200 text-center text-gray-400 text-xs font-bold relative hover:bg-neutral-100 transition-all">
                  <input type="file" accept="image/*" onChange={handleImageChoice} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
                  <Camera size={16} className="text-gray-300 mx-auto mb-1" />
                  Click to select food picture
                </div>
              )}

              {scanState === "image_selected" && (
                <div className="bg-neutral-50 p-4 rounded-xl border border-green-200 text-center animate-fade-in">
                  {previewUrl && <img src={previewUrl} alt="" className="w-full h-32 object-cover rounded-lg mb-3" />}
                  <p className="text-xs font-bold text-gray-700 truncate mb-2">Selected: {scannedFileName}</p>
                  <button type="button" onClick={runRealScan} className="w-full bg-green-600 text-white font-black py-2 rounded-xl text-xs shadow-md">Run Macro Analysis</button>
                </div>
              )}

              {scanState === "scanning" && (
                <div className="bg-neutral-900 text-white py-6 rounded-xl relative overflow-hidden text-center flex flex-col items-center justify-center">
                  <div className="absolute inset-x-0 h-0.5 bg-green-400 shadow-[0_0_10px_#10b981] animate-bounce w-full top-0" />
                  <p className="text-xs font-black tracking-widest text-green-400 animate-pulse">RUNNING MOBILENET CLASSIFIER...</p>
                </div>
              )}

              {scanState === "done" && scanResult && (
                <div className="bg-green-50/70 border border-green-200 p-3 rounded-xl text-left animate-fade-in">
                  <p className="text-xs font-black text-green-700 flex items-center gap-1">✨ Detected: {scanResult.label}</p>
                  <div className="mt-2 space-y-1 text-[11px] text-gray-700 font-medium">
                    <p>• <span className="font-bold">Estimated Energy:</span> <span className="text-orange-600 font-bold">{scanResult.kcal} kcal</span> | <span className="text-green-700 font-bold">{scanResult.protein}g Protein</span></p>
                    <p className="text-xs font-bold text-emerald-900 mt-2 bg-white p-1.5 rounded border border-green-100">💡 {scanResult.swap}</p>
                  </div>
                </div>
              )}

              {scanState === "error" && (
                <div className="bg-red-50 border border-red-200 p-3 rounded-xl text-xs text-red-700">
                  Couldn't classify this image — try a clearer, well-lit photo of the food.
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
            <p className="text-xs text-gray-400 font-medium mb-4">Search any dish for a real recipe.</p>
            <div className="flex gap-2 mb-5">
              <input type="text" value={craverInput} onChange={e => setCraverInput(e.target.value)} placeholder="Type a craving — e.g. chicken curry" className="flex-1 bg-white border rounded-xl px-3 text-xs focus:outline-none text-gray-800" />
              <button type="button" onClick={handleCraverSearch} className="bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl">{craverLoading ? "..." : "Find recipe"}</button>
            </div>

            {craverNotFound && <div className="bg-neutral-100 border p-3 rounded-xl text-xs text-gray-600 mb-5">No recipe found for "{craverInput}" — try a more common dish name.</div>}

            {craverResult && (
              <div className="bg-white border rounded-2xl overflow-hidden shadow-sm mb-5">
                <img src={craverResult.strMealThumb} alt={craverResult.strMeal} className="w-full h-40 object-cover" />
                <div className="p-3">
                  <p className="font-bold text-sm text-gray-900">{craverResult.strMeal}</p>
                  <p className="text-[10px] text-gray-400 mb-2">{craverResult.strArea} · {craverResult.strCategory}</p>
                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-4">{craverResult.strInstructions}</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              {craverDeck.map((pick, i) => (
                <div key={i} onClick={() => { setCraverInput(pick.name); handleCraverSearch(); }} className="bg-white border rounded-2xl overflow-hidden shadow-sm text-left hover:border-pink-300 transition-colors cursor-pointer">
                  <img src={pick.img} alt="" className="w-full h-24 object-cover" />
                  <div className="p-2.5">
                    <p className="font-bold text-xs text-gray-800">{pick.name}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">Tap to see recipe</p>
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
              {travelData.map((cu, idx) => (
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
            <div className="bg-gradient-to-br from-emerald-600 to-emerald-900 text-white rounded-2xl p-4 shadow-md space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[9px] font-black tracking-widest uppercase bg-white/20 px-2 py-0.5 rounded">PREMIUM MEMBER</span>
                  <h3 className="text-lg font-bold mt-1">NourishIQ Pro Tracker</h3>
                </div>
              </div>
              <p className="text-xs opacity-90 leading-relaxed">Unlock complete AI food photo macro lookups, custom culinary modules, and smart grocery trackers.</p>
              <div className="border-t border-white/20 pt-3 flex justify-between items-center">
                <div>
                  <p className="text-[9px] opacity-60 uppercase font-bold">ANNUAL SUBSCRIPTION</p>
                  <p className="text-sm font-black">$4.99 <span className="text-xs font-normal opacity-80">/ month</span></p>
                </div>
                <button type="button" className="bg-white text-emerald-950 text-xs font-black px-4 py-2 rounded-xl shadow-sm">Active Tier</button>
              </div>
            </div>

            <div className="bg-white border rounded-2xl p-4 shadow-sm space-y-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-gray-400">Baseline Metabolism & Log Summary</h3>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="bg-neutral-50 p-3 rounded-xl border">
                  <p className="text-[9px] font-bold text-gray-400">DAILY LOG BASELINE</p>
                  <p className="text-base font-black text-gray-800">1,850 <span className="text-xs font-normal">kcal</span></p>
                </div>
                <div className="bg-neutral-50 p-3 rounded-xl border">
                  <p className="text-[9px] font-bold text-gray-400">COMPLETED TARGET</p>
                  <p className="text-base font-black text-green-700">82%</p>
                </div>
              </div>
            </div>

            <div className="bg-white border rounded-2xl p-4 shadow-sm text-center">
              <p className="text-xs font-bold text-gray-600">User Configuration Identifier Matrix Active</p>
              <button type="button" onClick={() => { setIsOnboarded(false); setProfile({ name: "", step: 1, goal: "Eat cleaner", diet: "Omnivore" }); }} className="mt-3 w-full bg-neutral-900 text-white font-bold py-2.5 rounded-xl text-xs shadow-md">Restart Quiz Flow</button>
            </div>

            <div className="bg-amber-50/50 border border-amber-200/60 rounded-2xl p-3.5 flex gap-3 text-left">
              <ShieldAlert size={20} className="text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h5 className="text-xs font-bold text-amber-900 uppercase tracking-wider">Health Framework & Legal Disclaimer</h5>
                <p className="text-[10px] text-amber-800/80 leading-relaxed mt-1 font-medium">
                  NourishIQ provides general healthy lifestyle tracking and macro data lookups for informational utility only. This platform is not a certified healthcare provider or clinical diagnostic mechanism.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {showRecipeSheet && selectedMeal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex flex-col justify-end" onClick={() => setShowRecipeSheet(false)}>
          <div className="bg-white rounded-t-3xl max-w-md mx-auto w-full p-4 overflow-y-auto max-h-[75vh]" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-2"><span className="text-[9px] px-2 py-0.5 rounded text-white bg-green-600 font-bold">{selectedMeal.category}</span><button type="button" onClick={() => setShowRecipeSheet(false)}><X size={14}/></button></div>
            <h2 className="font-display text-lg font-black text-emerald-950 mb-2">{selectedMeal.name}</h2>
            <DishImage url={(selectedMeal as any).imgUrl} className="w-full h-36 object-cover rounded-xl mb-3 shadow-inner" />
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
