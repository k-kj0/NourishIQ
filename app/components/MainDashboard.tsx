"use client";

import { useApp } from "../AppContext";
import { HomeTab } from "../sections/HomeTab";
import { ExploreTab } from "../sections/ExploreTab";
import { FridgeTab } from "../sections/FridgeTab";
import { FavoritesTab } from "../sections/FavoritesTab";
import { ProfileTab } from "../sections/ProfileTab";
import { BottomNav } from "./BottomNav";
import { AnimatePresence, motion } from "framer-motion";

export function MainDashboard() {
  const { activeTab } = useApp();

  const tabs: Record<string, React.ReactNode> = {
    home: <HomeTab />,
    explore: <ExploreTab />,
    fridge: <FridgeTab />,
    favorites: <FavoritesTab />,
    profile: <ProfileTab />,
  };

  return (
    <div className="flex flex-col h-screen bg-cream" style={{ backgroundColor: "#fefcf7" }}>
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {tabs[activeTab] || tabs.home}
          </motion.div>
        </AnimatePresence>
      </div>
      <BottomNav />
    </div>
  );
}
