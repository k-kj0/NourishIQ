"use client";

import { useState } from "react";
import { useApp } from "../AppContext";
import { User, Droplets, Target, Scale, Edit2, Check } from "lucide-react";

export function ProfileTab() {
  const { profile, setProfile, hydrationLog, addWater } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: profile.name,
    goal: profile.diet?.[0] || "Eat Healthier",
    targetCalories: 2000,
  });

  const handleSave = () => {
    setProfile({
      ...profile,
      name: editForm.name,
    });
    setIsEditing(false);
  };

  return (
    <div className="max-w-md mx-auto px-4 pt-6 pb-24">
      <h1 className="text-2xl font-extrabold text-gray-900 mb-4">Profile</h1>

      {/* Avatar & Name */}
      <div className="bg-white rounded-2xl p-5 shadow-sm mb-4 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <User size={32} className="text-green-600" />
        </div>
        {!isEditing ? (
          <>
            <h2 className="text-lg font-bold text-gray-900">
              {profile.name || "Sam"}
            </h2>
            <p className="text-sm text-gray-500 mb-3">
              {profile.diet?.[0] || "No diet set"}
            </p>
            <button
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl text-sm font-semibold text-gray-700"
            >
              <Edit2 size={14} />
              Edit Profile
            </button>
          </>
        ) : (
          <div className="space-y-3 text-left">
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">
                Name
              </label>
              <input
                value={editForm.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEditForm({ ...editForm, name: e.target.value })
                }
                className="w-full p-3 rounded-2xl border-2 border-gray-200 focus:border-green-400 outline-none font-medium text-sm"
              />
            </div>
            <button
              onClick={handleSave}
              className="w-full py-3 bg-green-500 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
            >
              <Check size={16} />
              Save Changes
            </button>
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Target size={16} className="text-green-500" />
            <span className="text-xs font-semibold text-gray-500">Goal</span>
          </div>
          <p className="text-sm font-bold text-gray-800">
            {profile.healthGoals?.[0] || "Eat Healthier"}
          </p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Scale size={16} className="text-blue-500" />
            <span className="text-xs font-semibold text-gray-500">Weight</span>
          </div>
          <p className="text-sm font-bold text-gray-800">
            {profile.currentWeight
              ? profile.currentWeight + " " + profile.weightUnit
              : "Not set"}
          </p>
        </div>
        {profile.targetWeight && (
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Target size={16} className="text-purple-500" />
              <span className="text-xs font-semibold text-gray-500">
                Target
              </span>
            </div>
            <p className="text-sm font-bold text-gray-800">
              {profile.targetWeight + " " + profile.weightUnit}
            </p>
          </div>
        )}
      </div>

      {/* Hydration in Profile */}
      <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Droplets size={16} className="text-blue-500" />
            <span className="text-sm font-semibold text-gray-700">
              Daily Hydration
            </span>
          </div>
          <span className="text-xs text-gray-500">
            {hydrationLog.glasses}/{hydrationLog.target}
          </span>
        </div>
        <div className="flex gap-2 mb-3">
          {Array.from({ length: hydrationLog.target }, (_, i: number) => (
            <button
              key={i}
              onClick={() => {
                if (i === hydrationLog.glasses) addWater();
              }}
              className={
                i < hydrationLog.glasses
                  ? "flex-1 h-8 rounded-lg bg-blue-400"
                  : "flex-1 h-8 rounded-lg bg-blue-100"
              }
            />
          ))}
        </div>
        <button
          onClick={addWater}
          disabled={hydrationLog.glasses >= hydrationLog.target}
          className="w-full py-2 bg-blue-50 text-blue-600 rounded-xl text-sm font-semibold disabled:opacity-50"
        >
          + Add Glass
        </button>
      </div>

      {/* Settings */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <h3 className="text-sm font-bold text-gray-800 mb-3">Preferences</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Diet Type</span>
            <span className="text-sm font-semibold text-gray-800">
              {profile.diet?.join(", ") || "None"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Cooking Time</span>
            <span className="text-sm font-semibold text-gray-800">
              {profile.cookingTime || "Any"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Appliances</span>
            <span className="text-sm font-semibold text-gray-800">
              {profile.kitchenSetup?.length || 0} selected
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
