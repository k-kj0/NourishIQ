"use client";

import { useState } from "react";
import { useApp, UserProfile } from "../AppContext";
import { ChevronRight, ChevronLeft, User, Check } from "lucide-react";

const TOTAL_STEPS = 15;

const GENDER_OPTIONS = [
  { id: "male", label: "Male", emoji: "👨" },
  { id: "female", label: "Female", emoji: "👩" },
  { id: "nonbinary", label: "Non-binary", emoji: "🧑" },
  { id: "other", label: "Other", emoji: "🌈" },
  { id: "prefer-not", label: "Prefer not to say", emoji: "🤫" },
];

const DIET_OPTIONS = [
  { id: "vegan", label: "Vegan", emoji: "🌱" },
  { id: "vegetarian", label: "Vegetarian", emoji: "🥬" },
  { id: "veg-eggs", label: "Vegetarian + Eggs", emoji: "🥚" },
  { id: "non-veg", label: "Non-vegetarian", emoji: "🍗" },
  { id: "no-beef", label: "No Beef", emoji: "🐄" },
  { id: "no-pork", label: "No Pork", emoji: "🐷" },
  { id: "no-dairy", label: "No Dairy", emoji: "🥛" },
  { id: "pescatarian", label: "Pescatarian", emoji: "🐟" },
];

const HEALTH_CONDITIONS = ["None", "Diabetes", "High blood pressure", "PCOS/PCOD", "Thyroid condition", "Other"];

const COOKING_TIMES = [
  { id: "under-15", label: "Under 15 mins", sub: "Quick & easy", emoji: "⚡" },
  { id: "15-30", label: "15–30 mins", sub: "Standard cooking", emoji: "🕐" },
  { id: "30-60", label: "30–60 mins", sub: "Weekend cooking", emoji: "👨‍🍳" },
  { id: "1-2hr", label: "1–2 hours", sub: "Special occasions", emoji: "🕐" },
  { id: "meal-prep", label: "I meal prep once a week", sub: "Batch cooking", emoji: "📦" },
];

const KITCHEN_OPTIONS = [
  { id: "none", label: "No special appliances", sub: "I keep it simple", emoji: "⊞" },
  { id: "microwave", label: "Microwave", sub: "Quick & easy cooking", emoji: "📱" },
  { id: "air-fryer", label: "Air Fryer", sub: "Crispy with less oil", emoji: "🫙" },
  { id: "oven", label: "Oven", sub: "Baking & roasting", emoji: "🟡" },
  { id: "toaster", label: "Toaster", sub: "For quick bites", emoji: "🍞" },
  { id: "instant-pot", label: "Instant Pot", sub: "One-pot wonders", emoji: "🫕" },
  { id: "slow-cooker", label: "Slow Cooker", sub: "Set it & forget it", emoji: "🍲" },
  { id: "blender", label: "Blender", sub: "Smoothies & more", emoji: "🔮" },
  { id: "food-processor", label: "Food Processor", sub: "Chop, slice, shred with ease", emoji: "⚙️" },
];

const FOOD_CATEGORIES: { category: string; emoji: string; items: string[] }[] = [
  { category: "Meats", emoji: "🥩", items: ["Chicken", "Pork", "Beef", "Mutton", "Lamb"] },
  { category: "Seafood", emoji: "🐟", items: ["Salmon", "Tuna", "Prawns", "Shrimp", "Crab"] },
  { category: "Dairy", emoji: "🧀", items: ["Cheddar", "Parmesan", "Mozzarella", "Greek Yogurt", "Butter"] },
  { category: "Vegan Dairy", emoji: "🌿", items: ["Almond Milk", "Oat Milk", "Soy Milk", "Tofu"] },
  { category: "Vegetables", emoji: "🥦", items: ["Spinach", "Broccoli", "Carrots", "Tomatoes", "Bell Peppers"] },
  { category: "Grains", emoji: "🌾", items: ["Rice", "Quinoa", "Oats", "Whole Wheat", "Barley"] },
];

const STEP_LABELS: Record<number, string> = {
  1: "What should we call you?",
  2: "How old are you?",
  3: "How do you identify?",
  4: "What's your current weight?",
  5: "What's your diet?",
  6: "Any food allergies?",
  7: "Any health conditions?",
  8: "What's your goal?",
  9: "Foods you love",
  10: "Foods you dislike?",
  11: "How much time?",
  12: "Budget per meal?",
  13: "Your kitchen setup",
  14: "Meal plan days?",
  15: "Almost done! 🎉",
};

