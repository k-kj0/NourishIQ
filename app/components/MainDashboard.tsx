"use client";

import { useApp } from "../AppContext";
import { HomeTab } from "../sections/HomeTab";
import { ExploreTab } from "../sections/ExploreTab";
import { FavoritesTab } from "../sections/FavoritesTab";
import { ProfileTab } from "../sections/ProfileTab";
import { BottomNav } from "./BottomNav";
import { AnimatePresence, motion } from "framer-motion";

export function MainDashboard() {
  const { activeTab } = useApp();

  const tabs = {
    home: <HomeTab />,
    explore: <ExploreTab />,
    favorites: <FavoritesTab />,
    profile: <ProfileTab />,
  };

  return (
    <div className="flex flex-col h-screen bg-cream">
      <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {tabs[activeTab]}
          </motion.div>
        </AnimatePresence>
      </div>
      <BottomNav />
    </div>
  );
}
