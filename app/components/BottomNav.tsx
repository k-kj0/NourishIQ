"use client";

import { motion } from "framer-motion";
import { useApp } from "../AppContext";
import { Home, Search, Heart, User } from "lucide-react";
import { KawaiiCharacter } from "./KawaiiCharacter";

export function BottomNav() {
  const { activeTab, setActiveTab } = useApp();

  const tabs = [
    { id: "home", label: "Home", icon: Home, color: "text-green-500" },
    { id: "explore", label: "Explore", icon: Search, color: "text-orange-500" },
    { id: "favorites", label: "Favs", icon: Heart, color: "text-red-500" },
    { id: "profile", label: "Me", icon: User, color: "text-purple-500" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center">
      <div className="w-full max-w-[460px] relative">
        {/* Floating Kawaii character above nav */}
        <motion.div
          className="absolute -top-8 left-1/2 -translate-x-1/2 z-50"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <KawaiiCharacter emotion="happy" size={45} />
        </motion.div>

        {/* Nav bar */}
        <div className="bg-white/90 backdrop-blur-xl border-t border-gray-100 px-6 py-2 pb-6 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
          <div className="flex items-center justify-around">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;

              return (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(tab.id as any)}
                  className="relative flex flex-col items-center gap-1 py-2 px-4"
                >
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-gradient-to-r from-green-400 to-emerald-500"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}

                  <motion.div
                    animate={isActive ? { scale: [1, 1.15, 1] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon 
                      className={`w-6 h-6 transition-colors ${
                        isActive ? tab.color : "text-gray-300"
                      }`} 
                      strokeWidth={isActive ? 2.5 : 1.5}
                    />
                  </motion.div>

                  <span className={`text-[10px] font-bold transition-colors ${
                    isActive ? tab.color : "text-gray-300"
                  }`}>
                    {tab.label}
                  </span>

                  {/* Active dot */}
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className={`w-1.5 h-1.5 rounded-full ${
                        tab.id === "home" ? "bg-green-400" :
                        tab.id === "explore" ? "bg-orange-400" :
                        tab.id === "favorites" ? "bg-red-400" :
                        "bg-purple-400"
                      }`}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
