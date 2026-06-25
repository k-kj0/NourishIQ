"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { TabType, QuizState, UserProfile, CalorieLog } from "./lib/types";
import { Meal, DayPlan, generateDailyPlan, regenerateMeal, matchCraving } from "./lib/mealData";

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
  setUserProfile: (profile: UserProfile) => void;
  dailyPlan: DayPlan;
  dayPlan: DayPlan;
  setDailyPlan: (plan: DayPlan) => void;
  regenerateMealForSlot: (slot: string) => void;
  regenerateMealForDay: (mealId: string, category: string) => void;
  selectedMeal: Meal | null;
  setSelectedMeal: (meal: Meal | null) => void;
  showRecipe: boolean;
  setShowRecipe: (show: boolean) => void;
  showRecipeSheet: boolean;
  setShowRecipeSheet: (show: boolean) => void;
  favorites: Meal[];
  setFavorites: (meals: Meal[]) => void;
  toggleFavorite: (meal: Meal) => void;
  toggleLikeMeal: (mealId: string) => void;
  calorieLog: CalorieLog[];
  setCalorieLog: (logs: CalorieLog[]) => void;
  logCalories: (date: string, consumed: number, target: number) => void;
  showCravingInput: boolean;
  setShowCravingInput: (show: boolean) => void;
  cravingResults: Meal[];
  setCravingResults: (results: Meal[]) => void;
  searchCraving: (query: string) => void;
  applianceFilter: string;
  setApplianceFilter: (filter: string) => void;
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
  const [applianceFilter, setApplianceFilter] = useState("");

  const updateQuizState = useCallback((updates: Partial<QuizState>) => {
    setQuizState((prev) => ({ ...prev, ...updates }));
  }, []);

  const regenerateMealForSlot = useCallback((slot: string) => {
    setDailyPlan((prev) => {
      const newMeals = regenerateMeal(prev.date, slot, prev.meals);
      return { ...prev, meals: newMeals };
    });
  }, []);

  const regenerateMealForDay = useCallback((mealId: string, category: string) => {
    setDailyPlan((prev) => {
      const newMeals = regenerateMeal(prev.date, category, prev.meals);
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

  const toggleLikeMeal = useCallback((mealId: string) => {
    setFavorites((prev) => {
      const exists = prev.find((m) => m.id === mealId);
      if (exists) return prev.filter((m) => m.id !== mealId);
      const meal = dailyPlan.meals.find((m) => m.id === mealId);
      if (meal) return [...prev, meal];
      return prev;
    });
  }, [dailyPlan.meals]);

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
        setUserProfile,
        dailyPlan,
        dayPlan: dailyPlan,
        setDailyPlan,
        regenerateMealForSlot,
        regenerateMealForDay,
        selectedMeal,
        setSelectedMeal,
        showRecipe,
        setShowRecipe,
        showRecipeSheet: showRecipe,
        setShowRecipeSheet: setShowRecipe,
        favorites,
        setFavorites,
        toggleFavorite,
        toggleLikeMeal,
        calorieLog,
        setCalorieLog,
        logCalories,
        showCravingInput,
        setShowCravingInput,
        cravingResults,
        setCravingResults,
        searchCraving,
        applianceFilter,
        setApplianceFilter,
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
