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
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  dayPlan: DayPlan;
  includeDessert: boolean;
  setIncludeDessert: (val: boolean) => void;
  includeBeverage: boolean;
  setIncludeBeverage: (val: boolean) => void;
  mealsPerDay: number;
  setMealsPerDay: (val: number) => void;
  toggleLikeMeal: (mealId: string) => void;
  regenerateMealForDay: (mealId: string, category: string) => void;
  favorites: Meal[];
  selectedMeal: Meal | null;
  setSelectedMeal: (meal: Meal | null) => void;
  showRecipeSheet: boolean;
  setShowRecipeSheet: (val: boolean) => void;
  showChat: boolean;
  setShowChat: (val: boolean) => void;
  loggedMeals: Record<string, boolean>;
  toggleLoggedMeal: (mealId: string) => void;
  calorieHistory: CalorieLog[];
  addCalorieLog: (log: CalorieLog) => void;
  checkinData: Record<string, string>;
  updateCheckin: (type: string, value: string) => void;
  applianceFilter: string | null;
  setApplianceFilter: (val: string | null) => void;
  showApplianceFilter: boolean;
  setShowApplianceFilter: (val: boolean) => void;
  cravingQuery: string;
  setCravingQuery: (val: string) => void;
  cravingResults: Meal[];
  searchCravings: (query: string) => void;
  resetApp: () => void;
  showEditProfile: boolean;
  setShowEditProfile: (val: boolean) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
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
};

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentView, setCurrentView] = useState<"onboarding" | "dashboard">("onboarding");
  const [activeTab, setActiveTab] = useState<TabType>("home");
  const [quizStep, setQuizStep] = useState(1);
  const totalQuizSteps = 16;
  const [quizState, setQuizState] = useState<QuizState>(defaultQuizState);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [includeDessert, setIncludeDessert] = useState(false);
  const [includeBeverage, setIncludeBeverage] = useState(false);
  const [mealsPerDay, setMealsPerDay] = useState(3);
  const [favorites, setFavorites] = useState<Meal[]>([]);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [showRecipeSheet, setShowRecipeSheet] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [loggedMeals, setLoggedMeals] = useState<Record<string, boolean>>({});
  const [calorieHistory, setCalorieHistory] = useState<CalorieLog[]>([]);
  const [checkinData, setCheckinData] = useState<Record<string, string>>({});
  const [applianceFilter, setApplianceFilter] = useState<string | null>(null);
  const [showApplianceFilter, setShowApplianceFilter] = useState(false);
  const [cravingQuery, setCravingQuery] = useState("");
  const [cravingResults, setCravingResults] = useState<Meal[]>([]);
  const [showEditProfile, setShowEditProfile] = useState(false);

  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "",
    initials: "",
    goal: "",
    diet: "",
    region: "",
    gender: "",
    age: 0,
    targetCalories: 1840,
  });

  const dayPlan = generateDailyPlan(
    selectedDate.toISOString().split("T")[0],
    includeDessert,
    includeBeverage,
    mealsPerDay
  );

  const updateQuizState = useCallback((updates: Partial<QuizState>) => {
    setQuizState((prev) => ({ ...prev, ...updates }));
  }, []);

  const toggleLikeMeal = useCallback((mealId: string) => {
    const meal = dayPlan.meals.find((m) => m.id === mealId);
    if (meal) {
      setFavorites((prev) => {
        const exists = prev.find((m) => m.id === mealId);
        if (exists) return prev.filter((m) => m.id !== mealId);
        return [...prev, { ...meal, isLiked: true }];
      });
    }
  }, [dayPlan.meals]);

  const regenerateMealForDay = useCallback((mealId: string, category: string) => {
    const dateStr = selectedDate.toISOString().split("T")[0];
    regenerateMeal(dateStr, category, dayPlan.meals);
  }, [selectedDate, dayPlan.meals]);

  const toggleLoggedMeal = useCallback((mealId: string) => {
    setLoggedMeals((prev) => ({ ...prev, [mealId]: !prev[mealId] }));
  }, []);

  const addCalorieLog = useCallback((log: CalorieLog) => {
    setCalorieHistory((prev) => [...prev, log]);
  }, []);

  const updateCheckin = useCallback((type: string, value: string) => {
    setCheckinData((prev) => ({ ...prev, [type]: value }));
  }, []);

  const searchCravings = useCallback((query: string) => {
    const results = matchCraving(query, [], applianceFilter ? [applianceFilter] : []);
    setCravingResults(results);
  }, [applianceFilter]);

  const resetApp = useCallback(() => {
    setCurrentView("onboarding");
    setQuizStep(1);
    setQuizState(defaultQuizState);
    setFavorites([]);
    setCalorieHistory([]);
    setCheckinData({});
  }, []);

  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...updates }));
  }, []);

  const value: AppContextType = {
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
    selectedDate,
    setSelectedDate,
    dayPlan,
    includeDessert,
    setIncludeDessert,
    includeBeverage,
    setIncludeBeverage,
    mealsPerDay,
    setMealsPerDay,
    toggleLikeMeal,
    regenerateMealForDay,
    favorites,
    selectedMeal,
    setSelectedMeal,
    showRecipeSheet,
    setShowRecipeSheet,
    showChat,
    setShowChat,
    loggedMeals,
    toggleLoggedMeal,
    calorieHistory,
    addCalorieLog,
    checkinData,
    updateCheckin,
    applianceFilter,
    setApplianceFilter,
    showApplianceFilter,
    setShowApplianceFilter,
    cravingQuery,
    setCravingQuery,
    cravingResults,
    searchCravings,
    resetApp,
    showEditProfile,
    setShowEditProfile,
    updateProfile,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
}
