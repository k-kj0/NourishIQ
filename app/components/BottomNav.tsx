"use client";

import { motion } from "framer-motion";
import { Home, Search, Heart, User } from "lucide-react";
import { useApp } from "../AppContext";
import { TabType } from "../lib/types";

export function BottomNav() {
  const { activeTab, setActiveTab } = useApp();

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: "home", label: "Home", icon: <Home className="w-6 h-6" /> },
    { id: "explore", label: "Explore", icon: <Search className="w-6 h-6" /> },
    { id: "favorites", label: "Favs", icon: <Heart className="w-6 h-6" /> },
    { id: "profile", label: "Me", icon: <User className="w-6 h-6" /> },
  ];

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[460px] bg-white/95 backdrop-blur border-t border-gray-200 px-3 pt-2 pb-5 z-50">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <motion.button
              key={tab.id}
              whileTap={{ scale: 0.9 }}
              onClick={() => setActiveTab(tab.id)}
              className="relative flex flex-1 flex-col items-center gap-1 py-1"
            >
              <motion.div
                animate={isActive ? { y: [0, -4, 0] } : { y: 0 }}
                transition={{ duration: 0.4 }}
                className={isActive ? "text-leaf" : "text-gray-400"}
              >
                {tab.icon}
              </motion.div>
              <span className={`text-[10px] font-bold ${isActive ? "text-leaf" : "text-gray-400"}`}>
                {tab.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="nav-dot"
                  className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-leaf"
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
