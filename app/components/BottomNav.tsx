"use client";

import { useApp } from "../AppContext";
import { Home, Compass, Refrigerator, Heart, User } from "lucide-react";

const tabs = [
  { id: "home", label: "Home", icon: Home },
  { id: "explore", label: "Explore", icon: Compass },
  { id: "fridge", label: "Fridge", icon: Refrigerator },
  { id: "favorites", label: "Favorites", icon: Heart },
  { id: "profile", label: "Me", icon: User },
] as const;

export function BottomNav() {
  const { activeTab, setActiveTab } = useApp();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="max-w-md mx-auto flex justify-around items-center h-16">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
                isActive ? "text-green-600" : "text-gray-400"
              }`}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] mt-0.5 font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
