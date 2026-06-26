"use client";

import { useState } from "react";
import { useApp } from "../AppContext";
import {
  ChevronRight,
  ChevronLeft,
  User,
  MapPin,
  Heart,
  Apple,
  Clock,
  Flame,
  ChefHat,
  Scale,
  Check,
  Sparkles,
  Zap,
  Droplets,
  Moon,
  Sun,
  Thermometer,
  Activity,
  Brain,
  Smile,
  UtensilsCrossed,
  Coffee,
} from "lucide-react";

export function OnboardingQuiz() {
  const { quizStep, setQuizStep, totalQuizSteps, quizState, updateQuizState, setCurrentView, setProfile } = useApp();
  const [direction, setDirection] = useState(1);

  const nextStep = () => {
    if (quizStep < totalQuizSteps) {
      setDirection(1);
      setQuizStep(quizStep + 1);
    } else {
      finishQuiz();
    }
  };

  const prevStep = () => {
    if (quizStep > 1) {
      setDirection(-1);
      setQuizStep(quizStep - 1);
    }
  };

 const finishQuiz = () => {
  setProfile({
    name: quizState.name,
    gender: quizState.gender,
    diet: quizState.dietType,
    healthConditions: quizState.healthConditions,
    cookingTime: quizState.cookingTime,
    kitchenSetup: quizState.appliances,
    lovedFoods: quizState.lovedFoods,
    healthGoals: quizState.healthGoals,
    region: quizState.region,
    age: quizState.age,
    initials: quizState.name ? quizState.name.substring(0, 2).toUpperCase() : "ME",
    goal: quizState.healthGoals[0] || "Eat Healthier",
    targetCalories: 2000,
  } as any);
  setCurrentView("dashboard");
};

  const renderStep = () => {
    switch (quizStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <User size={40} className="text-green-500 mx-auto mb-3" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">What is your name?</h2>
              <p className="text-sm text-gray-500">We will personalize your experience</p>
            </div>
            <input
              type="text"
              value={quizState.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateQuizState({ name: e.target.value })}
              placeholder="Enter your name"
              className="w-full p-4 rounded-2xl border-2 border-gray-100 focus:border-green-400 outline-none text-center text-lg font-medium"
            />
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <MapPin size={40} className="text-green-500 mx-auto mb-3" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Where are you from?</h2>
              <p className="text-sm text-gray-500">This helps us recommend local cuisine</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {["India", "United States", "United Kingdom", "Australia", "Canada", "Other"].map((region) => (
                <button
                  key={region}
                  onClick={() => updateQuizState({ region })}
                  className={quizState.region === region ? "p-4 rounded-2xl border-2 border-green-500 bg-green-50 text-green-700 font-semibold" : "p-4 rounded-2xl border-2 border-gray-100 text-gray-700 font-medium"}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Heart size={40} className="text-green-500 mx-auto mb-3" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">What is your gender?</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {["Male", "Female", "Non-binary", "Prefer not to say"].map((gender) => (
                <button
                  key={gender}
                  onClick={() => updateQuizState({ gender })}
                  className={quizState.gender === gender ? "p-4 rounded-2xl border-2 border-green-500 bg-green-50 text-green-700 font-semibold" : "p-4 rounded-2xl border-2 border-gray-100 text-gray-700 font-medium"}
                >
                  {gender}
                </button>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Apple size={40} className="text-green-500 mx-auto mb-3" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Diet preference</h2>
            </div>
            <div className="space-y-2">
              {["Vegan", "Vegetarian", "Vegetarian + Eggs", "Non-vegetarian", "Pescatarian"].map((diet) => (
                <button
                  key={diet}
                  onClick={() => updateQuizState({ dietType: [diet] })}
                  className={quizState.dietType.includes(diet) ? "w-full p-4 rounded-2xl border-2 border-green-500 bg-green-50 text-green-700 font-semibold text-left" : "w-full p-4 rounded-2xl border-2 border-gray-100 text-gray-700 font-medium text-left"}
                >
                  {diet}
                </button>
              ))}
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Flame size={40} className="text-green-500 mx-auto mb-3" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Health goals</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {["Lose Weight", "Gain Muscle", "Eat Healthier", "Boost Energy", "Better Sleep", "Heart Health"].map((goal) => (
                <button
                  key={goal}
                  onClick={() => {
                    const current = quizState.healthGoals;
                    const updated = current.includes(goal) ? current.filter((g: string) => g !== goal) : [...current, goal];
                    updateQuizState({ healthGoals: updated });
                  }}
                  className={quizState.healthGoals.includes(goal) ? "p-3 rounded-2xl border-2 border-green-500 bg-green-50 text-green-700 font-semibold text-sm" : "p-3 rounded-2xl border-2 border-gray-100 text-gray-700 font-medium text-sm"}
                >
                  {goal}
                </button>
              ))}
            </div>
          </div>
        );
      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Thermometer size={40} className="text-green-500 mx-auto mb-3" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Health conditions</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {["None", "Diabetes", "High BP", "PCOS", "Thyroid", "Other"].map((condition) => (
                <button
                  key={condition}
                  onClick={() => {
                    const current = quizState.healthConditions;
                    const updated = current.includes(condition) ? current.filter((c: string) => c !== condition) : [...current, condition];
                    updateQuizState({ healthConditions: updated });
                  }}
                  className={quizState.healthConditions.includes(condition) ? "p-3 rounded-2xl border-2 border-green-500 bg-green-50 text-green-700 font-semibold text-sm" : "p-3 rounded-2xl border-2 border-gray-100 text-gray-700 font-medium text-sm"}
                >
                  {condition}
                </button>
              ))}
            </div>
          </div>
        );
      case 7:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Clock size={40} className="text-green-500 mx-auto mb-3" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Cooking time preference</h2>
            </div>
            <div className="space-y-2">
              {["Under 15 min", "15-30 min", "30-45 min", "45+ min"].map((time) => (
                <button
                  key={time}
                  onClick={() => updateQuizState({ cookingTime: time })}
                  className={quizState.cookingTime === time ? "w-full p-4 rounded-2xl border-2 border-green-500 bg-green-50 text-green-700 font-semibold text-left" : "w-full p-4 rounded-2xl border-2 border-gray-100 text-gray-700 font-medium text-left"}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        );
      case 8:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <ChefHat size={40} className="text-green-500 mx-auto mb-3" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Kitchen appliances</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {["Microwave", "Air Fryer", "Oven", "Blender", "Instant Pot", "None"].map((appliance) => (
                <button
                  key={appliance}
                  onClick={() => {
                    const current = quizState.appliances;
                    const updated = current.includes(appliance) ? current.filter((a: string) => a !== appliance) : [...current, appliance];
                    updateQuizState({ appliances: updated });
                  }}
                  className={quizState.appliances.includes(appliance) ? "p-3 rounded-2xl border-2 border-green-500 bg-green-50 text-green-700 font-semibold text-sm" : "p-3 rounded-2xl border-2 border-gray-100 text-gray-700 font-medium text-sm"}
                >
                  {appliance}
                </button>
              ))}
            </div>
          </div>
        );
      case 9:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Scale size={40} className="text-green-500 mx-auto mb-3" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your weight journey</h2>
              <p className="text-sm text-gray-500">We will personalize your plan</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Current weight (kg)</label>
                <input
                  type="number"
                  value={quizState.currentWeight || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateQuizState({ currentWeight: parseInt(e.target.value) || null })}
                  placeholder="0"
                  className="w-full text-2xl font-black p-4 rounded-2xl border-2 border-gray-100 focus:border-green-400 outline-none text-center"
                />
              </div>
              {quizState.healthGoals.includes("Lose Weight") && (
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Target weight (kg) — optional</label>
                  <input
                    type="number"
                    value={quizState.targetWeight || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateQuizState({ targetWeight: parseInt(e.target.value) || null })}
                    placeholder="0"
                    className="w-full text-2xl font-black p-4 rounded-2xl border-2 border-gray-100 focus:border-green-400 outline-none text-center"
                  />
                </div>
              )}
            </div>
          </div>
        );
      case 10:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Sparkles size={40} className="text-green-500 mx-auto mb-3" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Foods you love</h2>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {["Chicken", "Fish", "Eggs", "Paneer", "Rice", "Pasta", "Burgers", "Salads", "Soups", "Desserts", "Fruits", "Bread"].map((food) => (
                <button
                  key={food}
                  onClick={() => {
                    const current = quizState.lovedFoods;
                    const updated = current.includes(food) ? current.filter((f: string) => f !== food) : [...current, food];
                    updateQuizState({ lovedFoods: updated });
                  }}
                  className={quizState.lovedFoods.includes(food) ? "p-2 rounded-xl border-2 border-green-500 bg-green-50 text-green-700 font-semibold text-xs" : "p-2 rounded-xl border-2 border-gray-100 text-gray-700 font-medium text-xs"}
                >
                  {food}
                </button>
              ))}
            </div>
          </div>
        );
      case 11:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Activity size={40} className="text-green-500 mx-auto mb-3" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Meals per day</h2>
            </div>
            <div className="flex justify-center gap-4">
              {[2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  onClick={() => updateQuizState({ mealsPerDay: num })}
                  className={quizState.mealsPerDay === num ? "w-16 h-16 rounded-2xl border-2 border-green-500 bg-green-50 text-green-700 font-bold text-xl" : "w-16 h-16 rounded-2xl border-2 border-gray-100 text-gray-700 font-bold text-xl"}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        );
      case 12:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Zap size={40} className="text-green-500 mx-auto mb-3" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Meal times</h2>
            </div>
            <div className="space-y-3">
              {[
                { label: "Breakfast", key: "breakfast" as const, icon: Sun },
                { label: "Lunch", key: "lunch" as const, icon: UtensilsCrossed },
                { label: "Snack", key: "snack" as const, icon: Coffee },
                { label: "Dinner", key: "dinner" as const, icon: Moon },
              ].map(({ label, key, icon: Icon }) => (
                <div key={key} className="flex items-center gap-3 bg-gray-50 rounded-2xl p-3">
                  <Icon size={20} className="text-gray-500" />
                  <span className="text-sm font-semibold text-gray-700 w-20">{label}</span>
                  <input
                    type="time"
                    value={quizState.mealTimes[key]}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateQuizState({ mealTimes: { ...quizState.mealTimes, [key]: e.target.value } })}
                    className="flex-1 p-2 rounded-xl border border-gray-200 text-sm"
                  />
                </div>
              ))}
            </div>
          </div>
        );
      case 13:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Brain size={40} className="text-green-500 mx-auto mb-3" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your age</h2>
            </div>
            <input
              type="number"
              value={quizState.age || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateQuizState({ age: parseInt(e.target.value) || null })}
              placeholder="Enter your age"
              className="w-full p-4 rounded-2xl border-2 border-gray-100 focus:border-green-400 outline-none text-center text-lg font-medium"
            />
          </div>
        );
        case 14:
          return null;
      case 15:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Smile size={40} className="text-green-500 mx-auto mb-3" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Avoid flavors</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {["Very Spicy", "Bitter", "Sour", "Very Sweet", "Fishy", "Pungent"].map((flavor) => (
                <button
                  key={flavor}
                  onClick={() => {
                    const current = quizState.avoidedFlavors;
                    const updated = current.includes(flavor) ? current.filter((f: string) => f !== flavor) : [...current, flavor];
                    updateQuizState({ avoidedFlavors: updated });
                  }}
                  className={quizState.avoidedFlavors.includes(flavor) ? "p-3 rounded-2xl border-2 border-red-500 bg-red-50 text-red-700 font-semibold text-sm" : "p-3 rounded-2xl border-2 border-gray-100 text-gray-700 font-medium text-sm"}
                >
                  {flavor}
                </button>
              ))}
            </div>
          </div>
        );
      case 16:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Check size={40} className="text-green-500 mx-auto mb-3" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">All set!</h2>
              <p className="text-sm text-gray-500">Your personalized plan is ready</p>
            </div>
            <div className="bg-green-50 rounded-2xl p-4 space-y-2">
              <p className="text-sm text-gray-700"><span className="font-semibold">Name:</span> {quizState.name || "Not set"}</p>
              <p className="text-sm text-gray-700"><span className="font-semibold">Diet:</span> {quizState.dietType.join(", ") || "Not set"}</p>
              <p className="text-sm text-gray-700"><span className="font-semibold">Goals:</span> {quizState.healthGoals.join(", ") || "Not set"}</p>
              <p className="text-sm text-gray-700"><span className="font-semibold">Weight:</span> {quizState.currentWeight ? quizState.currentWeight + " " + quizState.weightUnit : "Not set"}</p>
            </div>
            <button
              onClick={finishQuiz}
              className="w-full py-4 bg-green-500 text-white rounded-2xl font-bold text-lg"
            >
              Start My Journey
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 px-6 py-8 max-w-md mx-auto w-full">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-gray-500">Step {quizStep} of {totalQuizSteps}</span>
            <span className="text-xs font-semibold text-green-600">{Math.round((quizStep / totalQuizSteps) * 100)}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 rounded-full transition-all duration-300" style={{ width: `${(quizStep / totalQuizSteps) * 100}%` }} />
          </div>
        </div>
        <div className="animate-fade-in">
          {renderStep()}
        </div>
      </div>
      <div className="px-6 py-4 border-t border-gray-100 max-w-md mx-auto w-full">
        <div className="flex gap-3">
          {quizStep > 1 && (
            <button
              onClick={prevStep}
              className="px-6 py-3 rounded-2xl border-2 border-gray-200 text-gray-700 font-semibold flex items-center gap-2"
            >
              <ChevronLeft size={18} />
              Back
            </button>
          )}
          <button
            onClick={nextStep}
            className="flex-1 py-3 rounded-2xl bg-green-500 text-white font-semibold flex items-center justify-center gap-2"
          >
            {quizStep === totalQuizSteps ? "Finish" : "Next"}
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
