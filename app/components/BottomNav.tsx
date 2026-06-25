"use client";

import { motion } from "framer-motion";
import { Home, Search, Refrigerator, Heart, User } from "lucide-react";
import { useApp } from "../AppContext";
import { KawaiiCharacter } from "./KawaiiCharacter";

const tabs = [
  { id: "home", label: "Home", icon: Home },
  { id: "explore", label: "Explore", icon: Search },
  { id: "fridge", label: "Fridge", icon: Refrigerator },
  { id: "favorites", label: "Favorites", icon: Heart },
  { id: "profile", label: "Me", icon: User },
];

export function BottomNav() {
  const { activeTab, setActiveTab } = useApp();

  return (
    <div className="relative">
      {/* Floating Kawaii Character */}
      <motion.div
        className="absolute -top-10 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <KawaiiCharacter emotion="happy" size={40} />
      </motion.div>

      <nav className="bg-white border-t border-gray-100 px-2 py-2 pb-safe">
        <div className="flex items-center justify-around">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;

            return (
              <motion.button
                key={tab.id}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
                onClick={() => setActiveTab(tab.id as any)}
                className="relative flex flex-col items-center gap-1 py-2 px-3 rounded-2xl transition-colors"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-2xl"
                    style={{ backgroundColor: "rgba(132, 204, 22, 0.1)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <motion.div
                  animate={isActive ? { y: -2 } : { y: 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Icon
                    className="w-5 h-5 transition-colors"
                    style={{ color: isActive ? "#84cc16" : "#9ca3af" }}
                  />
                </motion.div>
                <span
                  className="text-[10px] font-bold transition-colors"
                  style={{ color: isActive ? "#84cc16" : "#9ca3af" }}
                >
                  {tab.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
