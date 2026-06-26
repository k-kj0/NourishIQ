export type TabType = "home" | "explore" | "fridge" | "favorites" | "profile";

export interface QuizState {
  // ... all your existing fields ...
  name: string;
  gender: string;
  region: string;
  dietType: string[];
  healthGoals: string[];
  healthConditions: string[];
  cookingTime: string;
  appliances: string[];
  currentWeight: number | null;
  targetWeight: number | null;
  weightUnit: string;
  lovedFoods: string[];
  avoidedFlavors: string[];
  mealsPerDay: number;
  snacksPerDay: number;   // ← ADD THIS LINE
  age: number | null;
  mealTimes: {
    breakfast: string;
    lunch: string;
    snack: string;
    dinner: string;
  };
}
  snacksPerDay: number;
  mealsPerDay: number;
  currentWeight: number | null;
  targetWeight: number | null;
  weightUnit: string;
  appliances: string[];
  breakfastVarieties: number;
  lunchVarieties: number;
  dinnerVarieties: number;
  snackVarieties: number;
  lunchboxVarieties: number;
}

export interface UserProfile {
  name: string;
  initials: string;
  goal: string;
  diet: string;
  region: string;
  gender: string;
  age: number;
  targetCalories: number;
}

export interface CalorieLog {
  date: string;
  consumed: number;
  target: number;
}
