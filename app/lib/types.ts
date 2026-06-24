export type TabType = "home" | "explore" | "favorites" | "profile";

export interface QuizState {
  name: string;
  age: number | null;
  gender: string;
  region: string;
  dietType: string[];
  healthGoals: string[];
  healthConditions: string[];
  hasMenstrualCycle: string;
  wantMenstrualMeals: boolean;
  menstrualPhase: string;
  lovedFoods: string[];
  avoidedFoods: string[];
  avoidedTextures: string[];
  avoidedFlavors: string[];
  customAvoidances: string[];
  cookingTime: string;
  mealTimes: {
    breakfast: string;
    lunch: string;
    snack: string;
    dinner: string;
  };
  snacksPerDay: number;
  mealsPerDay: number;
  currentWeight: number | null;
  targetWeight: number | null;
  weightUnit: string;
  appliances: string[];
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
