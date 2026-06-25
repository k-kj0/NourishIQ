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
    <div className="pb-20">
      {activeTab === "home" && <HomeTab />}
      {activeTab === "explore" && <ExploreTab />}
      {activeTab === "fridge" && <FridgeTab />}
      {activeTab === "favorites" && <FavoritesTab />}
      {activeTab === "profile" && <ProfileTab />}
      <BottomNav />
    </div>
  );
}
