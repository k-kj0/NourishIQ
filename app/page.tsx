"use client";

export const dynamic = 'force-dynamic';

import { useApp } from "./AppContext";
import { OnboardingQuiz } from "./components/OnboardingQuiz";
import { MainDashboard } from "./components/MainDashboard";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const { currentView } = useApp();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[460px] flex-col bg-cream relative">
      <AnimatePresence mode="wait">
        {currentView === "onboarding" && (
          <motion.div
            key="onboarding"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <OnboardingQuiz />
          </motion.div>
        )}
        {currentView === "dashboard" && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <MainDashboard />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
