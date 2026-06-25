"use client";

import { useState } from "react";
import { useApp } from "../AppContext";
import { User, Target, Flame, Settings, LogOut } from "lucide-react";

export function ProfileTab() {
  const { userProfile, updateProfile, resetApp, setShowEditProfile } = useApp();
  const [editForm, setEditForm] = useState({
    name: userProfile.name,
    goal: userProfile.goal,
    targetCalories: userProfile.targetCalories,
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    updateProfile({
      name: editForm.name,
      goal: editForm.goal,
      targetCalories: editForm.targetCalories,
      initials: editForm.name.split(" ").map((n) => n[0]).join("").toUpperCase(),
    });
    setIsEditing(false);
  };

  return (
    <div className="max-w-md mx-auto px-4 pt-4 pb-24">
      <div className="bg-white rounded-2xl p-5 shadow-sm mb-4">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-xl font-bold">
            {userProfile.initials || "S"}
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">{userProfile.name || "Sam"}</h2>
            <p className="text-sm text-gray-500">{userProfile.goal || "Lose weight"}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="bg-orange-50 rounded-xl p-3 text-center">
            <Flame size={18} className="mx-auto text-orange-500 mb-1" />
            <p className="text-lg font-bold text-gray-900">{userProfile.targetCalories}</p>
            <p className="text-[10px] text-gray-500">Daily Target</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-3 text-center">
            <Target size={18} className="mx-auto text-blue-500 mb-1" />
            <p className="text-lg font-bold text-gray-900">{userProfile.age || "--"}</p>
            <p className="text-[10px] text-gray-500">Age</p>
          </div>
          <div className="bg-purple-50 rounded-xl p-3 text-center">
            <User size={18} className="mx-auto text-purple-500 mb-1" />
            <p className="text-lg font-bold text-gray-900">{userProfile.gender || "--"}</p>
            <p className="text-[10px] text-gray-500">Gender</p>
          </div>
        </div>

        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="w-full bg-green-600 text-white font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2"
          >
            <Settings size={16} />
            Edit Profile
          </button>
        ) : (
          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-500 block mb-1">Name</label>
              <input
                type="text"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-green-500 outline-none font-medium text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1">Goal</label>
              <input
                type="text"
                value={editForm.goal}
                onChange={(e) => setEditForm({ ...editForm, goal: e.target.value })}
                className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-green-500 outline-none font-medium text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1">Target Calories</label>
              <input
                type="number"
                value={editForm.targetCalories}
                onChange={(e) => setEditForm({ ...editForm, targetCalories: parseInt(e.target.value) || 2000 })}
                className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-green-500 outline-none font-medium text-sm"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="flex-1 bg-green-600 text-white font-semibold py-2.5 rounded-xl"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 bg-gray-100 text-gray-700 font-semibold py-2.5 rounded-xl"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={resetApp}
        className="w-full bg-red-50 text-red-600 font-semibold py-3 rounded-xl flex items-center justify-center gap-2"
      >
        <LogOut size={16} />
        Reset App
      </button>
    </div>
  );
}
