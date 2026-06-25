"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { TabType, QuizState, UserProfile, CalorieLog } from "./lib/types";
import { Meal, DayPlan, generateDailyPlan, regenerateMeal, matchCraving, ALL_MEALS } from "./lib/mealData";

interface AppContextType {
  currentView: "onboarding" | "dashboard";
  setCurrentView: (view: "onboarding" | "dashboard") => void;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  quizStep: number;
  setQuizStep: (step: number) => void;
  totalQuizSteps: number;
  quizState: QuizState;
  updateQuizState: (updates: Partial<QuizState>) => void;
  userProfile: UserProfile;
  dailyPlan: DayPlan;
  regenerateMealForSlot: (slot: string) => void;
  selectedMeal: Meal | null;
  setSelectedMeal: (meal: Meal | null) => void;
  showRecipe: boolean;
  setShowRecipe: (show: boolean) => void;
  favorites: Meal[];
  toggleFavorite: (meal: Meal) => void;
  calorieLog: CalorieLog[];
  logCalories: (date: string, consumed: number, target: number) => void;
  showCravingInput: boolean;
  setShowCravingInput: (show: boolean) => void;
  cravingResults: Meal[];
  searchCraving: (query: string) => void;
}

const defaultQuizState: QuizState = {
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
  snackVarieties: 3,
  lunchboxVarieties: 0,
};

const defaultUserProfile: UserProfile = {
  name: "",
  initials: "",
  goal: "",
  diet: "",
  region: "",
  gender: "",
  age: 0,
  targetCalories: 2000,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentView, setCurrentView] = useState<"onboarding" | "dashboard">("onboarding");
  const [activeTab, setActiveTab] = useState<TabType>("home");
  const [quizStep, setQuizStep] = useState(1);
  const totalQuizSteps = 16;
  const [quizState, setQuizState] = useState<QuizState>(defaultQuizState);
  const [userProfile, setUserProfile] = useState<UserProfile>(defaultUserProfile);
  const [dailyPlan, setDailyPlan] = useState<DayPlan>(generateDailyPlan("2024-01-01", false, false, 3));
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [showRecipe, setShowRecipe] = useState(false);
  const [favorites, setFavorites] = useState<Meal[]>([]);
  const [calorieLog, setCalorieLog] = useState<CalorieLog[]>([]);
  const [showCravingInput, setShowCravingInput] = useState(false);
  const [cravingResults, setCravingResults] = useState<Meal[]>([]);

  const updateQuizState = useCallback((updates: Partial<QuizState>) => {
    setQuizState((prev) => ({ ...prev, ...updates }));
  }, []);

  const regenerateMealForSlot = useCallback((slot: string) => {
    setDailyPlan((prev) => {
      const newMeals = regenerateMeal(prev.date, slot, prev.meals);
      return { ...prev, meals: newMeals };
    });
  }, []);

  const toggleFavorite = useCallback((meal: Meal) => {
    setFavorites((prev) => {
      const exists = prev.find((m) => m.id === meal.id);
      if (exists) return prev.filter((m) => m.id !== meal.id);
      return [...prev, meal];
    });
  }, []);

  const logCalories = useCallback((date: string, consumed: number, target: number) => {
    setCalorieLog((prev) => {
      const filtered = prev.filter((log) => log.date !== date);
      return [...filtered, { date, consumed, target }];
    });
  }, []);

  const searchCraving = useCallback((query: string) => {
    const results = matchCraving(query, quizState.avoidedFoods, quizState.appliances);
    setCravingResults(results);
  }, [quizState.avoidedFoods, quizState.appliances]);

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        activeTab,
        setActiveTab,
        quizStep,
        setQuizStep,
        totalQuizSteps,
        quizState,
        updateQuizState,
        userProfile,
        dailyPlan,
        regenerateMealForSlot,
        selectedMeal,
        setSelectedMeal,
        showRecipe,
        setShowRecipe,
        favorites,
        toggleFavorite,
        calorieLog,
        logCalories,
        showCravingInput,
        setShowCravingInput,
        cravingResults,
        searchCraving,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}
