"use client";

import { useApp } from "../AppContext";
import { OnboardingQuiz } from "./OnboardingQuiz";
import { MainDashboard } from "./MainDashboard";
import { AnimatePresence, motion } from "framer-motion";

export function AppRouter() {
  const { currentView } = useApp();

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[460px] flex-col bg-cream relative">
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
    </div>
  );
}
