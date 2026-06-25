"use client";

import { AppProvider } from "./AppContext";
import { MainDashboard } from "./components/MainDashboard";
import { OnboardingQuiz } from "./components/OnboardingQuiz";
import { useApp } from "./AppContext";

function AppContent() {
  const { currentView } = useApp();
  return currentView === "onboarding" ? <OnboardingQuiz /> : <MainDashboard />;
}

export default function Home() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
