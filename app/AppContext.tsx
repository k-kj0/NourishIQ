"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { ALL_MEALS, generateDailyPlan, Meal } from "./lib/mealData";
import { QuizState, UserProfile, TabType } from "./lib/types";

type AppContextType = {
  // Navigation
  currentView: "onboarding" | "dashboard";
  setCurrentView: (v: "onboarding" | "dashboard") => void;
  activeTab: TabType;
  setActiveTab: (t: TabType) => void;

  // Quiz
  quizStep: number;
  setQuizStep: (n: number) => void;
  totalQuizSteps: number;
  quizState: QuizState;
  updateQuizState: (updates: Partial<QuizState>) => void;

  // Profile
  userProfile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;

  // Meals
  selectedMeal: Meal | null;
  setSelectedMeal: (m: Meal | null) => void;
  showRecipeSheet: boolean;
  setShowRecipeSheet: (v: boolean) => void;
  favorites: Meal[];
  toggleLikeMeal: (m: Meal) => void;

  // Home tab
  selectedDate: Date;
  setSelectedDate: (d: Date) => void;
  dayPlan: ReturnType<typeof generateDailyPlan>;
  regenerateMealForSlot: (category: string) => void;

  // Explore tab
  applianceFilter: string | null;
  setApplianceFilter: (f: string | null) => void;

  // App reset
  resetApp: () => void;
};

const AppContext = createContext<AppContextType | null>(null);

const DEFAULT_QUIZ_STATE: QuizState = {
  name: "",
  age: null,
  gender: "",
  region: "",
  dietType: [],
  healthGoals: [],
  healthConditions: [],
  hasMenstrualCycle: "",
  wantMenstrualMeals: false,
  menstrualPhase: "",
  lovedFoods: [],
  avoidedFoods: [],
  avoidedTextures: [],
  avoidedFlavors: [],
  customAvoidances: [],
  cookingTime: "",
  mealTimes: { breakfast: "08:00", lunch: "13:00", snack: "16:00", dinner: "20:00" },
  snacksPerDay: 1,
  mealsPerDay: 3,
  currentWeight: null,
  targetWeight: null,
  weightUnit: "kg",
  appliances: [],
  breakfastVarieties: 3,
  lunchVarieties: 3,
  dinnerVarieties: 3,
  snackVarieties: 2,
  lunchboxVarieties: 2,
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentView, setCurrentView] = useState<"onboarding" | "dashboard">("onboarding");
  const [activeTab, setActiveTab] = useState<TabType>("home");
  const [quizStep, setQuizStep] = useState(1);
  const totalQuizSteps = 16;
  const [quizState, setQuizState] = useState<QuizState>(DEFAULT_QUIZ_STATE);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "Sam",
    initials: "S",
    goal: "Lose weight",
    diet: "Balanced",
    region: "India",
    gender: "Female",
    age: 25,
    targetCalories: 1840,
  });
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [showRecipeSheet, setShowRecipeSheet] = useState(false);
  const [favorites, setFavorites] = useState<Meal[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [applianceFilter, setApplianceFilter] = useState<string | null>(null);

  const dayPlan = generateDailyPlan(
    selectedDate.toISOString().split("T")[0],
    true,
    true,
    quizState.mealsPerDay
  );

  const updateQuizState = (updates: Partial<QuizState>) => {
    setQuizState((prev) => ({ ...prev, ...updates }));
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...updates }));
  };

  const toggleLikeMeal = (meal: Meal) => {
    setFavorites((prev) =>
      prev.some((m) => m.id === meal.id)
        ? prev.filter((m) => m.id !== meal.id)
        : [...prev, meal]
    );
  };

  const regenerateMealForSlot = (category: string) => {
    // Cycles to next meal in category — dayPlan regenerates automatically
    setSelectedDate(new Date(selectedDate));
  };

  const resetApp = () => {
    setCurrentView("onboarding");
    setQuizStep(1);
    setQuizState(DEFAULT_QUIZ_STATE);
    setFavorites([]);
    setActiveTab("home");
  };

  // Sync profile name from quiz when entering dashboard
  const handleSetCurrentView = (v: "onboarding" | "dashboard") => {
    if (v === "dashboard" && quizState.name) {
      setUserProfile((prev) => ({
        ...prev,
        name: quizState.name,
        initials: quizState.name.slice(0, 2).toUpperCase(),
        gender: quizState.gender,
        region: quizState.region,
        goal: quizState.healthGoals[0] || "Balanced nutrition",
      }));
    }
    setCurrentView(v);
  };

  return (
    <AppContext.Provider
      value={{
        currentView, setCurrentView: handleSetCurrentView,
        activeTab, setActiveTab,
        quizStep, setQuizStep, totalQuizSteps,
        quizState, updateQuizState,
        userProfile, updateProfile,
        selectedMeal, setSelectedMeal,
        showRecipeSheet, setShowRecipeSheet,
        favorites, toggleLikeMeal,
        selectedDate, setSelectedDate,
        dayPlan, regenerateMealForSlot,
        applianceFilter, setApplianceFilter,
        resetApp,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
