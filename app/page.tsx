"use client";

import { useApp } from "./AppContext";
import { OnboardingQuiz } from "./components/OnboardingQuiz";
import { MainDashboard } from "./components/MainDashboard";
import { RecipeSheet } from "./components/RecipeSheet";

export default function Home() {
  const { phase } = useApp();

  return (
    <>
      {phase === "onboarding" ? <OnboardingQuiz /> : <MainDashboard />}
      <RecipeSheet />
    </>
  );
}
