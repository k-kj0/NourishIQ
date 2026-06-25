"use client";

import { useApp } from "../AppContext";
import { HomeTab } from "../sections/HomeTab";
import { ExploreTab } from "../sections/ExploreTab";
import { FridgeTab } from "../sections/FridgeTab";
import { FavoritesTab } from "../sections/FavoritesTab";
import { ProfileTab } from "../sections/ProfileTab";
import { BottomNav } from "./BottomNav";

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
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="flex-1 overflow-y-auto">
        {tabs[activeTab] || <HomeTab />}
      </div>
      <BottomNav />
    </div>
  );
}
