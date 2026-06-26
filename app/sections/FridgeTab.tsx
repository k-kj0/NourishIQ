"use client";

import { useState } from "react";
import { useApp } from "../AppContext";
import { Search, ChefHat, Flame, Droplets, Leaf } from "lucide-react";
import { HOME_REMEDIES, TRAVEL_CUISINES } from "../lib/mealData";

export function FridgeTab() {
  const { setSelectedMeal, setShowRecipeSheet } = useApp();
  const [activeSection, setActiveSection] = useState<
    "fridge" | "remedies" | "travel"
  >("fridge");
  const [fridgeItems, setFridgeItems] = useState("");
  const [remedySymptom, setRemedySymptom] = useState("");
  const [selectedRemedy, setSelectedRemedy] = useState<any>(null);

  const handleFindRecipes = () => {
    // Demo recipe from fridge
    const demoRecipe = {
      id: "fridge-demo",
      name: "Veggie Stir Fry",
      category: "dinner",
      image:
        "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&q=80",
      cookTime: "15 min",
      servings: 2,
      calories: 320,
      protein: 18,
      carbs: 42,
      fat: 10,
      ingredients: [
        "Mixed Vegetables (2 cups)",
        "Soy Sauce (2 tbsp)",
        "Garlic (2 cloves)",
        "Olive Oil (1 tbsp)",
        "Rice, cooked (1 cup)",
      ],
      steps: [
        { step: 1, text: "Heat oil in wok over high heat", time: "1 min" },
        { step: 2, text: "Add garlic and vegetables, stir fry 5 min", time: "5 min" },
        { step: 3, text: "Add soy sauce and toss", time: "1 min" },
        { step: 4, text: "Serve over rice", time: "1 min" },
      ],
      substitutes: [],
      benefits: ["Quick and healthy", "Uses whatever vegetables you have"],
    };
    setSelectedMeal(demoRecipe);
    setShowRecipeSheet(true);
  };

  const filteredRemedies = remedySymptom
    ? HOME_REMEDIES.filter(
        (r) =>
          r.symptom.toLowerCase().includes(remedySymptom.toLowerCase()) ||
          r.title.toLowerCase().includes(remedySymptom.toLowerCase())
      )
    : HOME_REMEDIES;

  return (
    <div className="max-w-md mx-auto px-4 pt-6 pb-24">
      <h1 className="text-2xl font-extrabold text-gray-900 mb-1">
        What&apos;s in your{" "}
        <span className="text-green-500">fridge?</span>
      </h1>
      <p className="text-sm text-gray-500 mb-4">
        Let AI turn it into something delicious
      </p>

      {/* Section Tabs */}
      <div className="flex gap-2 mb-4">
        {[
          { id: "fridge", label: "Fridge", icon: ChefHat },
          { id: "remedies", label: "Remedies", icon: Leaf },
          { id: "travel", label: "Travel", icon: Droplets },
        ].map((sec) => {
          const Icon = sec.icon;
          return (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id as any)}
              className={
                activeSection === sec.id
                  ? "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold bg-green-500 text-white"
                  : "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold bg-white text-gray-600 border border-gray-200"
              }
            >
              <Icon size={16} />
              {sec.label}
            </button>
          );
        })}
      </div>

      {/* FRIDGE SECTION */}
      {activeSection === "fridge" && (
        <div>
          <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
            <textarea
              value={fridgeItems}
              onChange={(e) => setFridgeItems(e.target.value)}
              placeholder="Type ingredients you have: tomatoes, eggs, spinach, cheese..."
              className="w-full h-24 p-3 rounded-xl bg-gray-50 border border-gray-100 resize-none outline-none text-sm"
            />
            <div className="flex gap-2 mt-3">
              <button className="flex-1 py-2.5 bg-gray-100 rounded-xl text-sm font-semibold text-gray-600 flex items-center justify-center gap-2">
                <Search size={16} />
                Scan Fridge
              </button>
              <button
                onClick={handleFindRecipes}
                className="flex-1 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl text-sm font-semibold"
              >
                Find Recipes
              </button>
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
            <p className="text-sm font-semibold text-gray-700 mb-3">
              Customize preferences
            </p>
            <div className="flex gap-2 flex-wrap">
              {["Stovetop", "3 Ingredients", "Sweet", "Medium", "No cook", "High protein"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 bg-gray-100 rounded-full text-xs font-medium text-gray-600"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </div>

          {/* AI Suggestions */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h3 className="text-sm font-bold text-gray-800 mb-3">
              AI Recipe Suggestions
            </h3>
            <div className="bg-gray-50 rounded-2xl p-3 flex items-center gap-3">
              <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center">
                <ChefHat size={24} className="text-orange-500" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800">
                  Veggie Stir Fry
                </p>
                <p className="text-xs text-gray-500">
                  5 ingredients · 15 min · 320 kcal
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* REMEDIES SECTION */}
      {activeSection === "remedies" && (
        <div>
          <div className="relative mb-4">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              value={remedySymptom}
              onChange={(e) => setRemedySymptom(e.target.value)}
              placeholder="My head hurts, I feel tired, stomach ache..."
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white border-2 border-gray-100 focus:border-green-400 outline-none font-medium text-sm shadow-sm"
            />
          </div>

          {selectedRemedy ? (
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 animate-fade-in">
              <button
                onClick={() => setSelectedRemedy(null)}
                className="text-sm text-gray-500 mb-3"
              >
                ← Back to remedies
              </button>
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {selectedRemedy.title}
              </h3>
              <p className="text-xs text-green-600 font-semibold mb-3">
                For: {selectedRemedy.symptom}
              </p>

              <div className="bg-green-50 rounded-2xl p-4 mb-4">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {selectedRemedy.benefit}
                </p>
              </div>

              <h4 className="text-sm font-bold text-gray-800 mb-2">
                Ingredients
              </h4>
              <div className="space-y-2 mb-4">
                {selectedRemedy.ingredients.map((ing: string, i: number) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-gray-50 rounded-xl p-3"
                  >
                    <Leaf size={14} className="text-green-500" />
                    <span className="text-sm text-gray-700">{ing}</span>
                  </div>
                ))}
              </div>

              <h4 className="text-sm font-bold text-gray-800 mb-2">Steps</h4>
              <div className="space-y-3 mb-4">
                {selectedRemedy.steps.map((step: string, i: number) => (
                  <div key={i} className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-bold">
                      {i + 1}
                    </span>
                    <p className="text-sm text-gray-700">{step}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Flame size={14} />
                <span>Prep time: {selectedRemedy.prepTime}</span>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredRemedies.map((remedy) => (
                <button
                  key={remedy.id}
                  onClick={() => setSelectedRemedy(remedy)}
                  className="w-full bg-white rounded-2xl p-4 shadow-sm text-left flex items-center gap-4"
                >
                  <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                    <Leaf size={20} className="text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">
                      {remedy.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {remedy.symptom} · {remedy.prepTime}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TRAVEL SECTION */}
      {activeSection === "travel" && (
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Local cuisine recommendations based on your taste profile
          </p>
          {TRAVEL_CUISINES.map((cuisine) => (
            <div
              key={cuisine.id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100"
            >
              <img
                src={cuisine.image}
                alt={cuisine.dish}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-gray-400 uppercase">
                    {cuisine.city}, {cuisine.country}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {cuisine.dish}
                </h3>
                <p className="text-sm text-gray-500 mb-3">
                  {cuisine.description}
                </p>
                <div className="flex gap-2 mb-3">
                  {cuisine.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-green-50 text-green-700 rounded-lg text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-600">
                    <span className="font-semibold">Why try:</span>{" "}
                    {cuisine.whyTry}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
