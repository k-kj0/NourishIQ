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

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="flex-1 overflow-y-auto">
        {activeTab === "home" && <HomeTab />}
        {activeTab === "explore" && <ExploreTab />}
        {activeTab === "fridge" && <FridgeTab />}
        {activeTab === "favorites" && <FavoritesTab />}
        {activeTab === "profile" && <ProfileTab />}
      </div>
      <BottomNav />
    </div>
  );
}
