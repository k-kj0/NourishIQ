"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { TabType, QuizState, UserProfile, CalorieLog } from "./lib/types";
import { Meal, DayPlan, generateDailyPlan, regenerateMeal, matchCraving } from "./lib/mealData";

export interface AppContextType {
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
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  includeDessert: boolean;
  setIncludeDessert: (val: boolean) => void;
  includeBeverage: boolean;
  setIncludeBeverage: (val: boolean) => void;
  mealsPerDay: number;
  setMealsPerDay: (val: number) => void;
  dayPlan: DayPlan;
  dailyPlan: DayPlan;
  setDailyPlan: (plan: DayPlan) => void;
  regenerateMealForSlot: (slot: string) => void;
  regenerateMealForDay: (mealId: string, category: string) => void;
  selectedMeal: Meal | null;
  setSelectedMeal: (meal: Meal | null) => void;
  showRecipe: boolean;
  setShowRecipe: (show: boolean) => void;
  showRecipeSheet: boolean;
  setShowRecipeSheet: (show: boolean) => void;
  showChat: boolean;
  setShowChat: (val: boolean) => void;
  favorites: Meal[];
  setFavorites: (meals: Meal[]) => void;
  toggleFavorite: (meal: Meal) => void;
  toggleLikeMeal: (mealId: string) => void;
  loggedMeals: Record<string, boolean>;
  toggleLoggedMeal: (mealId: string) => void;
  calorieLog: CalorieLog[];
  calorieHistory: CalorieLog[];
  setCalorieLog: (logs: CalorieLog[]) => void;
  logCalories: (date: string, consumed: number, target: number) => void;
  addCalorieLog: (log: CalorieLog) => void;
  showCravingInput: boolean;
  setShowCravingInput: (show: boolean) => void;
  cravingQuery: string;
  setCravingQuery: (val: string) => void;
  cravingResults: Meal[];
  setCravingResults: (results: Meal[]) => void;
  searchCraving: (query: string) => void;
  searchCravings: (query: string) => void;
  showApplianceFilter: boolean;
  setShowApplianceFilter: (val: boolean) => void;
  applianceFilter: string | null;
  setApplianceFilter: (val: string | null) => void;
  checkinData: Record<string, string>;
  updateCheckin: (type: string, value: string) => void;
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
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [includeDessert, setIncludeDessert] = useState(false);
  const [includeBeverage, setIncludeBeverage] = useState(false);
  const [mealsPerDay, setMealsPerDay] = useState(3);
  const [dailyPlan, setDailyPlan] = useState<DayPlan>(generateDailyPlan("2024-01-01", false, false, 3));
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [showRecipe, setShowRecipe] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [favorites, setFavorites] = useState<Meal[]>([]);
  const [loggedMeals, setLoggedMeals] = useState<Record<string, boolean>>({});
  const [calorieLog, setCalorieLog] = useState<CalorieLog[]>([]);
  const [showCravingInput, setShowCravingInput] = useState(false);
  const [cravingQuery, setCravingQuery] = useState("");
  const [cravingResults, setCravingResults] = useState<Meal[]>([]);
  const [showApplianceFilter, setShowApplianceFilter] = useState(false);
  const [applianceFilter, setApplianceFilter] = useState<string | null>(null);
  const [checkinData, setCheckinData] = useState<Record<string, string>>({});
  const [showEditProfile, setShowEditProfile] = useState(false);

  const dayPlan = generateDailyPlan(
    selectedDate.toISOString().split("T")[0],
    includeDessert,
    includeBeverage,
    mealsPerDay
  );

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
      const meal = dayPlan.meals.find((m) => m.id === mealId);
      if (meal) return [...prev, meal];
      return prev;
    });
  }, [dayPlan.meals]);

  const toggleLoggedMeal = useCallback((mealId: string) => {
    setLoggedMeals((prev) => ({ ...prev, [mealId]: !prev[mealId] }));
  }, []);

  const logCalories = useCallback((date: string, consumed: number, target: number) => {
    setCalorieLog((prev) => {
      const filtered = prev.filter((log) => log.date !== date);
      return [...filtered, { date, consumed, target }];
    });
  }, []);

  const addCalorieLog = useCallback((log: CalorieLog) => {
    setCalorieLog((prev) => [...prev, log]);
  }, []);

  const searchCraving = useCallback((query: string) => {
    const results = matchCraving(query, quizState.avoidedFoods, quizState.appliances);
    setCravingResults(results);
  }, [quizState.avoidedFoods, quizState.appliances]);

  const searchCravings = useCallback((query: string) => {
    const results = matchCraving(query, [], applianceFilter ? [applianceFilter] : []);
    setCravingResults(results);
  }, [applianceFilter]);

  const updateCheckin = useCallback((type: string, value: string) => {
    setCheckinData((prev) => ({ ...prev, [type]: value }));
  }, []);

  const resetApp = useCallback(() => {
    setCurrentView("onboarding");
    setQuizStep(1);
    setQuizState(defaultQuizState);
    setFavorites([]);
    setCalorieLog([]);
    setCheckinData({});
    setLoggedMeals({});
  }, []);

  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...updates }));
  }, []);

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
        selectedDate,
        setSelectedDate,
        includeDessert,
        setIncludeDessert,
        includeBeverage,
        setIncludeBeverage,
        mealsPerDay,
        setMealsPerDay,
        dayPlan,
        dailyPlan,
        setDailyPlan,
        regenerateMealForSlot,
        regenerateMealForDay,
        selectedMeal,
        setSelectedMeal,
        showRecipe,
        setShowRecipe,
        showRecipeSheet: showRecipe,
        setShowRecipeSheet: setShowRecipe,
        showChat,
        setShowChat,
        favorites,
        setFavorites,
        toggleFavorite,
        toggleLikeMeal,
        loggedMeals,
        toggleLoggedMeal,
        calorieLog,
        calorieHistory: calorieLog,
        setCalorieLog,
        logCalories,
        addCalorieLog,
        showCravingInput,
        setShowCravingInput,
        cravingQuery,
        setCravingQuery,
        cravingResults,
        setCravingResults,
        searchCraving,
        searchCravings,
        showApplianceFilter,
        setShowApplianceFilter,
        applianceFilter,
        setApplianceFilter,
        checkinData,
        updateCheckin,
        resetApp,
        showEditProfile,
        setShowEditProfile,
        updateProfile,
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
