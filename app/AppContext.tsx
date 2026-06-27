"use client";
import React, { createContext, useContext, useState } from "react";
import { Meal } from "../lib/mealData";

interface AppContextType {
  profile: { name: string; step: number; goal: string; diet: string };
  setProfile: React.Dispatch<React.SetStateAction<AppContextType["profile"]>>;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedDayIndex: number;
  setSelectedDayIndex: (idx: number) => void;
  selectedMeal: Meal | null;
  setSelectedMeal: (meal: Meal | null) => void;
  showRecipeSheet: boolean;
  setShowRecipeSheet: (show: boolean) => void;
  groceryList: { name: string; checked: boolean }[];
  setGroceryList: React.Dispatch<React.SetStateAction<AppContextType["groceryList"]>>;
  groceryToast: string | null;
  setGroceryToast: (msg: string | null) => void;
  waterCount: number;
  setWaterCount: React.Dispatch<React.SetStateAction<number>>;
  isOnboarded: boolean;
  setIsOnboarded: (val: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");
  const [selectedDayIndex, setSelectedDayIndex] = useState(5); // Default Saturday 27 June
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [showRecipeSheet, setShowRecipeSheet] = useState(false);
  const [groceryToast, setGroceryToast] = useState<string | null>(null);
  const [waterCount, setWaterCount] = useState(0);
  const [groceryList, setGroceryList] = useState<{ name: string; checked: boolean }[]>([]);
  const [profile, setProfile] = useState({
    name: "", step: 1, goal: "Eat cleaner", diet: "Omnivore"
  });

  return (
    <AppContext.Provider value={{
      profile, setProfile, activeTab, setActiveTab, selectedDayIndex, setSelectedDayIndex,
      selectedMeal, setSelectedMeal, showRecipeSheet, setShowRecipeSheet, groceryList, setGroceryList,
      groceryToast, setGroceryToast, waterCount, setWaterCount, isOnboarded, setIsOnboarded
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const c = useContext(AppContext);
  if (!c) throw new Error("useApp context missing");
  return c;
}
