"use client";

import { useApp } from "../AppContext";
import { Home, Search, Refrigerator, Heart, User } from "lucide-react";

export function BottomNav() {
  const { activeTab, setActiveTab } = useApp();

  const tabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "crave", label: "Crave", icon: Search },
    { id: "fridge", label: "Fridge", icon: Refrigerator },
    { id: "favorites", label: "Favorites", icon: Heart },
    { id: "profile", label: "Me", icon: User },
  ];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 bg-white/90 backdrop-blur border-t border-gray-200">
      <ul className="mx-auto max-w-md grid grid-cols-5 gap-1 px-2 py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <li key={tab.id}>
              <button
                onClick={() => setActiveTab(tab.id)}
                className="flex flex-col items-center gap-0.5 py-1 w-full"
              >
                <span
                  className={`flex items-center justify-center size-9 rounded-full transition-colors ${
                    isActive ? "bg-green-100" : ""
                  }`}
                >
                  <Icon
                    size={20}
                    className={isActive ? "text-green-600" : "text-gray-400"}
                  />
                </span>
                <span
                  className={`text-[10px] font-semibold ${
                    isActive ? "text-green-600" : "text-gray-400"
                  }`}
                >
                  {tab.label}
                </span>
                {isActive && (
                  <span className="size-1 rounded-full bg-green-500 mt-0.5" />
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