export function OnboardingQuiz() {
  const { setPhase, setProfile } = useApp();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [diet, setDiet] = useState<string[]>([]);
  const [conditions, setConditions] = useState<string[]>([]);
  const [cookTime, setCookTime] = useState("");
  const [kitchen, setKitchen] = useState<string[]>([]);
  const [lovedFoods, setLovedFoods] = useState<string[]>([]);
  const [planDays, setPlanDays] = useState(5);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(FOOD_CATEGORIES.map((c) => c.category))
  );

  const progress = (step / TOTAL_STEPS) * 100;

  const toggleArr = <T,>(arr: T[], item: T, setter: (v: T[]) => void) => {
    setter(arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item]);
  };

  const toggleCategory = (cat: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      next.has(cat) ? next.delete(cat) : next.add(cat);
      return next;
    });
  };

  const canContinue = () => {
    if (step === 1) return name.trim().length > 0;
    if (step === 3) return gender !== "";
    if (step === 5) return diet.length > 0;
    return true;
  };

  const handleContinue = () => {
    // Persist name to context as soon as step 1 is completed
    if (step === 1) {
      setProfile({
        name: name.trim(),
        gender: "",
        diet: [],
        healthConditions: [],
        cookingTime: "",
        kitchenSetup: [],
        lovedFoods: [],
      });
    }

    if (step < TOTAL_STEPS) {
      setStep(step + 1);
    } else {
      setProfile({
        name: name.trim(),
        gender,
        diet,
        healthConditions: conditions,
        cookingTime: cookTime,
        kitchenSetup: kitchen,
        lovedFoods,
      });
      setPhase("dashboard");
    }
  };

  const renderStep = () => {
    // Step 1: Name
    if (step === 1) {
      return (
        <div className="flex-1 flex flex-col items-center px-6 pt-4">
          <div className="text-center mb-8">
            <NourishLogo />
            <h1 className="text-3xl font-bold text-gray-900 mt-6 mb-2">
              What should we call <span className="text-orange-400">you?</span>
            </h1>
            <p className="text-gray-500 text-sm">We want to make this personal ✨</p>
          </div>
          <div className="w-full bg-white rounded-2xl flex items-center gap-3 px-4 py-4 shadow-sm border border-gray-100">
            <User size={20} className="text-green-500" />
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 outline-none text-base text-gray-800 placeholder-gray-400 bg-transparent"
            />
          </div>
        </div>
      );
    }

    // Step 3: Gender
    if (step === 3) {
      return (
        <div className="flex-1 px-5 pt-4">
          <div className="text-center mb-6">
            <NourishLogo />
            <h2 className="text-2xl font-bold text-gray-900 mt-4 mb-1">How do you identify?</h2>
            <p className="text-green-600 text-sm">Used for personalized meal planning only 🍃</p>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-3">
            {GENDER_OPTIONS.filter((g) => g.id !== "prefer-not").map((opt) => (
              <button
                key={opt.id}
                onClick={() => setGender(opt.id)}
                className={`relative flex flex-col items-center justify-center py-5 rounded-2xl border-2 transition-all ${
                  gender === opt.id ? "bg-green-50 border-green-400" : "bg-white border-gray-100"
                }`}
              >
                {gender === opt.id && (
                  <span className="absolute top-2 right-2 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <Check size={12} color="white" />
                  </span>
                )}
                <span className="text-3xl mb-2">{opt.emoji}</span>
                <span className="text-sm font-semibold text-gray-800">{opt.label}</span>
              </button>
            ))}
          </div>
          <button
            onClick={() => setGender("prefer-not")}
            className={`w-full flex flex-col items-center py-4 rounded-2xl border-2 transition-all ${
              gender === "prefer-not" ? "bg-green-50 border-green-400" : "bg-white border-gray-100"
            }`}
          >
            <span className="text-2xl mb-1">🤫</span>
            <span className="text-sm font-semibold text-gray-800">Prefer not to say</span>
          </button>
        </div>
      );
    }

    // Step 5: Diet
    if (step === 5) {
      return (
        <div className="flex-1 px-5 pt-4">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">What&apos;s your diet?</h2>
            <p className="text-gray-500 text-sm">Select all that apply — no judgment here!</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {DIET_OPTIONS.map((opt) => {
              const sel = diet.includes(opt.id);
              return (
                <button
                  key={opt.id}
                  onClick={() => toggleArr(diet, opt.id, setDiet)}
                  className={`relative flex items-center gap-3 p-4 rounded-2xl border-2 transition-all text-left ${
                    sel ? "bg-green-50 border-green-400" : "bg-white border-gray-100"
                  }`}
                >
                  {sel && (
                    <span className="absolute top-2 right-2 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <Check size={10} color="white" />
                    </span>
                  )}
                  <span className="text-xl">{opt.emoji}</span>
                  <span className="text-sm font-semibold text-gray-800">{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      );
    }

    // Step 7: Health Conditions
    if (step === 7) {
      return (
        <div className="flex-1 px-5 pt-4">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Any health conditions?</h2>
            <p className="text-gray-500 text-sm">We&apos;ll tailor recipes to keep you safe &amp; healthy</p>
          </div>
          <div className="space-y-3">
            {HEALTH_CONDITIONS.map((cond) => {
              const sel = conditions.includes(cond);
              return (
                <button
                  key={cond}
                  onClick={() => {
                    if (cond === "None") {
                      setConditions(["None"]);
                    } else {
                      const without = conditions.filter((c) => c !== "None");
                      toggleArr(without, cond, setConditions);
                    }
                  }}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${
                    sel ? "bg-green-50 border-green-400" : "bg-white border-gray-100"
                  }`}
                >
                  <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center ${sel ? "bg-green-500 border-green-500" : "border-gray-300"}`}>
                    {sel && <Check size={12} color="white" />}
                  </div>
                  <span className="text-sm font-medium text-gray-800">{cond}</span>
                </button>
              );
            })}
          </div>
        </div>
      );
    }

    // Step 9: Foods you love
    if (step === 9) {
      return (
        <div className="flex-1 px-5 pt-2">
          <div className="text-center mb-5">
            <span className="text-4xl">🥑✨</span>
            <h2 className="text-2xl font-bold text-gray-900 mt-2 mb-1">Foods you love</h2>
            <p className="text-gray-500 text-sm">Select categories you enjoy most</p>
          </div>
          <div className="space-y-3">
            {FOOD_CATEGORIES.map((cat) => {
              const expanded = expandedCategories.has(cat.category);
              return (
                <div key={cat.category} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                  <button
                    onClick={() => toggleCategory(cat.category)}
                    className="w-full flex items-center justify-between p-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{cat.emoji}</span>
                      <div className="text-left">
                        <p className="text-sm font-bold text-gray-900">{cat.category}</p>
                        <p className="text-xs text-gray-400">{cat.items.join(", ")}</p>
                      </div>
                    </div>
                    <span className="text-gray-400">{expanded ? "∧" : "∨"}</span>
                  </button>
                  {expanded && (
                    <div className="px-4 pb-4 flex flex-wrap gap-2">
                      {cat.items.map((item) => {
                        const sel = lovedFoods.includes(item);
                        return (
                          <button
                            key={item}
                            onClick={() => toggleArr(lovedFoods, item, setLovedFoods)}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium border-2 transition-all ${
                              sel
                                ? "bg-green-500 border-green-500 text-white"
                                : "bg-white border-gray-200 text-gray-700"
                            }`}
                          >
                            {item}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    // Step 11: Cooking Time
    if (step === 11) {
      return (
        <div className="flex-1 px-5 pt-4">
          <div className="text-center mb-6">
            <span className="text-4xl">🕐</span>
            <h2 className="text-2xl font-bold text-gray-900 mt-2 mb-1">How much time?</h2>
            <p className="text-gray-500 text-sm">For cooking each meal 🍽️</p>
          </div>
          <div className="space-y-3 mb-5">
            {COOKING_TIMES.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setCookTime(opt.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${
                  cookTime === opt.id ? "bg-green-50 border-green-400" : "bg-white border-gray-100"
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-xl">
                  {opt.emoji}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-900">{opt.label}</p>
                  <p className="text-xs text-gray-500">{opt.sub}</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 ${cookTime === opt.id ? "bg-green-500 border-green-500" : "border-gray-300"}`}>
                  {cookTime === opt.id && (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-4">
            <div className="flex items-center gap-2 mb-3">
              <p className="text-sm font-bold text-gray-900">Custom meal planning</p>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Recommended</span>
            </div>
            <div className="flex gap-2">
              {[3, 4, 5, 6, 7].map((d) => (
                <button
                  key={d}
                  onClick={() => setPlanDays(d)}
                  className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${
                    planDays === d ? "bg-green-500 text-white" : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {d} days
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // Step 13: Kitchen Setup
    if (step === 13) {
      return (
        <div className="flex-1 px-5 pt-4">
          <div className="text-center mb-5">
            <span className="text-4xl">🍳</span>
            <h2 className="text-2xl font-bold text-gray-900 mt-2 mb-1">Your kitchen setup</h2>
            <p className="text-gray-500 text-sm">Select the appliances you have</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {KITCHEN_OPTIONS.map((opt) => {
              const sel = kitchen.includes(opt.id);
              return (
                <button
                  key={opt.id}
                  onClick={() => toggleArr(kitchen, opt.id, setKitchen)}
                  className={`relative flex items-start gap-3 p-4 rounded-2xl border-2 transition-all text-left ${
                    sel ? "bg-green-50 border-green-400" : "bg-white border-gray-100"
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center mt-0.5 ${sel ? "bg-green-500 border-green-500" : "border-gray-300"}`}>
                    {sel && <Check size={10} color="white" />}
                  </div>
                  <div>
                    <span className="text-xl block mb-1">{opt.emoji}</span>
                    <p className="text-xs font-bold text-gray-900 leading-tight">{opt.label}</p>
                    <p className="text-xs text-gray-400">{opt.sub}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      );
    }

    // Step 15: Final
    if (step === 15) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">You&apos;re all set, {name}!</h2>
          <p className="text-gray-500 text-base mb-2">
            We&apos;ve crafted a personalized nutrition plan just for you.
          </p>
          <p className="text-green-600 text-sm font-medium">Let&apos;s start your health journey 🌱</p>
          <div className="mt-8 grid grid-cols-2 gap-4 w-full max-w-xs">
            <div className="bg-green-50 rounded-2xl p-4 text-center">
              <p className="text-2xl font-bold text-green-600">5</p>
              <p className="text-xs text-gray-500">Meals/day</p>
            </div>
            <div className="bg-orange-50 rounded-2xl p-4 text-center">
              <p className="text-2xl font-bold text-orange-500">{planDays}</p>
              <p className="text-xs text-gray-500">Day plan</p>
            </div>
          </div>
        </div>
      );
    }

    // Generic steps (2, 4, 6, 8, 10, 12, 14)
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">✨</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{STEP_LABELS[step]}</h2>
          <p className="text-gray-500 text-sm">We&apos;re personalizing your experience</p>
        </div>
      </div>
    );
  };

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #f8fdf4 0%, #fefcf0 50%, #f8fdf4 100%)" }}
    >
      {/* Decorative food images on early steps */}
      {step <= 3 && (
        <>
          <div className="absolute top-8 left-4 w-24 h-24 opacity-90 pointer-events-none">
            <img src="https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?w=200&q=80" alt="" className="w-full h-full object-cover rounded-full" />
          </div>
          <div className="absolute top-4 right-4 w-16 h-16 opacity-90 pointer-events-none">
            <img src="https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=200&q=80" alt="" className="w-full h-full object-cover rounded-full" />
          </div>
          <div className="absolute top-1/3 right-2 w-20 h-20 opacity-80 pointer-events-none">
            <img src="https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=200&q=80" alt="" className="w-20 h-20 object-cover rounded-full" />
          </div>
          <div className="absolute bottom-32 left-2 w-12 h-12 opacity-80 pointer-events-none rounded-full overflow-hidden">
            <img src="https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=100&q=80" alt="" className="w-full h-full object-cover" />
          </div>
        </>
      )}

      {/* Progress bar */}
      <div className="relative z-10 flex items-center gap-4 px-4 pt-4 pb-2">
        <button
          onClick={() => step > 1 && setStep(step - 1)}
          className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center"
        >
          <ChevronLeft size={18} className="text-gray-600" />
        </button>
        <div className="flex-1">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>{step} / {TOTAL_STEPS}</span>
          </div>
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Step content */}
      <div className="relative z-10 flex-1 overflow-y-auto pb-32">
        {renderStep()}
      </div>

      {/* Continue button */}
      <div className="fixed bottom-0 left-0 right-0 bg-transparent px-5 pb-6 pt-2 z-20">
        <button
          onClick={handleContinue}
          disabled={!canContinue()}
          className={`w-full py-4 rounded-2xl font-bold text-white text-base flex items-center justify-center gap-2 transition-all ${
            canContinue()
              ? "bg-green-500 hover:bg-green-600 shadow-lg shadow-green-200"
              : "bg-gray-300"
          }`}
        >
          {step === TOTAL_STEPS ? "Start My Journey 🚀" : "Continue"}
          {step < TOTAL_STEPS && <ChevronRight size={20} />}
        </button>
        <p className="text-center text-xs text-gray-400 mt-2">You can always change this later</p>
      </div>
    </div>
  );
}

function NourishLogo() {
  return (
    <div className="flex items-center justify-center gap-0">
      <span className="text-2xl font-black text-green-800">Nourish</span>
      <span className="text-2xl font-black text-orange-400">IQ</span>
      <span className="text-green-500 ml-0.5">🌿</span>
    </div>
  );
}
