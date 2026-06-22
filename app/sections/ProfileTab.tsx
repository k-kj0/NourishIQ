"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "../AppContext";
import { User, Edit, RefreshCw, TrendingUp, Smile, Meh, Frown, X, Save } from "lucide-react";
import { KawaiiCharacter } from "../components/KawaiiCharacter";

export function ProfileTab() {
  const { userProfile, updateProfile, updateCheckin, calorieHistory, resetApp, showEditProfile, setShowEditProfile } = useApp();
  const [editForm, setEditForm] = useState({ ...userProfile });

  const checkinTypes = [
    { key: "energy", label: "Energy", icon: "⚡" },
    { key: "skin", label: "Skin", icon: "✨" },
    { key: "digestion", label: "Digestion", icon: "🫁" },
    { key: "weight", label: "Weight", icon: "⚖️" },
  ];

  const handleSaveProfile = () => {
    updateProfile(editForm);
    setShowEditProfile(false);
  };

  return (
    <div className="px-5 pt-12 pb-4">
      {/* Avatar */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative">
          <div className="w-20 h-20 rounded-full gradient-leaf flex items-center justify-center text-white font-black text-2xl">
            {userProfile.initials || <User className="w-8 h-8" />}
          </div>
          <button
            onClick={() => setShowEditProfile(true)}
            className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-white shadow-card flex items-center justify-center"
          >
            <Edit className="w-4 h-4 text-gray-600" />
          </button>
        </div>
        <h2 className="text-xl font-black mt-3">{userProfile.name || "Guest"}</h2>
        <p className="text-gray-500 text-sm">{userProfile.goal} • {userProfile.diet}</p>
      </div>

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {showEditProfile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-3xl p-6 w-full max-w-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-black text-lg">Edit Profile</h3>
                <button onClick={() => setShowEditProfile(false)}><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-gray-500">Name</label>
                  <input
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full p-3 rounded-2xl border-2 border-gray-200 focus:border-leaf outline-none font-bold"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500">Goal</label>
                  <input
                    value={editForm.goal}
                    onChange={(e) => setEditForm({ ...editForm, goal: e.target.value })}
                    className="w-full p-3 rounded-2xl border-2 border-gray-200 focus:border-leaf outline-none font-bold"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500">Target Calories</label>
                  <input
                    type="number"
                    value={editForm.targetCalories}
                    onChange={(e) => setEditForm({ ...editForm, targetCalories: parseInt(e.target.value) })}
                    className="w-full p-3 rounded-2xl border-2 border-gray-200 focus:border-leaf outline-none font-bold"
                  />
                </div>
                <button
                  onClick={handleSaveProfile}
                  className="w-full gradient-leaf text-white py-3 rounded-2xl font-bold flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" /> Save Changes
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Daily Check-in */}
      <div className="bg-white rounded-3xl p-5 shadow-card mb-4">
        <h3 className="font-black text-lg mb-4">Daily Check-in</h3>
        <div className="grid grid-cols-2 gap-3">
          {checkinTypes.map((type) => (
            <div key={type.key} className="bg-gray-50 rounded-2xl p-3">
              <p className="text-xs font-bold text-gray-500 mb-2">{type.icon} {type.label}</p>
              <div className="flex gap-1">
                {[
                  { val: "good", icon: <Smile className="w-5 h-5" />, color: "text-green-500" },
                  { val: "okay", icon: <Meh className="w-5 h-5" />, color: "text-yellow-500" },
                  { val: "bad", icon: <Frown className="w-5 h-5" />, color: "text-red-500" },
                ].map((reaction) => (
                  <motion.button
                    key={reaction.val}
                    whileTap={{ scale: 0.8 }}
                    onClick={() => updateCheckin(type.key, reaction.val)}
                    className={`flex-1 py-2 rounded-xl ${reaction.color} bg-white shadow-sm`}
                  >
                    {reaction.icon}
                  </motion.button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Calorie History */}
      <div className="bg-white rounded-3xl p-5 shadow-card mb-4">
        <h3 className="font-black text-lg mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-leaf" /> Calorie Tracker
        </h3>
        {calorieHistory.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-4">Start logging meals to see your history</p>
        ) : (
          <div className="space-y-2">
            {calorieHistory.slice(-7).map((h) => (
              <div key={h.date} className="flex items-center justify-between bg-gray-50 rounded-xl p-3">
                <span className="text-xs font-bold text-gray-600">{h.date}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full gradient-leaf rounded-full"
                      style={{ width: `${Math.min((h.consumed / h.target) * 100, 100)}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold">{h.consumed}/{h.target}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={resetApp}
        className="w-full gradient-leaf text-white py-4 rounded-2xl font-bold shadow-glow flex items-center justify-center gap-2 mb-4"
      >
        <RefreshCw className="w-5 h-5" /> Regenerate Full Plan
      </motion.button>

      <div className="flex justify-center">
        <KawaiiCharacter emotion="cool" size={50} />
      </div>
    </div>
  );
}
